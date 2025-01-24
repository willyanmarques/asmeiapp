// PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered !"))
            .catch(err => console.log("service worker not registered !", err))
    })
}

let WP_POST = [];
let WP_POST_IDS = [];
let WP_POST_WITH_ICONS = [];
const wordpressURL = 'https://site.asmei.app.br';

function getCategoryIdBySlug(slug) {
    return $.ajax({
        url: `${wordpressURL}/wp-json/wp/v2/categories?slug=${slug}`,
        method: 'GET',
        dataType: 'json'
    });
}

function getPostsByCategotyId(categoryId) {
    return $.ajax({
        url: `${wordpressURL}/wp-json/wp/v2/posts?categories=${categoryId}`,
        method: 'GET',
        dataType: 'json'
    });
}

function getPostById(postId) {
    return $.ajax({
        url: `${wordpressURL}/wp-json/wp/v2/posts/${postId}`,
        method: 'GET',
        dataType: 'json'
    });
}

function getFeaturedMediaById(featuredMediaId) {
    return $.ajax({
        url: `${wordpressURL}/wp-json/wp/v2/media/${featuredMediaId}`,
        method: 'GET',
        dataType: 'json'
    });
}

function handlerLoadPosts() {

    //Obtendo o id da categoria home
    getCategoryIdBySlug('home').done(function (category) {

        //Obtendo todos os posts da categoria home
        getPostsByCategotyId(category[0].id).done(function (posts) {

            posts.forEach(post => {
                let obj = {
                    id: post.id,
                    slug: post.slug.split("_")[1],
                    order: parseInt(post.slug.split("_")[0]),
                    title: post.title.rendered
                };
                WP_POST.push(obj);
            });

            //Ordernando array p/ garantir icones menu na posicao correta
            WP_POST.sort((a, b) => a.order > b.order ? 1 : -1);

            WP_POST.forEach(post => {

                let imageLink = `src/images/icons/home/${post.slug}.png`;

                var card = $("<div id='" + post.id + "' class='card'></div>")
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
        });

    });

}

handlerLoadPosts();

function handlerClickCard() {

    $(document).on("click", ".card", function () {
        let cardSlug = '';
        let cardId = $(this).attr('id');
        WP_POST.forEach(p => {
            if (p.id == cardId) {
                cardSlug = p.slug;
            }
            console.log(cardSlug)
        });
        switch (cardSlug) {
            case 'asma':
                $(location).prop('href', '/routers/asma/index.html');
                break;
            case 'fatores-de-risco':
                $(location).prop('href', '/routers/fatores-de-risco/index.html');
                break;
            case 'estilos-de-vida':
                $(location).prop('href', '/routers/estilos-de-vida/index.html');
                break;
            case 'exames':
                $(location).prop('href', '/routers/exames/index.html');
                break;
            case 'tratamento':
                $(location).prop('href', '/routers/tratamento/index.html');
                break;
            case 'dispositivo-inalatorio':
                $(location).prop('href', '/routers/dispositivo-inalatorio/index.html');
                break;
            case 'meu-diario':
                $(location).prop('href', '/routers/meu-diario/index.html');
                break;
            case 'saiba-mais':
                $(location).prop('href', '/routers/saiba-mais/index.html');
                break;
        }
    });

}

handlerClickCard();
