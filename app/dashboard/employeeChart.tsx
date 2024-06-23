import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeChart: React.FC = () => {
  const data = {
    labels: ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance'],
    datasets: [
      {
        label: 'Number of Employees',
        data: [10, 50, 30, 20, 15],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
        text: 'Total Number of Employees by Department',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default EmployeeChart;
