/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
// components
import Todo from "./Todo";
// Others
import { TodosContext } from "../contexts/TodosContext";
import { ToastContext } from "../contexts/ToastContext";
import { useState, useContext, useEffect, useMemo } from "react";
import { v4 as uuid } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useContext(ToastContext);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");

  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // filteration arrays
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const inProgressTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "inProgress") {
    todosToBeRendered = inProgressTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  // HANDLERS
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
    showHideToast("New To-Do Added Successfully");
  }

  // update

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === dialogTodo.id) {
        return { ...t, title: dialogTodo.title, details: dialogTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    // add changes to local storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // delete

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== dialogTodo.id;
    });
    setTodos(updatedTodos);
    // add changes to local storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteDialog(false);
  }

  const todosList = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });

  return (
    <>
      {/* Edit Dialog */}
      <Dialog open={showUpdateDialog} onClose={handleUpdateDialogClose}>
        <DialogTitle id="alert-dialog-title">{"Update Todo"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Update Todo Title"
            fullWidth
            variant="standard"
            // value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Update Todo Details"
            fullWidth
            variant="standard"
            // value={dialogTodo.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Close</Button>
          <Button onClick={handleUpdateConfirm}>Update</Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog */}

      {/* Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this Todo ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can't undone this...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button style={{ color: "red" }} onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}

      <Container maxWidth="sm">
        <Card
          className="cardContainer"
          sx={{ minWidth: 275, maxHeight: "90vh", overflowY: "scroll" }}
        >
          <CardContent>
            <Typography className="todoTitle" variant="h2">
              To-Do
            </Typography>

            <Divider />

            {/* Filter Buttons */}
            <ToggleButtonGroup
              style={{ margin: "10px" }}
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
            >
              <ToggleButton
                className="toggleBtn"
                sx={{ fontSize: "1.5rem" }}
                value="all"
              >
                All
              </ToggleButton>
              <ToggleButton
                className="toggleBtn"
                sx={{ fontSize: "1.5rem" }}
                value="completed"
              >
                Done
              </ToggleButton>
              <ToggleButton
                className="toggleBtn"
                sx={{ fontSize: "1.5rem" }}
                value="inProgress"
              >
                In Progress
              </ToggleButton>
            </ToggleButtonGroup>
            {/* Filter Buttons */}

            {/* All Todos */}
            {todosList.length >= 1 ? todosList : <p>There's nothing to show</p>}
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
                  disabled={titleInput.trim() === ""}
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

// Add Todo when pressing enter
// window.addEventListener("keyup", (e) => {
//   if (e.keyCode === 13) {
//     handleAddClick();
//   }
// });
