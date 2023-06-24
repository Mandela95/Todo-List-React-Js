import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, blueGrey } from "@mui/material/colors";
import TodoList from "./components/TodoList";
import { TodosContext } from "./contexts/TodosContext";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import MySnackBar from "./components/MySnackBar";
import { ToastContext } from "./contexts/ToastContext";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
    secondary: {
      main: blueGrey[900],
    },
  },
  typography: {
    fontFamily: [
      "cairo",
      // "Alexandria"
    ],
  },
});

const initialTodos = [
  {
    id: uuid(),
    title: "Mission one",
    details: "Mission one details",
    isCompleted: false,
  },
  {
    id: uuid(),
    title: "Mission two",
    details: "Mission two details",
    isCompleted: false,
  },
  {
    id: uuid(),
    title: "Mission three",
    details: "Mission three details",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }
  return (
    <ThemeProvider theme={theme}>
<<<<<<< HEAD
      <ToastContext.Provider value={{ showHideToast }}>
        <div className="App">
          <MySnackBar open={open} message={message} />
          <TodosContext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ToastContext.Provider>
=======
      <div className="App">
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
>>>>>>> 1d9ddc9fd964689386028c1a6c22746d7be646f0
    </ThemeProvider>
  );
}

export default App;
