# 🇮🇳 Indian Currency Notes Detection - YOLO

## Real-time Indian Banknote Recognition using YOLOv5 and Flask

## 🚀 Project Overview

This project implements a web-based application for detecting and classifying Indian currency notes using the YOLOv5 (You Only Look Once) object detection model. The backend is built with Flask, handling image processing and model inference, while the frontend is a simple HTML/CSS/JavaScript interface for user interaction.

The application can:
* Identify various denominations of Indian Rupee notes.
* Provide English and Hindi descriptions of the detected currency.
* Calculate and display the total monetary value of detected notes.
* Show confidence scores for each detection.

## ✨ Features

* **Custom YOLOv5 Model:** Utilizes a custom-trained YOLOv5 model for accurate Indian currency detection.
* **Web Interface:** User-friendly web interface for easy image uploads.
* **Real-time Inference (on uploaded image):** Processes images quickly to provide immediate results.
* **Multi-language Output:** Provides detection results in both English and Hindi.
* **Total Amount Calculation:** Automatically sums up the value of all detected notes.
* **Confidence Scores:** Displays the confidence level for each detected note.

## 🛠️ Technologies Used

* **Backend:** Python 3.10
    * Flask (Web Framework)
    * PyTorch (Deep Learning Framework for YOLOv5)
    * OpenCV (For image processing and displaying bounding boxes)
    * NumPy (Numerical operations)
    * Pandas (Data handling within YOLOv5)
    * `yolov5` (Ultralytics YOLOv5 repository - as a local source)
* **Frontend:**
    * HTML5
    * CSS3
    * JavaScript (jQuery)

## 📦 Installation Guide

Follow these steps to set up the project locally.

1. Create and Activate Virtual Environment

python -m venv venv
.\venv\Scripts\activate # On Windows
# source venv/bin/activate # On macOS/Linux

2. Install Dependencies
Install all necessary Python packages using the requirements.txt file:

pip install -r requirements.txt


🚀 Usage
1. Start the Backend Server
From the root of your project directory (CurrencyNotesDetection), with your virtual environment activated:
'''
python app.py
'''
The server will start, usually on http://127.0.0.1:8080/ or a local IP address. Keep this terminal window open.

2. Access the Frontend
Open your web browser and navigate to:

[http://127.0.0.1:8080/](http://127.0.0.1:8080/)

3. Detect Currency Notes
Click on "Choose File" to select an image of Indian currency notes.
Click the "Send" button.
The detected notes, total amount, and descriptions will appear on the page.

📂 Project Structure

CurrencyNotesDetection/
├── app.py                  # Flask backend application
├── yolo_detection.py       # YOLOv5 model loading and inference logic
├── requirements.txt        # Python dependencies
├── README.md               # This README file
├── static/
│   ├── index.css           # Frontend styles
│   └── index.js            # Frontend JavaScript for interaction
├── templates/
│   └── index.html          # Frontend HTML structure
└── venv/                   # Python Virtual Environment
└── yolov5/                 # Cloned YOLOv5 repository (where your model weights go)
    └── runs/
        └── train/
            └── exp/
                └── weights/
                    └── best.pt  # Your trained model weights
    └── ... (other YOLOv5 files)