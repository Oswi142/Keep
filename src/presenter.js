let listaNotas = [];

const ObjetoNota = {
  fecha: "",
  titulo: "",
  texto: "",
};

let edited = false;

const form = document.querySelector("#form");
const InsertTittle = document.querySelector("#titulo");
const InsertText = document.querySelector("#texto");
const botonCrear = document.querySelector("#btn-crear");

form.addEventListener("submit", validarForm);

function validarForm(e) {
  e.preventDefault();

  if (InsertTittle.value === "" || InsertText.value === "") 
  {
    alert("Se deben llenar todos los campos");
    return;
  }
  if (edited) 
  {
    editNota();
    edited = false;
  } 
  else 
  {
    ObjetoNota.fecha = Date.now();
    ObjetoNota.titulo = InsertTittle.value;
    ObjetoNota.texto = InsertText.value;
    createNota();
  }
  refreshHTML();
  showNotas();
  form.reset();
  form.querySelector('button[type="submit"]').textContent = "Agregar";
  edited = false;
}

function deleteNota(titulo) 
{
    listaNotas = listaNotas.filter((nota) => nota.titulo !== titulo);
    refreshHTML();
    showNotas();
}
  
function createNota() 
{
    listaNotas.push({ ...ObjetoNota });
    showNotas();
    form.reset();
    cleanObj();
}

function cleanObj() 
{
    ObjetoNota.fecha = "";
    ObjetoNota.titulo = "";
    ObjetoNota.texto = "";
}

function showNotas() {
  refreshHTML();
  const divNotas = document.querySelector(".div-notas");

  listaNotas.forEach((nota) => {
    const { fecha, titulo, texto } = nota;

    const parrafo = document.createElement("p");
    parrafo.textContent = `${fecha} - ${titulo} - ${texto} - `;
    parrafo.dataset.id = fecha;

    const editarBoton = document.createElement("button");
    editarBoton.onclick = () => cargarNota(nota);
    editarBoton.textContent = "Editar";
    editarBoton.classList.add("boton", "boton-editar");
    parrafo.append(editarBoton);

    const eliminarBoton = document.createElement("button");
    eliminarBoton.onclick = () => deleteNota(titulo);
    eliminarBoton.textContent = "Eliminar";
    eliminarBoton.classList.add("boton", "boton-eliminar");
    parrafo.append(eliminarBoton);

    const hr = document.createElement("hr");
    divNotas.appendChild(parrafo);
    divNotas.appendChild(hr);
  });
}

function refreshHTML() {
  const divNotas = document.querySelector(".div-notas");
  while (divNotas.firstChild) {
    divNotas.removeChild(divNotas.firstChild);
  }
}

function cargarNota(nota) 
{
  const { fecha, titulo, texto } = nota;
  InsertTittle.value = titulo;
  InsertText.value = texto;
  ObjetoNota.fecha = fecha;
  form.querySelector('button[type="submit"]').textContent = "Actualizar";
  edited = true;
}