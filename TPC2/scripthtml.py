import json

f = open("mapa.json")
mapa = json.load(f)


cidades = mapa['cidades']
ligacoes = mapa['ligações']

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


def pagina_cidade(cidade):
    idcidade = cidade['id']
    nome = cidade['nome']
    populacao = cidade['população']
    descricao = cidade['descrição']
    distrito = cidade['distrito']

    pageHTML = f"""
        <html>
            <head>
                <title>{nome}</title>
            </head>
            <body>
                <a name="{idcidade}"/>
                <h1>{nome}</h1>
                <p><h3>População: </h3>{populacao}</p>
                <p><h3>Descrição: </h3>{descricao}</p>
                <p><h3>Distrito: </h3>{distrito}</p>
                <h3>Ligações: </h3>
                <ul>
    """
    for vizinho in dictIds[idcidade]:
        nomecidade = dictCidades[vizinho['id']]['nome']
        pageHTML += f"<li> <a href='/{vizinho['id']}'>{nomecidade}</a> : {vizinho['distância']} km</li>"
    pageHTML += """
                </ul>
            </body>
        </html>
    """
    # Salvar a página HTML com o nome da cidade
    with open(f"{idcidade}.html", "w") as arquivo:
        arquivo.write(pageHTML)

# Chamar a função para cada cidade na lista
for cidade in cidades:
    pagina_cidade(cidade)
