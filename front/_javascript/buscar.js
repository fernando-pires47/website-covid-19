
function mudaFoto (foto){
    document.getElementById("icone").src = foto;
}

var botaoBuscar = document.querySelector("#vbuscar");

botaoBuscar.addEventListener("click", function (event) {
    event.preventDefault();

    var form = document.querySelector("#formulario");

    var object = getObject(form);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/cadastro/" + object.dataref + '/' + object.cidade + '/' + object.estado);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

    xhr.addEventListener("load", () => {
        if (xhr.status == 200) {
            var response = xhr.response;
            console.log(response);

            createTable(JSON.parse(xhr.response));

        } else {
            console.log(xhr.response);
            alert("Erro ao buscar os dados")
        }
    });

    console.log("Load success.");
});

function getObject(form) {
    return{
        dataref : form.dataref.value == '' ? null : form.dataref.value,
        estado  : form.estado.value == '' ? null : form.estado.value,
        cidade  : form.cidade.value == '' ? null : form.cidade.value
    }
}


function createTable(list) {

    var tbody = document.querySelector("tbody");

    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.lastChild);
    }

    if(list.length > 0){

        var vtotcasos = 0;
        var vrecuperados = 0;
        var vmortos = 0;
        for(var obj of list){
            var tr = document.createElement("tr");

            tr.appendChild(createTd(obj.daterefstring));
            tr.appendChild(createTd(obj.cidade));
            tr.appendChild(createTd(obj.estado));
            tr.appendChild(createTd(obj.totcasos));
            tr.appendChild(createTd(obj.recuperados));
            tr.appendChild(createTd(obj.mortos));

            tbody.appendChild(tr);

            vtotcasos += obj.totcasos;
            vrecuperados += obj.recuperados;
            vmortos += obj.mortos;

        }

        var tr = document.createElement("tr");
        var style = "background-color: #adabab;font-weight : bold";
        tr.appendChild(createTdTotalizer("Total",style,3));
        tr.appendChild(createTdTotalizer(vtotcasos,style));
        tr.appendChild(createTdTotalizer(vrecuperados,style));
        tr.appendChild(createTdTotalizer(vmortos,style));

        tbody.appendChild(tr);
    }
}

function createTdTotalizer(data,style,colspan = null){

    var td = document.createElement("td");
    td.textContent = data;

    if(colspan != null){
        td.colSpan = colspan;
    }

    if(style != null){
        td.setAttribute("style",style);
    }

    return td;
}

function createTd(data){
    var td = document.createElement("td");
    td.textContent = data;

    return td;
}

