
function mudaFoto (foto){
    document.getElementById("icone").src = foto;
}

var botaoSalvar = document.querySelector("#vsalvar");

botaoSalvar.addEventListener("click", function (event) {
    event.preventDefault();

    var form = document.querySelector("#formulario");

    var object = getObject(form);

    var erros = validateObject(object);

    if (erros.length > 0) {
        showError(erros);
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/cadastro",true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(object));

    xhr.addEventListener("load", () => {
        var erroAjax = document.querySelector("#erro-ajax");
        var info = document.querySelector("#info");
        var alert = document.querySelector("#alert");

        alert.classList.add("invisible");
        if (xhr.status == 200) {
            erroAjax.classList.add("invisible");
            var response = xhr.response;
            console.log(response);
    
            info.classList.remove("invisible");
            erroAjax.classList.add("invisible");

            clearForm(form);
        } else {
            info.classList.add("invisible");
            erroAjax.classList.remove("invisible");
        }
    });

    console.log("Load success.");
});

function clearForm(form){
    form.nome.value = null;
    form.cpf.value = null;
    form.email.value = null;
    form.dataref.value = null;
    form.cidade.value = null;
    form.estado.value = null;
    form.totcasos.value = null;
    form.recuperados.value = null;
    form.mortos.value = null;
    form.infocomplement.value = null;
}

function getObject(form) {
    return{
        nome        : form.nome.value,
        cpf         : form.cpf.value,
        email       : form.email.value,
        dataref     : form.dataref.value,
        cidade      : form.cidade.value,
        estado      : form.estado.value,
        totcasos    : form.totcasos.value,
        recuperados : form.recuperados.value,
        mortos      : form.mortos.value,
        infocomplement : form.infocomplement.value
    }
}


function validateObject(object) {
    var erros = [];

    if (object.nome.length == 0 ) {
        erros.push("Informe seu nome");
    }

    if (object.cpf.length == 0 || ! defaultNumber(object.cpf)) {
        erros.push("Informe seu CPF");
    }

    if (object.email.length == 0) {
        erros.push("Informe seu email");
    }

    if (object.dataref.length == 0) {
        erros.push("Informe a data de referência");
    }

    if (object.cidade.length == 0) {
        erros.push("Informe a cidade");
    }

    if (object.estado.length == 0) {
        erros.push("Informe o estado");
    }else if(object.estado.length != 2){
        erros.push("Estado informado está incorreto");
    }

    if (object.totcasos < 1) {
        erros.push("Informe o total de casos");
    }

    if (object.recuperados < 1) {
        erros.push("Informe a quantidade de recuperados");
    }

    if (object.mortos < 1) {
        erros.push("Informe a quantidade de mortos");
    }

    return erros;
}

function defaultNumber(val){

    if(val.length < 11){
        return false;
    }

    let array = ['0','1','2','3','4','5','6','7','8','9','-','/'];

    for(var vv of val){
        let equals = false;
        for(var x of array){
            if(vv == x){
                equals = true;
            }
        }
        if(! equals){
            return false;
        }
    }

    return true;
}

function showError(erros) {
    if(erros.length > 0){
        let str = '';
        
        for(var er of erros){
             str = str + er + '\n';
        }
     
        alert(str);
    }
}

