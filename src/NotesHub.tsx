import React, { useEffect, useMemo, useState } from "react";

import './NotesHub.css'
import './css/iconsAnimated.css'

import { 
  Notes, 
  CardModal, 
  ScheduleForm, 
  ConfigMenu, 
  ConfigButton, 
  SettingsNotesMainForm, 
  PaginationRounded, 
  Icons, 
  VisibilityOptionsModal, 
  SearchBar 
} from "./components";

import type { ScheduleBox, SettingsNav, SettingsNotesMain } from './types/schedule';
import { useSelector, useDispatch } from "react-redux";
import { 
  addNotes,
  deleteNotes,
  editNotes, 
  selectBackgroundNotes, 
  selectFilteredNotes, 
  setNotes, 
  setUpdSettingsNotesMain
} from "./redux/notesSlice";
import { theme } from "./css/theme";
import { formatDate } from "./utils/dataUtils";

const DEFAULT_SCHEDULEBOX: ScheduleBox = {
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

const DEFAULT_SCHEDULE_NEWBOX: Omit<ScheduleBox, 'id' | 'order'> = {
  date:  new Date().toISOString().split('T')[0],
  title: "Nuevo Evento",
  time: new Intl.DateTimeFormat('es-PE', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(new Date()),
  backgroundColor: theme.colors.floodlight.on,
  image: "",
  textColor: theme.colors.common.white,
  particleState: false,
  particleColor: theme.colors.common.white,
  accentColor: theme.colors.floodlight.on,
  accentBorderWidth: '2',
  state: true,
}

const stateNotes = {
  BOX: 'typeBox',
  LARGE: 'typeLarge',
  COMPRESSED: 'typeShort',
}

function NotesHub() {
  const dispatch = useDispatch();
  const scheduleBoxes = useSelector( selectFilteredNotes );
  const settingsMain = useSelector( selectBackgroundNotes );
  
  const [boxStyle, setBoxStyle] = useState(stateNotes.BOX);
  const [isNotesVisible, setIsNotesVisible] = useState( true );
  const [open, setOpen] = useState(false);
  const [dataSelected, setDataSelected] = useState<ScheduleBox>( DEFAULT_SCHEDULEBOX );
  const [editingBox, setEditingBox] = useState<ScheduleBox | null>(null);
  const [newBox, setNewBox] = useState<Omit<ScheduleBox, 'id' | 'order'>>( DEFAULT_SCHEDULE_NEWBOX );

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSettingsFormVisible, setIsSettingsFormVisible] = useState(false);
  const [isConfigVisible, setIsConfigVisible] = useState(false);
  const [draggedBox, setDraggedBox] = useState<ScheduleBox | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isVisibleHidden, setIsVisibleHidden] = useState(true);
  
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleOpen = (copyId: string) => {
    const idOrigen: ScheduleBox | undefined = scheduleBoxes.find((it) => it.id === copyId);
  
    if (!idOrigen) {
      alert(`No se encontró una caja con el ID: ${copyId}`);
      return;
    }
  
    setOpen(true);
    setDataSelected(idOrigen);
  };

  const handleClose = () => setOpen(false);
  
  const handleSubmit = () => {

    if (editingBox) {
      dispatch(editNotes(editingBox));
      setEditingBox(null);
    } else if (newBox.date && newBox.title && newBox.time) {
      const newBoxWithId: ScheduleBox = {
        ...newBox,
        id: Date.now().toString(),
        order: scheduleBoxes.length
      };
      dispatch(addNotes(newBoxWithId));
      // Resetea para el proximo default
      setNewBox(DEFAULT_SCHEDULE_NEWBOX);
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
  const handleEdit = (box: ScheduleBox) => {
    setEditingBox(box);
    setIsFormVisible(true);
    setIsConfigVisible(false);
  };
// Borrar la caja
  const handleDelete = (id: string) => {
    dispatch(deleteNotes(id));
  };
  // Importar el .JSON
  const handleImport = (boxes: ScheduleBox[], background: SettingsNotesMain ) => {
    dispatch(setNotes(boxes));
    dispatch(setUpdSettingsNotesMain(background));
  };

  // ---------------------------------------------------
  // -----------DRAG AND DROP------------
  // ---------------------------------------------------  

  const handleDragStart = (e: React.DragEvent, box: ScheduleBox) => {
    setDraggedBox(box);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedBox(null)
  };

  const handleDragOver = (e: React.DragEvent, targetBox: ScheduleBox) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, targetBox: ScheduleBox) => {
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
    setEditingBox(null);
    
    setIsFormVisible(true);
    setIsConfigVisible(false);
  }

  const handleBgChange = (field: string, value: string) => {
    // Segundo Nivel: Recive la key del 1ro y la key del 2do.
    const isNested = field.includes(".");

    if (isNested){
      const [parentField, childField] = field.split(".") as [keyof SettingsNotesMain, keyof SettingsNav];

      if (!childField) {
        console.warn("Formato de campo invalido: falta la llave hija");
        return;
      }

      const parentValue = settingsMain[parentField];

      if (typeof parentValue === "object" && parentValue !== null && childField in parentValue) {
        dispatch(
          setUpdSettingsNotesMain({
            ...settingsMain,
            [parentField]: {
              ...parentValue,
              [childField]: value,
            },
          })
        );
      } else {
        console.warn("Campo hijo no válido:", childField);
      }
      
      return;
    }
    // Primer nivel 
    dispatch(
      setUpdSettingsNotesMain({
        ...settingsMain,
        [field as keyof SettingsNotesMain]: value,
      })
    );

  };
  
  const onSettingsNotesMain = () => {
    setIsSettingsFormVisible(true);
    setIsConfigVisible(false);
  }

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

  // ---------------------------------------------------
  // -----------Pagination------------
  // ---------------------------------------------------

  const { visibleNotes, hiddenNotes } = useMemo(() => {
    const visible = scheduleBoxes.filter(box => box.state === isVisibleHidden);
    const hidden = scheduleBoxes.filter(box => box.state !== isVisibleHidden);
  
    return { visibleNotes: visible, hiddenNotes: hidden };
  }, [scheduleBoxes, isVisibleHidden, page]);

  const notesToPaginate = visibleNotes;
  const itemsForPage = 5;

  useEffect(() => {
    const newStartIndex = (page - 1) * itemsForPage;
    const newEndIndex = newStartIndex + itemsForPage;
    const newTotalPages = Math.ceil(notesToPaginate.length / itemsForPage);
  
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
    setTotalPages(newTotalPages);
  }, [notesToPaginate, isVisibleHidden]);

  // Filtro Principal para mostrar las cajas
  const filteredNotes = (isNotesVisible && notesToPaginate?.length > 0) 
    ? notesToPaginate.slice(startIndex, endIndex) 
    : [];

  return (
    <>
      <div className="box">
        <div className={`box__calendar w-full min-h-[100vh]`}> 
          {/* Titulo y navs */}
          <div 
            className="calendar__title bg-black rounded-full m-4 p-7"
            style={{
              background: settingsMain.nav.backgroundColor,
            }} 
          >
            <SearchBar />
            <Icons
              onShowForm={onShowForm} 
              isNotesVisible={isNotesVisible} 
              handleVisibleOptions={handleVisibleOptions} 
              setBoxStyle={setBoxStyle}
              setIsNotesVisible={setIsNotesVisible}
              stateNotes={stateNotes}
            />
          </div>
          {/* Comprobar paginacion */}
          { totalPages > 0 &&
            (<PaginationRounded
              page={page}
              setPage={setPage}
              totalPages={totalPages}  
            />)
          }
          {/* Cajas */}
          { filteredNotes.length > 0 && (
            <div className={`calendar__notes`}>
            {
              filteredNotes.map( data => (
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
          )}
          {/* Abrir notas para ver mas detalles */}
          <CardModal 
            open={ open } 
            handleClose={ handleClose }
            box = { dataSelected }
          />
          {/* UPD-ADD: Configuraciones de las notas */}
          <ScheduleForm
            box={editingBox || newBox}
            onSubmit={handleSubmit}
            onChange={handleChange}
            isEditing={!!editingBox}
            isVisible={isFormVisible}
            onClose={() => setIsFormVisible(false)}
          />
          {/* UPD: Configuraciones del fondo */}
          <SettingsNotesMainForm
            onBgChange={handleBgChange}
            isVisible={isSettingsFormVisible}
            onClose={() => setIsSettingsFormVisible(false)}
          />
          {/* Boton de configuraciones */}
          <ConfigButton onClick={() => {
            setIsConfigVisible(true);
            setIsFormVisible(false);            
            setIsSettingsFormVisible(false);
          }} />
          {/* Modal del boton */}
          <ConfigMenu
            boxes={scheduleBoxes}
            onImport={handleImport}
            isVisible={isConfigVisible}
            onClose={() => setIsConfigVisible(false) }
            handleSettingsNotesMain={onSettingsNotesMain}
          />
          {/* Panel de confirmación */}
          {isOpen && (
              <VisibilityOptionsModal
                handleVisibleCancel={handleVisibleCancel}
                handleConfirmDelete={handleConfirmDelete}
                isVisibleHidden={isVisibleHidden}
                hiddenNotes={hiddenNotes}
                handleSeeNotes={handleSeeNotes}
              />
            )}
        </div>
      </div>
    </>
  )
}

export default NotesHub