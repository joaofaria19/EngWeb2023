import json

def ordName(pessoa):
    return pessoa['nome']

f = open('dataset-extra1.json','r')
pessoas = json.load(f)
f.close()

list_pessoas = pessoas['pessoas']

# listas das pessoas ordenada alfabeticamente
# pessoas.sort(key=ordName)

for index, pessoa in  enumerate(list_pessoas):
    pessoa['id'] = "p"+str(index)


nf = open('dataset.json','w')
json.dump(pessoas,nf)
nf.close()