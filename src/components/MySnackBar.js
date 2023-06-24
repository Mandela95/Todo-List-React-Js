import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Stack } from "@mui/material";

export default function MySnackBar({ open, message }) {
  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          message="Note archived"
          action={action}
        >
          <Alert severity="success">{message}</Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
