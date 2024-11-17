
// Arduino Code for IoT Sensors in Predictive Maintenance

#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h> // For Environmental Sensing
#include <Adafruit_ADXL345_U.h> // For Vibration Detection

#define SEALEVELPRESSURE_HPA (1013.25)

// Sensor objects
Adafruit_BME280 bme;       // Environment sensor
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345); // Accelerometer

// Variables for data
float temperature, humidity, pressure;
float batteryVoltage = 12.5; // Simulated battery voltage
float vibration[3];          // Accelerometer data

// Setup function
void setup() {
  Serial.begin(9600);

  // Initialize BME280
  if (!bme.begin(0x76)) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }

  // Initialize accelerometer
  if (!accel.begin()) {
    Serial.println("Could not find a valid ADXL345 sensor, check wiring!");
    while (1);
  }
}

// Loop function
void loop() {
  // Read data from BME280
  temperature = bme.readTemperature();
  humidity = bme.readHumidity();
  pressure = bme.readPressure() / 100.0F;

  // Read data from Accelerometer
  sensors_event_t event;
  accel.getEvent(&event);
  vibration[0] = event.acceleration.x;
  vibration[1] = event.acceleration.y;
  vibration[2] = event.acceleration.z;

  // Simulate battery voltage fluctuation
  batteryVoltage += (random(-5, 5) / 100.0);

  // Output data
  Serial.print("Temperature: "); Serial.print(temperature); Serial.println(" °C");
  Serial.print("Humidity: "); Serial.print(humidity); Serial.println(" %");
  Serial.print("Pressure: "); Serial.print(pressure); Serial.println(" hPa");
  Serial.print("Battery Voltage: "); Serial.print(batteryVoltage); Serial.println(" V");
  Serial.print("Vibration - X: "); Serial.print(vibration[0]); Serial.print(" Y: "); 
  Serial.print(vibration[1]); Serial.print(" Z: "); Serial.println(vibration[2]);

  // Wait before next reading
  delay(2000);
}
