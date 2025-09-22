//verifica si el navegador soporta services workers y agrega el service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service_worker_notification.js')
    .then(reg => console.log("✅ Service Worker registrado", reg))
    .catch(err => console.error("❌ Error registrando SW:", err));
}
