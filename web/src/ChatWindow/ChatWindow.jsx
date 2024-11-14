import { Button } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Display from "./Display";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
// import { moment } from "moment";
function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
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
          <Display message={messages} />
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "100%", padding: "10px" }}>
            <OutlinedInput
              fullWidth={true}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Button
              onClick={() => {
                setMessages([
                  ...messages,
                  {
                    message: currentMessage,
                    sender: "user",
                    // time: moment().format("HH:mm:ss"),
                  },
                ]);
                setCurrentMessage("");
              }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
