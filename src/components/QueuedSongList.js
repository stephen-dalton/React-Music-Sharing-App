import { useMutation } from "@apollo/react-hooks";
import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { ADD_REMOVE_SONGS_FROM_QUEUE } from "../graphql/mutations";

export default function QueuedSongList({ queue }) {
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  return (
    greaterThanMedium && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textAlt" variant="button">
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
}

function QueuedSong({ song }) {
  const [addOrRemoveFromQueue] = useMutation(ADD_REMOVE_SONGS_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });
  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  };
  const { title, artist, thumbnail } = song;
  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "50px auto 50px",
        gridGap: 12,
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Avatar
        src={thumbnail}
        alt="Song Thumbnail"
        sx={{ width: 44, height: 44 }}
      />
      <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
        <Typography
          varient="subtitle2"
          sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {title}
        </Typography>
        <Typography
          varient="body2"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            color: "text.secondary",
          }}
        >
          {artist}
        </Typography>
      </div>
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}
