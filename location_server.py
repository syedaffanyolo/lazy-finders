from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
pt = {'lat': 0, 'lon': 0}

@app.route('/<lat>/<lon>')
def get_location(lat, lon):
    pt['lat'] = lat
    pt['lon'] = lon
    return jsonify({'lat': lat, 'lon': lon})

@app.route('/')
def send_location():
    return jsonify({'lat': pt['lat'], 'lon': pt['lon']})

if __name__ == '__main__':
    app.run()

