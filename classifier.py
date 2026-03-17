# classifier.py
# Single Responsibility: loads the trained model and makes predictions.
# All ML logic lives here. Routes and app setup never touch pickle directly.

import pickle
from dataclasses import dataclass


@dataclass
class PredictionResult:
    """Value object that holds a single prediction outcome."""
    label: str          # "SPAM" or "HAM"
    confidence: float   # 0.0 – 100.0


class SpamClassifier:
    """
    Wraps the trained Naive Bayes model and its vectorizer.

    Responsibilities:
        - Load model and vectorizer from disk (once, at startup)
        - Transform raw text into features
        - Return a PredictionResult

    Does NOT handle HTTP, routing, or serialization.
    """

    SPAM_LABEL = "SPAM"
    HAM_LABEL  = "HAM"

    def __init__(self, model_path: str, vectorizer_path: str) -> None:
        self._model      = self._load_pickle(model_path)
        self._vectorizer = self._load_pickle(vectorizer_path)

    # ------------------------------------------------------------------ #
    #  Public API                                                          #
    # ------------------------------------------------------------------ #

    def predict(self, message: str) -> PredictionResult:
        """
        Predict whether *message* is spam or ham.

        Args:
            message: Raw text string from the user.

        Returns:
            PredictionResult with a label and confidence percentage.
        """
        features    = self._vectorizer.transform([message])
        prediction  = self._model.predict(features)[0]
        probability = self._model.predict_proba(features)[0]

        label      = self.SPAM_LABEL if prediction == 1 else self.HAM_LABEL
        confidence = round(float(max(probability)) * 100, 2)

        return PredictionResult(label=label, confidence=confidence)

    # ------------------------------------------------------------------ #
    #  Private helpers                                                     #
    # ------------------------------------------------------------------ #

    @staticmethod
    def _load_pickle(path: str):
        """Load and return a pickled object from *path*."""
        with open(path, "rb") as file:
            return pickle.load(file)