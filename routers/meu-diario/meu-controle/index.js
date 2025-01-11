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

function handleClickButton() {
    $(document).on("click", ".button", function () {
        let question1 = $("input[type=radio][name=question1]:checked").val();
        let question2 = $("input[type=radio][name=question2]:checked").val();
        let question3 = $("input[type=radio][name=question3]:checked").val();
        let question4 = $("input[type=radio][name=question4]:checked").val();
        let question5 = $("input[type=radio][name=question5]:checked").val();

        const arrayQuestions = [question1, question2, question3, question4, question5];

        let sum = 0;

        for (var i = 0; i < arrayQuestions.length; i++) {
            sum += Number(arrayQuestions[i]);
        }

        if(sum >= 20){
            $('.modal-body').html("<h3 style=\"text-align:center;background:green;color:white;padding:5px;\">ASMA CONTROLADA</h3><br><p>Sua asma está controlada! Isso significa que você está conseguindo cuidar da sua saúde e que os sintomas estão sob controle.<br><br> Para continuar assim, é importante seguir o tratamento indicado, evitar as causas asma (como fumaça, poeira, cheiros fortes) e manter uma alimentação saudável e hábitos de vida que fortaleçam seus pulmões. <br><br>Lembre-se também de fazer acompanhamento regular para garantir que tudo continue bem.</p>")
        } 
        else if(sum >= 15 && sum <= 19){
            $('.modal-body').html("<h3 style=\"text-align:center;background:gold;color:white;padding:5px;\">ASMA PARCIALMENTE CONTROLADA</h3><br><p>Se sua asma está parcialmente controlada, isso significa que alguns sintomas ainda estão aparecendo, mas não o tempo todo. <br><br>É uma boa oportunidade atualizar seu tratamento e fazer algumas mudanças no seu estilo de vida. <br><br>Tente identificar as causas que pioram a asma e evite-os sempre que possível.<br><br> Manter o uso correto da medicação, fazer exercícios físicos com orientação e ter uma boa alimentação pode ajudar a melhorar o controle da sua asma. <br><br>Se precisar de ajuda, busque ajuda.</p>")
        }
        else if(sum <= 15){
            $('.modal-body').html("<h3 style=\"text-align:center;background:tomato;color:white;padding:5px;\">ASMA NÃO CONTROLADA</h3><br><p>Sua asma não está tão bem controlada, é importante procurar o médico para ajustar o tratamento. <br><br>Fique atento aos sinais como falta de ar, tosse frequente ou aperto no peito, e evite situações que possam piorar sua condição, como mudanças de temperatura e fumaça. <br><br>Tente seguir as orientações médicas e use os remédios corretamente. <br><br>Com o apoio certo, você pode melhorar e voltar a ter uma vida melhor.</p>")
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
