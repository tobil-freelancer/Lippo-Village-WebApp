function onFieldWrongAnswer(fieldWarningID, spanWarningID, message) {
    $("#" + fieldWarningID).addClass("wrong");
    spawnSpan(spanWarningID, message);
}

function onFieldValueChange(fieldWarningID, spanWarningID) {
    $("#" + fieldWarningID).removeClass("wrong");
    removeSpan(spanWarningID);
}

function spawnSpan(spanID, message) {
    $("#" + spanID).removeClass("warning-close");
    $("#" + spanID).addClass("warning");
    $("#" + spanID).text(message);
}

function removeSpan(spanID) {
    $("#" + spanID).removeClass("warning");
    $("#" + spanID).addClass("warning-close");
}

function onLogin(email_ID, password_ID) {
    var emailSpan = email_ID + "_warning";
    var passwordSpan = password_ID + "_warning";

    var email = $("#" + email_ID).val();
    var password = $("#" + password_ID).val();

    if (!isEmailValid(email)) {
        onFieldWrongAnswer(email_ID, emailSpan, "*Format email tidak valid, mohon periksa kembali!");
    } else if (email === null || email === "") {
        onFieldWrongAnswer(emailField, emailSpan, "*Email tidak boleh kosong!");
    } else if (password === null || password === "") {
        onFieldWrongAnswer(password_ID, passwordSpan, "*Password tidak boleh kosong!");
    } else {

        var loading = $(".form-loading-cover");

        loading.removeClass("loading-disable");
        loading.addClass("loading-enable");

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("X-localization", "id");

        var formdata = new FormData();

        formdata.append("email", email);
        formdata.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://midas.indieapps.id/api/v1/login", requestOptions)
            .then(result => {
                var code = result.status;
                switch (code) {
                    case 200:
                        //console.log("SUCCESS: ", code);
                        loading.removeClass("loading-enable");
                        loading.addClass("loading-disable");
                        result.text().then((value) => {
                            var parse = $.parseJSON(value);
                            var message = parse['message'];
                            var token = parse['token'];
                            onFieldValueChange(email_ID, emailSpan);
                            onFieldValueChange(password_ID.passwordSpan);
                        });
                        break;
                    case 400:
                        //console.log("ERROR: ", code);
                        loading.removeClass("loading-enable");
                        loading.addClass("loading-disable");
                        result.text().then((value) => {
                            onFieldWrongAnswer(password_ID, passwordSpan, "*Periksa ulang email dan atau password yang kamu masukkan!");
                        });
                        break;
                    case 422:
                        console.log("ERROR: ", code);
                        result.text().then((value) => {
                            loading.removeClass("loading-enable");
                            loading.addClass("loading-disable");
                            var parse = $.parseJSON(value);
                            var message = parse['message'];
                            console.log("Message: ", message);
                            window.alert("Server says: " + message);
                        });
                        break;
                    default:
                }
            });
    }
}

