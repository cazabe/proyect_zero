import ajax from './ajax.js';
import Components from './components.js';


const HEADERS = [['Content-Type','application/json']];

// On document ready
document.addEventListener("DOMContentLoaded", function() {
    Components.Navbar('header');
    listUsers();
});

// To get form data
const getForm = (htmlElem) => {
    return {
        usuario_id: htmlElem.querySelector('[data-item="id"]').value.trim(),
        nombres: htmlElem.querySelector('[data-item="name"]').value.trim(),
        apellidos: htmlElem.querySelector('[data-item="lName"]').value.trim(),
        correo: htmlElem.querySelector('[data-item="email"]').value.trim(),
        rol_id: htmlElem.querySelector('[data-item="role"]').value.trim(),
        username: htmlElem.querySelector('[data-item="username"]').value.trim(),
        password: htmlElem.querySelector('[data-item="password"]').value.trim(),
        estado: 'A'
    }
}

// Clear form
const clearForm = () => {
    createModal.style.display = 'none';
    updateModal.style.display = 'none';
    const forms = document.getElementsByClassName('form');
    for(let i=0; i < forms.length; i++){
        forms[i].reset();
    }
}

// Create modal actions
const createModal = document.getElementById('createModal');

createModal.querySelector('[data-item="btnExecute"]').addEventListener('click', (e) => {
    e.preventDefault();
    createUser();
});

createModal.querySelector('[data-item="btnClear"]').addEventListener('click', (e) => {
    e.preventDefault();
    createModal.style.display = 'none';
    createModal.getElementsByTagName('form')[0].reset();
});

const createUser = () => {
    const user = getForm(createModal);
    if(user.nombres == ''){
        alert('Enter name');
        return;
    }
    if(user.apellidos == ''){
        alert('Enter last name');
        return;
    }
    if(user.correo == ''){
        alert('Enter email');
        return;
    }
    if(user.role == '0'){
        alert('Select role');
        return;
    }
    
    ajax('/users/create', user, 'POST', HEADERS, cbCreateOk, cbCreateError);
}


// Update modal actions
const updateModal = document.getElementById('updateModal');

updateModal.querySelector('[data-item="btnExecute"]').addEventListener('click', (e) => {
    e.preventDefault();
    updateUser();
});

updateModal.querySelector('[data-item="btnClear"]').addEventListener('click', (e) => {
    e.preventDefault();
    updateModal.style.display = 'none';
    updateModal.getElementsByTagName('form')[0].reset();
});

const updateUser = () => {
    const user = getForm(updateModal);
    if(user.nombres == ''){
        alert('Enter name');
        return;
    }
    if(user.apellidos == ''){
        alert('Enter last name');
        return;
    }
    if(user.correo == ''){
        alert('Enter email');
        return;
    }
    if(user.role == '0'){
        alert('Select role');
        return;
    }
    
    ajax('/users/update', user, 'POST', HEADERS, cbUpdateOk, cbUpdateError);
}

// Callbacks
const cbListOk = (r) => {
    r = JSON.parse(r);
    const table = document.getElementById('tblUsers');
    let html = '';
    r.forEach(elem => {
        html += '<tr><td>' + elem.NOMBRES + '</td>' +
                '<td>' + elem.APELLIDOS + '</td>' +
                '<td>' + elem.CORREO + '</td>' +
                '<td>' + (elem.ROL_ID == 1 ? 'Admin' : 'Normal') + '</td>' +
                '<td><img class="icon" data-item="mod" onclick="loadForm(this,\'updateModal\')" src="img/edit.png" data-info=\'' + JSON.stringify(elem) + '\'/>' + 
                '<img class="icon" data-item="del" onclick="deleteUser(this)"  src="img/trash.png" data-id="' + elem.USUARIO_ID + '"/></td></tr>';
    });

    table.innerHTML = html;
}

const cbListError = (e) => {
    alert('Error at loading users');
}

const cbCreateOk = (r) => {
    //console.log('respuesta: ', r);
    alert('User creation success!');
    listUsers();
    clearForm();
}

const cbCreateError = (e) => {
    alert('Error at creating user');
}


const cbDeleteOk = (r) => {
    //console.log('respuesta: ', r);
    rowToDelete.parentElement.parentElement.remove();
}

const cbDeleteError = (e) => {
    alert('Error at deleting user');
}

const cbUpdateOk = (r) => {
    //console.log('respuesta: ', r);
    alert('User update success!');
    listUsers();
    clearForm();
}

const cbUpdateError = (e) => {
    alert('Error at updating user');
}

const listUsers = () => {
    ajax('/users/read', null, 'GET', null, cbListOk, cbListError);
}

let rowToDelete;
function deleteUser(elem){
    const user_rol = localStorage.getItem('usrRol');
    if(user_rol === "2"){
      alert("No tiene permisos para eliminar usuarios");
    }else{
        rowToDelete = elem;
        const user = {
            usuario_id: elem.dataset.id
        }
        
    ajax('/users/delete', user, 'POST', HEADERS, cbDeleteOk, cbDeleteError);
    }
}

window.listUsers = listUsers;
window.deleteUser = deleteUser;