import { useContext, useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie } from "recharts";
import { DataContext } from "../../Context";
import { useTheme } from "@mui/material";

function TopicPieChart() {
  const theme = useTheme();
  const { topicFrequency } = useContext(DataContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    let temp = [];
    Object.keys(topicFrequency).forEach((key) => {
      if (topicFrequency[key] > 0) {
        temp.push({ y: topicFrequency[key], name: key });
      }
    });
    setData(temp);
  }, [topicFrequency]);
  console.log("PIE:", data);
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart height="100%" width="100%">
          <Pie
            data={data}
            dataKey="y"
            nameKey="name"
            cx="50%"
            cy="50%"
            // outerRadius={50}
            // fill={theme.palette.text.primary}
            label={(entry) =>
              entry.name + " : " + ((entry.y / 360) * 100)?.toFixed(2) + "%"
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
