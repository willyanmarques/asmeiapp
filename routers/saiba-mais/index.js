// PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered !"))
            .catch(err => console.log("service worker not registered !", err))
    })
}

let WP_POSTS = [];

function handlerLoadPosts() {

    $.get("https://site.asmei.app.br/wp-json/wp/v2/categories/")
        .done(function (categories) {

            let categoty_home_id = 0;

            categories.forEach(c => {
                if (c.slug == 'saiba-mais') {
                    categoty_home_id = c.id;
                }
            });

            $.get("https://site.asmei.app.br/wp-json/wp/v2/posts?categories=" + categoty_home_id)
                .done(function (posts) {

                    posts.forEach(p => {
                        let obj = {
                            id: p.id,
                            slug: p.slug.split("_")[1],
                            order: parseInt(p.slug.split("_")[0]),
                            title: p.title.rendered,
                            description: p.content.rendered
                        };
                        WP_POSTS.push(obj);
                    });

                    WP_POSTS.sort((a, b) => a.order > b.order ? 1 : -1); //ordernando array p/ garantir icones menu na posicao correta

                    WP_POSTS.forEach(post => {

                        let imageLink = `icons/${post.slug}.png`;

                        var card = $("<div id='" + post.id + "' class='card card-modal'></div>")
                            .append(
                                $("<div class='img-container'></div>")
                                    .append(`<img src="${imageLink}"></img>`)
                            )
                            .append(
                                $("<div class='title-container'></div>")
                                    .append("<span>" + post.title + "</span>")
                            )

                        $("article")
                            .append(card);
                    });

                    $("article").append(
                        $(`<div class='card'><a title="Voltar" href="../home/index.html"><img class="img-container" src="../../src/images/icons/voltar.png"></a><div class='title-container'><span>Voltar</span></div></div>`)
                    )

                });

        });
}

handlerLoadPosts();

function handlerClickCard() {

    $(document).on("click", ".card-modal", function () {
        let cardId = $(this).attr('id');
        //console.log(`${cardId}`)
        WP_POSTS.forEach(post => {
            console.log('post slug: ' + post.slug);
            if (post.id == cardId) {

                switch (post.slug) {
                    case 'nos-avalie':
                        $('div#nos-avalie').show();
                        $('div#politica').hide();
                        $("#appModal").css("display", "block");
                        $(".modal-body").css("height", "auto");
                        break;
                    case 'compartilhe':
                        shareApp();
                        break;
                    case 'politica-de-privacidade':
                        $('div#nos-avalie').hide();
                        $("div#politica").append(post.description + '<br><br>');
                        $('div#politica').show();
                        $("#appModal").css("display", "block");
                        $(".modal-body").css("height", "100%");
                        break;
                    case 'opiniao':
                        window.location.href = 'https://wa.link/aoqy5p';
                        break;
                    case 'contato':
                        alert('Entre em contato conosco pelo e-mail: \n\naplicativoasmei@gmail.com');
                        break;
                    default:
                        break;
                }

                //$(".modal-body").html(post.description);
            }
        });



    });

    $(document).on("click", ".modal-btn-close", function () {
        $("#appModal").css("display", "none");
        $(".modal-body").append("");
        $("div#politica").append("");
    })

}

function shareApp() {
    const shareData = {
        title: "Asmei App",
        text: "Orientações para o autocuidado de asma",
        url: "https://asmei.app.br/",
    };

    navigator.share(shareData);
}

function closeModal() {
    $("#appModal").css("display", "none");
    $(".modal-body").append("");
    $("div#politica").append("");
    resetStars();
}

function handleClickStart() {
    $(document).on("click", "input[type=radio][name=radio-star]", function () {
        let star = $("input[type=radio][name=radio-star]:checked").val();
        switch (star) {
            case '1star':
                setTimeout(() => {
                    alert('Que pena que sua experiência não tenha sido boa. \n\nAgradecemos por sua opinião e estamos comprometidos em melhorar para oferecer um serviço melhor. \n\nSeu retorno é muito importante para nós.');
                    $('div#nos-avalie').hide();
                    closeModal();
                }, 1000);
                break;
            case '2star':
                setTimeout(() => {
                    alert('Obrigado por sua avaliação! \n\nQue pena que não tenha ficado totalmente satisfeito. \n\nAgradecemos seu retorno e estamos trabalhando para melhorar nossa qualidade e garantir uma experiência mais positiva para você.');
                    $('div#nos-avalie').hide();
                    closeModal();
                }, 1000);
                break;
            case '3star':
                setTimeout(() => {
                    alert('Agradecemos pela sua avaliação! \n\nFicamos felizes por você ter tido uma experiência razoável, mas sabemos que há espaço para melhorar. \n\nSeu retorno é fundamental para nos ajudar a oferecer um serviço ainda melhor. \n\nObrigado!');
                    $('div#nos-avalie').hide();
                    closeModal();
                }, 1000);
                break;
            case '4star':
                setTimeout(() => {
                    alert('Obrigado pela sua avaliação positiva! \n\nFicamos felizes que você tenha tido uma boa experiência.\n\nEstamos sempre buscando formas de melhorar.');
                    $('div#nos-avalie').hide();
                    closeModal();
                }, 1000);
                break;
            case '5star':
                setTimeout(() => {
                    alert('Muito obrigado pela sua avaliação excelente!\n\nEstamos muito felizes que tenha tido uma ótima experiência.\n\nSeu retorno positivo nos motiva a continuar oferecendo o melhor serviço possível.\n\nAgradecemos sua confiança e esperamos continuar atendendo você da melhor forma.');
                    $('div#nos-avalie').hide();
                    closeModal();
                }, 1000);
                break;

            default:
                break;
        }
    })
}

function resetStars() {
    $("input[type=radio][name=radio-star]").prop('checked', false);
}

handleClickStart();

handlerClickCard();


