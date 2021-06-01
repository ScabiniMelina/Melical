
let btn = document.getElementById("btn");
let sidebar = document.querySelector(".sidebar");
let searchBtn = document.querySelector(".bx-search");
let links = document.querySelectorAll(".link_nav");
let contenedor = document.getElementById("contenedorPagina");
let paginasDoctor=["cronograma.html","pedidoEstudios.html","lugaresDisponibles.html","recursosDisponibles.html", "busquedaPacientes.html","ajustes.html","perfil.html"];

console.log(links);
btn.addEventListener("click", ()=>{
  sidebar.classList.toggle("active");
  if(btn.classList.contains("bx-menu")){
    btn.classList.replace("bx-menu" , "bx-menu-alt-right");
  }else{
    btn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
})
searchBtn.addEventListener("click",()=>{
  sidebar.classList.toggle("active");
})

links.forEach((elemento,indice)=>{
  elemento.addEventListener("click",(e)=>{
    console.log(paginasDoctor[indice])
    fetch(paginasDoctor[indice])
    .then(respuesta => respuesta.text())
    .then(html => contenedor.innerHTML = html);
    
  })
})
