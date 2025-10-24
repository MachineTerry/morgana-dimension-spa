// Variables globales de música
let audioElement = null;
let isMusicPlaying = false;

// Mapeo de imágenes de fondo para cada zona
const zoneBackgrounds = {
    0: 'img/yokohama.webp',           // Ciudad
    1: 'img/residencial.webp',        // Residencial
    2: 'img/antinatura.jpg',          // Antinatura
    3: 'img/zonaprotegida.jpg',       // Zona Protegida
    4: 'img/edificio.webp',           // Infraestructura
    5: 'img/morgana.webp',             // Frontera del Tártaro
    tartaro: 'img/tartaro-abismo.webp' // El Tártaro - Abismo
};

// Función para cargar una zona con imagen de fondo
function loadZone(zoneIndex) {
    console.log('🎯 loadZone llamada con:', zoneIndex);
    
    const cubeView = document.getElementById('cube-view');
    const zoneView = document.getElementById('zone-view');
    
    // Obtener datos de la zona
    const zone = zonesData[zoneIndex];
    if (!zone) {
        console.error('❌ Zona no encontrada:', zoneIndex);
        return;
    }
    
    console.log('✅ Zona encontrada:', zone.name);
    
    // Limpiar vista de zona
    zoneView.innerHTML = '';
    
    // Establecer atributo data-zone para estilos específicos
    zoneView.setAttribute('data-zone', zoneIndex);
    
    // Crear fondo de imagen
    const background = document.createElement('div');
    background.className = 'zone-background';
    background.style.backgroundImage = `url('${zoneBackgrounds[zoneIndex]}')`;
    zoneView.appendChild(background);
    
    // Crear overlay de color (los estilos están en styles-enhanced.css)
    const overlay = document.createElement('div');
    overlay.className = 'zone-overlay';
    zoneView.appendChild(overlay);
    
    // Crear contenedor de contenido
    const content = document.createElement('div');
    content.id = 'zone-content';
    
    // Envolver el HTML en un div para aplicar estilos
    const wrapper = document.createElement('div');
    wrapper.innerHTML = zone.html;
    content.appendChild(wrapper);
    
    zoneView.appendChild(content);
    
    // Crear botón de regreso
    const backButton = document.createElement('button');
    backButton.className = 'back-to-cube-btn';
    backButton.innerHTML = '← Volver al Hipercubo';
    backButton.onclick = backToCube;
    zoneView.appendChild(backButton);
    
    // Transición suave
    cubeView.style.display = 'none';
    cubeView.style.visibility = 'hidden';
    
    zoneView.style.display = 'block';
    zoneView.style.visibility = 'visible';
    
    // Trigger animations
    setTimeout(() => {
        zoneView.classList.add('active');
    }, 50);
    
    // Scroll al inicio
    window.scrollTo(0, 0);
    
    console.log('✅ Zona cargada exitosamente');
}

// Función para volver al cubo
function backToCube() {
    const cubeView = document.getElementById('cube-view');
    const zoneView = document.getElementById('zone-view');
    
    console.log('🔙 Volviendo al cubo...');
    
    // Remover clase active
    zoneView.classList.remove('active');
    
    // Esperar animación y cambiar
    setTimeout(() => {
        zoneView.style.display = 'none';
        zoneView.style.visibility = 'hidden';
        
        cubeView.style.display = 'block';
        cubeView.style.visibility = 'visible';
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }, 300);
}

// Función de música
function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    
    if (!audioElement) {
        audioElement = document.createElement('audio');
        audioElement.loop = true;
        audioElement.volume = 0.8;
        
        const source = document.createElement('source');
        source.src = 'daniel.mp3';
        source.type = 'audio/mpeg';
        audioElement.appendChild(source);
        document.body.appendChild(audioElement);
        
        console.log('🎵 Audio element creado');
    }
    
    if (isMusicPlaying) {
        audioElement.pause();
        btn.textContent = '🔇';
        isMusicPlaying = false;
        console.log('🔇 Música pausada');
    } else {
        audioElement.play()
            .then(() => {
                btn.textContent = '🔊';
                isMusicPlaying = true;
                console.log('🔊 Música reproduciéndose');
            })
            .catch(err => {
                console.error('❌ Error reproduciendo música:', err);
            });
    }
}

// Función para precargar imágenes de fondo
function preloadBackgrounds() {
    console.log('📸 Precargando imágenes de fondo...');
    Object.entries(zoneBackgrounds).forEach(([zone, imagePath]) => {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => console.log(`✅ Imagen cargada [${zone}]:`, imagePath);
        img.onerror = () => console.error(`❌ Error cargando [${zone}]:`, imagePath);
    });
}

// EXPORTAR FUNCIONES A WINDOW (CRÍTICO)
window.loadZone = loadZone;
window.backToCube = backToCube;
window.toggleMusic = toggleMusic;

// Precargar imágenes al cargar la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadBackgrounds);
} else {
    preloadBackgrounds();
}

// Debug: Verificar que todo está disponible
console.log('🚀 Navigation enhanced cargado');
console.log('📋 Funciones disponibles:', {
    loadZone: typeof window.loadZone,
    backToCube: typeof window.backToCube,
    toggleMusic: typeof window.toggleMusic,
    zonesData: typeof zonesData
});
console.log('🖼️ Imágenes configuradas:', zoneBackgrounds);
