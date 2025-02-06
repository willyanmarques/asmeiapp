function doInit() {
    $("#welcome-page").show();
    $("#question-page").hide();
    $("#anotations-page").hide();

    $(".voltar-container").append(
        $(`<div id='card-voltar' class='card' style='height: auto;'><a title="Voltar" href="../../meu-diario/index.html"><img class="img-container" src="../../../src/images/icons/voltar.png"></a><div class='title-container'><span>Voltar</span></div></div>`)
    );

    //popular table de consultas

    let dataCookie = getCookieByName('consultas');

    if (dataCookie != undefined && dataCookie != '' && dataCookie != null) {
        let data = JSON.parse(dataCookie);
        if(data.length > 0)

        //MODELO
        // <button type="button" class="collapsible">Open Section 1</button>
        // <div class="content">
        //     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        //         et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        //         aliquip ex ea commodo consequat.
        //     </p>
        // </div>
        data.forEach(function (item) {
            item.dataEvento = new Date(moment(item.dataEvento, "YYYY-MM-DD"));
        });
        data.sort((a, b) => a.dataEvento - b.dataEvento);
        data.forEach(function (item, index) {
            var dataEvento = moment(item.dataEvento, "YYYY/MM/DD");
            var button = $(`<button type="button" class="collapsible">${item.nomeProf + ' - ' + dataEvento.format("DD/MM/YYYY") + `<a class='delete-button' style='text-decoration: none; float: right; color: white; margin-left: 20px;' href='#' id='${index}'>EXCLUIR</a>`}</button>`);
            var divContent = $(`<div class="content"><b>LOCAL:</b> ${item.local} <br><br></div>`)
                .append($(`<p style='font-size: small;'>${item.duvidas == '' || item.duvidas == undefined ? 'Você não tem anotações para esta consulta.' : item.duvidas}</p>`))
            $(".anotations-section").append(button);
            $(".anotations-section").append(divContent);
        });

    }
}

function handleClickSave() {
    $(document).on("click", '.save-button', function () {
        let dataEvento = $("input[type=date][id=dataEvento]").val();
        let horario = $("input[type=time][id=horario]").val();
        let nomeProf = $("input[type=text][id=nomeProf]").val().toUpperCase();
        let local = $("input[type=text][id=local]").val().toUpperCase();
        let duvidas = $("textarea").val().toUpperCase();

        let dataCookie = getCookieByName('consultas');

        if (dataEvento.trim() == '' || horario.trim() == '' || nomeProf.trim() == '' || local.trim() == '') {
            alert('Todos os campos são de preenchimento obrigatório, exceto o campo de dúvidas!');
            return;
        } else {

            let data = JSON.parse(dataCookie);

            if (dataCookie != undefined && dataCookie != '' && dataCookie != null) {

                if (data.length == 10) {
                    alert('Não é possível salvar mais que 10 consultas!');
                    return;
                }

                if (data.length > 0) {
                    let item = {
                        dataEvento: dataEvento,
                        horario: horario,
                        nomeProf: nomeProf,
                        local: local,
                        duvidas: duvidas
                    };
                    data.push(item);
                } else {
                    data = [
                        {
                            dataEvento: dataEvento,
                            horario: horario,
                            nomeProf: nomeProf,
                            local: local,
                            duvidas: duvidas
                        }
                    ];
                }
            } else {
                data = [
                    {
                        dataEvento: dataEvento,
                        horario: horario,
                        nomeProf: nomeProf,
                        local: local,
                        duvidas: duvidas
                    }
                ];
            }

            document.cookie = `consultas=${JSON.stringify(data)}`;
            alert('Consulta registrada com sucesso!');

            $('#form-consultas').trigger("reset");
        }

    });
}

function handleClickDelete() {
    $(document).on("click", '.delete-button', function () {
        deleteCookie('consultas', this.id); //nome do cookie + index do item a ser excluido
    });
}

function deleteCookie(cookieName, index) {
    let dataCookie = getCookieByName('consultas');

    if (dataCookie != undefined && dataCookie != '' && dataCookie != null) {
        let data = JSON.parse(dataCookie);
        if (data.length > 0) {
            data.forEach(function (item) {
                item.dataEvento = new Date(moment(item.dataEvento, "YYYY-MM-DD"));
            });
            data.sort((a, b) => a.dataEvento - b.dataEvento);
            data.splice(data.findIndex(function (item, idx) {
                return idx == index;
            }), 1);
            document.cookie = `consultas=${JSON.stringify(data)}`;
            refreshTable(data);
        }
    }
    //document.cookie = cookieName + '=; Max-Age=-99999999;';
}

function refreshTable(data) {
    $("button").remove(".collapsible");
    $("div").remove(".content");
    data.forEach(function (item, index) {
        var dataEvento = moment(item.dataEvento, "YYYY/MM/DD");
        var button = $(`<button type="button" class="collapsible">${item.nomeProf + ' - ' + dataEvento.format("DD/MM/YYYY") + `<a class='delete-button' style='text-decoration: none; float: right; color: white; margin-left: 20px;' href='#' id='${index}'>EXCLUIR</a>`}</button>`);
        var divContent = $(`<div class="content"><b>LOCAL:</b> ${item.local} <br><br></div>`)
            .append($(`<p style='font-size: small;'>${item.duvidas == '' || item.duvidas == undefined ? 'Você não tem anotações para esta consulta.' : item.duvidas}</p>`));
        $(".anotations-section").append(button);
        $(".anotations-section").append(divContent);
    });
    refreshToggle();
}

function refreshToggle(){
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}

function verAnotacoes() {
    $("#welcome-page").hide();
    $("#question-page").hide();
    $("#anotations-page").show();
    $('h2').html('Consultas Agendadas');
    $("div").remove("#card-voltar");
    $(".voltar-container").append(
        $(`<div id='card-voltar' class='card' style='height: auto;'><a title="Voltar" href="../../meu-diario/minhas-consultas/index.html"><img class="img-container" src="../../../src/images/icons/voltar.png"></a><div class='title-container'><span>Voltar</span></div></div>`)
    );
}

function anotar() {
    $("#welcome-page").hide();
    $("#question-page").show();
    $("#anotations-page").hide();
    $('h2').html('Anotar <br>nova consulta');
    $("div").remove("#card-voltar");
    $(".voltar-container").append(
        $(`<div id='card-voltar' class='card' style='height: auto;'><a title="Voltar" href="../../meu-diario/minhas-consultas/index.html"><img class="img-container" src="../../../src/images/icons/voltar.png"></a><div class='title-container'><span>Voltar</span></div></div>`)
    );
}

function getCookieByName(name) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

handleClickDelete();
handleClickSave();
doInit();
