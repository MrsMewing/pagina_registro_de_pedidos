const fecha_actual = new Date();
const dia_actual = fecha_actual.toLocaleDateString("es-ES", {weekday: "long"});

const pedidos_actuales = localStorage.getItem(`pedidos_${dia_actual}`);

if (!pedidos_actuales || JSON.parse(pedidos_actuales).length === 0){
    document.getElementById("dia-seleccionado").textContent = dia_actual.toUpperCase();
    document.getElementById("contador-pedidos").textContent = `Actualmente tienes 0 pedidos`
    document.getElementById('sin-datos').style.display = "block";
}
else{
    document.getElementById('sin-datos').style.display = "none";
    JSON.parse(pedidos_actuales).forEach((pedidos) => {
        const nuevo_recordatorio = crear_nuevo_recordatorio_pedido(pedidos);
        document.getElementById("contenedor-pedidos").appendChild(nuevo_recordatorio);
    })

}

function crear_nuevo_recordatorio_pedido(datos_formulario){
    let recordatorio = document.createElement("div");
    recordatorio.className = "pedido";

    const numero_pedido = document.getElementById("contenedor-pedidos").children.length;

    const titulo_recordatorio = document.createElement("h2");
    titulo_recordatorio.textContent = `Pedido #${numero_pedido}: ${datos_formulario.nombre_empresa}`; 

    const cantidad_a_pagar = document.createElement("p");
    const texto_cantidad = document.createElement("strong")
    texto_cantidad.appendChild(document.createTextNode("Cantidad a pagar: "));

    cantidad_a_pagar.appendChild(texto_cantidad);
    cantidad_a_pagar.appendChild(document.createTextNode("Q" + datos_formulario.cantidad_a_pagar))

    const hora_de_pago = document.createElement("p");
    const texto_hora = document.createElement("strong");
    texto_hora.appendChild(document.createTextNode("Hora de pago: "))

    hora_de_pago.appendChild(texto_hora);
    hora_de_pago.appendChild(document.createTextNode(datos_formulario.hora_de_pago));

    const fecha_de_pago = document.createElement("p");
    const texto_fecha = document.createElement("strong");
    texto_fecha.appendChild(document.createTextNode("Fecha de pago: "));

    fecha_de_pago.appendChild(texto_fecha);
    fecha_de_pago.appendChild(document.createTextNode(datos_formulario.fecha_de_pago));

    const contenedor_botones = document.createElement("div");
    contenedor_botones.className = "acciones";

    const boton_acutalizar_recordatorio = document.createElement("button");
    boton_acutalizar_recordatorio.className = "update";
    boton_acutalizar_recordatorio.appendChild(document.createTextNode("Actualizar"));

    const boton_eliminar_recordatorio = document.createElement("button");
    boton_eliminar_recordatorio.className = "delete";
    boton_eliminar_recordatorio.onclick = function () {
        const recordatorios_guardados = JSON.parse(localStorage.getItem(`pedidos_${datos_formulario.dia_de_pago}`))

        let nuevos_recordatorios_actualizados = [];
        recordatorios_guardados.forEach((recordatorio) => {
            if(recordatorio.nombre_empresa !== datos_formulario.nombre_empresa){
                nuevos_recordatorios_actualizados.push(recordatorio);
            }
        })

        localStorage.setItem(`pedidos_${datos_formulario.dia_de_pago}`, JSON.stringify(nuevos_recordatorios_actualizados));
        document.getElementById("contador-pedidos").textContent = `Actualmente tienes ${nuevos_recordatorios_actualizados.length} pedidos`
        recordatorio.remove();
    }
    boton_eliminar_recordatorio.appendChild(document.createTextNode("Eliminar"));

    contenedor_botones.appendChild(boton_acutalizar_recordatorio);
    contenedor_botones.appendChild(boton_eliminar_recordatorio);

    recordatorio.appendChild(titulo_recordatorio);
    recordatorio.appendChild(cantidad_a_pagar);
    recordatorio.appendChild(hora_de_pago);
    recordatorio.appendChild(fecha_de_pago);
    recordatorio.appendChild(contenedor_botones)

    return recordatorio;
}

const enlace_formulario = document.getElementById("formulario-nuevo-recordatorio");

enlace_formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const datos_formulario = new FormData(enlace_formulario);

    const datos_estructurados_formulario = Object.fromEntries(datos_formulario);

    let pedidos_guardados = localStorage.getItem(`pedidos_${datos_estructurados_formulario.dia_de_pago}`);
    let recordatorios_pedidos_actuales = [];

    //verifica si hay datos guardados en memoria y los obtiene para actualizarloswa
    if (pedidos_guardados) recordatorios_pedidos_actuales = JSON.parse(pedidos_guardados);

    recordatorios_pedidos_actuales.push(datos_estructurados_formulario)

    localStorage.setItem(`pedidos_${datos_estructurados_formulario.dia_de_pago}`, JSON.stringify(recordatorios_pedidos_actuales));
    
    const nuevo_recordatorio = crear_nuevo_recordatorio_pedido(datos_estructurados_formulario);

    document.getElementById("contenedor-pedidos").appendChild(nuevo_recordatorio);

    document.getElementById("contador-pedidos").textContent = `Actualmente tienes ${recordatorios_pedidos_actuales.length} pedidos`

    document.getElementById("sin-datos").style.display = 'none';
    document.getElementById("modal").style.display = "none";
})

const opciones_barra_de_navegacion = document.getElementsByTagName("nav")[0].children

for (let indice = 0; indice < opciones_barra_de_navegacion.length; indice++){
    let opcion_barra_de_navegacion = opciones_barra_de_navegacion[indice];

    opcion_barra_de_navegacion.onclick = function (event) {
        const contenedor_pedidos = document.getElementById("contenedor-pedidos");
        const sinDatos = document.getElementById('sin-datos');

        document.getElementById("dia-seleccionado").textContent = event.target.textContent.toUpperCase();
        // Elimina solo los recordatorios, no el div de sin-datos
        Array.from(contenedor_pedidos.children).forEach(child => {
            if (child !== sinDatos) child.remove();
        });

        const pedidos_guardados = localStorage.getItem(`pedidos_${event.target.textContent.toLocaleLowerCase()}`);

        if (!pedidos_guardados || JSON.parse(pedidos_guardados).length === 0) {
            sinDatos.style.display = 'block';
             document.getElementById("contador-pedidos").textContent = `Actualmente tienes 0 pedidos`
        } else {
            sinDatos.style.display = 'none';
            const recordatorios_pedidos = JSON.parse(pedidos_guardados);

            recordatorios_pedidos.forEach(datos_recordatorio => {
                contenedor_pedidos.appendChild(crear_nuevo_recordatorio_pedido(datos_recordatorio));
            })

            document.getElementById("contador-pedidos").textContent = `Actualmente tienes ${recordatorios_pedidos.length} pedidos`
        }
    }
}

// Obtener elementos
const modal_nuevo_recordatorio = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");
const openBtn = document.getElementById("add-btn"); // tu botón flotante que abre el modal

// Abrir modal
openBtn.addEventListener("click", () => {
    modal_nuevo_recordatorio.style.display = "flex";
    document.getElementById("dia_de_pago").value = dia_actual;
});

// Cerrar modal con la X
closeBtn.addEventListener("click", () => {
    modal_nuevo_recordatorio.style.display = "none";
});

// Cerrar modal si se hace click fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target === modal_nuevo_recordatorio) {
        modal_nuevo_recordatorio.style.display = "none";
    }
});

console.log("Todo esta actualizado correctamente, talvez el token de firebase expiro o algo similar")