import React, { useEffect, useState } from 'react';
import avatar from "./images/avatar.png";
import { variables } from './variables';

const initialValues = {
  modalName: '',
  nombre: '',
  tipo: '',
  id: '',
  departamento: undefined,
  fechaDeIngreso: undefined,
  nombreFoto: '',
  photoPath: variables.PHOTO_URL
}
export const Empleados = () => {
  const [departamentos, setDepartamentos] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [empleadosData, setEmpleadosData] = useState(initialValues)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(variables.API_URL + 'departamentos')
      .then(res => res.json()).then(data => setDepartamentos(data))
  }, [departamentos])

  useEffect(() => {
    fetch(variables.API_URL + 'empleados')
      .then(res => res.json()).then(data => setEmpleados(data))
  }, [empleados])

  const cerrarModal = () => {
    const modal = document.getElementById('exampleModal')
    modal.classList.remove("show", 'd-block');
    modal.style.display = "none"
    document.querySelectorAll(".modal-backdrop")
      .forEach(el => el.classList.remove("modal-backdrop"));
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setEmpleadosData({ ...empleadosData, [name]: value })
    setError('')
  }


  const handleClickNew = () => {
    setEmpleadosData({ ...empleadosData, modalName: "Agregar Empleado", tipo: "agregar" })
  }

  const hanldeClickEdit = (elem) => {
    setEmpleadosData({ ...empleadosData, nombre: elem.nombre, modalName: "Editar Empleado", tipo: "editar", id: elem.EmpleadoId, departamento: elem.departamento, fechaDeIngreso: elem.fechaDeIngreso, nombreFoto: elem.nombreFoto })

  }


  const handleSubmit = () => {
    if (empleadosData.nombre == undefined || empleadosData.departamento == undefined || empleadosData.fechaDeIngreso == undefined) {
      setError("Todos los campos deben de llenarse")
      return
    } else {
      fetch(variables.API_URL + 'empleados', {
        method: "POST",
        body: JSON.stringify(empleadosData),
        headers: { "Content-type": "application/json;charset=UTF-8" }
      }).then(response => response.json())
        .then(json => alert(json)).then(setEmpleadosData(initialValues))
        .catch(err => alert(err));
      setError("")
      cerrarModal()
    }
  }



  const handleSubmitEdit = () => {
    if (empleadosData.nombre == undefined || empleadosData.departamento == undefined || empleadosData.fechaDeIngreso == undefined) {
      setError("Todos los campos deben de llenarse")
      return
    } else {
      fetch(variables.API_URL + `empleados/${empleadosData.id}`, {
        method: "PUT",
        body: JSON.stringify(empleadosData),
        headers: { "Content-type": "application/json;charset=UTF-8" }
      }).then(response => response.json())
        .then(json => alert(json))
        .catch(err => alert(err));
      setEmpleadosData(initialValues)
      cerrarModal()
    }
  }


  const hanldeClickDelete = (elem) => {
    let resultado = window.confirm("seguro que quieres eliminar este Empleado?")
    if (resultado === true) {
      fetch(variables.API_URL + `empleados/${elem.EmpleadoId}`, {
        method: "DELETE",
      }).then(response => response.json())
        .then(json => alert(json))
        .catch(err => alert(err));
      setEmpleadosData(initialValues)
    } else {
      return
    }
  }

  const imageUpload = (e) => {
    e.preventDefault();
    setError('')

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + 'empleados/save', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setEmpleadosData({ ...empleadosData, nombreFoto: data });
      }).catch(err => {
        alert(err)
      })
  }

  return (
    <div>
      <button onClick={handleClickNew} type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar Empleado</button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID Empleado</th>
            <th scope="col">Nombre</th>
            <th scope="col">Departamento</th>
            <th scope="col">fecha De Ingreso</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((elem) => {
            let date = new Date(elem.FechaDeIngreso)
            return (
              <tr key={elem.EmpleadoId}>
                <td>{elem.EmpleadoId}</td>
                <td>{elem.nombre}</td>
                <td>{elem.departamento}</td>
                <td>{date.toISOString().split('T')[0]}</td>
                <td>
                  <button onClick={() => hanldeClickEdit(elem)} className='btn' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                  </button>
                  <button onClick={() => hanldeClickDelete(elem)} className='btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </button>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{empleadosData.modalName}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" >
              <form id="form-modal" className='d-flex flex-row bd-highlight mb-3'>
                <div className="p-2 w-50 bd-highlight">
                  <div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon3"> Nombre</span>
                      <input style={{ borderColor: error ? 'red' : '' }} required value={empleadosData.nombre} onChange={(e) => handleChange(e)} name="nombre" type="text" className="form-control w-75" id="basic-url" aria-describedby="basic-addon3" />
                      {error && <label className="d-lg-block text-danger">{JSON.stringify(error)}</label>}
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon3">Departamento</span>
                      <select style={{ borderColor: error ? 'red' : '' }} required defaultValue={"Finanzas"} onChange={(e) => handleChange(e)} name="departamento" className="form-select" id="inputGroupSelect01">
                        {departamentos.map((option) => (
                          <option key={option.DepartamentoId} value={option.nombre}>{option.nombre}</option>
                        ))}
                      </select>
                    </div>
                    <label htmlFor="basic-url" className="form-label">Fecha Union</label>
                    <div className="input-group mb-3">
                      <input style={{ borderColor: error ? 'red' : '' }} required onChange={(e) => handleChange(e)} name="fechaDeIngreso" type="date" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                    </div>

                  </div>
                </div>
                <div className="w-50 bd-highlight">

                  <img className='mx-auto d-block' width="300px" height="300px"
                    src={empleadosData.nombreFoto ? empleadosData.photoPath + empleadosData.nombreFoto : avatar} />
                  <div className="input-group mb-3">
                    <input style={{ borderColor: error ? 'red' : '' }} required className="form-control m-2" onChange={(e) => imageUpload(e)} type="file" />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              {empleadosData.tipo === "agregar" ?
                <button onClick={handleSubmit} type="button" id="btnSave" className="btn btn-primary">Agregar</button>
                :
                <button onClick={handleSubmitEdit} type="button" id="btnSave" className="btn btn-primary">Editar</button>
              }
            </div>
          </div>
        </div>
      </div >

    </div >
  )
}
