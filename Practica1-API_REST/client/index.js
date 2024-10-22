(async () => {
    await fetch('http://localhost:3000/saludos')
        .then(async (datos) => {
            await datos.json().then((datos) => {                                                // Conversión a JSON
                console.log(datos.lista);
                let padre = document.getElementById('ventana');                                 // Crea objeto asignando elemento del DOM con id='ventana'
                datos.lista.forEach(element => {                                                // Iteración sobre cada elemento en 'datos.lista'
                    let newDiv = padre.firstElementChild.cloneNode(true);                       // Clona el primer hijo del objeto creado inicialmente, incluyendo su estructura
                    newDiv.appendChild(document.createTextNode(Object.values(element)[0]));     // Obtiene el valor del objeto element, el mensaje de saludo correspondiente (en vez de element.saludo por tener nombres diferentes) y lo añade como texto al div clonado
                    padre.appendChild(newDiv);                                                  // Añade el nuevo div al contenedor padre
                });
                padre.firstElementChild.remove();                                               // Elimina primer hijo original para evitar repetición
            }, () => {
                console.log('Fallo de parseo')                                                  // Mensaje si hay algún error al parsear
            })
        }, (datos) => {
            console.log(datos);
        })
})();
