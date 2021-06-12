
  let  formularioRegistro = document.getElementById('formularioRegistro');
  let  botonRegistro = document.getElementById('botonRegistro');
  botonRegistro.addEventListener('click',()=>{
    const datosForm = new FormData(formularioRegistro);
    console.log(datosForm);
      fetch('../php/registro.php',{
          method: 'POST',
          body: datosForm, 
      })
      .then(respuesta => respuesta.text())
      .then(data => alert(data));
  
  })

// function mostrarPassword(){
//     let cambio = document.getElementById("txtPassword");
//     if(cambio.type == "password"){
//       cambio.type = "text";
//       document.querySelector('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
//     }else{
//       cambio.type = "password";
//       document.querySelector('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
//     }
//   } 
  
//   // $(document).ready(function () {
//   // //CheckBox mostrar contraseña
//   // $('#ShowPassword').click(function () {
//   //   $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
//   // });
// });

