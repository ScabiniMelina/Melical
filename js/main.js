let  loginForm = document.getElementById('loginForm');
let  loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click',()=>{
    //Agarra los datos de un formulario y los convierte en un objeto, name del input => valor que contiene el input 
    const datosForm = new FormData(loginForm);
    //Acceder al contenido del input que tiene el name dni
    console.log(datosForm.get('dni'))
    //Devuelve una promesa  que nos da  una respuesta
    fetch('php/enviarBd.php',//Lugar a enviar los datos
    {
        method: 'POST', //Método a usar
        body: datosForm, //Contenido a enviar
    })
    .then(respuesta => respuesta.text())
    .then(data => alert(data))

})
