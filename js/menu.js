let contenedorPagina = document.getElementById("contenedorPagina");
document.addEventListener("DOMContentLoaded", () => {
  let tituloSeccion = document.getElementById("tituloSeccion");
  //Menú
  let sidebar = document.querySelector(".sidebar");

  document.getElementById("btn").addEventListener("click", ()=>{
    sidebar.classList.toggle("active");
    if(btn.classList.contains("bx-menu")){
      btn.classList.replace("bx-menu" , "bx-menu-alt-right");
    }else{
      btn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  })

  document.querySelector(".bx-search").addEventListener("click",()=>{
    sidebar.classList.toggle("active");
  })

  document.getElementById("cronograma").addEventListener("click",()=>{
    fetch("cronograma.html")
    .then(response => response.text())
    .then(html =>  contenedorPagina.innerHTML = html)
    .then(() => tituloSeccion.innerHTML ="Cronograma");
    
  })
  
  document.getElementById("pedidoEstudios").addEventListener("click",()=>{
    fetch("pedidoEstudios.html")
    .then(response => response.text())
    .then( (html)=>{ 
      contenedorPagina.innerHTML = html;
      tituloSeccion.innerHTML ="Pedido de estudios";
      
    })
    
  })
  
  document.getElementById("lugaresDisponibles").addEventListener("click",()=>{
    fetch("lugaresDisponibles.html")
    .then(response => response.text())
    .then( (html)=>{ 
      contenedorPagina.innerHTML = html;
      tituloSeccion.innerHTML ="Lugares disponibles";
      
    })

  })
  
  document.getElementById("recursosDisponibles").addEventListener("click",()=>{
    fetch("recursosDisponibles.html")
    .then(response => response.text())
    .then( (html)=>{ 
      contenedorPagina.innerHTML = html;
      tituloSeccion.innerHTML ="Recusos disponibles";
    })
    
  })
  
  document.getElementById("busquedaPacientes").addEventListener("click",()=>{
    fetch("busquedaPacientes.html")
    .then(response => response.text())
    .then( (html)=>{ 
      contenedorPagina.innerHTML = html;
      tituloSeccion.innerHTML ="Buscar pacientes";
    })
    .then( () => cargarBusquedaPacientes());

  })
  
  document.getElementById("ajustes").addEventListener("click",()=>{
    fetch("ajustes.html")
    .then(response => response.text())
    .then( (html)=>{ 
      contenedorPagina.innerHTML = html;
      tituloSeccion.innerHTML ="Ajustes";
      
    })

  })

  document.getElementById("configuracion").addEventListener("click",()=>{
    fetch("ajustes.html")
    .then(response => response.text())
    .then( (html)=>{ 
      contenedorPagina.innerHTML = html;
      tituloSeccion.innerHTML ="Configuración";
      
    })

  })

  document.getElementById("perfil").addEventListener("click",()=>{
    fetch("perfil.html")
    .then(response => response.text())
    .then( (html)=>{ 
      contenedorPagina.innerHTML = html;
      tituloSeccion.innerHTML ="Perfil";
      
    })

  })

  document.getElementById("cerrarSesion").addEventListener("click",()=>{
    fetch("cerrarSesion.php")
    .then(response => response.text())
    .then(data =>  console.log = html);
  })
  //Sidebar
  
  
})

async function cargarBusquedaPacientes(){

  //Botones de Busquéda pacientes
  document.getElementById("filtrar").addEventListener("click",()=>{
    fetch("filtros.html")
    .then(respuesta => respuesta.text())
    .then(html => contenedorPagina.innerHTML = html);

  })

  document.getElementById("buscar").addEventListener("click",()=>{

    // fetch("filtros.html")
    // .then(respuesta => respuesta.text())
    // .then(html => contenedorPagina.innerHTML = html);

  })
  
  document.getElementById("buscarPorHuella").addEventListener("click",()=>{
    fetch("buscarPorHuella.html")
    .then(respuesta => respuesta.text())
    .then(html => contenedorPagina.innerHTML = html);

  })

  document.getElementById("buscarPorRostro").addEventListener("click",()=>{
    fetch("buscarPorRostro.html")
    .then(respuesta => respuesta.text())
    .then(html => contenedorPagina.innerHTML = html);

  })

  document.getElementById("agregarPaciente").addEventListener("click",()=>{
    fetch("paciente.html")
    .then(respuesta => respuesta.text())
    .then(html => contenedorPagina.innerHTML = html);

  })

  document.getElementById("tablaPacientes").addEventListener("click",(e)=>{
    console.log(e.target.id)
    // fetch("paciente.html")
    // .then(respuesta => respuesta.text())
    // .then(html => contenedorPagina.innerHTML = html);

  })

  
}



