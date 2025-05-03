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

            // El gráfico se genera en la siguiente parte...
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudieron cargar los datos.');
        });
});
