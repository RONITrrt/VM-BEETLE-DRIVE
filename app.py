from flask import Flask, jsonify, render_template
import random
import time

app = Flask(__name__)

# Route to serve the main HTML page
@app.route('/')
def home():
    return render_template('index.html')

# Route to provide vehicle data in JSON format
@app.route('/get_vehicle_data')
def get_vehicle_data():
    # Simulate real-time vehicle data
    data = {
        "battery_health": random.randint(70, 100),
        "temperature": round(random.uniform(15, 30), 1),
        "performance": round(random.uniform(75, 100), 2),
        "maintenance_prediction": random.randint(10, 30)
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
