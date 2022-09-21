import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import "./App.css";
import { Departamento } from "./Departamento";
import { Empleados } from "./Empleados";
function App() {
  return (
    <BrowserRouter>
      <div className='App container'>
        <h3 className="d-flex justify-content-center m-3">Hola</h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul
            className="navbar-nav"
          >
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/empleado">Empleados</NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/departamento">Departamento</NavLink>
            </li>
          </ul>
        </nav>


        <Routes>
          <Route path="/empleado" element={<Empleados />} />
          <Route path="/departamento" element={<Departamento />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
