document.addEventListener("DOMContentLoaded", () => {
  const showPasswordButton = document.getElementById('show_password')
  const passwordInput = document.getElementById("txtPassword");
  showPasswordButton.addEventListener("click", () => {
    mostrarPassword()
  })
})

function mostrarPassword() {
  if (passwordInput.type == "password") {
    passwordInput.type = "text";
    document.querySelector('.icon').classList.replace('fa-eye-slash', 'fa-eye');
  } else {
    passwordInput.type = "password";
    document.querySelector('.icon').classList.replace('fa-eye', 'fa-eye-slash');
  }
}