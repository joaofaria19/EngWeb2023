import json

def ordCidade(cidade):
    return cidade['nome']

f = open("mapa.json")
mapa = json.load(f)

cidades = mapa['cidades']

distritosD = dict() 
for cidade in cidades:
    if cidade['distrito'] not in distritosD:
        distritosD[cidade['distrito']] = [cidade]
    else:
        cidadesDistrito = distritosD[cidade['distrito']]
        cidadesDistrito.append(cidade)
        cidadesDistrito.sort(key=ordCidade)

distritos = list(distritosD.keys())
distritos.sort()

pageHTML ="""
<!DOCTYPE html>
<html>
    <head>
        <title>MapaVirtual</title>
        <meta charset="utf-8 />"
    </head>
    <body>
        <h1>Índice</h1>
        <ol>
"""    
for d in distritos:
    pageHTML+=f"""
    <li>
        <h3>{d}</h3>
        <ul>
    """
    lista_cidades = distritosD[d]
    for lc in lista_cidades:
        pageHTML+=f"""
        <li>
            <a href='/{lc['id']}'>{lc['nome']}</a>
        </li>"""
    pageHTML+="""
        </ul>
    </li>"""
    
pageHTML+="""    
    </body>
</html>
"""

with open("index.html", "w") as arquivo:
    arquivo.write(pageHTML)
