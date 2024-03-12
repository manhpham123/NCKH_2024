import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, LineElement, ChartData, PointElement, LinearScale, CategoryScale, ChartDataset, BarElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Space, Typography } from 'antd';
import './style.scss'

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement)
function DashboardChart() {
    const mockDataService = [
        {
            name: 'Service 1',
            data: 50,
        },
        {
            name: 'Service 2',
            data: 40,
        },
        {
            name: 'Service 3',
            data: 35,
        },
        {
            name: 'Service 4',
            data: 30,
        },
        {
            name: 'Service 5',
            data: 28,
        }
    ]
    const listServices = {
        labels: mockDataService.map(item => item.name),
        datasets: [
            {
                label: 'Top service',
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255,99,132,0.4)', 'rgba(255,205,86,0.4)', 'rgba(54,162,235,0.4)', 'rgba(153,102,255,0.4)'],
                borderWidth: 1,
                hoverBackgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(255,205,86,0.6)', 'rgba(54,162,235,0.6)', 'rgba(153,102,255,0.6)'],
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: mockDataService.map(item => item.data),
            },
        ],
    };

    const optionsBar: any = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    const dataPieChart = {
        labels: ['Quang Huy', 'Dang Duong', 'Hoang Dat'],
        datasets: [
            {
                data: [3, 6, 9],
                backgroundColor: ['aqua', 'orange', 'purple']
            }
        ],

    }
    const dataLineChart: any = {
        labels: ['0.00-3.00', '3.00-6.00', '6.00-9.00', '9.00-12.00', '12.00-15.00', '15.00-18.00', '18.00-21.00','21.00-24.00'],
        datasets: [
            {
                label: 'safe',
                data: [20, 6, 9, 12, 5, 18, 50, 30],
                borderColor: '#52c41a',
                backgroundColor: '#52c41a',
                borderWidth: 1,
                fill: true,
                pointBorderColor: 'green',
            },
            {
                label: 'dangerous',
                data: [2, 1, 0, 3, 2, 3, 4, 10],
                borderColor: 'rgba(255, 99, 132, 1)', 
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
                fill: true,
                pointBorderColor: 'red',
            }
        ]
    }
    const optionsLine: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        }
    }


    return (
        <Space className='chart-wrapper'>
            <div className='chart-item'>
                {/* <Pie
                    data={dataPieChart}
                    options={options}
                    className='chart-content'
                /> */}
                <Typography className='chart-title'>Top services</Typography>
                <Bar data={listServices} options={optionsBar} />
            </div>
            <div className='chart-item'>
                <Typography className='chart-title'>Number of access</Typography>
                <Line data={dataLineChart} options={optionsLine} className='chart-content' />
            </div>
        </Space>
    );
}

export default DashboardChart