function onRegister(name_ID, username_ID, phoneNumber_ID, email1_ID, password1_ID, password2_ID) {

    var nameSpan = name_ID + "_warning";
    var usernameSpan = username_ID + "_warning";
    var phoneNumberSpan = phoneNumber_ID + "_warning";
    var emailSpan = email1_ID + "_warning";
    var password1Span = password1_ID + "_warning";
    var password2Span = password2_ID + "_warning";
    var checkboxSpan = "checkbox_warning";

    var terms = "terms";

    var name = $("#" + name_ID).val();
    var username = $("#" + username_ID).val();
    var phoneNumber = $("#" + phoneNumber_ID).val();
    var email = $("#" + email1_ID).val();
    var password = $("#" + password1_ID).val();
    var password_confirmation = $("#" + password2_ID).val();
    var currentCheckTerms = $("#" + terms).is(':checked');
    var currentGender = gender;

    if (!(isNameValid(name) && name !== "")) {
        onFieldWrongAnswer(name_ID, nameSpan, "*Nama tidak boleh kosong dan tidak lebih dari 15 karakter!");
        $(".form-scroll-rect").scrollTop(0);
    } else if (!(isUserNameValid(username) && username !== "")) {
        onFieldWrongAnswer(username_ID, usernameSpan, "*Username hanya boleh menggunakan huruf kecil dan tidak ada spasi!");
        $(".form-scroll-rect").scrollTop(0);
    } else if (!isEmailValid(email)) {
        onFieldWrongAnswer(email1_ID, emailSpan, "*Format email tidak valid, mohon periksa kembali!");
        $(".form-scroll-rect").scrollTop(170);
    } else if (email === null || email === "") {
        onFieldWrongAnswer(email1_ID, emailSpan, "*Email tidak boleh kosong!");
        $(".form-scroll-rect").scrollTop(170);
    } else if (!isPhoneNumberValid(phoneNumber)) {
        onFieldWrongAnswer(phoneNumber_ID, phoneNumberSpan, "*Nomor telepon harus lebih dari 9 karakter");
        $(".form-scroll-rect").scrollTop(170);
    } else if (password === null || password === "") {
        onFieldWrongAnswer(password1_ID, password1Span, "*Password tidak boleh kosong!");
        $(".form-scroll-rect").scrollTop(170 * 2);
    } else if (password.length < 8) {
        onFieldWrongAnswer(password1_ID, password1Span, "*Password paling tidak 8 karakter!");
        $(".form-scroll-rect").scrollTop(170 * 2);
    } else if (password_confirmation !== password) {
        onFieldWrongAnswer(password2_ID, password2Span, "*Password tidak sama!");
        $(".form-scroll-rect").scrollTop(170 * 2);
    } else if (!currentCheckTerms) {
        spawnSpan(checkboxSpan, "*Mohon untuk menyetujui terms and condition");
    } else {
        var loading = $(".form-loading-cover");
        loading.removeClass("loading-disable");
        loading.addClass("loading-enable");

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("X-localization", "id");

        var formdata = new FormData();

        formdata.append("name", name);
        formdata.append("name", username);
        formdata.append("email", email);
        formdata.append("phone_number", phoneNumber);
        formdata.append("gender", currentGender);
        formdata.append("password", password);
        formdata.append("password_confirmation", password_confirmation);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://midas.indieapps.id/api/v1/register", requestOptions)
            .then(response => response)
            .then(result => {
                var code = result.status;
                switch (code) {
                    case 201:
                        console.log("SUCCESS: ", code);
                        result.text().then((value) => {
                            var parse = $.parseJSON(value);
                            loading.removeClass("loading-enable");
                            loading.addClass("loading-disable");
                            showRegisterSuccess();
                        });
                        break;
                    case 422:
                        console.log("ERROR: ", code);
                        result.text().then((value) => {
                            var parse = $.parseJSON(value);
                            loading.removeClass("loading-enable");
                            loading.addClass("loading-disable");
                            console.log("Value: ", value);
                            var error = parse['errors'];
                            var errorMail = error['email'];
                            var errorPhone = error['phone_number'];

                            if (errorMail !== undefined) {
                                onFieldWrongAnswer(email1_ID, emailSpan, "*Email sudah digunakan!");
                            }

                            if (errorPhone !== undefined) {
                                onFieldWrongAnswer(phoneNumber_ID, phoneNumberSpan, "*Nomor telepon sudah digunakan!");
                            }

                            $(".form-scroll-rect").scrollTop(170);
                        });
                        break;
                    default:
                }
            });
    }
}

function isNameValid(name) {
    if (name.length < 15) {
        return true;
    } else {
        return false;
    }
}

function isUserNameValid(username) {
    if (username.indexOf(' ') >= 0) {
        return false;
    } else if (((/[A-Z]/.test(username)))) {
        return false
    } else {
        return true;
    }
}

function isPhoneNumberValid(phone_number) {
    if (phone_number.length < 10) {
        return false;
    } else {
        return true;
    }
}

function isEmailValid(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}