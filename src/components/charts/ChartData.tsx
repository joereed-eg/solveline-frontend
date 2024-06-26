import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        borderColor: string;
        tension: number;
    }[];
}

export default function LineDemo() {
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: []
    });
    const [chartOptions, setChartOptions] = useState<any>({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data: ChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Total allocated amount',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: "#00a05d",
                    tension: 0.4
                },
                {
                    label: 'Amount used by employees',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: "#4186F6",
                    tension: 0.4
                },
                {
                    label: 'Total Available amount.',
                    data: [10, 10, 15, 9, 19, 17, 10],
                    fill: false,
                    borderColor: "#FF5402",
                    tension: 0.4
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card border p-3 rounded-lg chart_height mb-10">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
