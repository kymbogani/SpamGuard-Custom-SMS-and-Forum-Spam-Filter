# routes.py
# Single Responsibility: defines HTTP routes and handles request/response.
# Does NOT contain ML logic — delegates all predictions to SpamClassifier.
# Open/Closed: add new routes here without touching classifier.py or app.py.

from flask import Flask, Response, jsonify, request

from classifier import SpamClassifier


def register_routes(app: Flask, classifier: SpamClassifier) -> None:
    """Attach all URL routes to *app* using the given *classifier*."""

    @app.route("/")
    def index() -> Response:
        """Serve the main HTML page."""
        return app.send_static_file("index.html")

    @app.route("/predict", methods=["POST"])
    def predict() -> tuple[Response, int]:
        """
        Accept a JSON body with a 'message' field and return a prediction.

        Request body:
            { "message": "Your text here" }

        Response (200):
            { "label": "SPAM" | "HAM", "confidence": 94.5 }

        Response (400) — missing or empty message:
            { "error": "..." }
        """
        body    = request.get_json(silent=True) or {}
        message = body.get("message", "").strip()

        if not message:
            return jsonify({"error": "Field 'message' is required and cannot be empty."}), 400

        result = classifier.predict(message)

        return jsonify({
            "label":      result.label,
            "confidence": result.confidence,
        }), 200