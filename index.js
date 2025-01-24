// PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered !"))
            .catch(err => console.log("service worker not registered !", err))
    })
}


window.onload = function () {
    showLoading();
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = 'routers/home/index.html';
        } else {
            hideLoading();
        }
    });
};


function recoverPassword() {
    showLoading();
    const email = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        hideLoading();
        showToast('E-mail enviado com sucesso!', 'success');
    }).catch(error => {
        hideLoading();
        showToast(getErrorMessage(error), 'error');
    });
}

function login() {
    showLoading();

    /** Firebase Login*/
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            const user = response.user;
            hideLoading();
            window.location.href = 'routers/home/index.html';
        }).catch(error => {
            hideLoading();
            showToast(getErrorMessage(error), 'error');
            console.log(error.code)
        });
}

function getErrorMessage(error) {
    if (error.code == "auth/invalid-login-credentials") {
        return "Credenciais inválidas!";
    }
    if (error.code == 'auth/wrong-password') {
        return "Senha incorreta!"
    }
    return error.code;
}

function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById("btn-entrar").disabled = !emailValid;
    document.getElementById("btn-recuperar-senha").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById("btn-entrar").disabled = !emailValid || !passwordValid;

}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function showToast(message, type) {
    var toast = document.getElementById("toast");

    toast.className = "showToast " + type;
    toast.innerHTML = message;

    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}






