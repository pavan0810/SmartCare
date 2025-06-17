import json
from flask import Flask, jsonify, request
import joblib
import numpy as np
model = joblib.load('./rf_model.pkl')

app = Flask(__name__)
@app.route('/getPatientSeverity', methods=['POST'])
def getPatientSeverity():
    try:
        data = request.get_json()
        patientSymptoms = data.get('symptoms', [])
        prediction = model.predict(np.array([patientSymptoms]))
        return jsonify({"severity": prediction[0]})
    except Exception as e:
        print(e)
        return jsonify({"error" : "error"})

if __name__ == '__main__':
    app.run(port=5001)
