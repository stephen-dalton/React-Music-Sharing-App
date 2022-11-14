import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { PlayArrow, SkipNext, SkipPrevious, Pause } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
} from "@mui/material";
import QueuedSongList from "./QueuedSongList";
import { SongContext } from "../App";

export default function SongPlayer() {
  const { state, dispatch } = useContext(SongContext);
  const theme = useTheme();
  const handleToggleClick = () => {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };
  return (
    <>
      <Card
        variant="outlined"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0px 15px",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              sx={{ color: "text.primary" }}
            >
              {state.song.artist}
            </Typography>
          </CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: theme.spacing(1),
              paddingRight: theme.spacing(1),
            }}
          >
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleToggleClick}>
              {state.isPlaying ? (
                <Pause sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrow sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography
              variant="subtitle1"
              component="p"
              sx={{ color: "text.primary" }}
            >
              00:01:30
            </Typography>
          </div>
          <Slider
            type="range"
            min={0}
            max={1}
            step={0.01}
            sx={{ color: "text.alt" }}
          />
        </div>
        <CardMedia
          component="img"
          image={state.song.thumbnail}
          sx={{ width: 150 }}
        />
      </Card>
      <QueuedSongList />
    </>
  );
}
