import { Grid, useMediaQuery, Hidden } from "@mui/material";
import React from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import songReducer from "./reducer";

export const SongContext = React.createContext({
  song: {
    id: "ead9cb75-5954-4cfa-89f6-1d0819034499",
    title: "Falling Back",
    artist: "Drake",
    thumbnail: "http://img.youtube.com/vi/rJi7GobzRgY/0.jpg",
    url: "https://www.youtube.com/watch?v=rJi7GobzRgY",
    duration: 281,
  },
  isPlaying: false,
});

function App() {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);
  const greaterThanSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={2}>
        <Grid
          style={{ paddingTop: greaterThanSmall ? 80 : 10 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          style={
            greaterThanMedium
              ? {
                  position: "fixed",
                  width: "100%",
                  right: 0,
                  top: 70,
                  paddingRight: 16,
                }
              : {
                  position: "fixed",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  paddingRight: 16,
                }
          }
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
