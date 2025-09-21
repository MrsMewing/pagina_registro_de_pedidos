const modal = document.getElementById("modal");
const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", () => {
    modal.classList.add("show");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
    modal.classList.remove("show");
    }
});

function crear_nuevo_recordatorio_pedido(datos_formulario){
    let recordatorio = document.createElement("div");
    recordatorio.className = "pedido";

    const numero_pedido = document.getElementById("contenedor-pedidos").children.length + 1;

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

    const contenedor_botones = document.createElement("div");
    contenedor_botones.className = "acciones";

    const boton_acutalizar_recordatorio = document.createElement("button");
    boton_acutalizar_recordatorio.className = "update";
    boton_acutalizar_recordatorio.appendChild(document.createTextNode("Actualizar"));

    const boton_eliminar_recordatorio = document.createElement("button");
    boton_eliminar_recordatorio.className = "delete";
    boton_eliminar_recordatorio.onclick = function () {
        recordatorio.remove();
    }
    boton_eliminar_recordatorio.appendChild(document.createTextNode("Eliminar"));

    contenedor_botones.appendChild(boton_acutalizar_recordatorio);
    contenedor_botones.appendChild(boton_eliminar_recordatorio);

    recordatorio.appendChild(titulo_recordatorio);
    recordatorio.appendChild(cantidad_a_pagar);
    recordatorio.appendChild(hora_de_pago);
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

    modal.classList.remove("show");
})
