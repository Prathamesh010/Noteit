import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/common/Navbar";
import { toggleTheme } from "./redux/reducers/themeReducer";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import Home from "./components/home";
import { RootState } from "./redux/reducers/rootReducer";
import FlashMessage from "./components/common/FlashMessage";

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <FlashMessage />
      <Navbar
        theme={theme}
        toggleTheme={() => {
          dispatch(toggleTheme());
        }}
      />
      <Home />
    </ThemeProvider>
  );
};

export default App;
