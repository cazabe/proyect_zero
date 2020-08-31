// CREATE MODAL
var createModal = document.getElementById("createModal");
var createShow = document.getElementById("btnShowCreate");
var createClose = createModal.getElementsByClassName("close")[0];

createShow.onclick = function() {
    createModal.style.display = "block";
}

createClose.onclick = function() {
    createModal.style.display = "none";
}

// UPDATE MODAL
var updateModal = document.getElementById("updateModal");
var updateShow = document.getElementById("btnShowUpdate");
var updateClose = updateModal.getElementsByClassName("close")[0];

updateClose.onclick = function() {
  updateModal.style.display = "none";
}

/* Close modals when clicking screen outside it */
window.onclick = function(event) {
    if(event.target == createModal){
        createModal.style.display = "none";
    }
    else if(event.target == updateModal){
        updateModal.style.display = "none";
    }
} 


/*Load data in modals's forms*/
function loadForm(elem, modalId){
    const data = JSON.parse(elem.dataset.info);
    const htmlElem = document.getElementById(modalId);
    htmlElem.querySelector('[data-item="id"]').value = data.USUARIO_ID;
    htmlElem.querySelector('[data-item="name"]').value = data.NOMBRES;
    htmlElem.querySelector('[data-item="lName"]').value = data.APELLIDOS;
    htmlElem.querySelector('[data-item="email"]').value = data.CORREO;
    htmlElem.querySelector('[data-item="role"]').value = data.ROL_ID;
    htmlElem.style.display = 'block';
}