document.addEventListener('DOMContentLoaded', function () {
    let currentChart = null;

    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar datos');
            return response.json();
        })
        .then(dataList => {
            // Convertir la lista en un objeto tipo: { "Ucayali": { confirmed: [...] }, ... }
            const data = {};
            dataList.forEach(regionData => {
                data[regionData.region] = regionData;
            });

            const region1Select = document.getElementById('region1');
            const region2Select = document.getElementById('region2');

            region1Select.innerHTML = '<option value="">Seleccione región 1</option>';
            region2Select.innerHTML = '<option value="">Seleccione región 2</option>';

            Object.keys(data).forEach(region => {
                region1Select.add(new Option(region, region));
                region2Select.add(new Option(region, region));
            });

            document.getElementById('compare-btn').addEventListener('click', function () {
                const region1 = region1Select.value;
                const region2 = region2Select.value;

                if (!region1 || !region2) {
                    alert('⚠️ Debes seleccionar DOS regiones');
                    return;
                }
                if (region1 === region2) {
                    alert('❌ No puedes comparar la misma región');
                    return;
                }

                const ctx = document.getElementById('comparisonChart').getContext('2d');
                if (currentChart) currentChart.destroy();

                // Obtener datos confirmados y fechas
                const confirmed1 = data[region1].confirmed.map(d => parseInt(d.value));
                const confirmed2 = data[region2].confirmed.map(d => parseInt(d.value));
                const fechas = data[region1].confirmed.map(d => d.date); // asumimos mismo orden y fechas

                const chartData = {
                    labels: fechas,
                    datasets: [
                        {
                            label: `Casos en ${region1}`,
                            data: confirmed1,
                            borderColor: '#FF6384',
                            backgroundColor: 'rgba(255, 99, 132, 0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: `Casos en ${region2}`,
                            data: confirmed2,
                            borderColor: '#36A2EB',
                            backgroundColor: 'rgba(54, 162, 235, 0.1)',
                            tension: 0.3,
                            fill: true
                        }
                    ]
                };

                currentChart = new Chart(ctx, {
                    type: 'line',
                    data: chartData,
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: `COVID-19: ${region1} vs ${region2}`,
                                font: { size: 16 }
                            },
                            legend: { position: 'top' }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: { display: true, text: 'Casos confirmados' }
                            },
                            x: {
                                title: { display: true, text: 'Fechas' }
                            }
                        }
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudieron cargar los datos. Intenta más tarde.');
        });
});
