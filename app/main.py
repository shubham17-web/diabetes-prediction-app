from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.schemas import DiabetesInput
from app.database import Base, engine, SessionLocal
from app import models

import pickle
import numpy as np


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(title="Diabetes Prediction API")


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load trained model
with open("model/diabetes_model.pkl", "rb") as file:
    model = pickle.load(file)


# Load scaler
with open("model/scaler.pkl", "rb") as file:
    scaler = pickle.load(file)


# Database dependency
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# Home endpoint
@app.get("/")
def home():

    return {
        "message": "Diabetes Prediction API is running"
    }


# Prediction endpoint
@app.post("/predict")
def predict_diabetes(
    data: DiabetesInput,
    db: Session = Depends(get_db)
):

    # Prepare input data
    input_data = np.array([[
        data.Pregnancies,
        data.Glucose,
        data.BloodPressure,
        data.SkinThickness,
        data.Insulin,
        data.BMI,
        data.DiabetesPedigreeFunction,
        data.Age
    ]])

    # Scale input
    scaled_data = scaler.transform(input_data)

    # Make prediction
    prediction = model.predict(scaled_data)

    # Convert prediction to result
    if prediction[0] == 0:
        result = "Non-Diabetic"
    else:
        result = "Diabetic"

    # Create database record
    new_prediction = models.Prediction(
        Pregnancies=data.Pregnancies,
        Glucose=data.Glucose,
        BloodPressure=data.BloodPressure,
        SkinThickness=data.SkinThickness,
        Insulin=data.Insulin,
        BMI=data.BMI,
        DiabetesPedigreeFunction=data.DiabetesPedigreeFunction,
        Age=data.Age,
        prediction=int(prediction[0]),
        result=result
    )

    # Save prediction
    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    return {
        "prediction": int(prediction[0]),
        "result": result
    }


# Get prediction history
@app.get("/predictions")
def get_predictions(
    db: Session = Depends(get_db)
):

    predictions = db.query(models.Prediction).all()

    return predictions


# Clear prediction history
@app.delete("/predictions")
def clear_predictions(
    db: Session = Depends(get_db)
):

    db.query(models.Prediction).delete()

    db.commit()

    return {
        "message": "Prediction history cleared"
    }