import io
from fastapi import FastAPI, File, HTTPException, UploadFile
from model import inference
from starlette.middleware.cors import CORSMiddleware
from PIL import Image


app = FastAPI()

origins = ["http://localhost:3000"]  # Replace with your frontend origin URL

app.add_middleware(
CORSMiddleware,
allow_origins=["*"], # Allows all origins
allow_credentials=True,
allow_methods=["*"], # Allows all methods
allow_headers=["*"], # Allows all headers
)


@app.post("/upload")
async def extract_table_data(image: UploadFile = File(...)):
    try:
        # Read image data
        image_data = await image.read()

        # Open image in memory
        image = Image.open(io.BytesIO(image_data))
        table_fram= inference(image)
        if table_fram.empty:
            return "<h2 style=\"color: darkslategrey;\">💡 the image has no tables 💡</h2>"

        return table_fram.to_html(escape=True,border=1,index=False).replace('\n', '')

    except Exception as e:
        # Handle and log exceptions appropriately
        print(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
