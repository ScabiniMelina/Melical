
document.addEventListener("DOMContentLoaded", () => {
  activarFuncionesMenu();
  // document.addEventListener("click",(e)=>{
  //   console.log(e.target)
  // })
  //sidebar
  document.getElementById("cronograma").addEventListener("click",()=>{
    mostrarSeccion("cronograma.html","Cronograma");
  })
  
  document.getElementById("pedidoEstudios").addEventListener("click",()=>{
    mostrarSeccion("pedidoEstudios.html","Pedido de estudios");
  })
  
  document.getElementById("lugaresDisponibles").addEventListener("click",()=>{
    mostrarSeccion("lugaresDisponibles.html","Lugares disponibles");
  })
  
  document.getElementById("recursosDisponibles").addEventListener("click",()=>{
    mostrarSeccion("recursosDisponibles.html","Recusos disponibles");
  })
  
  document.getElementById("busquedaPacientes").addEventListener("click",()=>{
    
    mostrarSeccion("busquedaPacientes.html","Buscar pacientes")
    .then(()=>{
      fetch(("../php/obtenerPacientes.php"),{method:"POST"})
      .then(respuesta => respuesta.json())
      .then( data => rellenarTablaPacientes(data))
      .then(cargarBotonesBusquedaPacientes())
    })
  })
  
  document.getElementById("ajustes").addEventListener("click",()=>{
    mostrarSeccion("ajustes.html","Ajustes");
  })

  document.getElementById("configuracion").addEventListener("click",()=>{
    mostrarSeccion("ajustes.html","Configuración");
  })

  document.getElementById("perfil").addEventListener("click",()=>{
    mostrarSeccion("perfil.html","Perfil");
  })

  document.getElementById("cerrarSesion").addEventListener("click",()=>{
    // fetch("cerrarSesion.php")
    // .then(response => response.text())
    // .then(data =>  console.log = html);
  })
  
})

async function cargarBotonesBusquedaPacientes(){
  //Botones de Busquéda pacientes
  document.getElementById("btnFiltrar").addEventListener("click",()=>{
    (async()=>{
      await mostrarSeccion("filtros.php","Filtrar")
      await activarFuncionesSeccionFiltros()
    })()
  })

  document.getElementById("btnBuscar").addEventListener("click",()=>{
   if(!isNaN(document.getElementById("inputBuscar").value)){
      data = new FormData();
      data.append('ID_DNI', document.getElementById("inputBuscar").value);
      fetch("../php/obtenerPaciente.php",{
        method:"POST", 
        body:data })
        .then(respuesta => respuesta.json())
        .then( data => rellenarTablaPacientes(data));        
    }
  })
  
  document.getElementById("btnBuscarPorHuella").addEventListener("click",()=>{
    mostrarSeccion("buscarPorHuella.html","Buscar por huella");
  })
  
  document.getElementById("btnBuscarPorRostro").addEventListener("click",()=>{
    mostrarSeccion("buscarPorRostro.html","Buscar por rostro");
  })

  document.getElementById("agregarPaciente").addEventListener("click",()=>{
    mostrarSeccion("paciente.html","Agregar paciente");
  })
  
  
  // Cambiar sql en el php
  //Abrir toda la info del paciente seleccionado
  document.getElementById("tablaPacientes").addEventListener("click",(e)=>{
    data = new FormData();
    data.append('ID_DNI', e.target.parentNode.dataset.id);
    fetch("../php/obtenerAntecedentesInfoGeneralHistoriaClinica.php",{
        method:"POST", 
        body:data})
        .then(respuesta => respuesta.json())
        .then(mostrarSeccion("paciente.html","Paciente"));
      // await rellenarFormDatosPaciente(data);
    })
}

async function activarFuncionesMenu(){
  const sidebar = document.querySelector(".sidebar");
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
}

async function mostrarSeccion(archivo,titulo){
  const contenedorPagina = document.getElementById("contenedorPagina");
  const tituloSeccion = document.getElementById("tituloSeccion");
  respuesta = await fetch(archivo)
  html = await respuesta.text();
  contenedorPagina.innerHTML = await html;
  tituloSeccion.innerHTML = await titulo;
}

