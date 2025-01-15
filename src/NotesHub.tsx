import React, { useEffect, useState } from "react";
import { listNotes } from './Scripts/listNotes'

import './NotesHub.css'
import './css/iconsAnimated.css'

import { Notes } from "./components/Notes";
import { CardModal } from "./components/CardModal";

import type { ScheduleBox as ScheduleBoxType } from './types/schedule';
import { storage } from "./utils/storage";
import { ScheduleForm } from "./components/ScheduleForm";
import { ConfigMenu } from "./components/ConfigMenu";
import { ConfigButton } from "./components/ConfigButton";
import { theme } from "./css/theme";
import { Columns3, Grid3x3, Rows3 } from "lucide-react";
import EditableTitle from "./components/EditableTitle";
import SearchBar from "./components/SearchBar ";

function NotesHub() {

  const stateNotes: StateNotesProps = {
    box: 'typeBox',
    large: 'typeLarge',
    compressed: 'typeShort',
  }
  
  interface StateNotesProps {
    box: string,
    large: string,
    compressed: string,
  }
  // ---------------------------------------------------
  // -----------TIPOS DE ESTILO DE LAS CAJAS------------
  // ---------------------------------------------------
  const [boxStyle, setBoxStyle] = useState(stateNotes.box); 

  // ---------------------------------------------------
  // -----------MODAL: condicionar la logica------------
  // ---------------------------------------------------
  const [open, setOpen] = useState(false);
  const defaultScheduleBox: ScheduleBoxType = {
    id: "",
    date: "",
    title: "",
    time: "",
    backgroundColor: "",
    order: 0,
    description: "",
    tags: [],
    borderColor: "",
    textAlign: "left",
    image: "",
    particleColor: "",
    accentColor: "",
  };
  const [dataSelected, setDataSelected] = useState<ScheduleBoxType>(defaultScheduleBox);
  
  const handleOpen = (copyId: string) => {
    const idOrigen: ScheduleBoxType | undefined = sortedBoxes.find((it) => it.id === copyId);
  
    if (!idOrigen) {
      alert(`No se encontró una caja con el ID: ${copyId}`);
      return;
    }
  
    // console.log("Se abre un panel para ver la info completa", idOrigen);
    setOpen(true);
    setDataSelected(idOrigen);
  };

  const handleClose = () => setOpen(false);
  
  // ---------------------------------------------------
  // -----------CRUD: Caja------------
  // ---------------------------------------------------
  const [scheduleBoxes, setScheduleBoxes] = useState<ScheduleBoxType[]>(listNotes);
  const [editingBox, setEditingBox] = useState<ScheduleBoxType | null>(null);
  const [newBox, setNewBox] = useState<Omit<ScheduleBoxType, 'id' | 'order'>>({
    date: "",
    title: "Nuevo Evento",
    time: "Hora no definida",
    backgroundColor: '#50c8c8',
    image: "",
    textAlign: 'left',
    particleColor: '#50c8c8',
    accentColor: '#50c8c8',
  });
  

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfigVisible, setIsConfigVisible] = useState(false);

  useEffect(() => {
    const savedBoxes = storage.load();
    if (savedBoxes.length > 0) {
      setScheduleBoxes(savedBoxes);
    }
  }, []);

  const handleSubmit = () => {

    if (editingBox) {
      setScheduleBoxes(boxes => 
        boxes.map(box => box.id === editingBox.id ? { ...editingBox } : box)
      );
      setEditingBox(null);
    } else if (newBox.date && newBox.title && newBox.time) {
      const newBoxWithId: ScheduleBoxType = {
        ...newBox,
        id: Date.now().toString(),
        order: scheduleBoxes.length
      };
      const updatedBoxes = [...scheduleBoxes, newBoxWithId];
      setScheduleBoxes(updatedBoxes);
      storage.save(updatedBoxes);
      // Resetea para el proximo default
      setNewBox({
        date: "",
        title: "Nuevo Evento",
        time: "Hora no definida",
        backgroundColor: '#50c8c8',
        image: "",
        textAlign: 'left',
        particleColor: '#50c8c8',
        accentColor: '#50c8c8',
      });
    }
    setIsFormVisible(false);
  };

  const handleChange = (field: string, value: string) => {
    const processValue = (field: string, value: string) => {
      if (field === 'tags') {
        return value.split(',').map(tag => tag.trim());
      }
      return value;
    };

    const processed = processValue(field, value);

    if (editingBox) {
      setEditingBox({ ...editingBox, [field]: processed });
    } else {
      setNewBox({ ...newBox, [field]: processed });
    }
  };
