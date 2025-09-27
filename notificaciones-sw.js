importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Inicializa Firebase en el Service Worker
firebase.initializeApp({
    apiKey: "AIzaSyALPYM3cZnQB-H2O6iYB5OiknlL6CSy7IQ",
    authDomain: "servicio-de-notificacion-6e3d2.firebaseapp.com",
    projectId: "servicio-de-notificacion-6e3d2",
    storageBucket: "servicio-de-notificacion-6e3d2.firebasestorage.app",
    messagingSenderId: "855565543269",
    appId: "1:855565543269:web:ec22bbe5e985fb9480638c",
    measurementId: "G-LMZX9NZPF0"
});

const messaging = firebase.messaging();

// Escuchar notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "images/payment_128x128.png",
  });
  console.log("Mensaje recibido del servidor")
});