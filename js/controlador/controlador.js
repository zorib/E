// Controlador

var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  eliminarPregunta: function(){
    var respuesta = window.confirm('¿Seguro que queres eliminar esta pregunta?');
    if (respuesta) {
      var $id = $('.list-group-item.active').attr('id');
      this.modelo.eliminarPregunta($id);
    }
  },

  eliminarTodasLasPreguntas: function(){
    var respuesta = window.confirm('¿Seguro que queres eliminar todas las preguntas?')
    this.modelo.eliminarTodasLasPreguntas();
  },

  editarNombrePregunta: function(id){
    var nuevaPregunta = prompt('Ingresa nueva pregunta');
    if (nuevaPregunta != '') {
      this.modelo.editarNombrePregunta(id, nuevaPregunta);
    }else{
      alert('Ingresa el texto de la nueva pregunta')
    }
  },

  agregarVoto: function(pregunta,respuestaSeleccionada) {
    this.modelo.agregarVoto(pregunta,respuestaSeleccionada);
  },
};
