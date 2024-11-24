import { Card, CardContent } from "@mui/material";
import Stack from "@mui/material/Stack";
import LineQueryLength from "./GraphComponent/LineQueryLength";
import ResponseTime from "./GraphComponent/ResponseTime";

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
          <CardContent>
            <ResponseTime />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <LineQueryLength />
          </CardContent>
        </Card>
        <Card>
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
