google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const regiones = ['Arequipa', 'Cusco', 'Puno', 'Moquegua'];
            const fechas = data[0].confirmed.map(entry => entry.date);
            const rows = [ ['Fecha', ...regiones] ];

            for (let i = 0; i < fechas.length; i++) {
                const row = [fechas[i]];
                for (const region of regiones) {
                    const regionData = data.find(r => r.region === region);
                    const valor = regionData ? parseInt(regionData.confirmed[i].value) : 0;
                    row.push(valor);
                }
                rows.push(row);
            }

            const dataTable = google.visualization.arrayToDataTable(rows);

            const options = {
                title: 'Comparación de Casos Confirmados entre Regiones',
                curveType: 'function',
                legend: { position: 'bottom' }
            };

            const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(dataTable, options);
        })
        .catch(error => console.error('Error al cargar data.json:', error));
}
