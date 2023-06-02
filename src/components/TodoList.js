import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Divider, TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
// components
import Todo from "./Todo";
// Others
import { TodosContext } from "../contexts/TodosContext";
import { useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");

  const { todos, setTodos } = useContext(TodosContext);

  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // filteration arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const inProgressTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "inProgress") {
    todosToBeRendered = inProgressTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosList = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuid(),
      title: titleInput,
      details: detailsInput,
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    setDetailsInput("");
  }

  // Add Todo when pressing enter
  // window.addEventListener("keyup", (e) => {
  //   if (e.keyCode === 13) {
  //     handleAddClick();
  //   }
  // });

  return (
    <>
      <Container maxWidth="sm">
        <Card className="cardContainer" sx={{ minWidth: 275, maxHeight: "90vh", overflowY: "scroll" }}>
          <CardContent>
            <Typography variant="h2" style={{ color: "#9c27b0" }}>
              Todos
            </Typography>

            <Divider />

            {/* Filter Buttons */}
            <ToggleButtonGroup
              style={{ margin: "15px" }}
              color="primary"
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
            >
              <ToggleButton sx={{ fontSize: "1.5rem" }} value="all">
                All
              </ToggleButton>
              <ToggleButton sx={{ fontSize: "1.5rem" }} value="completed">
                Done
              </ToggleButton>
              <ToggleButton sx={{ fontSize: "1.5rem" }} value="inProgress">
                In Progress...
              </ToggleButton>
            </ToggleButtonGroup>
            {/* Filter Buttons */}

            {/* All Todos */}
            {todosList}
            {/* All Todos */}

            {/* Input + Add button */}

            <Grid container spacing={2}>
              <Grid xs={8}>
                <TextField
                  style={{ width: "100%", margin: "-5px 0 10px" }}
                  id="outlined-basic"
                  label="Todo Title **"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Todo Details"
                  variant="outlined"
                  value={detailsInput}
                  onChange={(e) => {
                    setDetailsInput(e.target.value);
                  }}
                />
              </Grid>

              <Grid
                xs={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  style={{
                    width: "100%",
                    height: "50%",
                    color: "#fff",
                  }}
                  variant="contained"
                  onClick={() => {
                    handleAddClick();
                  }}
                  color="secondary"
                  disabled={titleInput.length === 0}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {/* Input + Add button */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
