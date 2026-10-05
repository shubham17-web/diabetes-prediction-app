const clearInputsButton =
    document.getElementById("clearInputsButton");
    
const predictButton = document.getElementById("predictButton");

const clearHistoryButton =
    document.getElementById("clearHistoryButton");

const form = document.getElementById("predictionForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", predictDiabetes);


async function predictDiabetes(event) {

    event.preventDefault();

    resultDiv.textContent = "Analyzing...";
    predictButton.disabled = true;
    predictButton.textContent = "Analyzing...";

    const data = {
        Pregnancies: Number(document.getElementById("Pregnancies").value),
        Glucose: Number(document.getElementById("Glucose").value),
        BloodPressure: Number(document.getElementById("BloodPressure").value),
        SkinThickness: Number(document.getElementById("SkinThickness").value),
        Insulin: Number(document.getElementById("Insulin").value),
        BMI: Number(document.getElementById("BMI").value),
        DiabetesPedigreeFunction: Number(
            document.getElementById("DiabetesPedigreeFunction").value
        ),
        Age: Number(document.getElementById("Age").value)
    };

    try {

        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Prediction request failed");
        }

        const result = await response.json();

        resultDiv.textContent = `Prediction: ${result.result}`;

        resultDiv.classList.remove("diabetic", "non-diabetic");

        if (result.prediction === 1) {
            resultDiv.classList.add("diabetic");
        } else {
            resultDiv.classList.add("non-diabetic");
        }

        loadPredictionHistory();

    } catch (error) {

        console.error(error);

        resultDiv.textContent = "Unable to connect to the server.";
    } finally {

        predictButton.disabled = false;
        predictButton.textContent = "Predict Diabetes";
    }
}


async function loadPredictionHistory() {

    const historyContainer = document.getElementById("history");

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/predictions"
        );

        if (!response.ok) {
            throw new Error("Failed to load history");
        }

        const predictions = await response.json();

        historyContainer.innerHTML = "";

        if (predictions.length === 0) {

            historyContainer.textContent =
                "No predictions yet.";

            return;
        }

        predictions.reverse().forEach((item, index) => {

            const card = document.createElement("div");

            card.className = "history-card";

            card.innerHTML = `
                <div>
                    <strong>Prediction #${predictions.length - index}</strong>

                    <p>
                        Glucose: ${item.Glucose}
                        |
                        BMI: ${item.BMI}
                        |
                        Age: ${item.Age}
                    </p>
                </div>

                <span class="${item.prediction === 1 ? "history-diabetic" : "history-non-diabetic"}">
                    ${item.result}
                </span>
            `;

            historyContainer.appendChild(card);
        });

    } catch (error) {

        console.error(error);

        historyContainer.textContent =
            "Unable to load prediction history.";
    }
}


loadPredictionHistory();

async function clearPredictionHistory() {

    const confirmed = confirm(
        "Are you sure you want to clear all prediction history?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/predictions",
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to clear history");
        }

        loadPredictionHistory();

    } catch (error) {

        console.error(error);

        alert("Unable to clear prediction history.");
    }
}

clearHistoryButton.addEventListener(
    "click",
    clearPredictionHistory
);

function clearInputs() {

    form.reset();

    resultDiv.textContent = "";

    resultDiv.classList.remove(
        "diabetic",
        "non-diabetic"
    );
}

clearInputsButton.addEventListener(
    "click",
    clearInputs
);