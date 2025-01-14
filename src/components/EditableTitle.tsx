import React, { useState } from "react";

const EditableTitle = () => {
  const [title, setTitle] = useState("Notas de la semana");
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false); // Salir del modo edición al presionar Enter
    }
  };

  return (
    <div className="calendar__title__text">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)} // Salir del modo edición al perder el foco
          className="border border-gray-300 rounded px-2 py-1 w-full"
          autoFocus
        />
      ) : (
        <h2
          onClick={() => setIsEditing(true)} // Entrar al modo edición al hacer clic
          className="cursor-pointer"
        >
          {title}
        </h2>
      )}
    </div>
  );
};

export default EditableTitle;
