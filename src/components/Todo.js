import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import IconButton from "@mui/material/IconButton";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";

// Dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default function Todo({ todo, handleCheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);

  // Event Handlers
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    // add changes to local storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // delete
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    // add changes to local storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // update
  function handleUpdateClick() {
    setShowUpdateDialog(true);
    updatedTodo.details = todo.details;
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
    updatedTodo.title = todo.title;
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    // add changes to local storage
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // Event Handlers

  return (
    <>
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
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Update Todo Details"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Close</Button>
          <Button
            style={{ color: "blue" }}
            onClick={handleUpdateConfirm}
            disabled={updatedTodo.title.length === 0}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h6"
                sx={{
                  wordWrap: "break-word",
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "left",
                  padding: "5px",
                  borderRadius: "4px",
                  wordWrap: "break-word",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>

            {/* Action Buttons */}
            <Grid
              className="card"
              xs={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Done button */}
              <IconButton
                className="iconButton"
                title="Done"
                style={{
                  color: todo.isCompleted ? "#fff" : "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "#fff",
                  border: "3px solid #8bc34a",
                }}
                onClick={() => {
                  handleCheckClick();
                }}
              >
                <DoneOutlineIcon />
              </IconButton>
              {/* Done button */}

              {/* Update button */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                title="Edit"
                style={{
                  color: "#1769aa",
                  backgroundColor: "#fff",
                  border: "3px solid #1769aa",
                  margin: "3px",
                }}
              >
                <EditIcon />
              </IconButton>
              {/* Update button */}

              {/* Delete icon */}
              <IconButton
                className="iconButton"
                title="Delete"
                style={{
                  color: "#b23c17",
                  backgroundColor: "#fff",
                  border: "3px solid #b23c17",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
              {/* Delete icon */}
            </Grid>
            {/* Action Buttons */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
