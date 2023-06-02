import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

export default function Icons() {
  return (
    <>
      <Stack
        style={{margin: "10px",justifyContent: "center"}}
        direction="row" spacing={2}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Stack>
    </>
  );
}
