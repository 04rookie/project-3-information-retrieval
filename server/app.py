from chitchat import ChitChat
from bot import Bot
import json
import uuid
import sys
from flask import Flask, request, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

chatInstances = {}
MAX_INST = 45

@app.route('/init', methods=['POST'])
def init():
    data = request.json
    selectedTopics = data['topics']
    bot = Bot(selectedTopics)
    chatID = str(uuid.uuid4())
    #print(len(chatInstances), file=sys.stderr)
    if(len(chatInstances) > MAX_INST):
        resp = {'chatID': '', 'content': 'Queue Overflow'}
        response = Response(json.dumps(resp, indent=4), mimetype='application/json', status=404)
        return response

    chatInstances[chatID] = bot
    resp = {'chatID': chatID, 'content': bot.greetMsg}
    response = Response(json.dumps(resp, indent=4), mimetype='application/json')
    return response

@app.route('/end', methods=['POST'])
def delSess():
    data = request.json
    chatID = data['chatID']
    if(chatID not in chatInstances):
        response = Response(json.dumps({'content': {'message': 'Invalid chatID', 'meta': {'topics': [], 'urls': []}}}, indent=4), status=404)
        #print(chatID, len(chatInstances), file=sys.stderr)
        return response

    del chatInstances[chatID]
    #print(len(chatInstances), file=sys.stderr)
    resp = {'content': 'Session Ended'}
    response = Response(json.dumps(resp, indent=4), mimetype='application/json')
    return response

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    chatID, prompt, topics, updTopic = data['chatID'], data['prompt'], data['topics'], data['updTopic']
    if(chatID not in chatInstances):
        response = Response(json.dumps({'content': {'message': 'Invalid chatID', 'meta': {'topics': [], 'urls': []}}}, indent=4), status=404)
    else:
        resp, ref = chatInstances[chatID].query(prompt, topics, updTopic)
        if(ref == None): chatInstances.pop(chatID) #delete ref from instances
        resp = {'chatID': chatID, 'content': resp}
        response = Response(json.dumps(resp, indent=4), mimetype='application/json')

    return response

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=9999)
