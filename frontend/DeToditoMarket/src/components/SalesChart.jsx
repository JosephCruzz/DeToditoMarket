import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './SalesChart.css';

const SalesChart = () => {
  const data = [
    { day: 'Mon', ventas: 60 },
    { day: 'Tue', ventas: 45 },
    { day: 'Wed', ventas: 70 },
    { day: 'Thu', ventas: 55 },
    { day: 'Fri', ventas: 85 },
    { day: 'Sat', ventas: 75 },
    { day: 'Sun', ventas: 65 },
  ];

  return (
    <div className="sales-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="day"
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#E0E0E0' }}
          />
          <YAxis
            tick={{ fill: '#666', fontSize: 12 }}
            axisLine={{ stroke: '#E0E0E0' }}
            label={{ value: 'Numero de Artículos', angle: -90, position: 'insideLeft', fill: '#666', fontSize: 12 }}
          />
          <Bar
            dataKey="ventas"
            fill="#85C88A"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-footer">
        <span className="chart-label">Days of Week</span>
      </div>
    </div>
  );
};

export default SalesChart;
