import React, { useState, useEffect } from 'react';

function Timer() {
  // Estados para milisegundos, segundos, minutos y horas
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  // Estado para controlar si el temporizador está corriendo o pausado
  const [isRunning, setIsRunning] = useState(false);

  // Función que se ejecuta cada 100ms (para manejar los milisegundos)
  useEffect(() => {
    let timer;

    // Si el temporizador está en marcha, crear el intervalo
    if (isRunning) {
      timer = setInterval(() => {
        setMilliseconds((prev) => {
            if (prev === 99) {
                setSeconds((sec) => {
                  if (sec === 59) {
                    setMinutes((min) => {
                      if (min === 59) {
                        setHours((hr) => {
                          // Incrementar las horas
                          return hr + 1;
                        });
                        // Reiniciar los minutos
                        return 0;
                      }
              
                      // Incrementar los minutos
                      return min + 1;
                    });
                    // Reiniciar los segundos
                    return 0;
                  }
              
                  // Incrementar los segundos
                  return sec + 1;
                });
              
                // Reiniciar los milisegundos
                return 0;
              }
              
              // Incrementar milisegundos
              return prev + 1;
              
        });
      }, 10); // Cada 10 ms actualiza los milisegundos
    } else {
      // Limpiar el intervalo si no está corriendo
      clearInterval(timer);
    }

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, [isRunning]);

  // Función para dar formato a los números con ceros al principio
  const formatTime = (time) => {
    return time.toString().padStart(2, '0');  // Asegura que siempre tenga 2 dígitos
  };

  // Función para alternar el estado de "isRunning" (pausar o reanudar)
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  // Función para reiniciar el temporizador
  const resetTimer = () => {
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h1>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}:{formatTime(milliseconds)}
      </h1>
      <div>
        {/* Botón para pausar o reanudar */}
        <button onClick={toggleTimer}>
          {isRunning ? 'Pause' : 'Play'}
        </button>
        {/* Botón para reiniciar */}
        <button onClick={resetTimer}>Reiniciar</button>
      </div>
    </div>
  );
}

export default Timer;
