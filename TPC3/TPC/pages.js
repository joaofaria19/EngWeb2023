// mypage.js
// 2023-03-01 by 97652


/* 
Função responsável por gerar a página inicial
Recebe como argumento uma data, presente no footer
*/
exports.getMainPage = function(data){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head> 
        <meta charset = "utf-8"/>
        <title>Pessoas</title>
        <link rel="stylesheet" href="w3.css"/> 
        <style>
            footer {
                position: fixed;
                bottom: 0;
                width: 100%;
                height: 50px;
            }
        </style>
    </head>
    <body>        
        <div class="w3-bar w3-teal  w3-large">
            <a href="http://localhost:7777/" class="w3-bar-item w3-button" style="width:20%">Home</a>
            <a href="http://localhost:7777/sexs" class="w3-bar-item w3-button" style="width:20%">Distribuição por sexo</a>
            <a href="http://localhost:7777/sports" class="w3-bar-item w3-button" style="width:20%">Distribuição por desporto</a>
            <a href="http://localhost:7777/top10jobs" class="w3-bar-item w3-button" style="width:20%">Top 10 profissões</a>
            <div class="w3-dropdown-hover" style="width:20%">
                <button class="w3-bar-item w3-button">Listar Pesoas</button>
                <div class="w3-dropdown-content w3-bar-block w3-card-4">
                    <a href="http://localhost:7777/people" class="w3-bar-item w3-button">Listar pessoas</a>
                    <a href="http://localhost:7777/people/asc" class="w3-bar-item w3-button">Listar pessoas(Ordem Crescente)</a>
                    <a href="http://localhost:7777/people/desc" class="w3-bar-item w3-button">Listar pessoas(Ordem Decrescente)</a>
                </div>
            </div>
        </div> 
        <footer class="w3-container w3-teal">
        <h5>Generated by a97652-server: ${data}</h5>
        </footer>
    </body>
</html>`

    return pagHTML
}

/* 
Função responsável por gerar a página com a lista de pessoas
Recebe como argumento a lista de pessoas a imprimir, e uma data, presente no footer
*/
exports.getPessoasPage = function(lista,data){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Pessoas</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-bar w3-teal  w3-large">
            <a href="http://localhost:7777/" class="w3-bar-item w3-button" style="width:20%">Home</a>    
            <a href="http://localhost:7777/sexs" class="w3-bar-item w3-button" style="width:20%">Distribuição por sexo</a>
            <a href="http://localhost:7777/sports" class="w3-bar-item w3-button" style="width:20%">Distribuição por desporto</a>
            <a href="http://localhost:7777/top10jobs" class="w3-bar-item w3-button" style="width:20%">Top 10 profissões</a>
            <div class="w3-dropdown-hover" style="width:20%">
                <button class="w3-bar-item w3-button">Listar Pesoas</button>
                <div class="w3-dropdown-content w3-bar-block w3-card-4">
                    <a href="http://localhost:7777/people" class="w3-bar-item w3-button">Listar pessoas</a>
                    <a href="http://localhost:7777/people/asc" class="w3-bar-item w3-button">Listar pessoas(Ordem Crescente)</a>
                    <a href="http://localhost:7777/people/desc" class="w3-bar-item w3-button">Listar pessoas(Ordem Decrescente)</a>
                </div>
            </div>
        </div> 
        <div class="w3-card-4">

            <header class="w3-container w3-teal">
                <h1>Lista de Pessoas [${lista.length} pessoas]</h1>
            </header>
    
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Sexo</th>
                  <th>Cidade</th>
                </tr>`
    
    for(let i=0; i<lista.length; i++){
        pagHTML += `
                <tr>
                    <td>${lista[i].id}</td>
                    <td>
                        <a href="http://localhost:7777/${lista[i].id}">
                        ${lista[i].nome}
                        </a>
                    </td>
                    <td>${lista[i].idade}</td>
                    <td>${lista[i].sexo}</td>
                    <td>${lista[i].morada.cidade}</td>
                </tr>        
        `
    }            
    
    pagHTML+= `           
            </table>
        </div>

        <footer class="w3-container w3-teal">
            <h5>Generated by a97652-server: ${data}</h5>
        </footer>

        </div> 
    </body>
</html>
    `
return pagHTML
}

