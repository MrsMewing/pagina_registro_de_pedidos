// Este código debe ejecutarse en el contexto de la ventana, no en el Service Worker
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification('¡Notificaciónes activadas!', {
        icon: "/images/check-mark (1).png"
      });
    }
  });
}
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