# Diabetes Prediction App

A machine learning web application that predicts diabetes risk using a Support Vector Machine (SVM) model.

## Features

- Diabetes prediction using machine learning
- FastAPI REST API
- SQLite database
- Prediction history
- Clear prediction history
- HTML/CSS/JavaScript frontend
- Saved ML model and scaler
- Responsive user interface

## Machine Learning

The model was trained using the PIMA Diabetes dataset.

### Features

- Pregnancies
- Glucose
- Blood Pressure
- Skin Thickness
- Insulin
- BMI
- Diabetes Pedigree Function
- Age

### Model

Support Vector Machine:

```python
SVC(kernel="linear")