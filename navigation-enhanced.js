// Mapeo de imágenes de fondo para cada zona
const zoneBackgrounds = {
    0: 'img/yokohama.webp',
    1: 'img/residencial.webp',
    2: 'img/antinatura.jpg',
    3: 'img/zonaprotegida.jpg',
    4: 'img/edificio.webp',
    5: 'img/tartaro.jpg',
    tartaro: 'img/tartaro-abismo.webp'
};

// Función para cargar una zona con imagen de fondo
window.loadZone = function(zoneIndex) {
    const cubeView = document.getElementById('cube-view');
    const zoneView = document.getElementById('zone-view');
    
    // Obtener datos de la zona
    const zone = zonesData[zoneIndex];
    if (!zone) {
        console.error('Zona no encontrada:', zoneIndex);
        return;
    }
    
    console.log('Cargando zona:', zoneIndex, zone.name);
    
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
    backButton.innerHTML = '← Volver al Hipercubo';
    backButton.onclick = backToCube;
    zoneView.appendChild(backButton);
    
    // Transición suave
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
    
    console.log('Volviendo al cubo...');
    
    // Remover clase active
    zoneView.classList.remove('active');
    
    // Esperar animación y cambiar
    setTimeout(() => {
        zoneView.style.display = 'none';
        cubeView.style.display = 'block';
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }, 300);
}

// Función para precargar imágenes de fondo
function preloadBackgrounds() {
    console.log('Precargando imágenes de fondo...');
    Object.values(zoneBackgrounds).forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => console.log('Imagen cargada:', imagePath);
        img.onerror = () => console.error('Error cargando imagen:', imagePath);
    });
}

// Precargar imágenes al cargar la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadBackgrounds);
} else {
    preloadBackgrounds();
}

// Exportar funciones
window.backToCube = backToCube;

// Debug: Verificar que las funciones están disponibles
console.log('Navigation enhanced cargado. Funciones disponibles:', {
    loadZone: typeof window.loadZone,
    backToCube: typeof window.backToCube,
    zonesData: typeof zonesData
});    zoneView.style.display = 'block';
    
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
