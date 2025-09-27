// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyALPYM3cZnQB-H2O6iYB5OiknlL6CSy7IQ",
    authDomain: "servicio-de-notificacion-6e3d2.firebaseapp.com",
    projectId: "servicio-de-notificacion-6e3d2",
    storageBucket: "servicio-de-notificacion-6e3d2.firebasestorage.app",
    messagingSenderId: "855565543269",
    appId: "1:855565543269:web:ec22bbe5e985fb9480638c",
    measurementId: "G-LMZX9NZPF0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if (!('Notification' in window)){
  console.log("El navegador o app no soporta notificaciones, lo sentimos")
}

const estado_actual_notificaciones = Notification.permission;

//verifica si el usuario a un no ha decidido una opcion, para preguntarle nosotros
if (estado_actual_notificaciones == "default"){
  const icono = document.getElementById("icono-notificacion");
  icono.setAttribute("src", "images/notificaciones_sin_respuesta.png");

  Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      //enviar el token al servidor mio, para guardarlo y saber a quien le mandamos la notificacion
      
      const icono = document.getElementById("icono-notificacion");
      icono.setAttribute("src", "images/notificaciones_activadas.png");

      notificar_activacion_de_notificaciones();
    }
    if(permission === "denied"){
        const icono = document.getElementById("icono-notificacion");
        icono.setAttribute("src", "images/notificaciones_desactivadas.png");
    }
  });
}

else if  (estado_actual_notificaciones == "granted"){
  const icono = document.getElementById("icono-notificacion");
  icono.setAttribute("src", "images/notificaciones_activadas.png");
}

else if (estado_actual_notificaciones == "denied"){
  const icono = document.getElementById("icono-notificacion");
  icono.setAttribute("src", "images/notificaciones_desactivadas.png");
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pagina_registro_de_pedidos/firebase-messaging-sw.js')
    .then(registration => {
      console.log('Service Worker registrado:', registration);
    })
    .catch(err => {
      console.error('Error al registrar el Service Worker:', err);
    });
}

function notificar_activacion_de_notificaciones(){
  //Codigo que se ejecuta 2 segundos despues
  setTimeout(() => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('¡Notificaciónes activadas!',
          {
          body: "Te notificaremos solo cuando haya un recordatorio pendiente",
          icon: "images/payment_128x128.png",
        }
        );
      }
    });
  }, 2000);
}
