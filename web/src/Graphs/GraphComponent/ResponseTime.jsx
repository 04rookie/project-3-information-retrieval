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

function ResponseTime() {
  const { chat } = useContext(DataContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    let temp = [];
    let count = 1;
    if (chat.length > 1 && chat[chat.length - 1].sender == "bot") {
      for (let i = 1; i < chat.length - 1; i += 2) {
        temp.push({
          y: chat[i + 1].time.diff(chat[i].time).toMillis(),
          name: count,
        });
        count++;
      }
      setData(temp);
    }
    console.log(temp);
    console.log(chat.length);
    console.log(chat);
    // chat.forEach((msg, index) => {
    //   temp.push({ y: msg.message.split(" ").length, name: index });
    // });
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
          <YAxis
          // label={{
          //   value: "Response Time (Milliseconds)",
          //   angle: -90,
          //   position: "insideLeft",
          // }}
          >
            <Label
              textAnchor="middle"
              value="Response Time"
              offset={-10}
              // position="insideLeft"
              position="left"
              angle={-90}
            />
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

export default ResponseTime;
