//Asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_jct_pwa';

//Ficheros a cachear en la aplicacion
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
    './img/apple-touch-icon.png',
    './img/about-bg.jpg',
    './img/about-plan.jpg',
    './img/about-vision.jpg',
    './img/ic_golf.png',
    './img/imgfrase.jpg',
    './img/preloader.gif',
    './img/quote-sign-left.png',
    './img/quote-sign-right.png',
    './img/tucuman-rugby-club.jpg',
    './img/portfolio/capacitateMejores.jpg',
    './img/portfolio/imgportfolio-hockey1.jpg',
    './img/portfolio/imgportfolio-hockey2.jpg',
    './img/portfolio/imgportfolio-hockey3.jpg',
    './img/portfolio/imgportfolio-hockey4.jpg',
    './img/portfolio/sevenAlvarez.jpg',
    './img/portfolio/imgportfolio-rugby1.jpg',
    './img/portfolio/imgportfolio-rugby2.jpg',
    './img/portfolio/imgportfolio-rugby3.jpg',
    './img/portfolio/vecoVillegas.jpg',
    './img/intro-carousel/1.jpg',
    './img/intro-carousel/2.jpg',
    './img/intro-carousel/3.jpg',
    './img/intro-carousel/4.jpg',
    './img/intro-carousel/5.jpg',
    './img/featured-services/imginstalsedes02.jpg',
    './img/featured-services/imgsociales.jpg',
    './img/featured-services/logo.png',
    './img/clients/client-1.png',
    './img/clients/client-2.png',
    './img/clients/client-3.png',
    './img/clients/client-4.png',
    './img/clients/client-5.png',
    './img/clients/client-6.png',
    './img/clients/client-7.png',
    './img/clients/client-8.png',
    './img/comunicados/feliznavidad.jpg',
    './img/comunicados/fiesta2018.jpg',
    './img/comunicados/rugbyjuvenilpostemp2018.jpg',
    './img/comunicados/rugbym14primera.jpg',
    './img/comunicados/rugbysevendelplumazo2018.jpg',
    './img/comunicados/sevendelaachila2018a.jpg',
    './img/comunicados/sevendelachilata2018.jpg',
    
];

//Evento Install
//Instalacion del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                  return cache.addAll(urlsToCache)
                              .then(() => {
                                  self.skipWaiting();
                              });              
              })
              .catch(err => console.log('No se ha registrado el cache', err))
    );
});

//Evento Activate
//Que la app funcione sin conexion
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
              .then(cacheNames => {
                  return Promise.all(
                      cacheNames.map(cacheName => {

                          if(cacheWhitelist.indexOf(cacheName) === -1){
                                //Borrar elemntos que no se necesitan
                                return caches.delete(cacheName);
                          }
                      })
                  );
              })
              .then(() => {
                  //Activar cache
                  self.clients.claim();
              })
    );
});

//Evento fetch
self.addEventListener('fetch', e => {

    e.respondWith(
        caches.match(e.request)
              .then(res => {
                  if(res){
                      //Devuelvo datos desde cache
                      return res;
                  }
                  return fetch(e.request);
              })
    );
});