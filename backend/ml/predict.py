import sys
import os
import json
import numpy as np
import pandas as pd
import joblib

def predict_maintenance_risk(input_data):
    """
    Runs inference using the trained RandomForestClassifier model.
    Input features: temperature, vibration, runtime_hours, load_pct, days_since_service
    """
    model_path = os.path.join(os.path.dirname(__file__), 'rf_maintenance_model.joblib')
    
    if not os.path.exists(model_path):
        return {"error": f"Model file not found at {model_path}. Run train_model.py first."}
    
    rf_model = joblib.load(model_path)
    
    # Extract input values with fallbacks
    temp = float(input_data.get('temperature', 75.0))
    vib = float(input_data.get('vibration', 1.5))
    runtime = float(input_data.get('runtime_hours', 4000.0))
    load = float(input_data.get('load_pct', 65.0))
    days_service = float(input_data.get('days_since_service', 90.0))
    
    features = pd.DataFrame([{
        'temperature': temp,
        'vibration': vib,
        'runtime_hours': runtime,
        'load_pct': load,
        'days_since_service': days_service
    }])
    
    # Get failure class probability (Probability of Class 1: High Failure Risk)
    probs = rf_model.predict_proba(features)[0]
    failure_probability = float(probs[1]) * 100.0  # percentage 0 to 100%
    
    # Determine urgency level & estimated failure lead time based on probability
    if failure_probability >= 70.0:
        urgency = "high"
        projected_days = max(1, int(30 * (1 - failure_probability / 100.0)))
    elif failure_probability >= 40.0:
        urgency = "medium"
        projected_days = int(45 * (1 - failure_probability / 100.0)) + 7
    else:
        urgency = "low"
        projected_days = int(90 * (1 - failure_probability / 100.0)) + 20
        
    return {
        "status": "success",
        "failure_probability": round(failure_probability, 1),
        "urgency": urgency,
        "projected_failure_days": projected_days,
        "model_used": "RandomForestClassifier (scikit-learn)",
        "inputs_evaluated": {
            "temperature": temp,
            "vibration": vib,
            "runtime_hours": runtime,
            "load_pct": load,
            "days_since_service": days_service
        }
    }

if __name__ == '__main__':
    try:
        if len(sys.argv) > 1:
            raw_input = sys.argv[1]
            input_json = json.loads(raw_input)
        else:
            raw_input = sys.stdin.read()
            input_json = json.loads(raw_input) if raw_input.strip() else {}
        
        result = predict_maintenance_risk(input_json)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))
