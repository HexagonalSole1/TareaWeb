import '../css/App.css';
import React, { useState, useRef, useEffect } from 'react';

const palabras = [
  'apple', 'table', 'chair', 'water', 'ocean', 'music', 'happy', 'hello',
  'world', 'peace', 'dream', 'smile', 'black', 'white', 'earth', 'plant',
  'lemon', 'cloud', 'magic'
];



function App() {

  const [inputs, setInputs] = useState(['', '', '', '', '']);
  const inputRefs = inputs.map(() => useRef(null));

  const [correctas, setCorrectas] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intentos, setIntentos] = useState(0);


  const [PalabraDesordenada,setPalabraDesordenada] =useState(desordenarPalabra(currentWord)
  ) 
  function desordenarPalabra(Palabra) {
    const palabraDesordenada = Palabra.split("").sort(() => Math.random() - 0.5).join("");
    return palabraDesordenada;
  }
 

  const handleInputChange = (e, currentIndex) => {
    const value = e.target.value;
  


    if (value.length === 1 && value.match(/[a-zA-Z]/)) {
      const newInputs = [...inputs];
      newInputs[currentIndex] = value;
      setInputs(newInputs);
      inputRefs[currentIndex].current.disabled = true;

      if (value.toLowerCase() !== currentWord[currentIndex]) {
        // Incrementar el contador de intentos solo cuando te equivocas de letra
        setIntentos(intentos + 1);
        if(intentos>4){resetGame2()}

      }

      if (currentIndex === 4) {
        const fullInput = newInputs.join('');
        if (fullInput === currentWord) {
          if (correctas + 1 <= palabras.length) {
            setCorrectas(correctas + 1);
          }
          resetGame();
        } else {
          setCurrentIndex(0);
          inputRefs.forEach((ref) => {
            ref.current.disabled = false;
          });
        }
      } else {
        setCurrentIndex(currentIndex + 1);
        inputRefs[currentIndex + 1].current.focus();
      }
    }
  };

  const resetGame = () => {
    const newInputs = inputs.map(() => '');
    setInputs(newInputs);
    inputRefs.forEach((ref) => {
      ref.current.disabled = false;
    });
    setCurrentIndex(0);

    const newWord = palabras[Math.floor(Math.random() * palabras.length)];
    setCurrentWord(newWord);
    inputRefs[0].current.focus();

  };
  const resetGame2 = () => {
    setCorrectas(0);
    setIntentos(0);
    const newInputs = inputs.map(() => '');
    setInputs(newInputs);
    inputRefs.forEach((ref) => {
      ref.current.disabled = false;
    });
    setCurrentIndex(0);

    const newWord = palabras[Math.floor(Math.random() * palabras.length)];
    setCurrentWord(newWord);
    inputRefs[0].current.focus();


  };

  const clearInputs = () => {
    const newInputs = inputs.map(() => '');
    setInputs(newInputs);
    inputRefs.forEach((ref) => {
      ref.current.value = '';
      ref.current.disabled = false;
    });
    inputRefs[0].current.focus();
  };

  useEffect(() => {
    resetGame();
    inputRefs[0].current.focus();
   


  }, [correctas]);

  return (
    <>
      <div className='DivContainer'>
        <div className='DivJuego'>
          <div className='Titulo'>
            <h1>Words Game</h1>
          </div>
          <div className='DivPalabra'>
            <h2>Palabra: {PalabraDesordenada}</h2>
          </div>

          <div className='DivInputs'>
            {inputs.map((input, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                value={input}
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </div>
          <div className='DivInfo'>
            <h3>Correctas: {correctas}</h3>
            <p>Intentos: {intentos}/5</p>
            {correctas > 7 && <h1 style={{ color: 'green' }}>¡Tienes 7 respuestas ganaste!</h1>}

            {intentos >= 5 && <h1 style={{ color: 'red' }}>Has superado el límite de intentos</h1>}
          </div>

          <div className='DivBotonesJuego'>
            <button onClick={resetGame2}>
              Reset
            </button>
            <button onClick={clearInputs}>
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
