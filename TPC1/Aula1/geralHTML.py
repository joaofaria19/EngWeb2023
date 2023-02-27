import json


def ordCidade(cidade):
    return cidade['nome']


f = open("mapa.json")

mapa = json.load(f)
cidades = mapa['cidades']
ligacoes = mapa['ligações']

cidades.sort(key=ordCidade)

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
                
pageHTML = """ 
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <!--Coluna Indice-->
                <td width="30%" valign="top">
                    <a name="indice">
                    <h3>Índice</h3>
                    </a>
                    <ol>
"""

for c in cidades:
    pageHTML += f"<li><a href='#{c['id']}'>{c['nome']}</li>"

pageHTML += """ 
                    </ol>
                </td>
                <!--Coluna Conteudo-->
                <td width="70%">
"""

for c in cidades:
    pageHTML += f"""    
    
                    <a name="{c['id']}"/>
                    <h3>{c['nome']}</h3>
                    <p><b>Distrito: </b> {c['distrito']}</p>
                    <p><b>População: </b> {c['população']}</p>
                    <p><b>Descrição: </b> {c['descrição']}</p>

                    <center>
                        <hr width="90%"/>
                    </center> 
                    <p><b>Ligações: </b><p>       
                    <ul>
"""
   
    for vizinho in dictIds[c['id']]:
            nomecidade = dictCidades[vizinho['id']]['nome']
            pageHTML += f"<li> <a href='#{vizinho['id']}'>{nomecidade}</a> : {vizinho['distância']} km</li>"
                
    pageHTML += """</ul>                    
                    <adress>[<a href="#indice">Voltar ao indice</a>]</adress>
"""

pageHTML += """

                </td>
            </tr>
        </table>
    </body>
</html>    
"""

print(pageHTML)
