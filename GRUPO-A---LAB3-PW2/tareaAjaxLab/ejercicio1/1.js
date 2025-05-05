document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar data.json');
            return response.json();
        })
        .then(data => {
            const regionList = document.getElementById('region-list');
            Object.keys(data).forEach(region => {
                const li = document.createElement('li');
                li.textContent = region;
                regionList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al cargar las regiones.');
        });
});
