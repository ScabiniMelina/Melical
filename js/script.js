
document.addEventListener("DOMContentLoaded", () => {
  activarFuncionesMenu();
  // document.addEventListener("click",(e)=>{
  //   console.log(e.target)
  // let iconos = document.querySelectorAll("#contenedorFiltros i")
  // console.log(iconos)
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
    console.log(e.target.parentNode)
    console.log(e.target.parentNode.dataset.id)
    mostrarSeccion("paciente.html","Paciente")
    .then(fetch("../php/obtenerAntecedentesInfoGeneralHistoriaClinica.php",{
        method:"POST", 
        body:data})
        .then(respuesta => respuesta.json())
        .then(data => rellenarFormDatosPaciente(data)));
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

 async function rellenarTablaPacientes(data){
  console.log(data)
  const tablaPacientes = document.getElementById("tablaPacientes");
  tablaPacientes.innerHTML="";
  const templateFila = document.getElementById("templateFila").content;
  const fragmento = document.createDocumentFragment();
  data.forEach(paciente => {
    templateFila.querySelector(".fila").dataset.id = paciente.ID_DNI;
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
  const selectListObraSocial = document.getElementById("selectObraSocialPaciente")
  console.log(selectListObraSocial.dataset)
  obtenerOpcionesDatalist(selectListObraSocial.dataset.tabla,selectListObraSocial.dataset.columna_id,selectListObraSocial.dataset.columna_lista)
  .then(opciones => {selectListObraSocial.innerHTML ='<option value="vacio" data-id="vacio"></option>'+opciones
  console.log(data)
  document.getElementById("inputDniPaciente").value = data[0].ID_DNI 
  document.getElementById("inputCodigoPaciente").value = data[0].ID_PATIENT
  document.getElementById("inputNombrePaciente").value = data[0].name
  document.getElementById("inputApellidoPaciente").value = data[0].surname
  document.getElementById("inputNacimientoPaciente").value = data[0].date_birth
  document.getElementById("selectSexoPaciente").value = (data[0].gender == 'F' || data[0].gender =='M') ? data[0].gender : "vacio";
  document.getElementById("inputTelefonoPaciente").value = data[0].phone
  // document.getElementById("selectLocalidadPaciente").textContent = data.
  // document.getElementById("inputCodigoPostal").textContent = data.
  // document.getElementById("inputDireccionPaciente").textContent = data.
  // document.getElementById("inputNDireccionPaciente").textContent = data.
  selectListObraSocial.value =  selectListObraSocial.querySelector("option[data-id='"+data[0].PK_ID_PREPAID+"']").value
  document.getElementById("inputNumeroAfiliadoPaciente").value = data[0].prepaid_number
  document.getElementById("inputEmailPaciente").value = data[0].email


  })
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
  // eliminarFiltroBadge();
}

function crearFilaDatalist(navElement,container,data){
  // console.log(data);
  const template = document.getElementById("containerDatalist").content;
  const cantidadFilas = container.querySelectorAll(".fila").length
  const fragment = document.createDocumentFragment();
  const contenedorItemsFiltro = document.getElementById("contenedorFiltros")
  let idFila = 0
  if(cantidadFilas!=0){
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
  
  fragment.querySelector('.inputDatalist').addEventListener("change",(e)=>{
    seleccionValida = false
    container.querySelectorAll('.fila[data-id="'+ idFila +'"] option').forEach(opcion=>{
      if(e.target.value == opcion.value){
        if(contenedorItemsFiltro.querySelector('button[data-id="'+ navElement.dataset.datalist + idFila +'"]')){
          contenedorItemsFiltro.querySelector("span").textContent = e.target.value;
        }else{
          let fragmento = document.createDocumentFragment();
          let template = document.getElementById("opcionFiltro").content.cloneNode(true)
          template.querySelector("span").textContent = e.target.value;
          template.querySelector("button").dataset.id= navElement.dataset.datalist + idFila
          fragmento.appendChild(template)
          console.log(document.getElementById("contenedorFiltros"))
          document.getElementById("contenedorFiltros").appendChild(fragmento)
        }
        seleccionValida = true
      }
      if( contenedorItemsFiltro.querySelector('button[data-id="'+ navElement.dataset.datalist + idFila +'"]') && seleccionValida == false){
        contenedorItemsFiltro.removeChild(contenedorItemsFiltro.querySelector('button[data-id="'+ navElement.dataset.datalist + idFila +'"]'))
        console.log("invalida")
      }
      console.log("cambio input")
    })
  })

  fragment.querySelector("button").addEventListener("click",(e)=>{
    if(e.currentTarget.querySelector("i").classList.contains("bx-minus")){
      console.log(e.currentTarget)
      container.removeChild(container.querySelector('.fila[data-id="'+ idFila +'"]'))
      console.log(contenedorItemsFiltro);
      contenedorItemsFiltro.removeChild(contenedorItemsFiltro.querySelector('button[data-id="'+ navElement.dataset.datalist + idFila +'"]'))
    }
    
    if(e.currentTarget.querySelector("i").classList.contains("bx-plus")){
      console.log("mas")
      e.currentTarget.querySelector("i").classList.replace("bx-plus","bx-minus")
      crearFilaDatalist(navElement,container,data)
    }
  })
  
  container.appendChild(fragment)
}

// function eliminarFiltroBadge(){

//   document.querySelectorAll("i").forEach(icono=>{

//     console.log(icono)
//     icono.addEventListener("click",(e)=>{
//       console.log(e.target)

//   })
//   })
// }

async function obtenerOpcionesDatalist(tabla,columnaId,columnaLista){
  // tabla = "PERSONAL_INFORMATION"
  // columnaId = "ID_DNI";
  // columnaLista = "name";
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
    opciones += '<option data-id="' + opcion[columnaId] + '" value="' + opcion[columnaLista] +'">'+ opcion[columnaLista] +'</option>' 	
  })
  return await opciones;
} 
