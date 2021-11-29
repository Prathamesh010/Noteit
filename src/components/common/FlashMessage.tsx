import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeFlash } from "../../redux/reducers/appReducer";
import { RootState } from "../../redux/reducers/rootReducer";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

const FlashMessage: FC = () => {
  const open = useSelector((state: RootState) => state.app.flash.open);
  const message = useSelector((state: RootState) => state.app.flash.message);
  const type = useSelector((state: RootState) => state.app.flash.type);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeFlash());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={TransitionLeft}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default FlashMessage;
