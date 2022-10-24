import { Grid } from "@mui/material";
import React from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";

function App() {
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid style={{ paddingTop: '80px' }} item md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid item xs={12} md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
