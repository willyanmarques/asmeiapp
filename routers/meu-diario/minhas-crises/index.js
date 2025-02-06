function doInit() {
    $("#question-page").hide();

    $(".voltar-container").append(
        $(`<div id='card-voltar' class='card'><a title="Voltar" href="../../meu-diario/index.html"><img class="img-container" src="../../../src/images/icons/voltar.png"></a><div class='title-container'><span>Voltar</span></div></div>`)
    )

    $("#card-voltar").css("margin-top", "-24px");

    $(document).on("click", ".modal-btn-close", function () {
        $(".modal-body").html("");
        $("#appModal").css("display", "none");
    })
}

$(document).on("click", ".btn-saber-mais", function(){
    let text = '';
    text += "Lembre-se: o autocuidado é um passo importante para viver bem com asma.";
    text += "\n\nMas ele deve andar de mãos dadas com o acompanhamento profissional e o uso correto dos medicamentos indicados para você.";
    text += "\n\nJuntos, esses cuidados ajudam a melhorar sua qualidade de vida e manter sua saúde no controle.";
    alert(text);
});

function handlerClickCrises() {

    $(document).on("click", "input[type=checkbox]", function () {
        let text;
        let style = `style=\"text-align:center;background:#1c0c7a;color:white;padding:5px;text-transform:uppercase;\"`;
        let questionName = $(this).attr('name');
        switch (questionName) {
            case 'question1':
                text = `<h3 ${style}>TIVE TOSSE</h3>`;
                text += "<p>";
                text += "<br>A tosse pode ser um sinal de que sua asma não está completamente controlada.";
                text += "<br><br>Que tal observar quando ela acontece? Se é após o contato com poeira, fumaça ou esforço físico, tente evitar essas situações.";
                text += "<br><br>Não se esqueça de usar seus remédios conforme a orientação médica, e anote as ocasiões em que a tosse surge para conversar com seu médico na próxima consulta.";
                text += "</p>";
                break;
            case 'question2':
                text = `<h3 ${style}>FIQUEI COM FALTA DE AR</h3>`;
                text += "<p>";
                text += "<br>Sentir falta de ar pode ser assustador, mas é importante manter a calma.";
                text += "<br><br>Sente-se em um lugar confortável, use o remédio, caso tenha sido orientado pelo médico, e respire devagar.";
                text += "<br><br>Se isso acontecer com frequência, vale a pena revisar seu plano de tratamento com um profissional.";
                text += "</p>";
                break;
            case 'question3':
                text = `<h3 ${style}>SENTI APERTO NO PEITO</h3>`;
                text += "<p>";
                text += "<br>O aperto no peito pode ser um sinal de que algo está irritando seus pulmões.";
                text += "<br><br>Evite ambientes com fumaça, poeira ou cheiros fortes e use seu remédio, se necessário.";
                text += "<br><br>Anote o que aconteceu antes do sintoma para ajudar seu médico a identificar possíveis causas.";
                text += "</p>";
                break;
            case 'question4':
                text = `<h3 ${style}>TIVE CHIADO NO PEITO</h3>`;
                text += "<p>";
                text += "<br>O chiado no peito é um alerta de que seus pulmões estão comprometidos.";
                text += "<br><br>Nesses momentos, siga o tratamento e use remédio, se preciso.";
                text += "<br><br>Para evitar novas crises, mantenha sua rotina de remédios de controle e evite causas conhecidas.";
                text += "</p>";
                break;
            case 'question5':
                text = `<h3 ${style}>ACORDEI DURANTE A NOITE</h3>`;
                text += "<p>";
                text += "<br>Se a asma está te acordando é sinal DE que precisa de mais atenção.";
                text += "<br><br>Verifique se algo no seu quarto pode estar irritando seus pulmões, como poeira ou cheiros fortes.";
                text += "<br><br>Garanta que seus remédios estejam sendo usados corretamente e fale com seu médico quando for à próxima consulta.";
                text += "</p>";
                break;
            case 'question6':
                text = `<h3 ${style}>USEI REMÉDIO PARA CONTROLAR A ASMA</h3>`;
                text += "<p>";
                text += "<br>O uso regular do remédio é fundamental para manter a asma sob controle.";
                text += "<br><br>Sempre tome o remédio no horário e na dose certa mesmo se estiver se sentindo bem.";
                text += "<br><br>Lembre-se: esse remédio não é para crises mas sim, para evitar que elas aconteçam.";
                text += "</p>";
                break;
            case 'question7':
                text = `<h3 ${style}>USEI REMÉDIO PARA ALIVIAR A ASMA</h3>`;
                text += "<p>";
                text += "<br>O remédio de alívio é importante em momentos de urgência.";
                text += "<br><br>Se você percebe que está precisando dele é um sinal de que o tratamento precisa ser revisado.";
                text += "<br><br>Converse com seu médico e ajuste o plano de controle.";
                text += "</p>";
                break;
            case 'question8':
                text = `<h3 ${style}>FUI PARA A EMERGÊNCIA</h3>`;
                text += "<p>";
                text += "<br>Ir à emergência é um sinal de que a asma precisa de mais atenção.";
                text += "<br><br>Depois de se recuperar, reserve um tempo para conversar com seu médico sobre o que aconteceu.";
                text += "<br><br>Talvez seja necessário ajustar o tratamento ou revisar o que pode ter causado a crise.";
                text += "<br><br>E lembre-se: você não está sozinho, sua saúde é prioridade!";
                text += "</p>";
                break;
        }

        $('.modal-body').html(text);
        $("#appModal").css("display", "block");
        $("#appModal").css("padding-top", "190px");
        $(".modal-content").css("height", "auto");
        $(".modal-content").css("text-aling", "center");
        $(`input[type=checkbox][name=${questionName}]`).prop('checked', false);
    });
}

