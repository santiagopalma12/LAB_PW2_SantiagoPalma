fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const regionesConTotales = data.map(region => {
            const total = region.confirmed.reduce((acc, cur) => acc + parseInt(cur.value), 0);
            return { nombre: region.region, total };
        });

        regionesConTotales.sort((a, b) => b.total - a.total);

        const top10 = regionesConTotales.slice(0, 10);
        const topList = document.getElementById('topRegions');

        top10.forEach(region => {
            const li = document.createElement('li');
            li.textContent = `${region.nombre}: ${region.total.toLocaleString()}`;
            topList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error cargando data.json:', error);
    });
