import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {



  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

 
  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //use Effect para realizar ciertas operaciones cuando el state cambia

  useEffect(() => {
    localStorage.setItem( 'citas', JSON.stringify( citas ) );

    // al momento de hacer uso de useEffect recordar siempre pasar un [] arreglo vacio
    // porque de lo contrario siempre se estaria ejecutando
// eslint-disable-next-line react-hooks/exhaustive-deps
    // Cada ves que se realice un cambio en el stateel useEffect se actualiza
  }, [citas, citasIniciales] );



  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
     guardarCitas([ ...citas, cita])
     console.log(citas);
  };

  // Funciona Eliminar Citas
    const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id );
    guardarCitas(nuevasCitas);

  }

  // Mnesaje condicional
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';
    
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario
                crearCita={crearCita}
               
              />
          </div>
          <div className="one-half column">
                <h2>{titulo}</h2>
                
                {citas.map(cita => (
                  <Cita 
                    key={cita.id}
                    cita= {cita}
                    eliminarCita={eliminarCita}
                  />
                ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
