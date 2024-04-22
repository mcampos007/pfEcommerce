
const form = document.getElementById('loginForm');


form.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {}
    data.forEach((value, key) => obj[key] = value)

    // Usamos Fetch
    fetch('/api/password/reset', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            Swal.fire({
                icon: 'success',
                title: "successfully email send ",
                text: "",
                timer: 3000 // Tiempo en milisegundos (3 segundos en este caso)
            }).then(() => {
                setTimeout(() => {
                    window.location.replace('/');
                }, 3000); // Espera 3 segundos antes de redirigir
            });
        }else if (result.status === 400 || result.status === 500) {
            // Parsea la respuesta JSONS
           // Parsea la respuesta JSON
            result.json().then(data => {
               // console.log("Datos recibidos del servidor:", data);

                // Ahora puedes acceder a las propiedades de data
                //const data = result.data;
                const title = data.error;
                const mensajes = data.message
                let text = title;
                
                /* Object.keys(mensajes).forEach(key => {
                    text += `\n${key}: ${mensajes[key]}`;
                });  */

                // Usa estas propiedades en tu lógica
                Swal.fire({
                    icon: 'error',
                    title: title,
                    text: mensajes
                })
        })
    }
})})



/*
FormData es un objeto en JavaScript que se utiliza para construir fácilmente conjuntos de datos clave-valor que representan los campos y valores de un formulario HTML. Esto es útil cuando deseas enviar datos de formulario a través de una solicitud HTTP, como una petición AJAX o una solicitud de formulario.

Cuando creas una instancia de FormData y le pasas un formulario como argumento, la instancia de FormData automáticamente recopila todos los campos y sus valores del formulario y los organiza en un objeto que puedes manipular y enviar fácilmente.
*/