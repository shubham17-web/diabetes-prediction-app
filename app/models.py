from sqlalchemy import Column, Integer, Float, String

from app.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    Pregnancies = Column(Float)
    Glucose = Column(Float)
    BloodPressure = Column(Float)
    SkinThickness = Column(Float)
    Insulin = Column(Float)
    BMI = Column(Float)
    DiabetesPedigreeFunction = Column(Float)
    Age = Column(Float)

    prediction = Column(Integer)
    result = Column(String)