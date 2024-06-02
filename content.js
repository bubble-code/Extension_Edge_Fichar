// content.js

// Verificar que estamos en la página correcta
if (window.location.href === "http://10.0.0.1/favram/Presencia.aspx") {
    // Cambiar el fondo de la página a azul claro
    document.body.style.backgroundColor = "#ADD8E6";

    // Función para crear marcas de agua
    function createWatermark(text, x, y) {
        const watermark = document.createElement("div");
        watermark.innerText = text;
        watermark.style.position = "fixed";
        watermark.style.top = `${y}px`;
        watermark.style.left = `${x}px`;
        watermark.style.transform = "rotate(-45deg)";
        watermark.style.fontSize = "36px";
        watermark.style.color = "rgba(0, 0, 0, 0.1)";
        watermark.style.zIndex = "9999";
        watermark.style.pointerEvents = "none";  // Para que la marca de agua no interfiera con otros elementos de la página
        document.body.appendChild(watermark);
    }

    // Dimensiones de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Crear marcas de agua repetidamente en diagonal
    for (let y = -50; y < windowHeight; y += 100) {
        for (let x = -50; x < windowWidth; x += 300) {
            createWatermark(" arranque paralelo ", x, y);
        }
    }

    // Función para agregar event listener al botón btnAceptar
    function addClickListener() {
        const btnAceptar = document.getElementById('ctl00_ContenidoCentral_btnAceptar');
        const tbOperario = document.querySelector("#ctl00_ContenidoCentral_txtOperario");

        if (btnAceptar && !btnAceptar.classList.contains('listener-added')) {
            btnAceptar.classList.add('listener-added'); // Marcar el botón como manejado
            btnAceptar.addEventListener('click', function () {
                // Realizar la llamada a la API
                if (btnAceptar.value === "Entrada") {
                    //alert('se ha dado click');
                    // Extraer y formatear el empleadoId
                    let empleadoId = tbOperario.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
                    empleadoId = empleadoId.padStart(3, '0'); // Formatear para que tenga al menos 3 dígitos
                    const entrada = true; // Asumimos que es una entrada
                    const usuarioAudi = 'usuario'; // Reemplazar con el usuario actual
                    const usuarioCreacionAudi = 'usuario'; // Reemplazar con el usuario actual
                    fetch('http://10.0.0.19:3000/registroEntrada', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            empleadoId: empleadoId, // Reemplaza con el ID real del empleado
                            entrada: entrada,
                            usuarioAudi: usuarioAudi,
                            usuarioCreacionAudi: usuarioCreacionAudi,
                            Ma: 0
                        })
                    })
                        .then(response => response.text())
                        .then(data => console.log(data))
                        .catch(error => console.error('Error:', error));
                }
                if (btnAceptar.value === "Salida") {
                    let empleadoId = tbOperario.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
                    empleadoId = empleadoId.padStart(3, '0'); // Formatear para que tenga al menos 3 dígitos
                    const entrada = false; // Asumimos que es una entrada
                    const usuarioAudi = 'usuario'; // Reemplazar con el usuario actual
                    const usuarioCreacionAudi = 'usuario'; // Reemplazar con el usuario actual
                    fetch('http://10.0.0.19:3000/registroEntrada', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            empleadoId: empleadoId, // Reemplaza con el ID real del empleado
                            entrada: entrada,
                            usuarioAudi: usuarioAudi,
                            usuarioCreacionAudi: usuarioCreacionAudi,
                            Ma: 1
                        })
                    })
                        .then(response => response.text())
                        .then(data => console.log(data))
                        .catch(error => console.error('Error:', error));
                }
            });
        }
    }
    // Crear un MutationObserver para observar cambios en el DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Intentar agregar el event listener al botón nuevamente
                addClickListener();
            }
        });
    });
    // Configurar el observer para observar cambios en el cuerpo del documento
    observer.observe(document.body, { childList: true, subtree: true });

    // Intentar agregar el event listener al botón al cargar la página
    addClickListener();
}
