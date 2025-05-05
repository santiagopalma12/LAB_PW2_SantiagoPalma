google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(loadRegions);

let allData = [];

function loadRegions() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            allData = data;
            const region1 = document.getElementById("region1");
            const region2 = document.getElementById("region2");

            data.forEach(region => {
                const option1 = document.createElement("option");
                option1.value = region.region;
                option1.text = region.region;
                region1.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = region.region;
                option2.text = region.region;
                region2.appendChild(option2);
            });
        });
}

function drawChart() {
    const r1 = document.getElementById("region1").value;
    const r2 = document.getElementById("region2").value;

    const data1 = allData.find(r => r.region === r1);
    const data2 = allData.find(r => r.region === r2);

    if (!data1 || !data2) return;

    const dates = data1.confirmed.map(p => p.date);
    const values1 = data1.confirmed.map(p => parseInt(p.value));
    const values2 = data2.confirmed.map(p => parseInt(p.value));

    const chartData = [['Fecha', r1, r2]];
    for (let i = 0; i < dates.length; i++) {
        chartData.push([dates[i], values1[i] || 0, values2[i] || 0]);
    }

    const dataTable = google.visualization.arrayToDataTable(chartData);
    const options = {
        title: `Comparación entre ${r1} y ${r2}`,
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(dataTable, options);
}
