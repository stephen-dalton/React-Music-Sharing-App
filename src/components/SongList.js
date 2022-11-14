import { useSubscription } from '@apollo/react-hooks';
import { PlayCircleFilledWhite, Save } from '@mui/icons-material';
import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from '@mui/material';
import React from 'react';
import { GET_SONGS } from '../graphql/subscriptions';

export default function SongList() {
  const { data, loading, error } = useSubscription(GET_SONGS);

  console.log(data, loading, error)

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', mt: 50, lt: 50 }}>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return <div>Error Fetching Songs</div>;
  }

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
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