import numpy as np
from transformers import pipeline

class Classifier:
    def __init__(self):
        model_name = "facebook/bart-large-mnli"
        revision = "d7645e1"
        self.classifier = pipeline("zero-shot-classification", model=model_name, revision=revision)
        self.candidateLabels = ["General Chitchat", "Health", "Environment", "Technology ", "Economy", "Entertainment", "Sports", "Politics", "Education", "Travel", "Food"]

    def classifyTopic(self, text):
        result = self.classifier(text, self.candidateLabels)
        idx = np.argwhere(np.array(result['scores']) > 0.2)
        
        if(idx.shape[0] == 0): return np.array(["General Chitchat"]) #chitchat

        topic = np.array(result['labels'])[idx]
        return topic
