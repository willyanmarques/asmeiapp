function showLoading() {
    console.log("showLoading")

    const loadingContainer = document.createElement("div");
    loadingContainer.classList.add("loading");

    const loader = document.createElement("div");
    loader.classList.add("loader");

    loadingContainer.appendChild(loader);

    document.body.appendChild(loadingContainer);

}

function hideLoading() {
    const loadingContainer = document.getElementsByClassName("loading")[0];
    const loader = document.getElementsByClassName("loader")[0];

    loadingContainer.classList.remove("loading");
    loader.classList.remove("loader");
}