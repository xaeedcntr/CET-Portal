import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const Linechart = () => {
  const labels = getLastYearMonth();
  const data = {
    labels,
    datasets: [
      {
        label: 'views',
        data: [1, 2, 3, 4,5,6,7,8,9,10,11],
        borderColor: 'rgba(107,70,193,0.5)',
        backgroundColor: '#6b46c1',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'yearly Views',
      },
    },
  };
  return <Line options={options} data={data} />;
};
export const Doughnutchart = () => {
  const data = {
    labels: ['Enrolled', 'Not Enrolled'],
    datasets: [
      {
        label: 'views',
        data: [12, 40],
        borderColor: ['rgb(62,12,171)', 'rgba(214,43,129)'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3)'],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

function getLastYearMonth() {
  const labels = [];

  const months = [
    'january',
    'febraury',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  const currentmonth = new Date().getMonth();
  const remain=11-currentmonth;

  for(let i =currentmonth ; i<months.length; i++){
    const element = months[i];
    labels.unshift(element);
    if(i===0) break;
    
  }

  for(let i =11 ; i<remain; i--){
    if(i===currentmonth) break;
    const element = months[i];
    labels.unshift(element);  
  }
return labels
  
}
