import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  apiUrl: string;
};

const COLORS = ["#7AD3FF", "#f0f0f0"];

const ProgressPieChart: React.FC<Props> = ({ apiUrl }) => {
  const [progress, setProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        const percentage = res.data?.[0]?.progress ?? 0;
        setProgress(percentage);
      })
      .catch((err) => {
        console.error("خطا در دریافت اطلاعات چارت:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (progress === null) return <div>داده‌ای برای نمایش وجود ندارد.</div>;

  const data = [
    { name: "انجام شده", value: progress },
    { name: "باقی‌مانده", value: 100 - progress },
  ];

  return (
    <div style={{ width: "100%", height: 210, textAlign: "center" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div
        style={{
          marginTop: -130,
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#7AD3FF",
          fontFamily: "Vazir",
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressPieChart;