const ObtenerJson = async(archivo,data)=>{
  const respuesta = await fetch(archivo,{
    method: "POST",
    body: data
  });
  return respuesta.json();
}  

 async function rellenarTablaPacientes(data){
  console.log(data)
  const tablaPacientes = document.getElementById("tablaPacientes");
  tablaPacientes.innerHTML="";
  const templateFila = document.getElementById("templateFila").content;
  const fragmento = document.createDocumentFragment();
  data.forEach(paciente => {
    templateFila.querySelector(".fila").dataset.id = paciente.ID_DNI_;
    templateFila.querySelector(".dni").textContent = paciente.ID_DNI;
    templateFila.querySelector(".nombre").textContent = paciente.name;
    templateFila.querySelector(".apellido").textContent = paciente.surname;
    templateFila.querySelector(".fechaNacimiento").textContent = paciente.date_birth;
    const clon = templateFila.cloneNode(true);
    fragmento.appendChild(clon);
  })
  tablaPacientes.appendChild(fragmento);
}

async function rellenarFormDatosPaciente(data){
  console.log(data)  
}

async function activarFuncionesSeccionFiltros(){
  document.querySelectorAll('.nav-link-datalist').forEach( navElement =>{
    const container = document.querySelector(navElement.dataset.bsTarget);//Contenedor de las filasDatalist
    obtenerOpcionesDatalist(navElement.dataset.table,navElement.dataset.columna_id,navElement.dataset.columna_lista)
    .then(opciones =>crearFilaDatalist(navElement,container,opciones))
  })

  document.getElementById("obtenerBusquedaFiltrado").addEventListener("click",()=>{
    data = new FormData();
    // data.append('ID_DNI', document.getElementById("inputBuscar").value);
    mostrarSeccion("busquedaPacientes.html","Buscar pacientes")
    .then(()=>{
      console.log("obtener filtrado de pacientes")
    fetch("../php/obtenerPaciente.php",{
      method:"POST", 
      body:data })
      .then(respuesta => respuesta.json())
      .then( data => rellenarTablaPacientes(data))})
  })
}

function crearFilaDatalist(navElement,container,data){
  console.log(data);
  const template = document.getElementById("containerDatalist").content;
  const cantidadFilas = container.querySelectorAll(".fila").length
  const fragment = document.createDocumentFragment();
  let idFila = 0
  // si el total de filas es distinto de 0 entonces averiguo cual es la key de la última fila
  if(cantidadFilas!=0){
    // a la última key le agregamos 1, esto lo hacemos así para no se creen keys repetidas
    idFila = parseInt(container.querySelectorAll(".fila")[cantidadFilas-1].dataset.id) + 1
  }
  console.log(idFila)
  template.querySelector(".row").dataset.id = idFila
  template.querySelector("input").setAttribute("list",navElement.dataset.datalist + idFila);
  // poner opciones
  template.querySelector("datalist").innerHTML= data
  template.querySelector("datalist").id = navElement.dataset.datalist + idFila
  template.querySelector("datalist").className = navElement.dataset.datalist + idFila
  fragment.appendChild(template.cloneNode(true))

  fragment.querySelector("button").addEventListener("click",(e)=>{
    if(e.currentTarget.querySelector("i").classList.contains("bx-minus")){
      console.log(e.currentTarget)
      container.removeChild(container.querySelector('.fila[data-id="'+ idFila +'"]'))
    }
      
    if(e.currentTarget.querySelector("i").classList.contains("bx-plus")){
      console.log("mas")
      e.currentTarget.querySelector("i").classList.replace("bx-plus","bx-minus")
      crearFilaDatalist(navElement,container,data)
    }
  })
  container.appendChild(fragment)
  console.log(navElement.dataset.bsTarget);
  console.log(template);
  console.log(container)
  console.log(cantidadFilas)
}
  
async function obtenerOpcionesDatalist(tabla,columnaId,columnaLista){
  tabla = "PERSONAL_INFORMATION"
  columnaId = "ID_DNI";
  columnaLista = "name";
  let data = new FormData();
  data.append("tabla",tabla);
  data.append("columnaId",columnaId);
  data.append("columnaLista",columnaLista);
  let opciones="";
  const respuesta = await fetch("../php/rellenarOpcionesDatalist.php",{
    method:"POST",
    body:data
  })
  const dataJson = await respuesta.json();
  await dataJson.forEach((opcion) => {
    opciones += '<option data-id="' + opcion[columnaId] + '" value="' + opcion[columnaLista] +'">' 	
  })
  return await opciones;
} 
