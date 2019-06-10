#!/usr/bin/env python3

import requests
import json

HOST = 'http://localhost:8081'

def registerUser(username, password):
  
   user = {
       "username" : username,
       "password": password 
   }

   response = requests.post(HOST + '/user/signup', data=user);
   print(response.json())

users = [
    {
        "username": "mbrito",
        "password": "password",
    },
    {
        "username": "teste",
        "password": "password",
    },
    {
        "username": "admink",
        "password": "password",
    },
]

def createEvent(event):
    
   response = requests.post(HOST + '/event/create', data=event);
   print(response.json())

events = [
    {
        "name": "Benfica x Porto",
        "ispremium": "false",
        "sport" : {
            "name" : "Football"
        }
    }
]


# Starts here

print("Creating users!")
for user in users:
    registerUser(user['username'], user['password'])

print("Creating events!")
for event in events:
    jsond = json.dumps(event)
    print("Printing jsond")
    print(jsond)
    createEvent(jsond)







