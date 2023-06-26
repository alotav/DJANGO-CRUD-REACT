// link funciona como una etiqueta <a> pero sin refrescar la pagina
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex justify-between py-3">
      <Link to="/tasks">
        <h1 className="font-bold text-3x1 mb-4">Task App</h1>
      </Link>
      <button className="bg-indigo-500 px-3 py-2 rounded-lg">
        <Link to="/create-task">Create task</Link>
      </button>
    </div>
  );
}
