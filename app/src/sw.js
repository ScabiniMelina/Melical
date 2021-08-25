function activateServiceWorker() {
  //Pregunta si el serviceworker existe en el objeto navigator, para validar si el navegador soporta service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(response => console.log('Registro de SW exitoso', response))
      .catch(error => console.warn('Error al tratar de registrar el sw', error))
  }
}

activateServiceWorker();

const CACHE_NAME = 'v1_melical';
const urlsToCache = [
  //TODO: MELI PONER LOS ARCHIVOS QUE SE TIENEN QUE CACHEAR
  // './',
  // 'https://fonts.googleapis.com/css?family=Raleway:400,700',
  // './img/ProgramadorFitness.png',
  // './img/favicon.png'
]

//Durante la instalacion de la PWA, se guarda la cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      //Agrego al cache del dispositivo todas las urls que están el la constante cache name
      return cache.addAll(urlsToCache)
        .then(() => self.skipWaiting())
    })
    .catch(error => console.log('Falló el registro de cache', error))
  )
})

//Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          //Eliminamos lo que ya no se necesita en cache
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
    // Le indica al SW activar el cache actual
    .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
    .then(res => {
      if (res) {
        //recuperar del cache
        return res
      }
      //recuperar de la petición a la url
      return fetch(e.request)
    })
  )
})