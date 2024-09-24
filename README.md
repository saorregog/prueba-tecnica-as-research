# Prueba técnica **as research**

Elaborada por Sergio Orrego

## Prueba 1 (fallo en el consumo de APIs)

No todos los endpoints retornan los atributos de `Latitud` y `Longitud` para los registros consultados. Uno de los endpoints retorna los atributos `CoordMestricas_AL_N` y `CoordMestricas_AL_W`, y los registros de otro de los endpoints pueden tener valores nulos o strings vacíos para algunos de los atributos anteriormente mencionados.

Para solucionar este fallo, se decide notificar al usuario mediante el texto "Sin información" en aquellos casos en los cuales alguno de los atributos no exista para un registro en particular, el valor del atributo sea nulo o un string vacío.

## Prueba 2 (detección de fallos funcionales)

Los endpoints retornan registros con el atributo `fotos` o `Fotos`. Para que se rendericen todos los registros, fue necesario validar cuál de los dos atributos contiene cada registro en cuestión y proseguir el flujo normal del aplicativo con la información del atributo correspondiente.

## Prueba 3 (fallo estético prioritario)

El elemento con clase `slideshow-container` estaba renderizando todo el material fotográfico del registro y luego ocultándolo a medida que se desplazaba a la siguiente imagen para mostrar. Por lo tanto, se hizo algunas modificaciones a la lógica de la función `initializeSlideshows` para que se oculten todas las imágenes excepto la primera que debe ser mostrada, y luego se muestren las siguientes imágenes una a una cada vez que pasen 3 segundos.

Con los cambios realizados, los elementos con clase `image-item` presentan desde el comienzo un tamaño uniforme.

## Prueba 4 (visualización de datos)

En la página "Gráficos" (accesible mediante el footer) se encuentran dos gráficos propuestos para proyectar la información proveniente de uno de los endpoints.

## Prueba 5 (optimización de recursos computacionales)

- Se agrega un favicon a cada página del aplicativo.

- El archivo .ttf con la tipografía Candara es recuperado de internet y ubicado en la raíz del proyecto.

- Se crean archivos .css y .js para contener el código correspondiente y reducir la longitud del archivo .html.

- Se cambia la posición del `catch` asociado al método `fetch` de la función `fetchAndDisplayImages` para capturar únicamente los errores asociados a consultas del endpoint. Además, se genera una promesa con estado rechazado en caso tal que el código de estado HTTP de la petición sea distinto a 200.

- Si un registro contiene material fotográfico (atributo `fotos` o `Fotos`), se calcula el número de fotos dentro del atributo para que sea recorrido eficientemente por el bucle `for`.

- Si un registro no contiene material fotográfico, no se inicializa el dinamismo en el elemento con clase `slideshow-container`.

- El evento de Click asociado al elemento con clase `slideshow-container` no se visualiza correctamente debido a que cada elemento de imagen perteneciente al elemento con clase `mySlides`, tiene un evento de Click asociado que se ejecuta al mismo tiempo y abre el modal con la imagen en cuestión a tamaño completo. Se decide que el evento asociado al elemento con clase `slideshow-container` se ejecute con Click Derecho.

- Formateo de código usando Prettier.
