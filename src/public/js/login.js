const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((result) => {
      if (result.status === 200) {
        result.json().then((json) => {
          window.location.replace('/home');
        });
      } else {
        let title = '';
        let text = '';
        switch (result.status) {
          case 401:
            // Código a ejecutar si expression coincide con value1
            console.log('Autenticación fallida');
            title = 'Authentication Error';
            text = 'It was not possible to authorize entry';
            break;
          case 404:
            // Código a ejecutar si expression coincide con value2
            console.log('Autenticación fallida');
            title = 'Error Crítico';
            text = 'No se encuentra el recurso solicitado';
            break;
          // Puedes tener tantos casos como desees
          default:
            // Código a ejecutar si ninguno de los casos coincide con expression
            console.log('Unexpected error:', result.status);
            console.error('Error al realizar la solicitud:', error);
            title = 'System error';
            text = 'It was not possible to authorize entry';
        }
        Swal.fire({
          icon: 'error',
          title: title,
          text: text,
        });
      }
    })
    .catch((error) => {
      // Manejar errores de red u otros problemas
      console.error('Error al realizar la solicitud:', error);
      console.error('Error status:', error.response.status);
      title = 'Error de Sistema';
      text = 'No fué posible autorizar el ingreso, Revise usuario y clave';
      Swal.fire({
        icon: 'error',
        title: title,
        text: text,
      });
    });
});
