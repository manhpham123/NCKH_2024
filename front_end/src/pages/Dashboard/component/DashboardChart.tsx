import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, LineElement, ChartData, PointElement, LinearScale, CategoryScale, ChartDataset, BarElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Space, Typography } from 'antd';
import './style.scss'
import {useStaticService,useStaticProtocol } from "../../../utils/request/index";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, BarElement)
function DashboardChart() {
const {data,mutate} =  useStaticService(); 

const {data:datapie} =  useStaticProtocol();

    const mockDataService = [
        {
            name: 'DNS',
            data: data?.DNS,
        },
        {
            name: 'HTTPS',
            data: data?.HTTPS,
        },
        {
            name: 'SSH',
            data: data?.SSH,
        },
        {
            name: 'HTTP',
            data: data?.HTTP,
        },
        // {
        //     name: 'Khac',
        //     data: data?.Unknown,
        // }
    ]
    const listServices = {
        labels: mockDataService.map(item => item.name),
        datasets: [
            {
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
    //=================== BAT DAU BIEU DO TRON========
    const dataPieChart = {
        labels: ['TCP', 'UDP'],
        datasets: [
            {
                data: [datapie?.TCP, datapie?.UDP],
               // data: [100, 50],
               // backgroundColor: ['aqua', 'orange']
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }
        ],

    }
 
      const optionsPie = {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: 'thong ke giao thuc',
        },
      };
     
    //================ KET THUC BIEU DO TRON==============

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

                <Pie
                    data={dataPieChart}
                    options={optionsPie}
                    className='chart-content'
                />

                <Typography className='chart-title'>thong ke dich vu</Typography>
                <Bar data={listServices} options={optionsBar} />
                <h1>tong so</h1>
            </div>
            {/* <div className='chart-item'>
                <Typography className='chart-title'>Number of access</Typography>
                <Line data={dataLineChart} options={optionsLine} className='chart-content' />
            </div> */}
        </Space>
    );
}

export default DashboardChart