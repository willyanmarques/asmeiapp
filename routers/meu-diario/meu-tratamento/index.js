function doInit() {
    $("#welcome-page").show();
    $("#question-page").hide();
    $("#anotations-page").hide();

    $(".voltar-container").append(
        $(`<div id='card-voltar' class='card' style='height: auto;'><a title="Voltar" href="../../meu-diario/index.html"><img class="img-container" src="../../../src/images/icons/voltar.png"></a><div class='title-container'><span>Voltar</span></div></div>`)
    );

    $("#card-voltar").css("margin-top", "-24px");

    //popular table de medicamentos

    let dataCookie = getCookieByName('medicamentos');

    if (dataCookie != undefined && dataCookie != '' && dataCookie != null) {
        let data = JSON.parse(dataCookie);
        data.forEach(function (item, index) {
            var tr = $(`<tr class='table-detail'></tr>`)
                .append($(`<td>${item.medicamento}</td>`))
                .append($(`<td style='text-align:center;font-size: small;'>${item.dose}</td>`))
                .append($(`<td style='text-align:center;'>${item.horario}</td>`))
                .append($(`<td style='text-align:center;font-size:small;'><a class='delete-button' style='text-decoration: none;' href='#' id='${index}'>EXCLUIR</a></td>`))
            $("table").append(tr);
        });
    }
}

function handleClickSave() {
    $(document).on("click", '.save-button', function () {
        let medicamento = $("input[type=text][id=medicamento]").val().toUpperCase();
        let dose = $("input[type=text][id=dose]").val().toUpperCase();
        let horario = $("input[type=time][id=horario]").val();

        let dataCookie = getCookieByName('medicamentos');

        if (medicamento.trim() == '' || dose.trim() == '' || horario.trim() == '') {
            alert('Todos os campos são de preenchimento obrigatório!');
            return;
        } else {

            let data = JSON.parse(dataCookie);

            if (dataCookie != undefined && dataCookie != '' && dataCookie != null) {

                if (data.length == 10) {
                    alert('Não é possível salvar mais que 10 medicamentos!');
                    return;
                }

                if (data.length > 0) {
                    let item = {
                        medicamento: medicamento,
                        dose: dose,
                        horario: horario
                    };
                    data.push(item);
                } else {
                    data = [
                        {
                            medicamento: medicamento,
                            dose: dose,
                            horario: horario
                        }
                    ];
                }
            } else {
                data = [
                    {
                        medicamento: medicamento,
                        dose: dose,
                        horario: horario
                    }
                ];
            }

            document.cookie = `medicamentos=${JSON.stringify(data)}`;
            alert('Medicamento registrado com sucesso!');

            $('#form-medicamentos').trigger("reset");
        }

    });
}

function handleClickDelete() {
    $(document).on("click", '.delete-button', function () {
        deleteCookie('medicamentos', this.id); //nome do cookie + index do item a ser excluido
    });
}

function deleteCookie(cookieName, index) {
    let dataCookie = getCookieByName('medicamentos');

    if (dataCookie != undefined && dataCookie != '' && dataCookie != null) {
        let data = JSON.parse(dataCookie);
        if (data.length > 0) {
            data.splice(data.findIndex(function (item, idx) {
                return idx == index;
            }), 1);
            document.cookie = `medicamentos=${JSON.stringify(data)}`;
            refreshTable(data);
        }
    }
    //document.cookie = cookieName + '=; Max-Age=-99999999;';
}

function refreshTable(data) {
    $("tr").remove(".table-detail");
    data.forEach(function (item, index) {
        var tr = $("<tr class='table-detail'></tr>")
            .append($(`<td>${item.medicamento}</td>`))
            .append($(`<td style='text-align:center;font-size: small;'>${item.dose}</td>`))
            .append($(`<td style='text-align:center;'>${item.horario}</td>`))
            .append($(`<td style='text-align:center;font-size:small;'><a class='delete-button' style='text-decoration: none;' href='#' id='${index}'>EXCLUIR</a></td>`))
        $("table").append(tr);
    });
}

function verAnotacoes() {
    $("#welcome-page").hide();
    $("#question-page").hide();
    $("#anotations-page").show();
    $('h2').html('Consultar Tratamento');
    $("div").remove("#card-voltar");
    $(".voltar-container").append(
        $(`<div id='card-voltar' class='card' style='height: auto;'><a title="Voltar" href="../../meu-diario/meu-tratamento/index.html"><img class="img-container" src="../../../src/images/icons/voltar.png"></a><div class='title-container'><span>Voltar</span></div></div>`)
    );
}

function anotar() {
    $("#welcome-page").hide();
    $("#question-page").show();
    $("#anotations-page").hide();
    $('h2').html('Anotar <br>novo tratamento');
    $("div").remove("#card-voltar");
    $(".voltar-container").append(
        $(`<div id='card-voltar' class='card' style='height: auto;'><a title="Voltar" href="../../meu-diario/meu-tratamento/index.html"><img class="img-container" src="../../../src/images/icons/voltar.png"></a><div class='title-container'><span>Voltar</span></div></div>`)
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
