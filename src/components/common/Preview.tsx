import { Close, Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/system";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { Note } from "../../common";

interface PreviewProps {
  note: Note;
  open: boolean;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Preview: React.FC<PreviewProps> = ({ note, open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6">{note.title}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            startIcon={<Edit />}
            sx={{ mr: 2 }}
            // onClick={onSave}
          >
            Edit
          </Button>
          <IconButton color="primary" onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <MDEditor.Markdown source={note.content} />
      </DialogContent>
    </Dialog>
  );
};

export default Preview;
