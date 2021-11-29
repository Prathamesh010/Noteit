import { Card, Typography } from "@mui/material";
import { FC } from "react";
import { Note } from "../../common";

interface NotesCardProps {
  note: Note;
  openNote: (noteId: string) => void;
}

const NotesCard: FC<NotesCardProps> = ({ note, openNote }) => {
  return (
    <Card sx={{ maxWidth: 275, p: 2, m: 2 }} onClick={() => openNote(note.id)}>
      <Typography gutterBottom>{note.title}</Typography>
    </Card>
  );
};

export default NotesCard;
