document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos y llenar selectores
    fetch('../data.json')
        .then(response => response.json())
        .then(data => {
            const region1Select = document.getElementById('region1');
            const region2Select = document.getElementById('region2');

            // Llenar selectores con regiones
            Object.keys(data).forEach(region => {
                region1Select.innerHTML += `<option value="${region}">${region}</option>`;
                region2Select.innerHTML += `<option value="${region}">${region}</option>`;
            });
        })
        .catch(error => console.error('Error al cargar datos:', error));
});