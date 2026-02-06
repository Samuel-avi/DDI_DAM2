// Muestra contadores y validaciones del equipo
export default function Resumen({ equipo, contar, cumpleMinimos, equipoValido }) {
  return (
    <>
      <p>Jugadores: <b>{equipo.length}</b> / 11</p>
      <p>POR: {contar("POR")} | DEF: {contar("DEF")} | MC: {contar("MC")} | DEL: {contar("DEL")}</p>
      <p>Mínimos: {cumpleMinimos() ? <span className="ok">OK</span> : <span className="bad">NO</span>}</p>
      <p>Equipo válido: {equipoValido() ? <span className="ok">SÍ</span> : <span className="bad">NO</span>}</p>
    </>
  );
}
