window.onload = function () {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.href = '../home/index.html';
        }
    });
};

function registerUser() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value.trim();
    const confirmPassword = form.confirmPassword().value.trim();
    
    if(password.length < 6){
        console.log('entrou')
        showToast('A senha deve conter no mínimo 6 caracteres!', 'error');
        return;
    }

    if (password != confirmPassword){
        showToast('"Senha" e "Confirmar senha" devem ser iguais!', 'error');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        hideLoading();
        window.location.href = '../home/index.html';
    }).catch(error => {
        showToast(getErrorMessage(error), 'error');
        hideLoading();
    })


}

function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById("btn-registro").disabled = !emailValid;
    
    const passwordValid = isPasswordValid();
    document.getElementById("btn-registro").disabled = !emailValid || !passwordValid;

    const confirmPasswordValid = isConfirmPasswordValid();
    document.getElementById("btn-registro").disabled = !emailValid || !passwordValid || !confirmPasswordValid;

}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isConfirmPasswordValid() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false
    }
    return true;
}

function isConfirmPasswordValid() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false
    }
    return true;
}

function isPasswordValid() {
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (!confirmPassword) {
        return false
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function getErrorMessage(error){
    if(error.code == "auth/email-already-in-use"){
        return "Este e-mail já está em uso! Tente recuperar a senha.";
    }
    return error.code;
}

function redirectLogin(){
    window.location.href = '../../index.html';
}

function showToast(message, type) {
    var toast = document.getElementById("toast");

    toast.className = "showToast " + type;
    toast.innerHTML = message;

    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}


const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    confirmPassword: () => document.getElementById('confirmPassword')
}