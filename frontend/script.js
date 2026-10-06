const numericFields = [
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction",
    "Age"
];

const decimalFields = ["BMI", "DiabetesPedigreeFunction"];

// Create (or reuse) an error element under each field
function getErrorElement(id) {
    let error = document.getElementById(`${id}-error`);

    if (!error) {
        const input = document.getElementById(id);

        error = document.createElement("div");
        error.id = `${id}-error`;
        error.className = "error-message";
        error.style.fontSize = "12px";
        error.style.color = "#a33a3a";

        const field = input.closest(".field");
        (field || input.parentElement).appendChild(error);
    }

    return error;
}

function showError(id, message) {
    getErrorElement(id).textContent = message;
}

function clearError(id) {
    getErrorElement(id).textContent = "";
}

numericFields.forEach((id) => {
    const input = document.getElementById(id);
    getErrorElement(id);

    input.addEventListener("keydown", (event) => {
        const allowedKeys = [
            "Backspace",
            "Delete",
            "Tab",
            "Enter",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Home",
            "End"
        ];

        if (allowedKeys.includes(event.key)) {
            return;
        }

        // Allow shortcuts like Ctrl+V, Ctrl+C, Ctrl+A
        if (event.ctrlKey || event.metaKey) {
            return;
        }

        // Allow decimal point only for decimal fields
        if (event.key === "." && decimalFields.includes(id)) {
            return;
        }

        // Allow only numbers
        if (!/^[0-9]$/.test(event.key)) {
            event.preventDefault();
            showError(id, "Invalid input");
            return;
        }

        clearError(id);
    });

    input.addEventListener("paste", (event) => {
        const pastedText = event.clipboardData.getData("text");

        if (!/^\d*\.?\d*$/.test(pastedText)) {
            event.preventDefault();
            showError(id, "Invalid input");
        }
    });

    input.addEventListener("input", () => {
        if (!/^\d*\.?\d*$/.test(input.value)) {
            showError(id, "Invalid input");
            input.setCustomValidity("Invalid input");
        } else {
            clearError(id);
            input.setCustomValidity("");
        }
    });

    input.addEventListener("blur", () => {
        clearError(id);
    });
});

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

        const response = await fetch("https://diabetes-prediction-app-khfb.onrender.com/predict", {
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
            "https://diabetes-prediction-app-khfb.onrender.com/predictions"
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
            "https://diabetes-prediction-app-khfb.onrender.com/predictions",
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

    // Clear validation error messages and states
    numericFields.forEach((id) => {
        const input = document.getElementById(id);
        const error = document.getElementById(`${id}-error`);

        input.setCustomValidity("");

        if (error) {
            error.textContent = "";
        }
    });

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