import { AddBoxOutlined, Link } from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import SoundCloudPlayer from "react-player/soundcloud";
import YouTubePlayer from "react-player/youtube";

import { useMutation } from "@apollo/react-hooks";
import { ADD_SONG } from "../graphql/mutations";

const DEFAULT_SONG = { duration: 0, title: "", artist: "", thumbnail: "" };

export default function AddSong() {
  const [dialog, setDialog] = useState(false);
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [url, setUrl] = useState("");
  const [playable, setPlayable] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG);

  useEffect(() => {
    const isPlayable =
      SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player;

    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }

    setSong({ ...songData, url });
  };

  const handleChangeSong = (event) => {
    const { name, value } = event.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const handleAddSong = async () => {
    try {
      const { url, thumbnail, duration, title, artist } = song;

      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
      });
      handleCloseDialog();
      setSong(DEFAULT_SONG);
      setUrl('')
    } catch (error) {
      console.error("Error adding Song!", error);
    }
  };

  const handleError = (field) => {
    return error?.graphQLErrors[0]?.extensions?.path.includes(field);
  };

  const getYoutubeInfo = (player) => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  };

  const getSoundCloudInfo = (player) => {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "t500x500"),
          });
        }
      });
    });
  };

  const { thumbnail, title, artist } = song;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Dialog
        open={dialog}
        onClose={handleCloseDialog}
        sx={{ textAlign: "center" }}
      >
        <DialogTitle sx={{ backgroundColor: "background.default" }}>
          Edit Song
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "background.default" }}>
          <img src={thumbnail} alt="Song Thumbmail" sx={{ w: "90%" }} />
          <TextField
            onChange={handleChangeSong}
            error={handleError("title")}
            helperText={handleError("title") && "Required Field"}
            value={title}
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            sx={{ color: "text.primary", borderColor: "text.primary" }}
          />
          <TextField
            onChange={handleChangeSong}
            error={handleError("artist")}
            helperText={handleError("artist") && "Required Field"}
            artist={artist}
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
          />
          <TextField
            onChange={handleChangeSong}
            error={handleError("thumbnail")}
            helperText={handleError("thumbnail") && "Required Field"}
            value={thumbnail}
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "background.default" }}>
          <Button sx={{ color: "secondary.light" }} onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ color: "secondary.light", m: 1 }}
            onClick={handleAddSong}
          >
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        sx={{ m: 2 }}
        placeholder="Add YouTube or Soundcloud URL"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment sx={{ m: 1 }} position="start">
              <Link />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onChange={(event) => setUrl(event.target.value)}
        value={url}
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(true)}
        disabled={!playable}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
}
