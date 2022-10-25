import { PlayCircleFilledWhite, Save } from '@mui/icons-material';
import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from '@mui/material';
import React from 'react'

export default function SongList() {
  let loading = false;

  const song = {
    title: 'Hurricane',
    artist: 'Luke Coombs',
    thumbnail: 'https://i.scdn.co/image/ab67616d00001e02ccba76fad1c624c09e72bc78'
  }

  if (loading) {
    return (
      <div sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 50 }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      {Array.from({ length: 10 }, () => song).map((song, i) => (
        <Song key={i} song={song} />
      ))}
    </div>
  )
}

function Song({ song }) {
  const { title, artist, thumbnail } = song;
  return (
    <Card sx={{ margin: 3 }}>
      <div style={{ display: 'flex', alignItems: "center" }}>
        <CardMedia component="img" image={thumbnail} alt="Song Cover" sx={{ width: 140, height: 140, objectFit: 'cover' }} />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom variant="body1" component="p" color="text.alt">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size="medium" sx={{ color: 'text.alt' }}>
              <PlayCircleFilledWhite />
            </IconButton>
            <IconButton size="medium" sx={{ color: 'text.white' }}>
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  )
}