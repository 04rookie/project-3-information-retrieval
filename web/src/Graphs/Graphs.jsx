import { Card, CardContent } from "@mui/material";
import Stack from "@mui/material/Stack";

function Graphs() {
  return (
    <div style={{ width: "100%", height: "100%", margin: "10%" }}>
      <Stack spacing={2} style={{ marginRight: "10%" }}>
        <Card>
          <CardContent></CardContent>
        </Card>
        <div>Item 1</div>
        <div>Item 1</div>
        <div>Item 1</div>
      </Stack>
    </div>
  );
}

export default Graphs;
