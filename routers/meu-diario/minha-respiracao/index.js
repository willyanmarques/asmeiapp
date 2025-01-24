function doInit() {
    $("#question-page").hide();

    $(".voltar-container").append(
        $(`<div id='card-voltar' class='card'><a title="Voltar" href="../../meu-diario/index.html"><img class="img-container" src="../../../src/images/icons/voltar.png"></a><div class='title-container'><span>Voltar</span></div></div>`)
    )

    $("#card-voltar").css("margin-top", "-24px");

    $(document).on("click", ".modal-btn-close", function () {
        $(".modal-body").html("");
        $("#appModal").css("display", "none");
        $('input[name=radio-minha-respiracao]').prop('checked', false); //LIMPAR ESCOLHA APOS FECHAR O MODAL
    })
}

function handleClickRadio() {
    $(document).on("click", "input[type=radio]", function () {
        let radioButton = $("input[type=radio][name=radio-minha-respiracao]:checked").val();
        console.log(radioButton);

        let text;

        switch (parseInt(radioButton)) {
            case 0:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">0 – Sem falta de ar</h3>";
                text += "<p>";
                text += "<br>Você está no controle! Continue com o uso correto dos seus medicamentos e mantenha o acompanhamento médico regular para prevenir crises.";
                text += "</p>";
                break;
            case 1:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">1 – Muito leve</h3>";
                text += "<p>";
                text += "<br>Tudo bem! Se notar algum outro sinal de desconforto, fique atento e evite esforços físicos intensos por agora. Hidrate-se e monitore sua respiração.";
                text += "</p>";
                break;
            case 2:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">2 – Leve</h3>";

                text += "<p>";
                text += "<br>Percebeu uma leve alteração na sua respiração? Diminua o ritmo das atividades, relaxe e siga as orientações do seu plano de ação da asma.";
                text += "<br><br>Caso tenha um remédio de alívio, verifique se é necessário usá-lo.";
                text += "</p>";
                break;
            case 3:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">3 – Desconfortável, mas tolerável</h3>";
                text += "<p>";
                text += "<br>Parece que está um pouco mais difícil respirar.";
                text += "<br><br>Sente-se em um lugar calmo, use técnicas de respiração lenta e avalie se precisa do seu remédio de alívio.";
                text += "<br><br>Monitore os sintomas.";
                text += "</p>";
                break;
            case 4:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">4 – Moderado</h3>";
                text += "<p>";
                text += "<br>Sua respiração está mais difícil.";
                text += "<br><br>Faça uma pausa imediata, use o remédio de alívio conforme orientado pelo seu médico e observe a resposta nas próximas horas.";
                text += "</p>";
                break;
            case 5:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">5 – Moderadamente intenso</h3>";
                text += "<p>";
                text += "<br>Atenção! Agora é importante ficar atento.";
                text += "<br><br>Use o remédio de alívio indicado, descanse e evite qualquer esforço físico.";
                text += "<br><br>Se os sintomas persistirem, procure ajuda médica.";
                text += "</p>";
                break;
            case 6:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">6 – Intenso</h3>";
                text += "<p>";
                text += "<br>Respirar está mais difícil.";
                text += "<br><br>Sente-se ou incline-se para frente, use o remédio de alívio e peça ajuda se os sintomas não melhorarem em 20 minutos.";
                text += "<br><br>Este é um momento de atenção.";
                text += "</p>";
                break;
            case 7:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">7 – Muito intenso</h3>";
                text += "<p>";
                text += "<br>Sua respiração está bastante desconfortável.";
                text += "<br><br>Use o remédio de alívio imediatamente e avise alguém sobre sua situação.";
                text += "<br><br>Se os sintomas não aliviarem rapidamente, prepare-se para buscar atendimento médico.";
                text += "</p>";
                break;
            case 8:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">8 – Muito grave</h3>";
                text += "<p>";
                text += "<br>Você está com grande dificuldade para respirar.";
                text += "<br><br>Use seu remédio de alívio e vá para a emergência imediatamente, pedindo ajuda de alguém se necessário.";
                text += "</p>";
                break;
            case 9:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">9 – Quase insuportável</h3>";
                text += "<p>";
                text += "<br>Este é um momento crítico.";
                text += "<br><br>Use o remédio de alívio enquanto se dirige à emergência.";
                text += "<br><br>Avise alguém para acompanhá-lo.";
                text += "<br><br>Não espere os sintomas piorarem.";
                text += "</p>";
                break;
            case 10:
                text = "<h3 style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\">10 – Máximo possível</h3>";
                text += "<p>";
                text += "<br>Situação grave. Respire com calma dentro do possível e busque ajuda médica de emergência imediatamente.";
                text += "<br><br>Use o remédio de alívio enquanto se dirige à emergência.";
                text += "<br><br>Avise alguém sobre sua condição para que possa ajudá-lo.";
                text += "</p>";
                break;

            default:
                break;
        }

        $('.modal-body').html(text);
        $("#appModal").css("display", "block");
        $("#appModal").css("padding-top", "190px");
        $(".modal-content").css("height", "auto");
        $(".modal-content").css("text-aling", "center");

    });
}

function startTest() {
    $("#welcome-page").hide();
    $("#question-page").show();
}

doInit();
handleClickRadio();
