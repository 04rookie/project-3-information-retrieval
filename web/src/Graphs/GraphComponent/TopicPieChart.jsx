import { useContext, useEffect, useRef, useState } from "react";
import { ResponsiveContainer, PieChart, Pie } from "recharts";
import { DataContext } from "../../Context";
import { useTheme } from "@mui/material";

function TopicPieChart() {
  const { topicFrequency } = useContext(DataContext);
  const [data, setData] = useState({
    total: 0,
    data: [],
  });
  useEffect(() => {
    let temp = [];
    let total = 0;
    Object.keys(topicFrequency).forEach((key) => {
      if (topicFrequency[key] > 0) {
        total += topicFrequency[key];
        temp.push({ y: topicFrequency[key], name: key });
      }
    });
    setData({ total: total, data: temp });
  }, [topicFrequency]);
  // console.log("PIE:", data);
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart height="100%" width="100%">
          <Pie
            data={data.data}
            dataKey="y"
            nameKey="name"
            cx="50%"
            cy="50%"
            // outerRadius={50}
            // fill={theme.palette.text.primary}
            label={(entry) =>
              entry.name +
              " : " +
              ((entry.value / data.total) * 100)?.toFixed(2) +
              "%"
            }
          />
          {/* <Pie
            data={data02}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopicPieChart;
