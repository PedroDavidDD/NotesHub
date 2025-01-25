import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { theme } from '../css/theme';
import { selectBackgroundNotes } from '../redux/notesSlice';
import { useSelector } from 'react-redux';

export default function PaginationRounded({ totalPages, page, setPage }) {
  const settingsMain = useSelector( selectBackgroundNotes );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack alignItems={'center'}>
      <Pagination
        variant="outlined"
        shape="rounded"
        count={totalPages}
        page={page}
        onChange={handleChange}
        size="large"
        sx={{
          padding: "1.25rem",
          // Modificar el contenedor principal
          '& .MuiPaginationItem-root': {
            border: `.13rem solid ${theme.colors.common.black}`,
            fontSize: '1.5rem',
            backgroundColor: theme.colors.common.white,
          },
          '& .MuiPaginationItem-root:hover': {
            backgroundColor: settingsMain.nav.colorIcons,
          },
          // Modificar el contenedor
          '& .MuiPagination-ul': {

          },
          // Estilo adicional para el estado seleccionado
          '& .Mui-selected': {
            backgroundColor: settingsMain.nav.colorIcons,
            color: theme.colors.common.black,
          },
          '& .Mui-selected:hover': {
            backgroundColor: settingsMain.nav.colorIcons,
            color: theme.colors.common.black,
          },
        }}
      />
    </Stack>
  );
}
