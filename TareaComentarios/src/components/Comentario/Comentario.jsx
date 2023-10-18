import React, { useState } from 'react';
import './Comentario.css';

function Comentario(props) {
  const [editedUsuario, setEditedUsuario] = useState(props.Usuario);
  const [editedComentario, setEditedComentario] = useState(props.Comentario);

  const handleEliminarClick = () => {
    if (props.onDelete) {
      props.onDelete();
    }
  };

  const handleEditClick = () => {
    if (props.onEdit) {
      props.onEdit(props.id, { Usuario: editedUsuario, Comentario: editedComentario });
      props.setEditingComment(null); 
    }
  };

  return (
    <div className='DivComentario1'>
      <div className='DivName'>
        {props.editingComment === props.id ? (
          <input
            type="text"
            value={editedUsuario}
            onChange={(e) => setEditedUsuario(e.target.value)}
          />
        ) : (
          <h2>Usuario: {props.Usuario}</h2>
        )}
      </div>
      <div className='DivComentario2'>
        {props.editingComment === props.id ? (
          <textarea
            value={editedComentario}
            onChange={(e) => setEditedComentario(e.target.value)}
          />
        ) : (
          <p>{props.Comentario}</p>
        )}
      </div>
      <div className='DivBotones'>
        {props.editingComment === props.id ? (
          <button onClick={handleEditClick}>Guardar</button>
        ) : (
          <button onClick={() => props.setEditingComment(props.id)}>Editar</button>
        )}
        <button onClick={handleEliminarClick}>Eliminar</button>
      </div>
    </div>
  );
}

export default Comentario;
