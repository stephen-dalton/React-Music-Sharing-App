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
  Box,
} from "@mui/material";
import QueuedSongList from "./QueuedSongList";
import { SongContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_QUEUED_SONGS } from "../graphql/queries";

export default function SongPlayer() {
  const { data } = useQuery(GET_QUEUED_SONGS);
  const { state, dispatch } = useContext(SongContext);
  const theme = useTheme();
  const handleToggleClick = () => {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxHeight: 176,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0px 15px",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              variant="h5"
              component="h3"
              noWrap={true}
              sx={{ maxWidth: 130 }}
            >
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
          <Box
            sx={{
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
          </Box>
          <Slider
            type="range"
            min={0}
            max={1}
            step={0.01}
            sx={{ color: "text.alt" }}
          />
        </Box>
        <CardMedia
          component="img"
          image={state.song.thumbnail}
          sx={{ maxWidth: 150, overflow: "hidden" }}
        />
      </Card>
      <QueuedSongList queue={data.queue} />
    </>
  );
}
