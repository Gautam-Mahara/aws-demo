import json
import random
# text to voice
import pyttsx3
import os
import speech_recognition as sr




# Step 1: Load the JSON file
with open('./archive/intents.json') as file:
    intents_data = json.load(file)

# Step 2: Loop through each intent and select a random pattern
for intent in intents_data['intents']:
    # Access the 'patterns' key within each intent
    patterns = intent['patterns']
    
    # Select a random pattern
    random_pattern = random.choice(patterns)
    
    # changing patterns to voice
    engine = pyttsx3.init()
    engine.say(random_pattern)
    engine.runAndWait()
    
    print(f"Random pattern from intent '{intent['tag']}': {random_pattern}")
    # print response
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Adjusting for ambient noise... Please wait.")
        recognizer.adjust_for_ambient_noise(source, duration=1)  # Adjust for ambient noise
        print("Listening for your voice...")
        
        # Capture the audio input from the microphone
        audio = recognizer.listen(source)

        try:
            # Use Google Web Speech API to convert audio to text
            text = recognizer.recognize_google(audio)
            print("You said: " + text)
            print( text)
        except sr.UnknownValueError:
            print("Sorry, I did not understand that.")
            # print('e') 
        except sr.RequestError as e:
            print(f"Could not request results from the speech recognition service; {e}")
    
    # listening respons
    # engine = pyttsx3.init()
    # engine.say("Please say your response")
    # engine.runAndWait()
    
    # listening response
    # convert voice to text
    
    
    # Sleep till the user responds    
    os.system("pause")
    
    # Print the result
   
    print("Please say your response")
