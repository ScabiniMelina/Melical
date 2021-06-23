let  formularioRegistro = document.getElementById('formularioRegistro');
let  botonRegistro = document.getElementById('botonRegistro');
let  botonMostrarContrasena =document.getElementById('show_password')
let inputContrasena = document.getElementById("txtPassword");

document.addEventListener("DOMContentLoaded",()=>{
  botonMostrarContrasena.addEventListener("click",()=>{
    mostrarPassword()
  })
})

// botonRegistro.addEventListener('click',()=>{
//   const datosForm = new FormData(formularioRegistro);
//   console.log(datosForm);
//     fetch('../php/registro.php',{
//         method: 'POST',
//         body: datosForm, 
//     })
//     .then(respuesta => respuesta.text())
//     .then(data => alert(data));

// })

function mostrarPassword(){
  if(inputContrasena.type == "password"){
    inputContrasena.type = "text";
    document.querySelector('.icon').classList.replace('fa-eye-slash','fa-eye');
  }else{
    inputContrasena.type = "password";
    document.querySelector('.icon').classList.replace('fa-eye','fa-eye-slash');
  } 
} 
  


