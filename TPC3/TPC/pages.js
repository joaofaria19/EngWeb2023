// mypage.js
// 2023-03-01 by 97652

exports.getMainPage = function(data){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head> 
        <meta charset = "utf-8"/>
        <title>Pessoas</title>
        <link rel="stylesheet" href="w3.css"/> 
    </head>
    <body>
        <div class="w3-bar w3-teal  w3-xlarge"">
            <a href="http://localhost:7777/people" class="w3-bar-item w3-button" style="width:25%">Listar pessoas</a>
            <a href="http://localhost:7777/sexs" class="w3-bar-item w3-button" style="width:25%">Distribuição por sexo</a>
            <a href="http://localhost:7777/sports" class="w3-bar-item w3-button" style="width:25%">Distribuição por desporto</a>
            <a href="http://localhost:7777/top10jobs" class="w3-bar-item w3-button" style="width:25%">Top 10 profissões</a>
        </div> 
        <footer class="w3-container w3-teal">
          <h5>Generated by 97652-server: ${data}</h5>
        </footer>

    </body>
</html>`

    return pagHTML
}

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
                    <td>${lista[i].nome}</td>
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
            <h5>Generated by pessoas-server:${data}</h5>
        </footer>

        </div> 
    </body>
</html>
    `
return pagHTML
}

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
    </head>
    <body>
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
            <h5>Generated by pessoas-server:${data}</h5>
        </footer>

        </div> 
    </body>
</html>
    `
return pagHTML
}

exports.getDistSportsPage = function(lista,data){
    const mapDesporto = new Map();
    for(let i=0; i<lista.length;i++){
        for(let j=0; j<lista[i].desportos.length;j++){
            if(mapDesporto.has((lista[i].desportos[j]).toLowerCase())){
                let valor = mapDesporto.get((lista[i].desportos[j]).toLowerCase());
                valor+=1;
                mapDesporto.set((lista[i].desportos[j]).toLowerCase(),valor);
            }else{
                mapDesporto.set((lista[i].desportos[j]).toLowerCase(),1);
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
            <h5>Generated by pessoas-server:${data}</h5>
        </footer>

        </div> 
    </body>
</html>`
return pagHTML
}

exports.getTop10Page = function(lista,data){
    const mapProfissao = new Map();
    for(let i=0; i<lista.length;i++){
        if(mapProfissao.has((lista[i].profissao).toLowerCase())){
            let valor = mapProfissao.get((lista[i].profissao).toLowerCase());
            valor+=1;
            mapProfissao.set((lista[i].profissao).toLowerCase(),valor);
        }else{
            mapProfissao.set((lista[i].profissao).toLowerCase(),1);
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
    </head>
    <body>
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
            <h5>Generated by pessoas-server:${data}</h5>
        </footer>

        </div> 
    </body>
</html>`
return pagHTML
}