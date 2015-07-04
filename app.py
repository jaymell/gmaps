from flask import Flask
from flask import render_template
from pymongo import MongoClient
from bson import json_util
from bson.json_util import dumps
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DB_NAME = 'top_sites'
COLLECTION_NAME = 'sites'
connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
collection = connection[DB_NAME][COLLECTION_NAME]

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/json")
def get_json():
	sites = [ i for i in collection.find({}, {'_id': False}) ]
	sites = json.dumps(sites, default=json_util.default)
	return sites
	
if __name__ == "__main__":
	app.run(host='0.0.0.0',port=5000,debug=True)
