from flask import Flask
from flask import render_template
from pymongo import MongoClient
from bson import json_util
from bson.json_util import dumps
import json

app = Flask(__name__)

@app.route("/")
def index():
	return render_template("gmaps.html")

if __name__ == "__main__":
	app.run(host='localhost',port=5000,debug=True)
