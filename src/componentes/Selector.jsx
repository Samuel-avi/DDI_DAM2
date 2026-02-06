import { jugadoresPorPos } from "../data";

// Selector de posición + jugador + botones de acción
export default function Selector({
  posSeleccionada,
  setPosSeleccionada,
  jugadorSeleccionado,
  setJugadorSeleccionado,
  añadirJugador,
  ordenarEquipo,
  reset
}) {
  return (
    <div className="fila">
      <label>Posición:</label>

      {/* Select de posición */}
      <select
        value={posSeleccionada}
        onChange={(e) => {
          setPosSeleccionada(e.target.value);
          setJugadorSeleccionado(jugadoresPorPos[e.target.value][0]);
        }}
      >
        <option value="POR">PORTERO</option>
        <option value="DEF">DEFENSA</option>
        <option value="MC">MEDIO CAMPISTA</option>
        <option value="DEL">DELANTERO</option>
      </select>

      <label>Jugador:</label>

      {/* Select dinámico según posición */}
      <select
        value={jugadorSeleccionado}
        onChange={(e) => setJugadorSeleccionado(e.target.value)}
      >
        {jugadoresPorPos[posSeleccionada].map(j => (
          <option key={j} value={j}>{j}</option>
        ))}
      </select>

      <button onClick={añadirJugador}>Añadir</button>
      <button onClick={ordenarEquipo}>Ordenar</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
