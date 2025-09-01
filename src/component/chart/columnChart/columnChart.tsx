import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  apiUrl: string;
};

const ProgressColumnChart: React.FC<Props> = ({ apiUrl }) => {
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
    { name: "پیشرفت", value: progress },
    { name: "باقی‌مانده", value: 100 - progress },
  ];

  return (
    <div style={{ width: "100%", height: 210, fontFamily: "Vazir" }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="value" fill="#7AD3FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressColumnChart;
