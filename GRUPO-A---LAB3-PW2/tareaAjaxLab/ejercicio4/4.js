google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const arequipa = data.find(region => region.region === 'Arequipa');
            const rows = [['Fecha', 'Confirmados']];

            arequipa.confirmed.forEach(entry => {
                rows.push([entry.date, parseInt(entry.value)]);
            });

            const dataTable = google.visualization.arrayToDataTable(rows);

            const options = {
                title: 'Evolución de Casos Confirmados en Arequipa',
                curveType: 'function',
                legend: { position: 'bottom' }
            };

            const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(dataTable, options);
        })
        .catch(error => console.error('Error al cargar data.json:', error));
}
