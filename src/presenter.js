let listaNotas = [];
const objNota = {
  titulo: "",
  fecha: "",
  texto: "",
};

const formularioBuscar = document.querySelector("#formulario-buscar");
const tituloBuscar = document.querySelector("#titulo-buscar");

function buscarNota(titulo){
    for (var i = 0; i < listaNotas.length; i++) {
      var tituloBuscado = listaNotas[i].titulo;
      if (titulo == tituloBuscado) {
        return notas[i];
      }
    }
  }

formularioBuscar.addEventListener("submit",(event)=>{
    const divBuscado = document.querySelector("#div-buscado")
    let nota = buscarNota(tituloBuscar.value);
    console.log(nota)
    divBuscado.innerHTML=`${nota.fecha} - ${nota.titulo} - ${nota.texto} - `;
})

