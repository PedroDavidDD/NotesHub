import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 935.85,
        height: 'auto',
        height: 755.81,
        bgcolor: '#FE5CFF',
        border: '2px solid #000',
        boxShadow: 24,
        p: 8,
    };

    const cardDate = {
        display: 'flex',
        justifyContent: 'flex-start',
        pb: 4,
        color: '#fff',
    };
    const cardTitle = {
        display: 'flex',
        justifyContent: 'flex-center',
        textAlign: 'center',
    };
    const cardContet = {
        display: 'flex',
        justifyContent: 'flex-center',
        textAlign: 'justify',
        color: '#fff',
    };
    const cardTime = {
        display: 'flex',
        justifyContent: 'flex-end',
        pt: 4,
    };
  
export const CardModal =({ open, handleClose, id, date, title, time, content, stateNotes })=> {
 

    return (
        <>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box 
                sx={style}
                className={`note grid-item ${stateNotes}`} 
                key={ id } 
            >
                <Typography variant="h4" component="div" sx={cardDate} ><h3>{ date }</h3></Typography>
                <Typography  variant="h3" component="div" sx={cardTitle} ><h2>{ title }</h2></Typography>
                <Typography paragraph variant="h5" sx={cardContet} ><h2>{ content }</h2></Typography>
                <Typography variant="h4" component="div" sx={cardTime} ><h3>{ time }</h3></Typography>
            </Box>
            </Modal>
        </>
    )
}
