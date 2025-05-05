fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const lista = document.getElementById('region-list');
    data.forEach(region => {
      const li = document.createElement('li');
      li.textContent = region.region; 
      lista.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error al cargar datos:', error);
  });
