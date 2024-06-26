import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        data: number[];
    }[];
}

interface ChartOptions {
    maintainAspectRatio: boolean;
    aspectRatio: number;
    plugins: {
        legend: {
            labels: {
                fontColor: string;
            };
        };
    };
    scales: {
        x: {
            ticks: {
                color: string;
                font: {
                    weight: number;
                };
            };
            grid: {
                display: boolean;
                drawBorder: boolean;
            };
        };
        y: {
            ticks: {
                color: string;
            };
            grid: {
                color: string;
                drawBorder: boolean;
            };
        };
    };
}

export default function VerticalBarDemo() {
    const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });
    const [chartOptions, setChartOptions] = useState<ChartOptions>({
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    fontColor: ''
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '',
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: ''
                },
                grid: {
                    color: '',
                    drawBorder: false
                }
            }
        }
    });

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data: ChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Employees',
                    backgroundColor: "#00a05d",
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Deactivated Employees',
                    backgroundColor: "#FF5402",
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [10, 5, 3, 1, 3, 6, 10]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: "#4186F6",
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        const options: ChartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card border p-2 rounded-lg ">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
