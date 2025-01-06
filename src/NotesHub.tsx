import React, { useEffect, useState } from "react";
import { listNotes } from './Scripts/listNotes'

import './NotesHub.css'
import './css/iconsAnimated.css'

import { Notes } from "./components/Notes";
import { CardModal } from "./components/CardModal";



import type { ScheduleBox as ScheduleBoxType } from './types/schedule';
import { storage } from "./utils/storage";

function NotesHub() {

  const stateNotes = {
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
  // const [open, setOpen] = React.useState(false);
  // const [dataSelected, setDataSelected] = React.useState(0);
  
  // const handleOpen = ( copyId:string ) => {
  //   const idOrigen = listNotes.find((it) => it.id === copyId)
  //   const TODO_CURRENT = "[add]".toLocaleLowerCase()
    
  //   if ( copyId === idOrigen.id && idOrigen.title.toLocaleLowerCase().includes(TODO_CURRENT) ) {
  //     console.log("Se abrio el formulario para crear una nueva CARD");
  
  //   } else if (copyId === idOrigen.id) {
  //     console.log("Se abre un panel para ver la info completa");
  //     setOpen(true);
  //     setDataSelected(idOrigen)
  //   }
  // }

  // const handleClose = () => setOpen(false);
  
  // ---------------------------------------------------
  // -----------CRUD: Caja------------
  // ---------------------------------------------------
  const [scheduleBoxes, setScheduleBoxes] = useState<ScheduleBoxType[]>(listNotes);
  const [editingBox, setEditingBox] = useState<ScheduleBoxType | null>(null);
  const [newBox, setNewBox] = useState<Omit<ScheduleBoxType, 'id' | 'order'>>({
    date: "02-03-2023",
    title: "3 Detroi: Become Human Primera Vez :0",
    time: "Diciembre 07",
    color: '#FF69B4',
    image: ''
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
      setNewBox({ date: '', title: '', time: '', color: '#FF69B4', image: '' });
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

  const handleEdit = (box: ScheduleBoxType) => {
    setEditingBox(box);
    setNewBox({ 
      date: box.date, 
      title: box.title, 
      time: box.time, 
      color: box.color,
      image: box.image || '',
      description: box.description || '',
      tags: box.tags || [],
      icon: box.icon || '',

      borderStyle: box.borderStyle || 'solid',
      textAlign: box.textAlign || 'left'
    });
    setIsFormVisible(true);
    setIsConfigVisible(false);
  };

  const handleDelete = (id: string) => {
    const updatedBoxes = scheduleBoxes.filter(box => box.id !== id);
    setScheduleBoxes(updatedBoxes);
    storage.save(updatedBoxes);
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

    const updatedBoxes = newBoxes.map((box, index) => ({
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
      <div className="background">

        <div className="box">

          <div className={`box__calendar`}> 
{/* Titulo y navs */}
            <div className="calendar__title" >
                <div className="calendar__title__text">
                  <h2>horarios de stream</h2> 
                  <h2>semana del 17/12/2023 al 23/12/2023</h2>
                </div>
                <div className="icons">
                  <span className="icon--first" onClick={() => setBoxStyle(stateNotes.box)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-apps-filled" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M9 3h-4a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z" strokeWidth="0" fill="currentColor" />
                      <path d="M9 13h-4a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z" strokeWidth="0" fill="currentColor" />
                      <path d="M19 13h-4a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2z" strokeWidth="0" fill="currentColor" />
                      <path d="M17 3a1 1 0 0 1 .993 .883l.007 .117v2h2a1 1 0 0 1 .117 1.993l-.117 .007h-2v2a1 1 0 0 1 -1.993 .117l-.007 -.117v-2h-2a1 1 0 0 1 -.117 -1.993l.117 -.007h2v-2a1 1 0 0 1 1 -1z" strokeWidth="0" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="icon--second" onClick={() => setBoxStyle(stateNotes.large)}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-battery-4" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M6 7h11a2 2 0 0 1 2 2v.5a.5 .5 0 0 0 .5 .5a.5 .5 0 0 1 .5 .5v3a.5 .5 0 0 1 -.5 .5a.5 .5 0 0 0 -.5 .5v.5a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2" />
                      <path d="M7 10l0 4" />
                      <path d="M10 10l0 4" />
                      <path d="M13 10l0 4" />
                      <path d="M16 10l0 4" />
                    </svg>                  */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-columns-3" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M3 3m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v16a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1zm6 -1v18m6 -18v18" />
                    </svg>
                  </span>
                  <span className="icon--third" onClick={() => setBoxStyle(stateNotes.compressed)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-columns" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 6l5.5 0" />
                      <path d="M4 10l5.5 0" />
                      <path d="M4 14l5.5 0" />
                      <path d="M4 18l5.5 0" />
                      <path d="M14.5 6l5.5 0" />
                      <path d="M14.5 10l5.5 0" />
                      <path d="M14.5 14l5.5 0" />
                      <path d="M14.5 18l5.5 0" />
                    </svg>
                  </span>
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
                      boxStyle={boxStyle} 
                      // handleOpen={handleOpen}                      
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
            {/* <CardModal 
              open={open} 
              handleClose={handleClose}
              { ...dataSelected }
              stateNotes = {stateNotes.box}
            /> */}
            
          </div>

        </div>

      </div>
    </>
  )
}

export default NotesHub