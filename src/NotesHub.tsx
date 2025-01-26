import React, { useEffect, useMemo, useState } from "react";

import './NotesHub.css'
import './css/iconsAnimated.css'

import { Notes } from "./components/Notes";
import { CardModal } from "./components/CardModal";

import type { ScheduleBox as ScheduleBoxType, SettingsNotesMain } from './types/schedule';
import { ScheduleForm } from "./components/ScheduleForm";
import { ConfigMenu } from "./components/ConfigMenu";
import { ConfigButton } from "./components/ConfigButton";
import { theme } from "./css/theme";
import { CirclePlus, Columns3, Eye, EyeOff, Grid3x3, Rows3, X } from "lucide-react";
import SearchBar from "./components/SearchBar ";

import { useSelector, useDispatch } from "react-redux";
import { addNotes, deleteNotes, editNotes, selectBackgroundNotes, selectFilteredNotes, setNotes, setUpdSettingsNotesMain } from "./redux/notesSlice";
import { SettingsNotesMainForm } from "./components/SettingsNotesMainForm";
import PaginationRounded from "./components/PaginationRounded";

function NotesHub() {
  const dispatch = useDispatch();
  const scheduleBoxes = useSelector( selectFilteredNotes );
  const settingsMain = useSelector( selectBackgroundNotes );
  
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
  
  const [isNotesVisible, setIsNotesVisible] = useState( true );

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
    accentBorderWidth: '',
    state: true,
  };
  const [dataSelected, setDataSelected] = useState<ScheduleBoxType>(defaultScheduleBox);
  
  const handleOpen = (copyId: string) => {
    const idOrigen: ScheduleBoxType | undefined = scheduleBoxes.find((it) => it.id === copyId);
  
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
    title: "",
    time: "",
    backgroundColor: '',
    image: "",
    textColor: '',
    particleState: false,
    particleColor: '',
    accentColor: '',
    accentBorderWidth: '',
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
        accentBorderWidth: '2',
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
      accentBorderWidth: box.accentBorderWidth || '2',
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
  const handleImport = (boxes: ScheduleBoxType[], background: SettingsNotesMain ) => {
    dispatch(setNotes(boxes));
    dispatch(setUpdSettingsNotesMain(background));
  };
  // ---------------------------------------------------
  // -----------DRAG AND DROP------------
  // ---------------------------------------------------
  const [draggedBox, setDraggedBox] = useState<ScheduleBoxType | null>(null);

  const handleDragStart = (e: React.DragEvent, box: ScheduleBoxType) => {
    setDraggedBox(box);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedBox(null)
  };

  const handleDragOver = (e: React.DragEvent, targetBox: ScheduleBoxType) => {
    e.preventDefault();
    // if (!draggedBox || draggedBox.id === targetBox.id) return;
  
    // const updatedBoxes = [...previewBoxes];
    // const draggedIndex = updatedBoxes.findIndex(box => box.id === draggedBox.id);
    // const targetIndex = updatedBoxes.findIndex(box => box.id === targetBox.id);
  
    // if (draggedIndex !== -1 && targetIndex !== -1) {
    //   const draggedItem = updatedBoxes[draggedIndex];
    //   const targetItem = updatedBoxes[targetIndex];
  
    //   updatedBoxes.splice(draggedIndex, 1, targetItem);
    //   updatedBoxes.splice(targetIndex, 1, draggedItem);
    // }
  
    // setPreviewBoxes(updatedBoxes); 
  };
  
  const handleDrop = (e: React.DragEvent, targetBox: ScheduleBoxType) => {
    e.preventDefault();
    // Validar que haya un elemento arrastrado y que no se suelte sobre sí mismo.
    if (!draggedBox || draggedBox.id === targetBox.id) return;
  
    const updatedBoxes = [...scheduleBoxes];
    const draggedIndex = updatedBoxes.findIndex(box => box.id === draggedBox.id);
    const targetIndex = updatedBoxes.findIndex(box => box.id === targetBox.id);
  
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
          ...settingsMain,
          [parentField]: {
            ...settingsMain[parentField],
            [childField]: value,
          },
        })
      );
      return;
    }
    console.log("desde nethubChange= "+field+":"+value)
    // Primer nivel 
    dispatch(
      setUpdSettingsNotesMain({
        ...settingsMain,
        [field]: value,
      })
    );

  };
  
  const onSettingsNotesMain = () => {
    setIsSettingsFormVisible(true);
    setIsConfigVisible(false);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isVisibleHidden, setIsVisibleHidden] = useState(true);
  const handleVisibleOptions = () => setIsOpen(true)
  const handleVisibleCancel = () => setIsOpen(false)

  const handleConfirmDelete = () => {
    setIsVisibleHidden(!isVisibleHidden);
    setIsOpen(false);

    // setea al cambiar entre las cajas visibles y ocultas; Pone la paginación al primero
    setPage(1);
  };

  const handleSeeNotes = () => {
    setIsNotesVisible(false)
    setIsOpen(false);
  };

  // Pagination
  const [page, setPage] = useState(1);

  const { visibleNotes, hiddenNotes } = useMemo(() => {
    const visible = scheduleBoxes.filter(box => box.state === isVisibleHidden);
    const hidden = scheduleBoxes.filter(box => box.state !== isVisibleHidden);
  
    return { visibleNotes: visible, hiddenNotes: hidden };
  }, [scheduleBoxes, isVisibleHidden, page]);

  const notesToPaginate = visibleNotes;
  const itemsForPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const newStartIndex = (page - 1) * itemsForPage;
    const newEndIndex = newStartIndex + itemsForPage;
    const newTotalPages = Math.ceil(notesToPaginate.length / itemsForPage);
  
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
    setTotalPages(newTotalPages);
  }, [notesToPaginate, isVisibleHidden]);

  const filteredNotes = (isNotesVisible && notesToPaginate?.length > 0) 
    ? notesToPaginate.slice(startIndex, endIndex) 
    : [];

  return (
    <>
      <div className="box">
        <div className={`box__calendar w-full min-h-[100vh]`}> 
        {/* Titulo y navs */}
          <div className="calendar__title bg-black rounded-full m-4 p-7"
          style={{
            background: settingsMain.nav.backgroundColor,
          }} 
          >
              <div className="searcher">
                <SearchBar />
              </div>
              <div className="icons">
                <CirclePlus                 
                  onClick={onShowForm}
                  size={35} 
                  color={settingsMain.nav.colorIcons}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                { isNotesVisible ? (
                  <Eye 
                    onClick={handleVisibleOptions} 
                    size={35} 
                    color={settingsMain.nav.colorIcons}
                    className={`hover:scale-110 transition-all duration-300`}
                  />)
                  : (
                  <EyeOff 
                    onClick={() => setIsNotesVisible( true )} 
                    size={35} 
                    color={settingsMain.nav.colorIcons}
                    className={`hover:scale-110 transition-all duration-300`}
                  />)
                }
                <span className="text-white select-none font-bold text-2xl">|</span>
                <Grid3x3 
                  onClick={() => setBoxStyle(stateNotes.box)} 
                  size={35} 
                  color={settingsMain.nav.colorIcons}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                <Columns3 
                  onClick={() => setBoxStyle(stateNotes.large)} 
                  size={35} 
                  color={settingsMain.nav.colorIcons}
                  className={`hover:scale-110 transition-all duration-300`}
                />
                <Rows3 
                  onClick={() => setBoxStyle(stateNotes.compressed)} 
                  size={35} 
                  color={settingsMain.nav.colorIcons}
                  className={`hover:scale-110 transition-all duration-300`}
                />
              </div>
              
          </div>
          
          { totalPages > 0 &&
            (<PaginationRounded
              page={page}
              setPage={setPage}
              totalPages={totalPages}  
            />)
          }
          
        {/* Cajas */}
          <div className={`calendar__notes`}>
            {
              filteredNotes.map( (data) => (
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
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragging={draggedBox?.id === data.id}
              />)
              )
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

          {/* Panel de confirmación */}
          {isOpen && (
              <div className="z-10 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                
                <div className="relative bg-white p-12 rounded-lg shadow-lg text-center">
                  <button
                    onClick={handleVisibleCancel}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-colors text-[${theme.colors.common.white}] hover:border-white`}
                    style={{
                      backgroundColor: theme.navbar.background
                    }}
                  >
                    <X size={20} />
                  </button>
                  <p className="text-2xl text-black">Opciones de visualización:</p>
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="w-full flex items-center gap-5">
                      <button
                        onClick={handleConfirmDelete}
                        className="w-10/12 px-4 py-2 text-white rounded-lg border-none"
                        style={{
                          backgroundColor: !isVisibleHidden ? theme.colors.floodlight.on : theme.colors.floodlight.off,
                        }}
                      >
                      {isVisibleHidden ? 'Ver ocultos' : 'Ver visibles'}
                      </button>
                      <span className="w-2/12 py-[0.20rem] text-xl text-black border-2 border-solid rounded-lg select-none"
                      style={{
                        borderColor: !isVisibleHidden ? theme.colors.floodlight.on : theme.colors.floodlight.off,
                        backgroundColor: !isVisibleHidden ? theme.colors.floodlight.on : theme.colors.floodlight.off,
                        color: theme.colors.common.white,
                      }}
                      >{ hiddenNotes.length }</span>
                    </div>
                    <button
                      onClick={handleSeeNotes}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg border-none"
                    >
                    Ocultar todo
                    </button>
                  </div>
                </div>
              </div>
            )}
      
        </div>
      </div>
    </>
  )
}

export default NotesHub