import { Delete } from '@mui/icons-material';
import { Avatar, IconButton, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

export default function QueuedSongList() {
  const greaterThanMedium = useMediaQuery(theme => theme.breakpoints.up('md'));

  const song = {
    title: 'Hurricane',
    artist: 'Luke Coombs',
    thumbnail: 'https://i.scdn.co/image/ab67616d00001e02ccba76fad1c624c09e72bc78'
  }

  return greaterThanMedium && (
    <div style={{ margin: '10px 0' }}>
      <Typography color="textAlt" variant="button">
        QUEUE (5)
      </Typography>
      {Array.from({ length: 5 }, () => song).map((song, i) => (
        <QueuedSong key={i} song={song} />
      ))}
    </div>
  )
}

function QueuedSong({ song }) {
  const { title, artist, thumbnail } = song;
  return (
    <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateColumns: '50px auto 50px', gridGap: 12, alignItems: 'center', marginTop: 10 }}>
      <Avatar src={thumbnail} alt="Song Thumbnail" sx={{ width: 44, height: 44 }} />
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <Typography varient="subtitle2" sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }} >
          {title}
        </Typography>
        <Typography varient="body2" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', color: "text.secondary" }} >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  )
}
