## Dependencies

1. [Tesseract](https://github.com/UB-Mannheim/tesseract/wiki) required for normal text ocr
2. [libreoffice](https://www.libreoffice.org/download/download-libreoffice/) required for converting docx to pdf

# running the app

1. download the dependencies:

   ```bash
   npm i
   ```

2. running the app
   ```bash
   npm start
   ```
3. for the table extraction part:
   1. install `pytourch, fastapi`
   2. RUN:
      ```bash
      uvicorn main:app --host 0.0.0.0 --port 8000 --reload
      ```
