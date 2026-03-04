from flask import Flask, request, jsonify, render_template
import joblib
import os

app = Flask(__name__)

# Get absolute base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model files safely using absolute path
model = joblib.load(os.path.join(BASE_DIR, "model/logistic_regression_model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "model/tfidf_vectorizer.pkl"))

label_decoder = {
    0: "Non-KBGO",
    1: "KBGO"
}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    x = vectorizer.transform([text])
    prediction = model.predict(x)[0]

    return jsonify({"result": label_decoder[prediction]})

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Render provides PORT
    app.run(host="0.0.0.0", port=port)