const malla = {
  "1º Semestre": [
    { id: "IMA1101", nombre: "CÁLCULO 1" },
    { id: "IMA1102", nombre: "ÁLGEBRA" },
    { id: "IMA1118", nombre: "GEOMETRÍA ANALÍTICA Y VECTORIAL" }
  ],
  "2º Semestre": [
    { id: "IMA1201", nombre: "CÁLCULO 2", prereq: ["IMA1101"] },
    { id: "IMA1202", nombre: "ÁLGEBRA LINEAL 1", prereq: ["IMA1102", "IMA1118"] },
    { id: "IMA1203", nombre: "PROGRAMACIÓN" }
  ],
  "3º Semestre": [
    { id: "IMA1119", nombre: "CÁLCULO 3", prereq: ["IMA1201"] },
    { id: "IMA1303", nombre: "MÉTODOS NUMÉRICOS Y E.D.", prereq: ["IMA1201", "IMA1203"] },
    { id: "IMA1305", nombre: "TEORÍA DE NÚMEROS", prereq: ["IMA1102"] },
    { id: "LCL122", nombre: "ESTRATEGIAS DISCURSIVAS" }
  ],
  "4º Semestre": [
    { id: "EPE1320", nombre: "EDUCAR EN Y PARA LA DIVERSIDAD" },
    { id: "IMA1405", nombre: "ANÁLISIS REAL", prereq: ["IMA1119"] },
    { id: "IMA1406", nombre: "ESTRUCTURAS ALGEBRAICAS 1", prereq: ["IMA1305"] },
    { id: "PRA101-33", nombre: "PRÁCTICA DOCENTE INICIAL" },
    { id: "PSI331", nombre: "TALLER DE APRENDIZAJE ADOLESCENTE" }
  ],
  "5º Semestre": [
    { id: "EST159", nombre: "ESTADÍSTICA 1", prereq: ["IMA1201"] },
    { id: "IMA1504", nombre: "DIDÁCTICA DEL CÁLCULO", prereq: ["IMA1405"] },
    { id: "IMA1505", nombre: "DIDÁCTICA DE LOS SISTEMAS NUMÉRICOS", prereq: ["IMA1406"] },
    { id: "IMA1506", nombre: "GEOMETRÍA EUCLIDIANA PLANA" }
  ],
  "6º Semestre": [
    { id: "EPE1118", nombre: "FUNDAMENTOS FILOSÓFICOS", prereq: ["PRA101-33"] },
    { id: "IMA1605", nombre: "DIDÁCTICA DE LA ESTADÍSTICA", prereq: ["EST159"] },
    { id: "IMA1606", nombre: "GEOMETRÍA 3D Y NO EUCLIDIANA", prereq: ["IMA1506"] },
    { id: "IMA1607", nombre: "PRÁCTICA COMUNITARIA", prereq: ["PSI331", "PRA101-33", "EPE1320", "IMA1505"] },
    { id: "ING9001", nombre: "INGLÉS 1" },
    { id: "PSI275", nombre: "PSICOLOGÍA SOCIAL ESCOLAR" }
  ],
  "7º Semestre": [
    { id: "EPE1303", nombre: "PLANIFICACIÓN CURRICULAR" },
    { id: "EPE1400", nombre: "POLÍTICAS EDUCATIVAS" },
    { id: "EST169", nombre: "ESTADÍSTICA 2", prereq: ["EST159"] },
    { id: "IMA1701", nombre: "DIDÁCTICA DE LA GEOMETRÍA", prereq: ["IMA1606", "IMA1504"] },
    { id: "ING9002", nombre: "INGLÉS 2", prereq: ["ING9001"] },
    { id: "LCL465", nombre: "ESTRATEGIAS PARA COMUNICAR", prereq: ["LCL122"] }
  ],
  "8º Semestre": [
    { id: "EPE1302", nombre: "EVALUACIÓN PARA EL APRENDIZAJE", prereq: ["EPE1303"] },
    { id: "IMA1801", nombre: "DIDÁCTICA DE LA PROBABILIDAD", prereq: ["EST169", "IMA1605"] },
    { id: "IMA1802", nombre: "TECNOLOGÍAS EN MATEMÁTICA", prereq: ["IMA1303", "IMA1203", "IMA1701"] },
    { id: "ING9003", nombre: "INGLÉS 3", prereq: ["ING9002"] },
    { id: "PRA301-33", nombre: "PRÁCTICA DOCENTE INTERMEDIA", prereq: ["PSI331", "IMA1505", "PRA101-33", "EPE1303", "IMA1701"] }
  ],
  "9º Semestre": [
    { id: "EPE1130", nombre: "IDENTIDAD DOCENTE", prereq: ["PRA301-33"] },
    { id: "IMA1901", nombre: "HISTORIA DE LA MATEMÁTICA", prereq: ["PRA301-33"] },
    { id: "IMA1902", nombre: "INVESTIGACIÓN EN DIDÁCTICA", prereq: ["LCL465", "PRA301-33", "IMA1801"] },
    { id: "IMA1903", nombre: "TRABAJO DE TÍTULO", prereq: ["IMA1801", "IMA1802", "PRA301-33"] },
    { id: "ING9004", nombre: "INGLÉS 4", prereq: ["ING9003"] }
  ],
  "10º Semestre": [
    { id: "PRA601-33", nombre: "PRÁCTICA DOCENTE FINAL", prereq: ["PRA301-33", "EPE1302", "EPE1130", "IMA1607", "IMA1903", "IMA1902", "IMA1901"] }
  ]
};

const aprobados = JSON.parse(localStorage.getItem('aprobados')) || [];
const contenedor = document.getElementById("malla");

function render() {
  contenedor.innerHTML = "";
  for (let semestre in malla) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    const titulo = document.createElement("h3");
    titulo.innerText = semestre;
    columna.appendChild(titulo);

    malla[semestre].forEach(ramo => {
      const btn = document.createElement("button");
      btn.className = "ramo";
      btn.innerText = ramo.nombre;
      btn.id = ramo.id;

      const requisitos = ramo.prereq || [];
      const cumplidos = requisitos.every(id => aprobados.includes(id));

      if (aprobados.includes(ramo.id)) {
        btn.classList.add("aprobado");
      } else if (!cumplidos && requisitos.length > 0) {
        btn.classList.add("bloqueado");
        btn.disabled = true;
      }

      btn.addEventListener("click", () => {
        if (!btn.classList.contains("bloqueado")) {
          if (aprobados.includes(ramo.id)) {
            aprobados.splice(aprobados.indexOf(ramo.id), 1);
          } else {
            aprobados.push(ramo.id);
          }
          localStorage.setItem('aprobados', JSON.stringify(aprobados));
          render();
        }
      });

      columna.appendChild(btn);
    });

    contenedor.appendChild(columna);
  }
}

document.getElementById("reset").addEventListener("click", () => {
  localStorage.removeItem('aprobados');
  render();
});

render();
