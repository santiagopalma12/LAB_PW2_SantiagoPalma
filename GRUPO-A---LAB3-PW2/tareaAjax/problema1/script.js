document.addEventListener('DOMContentLoaded', function() {
    // 1. Cargar datos (igual que Commit 1)
    fetch('../data.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar datos');
            return response.json();
        })
        .then(data => {
            const region1Select = document.getElementById('region1');
            const region2Select = document.getElementById('region2');
            region1Select.innerHTML = '<option value="">Seleccione región 1</option>';
            region2Select.innerHTML = '<option value="">Seleccione región 2</option>';
            Object.keys(data).forEach(region => {
                const option1 = new Option(region, region);
                const option2 = new Option(region, region);
                region1Select.add(option1);
                region2Select.add(option2);
            });

            document.getElementById('compare-btn').addEventListener('click', function() {
                const region1 = region1Select.value;
                const region2 = region2Select.value;

                if (!region1 || !region2) {
                    alert('⚠️ Debes seleccionar DOS regiones');
                    return;
                }
                if (region1 === region2) {
                    alert(' No puedes comparar la misma región');
                    return;
                }

                console.log('Comparando:', region1, 'vs', region2);
                alert(` Regiones válidas: ${region1} y ${region2}`);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudieron cargar los datos. Intenta más tarde.');
        });
});