google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const chartData = [['Región', 'Casos confirmados']];

            data.forEach(region => {
                const confirmed = region.confirmed;
                const total = confirmed.length > 0 ? parseInt(confirmed[confirmed.length - 1].value) : 0;
                chartData.push([region.region, total]);
            });

            const dataTable = google.visualization.arrayToDataTable(chartData);
            const options = {
                title: 'Total de casos confirmados por región',
                hAxis: { title: 'Región' },
                vAxis: { title: 'Casos confirmados' },
                legend: 'none'
            };

            const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(dataTable, options);
        });
}
