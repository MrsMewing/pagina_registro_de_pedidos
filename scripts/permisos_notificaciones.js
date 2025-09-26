// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrUwNd-Z-NPaYqJk4LK-zfTKF5OTYZInw",
    authDomain: "notificaciones-push-218b7.firebaseapp.com",
    projectId: "notificaciones-push-218b7",
    storageBucket: "notificaciones-push-218b7.firebasestorage.app",
    messagingSenderId: "571961259157",
    appId: "1:571961259157:web:a60a7a860449976ac6179c",
    measurementId: "G-XC04BVFPXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

Notification.requestPermission().then(async (permission) => {
  if (permission === 'granted') {
    const respuesta_servidor = await getToken(messaging, { vapidKey: 'BAIUxKde-3H62IEiRvntzkYFAkxOXCP1KS48virNjY_RYfmb0XKAkjDhppeFWdu94--xfEAsDpUq0RaABCH1DOU'} )
    
    console.log('Token:', respuesta_servidor);
    //enviar el token al servidor mio, para guardarlo y saber a quien le mandamos la notificacion
    notificar_activacion_de_notificaciones();
  }
});

function notificar_activacion_de_notificaciones(){
  //Codigo que se ejecuta 2 segundos despues
  setTimeout(() => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('¡Notificaciónes activadas!',
          {
          body: "Te notificaremos solo cuando haya un recordatorio pendiente",
          icon: "/images/payment_128x128.png",
        }
        );
      }
    });
  }, 2000);
}