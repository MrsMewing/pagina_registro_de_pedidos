Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    console.log("Permiso aceptado ✅");
  }
});