/* 
Função responsável por gerar a página com a distribuição de pessoas por sexo
Recebe como argumento a lista de pessoas a imprimir, e uma data, presente no footer
*/
exports.getDistSexPage = function(lista,data){
    const mapaSex = new Map();
    mapaSex.set("feminino",0)
    mapaSex.set("masculino",0)
    mapaSex.set("outro",0)
    
    for(let i=0; i<lista.length;i++){
        if(lista[i].sexo.toLowerCase() == "feminino"){
            let valor = mapaSex.get("feminino");
            valor+=1;
            mapaSex.set("feminino",valor);
        }else if(lista[i].sexo.toLowerCase() == "masculino"){
            let valor = mapaSex.get("masculino");
            valor+=1;
            mapaSex.set("masculino",valor);
        }else{
            let valor = mapaSex.get("outro");
            valor+=1;
            mapaSex.set("outro",valor);
        }
    }
    
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Pessoas</title>
        <link rel="stylesheet" href="w3.css"/> 
        <style>
            footer {
                position: fixed;
                bottom: 0;
                width: 100%;
                height: 50px;
            }
        </style>
    </head>
    <body>
        <div class="w3-bar w3-teal  w3-large">
            <a href="http://localhost:7777/" class="w3-bar-item w3-button" style="width:20%">Home</a>    
            <a href="http://localhost:7777/sexs" class="w3-bar-item w3-button" style="width:20%">Distribuição por sexo</a>
            <a href="http://localhost:7777/sports" class="w3-bar-item w3-button" style="width:20%">Distribuição por desporto</a>
            <a href="http://localhost:7777/top10jobs" class="w3-bar-item w3-button" style="width:20%">Top 10 profissões</a>
            <div class="w3-dropdown-hover" style="width:20%">
                <button class="w3-bar-item w3-button">Listar Pesoas</button>
                <div class="w3-dropdown-content w3-bar-block w3-card-4">
                    <a href="http://localhost:7777/people" class="w3-bar-item w3-button">Listar pessoas</a>
                    <a href="http://localhost:7777/people/asc" class="w3-bar-item w3-button">Listar pessoas(Ordem Crescente)</a>
                    <a href="http://localhost:7777/people/desc" class="w3-bar-item w3-button">Listar pessoas(Ordem Decrescente)</a>
                </div>
            </div>
        </div> 
        <div class="w3-card-4">

            <header class="w3-container w3-teal">
                <h1>Distribuição por sexo</h1>
            </header>
    
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                  <th>Sexo</th>
                  <th>Nº pessoas</th>
                </tr>`
    
        pagHTML += `
                <tr>
                    <td>Feminino</td>
                    <td>
                        <a href="http://localhost:7777/sexs/feminino">
                        ${mapaSex.get("feminino")}
                        </a>
                    </td>
                </tr>
                <tr>
                <tr>
                    <td>Masculino</td>
                    <td>
                        <a href="http://localhost:7777/sexs/masculino">
                        ${mapaSex.get("masculino")}
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>Outro</td>
                    <td>
                        <a href="http://localhost:7777/sexs/outro">
                        ${mapaSex.get("outro")}
                        </a>
                    </td>
                </tr>    
        `
    pagHTML+= `           
            </table>
        </div>

        <footer class="w3-container w3-teal">
            <h5>Generated by a97652-server: ${data}</h5>
        </footer>

        </div> 
    </body>
</html>
    `
return pagHTML
}

/* 
Função responsável por gerar a página com a distribuição de pessoas por desporto
Recebe como argumento a lista de pessoas a imprimir, e uma data, presente no footer
*/
exports.getDistSportsPage = function(lista,data){
    const mapDesporto = new Map();
    for(let i=0; i<lista.length;i++){
        for(let j=0; j<lista[i].desportos.length;j++){
            if(mapDesporto.has((lista[i].desportos[j]))){
                let valor = mapDesporto.get((lista[i].desportos[j]));
                valor+=1;
                mapDesporto.set((lista[i].desportos[j]),valor);
            }else{
                mapDesporto.set((lista[i].desportos[j]),1);
            }
        }
    }
    
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Pessoas</title>
        <link rel="stylesheet" href="w3.css"/>

    </head>
    <body>
        <div class="w3-bar w3-teal  w3-large">
            <a href="http://localhost:7777/" class="w3-bar-item w3-button" style="width:20%">Home</a>    
            <a href="http://localhost:7777/sexs" class="w3-bar-item w3-button" style="width:20%">Distribuição por sexo</a>
            <a href="http://localhost:7777/sports" class="w3-bar-item w3-button" style="width:20%">Distribuição por desporto</a>
            <a href="http://localhost:7777/top10jobs" class="w3-bar-item w3-button" style="width:20%">Top 10 profissões</a>
            <div class="w3-dropdown-hover" style="width:20%">
                <button class="w3-bar-item w3-button">Listar Pesoas</button>
                <div class="w3-dropdown-content w3-bar-block w3-card-4">
                    <a href="http://localhost:7777/people" class="w3-bar-item w3-button">Listar pessoas</a>
                    <a href="http://localhost:7777/people/asc" class="w3-bar-item w3-button">Listar pessoas(Ordem Crescente)</a>
                    <a href="http://localhost:7777/people/desc" class="w3-bar-item w3-button">Listar pessoas(Ordem Decrescente)</a>
                </div>
            </div>
        </div>
        <div class="w3-card-4">

            <header class="w3-container w3-teal">
                <h1>Distribuição por desporto</h1>
            </header>
    
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Desporto</th>
                    <th>Nº de praticantes</th>
                </tr>`
  

        //Ciclo for para ver as keys existentes
        for(let i=0; i<mapDesporto.size;i++){
            pagHTML+=`
                <tr>
                    <td>${(Array.from(mapDesporto.keys()))[i]}</td>
                    <td>
                        <a href="http://localhost:7777/sports/${(Array.from(mapDesporto.keys()))[i]}">
                        ${mapDesporto.get((Array.from(mapDesporto.keys()))[i])}
                        </a>
                    </td>
                </tr>`
        }

    pagHTML+= `           
            </table>
        </div>

        <footer class="w3-container w3-teal">
            <h5>Generated by a97652-server: ${data}</h5>
        </footer>

        </div> 
    </body>
</html>`
return pagHTML
}

