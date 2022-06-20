import "./chart.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Chart = ({ aspect, title }) => {
  const [statistic, setStatistic] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/statistic`).then((res) => {
      console.log("res statistic", res.data);
      setStatistic(res.data);
      setList(res.data);
    });
  }, []);
  const data = [
    { name: "Người dùng thành viên", users: statistic.user },
    { name: "Người chia sẻ khóa học", users: statistic.sharers },
  ];

  const dataList = [
    { name: "Toàn bộ khóa học", lists: list.listAll },
    { name: "Khóa học đã duyệt", lists: list.listAccept },
    { name: "Khóa học từ chối", lists: list.listRefuse },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Thống kê người dùng</h1>
      <div className="App">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={27}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
      <h1>Thống kê Khóa học</h1>
      <div className="App">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="lists"
            isAnimationActive={false}
            data={dataList}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={dataList}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={27}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="lists" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};

export default Chart;
