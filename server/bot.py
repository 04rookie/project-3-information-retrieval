from chitchat import ChitChat
from wiki import WikiBot
from classifier import Classifier

class Bot:
    def __init__(self, selectedTopics):
        self.exitWords = ['bye']
        self.greetMsg = "Hello there! How can I help you today?"
        self.exitMsg = "Bye Bye!!"
        self.cls = Classifier()
        self.chitChatBot = ChitChat()
        self.wikiBot = WikiBot(selectedTopics)
        self.activeBot = self.chitChatBot if len(selectedTopics) == 0 else self.wikiBot

    def query(self, prompt, selectedTopics = [], updTopic = False):
        if(prompt.lower()) in self.exitWords:
            return self.exitMsg, None
        
        if(len(selectedTopics) == 0):
            topicList = self.cls.classifyTopic(prompt)
            if(topicList == None): #chitchat
                self.activeBot = self.chitChatBot
            
            else: 
                self.wikiBot.updateTopic(topicList)
                self.activeBot = self.wikiBot
        
        else:
            self.wikiBot.updateTopic(selectedTopics)
            self.activeBot = self.wikiBot
            
        resp, ref = self.activeBot.chat(prompt)
        return resp, ref
        
if __name__ == "__main__":
    cnt = Bot([])
    cnt.query("clothes", updTopic = True)