import ajax from './ajax.js';

const HEADERS = [['Content-Type','application/json']];

const btnLogin = document.getElementById('btnLogin');
const txtUsername = document.getElementById('username');
const txtPassword = document.getElementById('password');
const form = document.getElementById('loginForm');

/*On document ready*/
document.addEventListener("DOMContentLoaded", function() {
    const usrId = window.localStorage.getItem('usrId');
    if(usrId !== null){
        window.location.href = './products.html';
    }
});

const cbError = (res) => {
    alert('Wrong credentials');
} 

const cbOk= (res) => {
    res = JSON.parse(res); 
    if(res.resp === 'OK'){
        window.localStorage.setItem('usrId', res.usrId);
        window.localStorage.setItem("usrRol" ,res.usrRol);
        window.location.href= '../products.html';
    }
    else{
        alert('Wrong credentials :(');
    }
    form.reset();
} 

const execLogin = () => {
    if(txtUsername.value == ''){
        alert('Enter a username');
        return;
    }

    if(txtPassword.value == ''){
        alert('Enter a password');
        return;
    }

    const user = {
        username: txtUsername.value,
        password: txtPassword.value
    } 

    ajax('/', user, 'POST', HEADERS, cbOk, cbError);
}

btnLogin.addEventListener('click', execLogin);