## 🚀 Live Demo

**Frontend:**  
https://diabetes-prediction-frontend-2cxe.onrender.com/

**Backend API:**  
https://diabetes-prediction-app-khfb.onrender.com/

**API Documentation:**  
https://diabetes-prediction-app-khfb.onrender.com/docs

## 🧠 Project Overview

Diabetes Prediction App is an end-to-end machine learning web application that predicts whether a person is likely to be diabetic based on medical input features.

The project combines a trained Machine Learning model with a FastAPI backend, SQLite database, and HTML/CSS/JavaScript frontend.

> **Disclaimer:** This application is for educational purposes only and is not a medical diagnosis system.

## 🛠️ Tech Stack

### Machine Learning
- Python
- NumPy
- Pandas
- Scikit-learn
- Support Vector Machine (SVM)
- StandardScaler

### Backend
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy
- SQLite

### Frontend
- HTML
- CSS
- JavaScript

### Deployment
- GitHub
- Render

## ✨ Features

- Diabetes prediction using an SVM model
- Feature scaling using StandardScaler
- FastAPI REST API
- Interactive frontend
- Prediction history
- SQLite database storage
- Clear Inputs functionality
- Clear History functionality
- Swagger API documentation
- Deployed frontend and backend

## 📊 Input Features

The model uses the following features:

- Pregnancies
- Glucose
- Blood Pressure
- Skin Thickness
- Insulin
- BMI
- Diabetes Pedigree Function
- Age

## 🏗️ Project Structure

```text
diabetes-prediction-app/
│
├── app/
│   ├── main.py
│   ├── schemas.py
│   ├── database.py
│   └── models.py
│
├── data/
│   └── diabetes.csv
│
├── model/
│   ├── diabetes_model.pkl
│   └── scaler.pkl
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Diabetes_Prediction.ipynb
├── requirements.txt
├── README.md
└── .gitignore