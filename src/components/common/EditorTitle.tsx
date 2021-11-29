import { Input, Typography } from "@mui/material";
import { FC, useState } from "react";

interface Props {
  title: string | undefined;
  setTitle: (title: string) => void;
}

const EditorTitle: FC<Props> = ({ title, setTitle }) => {
  const [showInput, setShowInput] = useState(false);
  return (
    <>
      {!showInput ? (
        <Typography variant="h6" onClick={() => setShowInput(true)}>
          {title}
        </Typography>
      ) : null}
      {showInput ? (
        <Input
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setShowInput(false)}
          autoFocus
        />
      ) : null}
    </>
  );
};

export default EditorTitle;
