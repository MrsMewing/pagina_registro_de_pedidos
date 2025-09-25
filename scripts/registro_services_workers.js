//verifica si el navegador soporta services workers y agrega el service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
  .then(reg => {
    console.log('Service Worker registrado:', reg);
  })
  .catch(err => {
    console.error('Error al registrar el SW:', err);
  });

}
