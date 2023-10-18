import React, { useState } from 'react';
import Comentario from '../components/Comentario/Comentario';
import '../css/App.css';

function App() {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({
    Usuario: '',
    Comentario: '',
  });
  const [commentIdCounter, setCommentIdCounter] = useState(1);
  const [editingComment, setEditingComment] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoComentario({ ...nuevoComentario, [name]: value });
  };

  const agregarComentario = () => {
    const commentWithId = { ...nuevoComentario, id: commentIdCounter };


    if (nuevoComentario.Usuario == "" || nuevoComentario.Comentario == "") {

    }
    else {
      setCommentIdCounter(commentIdCounter + 1);

      setComentarios([...comentarios, commentWithId]);

      setNuevoComentario({ Usuario: '', Comentario: '' });

    }

  };

  const eliminarComentario = (id) => {
    const updatedComments = comentarios.filter((comment) => comment.id !== id);
    setComentarios(updatedComments);
  };

  const editarComentario = (id, updatedComment) => {
    const updatedComments = comentarios.map((comment) =>
      comment.id === id ? { ...comment, ...updatedComment } : comment
    );
    setComentarios(updatedComments);
    setEditingComment(null);
  };

  return (
    <>
      <div className="DivContainer">

        <div className="DivCards">
          {comentarios.map((comentario) => (
            <Comentario
              key={comentario.id}
              Usuario={comentario.Usuario}
              Comentario={comentario.Comentario}
              id={comentario.id}
              onDelete={() => eliminarComentario(comentario.id)}
              onEdit={editarComentario}
              editingComment={editingComment}
              setEditingComment={setEditingComment}
            />
          ))}
        </div>

        <div className="DivForm">
          <div className="Divform1">
            <h2>UserName</h2>
            <input
              type="text"
              className="InputUser"
              name="Usuario"
              value={nuevoComentario.Usuario}
              onChange={handleInputChange}
            />
            <h2>Tira tu comentario sin miedo a la funa</h2>

            <textarea
              name="Comentario"
              rows="10"
              cols="40"
              className="TextAreaComment"
              placeholder="Escribe aquí tu comentario"
              value={nuevoComentario.Comentario}
              onChange={handleInputChange}
            ></textarea>
            <button onClick={agregarComentario}>Agregar Comentario</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
