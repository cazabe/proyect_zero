import ajax from './ajax.js';

const HEADERS = [['Content-Type','application/json']];

const btnLogin = document.getElementById('btnLogin');
const txtUsername = document.getElementById('username');
const txtPassword = document.getElementById('password');
const form = document.getElementById('loginForm');

const cbError = (res) => {
    alert('Wrong credentials');
} 

const cbOk= (res) => {
    res = JSON.parse(res); 
    console.log('res: ',res);
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
    console.log('ejecutado');
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