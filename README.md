# 🛡️ SpamGuard — SMS & Forum Spam Detector

> AI-powered spam detection using Naive Bayes classifier | Accuracy: **96%**

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How to Run the App](#how-to-run-the-app)
- [How We Built This App](#how-we-built-this-app)
- [SOLID Principles Applied](#solid-principles-applied)
- [Team](#team)

---

## 📖 About the Project

SpamGuard is a machine learning web application that predicts whether a given SMS or forum message is **SPAM** or **HAM** (legitimate). It was trained on a labeled dataset using the **Naive Bayes algorithm** and deployed as a local web app using **Flask**.

---

## 🧰 Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| ML Model   | Naive Bayes (scikit-learn) |
| Backend    | Python + Flask      |
| Frontend   | HTML, CSS, JavaScript |
| Training   | Google Colab        |
| IDE        | Visual Studio Code  |

---

## 📁 Project Structure

```
SpamGuard-Custom-SMS-and-Forum-Spam-Filter/
│
├── model/
│   ├── spam_model.pkl       # Trained Naive Bayes model
│   └── vectorizer.pkl       # Fitted CountVectorizer
│
├── static/
│   ├── index.html           # Main HTML page
│   ├── css/
│   │   ├── tokens.css       # Design tokens (colors, fonts)
│   │   ├── base.css         # Reset + body styles
│   │   ├── header.css       # Header + stats row
│   │   ├── input-card.css   # Textarea + buttons
│   │   ├── result.css       # Result panel + confidence bar
│   │   ├── examples.css     # Example buttons
│   │   └── footer.css       # Footer
│   └── js/
│       ├── config.js        # Constants and example data
│       ├── api.js           # HTTP requests to Flask
│       ├── ui.js            # DOM manipulation
│       ├── app.js           # App coordinator
│       └── main.js          # Bootstrap (starts the app)
│
├── app.py                   # Flask entry point
├── classifier.py            # ML model loader and predictor
├── routes.py                # Flask route definitions
└── requirements.txt         # Python dependencies
```

---

## 🚀 How to Run the App

Follow these steps carefully. This only needs to be done **once** on a new computer.

### ✅ Prerequisites

Make sure you have these installed:

- [Python 3.10+](https://www.python.org/downloads/) — during install, **check "Add python.exe to PATH"**
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

---

### Step 1 — Clone the Repository

Open a terminal (PowerShell or CMD) and run:

```bash
git clone https://github.com/YOUR_USERNAME/SpamGuard-Custom-SMS-and-Forum-Spam-Filter.git
```

Then navigate into the project folder:

```bash
cd SpamGuard-Custom-SMS-and-Forum-Spam-Filter
```

> ⚠️ If the folder has the same name twice (nested), run:
> ```bash
> cd SpamGuard-Custom-SMS-and-Forum-Spam-Filter
> ```
> again to go into the actual project.

---

### Step 2 — Install Python Dependencies

Run this command to install all required libraries:

```bash
python -m pip install flask flask-cors scikit-learn numpy
```

Wait until you see:
```
Successfully installed flask flask-cors scikit-learn numpy ...
```

---

### Step 3 — Run the App

```bash
python app.py
```

You should see:
```
* Running on http://127.0.0.1:5000
```

---

### Step 4 — Open in Browser

Open your browser and go to:

```
http://127.0.0.1:5000
```

The SpamGuard app will load and you can start analyzing messages! 🎉

---

### Step 5 — Stop the App

To stop the server, go back to the terminal and press:

```
Ctrl + C
```

---

## 🔨 How We Built This App

This section explains the full process from training the model to deploying the web app.

### Phase 1 — Train the Model (Google Colab)

1. Loaded the SMS spam dataset (CSV file)
2. Preprocessed the text (lowercasing, removing punctuation)
3. Vectorized messages using `CountVectorizer`
4. Trained a `MultinomialNB` (Naive Bayes) classifier
5. Achieved **96% accuracy** on the test set
6. Exported the model and vectorizer using `pickle`:

```python
import pickle

with open("spam_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)
```

---

### Phase 2 — Set Up the Backend (Flask)

1. Created `classifier.py` — loads the `.pkl` files and runs predictions
2. Created `routes.py` — defines the `/predict` API endpoint
3. Created `app.py` — wires everything together and starts the server

The `/predict` endpoint accepts a POST request:
```json
{ "message": "Congratulations! You won a prize!" }
```
And returns:
```json
{ "label": "SPAM", "confidence": 94.5 }
```

---

### Phase 3 — Build the Frontend

1. Created `static/index.html` — the main HTML page
2. Split all CSS into separate files inside `static/css/`
3. Split all JavaScript into separate files inside `static/js/`:
   - `config.js` — stores constants and example messages
   - `api.js` — sends fetch requests to Flask
   - `ui.js` — updates the DOM with results
   - `app.js` — coordinates the above modules
   - `main.js` — starts the app on page load

---

### Phase 4 — Connect Frontend to Backend

The frontend sends the message to Flask using `fetch()`:

```javascript
const response = await fetch("/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message })
});
const data = await response.json();
```

Flask processes it through the Naive Bayes model and returns the prediction.

---

## 🏗️ SOLID Principles Applied

| Principle | Where Applied |
|-----------|--------------|
| **S** — Single Responsibility | Each file has one job: `classifier.py` only predicts, `routes.py` only handles HTTP, `ui.js` only touches the DOM |
| **O** — Open/Closed | Add new example messages in `config.js` without changing any other file. Change the theme in `tokens.css` without touching other CSS |
| **L** — Liskov Substitution | `ApiService` in `api.js` can be replaced with a mock for testing |
| **I** — Interface Segregation | `App` never calls `getElementById` directly — only calls `UI` methods |
| **D** — Dependency Inversion | `app.py` depends on `SpamClassifier` as an abstraction, not on `pickle` directly |

---

## 👥 Team

| Name | Role |
|------|------|
| Kym  | ML Training + Backend + Frontend |
| _(add your groupmates here)_ | _(their role)_ |

---

## 📄 License

This project was created for academic purposes as part of an AI subject.
