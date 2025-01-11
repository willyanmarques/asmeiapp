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
                if (c.slug == 'fatores-de-risco') {
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
        WP_POSTS.forEach(post => {
            if (post.id == cardId) {
                console.log(post.description);
                $(".modal-body").html(post.description);
                $(".wp-block-file").hide();
            }
        });
        $("#appModal").css("display", "block");
    });

    $(document).on("click", ".modal-btn-close", function () {
        $("#appModal").css("display", "none");
        $(".modal-body").append("");
    })

}

handlerClickCard();


