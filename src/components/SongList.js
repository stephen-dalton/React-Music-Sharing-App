import { useMutation, useSubscription } from "@apollo/react-hooks";
import {
  PauseCircleFilled,
  PlayCircleFilledWhite,
  Save,
} from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GET_SONGS } from "../graphql/subscriptions";
import { SongContext } from "../App";
import { ADD_REMOVE_SONGS_FROM_QUEUE } from "../graphql/mutations";

export default function SongList() {
  const { data, loading, error } = useSubscription(GET_SONGS);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          mt: 50,
          lt: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
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
  );
}

function Song({ song }) {
  const { state, dispatch } = useContext(SongContext);
  const [addOrRemoveFromQueue] = useMutation(ADD_REMOVE_SONGS_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });
  const [currentSongPlaying, setCurrentSongPlaying] = useState(false);
  const { id, title, artist, thumbnail } = song;

  useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state.song.id;
    setCurrentSongPlaying(isSongPlaying);
  }, [id, state.song.id, state.isPlaying]);

  const handleToggleClick = () => {
    dispatch({ type: "SET_SONG", payload: { song } });
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };

  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  };

  return (
    <Card sx={{ margin: 3 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          image={thumbnail}
          alt="Song Cover"
          sx={{ width: 140, height: 140, objectFit: "cover" }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="p"
              color="text.alt"
            >
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              size="medium"
              sx={{ color: "text.alt" }}
              onClick={handleToggleClick}
            >
              {currentSongPlaying ? (
                <PauseCircleFilled />
              ) : (
                <PlayCircleFilledWhite />
              )}
            </IconButton>
            <IconButton
              size="medium"
              sx={{ color: "text.white" }}
              onClick={handleAddOrRemoveFromQueue}
            >
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}
