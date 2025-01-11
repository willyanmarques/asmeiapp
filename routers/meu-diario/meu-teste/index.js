function doInit(){
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

function handleClickButton(){
    $(document).on("click", ".button", function () {
        let question1 = $( "input[type=checkbox][name=question1]:checked" ).val() != undefined ? true : false;
        let question2 = $( "input[type=checkbox][name=question2]:checked" ).val() != undefined ? true : false;
        let question3 = $( "input[type=checkbox][name=question3]:checked" ).val() != undefined ? true : false;
        let question4 = $( "input[type=checkbox][name=question4]:checked" ).val() != undefined ? true : false;

        const arrayQuestions = [question1, question2, question3, question4];

        let qtdSim = 0;
        let qtdNao = 0;

        for (let index = 0; index < arrayQuestions.length; index++) {
            const question = arrayQuestions[index];
            if(question){
                qtdSim ++;
            } else {
                qtdNao++;
            }
        }
       
        if(qtdNao == 4){
            $('.modal-body').html("<h3 style=\"text-align:center;background:green;color:white;padding:5px;\">ASMA CONTROLADA</h3><br><p>Parabéns, sua asma está bem controlada! Isso significa que você está conseguindo evitar sintomas e crises no dia a dia.<br><br> Continue seguindo seu plano de tratamento, tomando os remédios no horário certo e mantendo hábitos saudáveis, como evitar gatilhos conhecidos, praticar atividades físicas com orientação médica e manter consultas regulares com seu médico.<br><br> A prevenção é a melhor estratégia para manter o controle e aproveitar sua rotina ao máximo!</p>")
        }
        else if(qtdSim <= 2){
            $('.modal-body').html("<h3 style=\"text-align:center;background:gold;color:white;padding:5px;\">ASMA PARCIALMENTE CONTROLADA</h3><br><p>Você está no caminho certo, mas pode melhorar ainda mais o controle da sua asma.<br><br> Observe se está tomando os remédios certos e na dose certa; é importante não pular nenhum horário.<br><br> Tente identificar possíveis causas que possam estar piorando os sintomas, como poeira, mudanças de temperatura ou cheiros fortes, e evite-os sempre que possível.<br><br> Pequenos ajustes podem fazer uma grande diferença para o seu bem-estar!</p>")        
        }
        else if(qtdSim > 2){
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
