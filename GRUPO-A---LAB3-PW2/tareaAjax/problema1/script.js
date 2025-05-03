document.addEventListener('DOMContentLoaded', function () {
    let currentChart = null; // 🟡 Para evitar múltiples gráficos superpuestos

    // 1. Cargar datos
    fetch('../data.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar datos');
            return response.json();
        })
        .then(data => {
            // 2. Llenar selectores
            const region1Select = document.getElementById('region1');
            const region2Select = document.getElementById('region2');

            region1Select.innerHTML = '<option value="">Seleccione región 1</option>';
            region2Select.innerHTML = '<option value="">Seleccione región 2</option>';

            Object.keys(data).forEach(region => {
                region1Select.add(new Option(region, region));
                region2Select.add(new Option(region, region));
            });

            // 3. Evento y gráfico
            document.getElementById('compare-btn').addEventListener('click', function () {
                const region1 = region1Select.value;
                const region2 = region2Select.value;

                // 3.1 Validaciones
                if (!region1 || !region2) {
                    alert('⚠️ Debes seleccionar DOS regiones');
                    return;
                }
                if (region1 === region2) {
                    alert('❌ No puedes comparar la misma región');
                    return;
                }

                // 4. Configurar gráfico
                const ctx = document.getElementById('comparisonChart').getContext('2d');

                // 🔄 Destruir gráfico anterior si existe
                if (currentChart) {
                    currentChart.destroy();
                }

                const chartData = {
                    labels: Object.keys(data[region1].confirmed),
                    datasets: [
                        {
                            label: `Casos en ${region1}`,
                            data: Object.values(data[region1].confirmed),
                            borderColor: '#FF6384',
                            backgroundColor: 'rgba(255, 99, 132, 0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: `Casos en ${region2}`,
                            data: Object.values(data[region2].confirmed),
                            borderColor: '#36A2EB',
                            backgroundColor: 'rgba(54, 162, 235, 0.1)',
                            tension: 0.3,
                            fill: true
                        }
                    ]
                };

                // 5. Crear gráfico
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
