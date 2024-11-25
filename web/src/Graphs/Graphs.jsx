import { Card, CardContent, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import LineQueryLength from "./GraphComponent/LineQueryLength";
import ResponseTime from "./GraphComponent/ResponseTime";
import TopicPieChart from "./GraphComponent/TopicPieChart";

function Graphs() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        spacing={2}
        style={{
          marginRight: "2%",
          marginLeft: "5%",
          marginTop: "6%",
          marginBottom: "6%",
        }}
      >
        <Card>
          <div style={{ marginLeft: "9%", marginTop: "2%" }}>
            <Typography variant="h6">Response Time</Typography>
          </div>
          <CardContent>
            <ResponseTime />
          </CardContent>
        </Card>
        <Card>
          <div style={{ marginLeft: "9%", marginTop: "2%" }}>
            <Typography variant="h6">Topic Distribution</Typography>
          </div>
          <CardContent>
            <TopicPieChart />
          </CardContent>
        </Card>
        <Card>
          <div style={{ marginLeft: "9%", marginTop: "2%" }}>
            <Typography variant="h6">Query Length Over Time</Typography>
          </div>
          <CardContent>
            <LineQueryLength />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <LineQueryLength />
          </CardContent>
        </Card>
      </Stack>
    </div>
  );
}

export default Graphs;
