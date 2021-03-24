import React, {Fragment, useState} from 'react';
import uuid from 'react-uuid';


const Formulario = ({crearCita}) =>{

    //Crear state de Citas pero es un objeto
    const[cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    //Creamos este State  para mostrar los errores del formulario
    const  [error,actualizarError] = useState(false);

    // Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState = e =>{
        actualizarCita({
            // con los 3 puntos tomamos una copia del arreglo para que no se eliminen
            // los datos al momento de ir escribiendo en cada campo
            ...cita,
            [e.target.name] : e.target.value

        })
    }

    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas } = cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = e => {
        //prevenir la opcion por defecto
        e.preventDefault();

        //Validar

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
         || hora.trim() === '' || sintomas.trim() === ''  ){
            actualizarError(true);
            return;

        }

        //Eliminar el mensaje previo
        actualizarError(false);

        //Asignar un ID
        cita.id = uuid();

        //Crear la cita
        crearCita(cita);
        //Reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }
    return (
        <Fragment>

            <h2>Crear Cita</h2>
           { /*  En este lugar lo que hacemos es un ternario para mostrar
           un p donde notifica al usuario que todos los campos son obligatorios
           Hacemos uso del State ERROR linea ( 15 )

           */ }

             { error
              ?
                <p className="alerta-error">Todos los campos son Obligatorios</p>
              :
                 null }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    /*onChange no sirve para que en todo momento este escuchando los cambios
                    que se realicen en los input para que la funcion pueda ir guardando esos
                    datos en memoria
                    */
                    onChange={actualizarState}
                    value={mascota}

                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={propietario}

                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}

                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}

                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}

                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"

                >Agregar Cita</button>
            </form>


        </Fragment>
    );
}


export  default Formulario;