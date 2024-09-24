# Prueba técnica as research

Elaborada por Sergio Orrego

## Prueba 1 (fallo en el consumo de APIs)

No todos los endpoints retornan los atributos de "Latitud" y "Longitud" para los registros consultados. Uno de los endpoints retorna los atributos "CoordMestricas_AL_N" y "CoordMestricas_AL_W", y los registros de otro de los endpoints pueden tener valores nulos o strings vacíos para alguno de los atributos anteriormente mencionados. Para los casos en los cuales alguno de los atributos no exista para un registro en particular, el valor sea nulo o un string vacío; se notifica al usuario mediante el texto "Sin información".

## Prueba 2 (detección de fallos funcionales)

Los endpoints retornan registros con el atributo "fotos" o "Fotos". Para que se rendericen todos los registros, fue necesario validar cuál de los dos atributos contiene cada registro en cuestión.

Se hace además una optimización en este punto. Si un registro contiene material fotográfico (atributo "fotos" o "Fotos"), se calcula el número de fotos dentro del atributo para que sea recorrido eficientemente por el bucle "for".

Por último, si un registro no contiene material fotográfico, no se inicializa el slideshow para el mismo.
