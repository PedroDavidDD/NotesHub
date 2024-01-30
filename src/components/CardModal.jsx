import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        with: 500,
        height: 500,
        bgcolor: '#FE5CFF',
        bgcolor: '#222',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignContext: 'center',
        justifyContent: 'space-between',
        
    };

    const cardDate = {
        display: 'flex',
        justifyContent: 'flex-start',
        color: '#fff',
    };
    const cardTitle = {
        display: "block",
        textAlign: 'center',
        color: '#000',
        bgcolor: '#fff',
    };
    const cardContet = {
        width: '450px',
        height: '350px',
        textAlign: 'justify',
        color: '#fff',
        px: 2,
        overflow: 'auto',
    };
    const cardTime = {
        display: 'flex',
        justifyContent: 'flex-end',
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
                <Typography variant="h6" component="div" sx={cardDate} >{ date }</Typography>
                <span>
                    <Typography  variant="h5" component="div" sx={cardTitle} >{ title }</Typography>
                    <Typography paragraph variant="h6" sx={cardContet} >{ content }</Typography>
                </span>
                <Typography variant="h6" component="div" sx={cardTime} >{ time }</Typography>
            </Box>
            </Modal>
        </>
    )
}
