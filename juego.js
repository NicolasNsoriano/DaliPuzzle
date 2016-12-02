/*
  Hagamos un repaso rápido de la forma en la que va a funcionar nuestro juego:

  - En el HTML sólo tenemos un div#juego que se usará como contenedor para que
    desde nuestro codigo javascript creemos las piezas que lo componen.
  - Cada pieza tiene un alto y un ancho de 200px y una posición absoluta (estos estilos
    están definidos en la clase 'pieza') y su posición (valores de left y top en el
    estilo del elemento) estará definida por la fila y la columna en la que se encuentre
    dicha pieza. La imagen de fondo de la pieza se corresponderá con el número de pieza.
  - Al iniciarse el programa, se va a definir la estructura del objeto que va a
    representar nuestro juego y se va a iniciar de la siguiente manera: 
    se crean todas las piezas, se agregan al HTML de manera ordenada y se va a 
    mezclar muchas veces de manera aleatoria para que el usuario empiece a jugar.

  * ATRIBUTOS de JUEGO:
  - filas: (Array[Array]) es array de 3 elmentos (representando cada fila), en
    donde cada uno de ellos contiene otro array (representando cada columna  de esa
    fila) en donde habrá una referencia de la pieza que se encuentra en esa posicion.
  - espacioVacio: en este objeto vamos a tener definida la ubicación de un espacio 
    vacío en donde NUNCA deberá haber ubicada una pieza, o sea que, 
    SIEMPRE SE TIENE QUE CUMPLIR ESTA CONDICION:
      juego.filas[juego.espacioVacio.fila][juego.espacioVacio.columna] == null
  - dimension: int que representa la dimension (asumiento que el juego va a ser siempre
    cuadrado, o sea que filas == columnas) para utilizar este atributo cada vez que 
    necesitemos hacer algún cálculo o comparación con la dimensión. Esta es una buena
    práctica y muy recomendable para tener en cuenta siempre que necesitemos realizar
    operaciones con alguna variable nuestra y alguna constante (números, strings,
    fechas, etc). 

  * FUNCIONES de JUEGO:
  - crearPieza(numero, fila, columna): crea la pieza número n (parametro 'numero'),
    que va a estar ubicada en la posicion designada por los parámetros fila y columna.
    Devuelve un objeto con la siguiente estructura:
      { 
        el: el elemento HTML que se que representa la pieza y se agregará al contenedor del juego,
        numero: el número de pieza,
        fila: la fila en donde está ubicada dentro del contenedor,
        columna: la columna en donde está ubicada dentro del contenedor
      }
  - iniciar(contendor): crea todas las piezas necesarias y las agrega al contendor
    para poder visualizarlas en nuestro HTML

  Luego iremos agregando el resto de las funciones necesarias para poder asegurar el correcto
  funcionamiento de nuestro juego, pero para esta instancia con estas funciones vamos a estar bien. =)
*/

