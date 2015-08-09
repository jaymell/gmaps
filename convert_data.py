#!/usr/bin/python

from pymongo import MongoClient
from bson import json_util
from bson.json_util import dumps
import json


MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DB_NAME = 'top_sites'
connection = MongoClient(MONGODB_HOST, MONGODB_PORT)

def create_data_set():
	""" Right now, this just copies the original 'top_sites'
		collection into a new one """

	old_col = connection[DB_NAME]['top_sites']
	new_col = connection[DB_NAME]['gmaps']
	for i in old_col.find({}, {'_id': False}):
		new_col.insert_one(i)

def create_ip_list():
	""" create the ip collection from gmaps collection
		-- goal of this collection is to just have
		a flat array of all the ips rather than
		having to pull them out of embedded object """

	old_col = connection[DB_NAME]['gmaps']
	new_col = connection[DB_NAME]['gmaps_ips']
	new_col.drop()
	sites = [ i for i in old_col.find({}, {'_id': False}) ]
	for site in sites:
		print('site: ', site)
		url = site['url']
		for ip in site['ips']:
			print('ip: ', ip)
			site_id = new_col.insert_one({'ip': ip['ip'],
							 'url': url,  
							'latitude': ip['latitude'],
							'longitude': ip['longitude'],
							'country': ip['country']}
							).inserted_id

if __name__ == '__main__':
	create_ip_list()			
