//Sirve para obtener, insertar, actualizar o eliminar datos de la bd
export async function databaseOperation(method, file, dataForm) {
	try {
		method = method.toLowerCase();
		let config = {};
		let urlVariables = '';
		if (method == 'post' || method == 'delete' || method == 'put' || method == 'get') {
			config.method = method;
			if (typeof dataForm !== 'undefined') {
				if (method == 'get' || method == 'delete' || method == 'put') {
					urlVariables = '?';
					for (let [key, value] of dataForm.entries()) {
						urlVariables += `${key}=${value}&`;
					}
					urlVariables = urlVariables.slice(0, -1);
					if (method == 'put') {
						config.body = urlVariables.slice(1);
						urlVariables = '';
					}
				} else {
					config.body = dataForm;
				}
			}
		} else {
			throw 'Método de envió de datos invalido';
		}
		const response = await fetch(`/model/${method}/${method}${file}.php${urlVariables}`, config);
		return await response.json();
	} catch (error) {
		console.log('error ' + error);
	}
}

function putImageOnServer(params) {

}