fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const regionList = document.getElementById('regionList');

        data.forEach(region => {
            const totalConfirmados = region.confirmed.reduce((acc, cur) => acc + parseInt(cur.value), 0);
            const li = document.createElement('li');
            li.textContent = `${region.region}: ${totalConfirmados.toLocaleString()}`;
            regionList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error cargando data.json:', error);
    });
