// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAei-uGFUV9X9ER4zaupliCvafUxNRyNdI",
  authDomain: "app-de-gestion-de-pedidos.firebaseapp.com",
  projectId: "app-de-gestion-de-pedidos",
  storageBucket: "app-de-gestion-de-pedidos.firebasestorage.app",
  messagingSenderId: "291037199490",
  appId: "1:291037199490:web:6d84ad7c9a79af4a63889b",
  measurementId: "G-Y97ZCKY5CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

getToken({ vapidKey: "BEUHR0yYHlulFvdfFQKj521uYozAY42iHoenwihsuwdwA2We-z-4chKlJzijJrL3_zcrWvCQ7bYS3h5G3HL0J6A" })
onMessage((payload) => {
  console.log("Mensaje recibido", payload);
})

function notificar_activacion_de_notificaciones(){
  //Codigo que se ejecuta 2 segundos despues
  setTimeout(() => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('¡Notificaciónes activadas!',
          {
          body: "Te notificaremos solo cuando haya un recordatorio pendiente",
          icon: "/images/megaphone.png",
        }
        );
      }
    });
  }, 2000);
}