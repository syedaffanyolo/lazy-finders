from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

db = mysql.connector.connect(
    host="localhost",
    port=3306,
    user="root",
    password="",
    database="order_tracking"
)

cursor = db.cursor()

app = Flask(__name__)
CORS(app)  

@app.route('/<tracking_id>')
def process(tracking_id):

    cursor.execute(f"select * from tracking where id={tracking_id};")

    response = []

    for i in cursor:
        response.append(i)

    return jsonify(response[0])

if __name__ == '__main__':
    app.run()
