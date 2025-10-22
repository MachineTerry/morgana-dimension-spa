// Mapeo de imágenes de fondo para cada zona
const zoneBackgrounds = {
    0: 'img/yokohama.webp',
    1: 'img/residencial.webp',
    2: 'img/antinatura.jpg',
    3: 'img/zonaprotegida.jpg',
    4: 'img/edificio.webp',
    5: 'img/morgana.jpg',  // Usando la versión .jpg de mejor calidad
    tartaro: 'img/tartaro-abismo.webp'
};

// Función para cargar una zona con imagen de fondo
window.loadZone = function(zoneIndex) {
    const cubeView = document.getElementById('cube-view');
    const zoneView = document.getElementById('zone-view');
    const zoneContent = document.getElementById('zone-content');
    
    // Obtener datos de la zona
    const zone = zonesData[zoneIndex];
    if (!zone) {
        console.error('Zona no encontrada:', zoneIndex);
        return;
    }
    
    // Limpiar vista de zona
    zoneView.innerHTML = '';
    
    // Establecer atributo data-zone para estilos específicos
    zoneView.setAttribute('data-zone', zoneIndex);
    
    // Crear fondo de imagen
    const background = document.createElement('div');
    background.className = 'zone-background';
    background.style.backgroundImage = `url('${zoneBackgrounds[zoneIndex]}')`;
    zoneView.appendChild(background);
    
    // Crear overlay de color
    const overlay = document.createElement('div');
    overlay.className = 'zone-overlay';
    zoneView.appendChild(overlay);
    
    // Crear contenedor de contenido
    const content = document.createElement('div');
    content.id = 'zone-content';
    content.innerHTML = zone.html;
    zoneView.appendChild(content);
    
    // Crear botón de regreso
    const backButton = document.createElement('button');
    backButton.className = 'back-to-cube-btn';
    backButton.innerHTML = '← Volver al Hipercubo de Morgana';
    backButton.onclick = backToCube;
    zoneView.appendChild(backButton);
    
    // Aplicar estilos de la zona al contenedor
    content.style.background = zone.containerBg;
    content.style.borderColor = zone.borderColor;
    content.style.color = zone.textColor;
    
    // Transición suave
    cubeView.classList.add('hidden');
    cubeView.style.display = 'none';
    zoneView.style.display = 'block';
    
    // Trigger animations
    setTimeout(() => {
        zoneView.classList.add('active');
    }, 50);
    
    // Scroll al inicio
    window.scrollTo(0, 0);
};

// Función para volver al cubo
function backToCube() {
    const cubeView = document.getElementById('cube-view');
    const zoneView = document.getElementById('zone-view');
    
    // Remover clase active para animación de salida
    zoneView.classList.remove('active');
    
    // Esperar a que termine la animación
    setTimeout(() => {
        zoneView.style.display = 'none';
        cubeView.style.display = 'block';
        cubeView.classList.remove('hidden');
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }, 300);
}

// Función para precargar imágenes de fondo
function preloadBackgrounds() {
    Object.values(zoneBackgrounds).forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });
}

// Precargar imágenes al cargar la página
window.addEventListener('load', preloadBackgrounds);

// Exportar funciones para uso global
window.backToCube = backToCube;
