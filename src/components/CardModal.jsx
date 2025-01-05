import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import { theme } from '../css/theme';

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        with: 500,
        height: 500,
        // bgcolor: '#FE5CFF',
        // bgcolor: '#222',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignContext: 'center',
        justifyContent: 'space-around',

        background: `#E5E2D1 url('./images/00004.jpeg') no-repeat center/cover`,        
        borderRadius: "10px 10px",
        filter: "saturate(120%)",
    };

    const cardDate = {
        display: 'flex',
        justifyContent: 'flex-start',
        color: theme.colors.common.black,      
    };
    
    const cardTitle = {
        display: "block",
        // textAlign: 'center',
        color: theme.colors.common.black,  
    };

    const cardContet = {
        width: '450px',
        height: '350px',
        textAlign: 'justify',
        px: 2,
        overflow: 'auto',
        color: theme.colors.common.black, 
    };

    const cardTime = {
        display: 'flex',
        justifyContent: 'flex-end',
        color: theme.colors.common.black, 
    };
  
export const CardModal =({ open, handleClose, id, date, title, time, description, stateNotes })=> {
 

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
                    className={`note grid-item`} 
                    key={ id } 
                >
                    <Typography className={`note__date`} variant="h6" component="div" sx={cardDate} >{ date }</Typography>
                    <span>
                        <Typography className={`note__title`} variant="h5" component="div" sx={cardTitle} >{ title }</Typography>
                        <Typography paragraph variant="h6" sx={cardContet} >{ description }</Typography>
                    </span>
                    <Typography className={`note__datetime`} variant="h6" component="div" sx={cardTime} >{ time }</Typography>                    
                </Box>
            </Modal>
        </>
    )
}
