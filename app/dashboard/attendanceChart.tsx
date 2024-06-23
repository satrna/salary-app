import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceChart: React.FC = () => {
  const data = {
    labels: ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance'],
    datasets: [
      {
        label: 'Attendance (%)',
        data: [90, 85, 92, 88, 91],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Attendance Rate by Department',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
        title: {
          display: true,
          text: 'Attendance (%)',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AttendanceChart;
