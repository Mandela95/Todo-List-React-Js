import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, blueGrey } from "@mui/material/colors";
import TodoList from "./components/TodoList";
import { TodosContext } from "./contexts/TodosContext";
import { v4 as uuid } from "uuid";
import { useState } from "react";

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

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
