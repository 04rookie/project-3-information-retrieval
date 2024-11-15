import { Card, CardContent } from "@mui/material";
import Stack from "@mui/material/Stack";
import LineQueryLength from "./GraphComponent/LineQueryLength";

function Graphs() {
  return (
    <div style={{ width: "100%", height: "100%", margin: "10%" }}>
      <Stack spacing={2} style={{ marginRight: "10%" }}>
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
