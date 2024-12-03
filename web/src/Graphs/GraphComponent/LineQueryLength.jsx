import { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { DataContext } from "../../Context";

function LineQueryLength() {
  const { chat } = useContext(DataContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    let temp = [];
    chat.forEach((msg, index) => {
      temp.push({ y: msg?.message?.split(" ").length, name: index + 1 });
    });
    setData(temp);
  }, [chat]);
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          // width={730}
          // height={250}
          data={data}
          // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="Query Number" offset={-9} position="bottom" />
          </XAxis>
          <YAxis>
            <Label value="Query Length" offset={-9} position="left" angle={-90}/>
          </YAxis>
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="y"
            stroke="#8884d8"
            label="Query Length"
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineQueryLength;
