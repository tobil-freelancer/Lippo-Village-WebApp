const togglePassword0 = document.querySelector('#togglePassword0');
const togglePassword1 = document.querySelector('#togglePassword1');
const togglePassword2 = document.querySelector('#togglePassword2');

const password0 = document.querySelector('#password0');
const password1 = document.querySelector('#password1');
const password2 = document.querySelector('#password2');

var gender = "male";

togglePassword0.addEventListener('click', function(e) {
    // toggle the type attribute
    const type = password0.getAttribute('type') === 'text' ? 'password' : 'text';
    password0.setAttribute('type', type);
    if (type == "password") {
        this.classList.remove("fa-eye");
        this.classList.add('fa-eye-slash');
    } else {
        this.classList.remove("fa-eye-slash");
        this.classList.add('fa-eye');
    }
    // toggle the eye slash icon
});

togglePassword1.addEventListener('click', function(e) {
    // toggle the type attribute
    const type = password1.getAttribute('type') === 'text' ? 'password' : 'text';
    password1.setAttribute('type', type);
    if (type == "password") {
        this.classList.remove("fa-eye");
        this.classList.add('fa-eye-slash');
    } else {
        this.classList.remove("fa-eye-slash");
        this.classList.add('fa-eye');
    }
    // toggle the eye slash icon
});

togglePassword2.addEventListener('click', function(e) {
    // toggle the type attribute
    const type = password2.getAttribute('type') === 'text' ? 'password' : 'text';
    password2.setAttribute('type', type);
    if (type == "password") {
        this.classList.remove("fa-eye");
        this.classList.add('fa-eye-slash');
    } else {
        this.classList.remove("fa-eye-slash");
        this.classList.add('fa-eye');
    }
    // toggle the eye slash icon
});

function portalDecission(key) {
    $(".container-opening").css('display', 'none');
    if (key === "masuk") {
        $(".container-login").css('display', 'grid');
    } else {
        $(".container-register").css('display', 'grid');
    }
}

function lupaPassword() {
    window.open("forgot-password.html");
}

function showRegistratioinPanel() {
    $(".container-login").css('display', 'none');
    $(".container-register").css('display', 'grid');
}

function showLoginPanel() {
    $(".container-login").css('display', 'grid');
    $(".container-register").css('display', 'none');
}

function onChooseGender(genderType) {
    if (genderType == 0) {
        $(".gender1").addClass("gender-male-select");
        $(".gender2").removeClass("gender-female-select");
        gender = "male";
    } else {
        $(".gender1").removeClass("gender-male-select");
        $(".gender2").addClass("gender-female-select");
        gender = "female";
    }
}

function masukGame() {
    $(".container-register-success-notif").css('display', 'none');
    $(".container-login").css('display', 'grid');
}

function showRegisterSuccess() {
    $(".container-register-success-notif").css('display', 'grid');
    $(".container-register").css('display', 'none');
}