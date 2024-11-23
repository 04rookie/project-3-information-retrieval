import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
function Display({ message }) {
  return (
    <div
    // 96 englewood
      style={{
        // border: "1px solid",
        height: "50vh",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {message.map((msg) => {
        return (
          <div
            style={{
              padding: "10px",
            }}
            key={msg}
          >
            <Card>
              <CardContent>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <div>
                    <Typography variant="h6">
                      {msg.sender == "user" ? "You" : "IR"}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption">{"16:00"}</Typography>
                  </div>
                </div>
                <div><Typography variant="body1">{msg.message}</Typography></div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

Display.propTypes = {
  message: PropTypes.array.isRequired,
};

export default Display;
