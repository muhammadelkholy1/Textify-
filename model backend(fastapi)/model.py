import torch
from torchvision import transforms

from transformers import AutoModelForObjectDetection
from transformers import TableTransformerForObjectDetection

import easyocr
import pandas as pd

from helper import *

reader = easyocr.Reader(['en']) # this needs to run only once to load the model into memory

model = AutoModelForObjectDetection.from_pretrained("microsoft/table-transformer-detection", revision="no_timm")

model.config.id2label

device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)
crop_padding = 5

structure_model = TableTransformerForObjectDetection.from_pretrained("microsoft/table-structure-recognition-v1.1-all")
structure_model.to(device)
structure_transform = transforms.Compose([
    MaxResize(1000),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

detection_class_thresholds = {
    "table": 0.5,
    "table rotated": 0.5,
    "no object": 1000
}

detection_transform = transforms.Compose([
    MaxResize(800),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# update id2label to include "no object"
id2label = model.config.id2label
id2label[len(model.config.id2label)] = "no object"


def inference(image):
    print(f"{GREEN}>>> inference started{RESET}")

    pixel_values = detection_transform(image).unsqueeze(0)
    pixel_values = pixel_values.to(device)

    with torch.no_grad():
        outputs = model(pixel_values)


    objects = outputs_to_objects(outputs, image.size, id2label)

    tokens = []
    tables_crops = objects_to_crops(image, tokens, objects, detection_class_thresholds, padding=crop_padding)
    cropped_table = tables_crops[0]['image'].convert("RGB")


    pixel_values = structure_transform(cropped_table).unsqueeze(0)
    pixel_values = pixel_values.to(device)

    with torch.no_grad():
        outputs = structure_model(pixel_values)

    structure_id2label = structure_model.config.id2label
    structure_id2label[len(structure_id2label)] = "no object"

    cells = outputs_to_objects(outputs, cropped_table.size, structure_id2label)

    cell_coordinates = get_cell_coordinates_by_row(cells)

    data = apply_ocr(cell_coordinates, cropped_table, reader)
    tf= pd.DataFrame(data).T

    return tf


