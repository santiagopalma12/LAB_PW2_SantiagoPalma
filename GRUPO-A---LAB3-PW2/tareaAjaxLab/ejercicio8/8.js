google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const regionesFiltradas = data.filter(r =>
                r.region !== "Lima" && r.region !== "Callao"
            );

            const fechas = regionesFiltradas[0].confirmed.map(d => d.date);
            const tabla = [ ['Fecha', ...regionesFiltradas.map(r => r.region)] ];

            for (let i = 0; i < fechas.length; i++) {
                const fila = [ fechas[i] ];
                for (let region of regionesFiltradas) {
                    const valor = region.confirmed[i]?.value || "0";
                    fila.push(Number(valor));
                }
                tabla.push(fila);
            }

            const dataTable = google.visualization.arrayToDataTable(tabla);
            const options = {
                title: 'Crecimiento de casos confirmados por día (sin Lima y Callao)',
                hAxis: { title: 'Fecha' },
                vAxis: { title: 'Confirmados' },
                curveType: 'function',
                legend: { position: 'right' }
            };

            const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(dataTable, options);
        });
}
