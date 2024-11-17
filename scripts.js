document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Chart configurations
    const chartConfig = {
        battery: {
            labels: Array.from({length: 10}, (_, i) => `Point ${i + 1}`),
            data: [89, 71, 93, 79, 84, 96, 89, 75, 95, 96],
            color: '#2563eb'
        },
        temperature: {
            labels: Array.from({length: 10}, (_, i) => `Point ${i + 1}`),
            data: Array.from({length: 10}, () => Math.random() * 10 + 20),
            color: '#dc2626'
        },
        performance: {
            labels: Array.from({length: 10}, (_, i) => `Point ${i + 1}`),
            data: Array.from({length: 10}, () => Math.random() * 20 + 75),
            color: '#16a34a'
        }
    };

    // Create charts
    function createChart(canvasId, config) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: config.labels,
                datasets: [{
                    label: canvasId.replace('Chart', ''),
                    data: config.data,
                    borderColor: config.color,
                    backgroundColor: `${config.color}20`,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Initialize charts
    const batteryChart = createChart('batteryChart', chartConfig.battery);
    const temperatureChart = createChart('temperatureChart', chartConfig.temperature);
    const performanceChart = createChart('performanceChart', chartConfig.performance);

    // Update data periodically
    function updateCharts() {
        const charts = {
            batteryChart: {
                chart: batteryChart,
                config: chartConfig.battery
            },
            temperatureChart: {
                chart: temperatureChart,
                config: chartConfig.temperature
            },
            performanceChart: {
                chart: performanceChart,
                config: chartConfig.performance
            }
        };

        Object.values(charts).forEach(({chart, config}) => {
            config.data.shift();
            config.data.push(Math.random() * (chart === temperatureChart ? 10 : 20) + 
                           (chart === temperatureChart ? 20 : 75));
            chart.data.datasets[0].data = config.data;
            chart.update('none');
        });

        // Update status card values
        document.getElementById('battery-value').textContent = 
            `${Math.round(config.battery.data[config.battery.data.length - 1])}%`;
        document.getElementById('temp-value').textContent = 
            `${config.temperature.data[config.temperature.data.length - 1].toFixed(1)}°C`;
        document.getElementById('performance-value').textContent = 
            `${config.performance.data[config.performance.data.length - 1].toFixed(2)}%`;
    }

    // Update every 3 seconds
    setInterval(updateCharts, 3000);
});