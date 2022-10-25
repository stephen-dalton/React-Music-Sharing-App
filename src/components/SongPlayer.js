import { useTheme } from '@mui/material/styles';
import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import { Card, CardContent, Typography, IconButton, Slider, CardMedia } from '@mui/material'
import React from 'react'
import QueuedSongList from './QueuedSongList'

export default function SongPlayer() {
  const theme = useTheme();
  return (
    <>
      <Card variant='outlined' sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 15px' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant='h5' component="h3">
              Title
            </Typography>
            <Typography variant='subtitle1' component="p" sx={{ color: 'text.primary' }}>
              Artist
            </Typography>
          </CardContent>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: theme.spacing(1), paddingRight: theme.spacing(1) }}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant='subtitle1' component="p" sx={{ color: 'text.primary' }}>
              00:01:30
            </Typography>
          </div>
          <Slider type="range" min={0} max={1} step={0.01} sx={{ color: 'text.alt' }} />
        </div>
        <CardMedia component="img" image="https://i.scdn.co/image/ab67616d00001e02ccba76fad1c624c09e72bc78" sx={{ width: 150 }} />
      </Card>
      <QueuedSongList />
    </>
  )
}
