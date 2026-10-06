# 🩺 Diabetes Prediction App

An end-to-end Machine Learning web application that predicts diabetes risk based on patient input features.

The project combines a trained **Support Vector Machine (SVM)** model with a **FastAPI REST API**, **SQLite database**, and **HTML/CSS/JavaScript frontend**.

> ⚠️ **Disclaimer:** This application is created for educational and demonstration purposes only. It is not a medical diagnosis or treatment system.

---

## 🚀 Live Demo

### 🌐 Frontend
https://diabetes-prediction-frontend-2cxe.onrender.com/

### 📚 API Documentation
https://diabetes-prediction-app-khfb.onrender.com/docs

---

## 📌 Project Overview

The Diabetes Prediction App allows users to enter eight health-related input features and receive a prediction from a trained Machine Learning model.

The application demonstrates a complete ML deployment workflow:

```text
Dataset
   ↓
Data Preprocessing
   ↓
Feature Scaling
   ↓
SVM Model Training
   ↓
Model Serialization
   ↓
FastAPI Backend
   ↓
Input Validation
   ↓
Prediction
   ↓
SQLite Database
   ↓
Frontend
```

The original Machine Learning workflow was developed in a Jupyter Notebook, and the trained model and scaler were saved for use in the web application.

---

## ✨ Features

- 🧠 Diabetes prediction using Support Vector Machine
- 📊 StandardScaler feature preprocessing
- ⚡ FastAPI REST API
- 🗄️ SQLite database for prediction history
- 🌐 HTML/CSS/JavaScript frontend
- 🔒 Frontend input validation
- 🛡️ Backend validation using Pydantic
- 🔢 Numeric-only input handling
- 📏 Input range validation
- ❌ Invalid input detection
- 📜 Prediction history
- 🧹 Clear Inputs functionality
- 🗑️ Clear History functionality
- 📖 Interactive Swagger API documentation
- ☁️ Deployed using Render

---

## 🧠 Machine Learning

### Algorithm

The application uses:

**Support Vector Machine (SVM)**

```python
SVC(kernel="linear")
```

The input features are standardized using:

```python
StandardScaler()
```

The same scaler used during model training is loaded during prediction so incoming data receives the same preprocessing as the training data.

---

## 📊 Input Features

| Feature | Description |
|---|---|
| Pregnancies | Number of pregnancies |
| Glucose | Glucose measurement |
| BloodPressure | Blood pressure measurement |
| SkinThickness | Skin thickness measurement |
| Insulin | Insulin measurement |
| BMI | Body Mass Index |
| DiabetesPedigreeFunction | Diabetes pedigree function |
| Age | Age in years |

---

## 🔒 Input Validation

The application validates user input on both the frontend and backend.

### Validation Ranges

| Feature | Allowed Range |
|---|---:|
| Pregnancies | 0–20 |
| Glucose | 40–600 mg/dL |
| Blood Pressure | 30–200 mmHg |
| Skin Thickness | 1–100 mm |
| Insulin | 0–1000 μU/mL |
| BMI | 10–70 |
| Diabetes Pedigree Function | 0–3 |
| Age | 18–100 years |

Frontend validation provides immediate feedback to users.

Backend validation is implemented using **Pydantic** to prevent invalid values from reaching the Machine Learning model through direct API requests.

> These ranges are application input-validity boundaries. They should not be interpreted as medical "normal ranges" or diagnostic thresholds.

---

## 🏗️ Project Architecture

```text
User
 │
 ▼
Frontend
HTML / CSS / JavaScript
 │
 │ HTTP Request
 ▼
FastAPI REST API
 │
 ▼
Pydantic Validation
 │
 ▼
Input Preparation
 │
 ▼
StandardScaler
 │
 ▼
SVM Model
 │
 ▼
Prediction
 │
 ├──────────────► SQLite Database
 │                    │
 │                    ▼
 │              Prediction History
 │
 ▼
JSON Response
 │
 ▼
Frontend
```

---

## 🛠️ Tech Stack

### Machine Learning
- Python
- NumPy
- Pandas
- Scikit-learn
- Support Vector Machine (SVM)
- StandardScaler
- Jupyter Notebook

### Backend
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy
- SQLite

### Frontend
- HTML5
- CSS3
- JavaScript

### Deployment & Version Control
- Git
- GitHub
- Render

---

