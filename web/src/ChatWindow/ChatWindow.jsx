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
// import { moment } from "moment";
function ChatWindow() {
  const [currentMessage, setCurrentMessage] = useState("");
  const { chat, setChat } = useContext(DataContext);
  const { filter, setFilter } = useContext(DataContext);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        djsplay: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "20%",
          marginTop: "6%",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <Card>
          <CardContent>
            <Grid2 container spacing={0}>
              <Grid2 item size={{ xs: 3, md: 3 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={filter.health}
                    onChange={(e) =>
                      setFilter({ ...filter, health: e.target.checked })
                    }
                  />
                  <Typography variant="body1">Health</Typography>
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 4, md: 4 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={filter.environment}
                    onChange={(e) =>
                      setFilter({ ...filter, environment: e.target.checked })
                    }
                  />
                  <Typography variant="body1">Environment</Typography>
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 3, md: 3 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={filter.technology}
                    onChange={(e) =>
                      setFilter({ ...filter, technology: e.target.checked })
                    }
                  />
                  <Typography variant="body1">Technology</Typography>
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 3, md: 3 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={filter.economy}
                    onChange={(e) =>
                      setFilter({ ...filter, economy: e.target.checked })
                    }
                  />
                  <Typography variant="body1">Economy</Typography>
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 4, md: 4 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={filter.entertainment}
                    onChange={(e) =>
                      setFilter({ ...filter, entertainment: e.target.checked })
                    }
                  />
                  <Typography variant="body1">Entertainment</Typography>
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 3, md: 3 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={filter.sports}
                    onChange={(e) =>
                      setFilter({ ...filter, sports: e.target.checked })
                    }
                  />
                  <Typography variant="body1">Sports</Typography>
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 3, md: 3 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={filter.politics}
                    onChange={(e) =>
                      setFilter({ ...filter, politics: e.target.checked })
                    }
                  />
                  <Typography variant="body1">Politics</Typography>
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 3, md: 3 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={filter.education}
                    onChange={(e) =>
                      setFilter({ ...filter, education: e.target.checked })
                    }
                  />
                  <Typography variant="body1">Education</Typography>
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 3, md: 3 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={filter.travel}
                    onChange={(e) =>
                      setFilter({ ...filter, travel: e.target.checked })
                    }
                  />
                  <Typography variant="body1">Travel</Typography>
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 3, md: 3 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={filter.food}
                    onChange={(e) =>
                      setFilter({ ...filter, food: e.target.checked })
                    }
                  />
                  <Typography variant="body1">Food</Typography>
                </div>
              </Grid2>
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
                setChat([
                  ...chat,
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
