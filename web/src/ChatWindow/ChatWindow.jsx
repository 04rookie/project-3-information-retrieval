import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid2,
  Typography,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Display from "./Display";
import SendIcon from "@mui/icons-material/Send";
import { useContext, useState } from "react";
import { DataContext } from "../Context";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

// import { moment } from "moment";
function ChatWindow() {
  const [currentMessage, setCurrentMessage] = useState("");
  const { chat, setChat } = useContext(DataContext);
  const { filter, setFilter } = useContext(DataContext);
  const { topicUpdated } = useContext(DataContext);
  const { postMessage } = useContext(DataContext);
  const { showLoading } = useContext(DataContext);
  const gridData = [
    { xs: 6, sm: 6, md: 2, name: "Health", hook: filter.Health },
    { xs: 6, sm: 6, md: 3, name: "Environment", hook: filter.Environment },
    { xs: 6, sm: 6, md: 3, name: "Technology", hook: filter.Technology },
    { xs: 6, sm: 6, md: 2, name: "Food", hook: filter.Food },
    { xs: 6, sm: 6, md: 2, name: "Economy", hook: filter.Economy },
    { xs: 6, sm: 6, md: 3, name: "Entertainment", hook: filter.Entertainment },
    { xs: 6, sm: 6, md: 2, name: "Sports", hook: filter.Sports },
    { xs: 6, sm: 6, md: 2, name: "Politics", hook: filter.Politics },
    { xs: 6, sm: 6, md: 3, name: "Education", hook: filter.Education },
    { xs: 6, sm: 6, md: 2, name: "Travel", hook: filter.Travel },
  ];

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        djsplay: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        // overflowY: "auto",
      }}
    >
      <div
        style={{
          height: "20%",
          marginTop: "6%",
          marginLeft: "5%",
          marginRight: "5%",
          // overflowY: "clip",
          maxHeight: "20%",
          overflowY: "auto",
        }}
      >
        <Card>
          <CardContent>
            <Grid2 container spacing={0}>
              {gridData.map((data) => {
                return (
                  <Grid2
                    size={{ xs: data.xs, sm: data.sm, md: data.md }}
                    key={uuidv4()}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        size="small"
                        checked={data.hook}
                        onChange={(e) => {
                          topicUpdated.current = true;
                          setFilter({
                            ...filter,
                            [data.name]: e.target.checked,
                          });
                        }}
                      />
                      <Typography variant="body2">{data.name}</Typography>
                    </div>
                  </Grid2>
                );
              })}
            </Grid2>
          </CardContent>
        </Card>
      </div>
      <div
        style={{
          height: "60%",
          marginTop: "5%",
          marginRight: "10%",
          marginLeft: "10%",
          marginBottom: "10%",
          border: "1px solid",
          borderColor: "white",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flexGrow: "1" }}>
          <Display message={chat} />
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <div style={{ width: "100%", padding: "10px" }}>
            <OutlinedInput
              onKeyDown={(e) => {
                if (showLoading == false && e.key === "Enter") {
                  postMessage({ message: currentMessage });
                  setChat((prev) => [
                    ...prev,
                    {
                      message: currentMessage,
                      sender: "user",
                      time: DateTime.now(),
                    },
                  ]);
                  setCurrentMessage("");
                }
              }}
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
              disabled={showLoading}
              onClick={() => {
                postMessage({ message: currentMessage });
                setChat((prev) => [
                  ...prev,
                  {
                    message: currentMessage,
                    sender: "user",
                    time: DateTime.now(),
                  },
                ]);
                setCurrentMessage("");
              }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              {showLoading ? "Loading..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
