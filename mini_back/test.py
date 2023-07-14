from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
import certifi
ca=certifi.where()

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

dburl = "mongodb+srv://anilreddykesireddy:Anilreddy%402305@cluster0.g45eqkn.mongodb.net/?retryWrites=true&w=majority"

@app.route('/post_mail', methods = ['POST'])
def PostMails():
    if(request.method == 'POST'):
        data = request.get_json()
        client = pymongo.MongoClient(dburl,tlsCAFile=ca)
        db = client.mini
        collection = db.emails
        collection.insert_one({
            "email": data["email"],
            "data": data["data"]
        })
        return "YES"

@app.route('/create_user', methods = ['POST'])
def CreateUser():
    if(request.method == 'POST'):
        data = request.get_json()
        client = pymongo.MongoClient(dburl,tlsCAFile=ca)
        db = client.mini
        collection = db.users
        collection.insert_one({
            "email": data["email"],
            "password": data["password"]
        })
        return "YES"

@app.route('/get_mails', methods = ['POST'])
def GetMails():
    if(request.method == 'POST'):
        Req = request.get_json()
        client = pymongo.MongoClient(dburl,tlsCAFile=ca)
        db = client.mini
        collection = db.emails
        data = list(collection.find({
             "email": Req["email"]
        }))
        newData = {}
        for i in range(len(data)):
             newData[i] = data[i]["data"]
        return jsonify(newData)

@app.route('/login', methods = ['POST'])
def Login():
    if(request.method == 'POST'):
        Req = request.get_json()
        client = pymongo.MongoClient(dburl,tlsCAFile=ca)
        db = client.mini
        collection = db.users
        data = list(collection.find({
             "email": Req["email"],
             "password": Req["password"]
        }))
        print(len(data))
        if len(data) == 0:
             return "No"
        else:
             return "Yes"

if __name__ == '__main__':
	app.run(debug = True)