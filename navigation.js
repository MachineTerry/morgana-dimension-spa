// Sistema de navegación SPA - Dimensión de Morgana

let audioElement;
let isMusicPlaying = false;

// Función para cargar una zona
function loadZone(zoneIndex) {
    const zone = zonesData[zoneIndex];
    if (!zone) return;
    
    const cubeView = document.getElementById('cube-view');
    const zoneView = document.getElementById('zone-view');
    const zoneContent = document.getElementById('zone-content');
    
    // Ocultar TODOS los mensajes y elementos del cubo
    const zoneMessage = document.getElementById('zone-message');
    if (zoneMessage) {
        zoneMessage.style.display = 'none';
        zoneMessage.remove();
    }
    
    // Crear HTML de la zona
    const zoneHTML = `
        <div class="zone-container" style="
            background: ${zone.background};
            min-height: 100vh;
            padding: 40px 0;
        ">
            <div style="
                background: ${zone.containerBg};
                border: 1px solid ${zone.borderColor};
                max-width: 900px;
                margin: 0 auto;
                padding: 50px 40px;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            ">
                <style>
                    .zone-container h1 { color: ${zone.titleColor}; border-bottom: 2px solid ${zone.titleColor}; }
                    .zone-container h2 { color: ${zone.titleColor}; }
                    .zone-container p { color: ${zone.textColor}; }
                    .zone-container em { color: ${zone.titleColor}; font-style: italic; }
                    .zone-container .info-box {
                        background: ${zone.infoBoxBg};
                        border-left: 4px solid ${zone.infoBoxBorder};
                    }
                    .zone-container .info-box strong { color: ${zone.titleColor}; }
                    .zone-container img {
                        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
                        border: 2px solid ${zone.infoBoxBorder};
                    }
                </style>
                ${zone.html}
            </div>
        </div>
    `;
    
    zoneContent.innerHTML = zoneHTML;
    
    // Transición: ocultar cubo, mostrar zona
    cubeView.style.opacity = '0';
    setTimeout(() => {
        cubeView.style.display = 'none';
        cubeView.classList.add('hidden');
        zoneView.style.display = 'block';
        setTimeout(() => {
            zoneView.classList.add('active');
            window.scrollTo(0, 0); // Scroll al inicio
        }, 50);
    }, 500);
}

// Función para volver al cubo
function backToCube() {
    const cubeView = document.getElementById('cube-view');
    const zoneView = document.getElementById('zone-view');
    
    // Transición: ocultar zona, mostrar cubo
    zoneView.classList.remove('active');
    setTimeout(() => {
        zoneView.style.display = 'none';
        cubeView.classList.remove('hidden');
        cubeView.style.display = 'block';
        setTimeout(() => {
            cubeView.style.opacity = '1';
            window.scrollTo(0, 0);
        }, 50);
    }, 500);
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
    }
    
    if (isMusicPlaying) {
        audioElement.pause();
        btn.textContent = '🔇';
        isMusicPlaying = false;
    } else {
        audioElement.play().catch(err => console.log('Error:', err));
        btn.textContent = '🔊';
        isMusicPlaying = true;
    }
}

// Exponer funciones globalmente
window.loadZone = loadZone;
window.backToCube = backToCube;
window.toggleMusic = toggleMusic;