/*
  Acá vamos a definir la estructura del objeto juego, con sus atributos y sus funciones.
*/
var juego = {
  dimension: 3,
  filas: [[], [], []],
  espacioVacio: {
    fila: 2,
    columna: 2
  },

  /*
    - Recibe como parametro el numero de pieza, y su ubicacion (fila - columna)
    - Devuelve un objeto con la especificación que está arriba en la documentación
  */
  crearPieza: function (numero, fila, columna) {
    // Creemos un div utilizando jQuery
    var nuevoElemento = $('<div>');
    // Ahora, agreguémosle la clase 'pieza' para que tenga el estilo común de todas las piezas
    nuevoElemento.addClass('pieza');

    // Ahora agreguémosle el estilo específico para esta pieza, dado por su número y su posición
    nuevoElemento.css({
      backgroundImage: 'url(./piezas/' + numero + '.jpeg)',
      top: fila * 200,
      left: columna * 200
    });

    /*
      Ahora hagamos que nuestra función devuelva un objeto representando la pieza,
      asegurándonos que contenga los atributos que definimos en la documentación y
      de la misma forma en la que está ahi descripto.
    */
    return {
      el: nuevoElemento,
      numero: numero,
      filaInicial: fila,
      columnaInicial: columna,
    };
  },

  /*
    - Recibe como parámetro el contenedor HTML
  */
  iniciar: function (contenedor) {
    // Creemos una variable counter, que iremos incrementando (de 1 a 8) y utilizaremos como numero de pieza
    var counter = 1;

    // Ahora, tenemos que crear una pieza para cada posicion
    // Primero iteraremos las filas para luego iterar sobre las columnas de cada fila hasta recorrer todo el array
    for (var fila = 0; fila < this.dimension; fila++) {

      // Ahora iteramos por las columnas de cada fila
      for (var columna = 0; columna < this.dimension; columna++) {

        //console.log("pieza"+counter);
        if (this.espacioVacio.fila == fila && this.espacioVacio.fila == columna) {
          //alert("espacioVacio");
        } else {
          var pieza = this.crearPieza(counter++, fila, columna);
          contenedor.append(pieza.el)
          this.filas[fila][columna] = pieza
        }
        /*
          Como dijimos en la documentación, tenemos la condicion de que en el espacio vacío nunca va a
          haber una pieza, por lo tanto, agreguemos esa validacion para asegurarnos que se cumpla también
          al momento de crear las piezas.
        */
        /* Deben validar si se encuentran en la posicion del espacio vacio*/

        /*
           SI estan en en la posicion del espacio vacio, deben asignar null. Ejemplo:
           this.filas[fila][columna] = null;*/

        /* NO estan en en la posicion del espacio vacio, entonces tienen que realizar los siguientes pasos:
          1)Llamemos a nuestra función crearPieza() con los parámetros correspondientes,
          y asignemos el resultado a una variable.
          2)Recordemos que tenemos que incrementar el contador luego de crearla. contenedor.append(pieza.el);
          3)Recordemos que debemos asignar en el array la pieza
        */


      }
    }

    // Como el objetivo de esta función es que se inicialice el juego, no es necesario devolver nada
  }, capturartecla: function () {
    var that = this;
    $(document).keydown(function (evento) {
      switch (evento.keyCode) {
        case 37:
          that.moverHaciaLaIzquierda();
          break;
        case 38:
          that.moverHaciaArriba();
          break;
        case 39:
          that.moverHaciaLaDerecha();
          break;
        case 40:
          that.moverHaciaAbajo();
          break;
        default: return;
      }
      
      if (that.chequearSiGano()) {
        $(document).off("keydown");
        setTimeout(function () {
          $("#mensaje").fadeIn();
        }, 300);
      }
    });
  },
  moverHaciaLaIzquierda: function () {
    var filaorigen = this.espacioVacio.fila;
    var columnaorigen = this.espacioVacio.columna + 1;
    this.intercambiarPosicionConEspacioVacio(filaorigen, columnaorigen);
  },
  moverHaciaLaDerecha: function () {
    var filaorigen = this.espacioVacio.fila;
    var columnaorigen = this.espacioVacio.columna - 1;
    this.intercambiarPosicionConEspacioVacio(filaorigen, columnaorigen);
  },
  moverHaciaAbajo: function () {
    var filaorigen = this.espacioVacio.fila - 1;
    var columnaorigen = this.espacioVacio.columna;
    this.intercambiarPosicionConEspacioVacio(filaorigen, columnaorigen);
  },
  moverHaciaArriba: function () {
    var filaorigen = this.espacioVacio.fila + 1;
    var columnaorigen = this.espacioVacio.columna;
    this.intercambiarPosicionConEspacioVacio(filaorigen, columnaorigen);
  },
  intercambiarPosicionConEspacioVacio: function (fila, columna) {
    //if ((fila>=0)&&(fila<=2)&&(columna>=0)&&(columna<=2) )
    var ficha = this.filas[fila] && this.filas[fila][columna];
    if (ficha) {
      this.moverFichaFilaColumna(ficha, this.espacioVacio.fila, this.espacioVacio.columna);
      this.guardarEspacioVacio(fila, columna);
    }
  },
  moverFichaFilaColumna: function (ficha, fila, columna) {
    this.filas[fila][columna] = ficha;
    ficha.el.css({
      top: fila * 200,
      left: columna * 200
    });
  },
  guardarEspacioVacio: function (fila, columna) {
    this.espacioVacio.fila = fila;
    this.espacioVacio.columna = columna;
    this.filas[fila][columna] = null;
  },

  mezclarFichas: function (veces) {
    if (veces <= 0) { return; }

    var that = this;
    var funciones = ['moverHaciaAbajo', 'moverHaciaArriba', 'moverHaciaLaDerecha', 'moverHaciaLaIzquierda'];
    var numeroRandom = Math.floor(Math.random() * 4);
    var nombreDeFuncion = funciones[numeroRandom];
    this[nombreDeFuncion]();
    setTimeout(function () {
      that.mezclarFichas(veces - 1);
    }, 100);
  },

  chequearSiGano: function () {
    for (var f = 0; f < this.filas.length; f++) {
      for (var c = 0; c < this.filas.length; c++) {
        var ficha = this.filas[f][c];
        if (ficha && !(ficha.filaInicial == f && ficha.columnaInicial == c)) {
          return false;
        }
      }
    }

    return true;
  }
}

$(function () {
  /* 
    La función iniciar necesita recibir el elemento contenedor sobre el cual queremos montar nuestro juego
  */

  var contenedor = $('#juego');
  juego.iniciar(contenedor);
  juego.mezclarFichas(60);
  juego.capturartecla();
})
