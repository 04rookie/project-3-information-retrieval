from chitchat import ChitChat
from bot import Bot
import json
import uuid
from flask import Flask, request, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

chatInstances = {}

@app.route('/init', methods=['POST'])
def init():
    data = request.json
    selectedTopics = data['topics']
    print(selectedTopics)
    bot = Bot(selectedTopics)
    chatID = str(uuid.uuid4())
    chatInstances[chatID] = bot
    resp = {'chatID': chatID, 'content': bot.greetMsg}
    response = Response(json.dumps(resp, indent=4), mimetype='application/json')
    return response

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    chatID, prompt, topics, updTopic = data['chatID'], data['prompt'], data['topics'], data['updTopic']
    if(chatID not in chatInstances):
        response = Response(json.dumps({'content': 'Invalid chatID'}, indent=4), status=404)
    else:
        resp, ref = chatInstances[chatID].query(prompt, topics, updTopic)
        if(ref == None): chatInstances.pop(chatID) #delete ref from instances
        resp = {'chatID': chatID, 'content': resp}
        response = Response(json.dumps(resp, indent=4), mimetype='application/json')

    return response

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=9999)