handlerClickCrises();

function handleClickButton() {
    $(document).on("click", ".button", function () {
        let question1 = $("input[type=checkbox][name=question1]:checked").val() != undefined ? true : false;
        let question2 = $("input[type=checkbox][name=question2]:checked").val() != undefined ? true : false;
        let question3 = $("input[type=checkbox][name=question3]:checked").val() != undefined ? true : false;
        let question4 = $("input[type=checkbox][name=question4]:checked").val() != undefined ? true : false;

        const arrayQuestions = [question1, question2, question3, question4];

        let qtdSim = 0;
        let qtdNao = 0;

        for (let index = 0; index < arrayQuestions.length; index++) {
            const question = arrayQuestions[index];
            if (question) {
                qtdSim++;
            } else {
                qtdNao++;
            }
        }

        if (qtdNao == 4) {
            $('.modal-body').html("<h3 style=\"text-align:center;background:green;color:white;padding:5px;\">ASMA CONTROLADA</h3><br><p>Parabéns, sua asma está bem controlada! Isso significa que você está conseguindo evitar sintomas e crises no dia a dia.<br><br> Continue seguindo seu plano de tratamento, tomando os remédios no horário certo e mantendo hábitos saudáveis, como evitar gatilhos conhecidos, praticar atividades físicas com orientação médica e manter consultas regulares com seu médico.<br><br> A prevenção é a melhor estratégia para manter o controle e aproveitar sua rotina ao máximo!</p>")
        }
        else if (qtdSim <= 2) {
            $('.modal-body').html("<h3 style=\"text-align:center;background:gold;color:white;padding:5px;\">ASMA PARCIALMENTE CONTROLADA</h3><br><p>Você está no caminho certo, mas pode melhorar ainda mais o controle da sua asma.<br><br> Observe se está tomando os remédios certos e na dose certa; é importante não pular nenhum horário.<br><br> Tente identificar possíveis causas que possam estar piorando os sintomas, como poeira, mudanças de temperatura ou cheiros fortes, e evite-os sempre que possível.<br><br> Pequenos ajustes podem fazer uma grande diferença para o seu bem-estar!</p>")
        }
        else if (qtdSim > 2) {
            $('.modal-body').html("<h3 style=\"text-align:center;background:tomato;color:white;padding:5px;\">ASMA NÃO CONTROLADA</h3><br><p>Se sua asma está descontrolada, é hora de agir com cuidado e buscar ajuda.<br><br> Verifique se você está usando os remédios corretamente.<br><br> Evite ao máximo situações que possam desencadear crises, como contato com alérgenos ou mudanças bruscas de clima.<br><br> Procure seu médico o quanto antes para revisar seu plano de tratamento e avaliar o que precisa ser ajustado. Enquanto isso, tenha sempre seu remédio de alívio por perto e, em caso de sintomas mais graves, busque a emergência.<br><br> Sua saúde vem em primeiro lugar!</p>")
        }


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
handleClickButton();
