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
import { CirclePlus, Columns3, Grid3x3, Rows3 } from "lucide-react";
import SearchBar from "./components/SearchBar ";

import { useSelector, useDispatch } from "react-redux";
import { addNotes, deleteNotes, editNotes, selectFilteredNotes, setBackgroundColor, setBackgroundImage, setBackgroundSize, setNotes } from "./redux/notesSlice";

function NotesHub() {
  const dispatch = useDispatch();
  const scheduleBoxes = useSelector( selectFilteredNotes );
  
  interface StateNotesProps {
    box: string,
    large: string,
    compressed: string,
  }

  const stateNotes: StateNotesProps = {
    box: 'typeBox',
    large: 'typeLarge',
    compressed: 'typeShort',
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
    image: "",
    particleState: false,
    particleColor: "",
    accentColor: "",
    state: true,
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
  const [editingBox, setEditingBox] = useState<ScheduleBoxType | null>(null);
  const [newBox, setNewBox] = useState<Omit<ScheduleBoxType, 'id' | 'order'>>({
    date: "",
    title: "Nuevo Evento",
    time: "Hora no definida",
    backgroundColor: '#50c8c8',
    image: "",
    particleState: false,
    particleColor: '#50c8c8',
    accentColor: '#50c8c8',
    state: true,
  });
  

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfigVisible, setIsConfigVisible] = useState(false);

  const handleSubmit = () => {

    if (editingBox) {
      dispatch(editNotes(editingBox));
      setEditingBox(null);
    } else if (newBox.date && newBox.title && newBox.time) {
      const newBoxWithId: ScheduleBoxType = {
        ...newBox,
        id: Date.now().toString(),
        order: scheduleBoxes.length
      };
      dispatch(addNotes(newBoxWithId));
      // Resetea para el proximo default
      setNewBox({
        date: "",
        title: "Nuevo Evento",
        time: "Hora no definida",
        backgroundColor: '#50c8c8',
        image: "",
        particleState: false,
        particleColor: '#50c8c8',
        accentColor: '#50c8c8',
        state: true,
      });
    }
    setIsFormVisible(false);
  };

  const handleChange = (field: string, value: string | boolean) => {
    const processValue = (field: string, value: string | boolean) => {
      if (field === 'tags' && typeof value === 'string') {
        return value.split(',').map(tag => tag.trim());
      }
      if (typeof value === 'boolean'){
        return value;
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
      backgroundColor: box.backgroundColor || '',
      backgroundPosition: box.backgroundPosition || 'center',
      image: box.image || '',
      tags: box.tags || [],
      borderColor: box.borderColor || '#5FF',
      particleState: box.particleState || false,
      particleColor: box.particleColor || '#ff5',
      accentColor: box.accentColor || '#ff5',
      alignItem: box.alignItem || 'start',  
      justifyContent: box.justifyContent || 'center',  
      state: box.state || true,
    });
    setIsFormVisible(true);
    setIsConfigVisible(false);
  };
// Borrar la caja
  const handleDelete = (id: string) => {
    dispatch(deleteNotes(id));
  };
  // Importar el .txt
  const handleImport = (boxes: ScheduleBoxType[]) => {
    dispatch(setNotes(boxes));
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

    dispatch(setNotes(updatedBoxes));
    setDraggedBox(null);
  };
  
  const sortedBoxes = [...scheduleBoxes].sort((a, b) => a.order - b.order);
  
  const onShowForm = () => {
    setIsFormVisible(true);
    setIsConfigVisible(false);
  }

  const handleBgChange = (key, value) => {
    if (key === 'color') {
      dispatch(setBackgroundColor(value));
    } else if (key === 'image') {
      dispatch(setBackgroundImage(value));
    } else if (key === 'size') {
      dispatch(setBackgroundSize(value));
    }
  };

  return (
    <>
      <div className="box">
        <div className={`box__calendar`}> 
        {/* Titulo y navs */}
          <div className="calendar__title bg-black rounded-full m-4 p-7" >
              <div className="searcher">
                <SearchBar />
              </div>
              <div className="icons">
                <CirclePlus                 
                  onClick={onShowForm}
                  size={35} 
                  color={theme.navbar.background}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                <Grid3x3 
                  onClick={() => setBoxStyle(stateNotes.box)} 
                  size={35} 
                  color={theme.colors.common.white}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                <Columns3 
                  onClick={() => setBoxStyle(stateNotes.large)} 
                  size={35} 
                  color={theme.colors.common.white}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                <Rows3 
                  onClick={() => setBoxStyle(stateNotes.compressed)} 
                  size={35} 
                  color={theme.colors.common.white}
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
            onChange={handleBgChange}
            isVisible={isConfigVisible}
            onClose={() => setIsConfigVisible(false)}
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