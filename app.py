# app.py
# Entry point — only responsible for wiring and starting the server.
# Follows SOLID principles:
#   S — Each class/module has a single responsibility
#   O — Open for extension (add new routes) without modifying existing logic
#   L — SpamClassifier can be replaced with any classifier that has a predict() method
#   I — Interfaces are lean; nothing depends on more than it needs
#   D — High-level routes depend on abstractions (SpamClassifier), not pickle directly

from flask import Flask
from flask_cors import CORS

from classifier import SpamClassifier
from routes import register_routes


def create_app() -> Flask:
    """Application factory — creates and configures the Flask app."""
    app = Flask(__name__, static_folder="static")
    CORS(app)

    classifier = SpamClassifier(
        model_path="model/spam_model.pkl",
        vectorizer_path="model/vectorizer.pkl",
    )

    register_routes(app, classifier)
    return app


if __name__ == "__main__":
    flask_app = create_app()
    flask_app.run(debug=True)