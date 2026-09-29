import os
import json
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import joblib

def generate_simulated_telemetry_data(n_samples=1500, random_seed=42):
    """
    Generates realistic simulated equipment telemetry data for model training.
    DISCLAIMER: This dataset is SIMULATED data for prototype training.
    """
    np.random.seed(random_seed)
    
    # Feature 1: Operating Temperature (°C) - Range 40°C to 120°C
    temperature = np.random.uniform(40.0, 115.0, n_samples)
    
    # Feature 2: Vibration Level (mm/s) - Range 0.2 to 6.0 mm/s
    vibration = np.random.uniform(0.2, 5.8, n_samples)
    
    # Feature 3: Cumulative Runtime Hours - Range 500 to 15,000 hours
    runtime_hours = np.random.uniform(500, 15000, n_samples)
    
    # Feature 4: Operating Load Percentage (%) - Range 30% to 100%
    load_pct = np.random.uniform(30.0, 100.0, n_samples)
    
    # Feature 5: Days Since Last Maintenance - Range 10 to 300 days
    days_since_service = np.random.uniform(10, 300, n_samples)
    
    # Domain-inspired physical risk calculation formula to assign labels
    # Normalized risk factors:
    temp_risk = np.clip((temperature - 70) / 45.0, 0, 1)
    vib_risk = np.clip((vibration - 1.5) / 4.0, 0, 1)
    runtime_risk = np.clip((runtime_hours - 3000) / 10000.0, 0, 1)
    load_risk = np.clip((load_pct - 50) / 50.0, 0, 1)
    service_risk = np.clip((days_since_service - 60) / 200.0, 0, 1)
    
    # Composite risk score (0 to 100)
    raw_score = (
        0.30 * temp_risk +
        0.30 * vib_risk +
        0.15 * runtime_risk +
        0.10 * load_risk +
        0.15 * service_risk
    ) * 100.0
    
    # Add gaussian noise to simulate real sensor unpredictability
    noisy_score = raw_score + np.random.normal(0, 5, n_samples)
    noisy_score = np.clip(noisy_score, 0, 100)
    
    # Target Binary Label: High Failure Risk within 30 days (1 = High Risk > 60%, 0 = Low Risk)
    target = (noisy_score >= 55.0).astype(int)
    
    df = pd.DataFrame({
        'temperature': temperature,
        'vibration': vibration,
        'runtime_hours': runtime_hours,
        'load_pct': load_pct,
        'days_since_service': days_since_service,
        'failure_risk_target': target
    })
    
    return df

def train_and_evaluate_model():
    print("[ML Training] Generating 1,500 rows of SIMULATED equipment telemetry data...")
    df = generate_simulated_telemetry_data(n_samples=1500)
    
    X = df[['temperature', 'vibration', 'runtime_hours', 'load_pct', 'days_since_service']]
    y = df['failure_risk_target']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
    
    # Train Random Forest Classifier
    rf_model = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)
    rf_model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = rf_model.predict(X_test)
    acc = float(accuracy_score(y_test, y_pred))
    prec = float(precision_score(y_test, y_pred))
    rec = float(recall_score(y_test, y_pred))
    f1 = float(f1_score(y_test, y_pred))
    
    feature_importances = dict(zip(X.columns, rf_model.feature_importances_.round(4).tolist()))
    
    print(f"[ML Training] Model Trained Successfully!")
    print(f" - Accuracy:  {acc * 100:.2f}%")
    print(f" - Precision: {prec * 100:.2f}%")
    print(f" - Recall:    {rec * 100:.2f}%")
    print(f" - F1-Score:  {f1 * 100:.2f}%")
    print(f" - Feature Importances: {feature_importances}")
    
    # Ensure backend/ml directory exists
    os.makedirs(os.path.dirname(__file__), exist_ok=True)
    
    # Save Model Artifact
    model_path = os.path.join(os.path.dirname(__file__), 'rf_maintenance_model.joblib')
    joblib.dump(rf_model, model_path)
    
    # Save Model Metadata & Evaluation Metrics
    metrics_data = {
        "model_type": "RandomForestClassifier (scikit-learn)",
        "dataset_type": "Simulated Equipment Telemetry (1,500 samples)",
        "features_used": ["temperature", "vibration", "runtime_hours", "load_pct", "days_since_service"],
        "target": "Failure Risk Level (High Risk vs Normal)",
        "metrics": {
            "accuracy": round(acc, 4),
            "precision": round(prec, 4),
            "recall": round(rec, 4),
            "f1_score": round(f1, 4)
        },
        "feature_importances": feature_importances,
        "trained_at": "2026-09-29"
    }
    
    metrics_path = os.path.join(os.path.dirname(__file__), 'model_metrics.json')
    with open(metrics_path, 'w') as f:
        json.dump(metrics_data, f, indent=2)
        
    print(f"[ML Training] Saved model artifact to {model_path}")
    print(f"[ML Training] Saved metrics summary to {metrics_path}")

if __name__ == '__main__':
    train_and_evaluate_model()
