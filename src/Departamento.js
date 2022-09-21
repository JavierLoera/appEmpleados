import React, { useEffect, useState } from 'react';
import { variables } from './variables';


const initialValues = {
    modalName: '',
    nombre: '',
    tipo: '',
    id: ''
}
export const Departamento = () => {

    const [departamentos, setDepartamentos] = useState([])
    const [tablaDepartamentos, setTablaDepartamentos] = useState([])
    const [departamentoData, setDepartamentoData] = useState(initialValues)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState("")


    const peticion = async () => {
        await fetch(variables.API_URL + 'departamentos')
            .then(res => res.json()).then(data => {
                setDepartamentos(data)
                setTablaDepartamentos(data)
            })

    }

    useEffect(() => {
        peticion()
    }, [])


    useEffect(() => {
        console.log(tablaDepartamentos)
        console.log(departamentos);

    }, [filter])


    const filterData = (busqueda) => {
        var filteredData = tablaDepartamentos.filter(el => {
            return el.nombre.trim().toLowerCase().includes(busqueda.toString().trim().toLowerCase())
        })
        setDepartamentos(filteredData)
    }
    const handleChangeFilterNombre = (e) => {
        setFilter(e.target.value);
        filterData(e.target.value);
    }



    const handleChange = (e) => {
        setError('')
        const { name, value } = e.target
        setDepartamentoData({ ...departamentoData, [name]: value })
    }

    const handleClickNew = () => {
        setDepartamentoData({ ...departamentoData, modalName: "Agregar departamento", tipo: "agregar" })

    }

    const hanldeClickEdit = (elem) => {
        setDepartamentoData({ ...departamentoData, nombre: elem.nombre, modalName: "Editar Departamento", tipo: "editar", id: elem.DepartamentoId })

    }

    const cerrarModal = () => {
        const modal = document.getElementById('exampleModal')
        modal.classList.remove("show", 'd-block');
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
    }


    const handleSubmit = () => {
        if (departamentoData.nombre == '') {
            setError("Todos los campos deben de llenarse")
            return
        } else {
            fetch(variables.API_URL + 'departamentos', {
                method: "POST",
                body: JSON.stringify(departamentoData),
                headers: { "Content-type": "application/json;charset=UTF-8" }
            }).then(response => response.json())
                .then(json => alert(json))
                .catch(err => alert(err));
            setDepartamentoData(initialValues)
            // cerrarModal()

        }
    }



    const handleSubmitEdit = () => {
        if (departamentoData.nombre == '') {
            setError("Todos los campos deben de llenarse")
            return
        } else {
            fetch(variables.API_URL + `departamentos/${departamentoData.id}`, {
                method: "PUT",
                body: JSON.stringify(departamentoData),
                headers: { "Content-type": "application/json;charset=UTF-8" }
            }).then(response => response.json())
                .then(json => alert(json))
                .catch(err => alert(err));
            setDepartamentoData(initialValues)
            cerrarModal()
        }
    }


    const hanldeClickDelete = (elem) => {
        let resultado = window.confirm("seguro que quieres eliminar este departamentos")
        if (resultado === true) {
            fetch(variables.API_URL + `departamentos/${elem.DepartamentoId}`, {
                method: "DELETE",
            }).then(response => response.json())
                .then(json => alert(json))
                .catch(err => alert(err));
            setDepartamentoData(initialValues)
        } else {
            return
        }
    }

    return (
        <div>
            <button onClick={handleClickNew} type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar Departamento</button>
            <div className="d-flex flex-row">
                <input className="form-control m-2"
                    onChange={(e) => handleChangeFilterNombre(e)}
                    placeholder="busqueda por departamento"
                    value={filter}
                />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID Departamento</th>
                        <th scope="col">Nombre Departamento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {departamentos.map((elem) => {
                        return (
                            <tr key={elem.DepartamentoId}>
                                <td>{elem.DepartamentoId}</td>
                                <td>{elem.nombre}</td>
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
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{departamentoData.modalName}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Departamento:</label>
                                    <input style={{ borderColor: error ? 'red' : '' }} onChange={(e) => handleChange(e)} value={departamentoData.nombre} name="nombre" className="form-control" id="message-text" />
                                    {error && <label className="d-lg-block text-danger">{JSON.stringify(error)}</label>}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            {departamentoData.tipo === "agregar" ?
                                <button onClick={handleSubmit} className="btn-close" data-bs-dismiss="modal" aria-label="Close" type="button" id="btnSave" >Agregar</button>
                                :
                                <button onClick={handleSubmitEdit} type="button" className="btn btn-primary">Editar</button>
                            }
                        </div>
                    </div>
                </div>
            </div >

        </div >
    )
}
