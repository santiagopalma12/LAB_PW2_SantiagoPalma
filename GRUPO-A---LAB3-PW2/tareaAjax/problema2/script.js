document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar datos');
            return response.json();
        })
        .then(data => {
            const excluded = ['Lima', 'Callao'];
            const ctx = document.getElementById('allRegionsChart').getContext('2d');

            let labels = [];
            const datasets = [];

            Object.entries(data).forEach(([region, info]) => {
                if (excluded.includes(region)) return;

                const confirmedArray = info.confirmed.map(point => parseInt(point.value));
                const dates = info.confirmed.map(point => point.date);

                if (labels.length === 0) {
                    labels = dates;
                }

                datasets.push({
                    label: region,
                    data: confirmedArray,
                    borderColor: getRandomColor(),
                    backgroundColor: 'transparent',
                    tension: 0.3,
                    fill: false
                });
            });

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Casos Confirmados por Región (sin Lima y Callao)',
                            font: { size: 16 }
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                boxWidth: 10
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Casos Confirmados'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Fechas'
                            },
                            ticks: {
                                maxTicksLimit: 15
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudieron cargar los datos.');
        });
});

function getRandomColor() {
    const r = Math.floor(Math.random() * 180);
    const g = Math.floor(Math.random() * 180);
    const b = Math.floor(Math.random() * 180);
    return `rgb(${r}, ${g}, ${b})`;
}
