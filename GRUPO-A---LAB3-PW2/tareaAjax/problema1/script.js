document.addEventListener('DOMContentLoaded', function() {
    fetch('../data.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar datos');
            return response.json();
        })
        .then(data => {
            const region1Select = document.getElementById('region1');
            const region2Select = document.getElementById('region2');

            region1Select.innerHTML = '<option value="">Seleccione región 1</option>';
            region2Select.innerHTML = '<option value="">Seleccione región 2</option>';

            Object.keys(data).forEach(region => {
                region1Select.add(new Option(region, region));
                region2Select.add(new Option(region, region));
            });

            document.getElementById('compare-btn').addEventListener('click', function() {
                const region1 = region1Select.value;
                const region2 = region2Select.value;

                if (!region1 || !region2 || region1 === region2) return;

                const ctx = document.getElementById('comparisonChart').getContext('2d');
                const chartData = {
                    labels: Object.keys(data[region1].confirmed),
                    datasets: [
                        {
                            label: region1,
                            data: Object.values(data[region1].confirmed),
                            borderColor: '#FF6384',
                            backgroundColor: 'rgba(255, 99, 132, 0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: region2,
                            data: Object.values(data[region2].confirmed),
                            borderColor: '#36A2EB',
                            backgroundColor: 'rgba(54, 162, 235, 0.1)',
                            tension: 0.3,
                            fill: true
                        }
                    ]
                };

                new Chart(ctx, {
                    type: 'line',
                    data: chartData
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudieron cargar los datos. Intenta más tarde.');
        });
});
