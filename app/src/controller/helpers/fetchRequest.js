//Al cargar cualquier nueva sección, cambia el titulo y coloca el html correspondiente
export async function loadSection(file, title) {
  try {
    //Elimina todas las alertas previas de la sección
    document.getElementById('alertContainer').innerHTML = '';
    const sectionTitle = document.getElementById('sectionTitle');
    const container = document.getElementById('pageContainer');
    const response = await fetch(file);
    const html = await response.text();
    container.innerHTML = await html;
    sectionTitle.innerHTML = await title;
  } catch (error) {
    console.log('error ' + error);
  }
  //await formularyChanges();
}

//Sirve para obtener, insertar, actualizar o eliminar datos de la bd
export async function databaseOperation(method, file, dataForm) {
  try {
    method = method.toLowerCase();
    let config = {};
    let urlVariables = '';
    if (method == 'post' || method == 'delete' || method == 'put' || method == 'get') {
      config.method = method;
      if (typeof dataForm !== 'undefined') {
        if (method == 'get') {
          urlVariables = '?';
          for (let [key, value] of dataForm.entries()) {
            urlVariables += `${key}=${value}&`;
          }
          urlVariables = urlVariables.slice(0, -1);
        } else {
          config.body = dataForm;
        }
      }
    } else {
      throw 'Método de envió de datos invalido';
    }
    const response = await fetch(`./model/${method}/${method}${file}.php${urlVariables}`, config);
    return await response.json();
  } catch (error) {
    console.log('error ' + error);
  }
}