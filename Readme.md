# 🇮🇳 Indian Currency Note Detection YOLO 💰

## Real-time Indian Banknote Recognition with YOLOv5 & Flask

---

<p align="center">
  <img app_results/DesktopView.png" alt="Indian Currency Note Detection YOLO Demo Screenshot" width="800" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);">
  <br>
  <em>Witness AI in action: Accurately identifying a 500 Rupee note with bounding box and confidence score.</em>
</p>

---

<p align="center">
  [![Python Version](https://img.shields.io/badge/Python-3.10%2B-blue.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
  [![Flask](https://img.shields.io/badge/Flask-2.x-black.svg?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
  [![PyTorch](https://img.shields.io/badge/PyTorch-2.x-EE4C2C.svg?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)
  [![YOLOv5](https://img.shields.io/badge/YOLOv5-v7.0-006400.svg?style=for-the-badge&logo=yolo&logoColor=white)](https://github.com/ultralytics/yolov5)
  [![License](https://img.shields.io/badge/License-[Your_License]-green.svg?style=for-the-badge)](LICENSE)
  [![GitHub Stars](https://img.shields.io/github/stars/Krishna-pathak1535/Indian-Currency-YOLO?style=for-the-badge&color=FFD700)](https://github.com/Krishna-pathak1535/Indian-Currency-YOLO/stargazers)
</p>

---

## 📖 Table of Contents

* [✨ Project Overview](#-project-overview)
* [🌟 Key Features](#-key-features)
* [🛠️ Technologies & Libraries](#%EF%B8%8F-technologies--libraries)
* [📦 Installation Guide](#-installation-guide)
    * [1. Clone the Repository](#1-%EF%B8%8F-clone-the-repository)
    * [2. Create and Activate Virtual Environment](#2-%EF%B8%8F-create-and-activate-virtual-environment)
    * [3. Install Dependencies](#3-%EF%B8%8F-install-dependencies)
    * [4. Set up YOLOv5 Model Weights (`best.pt`)](#4-%EF%B8%8F-set-up-yolov5-model-weights-bestpt)
* [🚀 How to Use](#-how-to-use)
    * [1. Start the Backend Server](#1-%EF%B8%8F-start-the-backend-server)
    * [2. Access the Web Interface](#2-%EF%B8%8F-access-the-web-interface)
    * [3. Upload Image & Detect](#3-%EF%B8%8F-upload-image--detect)
* [📂 Project Structure](#-project-structure)
* [🔗 API Endpoints](#-api-endpoints)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)
* [🙏 Acknowledgements](#-acknowledgements)

---

## ✨ Project Overview

**Indian Currency Note Detection YOLO** is an innovative web application designed to accurately identify and classify Indian currency notes in real-time using advanced **YOLOv5** object detection. This project bridges the gap between sophisticated AI models and practical, accessible tools, offering a seamless experience for currency recognition.

Built with a robust **Flask** backend for efficient image processing and deep learning inference, and an intuitive **HTML/CSS/JavaScript** frontend for user interaction, the application provides not just detection, but also contextual information like total value, confidence scores, and descriptions in both English and Hindi.

This solution is ideal for anyone interested in computer vision, deep learning deployment, or simply a reliable tool for Indian currency identification.

## 🌟 Key Features

* **🎯 High-Accuracy Detection:** Powered by a custom-trained YOLOv5 model, ensuring precise identification of various Indian Rupee denominations.
* **🌐 User-Friendly Web Interface:** A clean, responsive, and easy-to-navigate web application for effortless image uploads.
* **⚡ Rapid Inference:** Optimized for speed, delivering near real-time detection results on uploaded currency images.
* **🗣️ Bilingual Accessibility:** Presents detected currency information in both **English** and **Hindi**, catering to a wider audience.
* **➕ Intelligent Summation:** Automatically calculates and displays the total monetary value of all identified notes in the image.
* **📊 Confidence Metrics:** Each detection is accompanied by a confidence score, reflecting the model's certainty in its prediction.
* **🖼️ Visual Feedback:** Displays the uploaded image with bounding boxes and labels overlaid, clearly highlighting detected notes.

## 🛠️ Technologies & Libraries

This project leverages a powerful and modern stack to deliver its capabilities:

* **Backend (Python 3.10+):**
    * **[Flask](https://flask.palletsprojects.com/)**: The micro web framework that serves as the backbone of the API.
    * **[PyTorch](https://pytorch.org/)**: The open-source deep learning framework used for building and running the YOLOv5 model.
    * **[OpenCV (cv2)](https://opencv.org/)**: Essential for image manipulation, preprocessing, and drawing visual detections.
    * **[NumPy](https://numpy.org/)**: Fundamental package for numerical computing in Python, crucial for array operations.
    * **[Pandas](https://pandas.pydata.org/)**: Utilized for efficient data handling within the YOLOv5 framework's utilities.
    * **[Ultralytics YOLOv5](https://github.com/ultralytics/yolov5)**: The state-of-the-art object detection model that forms the core of the recognition system.
* **Frontend:**
    * **HTML5**: Provides the semantic structure of the web pages.
    * **CSS3**: Styles the application for a modern and responsive user experience.
    * **JavaScript (jQuery)**: Handles dynamic interactions, form submissions, and AJAX communication with the Flask backend.

## 📦 Installation Guide

Follow these detailed steps to set up and run the Indian Currency Note Detection YOLO project on your local machine.

### 1. ⬇️ Clone the Repository

Begin by cloning the project's GitHub repository to your local system:

```bash
git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/Indian-Currency-YOLO.git
cd Indian-Currency-YOLO
2. 🐍 Create and Activate Virtual Environment
It's highly recommended to use a Python virtual environment to isolate project dependencies and avoid conflicts with other Python projects.

Bash

python -m venv venv
.\venv\Scripts\activate # For Windows users
# source venv/bin/activate # For macOS/Linux users
3. ⚙️ Install Dependencies
With your virtual environment activated, install all required Python packages listed in requirements.txt:

Bash

pip install -r requirements.txt
⚠️ Dependency Compatibility Note:
This project relies on specific versions of libraries (e.g., numpy, torch, opencv-python, pandas) for optimal compatibility with YOLOv5. The requirements.txt file is meticulously generated to reflect these exact versions. If you encounter any RuntimeError (e.g., module compiled against ABI version...) or ValueError (e.g., numpy.dtype size changed...) during installation or runtime, it typically indicates a version mismatch. Re-running pip install -r requirements.txt within a freshly created virtual environment should resolve most such issues.

4. 🧠 Set up YOLOv5 Model Weights (best.pt)
The core of the detection system is a custom-trained YOLOv5 model. You need to place your best.pt model weights in the designated location within the project structure.

Obtain your best.pt file: This file is the output of your YOLOv5 training process. If you have trained your own model, locate the best.pt file from its respective training run directory (e.g., yolov5/runs/train/exp/weights/best.pt). If you are using a pre-trained model for Indian Currency, download the .pt file from its source (e.g., Hugging Face, Kaggle).

Place the model file: Create the necessary nested directory structure inside your Indian-Currency-YOLO/yolov5 folder (if it doesn't already exist) and then copy your best.pt file into the weights directory:

Indian-Currency-YOLO/
└── yolov5/
    └── runs/
        └── train/
            └── exp/          # This 'exp' folder might be 'exp1', 'exp2', etc., based on your training runs. Adjust if necessary.
                └── weights/
                    └── best.pt # <--- Place your trained model file here
Crucially, ensure that the model_name path specified in your yolo_detection.py file (e.g., ./yolov5/runs/train/exp/weights/best.pt) precisely matches the actual location where you have placed your best.pt file.

🚀 How to Use
Once all dependencies are installed and your model weights are in place, running the application is straightforward:

1. ▶️ Start the Backend Server
From the root of your project directory (Indian-Currency-YOLO), with your virtual environment activated, execute the Flask application:

Bash

python app.py
The Flask development server will start, typically accessible at http://127.0.0.1:8080/. Keep this terminal window open and running as long as you want the application to be accessible.

2. 🌐 Access the Web Interface
Open your preferred web browser (e.g., Chrome, Firefox, Edge) and navigate to the application's URL:

[http://127.0.0.1:8080/](http://127.0.0.1:8080/)
3. 📸 Upload Image & Detect
On the web page, click the "Choose File" button to select an image file containing Indian currency notes from your local machine.
Once the file is selected, click the "Send" button to initiate the currency detection process.
The application will then display the uploaded image with bounding boxes and labels indicating the detected notes, along with the calculated total amount, confidence scores, and descriptions in both English and Hindi.
📂 Project Structure
A high-level overview of the project's directory and file structure:

Indian-Currency-YOLO/
├── app.py                  # 🌐 Flask Backend: Main application, handles routes and API calls.
├── yolo_detection.py       # 🧠 YOLOv5 Core: Logic for model loading, inference, and result parsing.
├── requirements.txt        # 📋 Python Dependencies: Lists all required packages and their versions.
├── README.md               # 📄 Project Documentation: This file!
├── static/                 # 🎨 Frontend Assets: CSS and JavaScript files.
│   ├── index.css           #   - Styling for the web interface.
│   └── index.js            #   - Client-side interactions and AJAX communication.
├── templates/              # 🖥️ HTML Templates: Web page structure.
│   └── index.html          #   - The main user interface for the application.
└── venv/                   # 🐍 Python Virtual Environment (automatically ignored by Git).
└── yolov5/                 # 🚀 YOLOv5 Repository: Contains the YOLOv5 source code.
    └── runs/               #   - Training/Detection outputs (partially ignored by Git).
        └── train/          #     - Training run logs.
            └── exp/        #       - Specific experiment folder.
                └── weights/    #         - Contains your trained model weights.
                    └── best.pt # <--- Your custom-trained YOLOv5 model weights.
    └── ... (other YOLOv5 source files, e.g., models/, utils/, data/)
🔗 API Endpoints
The Flask backend provides a simple yet effective API for interaction:

GET /:
Description: Serves the main web page (index.html) of the application.
Method: GET
POST /detectObject:
Description: Receives an image file, performs Indian currency detection using the YOLOv5 model, and returns a JSON response containing the processed image, detected text, raw labels, and confidence scores.
Method: POST
Request Body: Expects multipart/form-data with a field named image containing the image file.
Response (JSON Object):
status: A base64 encoded string of the processed image (with bounding boxes and labels drawn).
englishmessage: A string containing the English description of the detected notes (e.g., "Image contains one 100Rupees Note and two 50Rupees Notes").
hindimessage: A string containing the Hindi description of the detected notes.
raw_labels: A dictionary mapping detected note types to their counts (e.g., {'100Rupees': 1, '500Rupees': 2}).
confidence_scores: A dictionary mapping detected note types to their confidence percentages (e.g., {'100Rupees': 98.50, '500Rupees': 95.23}).
