import json

def ordCidade(cidade):
    return cidade['nome']

f = open("mapa.json")
mapa = json.load(f)

cidades = mapa['cidades']
ligacoes = mapa['ligações']

dictDistritos = dict() 
dictCidades = dict()
dictIds = dict()

for cidade in cidades:
    dictCidades[cidade['id']] = cidade
    dictIds[cidade['id']] = []
    for local in ligacoes:
        if local['origem'] == cidade['id']:
            lista = dictIds[cidade['id']]
            lista.append({
                "id" : local['destino'],
                "distância" : local['distância']})
            
    if cidade['distrito'] not in dictDistritos:
        dictDistritos[cidade['distrito']] = [cidade]
    else:
        cidadesDistrito = dictDistritos[cidade['distrito']]
        cidadesDistrito.append(cidade)
        cidadesDistrito.sort(key=ordCidade)

distritos = list(dictDistritos.keys())
distritos.sort()

# Função para criar a página html do indice
def cria_indice():
    indiceHTML ="""<!DOCTYPE html>
    <html>
        <head>
            <title>Mapa Virtual</title>
            <meta charset="utf-8" />
        </head>
        <body>
            <h1>Distritos de Portugal</h1>
            <ol>
    """    
    for d in distritos:
        indiceHTML+=f"""
            <li>
                <h3>{d}</h3>
                <ul>
        """
        lista_cidades = dictDistritos[d]
        for lc in lista_cidades:
            indiceHTML+=f"""
                <li>
                    <a href='/{lc['id']}'>{lc['nome']}</a>
                </li>"""
        indiceHTML+="""
            </ul>
        </li>"""

    indiceHTML+="""    
        </body>
    </html>
    """
    # Salvar a página html com o nome index
    with open("./html/index.html", "w") as arquivo:
        arquivo.write(indiceHTML)

# Função para criar a página html de uma cidade especifica
def pagina_cidade(cidade):
    idcidade = cidade['id']
    nome = cidade['nome']
    populacao = cidade['população']
    descricao = cidade['descrição']
    distrito = cidade['distrito']

    pageHTML = f"""<!DOCTYPE html>
<html>
    <head>
        <title>{nome}</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <a name="{idcidade}"/>
        <h1>{nome}</h1>
        <p><b>População: </b>{populacao}</p>
        <p><b>Descrição: </b>{descricao}</p>
        <p><b>Distrito: </b>{distrito}</p>
        <p><b>Ligações: </b></p>
        <ul>
    """
    for vizinho in dictIds[idcidade]:
        nomecidade = dictCidades[vizinho['id']]['nome']
        pageHTML += f"""          
            <li> 
                <a href='/{vizinho['id']}'>{nomecidade}</a> : {vizinho['distância']} km
            </li>"""
    pageHTML += """
        </ul>
    </body>
</html>
    """
    # Salvar a página HTML com o nome da cidade
    with open(f"./html/{idcidade}.html", "w") as arquivo:
        arquivo.write(pageHTML)

# Chamar a função para criar a página do indice
cria_indice()
# Chamar a função para cada cidade na lista
for cidade in cidades:
    pagina_cidade(cidade)
