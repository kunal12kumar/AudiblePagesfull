import sys
import fitz  # PyMuPDF library
from audio import generate_voice

def extract_text_from_pdf(file_path):
    text = ""
    with fitz.open(file_path) as pdf:
        for page_num in range(pdf.page_count):
            page = pdf[page_num]
            text += page.get_text()
    return text

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    text = extract_text_from_pdf(pdf_path)
    
    # Ensure UTF-8 encoding for output to avoid encoding errors
    sys.stdout.reconfigure(encoding='utf-8')  # Reconfigure stdout to use UTF-8 encoding
    print(text)
    generate_voice(text)
    
# sending the text for conversion of the voice