/* 
Função responsável por gerar a página com o top 10 de profissões
Recebe como argumento a lista de pessoas a imprimir, e uma data, presente no footer
*/
exports.getTop10Page = function(lista,data){
    const mapProfissao = new Map();
    for(let i=0; i<lista.length;i++){
        if(mapProfissao.has((lista[i].profissao))){
            let valor = mapProfissao.get((lista[i].profissao));
            valor+=1;
            mapProfissao.set((lista[i].profissao),valor);
        }else{
            mapProfissao.set((lista[i].profissao),1);
        }
    }
    
    var entries = Array.from(mapProfissao.entries())
    entries.sort((a, b) => b[1] - a[1])
    const sortedMap = new Map(entries)
        
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Pessoas</title>
        <link rel="stylesheet" href="w3.css"/>
        <style>
            footer {
                position: fixed;
                bottom: 0;
                width: 100%;
                height: 50px;
            }
        </style>
    </head>
    <body>
        <div class="w3-bar w3-teal  w3-large">
            <a href="http://localhost:7777/" class="w3-bar-item w3-button" style="width:20%">Home</a>    
            <a href="http://localhost:7777/sexs" class="w3-bar-item w3-button" style="width:20%">Distribuição por sexo</a>
            <a href="http://localhost:7777/sports" class="w3-bar-item w3-button" style="width:20%">Distribuição por desporto</a>
            <a href="http://localhost:7777/top10jobs" class="w3-bar-item w3-button" style="width:20%">Top 10 profissões</a>
            <div class="w3-dropdown-hover" style="width:20%">
                <button class="w3-bar-item w3-button">Listar Pesoas</button>
                <div class="w3-dropdown-content w3-bar-block w3-card-4">
                    <a href="http://localhost:7777/people" class="w3-bar-item w3-button">Listar pessoas</a>
                    <a href="http://localhost:7777/people/asc" class="w3-bar-item w3-button">Listar pessoas(Ordem Crescente)</a>
                    <a href="http://localhost:7777/people/desc" class="w3-bar-item w3-button">Listar pessoas(Ordem Decrescente)</a>
                </div>
            </div>
        </div>
        <div class="w3-card-4">

            <header class="w3-container w3-teal">
                <h1>Top 10 profissões</h1>
            </header>
    
        <div class="w3-container">
            <table class="w3-table-all">
                <tr>
                    <th>Profissão</th>
                    <th>Nº de trabalhadores</th>
                </tr>`
  

        //Ciclo for para ver as keys existentes
        for(let i=0; i<10;i++){
            pagHTML+=`
                <tr>
                    <td>${(Array.from(sortedMap.keys()))[i]}</td>
                    <td>
                        <a href="http://localhost:7777/top10jobs/${(Array.from(sortedMap.keys()))[i]}">
                        ${sortedMap.get((Array.from(sortedMap.keys()))[i])}
                        </a>
                    </td>
                </tr>`
        }

    pagHTML+= `           
            </table>
        </div>

        <footer class="w3-container w3-teal">
            <h5>Generated by a97652-server: ${data}</h5>
        </footer>

        </div> 
    </body>
</html>`
return pagHTML
}

/* 
Função responsável por gerar uma página pessoal
Recebe como argumento a pessoa cujo os dados devem ser impressos, e uma data, presente no footer
*/
exports.pessoaPage = function(pessoa,data){
    var flag_BI = false
    var flag_desc = false
    if(pessoa.BI)
        flag_BI=true
    if(pessoa.descrição)
        flag_desc=true
   
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>${pessoa.nome}</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">

            <header class="w3-container w3-teal">
                <h1>${pessoa.nome}</h1>
            </header>
    
        <div class="w3-container">
            <p><b>Idade:</b> ${pessoa.idade}</p>
            <p><b>Sexo:</b> ${pessoa.sexo}</p>`
    if(flag_BI){

        pagHTML+=`
            <p><b>BI:</b> ${pessoa.BI}</p>
        `
    }
    else{
        pagHTML+=`
            <p><b>CC:</b> ${pessoa.CC}</p>
        `
    }
    if(flag_desc){
        pagHTML+=`
            <p><b>Descrição:</b> ${pessoa.descrição}</p>
        `
    }
    pagHTML+=`
            <p><b>Morada:</b> ${pessoa.morada.cidade} (${pessoa.morada.distrito})</p>
            <p><b>Profissão:</b> ${pessoa.profissao}</p>       
            <p><b>Partido Político:</b> ${pessoa.partido_politico.party_name} (${pessoa.partido_politico.party_abbr})</p>
            <p><b>Religião</b> ${pessoa.religiao}</p>
            <p><b>Desportos:</b></p>
            <ul>        
            `
    for(let i=0; i<pessoa.desportos.length;i++){
        pagHTML+=`
                <li>${pessoa.desportos[i]}</li>
                `
    }
    pagHTML+=`
            </ul>`
    
    pagHTML+=`            
            <p><b>Animais Favoritos:</b></p>
            <ul>        
    `
    for(let i=0; i<pessoa.animais.length;i++){
    pagHTML+=`
                <li>${pessoa.animais[i]}</li>
            `
    }
    pagHTML+=`
            </ul>`
    pagHTML+=`            
            <p><b>Figura Pública:</b></p>
            <ul>        
    `
    for(let i=0; i<pessoa.figura_publica_pt.length;i++){
    pagHTML+=`
                <li>${pessoa.figura_publica_pt[i]}</li>
            `
    }
    pagHTML+=`
            </ul>`
    pagHTML+=`            
            <p><b>Destinos Favoritos:</b></p>
            <ul>        
    `
    for(let i=0; i<pessoa.animais.length;i++){
    pagHTML+=`
                <li>${pessoa.destinos_favoritos[i]}</li>
            `
    }
    pagHTML+=`
            </ul>`
    pagHTML+=`
            <p><b>Atributos</b></p>
            <table class="w3-table-all">
                <tr>
                    <th>Fumador</th>
                    <th>Gosta de cinema</th>
                    <th>Gosta de Viajar</th>
                    <th>Acorda cedo</th>
                    <th>Gosta de Ler</th>
                    <th>Gosta de música</th>
                    <th>Gosta de Comer</th>
                    <th>Gosta de Animais de estimação</th>
                    <th>Gosta de Dançar</th>
                </tr>
                <tr>
                    <td>${pessoa.atributos.fumador}</td>
                    <td>${pessoa.atributos.gosta_cinema}</td>
                    <td>${pessoa.atributos.gosta_viajar}</td>
                    <td>${pessoa.atributos.acordar_cedo}</td>
                    <td>${pessoa.atributos.gosta_ler}</td>
                    <td>${pessoa.atributos.gosta_musica}</td>
                    <td>${pessoa.atributos.gosta_comer}</td>
                    <td>${pessoa.atributos.gosta_animais_estimacao}</td>
                    <td>${pessoa.atributos.gosta_dancar}</td>
                </tr>
            </table>
            <p><b>Comida Favorita:</b> ${pessoa.atributos.comida_favorita}</p>
            <p><b>Marca do Carro:</b> ${pessoa.marca_carro}</p>
            <p><b>Id:</b> ${pessoa.id}</p>
            <div class="w3-center">
                <button class="w3-button w3-round-xlarge w3-large w3-hover-grey w3-teal"><a href="http://localhost:7777/">Home</a></button>
            </div
            `
    pagHTML+= `
        </div>
        <footer class="w3-container w3-teal">
        <h5>Generated by a97652-server: ${data}</h5>
        </footer>

        </div> 
    </body>
</html>
    `
return pagHTML
}

