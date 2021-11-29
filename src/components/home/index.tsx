import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";
import Editor from "../common/Editor";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../redux/reducers/notesReducer";
import { RootState } from "../../redux/reducers/rootReducer";
import { Note } from "../../common";
import NotesCard from "../common/NotesCard";
import Preview from "../common/Preview";

const EmptyNote: Note = {
  id: "",
  title: "",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const Home = () => {
  const notes: Note[] = useSelector((state: RootState) => state.notes).notes;
  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [note, setNote] = useState<Note>(EmptyNote);
  const dispatch = useDispatch();

  const openNote = (noteId: string) => {
    const result = notes.find((note) => note.id === noteId);
    if (!result) return;
    setNote(result);
    setOpenPreview(true);
  };

  const saveNote = (title: string, text: string | undefined) => {
    if (text === undefined) return;

    dispatch(
      addNote({
        title: title,
        content: text,
      })
    );
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button
          sx={{ mt: 3, mr: 3 }}
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          New Note
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        {notes.map((note) => (
          <NotesCard note={note} openNote={openNote} />
        ))}
      </Box>
      <Editor open={open} onClose={() => setOpen(false)} saveNote={saveNote} />
      <Preview
        note={note}
        open={openPreview}
        onClose={() => setOpenPreview(false)}
      />
    </>
  );
};

export default Home;
