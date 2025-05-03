document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar datos');
            return response.json();
        })
        .then(data => {
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudieron cargar los datos.');
        });
        
});
