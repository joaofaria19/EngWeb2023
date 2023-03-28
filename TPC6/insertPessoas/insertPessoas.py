import json
import requests

def post_data():
    i=0
    j=0
    increment = 10
    j=increment
    file = open('dataset.json','r')
    data = json.load(file)
    file.close()

    url = 'http://localhost:7777/pessoas/lista'
    
    while i < len(data):
        response = requests.post(url,json=data[i:j])
        i = j
        j+=increment
        print("Pessoa "+str(i)+" adicionada: "+str(response))
    print("Dataset importado com sucesso!")

post_data()
