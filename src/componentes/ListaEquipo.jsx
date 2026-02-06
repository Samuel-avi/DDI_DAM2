// Lista del once titular con botón de borrado individual
export default function ListaEquipo({ equipo, borrarJugador }) {
  return (
    <ul>
      {equipo.map((j, i) => (
        <li key={i}>
          {j.nombre}
          <span className="pos">{j.pos}</span>
          <button onClick={() => borrarJugador(i)}>Borrar</button>
        </li>
      ))}
    </ul>
  );
}
