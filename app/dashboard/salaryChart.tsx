import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalaryChart: React.FC = () => {
  const data = {
    labels: ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance'],
    datasets: [
      {
        label: 'Average Salary (IDR)',
        data: [6000000, 5400000, 8000000, 7000000, 6500000],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
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
        text: 'Average Salary by Department',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalaryChart;