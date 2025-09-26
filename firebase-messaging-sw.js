importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

// Inicializa Firebase en el Service Worker
firebase.initializeApp({
  apiKey: "AIzaSyCrUwNd-Z-NPaYqJk4LK-zfTKF5OTYZInw",
  authDomain: "notificaciones-push-218b7.firebaseapp.com",
  projectId: "notificaciones-push-218b7",
  storageBucket: "notificaciones-push-218b7.firebasestorage.app",
  messagingSenderId: "571961259157",
  appId: "1:571961259157:web:a60a7a860449976ac6179c",
  measurementId: "G-XC04BVFPXM"
});

const messaging = firebase.messaging();

// Escuchar notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("Notificación en background:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/images/payment_128x128.png",
  });
});

