//Vista administrador

var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function(){
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function(){
    contexto.reconstruirLista();
  });
  this.modelo.preguntasEliminadas.suscribir(function(){
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function(){
    contexto.reconstruirLista();
  });

};

VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.configuracionDeBotones();
    this.reconstruirLista();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    //var nuevoItem = document.createElement("li");
    //nuevoItem.classList.add("list-group-item");
    // nuevoItem.id = pregunta.id;
    //nuevoItem.texto = pregunta.textoPregunta;
    var nuevoItem = $("<li>")
      .addClass("list-group-item")
      .attr('id', pregunta.id)
      .attr('texto', pregunta.textoPregunta);
    console.log(nuevoItem);

    var interiorItem = $('.d-flex');
    //console.log($('.d-flex').html());
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    console.log(nuevoItem);
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    //var preguntas = this.modelo.preguntas;
    var preguntas = JSON.parse(localStorage.getItem('preguntas'));
    for (var i=0 ; i<preguntas.length ; ++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];
      $('[name="option[]"]').each(function() {
            //completar
        var respuesta = $(this).val();
        console.log(respuesta);
        if (respuesta != "") {
          respuestas.push({ "textoRespuesta": respuesta, "cantidad": 0 });
          }
        })

        //guardar variable donde se debe guardar
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos

    e.botonBorrarPregunta.click(function(){
      contexto.controlador.eliminarPregunta();
    });

    e.botonBorrarTodo.click(function(){
      contexto.controlador.eliminarTodasLasPreguntas();
    });

    e.botonEditarPregunta.click(function(){
      var $id = $('.list-group-item.active').attr('id');
      contexto.controlador.editarNombrePregunta($id);
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
