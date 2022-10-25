import { Grid, useMediaQuery, Hidden } from "@mui/material";
import React from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";

function App() {
  const greaterThanSmall = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const greaterThanMedium = useMediaQuery(theme => theme.breakpoints.up('md'));
  return (
    <>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={2}>
        <Grid style={{ paddingTop: greaterThanSmall ? 80 : 10 }} item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid >
        <Grid item xs={12} md={5} style={greaterThanMedium ?
          { position: 'fixed', width: "100%", right: 0, top: 70, paddingRight: 16 }
          : { position: 'fixed', left: 0, bottom: 0, width: "100%", paddingRight: 16 }}>
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
