import { Button, Grid2 } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Display from "./Display";
import SendIcon from "@mui/icons-material/Send";
function ChatWindow() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        djsplay: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "80%",
          margin: "10%",
          border: "1px solid",
          borderColor: "white",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flexGrow: "1" }}>
          <Display />
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <div style={{width: "100%", padding: '10px'}}>
            <OutlinedInput fullWidth={true} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Button variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
