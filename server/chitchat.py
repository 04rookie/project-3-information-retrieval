from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

class ChitChat:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("facebook/blenderbot-400M-distill")
        self.model = AutoModelForSeq2SeqLM.from_pretrained("facebook/blenderbot-400M-distill")
        self.exitWords = ['bye']
        self.greetMsg = "Hello there! How can I help you today?"
        self.exitMsg = "Bye Bye!!"
    
    def generate(self, prompt):
        inputs = self.tokenizer([prompt], return_tensors="pt")
        outputs = self.model.generate(**inputs)
        response = self.tokenizer.batch_decode(outputs, skip_special_tokens = True)[0]
        return response

    def chat(self, prompt):
        if(prompt.lower()) in self.exitWords:
            return self.exitMsg, None
        response = self.generate(prompt)
        return response, self
