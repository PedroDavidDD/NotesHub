import React, { useEffect, useState } from "react";
import { listNotes } from './Scripts/listNotes'

import './NotesHub.css'
import './css/iconsAnimated.css'

import { Notes } from "./components/Notes";
import { CardModal } from "./components/CardModal";

import type { ScheduleBox as ScheduleBoxType, SettingsNotesMain } from './types/schedule';
import { storage } from "./utils/storage";
import { ScheduleForm } from "./components/ScheduleForm";
import { ConfigMenu } from "./components/ConfigMenu";
import { ConfigButton } from "./components/ConfigButton";
import { theme } from "./css/theme";
import { CirclePlus, Columns3, Eye, EyeOff, Grid3x3, Rows3 } from "lucide-react";
import SearchBar from "./components/SearchBar ";

import { useSelector, useDispatch } from "react-redux";
import { addNotes, deleteNotes, editNotes, selectBackgroundNotes, selectFilteredNotes, setNotes, setUpdSettingsNotesMain } from "./redux/notesSlice";
import { SettingsNotesMainForm } from "./components/SettingsNotesMainForm";

function NotesHub() {
  const dispatch = useDispatch();
  const scheduleBoxes = useSelector( selectFilteredNotes );
  const bgData = useSelector( selectBackgroundNotes );
  
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
  
  const [seeNotes, setSeeNotes] = useState( true ); 

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
  const [isSettingsFormVisible, setIsSettingsFormVisible] = useState(false);
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
    // Validar que haya un elemento arrastrado y que no se suelte sobre sí mismo.
    if (!draggedBox || draggedBox.id === targetBox.id) return;
  
    const updatedBoxes = [...scheduleBoxes];
  
    const draggedIndex = updatedBoxes.findIndex(box => box.id === draggedBox.id);
    const targetIndex = updatedBoxes.findIndex(box => box.id === targetBox.id);
    // Obtenemos los indices para 
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const draggedItem = updatedBoxes[draggedIndex];
      const targetItem = updatedBoxes[targetIndex];
  
      updatedBoxes.splice(draggedIndex, 1, targetItem);
      updatedBoxes.splice(targetIndex, 1, draggedItem);
    }
  
    // Actualizar los valores de "order" para reflejar el nuevo orden.
    const reorderedBoxes = updatedBoxes.map((box, index) => ({
      ...box,
      order: index,
    }));
  
    dispatch(setNotes(reorderedBoxes));
    setDraggedBox(null);
  };
  
  
  const sortedBoxes = [...scheduleBoxes].sort((a, b) => a.order - b.order);
  
  const onShowForm = () => {
    setIsFormVisible(true);
    setIsConfigVisible(false);
  }

  const handleBgChange = (field: string, value: string) => {
    // Segundo Nivel: Recive la key del 1ro y la key del 2do.
    const isNavFiled = field.includes("nav.");
    if (isNavFiled){
      const [parentField, childField] = field.split(".");

      dispatch(
        setUpdSettingsNotesMain({
          ...bgData,
          [parentField]: {
            ...bgData[parentField],
            [childField]: value,
          },
        })
      );
      return;
    }
    // Primer nivel 
    dispatch(
      setUpdSettingsNotesMain({
        ...bgData,
        [field]: value,
      })
    );

  };
  
  const onSettingsNotesMain = () => {
    setIsSettingsFormVisible(true);
    setIsConfigVisible(false);
  }


  return (
    <>
      <div className="box">
        <div className={`box__calendar`}> 
        {/* Titulo y navs */}
          <div className="calendar__title bg-black rounded-full m-4 p-7"
          style={{
            background: bgData.nav.backgroundColor,
          }} 
          >
              <div className="searcher">
                <SearchBar />
              </div>
              <div className="icons">
                <CirclePlus                 
                  onClick={onShowForm}
                  size={35} 
                  color={bgData.nav.colorIcons}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                { seeNotes ? (
                  <Eye 
                    onClick={() => setSeeNotes( false )} 
                    size={35} 
                    color={bgData.nav.colorIcons}
                    className={`hover:scale-110 transition-all duration-300`}
                  />)
                  : (
                  <EyeOff 
                    onClick={() => setSeeNotes( true )} 
                    size={35} 
                    color={bgData.nav.colorIcons}
                    className={`hover:scale-110 transition-all duration-300`}
                  />)
                }
                <span className="text-white select-none font-bold text-2xl">|</span>
                <Grid3x3 
                  onClick={() => setBoxStyle(stateNotes.box)} 
                  size={35} 
                  color={bgData.nav.colorIcons}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                <Columns3 
                  onClick={() => setBoxStyle(stateNotes.large)} 
                  size={35} 
                  color={bgData.nav.colorIcons}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                <Rows3 
                  onClick={() => setBoxStyle(stateNotes.compressed)} 
                  size={35} 
                  color={bgData.nav.colorIcons}
                  className={`hover:scale-110 transition-all duration-300`}
                />
              </div>
              
          </div>
        {/* Cajas */}
          <div className={`calendar__notes`}>
            {
              seeNotes && sortedBoxes.map( (data) => {
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
      
            {/* opciones de las configuraciones notes */}
          <ScheduleForm
            box={editingBox || newBox}
            onSubmit={handleSubmit}
            onChange={handleChange}
            isEditing={!!editingBox}
            isVisible={isFormVisible}
            onClose={() => setIsFormVisible(false)}
          />
          
          {/* opciones de las configuraciones Main */}
          <SettingsNotesMainForm
            onBgChange={handleBgChange}

            isVisible={isSettingsFormVisible}
            onClose={() => setIsSettingsFormVisible(false)}
          />

          {/* Abrir las configuraciones */}
          <ConfigMenu
            boxes={scheduleBoxes}
            onImport={handleImport}
            onBgChange={handleBgChange}
            isVisible={isConfigVisible}
            onClose={() => setIsConfigVisible(false) }
            handleSettingsNotesMain={onSettingsNotesMain}
          />
          {/* El boton de configuraciones */}
          <ConfigButton onClick={() => {
            setIsConfigVisible(true);
            setIsFormVisible(false);            
            setIsSettingsFormVisible(false);
          }} />
      
      
        </div>
      </div>
    </>
  )
}

export default NotesHub