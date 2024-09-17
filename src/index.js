let WP_POSTS = [];

function handlerLoadPosts() {

    $.get("http://localhost/AsmeiApp/wordpress/wp-json/wp/v2/posts/?category_slug=pulmonar")
        .done(function (posts) {

            console.log(posts);

            posts.forEach(p => {
                let obj = {
                    id: p.id,
                    slug: p.slug,
                    title: p.title.rendered,
                    description: p.content.rendered
                };
                WP_POSTS.push(obj);
            });

            $.get("http://localhost/AsmeiApp/wordpress/wp-json/wp/v2/media")
                .done(function (media) {

                    WP_POSTS.forEach(p => {
                        media.forEach(m => {
                            if ((m.post === p.id) && (m.title.rendered === p.slug)) {
                                p['icon'] = m.source_url;
                            }
                        })
                    });

                    console.log("done, WP_POSTS !");
                    console.table(WP_POSTS);

                    WP_POSTS.forEach(post => {

                        var card = $("<div id='" + post.id + "' class='card'></div>")
                            .append(
                                $("<div class='img-container'></div>")
                                    .append("<img src=" + post.icon + "></img>")
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
        let cardId = $(this).attr('id');
        console.log("cardId: " + cardId);
        console.table(WP_POSTS);
        $("#myModal").css("display", "block");
    });

}

handlerClickCard();