## 📁 Project Structure

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
```

---

## 🔌 API Endpoints

### `GET /`

Checks whether the API is running.

### `POST /predict`

Makes a diabetes prediction using the submitted input data.

Example request:

```json
{
  "Pregnancies": 6,
  "Glucose": 148,
  "BloodPressure": 72,
  "SkinThickness": 35,
  "Insulin": 0,
  "BMI": 33.6,
  "DiabetesPedigreeFunction": 0.627,
  "Age": 50
}
```

Example response:

```json
{
  "prediction": 1,
  "result": "Diabetic"
}
```

### `GET /predictions`

Returns previously stored predictions from the SQLite database.

### `DELETE /predictions`

Deletes all stored prediction history.

---

## 🗄️ Database

The application uses **SQLite** with **SQLAlchemy**.

Each prediction stores:

- Prediction ID
- Pregnancies
- Glucose
- Blood Pressure
- Skin Thickness
- Insulin
- BMI
- Diabetes Pedigree Function
- Age
- Prediction value
- Prediction result

---

## 📚 Machine Learning Workflow

The Machine Learning workflow was developed in:

```text
Diabetes_Prediction.ipynb
```

```text
Load Dataset
    ↓
Explore Dataset
    ↓
Separate Features & Target
    ↓
Train/Test Split
    ↓
StandardScaler
    ↓
SVM Training
    ↓
Model Evaluation
    ↓
Save Model
    ↓
Save Scaler
```

The trained files are stored as:

```text
model/
├── diabetes_model.pkl
└── scaler.pkl
```

---

## 🧪 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/shubham17-web/diabetes-prediction-app.git
```

### 2. Navigate to the project

```bash
cd diabetes-prediction-app
```

### 3. Create a virtual environment

```bash
python -m venv .venv
```

### 4. Activate the virtual environment

**Windows:**

```powershell
.venv\Scriptsctivate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Start the FastAPI server

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

### 7. Open Swagger Documentation

```text
http://127.0.0.1:8000/docs
```

---

## 🌐 Running the Frontend Locally

Open the `frontend` folder using a local development server such as **VS Code Live Server**.

The frontend communicates with the FastAPI backend using JavaScript `fetch()` requests.

---

## ☁️ Deployment

The application is deployed using **Render**.

- Frontend → Render Static Site
- Backend → Render Web Service
- Source Code → GitHub

```text
GitHub
   │
   ├──────────────► Render Static Site
   │                     │
   │                     ▼
   │                  Frontend
   │
   └──────────────► Render Web Service
                         │
                         ▼
                     FastAPI API
                         │
                         ├── SVM Model
                         ├── Scaler
                         └── SQLite
```

---

## ⚠️ Deployment Note

The application currently uses SQLite for demonstration purposes.

Because the deployed backend runs on Render's free infrastructure, SQLite data should not be treated as permanent production storage. Database contents may be lost when the service is restarted, redeployed, or its environment is replaced.

For a production application, a persistent database such as PostgreSQL would be more appropriate.

---

## 🎯 What I Learned

This project helped me practice:

- Machine Learning model training
- Feature scaling
- Model serialization
- FastAPI REST API development
- Pydantic validation
- SQLAlchemy ORM
- SQLite database integration
- Frontend development with HTML/CSS/JavaScript
- API communication using `fetch()`
- CORS configuration
- Git and GitHub
- Backend/frontend integration
- Cloud deployment using Render

Most importantly, the project demonstrates how a Machine Learning model can be transformed from a Jupyter Notebook experiment into a complete web application.

---

## 🔮 Future Improvements

- PostgreSQL database
- Authentication and user accounts
- Prediction timestamps
- Improved prediction history filtering
- Better API error responses
- Automated testing
- Docker containerization
- CI/CD pipeline
- Improved production deployment architecture

---

## 📸 Screenshots

### Prediction Interface

_Add a screenshot of the main prediction form here._

### Prediction Result

_Add a screenshot showing a prediction result here._

### Prediction History

_Add a screenshot showing the prediction history here._

### Swagger API

_Add a screenshot of the FastAPI Swagger documentation here._

---

## 📜 Disclaimer

This project is intended strictly for **educational and demonstration purposes**.

The predictions generated by this application should **not** be used for medical diagnosis, treatment, or clinical decision-making.

Always consult a qualified healthcare professional for medical advice.

---

## 👨‍💻 Author

**Pranab Singh**

BTech Information Technology Student

Interested in:

- Data Analytics
- Machine Learning
- Backend Development
- FastAPI

---

## ⭐ If You Find This Project Useful

Feel free to explore the repository, try the live application, and provide feedback.

⭐ Star the repository if you found it useful.