// Editar la carta
  const handleEdit = (box: ScheduleBoxType) => {
    setEditingBox(box);
    setNewBox({ 
      date: box.date, 
      title: box.title, 
      time: box.time, 
      description: box.description || '',
      backgroundColor: box.backgroundColor,
      image: box.image || '',
      tags: box.tags || [],
      borderColor: box.borderColor || '#5FF',
      textAlign: box.textAlign || 'left',  
      particleColor: box.particleColor || '#ff5',
      accentColor: box.accentColor || '#ff5',
    });
    setIsFormVisible(true);
    setIsConfigVisible(false);
  };
// Borrar la caja
  const handleDelete = (id: string) => {
    const updatedBoxes = scheduleBoxes.filter(box => box.id !== id);
    setScheduleBoxes(updatedBoxes);
    storage.save(updatedBoxes);
  };
  // Importar el .txt
  const handleImport = (boxes: ScheduleBoxType[]) => {
    setScheduleBoxes(boxes);
    storage.save(boxes);
  };
  // ---------------------------------------------------
  // -----------DRAG AND DROP------------
  // ---------------------------------------------------
  const [draggedBox, setDraggedBox] = useState<ScheduleBoxType | null>(null);

  const handleDragStart = (e: React.DragEvent, box: ScheduleBoxType) => {
    setDraggedBox(box);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetBox: ScheduleBoxType) => {
    e.preventDefault();
    
    if (!draggedBox || draggedBox.id === targetBox.id) return;

    const newBoxes = [...scheduleBoxes];
    const draggedIndex = newBoxes.findIndex(box => box.id === draggedBox.id);
    const targetIndex = newBoxes.findIndex(box => box.id === targetBox.id);

    newBoxes.splice(draggedIndex, 1);
    newBoxes.splice(targetIndex, 0, draggedBox);

    const updatedBoxes = newBoxes.map((box, index)  => ({
      ...box,
      order: index
    }));

    setScheduleBoxes(updatedBoxes);
    storage.save(updatedBoxes);
    setDraggedBox(null);
  };
  
  const sortedBoxes = [...scheduleBoxes].sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="box">
        <div className={`box__calendar`}> 
        {/* Titulo y navs */}
          <div className="calendar__title" >
              <div className="searcher">
                <SearchBar />
              </div>
              {/* <EditableTitle /> */}
              <div className="icons">
                <Grid3x3 
                  onClick={() => setBoxStyle(stateNotes.box)} 
                  size={35} 
                  color={`${theme.colors.common.white}`}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                <Columns3 
                  onClick={() => setBoxStyle(stateNotes.large)} 
                  size={35} 
                  color={`${theme.colors.common.white}`}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                <Rows3 
                  onClick={() => setBoxStyle(stateNotes.compressed)} 
                  size={35} 
                  color={`${theme.colors.common.white}`}
                  className={`hover:scale-110 transition-all duration-300`}
                />
              </div>
              
          </div>
        {/* Cajas */}
          <div className={`calendar__notes`}>
            {
              sortedBoxes.map( (data) => {
                return (
                  <Notes 
                    key={data.id}  
                    box={data}
                    // Estilo de la caja
                    boxStyle={boxStyle} 
                    // Abrir CardModal
                    handleOpen={handleOpen}                      
                    // CRUD
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    // DRAG AND DROP
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    isDragging={draggedBox?.id === data.id}
                  />
                  )
              })
            }
          </div>
      
        {/* Abrir Cajas */}
          <CardModal 
            open={ open } 
            handleClose={ handleClose }
            box = { dataSelected }
            stateNotes = { stateNotes }
          />
      
            {/* opciones de las configuraciones */}
          <ScheduleForm
            box={editingBox || newBox}
            onSubmit={handleSubmit}
            onChange={handleChange}
            isEditing={!!editingBox}
            isVisible={isFormVisible}
            onClose={() => setIsFormVisible(false)}
          />
          {/* Abrir las configuraciones */}
          <ConfigMenu
            boxes={scheduleBoxes}
            onImport={handleImport}
            isVisible={isConfigVisible}
            onClose={() => setIsConfigVisible(false)}
            onShowForm={() => {
              setIsFormVisible(true);
              setIsConfigVisible(false);
            }}
          />
          {/* El boton de configuraciones */}
          <ConfigButton onClick={() => {
            setIsConfigVisible(true);
            setIsFormVisible(false);
          }} />
      
      
        </div>
      </div>
    </>
  )
}

export default NotesHub