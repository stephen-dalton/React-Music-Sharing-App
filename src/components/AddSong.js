import { AddBoxOutlined, Link } from '@mui/icons-material'
import { TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React, { useState } from 'react'

export default function AddSong() {

  const [dialog, setDialog] = useState(false);

  const handleCloseDialog = () => {
    setDialog(false);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Dialog open={dialog} onClose={handleCloseDialog} sx={{ textAlign: 'center' }}>
        <DialogTitle sx={{ backgroundColor: 'background.default' }}>Edit Song</DialogTitle>
        <DialogContent sx={{ backgroundColor: 'background.default' }} >
          <img src="https://i.scdn.co/image/ab67616d00001e02ccba76fad1c624c09e72bc78" alt='Song Thumbmail' sx={{ w: '90%' }} />
          <TextField margin='dense' name='title' label='Title' fullWidth sx={{ color: 'text.primary', borderColor: 'text.primary' }} />
          <TextField margin='dense' name='artist' label='Artist' fullWidth />
          <TextField margin='dense' name='thumbnail' label='Thumbnail' fullWidth />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'background.default' }}>
          <Button sx={{ color: 'secondary.light' }} onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ color: 'secondary.light', m: 1 }}>
            Add Song
          </Button>
        </DialogActions >
      </Dialog>
      <TextField sx={{ m: 2 }} placeholder='Add YouTube or Soundcloud URL' fullWidth margin='normal' type="url" InputProps={{
        startAdornment: (
          <InputAdornment sx={{ m: 1 }} position="start">
            <Link />
          </InputAdornment>
        )
      }} variant='standard' />
      <Button variant='contained' color='primary' endIcon={<AddBoxOutlined />} onClick={() => setDialog(true)}>
        Add
      </Button>
    </div >
  )
}
