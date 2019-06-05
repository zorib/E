//Modelo

var Modelo = function() {
  var preguntas = JSON.parse(localStorage.getItem('preguntas'));
  if (preguntas) {
    this.preguntas = preguntas;
    } else {
      this.preguntas = [];
      }
      this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasEliminadas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var idNuevo = 0;
    this.preguntas.forEach(element => {
      if (element.id > idNuevo) {
        idNuevo = element.id;
        }
      });
      return idNuevo;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  //se guardan las preguntas
  guardar: function(pregunta){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
 },

 //se cargan las preguntas
// cargarLocalStore: function (){
//   if (localStorage.getItem('preguntas') !== null){
//     this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
//   }
// },

//se elimina una pregunta
eliminarPregunta: function(id){
   for (var i = 0; i < this.preguntas.length; i++) {
     if (this.preguntas[i].id == id) {
       this.preguntas.splice(i,1);
       this.guardar();
       this.preguntaEliminada.notificar();
       return;
     }
   }
 },

 //agregar respuesta

editarNombrePregunta: function(id, nuevaPregunta){
  for (var i = 0; i < this.preguntas.length; i++) {
    if (this.preguntas[i].id == id) {
      this.preguntas[i].textoPregunta = nuevaPregunta;
      this.guardar();
      this.preguntaEditada.notificar();
    }
  }
},

 //borrar todas las preguntas
eliminarTodasLasPreguntas: function(){
    this.preguntas = [];
    this.guardar();
    this.preguntasEliminadas.notificar();
  },

agregarVoto: function(preguntaEnviada, respuesta){
    this.preguntas.forEach(element => {
      if (element.textoPregunta == preguntaEnviada) {
        element.cantidadPorRespuesta.forEach(resp => {
          if (resp.textoRespuesta == respuesta) {
            resp.cantidad++;
            }
          })
        }
      })
      this.guardar();
      this.votoAgregado.notificar();
    },
};
