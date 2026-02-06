import { useState } from "react";
import { jugadoresPorPos, min, max } from "./data";
import Selector from "./componentes/Selector";
import ListaEquipo from "./componentes/ListaEquipo";
import Resumen from "./componentes/Resumen";
import "./styles.css";

export default function App() {
  // ------------------
  // ESTADO PRINCIPAL
  // ------------------
  const [posSeleccionada, setPosSeleccionada] = useState("POR");
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(
    jugadoresPorPos.POR[0]
  );
  const [equipo, setEquipo] = useState([]); // [{ nombre, pos }]
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("ok"); // ok | bad

  // ------------------
  // FUNCIONES DE APOYO
  // ------------------
  const contar = (pos) => equipo.filter((j) => j.pos === pos).length;

  const cumpleMinimos = () =>
    contar("POR") >= min.POR &&
    contar("DEF") >= min.DEF &&
    contar("MC") >= min.MC &&
    contar("DEL") >= min.DEL;

  const equipoValido = () => equipo.length === 11 && cumpleMinimos();

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);
  };

  // ------------------
  // ACCIONES
  // ------------------
  const añadirJugador = () => {
    mostrarMensaje("", "ok");

    if (equipo.length >= 11)
      return mostrarMensaje("No puedes pasar de 11 jugadores.", "bad");

    if (equipo.some((j) => j.nombre === jugadorSeleccionado))
      return mostrarMensaje("Ese jugador ya está en el equipo.", "bad");

    if (contar(posSeleccionada) >= max[posSeleccionada])
      return mostrarMensaje("Máximo en esa posición.", "bad");

    setEquipo([
      ...equipo,
      { nombre: jugadorSeleccionado, pos: posSeleccionada },
    ]);
  };

  const borrarJugador = (index) => {
    setEquipo(equipo.filter((_, i) => i !== index));
    mostrarMensaje("", "ok");
  };

  const ordenarEquipo = () => {
    const ordenPos = { POR: 0, DEF: 1, MC: 2, DEL: 3 };

    const copia = [...equipo].sort((a, b) => {
      if (ordenPos[a.pos] !== ordenPos[b.pos]) {
        return ordenPos[a.pos] - ordenPos[b.pos];
      }
      return a.nombre.localeCompare(b.nombre);
    });

    setEquipo(copia);
  };

  const reset = () => {
    setEquipo([]);
    mostrarMensaje("", "ok");
  };

  const confirmar = () => {
    if (!equipoValido())
      return mostrarMensaje("No se cumplen todas las reglas.", "bad");

    mostrarMensaje("Alineación confirmada", "ok");
  };

  // ------------------
  // RENDER
  // ------------------
  return (
    <div className="caja">
      <h1>España Once Titular</h1>

      <Selector
        posSeleccionada={posSeleccionada}
        setPosSeleccionada={setPosSeleccionada}
        jugadorSeleccionado={jugadorSeleccionado}
        setJugadorSeleccionado={setJugadorSeleccionado}
        añadirJugador={añadirJugador}
        ordenarEquipo={ordenarEquipo}
        reset={reset}
      />

      <h3>Convocados</h3>
      <ListaEquipo equipo={equipo} borrarJugador={borrarJugador} />

      <h3>Resumen</h3>
      <Resumen
        equipo={equipo}
        contar={contar}
        cumpleMinimos={cumpleMinimos}
        equipoValido={equipoValido}
      />

      <div id="msg" className={tipoMensaje}>
        {mensaje}
      </div>

      <button onClick={confirmar} disabled={!equipoValido()}>
        Confirmar
      </button>
    </div>
  );
}
