import React from 'react';
import { Bar } from 'react-chartjs-2';
import { LinearScale, Chart, CategoryScale, BarElement } from 'chart.js';

const BarChart = ({ tiktokers }) => {
    Chart.register(LinearScale, CategoryScale, BarElement);
    const tiktokerNames = tiktokers.map(tiktoker => tiktoker.name);
    const tiktokerSales = tiktokers.map(tiktoker => tiktoker.numOrders);

    const data = {
        labels: tiktokerNames,
        datasets: [
        {
            label: 'Example Dataset',
            backgroundColor: 'rgba(254, 44, 85, 0.6)',
            borderColor: 'rgba(254, 44, 85, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(254, 44, 85, 0.8)',
            hoverBorderColor: 'rgba(254, 44, 85, 1)',
            data: tiktokerSales,
        },
        ],
    };

    const options = {
        scales: {
        y: {
            beginAtZero: true,
        },
        },
    };

  return <Bar data={data} options={options} />;
};

export default BarChart;
