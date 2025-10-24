// Importar Three.js y OrbitControls
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js  ';

let scene, camera, renderer, hypercube, controls;
let raycaster, mouse;
let hoveredFace = null;
let innerCube, outerCube;
let isOverCenter = false;
let trapezoidMeshes = [];
let longPressTimer = null;
let longPressStarted = false;
let selectedZoneFace = null; // 👈 NUEVA VARIABLE: rastrea la zona seleccionada
// AGREGAR:
let lastTapTime = 0;
let lastTappedFace = null;
const DOUBLE_TAP_DELAY = 500;

// Configuración de zonas con colores específicos
const zones = {
    0: { 
        name: 'Entrada - Zona 0', 
        desc: 'Copia de la Ciudad',
        color: 0x6B8E23,
        emissive: 0x556B2F
    },
    1: { 
        name: 'Zona Residencial', 
        desc: 'Capa Media',
        color: 0x4169E1,
        emissive: 0x1E3A8A
    },
    2: { 
        name: 'Zona Antinatura', 
        desc: 'Capa Profunda',
        color: 0x8B008B,
        emissive: 0x4B0082
    },
    3: { 
        name: 'Zona Protegida', 
        desc: 'Zona Protegida',
        color: 0xFFFF99,
        emissive: 0xFFD700
    },
    4: { 
        name: 'Zona de Infraestructura', 
        desc: 'Capa Superficie/Media',
        color: 0x00CED1,
        emissive: 0x008B8B
    },
    5: { 
        name: 'Frontera del Tártaro', 
        desc: 'Frontera',
        color: 0x8B0A50,
        emissive: 0x4B0026
    },
    tartaro: {
        name: 'El Tártaro - Abismo',
        color: 0x1A0000,
        emissive: 0x8B0000
    }
};

// Mapeo de imágenes de fondo (debe coincidir con el CSS)
const zoneBackgrounds = {
    0: 'img/yokohama.webp',
    1: 'img/residencial.webp',
    2: 'img/antinatura.jpg',
    3: 'img/zonaprotegida.jpg',
    4: 'img/edificio.webp',
    5: 'img/morgana.webp',
    tartaro: 'img/tartaro-abismo.webp'
};

// Función para cargar una zona
function loadZone(zoneId) {
    // Ocultar la página principal
    document.getElementById('cube-view').classList.add('hidden');

    // Crear el contenedor de la zona
    const zoneView = document.createElement('div');
    zoneView.id = 'zone-view';
    zoneView.setAttribute('data-zone', zoneId);
    zoneView.classList.add('zone-active');

    // Añadir el fondo y el contenido
    const bgImage = zoneBackgrounds[zoneId] || '';
    zoneView.innerHTML = `
        <div class="zone-background" style="background-image: url('${bgImage}');"></div>
        <div class="zone-overlay"></div>
        <div id="zone-content">
            ${zonesData[zoneId].html}
        </div>
        <button class="back-to-cube-btn" onclick="returnToCube()">Volver al Cubo</button>
    `;

    // Añadir al body
    document.body.appendChild(zoneView);

    // Cargar el CSS de zonas (solo si no está cargado)
    if (!document.querySelector('link[href="styles-enhanced.css"]')) {
        const zoneStyles = document.createElement('link');
        zoneStyles.rel = 'stylesheet';
        zoneStyles.href = 'styles-enhanced.css';
        document.head.appendChild(zoneStyles);
    }

    // Activar animaciones
    setTimeout(() => {
        zoneView.classList.add('active');
    }, 100);
}

// Función para volver al cubo
function returnToCube() {
    const zoneView = document.getElementById('zone-view');
    if (zoneView) zoneView.remove();

    // Mostrar la página principal
    document.getElementById('cube-view').classList.remove('hidden');

    // Remover el CSS de zonas
    const zoneStyles = document.querySelector('link[href="styles-enhanced.css"]');
    if (zoneStyles) zoneStyles.remove();
}

// Ejemplo de cómo llamar a loadZone desde la interacción del cubo
function onZoneSelected(zoneId) {
    loadZone(zoneId);
}


function init() {
    const container = document.getElementById('canvas-container');
    if (!container) {
        console.error('Canvas container not found');
        return;
    }
    
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0D1B2A);
    scene.fog = new THREE.Fog(0x0D1B2A, 10, 50);
    
    camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(5, 4, 5);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 15;
    
    renderer.domElement.addEventListener('click', onHypercubeClick, false);
    renderer.domElement.addEventListener('touchend', onHypercubeClick, false);
    renderer.domElement.addEventListener('touchstart', onTouchStart, false);
    renderer.domElement.addEventListener('touchmove', onTouchMove, false);
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('resize', onWindowResize, false);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x9C8BA7, 1.2, 100);
    pointLight1.position.set(6, 6, 6);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x56C1D3, 0.8, 100);
    pointLight2.position.set(-6, -6, 6);
    scene.add(pointLight2);
    
    createHypercube();
    createParticles();
    animate();
    
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s';
            setTimeout(() => loadingScreen.remove(), 500);
        }
    }, 100);
}

function createHypercube() {
    hypercube = new THREE.Group();
    trapezoidMeshes = [];
    
    const w = 0.8;
    const vertices4D = [
        [-1,-1,-1,-w], [1,-1,-1,-w], [1,1,-1,-w], [-1,1,-1,-w],
        [-1,-1,1,-w], [1,-1,1,-w], [1,1,1,-w], [-1,1,1,-w],
        [-0.4,-0.4,-0.4,w], [0.4,-0.4,-0.4,w], [0.4,0.4,-0.4,w], [-0.4,0.4,-0.4,w],
        [-0.4,-0.4,0.4,w], [0.4,-0.4,0.4,w], [0.4,0.4,0.4,w], [-0.4,0.4,0.4,w]
    ];
    
    const projected = vertices4D.map(v => {
        const distance = 5;
        const scale = distance / (distance - v[3]);
        return new THREE.Vector3(v[0] * scale * 1.3, v[1] * scale * 1.3, v[2] * scale * 1.3);
    });
    
    const outerVertices = projected.slice(0, 8);
    outerCube = createCubeWireframe(outerVertices);
    hypercube.add(outerCube);
    
    const trapezoidFaces = [
        { outer: [0,1,2,3], inner: [8,9,10,11], zone: 0 },
        { outer: [4,5,6,7], inner: [12,13,14,15], zone: 2 },
        { outer: [0,1,5,4], inner: [8,9,13,12], zone: 5 },
        { outer: [2,3,7,6], inner: [10,11,15,14], zone: 3 },
        { outer: [0,3,7,4], inner: [8,11,15,12], zone: 1 },
        { outer: [1,2,6,5], inner: [9,10,14,13], zone: 4 }
    ];
    
    trapezoidFaces.forEach((face) => {
        const trapezoid = createTrapezoid(
            projected[face.outer[0]], projected[face.outer[1]], 
            projected[face.outer[2]], projected[face.outer[3]],
            projected[face.inner[0]], projected[face.inner[1]], 
            projected[face.inner[2]], projected[face.inner[3]],
            zones[face.zone]
        );
        trapezoid.userData = { 
            zoneIndex: face.zone,
            isTrapezoid: true,
            originalOpacity: 0.15,
            originalEmissive: 0.15
        };
        trapezoidMeshes.push(trapezoid);
        hypercube.add(trapezoid);
    });
    
    const innerVertices = projected.slice(8, 16);
    innerCube = createCubeFromVertices(innerVertices, zones.tartaro, true);
    innerCube.userData = { isTartaro: true };
    innerCube.renderOrder = 1;
    hypercube.add(innerCube);
    
    scene.add(hypercube);
}

function createTrapezoid(o1, o2, o3, o4, i1, i2, i3, i4, zone) {
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array([
        o1.x, o1.y, o1.z, o2.x, o2.y, o2.z, o3.x, o3.y, o3.z,
        o1.x, o1.y, o1.z, o3.x, o3.y, o3.z, o4.x, o4.y, o4.z,
        i1.x, i1.y, i1.z, i3.x, i3.y, i3.z, i2.x, i2.y, i2.z,
        i1.x, i1.y, i1.z, i4.x, i4.y, i4.z, i3.x, i3.y, i3.z,
        o1.x, o1.y, o1.z, o2.x, o2.y, o2.z, i2.x, i2.y, i2.z,
        o1.x, o1.y, o1.z, i2.x, i2.y, i2.z, i1.x, i1.y, i1.z,
        o2.x, o2.y, o2.z, o3.x, o3.y, o3.z, i3.x, i3.y, i3.z,
        o2.x, o2.y, o2.z, i3.x, i3.y, i3.z, i2.x, i2.y, i2.z,
        o3.x, o3.y, o3.z, o4.x, o4.y, o4.z, i4.x, i4.y, i4.z,
        o3.x, o3.y, o3.z, i4.x, i4.y, i4.z, i3.x, i3.y, i3.z,
        o4.x, o4.y, o4.z, o1.x, o1.y, o1.z, i1.x, i1.y, i1.z,
        o4.x, o4.y, o4.z, i1.x, i1.y, i1.z, i4.x, i4.y, i4.z
    ]);
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.computeVertexNormals();
    
    const material = new THREE.MeshStandardMaterial({
        color: zone.color,
        emissive: zone.emissive,
        emissiveIntensity: 0.15,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        roughness: 0.5,
        metalness: 0.3
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ 
            color: zone.emissive,
            transparent: true,
            opacity: 0.6
        })
    );
    mesh.add(line);
    
    return mesh;
}

function createCubeFromVertices(vertices, zone, isInner) {
    const geometry = new THREE.BufferGeometry();
    
    const indices = [
        0,1,2, 0,2,3,
        4,5,6, 4,6,7,
        0,1,5, 0,5,4,
        2,3,7, 2,7,6,
        0,3,7, 0,7,4,
        1,2,6, 1,6,5
    ];
    
    const positions = [];
    vertices.forEach(v => positions.push(v.x, v.y, v.z));
    
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    
    const material = new THREE.MeshStandardMaterial({
        color: zone.color,
        emissive: zone.emissive,
        emissiveIntensity: isInner ? 0.3 : 0.1,
        transparent: true,
        opacity: isInner ? 0.25 : 0.15,
        roughness: 0.3,
        metalness: 0.7
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ 
            color: isInner ? 0xFF0000 : 0x9C8BA7,
            opacity: isInner ? 0.8 : 0.3,
            transparent: true
        })
    );
    mesh.add(line);
    
    return mesh;
}

function createCubeWireframe(vertices) {
    const group = new THREE.Group();
    
    const edges = [
        [0,1],[1,2],[2,3],[3,0],
        [4,5],[5,6],[6,7],[7,4],
        [0,4],[1,5],[2,6],[3,7]
    ];
    
    edges.forEach(edge => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            vertices[edge[0]], vertices[edge[1]]
        ]);
        const line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({ 
                color: 0x9C8BA7,
                opacity: 0.3,
                transparent: true
            })
        );
        group.add(line);
    });
    
    return group;
}

function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 300;
    const posArray = new Float32Array(particlesCnt * 3);
    
    for(let i = 0; i < particlesCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0x6A8BA8,
        transparent: true,
        opacity: 0.3
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
}

function onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Resetear hover anterior de trapecios
    if (hoveredFace && hoveredFace.userData.isTrapezoid) {
        // Solo resetear si NO está seleccionada
        if (hoveredFace !== selectedZoneFace) {
            hoveredFace.material.opacity = hoveredFace.userData.originalOpacity;
            hoveredFace.material.emissiveIntensity = hoveredFace.userData.originalEmissive;
        }
    }

    // Resetear cubo interno si no está en hover
    if (innerCube) {
        innerCube.material.color.set(zones.tartaro.color);
        innerCube.material.emissive.set(zones.tartaro.emissive);
        innerCube.material.emissiveIntensity = 0.3;
        innerCube.material.opacity = 0.25;
    }

    // Verificar si estamos sobre el cubo interno (Tártaro)
    const innerIntersects = raycaster.intersectObject(innerCube, false);

    if (innerIntersects.length > 0) {
        isOverCenter = true;
        hideRoomPanel(); // 👈 Asegurar que el panel de zonas se cierre
        showTartaroPanel(); // Mostrar panel del Tártaro
        
        // Cambiar color y emisividad al hover
        innerCube.material.color.set(0xFF0000);
        innerCube.material.emissive.set(0x8B0000);
        innerCube.material.emissiveIntensity = 1.0;
        innerCube.material.opacity = 0.7;
        
        renderer.domElement.style.cursor = 'pointer';
        return; // ← Detener aquí
    } else {
        isOverCenter = false;
        hideTartaroPanel(); // 👈 Ocultar panel del Tártaro
        renderer.domElement.style.cursor = 'grab';
    }

    // Verificar trapecios solo si NO estamos sobre el cubo interno
    const trapIntersects = raycaster.intersectObjects(trapezoidMeshes, false);

    if (trapIntersects.length > 0) {
        const object = trapIntersects[0].object;

        if (object.userData.isTrapezoid) {
            hoveredFace = object;
            // Si no está seleccionada, mostrar hover normal
            if (object !== selectedZoneFace) {
                object.material.opacity = 0.6;
                object.material.emissiveIntensity = 0.7;
            }
            renderer.domElement.style.cursor = 'pointer';

            // No mostrar panel aquí — solo en click
        }
    } else {
        hoveredFace = null;
        renderer.domElement.style.cursor = 'grab';
        hideRoomPanel(); // 👈 Cerrar panel al salir
    }
}

function onHypercubeClick(event) {
    const isTouch = event.type === 'touchend';
    
    if (isTouch) {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
            
            if (longPressStarted) {
                longPressStarted = false;
                return;
            }
        }
        
        if (event.changedTouches.length === 0) return;
        const touch = event.changedTouches[0];
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        
        const innerIntersects = raycaster.intersectObject(innerCube, false);
        if (innerIntersects.length > 0) {
            return;
        }
        
        const intersects = raycaster.intersectObjects(trapezoidMeshes, false);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.userData.isTrapezoid) {
                handleTouchTap(object); // NUEVA FUNCIÓN
            }
        }
    } else {
        // Desktop
        if (hoveredFace && hoveredFace.userData.isTrapezoid) {
            selectZone(hoveredFace);
        }
    }
}

function handleTouchTap(object) {
    const currentTime = Date.now();
    const timeSinceLastTap = currentTime - lastTapTime;
    
    if (lastTappedFace === object && timeSinceLastTap < DOUBLE_TAP_DELAY) {
        // DOBLE TAP: Entrar
        console.log('🎯 Doble tap - Entrando a zona:', object.userData.zoneIndex);
        
        object.material.emissiveIntensity = 1.0;
        setTimeout(() => {
            if (window.loadZone && typeof window.loadZone === 'function') {
                window.loadZone(object.userData.zoneIndex);
            }
        }, 200);
        
        lastTapTime = 0;
        lastTappedFace = null;
        
    } else {
        // PRIMER TAP: Seleccionar
        console.log('👆 Primer tap - Seleccionando:', object.userData.zoneIndex);
        selectZone(object);
        
        lastTapTime = currentTime;
        lastTappedFace = object;
        
        showDoubleTapHint();
    }
}

function showDoubleTapHint() {
    if (window.innerWidth <= 768) {
        let hint = document.getElementById('double-tap-hint');
        
        if (!hint) {
            hint = document.createElement('div');
            hint.id = 'double-tap-hint';
            hint.style.cssText = `
                position: fixed;
                bottom: 120px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(156, 139, 167, 0.95);
                color: white;
                padding: 15px 25px;
                border-radius: 25px;
                font-size: 14px;
                font-weight: 600;
                z-index: 1000;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
                pointer-events: none;
                animation: fadeInOut 2s ease;
            `;
            hint.textContent = '👆 Toca dos veces para entrar';
            document.body.appendChild(hint);
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
                    20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        hint.style.display = 'block';
        setTimeout(() => {
            if (hint) hint.style.display = 'none';
        }, 2000);
    }
}

function selectZone(object) {
    // Desiluminar la zona anterior si existe
    if (selectedZoneFace && selectedZoneFace !== object) {
        selectedZoneFace.material.opacity = selectedZoneFace.userData.originalOpacity;
        selectedZoneFace.material.emissiveIntensity = selectedZoneFace.userData.originalEmissive;
    }

    // Iluminar la nueva zona
    selectedZoneFace = object;
    object.material.opacity = 0.6;
    object.material.emissiveIntensity = 0.7;

    // Mostrar panel
    const zone = zones[object.userData.zoneIndex];
    showRoomPanel(zone, object.userData.zoneIndex);
}

function onTouchStart(event) {
    if (event.touches.length !== 1) return;
    
    const touch = event.touches[0];
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const innerIntersects = raycaster.intersectObject(innerCube, false);
    
    if (innerIntersects.length > 0) {
        longPressStarted = false;
        longPressTimer = setTimeout(() => {
            longPressStarted = true;
            if (innerCube) {
                innerCube.material.emissiveIntensity = 1.5;
                innerCube.material.opacity = 0.9;
            }
            
            setTimeout(() => {
                window.loadZone('tartaro');
            }, 300);
        }, 1500);
        
        if (innerCube) {
            innerCube.material.emissiveIntensity = 1.0;
            innerCube.material.opacity = 0.7;
        }
        
        event.preventDefault();
    }
}

function onTouchMove(event) {
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
        
        if (innerCube) {
            innerCube.material.emissiveIntensity = 0.3;
            innerCube.material.opacity = 0.25;
        }
    }
}

function onKeyDown(event) {
    if (event.key === 'g' || event.key === 'G') {
        if (isOverCenter && innerCube) {
            innerCube.material.emissiveIntensity = 1.5;
            innerCube.material.opacity = 0.9;
            
            setTimeout(() => {
                window.loadZone('tartaro');
            }, 300);
        }
    }

    // Entrar con Enter o Espacio si hay una zona seleccionada
    if (event.key === 'Enter' || event.key === ' ') {
        if (selectedZoneFace && selectedZoneFace.userData.isTrapezoid) {
            window.loadZone(selectedZoneFace.userData.zoneIndex);
        }
    }
}

function showRoomPanel(zone, zoneIndex) {
    let panel = document.getElementById('selected-room-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'selected-room-panel';
        panel.className = 'selected-room';
        panel.innerHTML = `
    <button id="close-room-panel" style="...">✕</button>
    <h3>📍 Zona Seleccionada</h3>
    <p id="room-name"></p>
    <p style="color: #FF6666; font-size: 0.9em; margin-top: 10px;">
        💻 Desktop: Presiona <strong>Enter</strong> o <strong>Espacio</strong><br>
        📱 Móvil: <strong>Toca dos veces</strong> para entrar
    </p>
`;
        document.getElementById('cube-view').appendChild(panel);
        
        document.getElementById('close-room-panel').addEventListener('click', (e) => {
            e.stopPropagation();
            hideRoomPanel();
            if (selectedZoneFace) {
                selectedZoneFace.material.opacity = selectedZoneFace.userData.originalOpacity;
                selectedZoneFace.material.emissiveIntensity = selectedZoneFace.userData.originalEmissive;
                selectedZoneFace = null;
            }
        });
    }
    
    const nameEl = document.getElementById('room-name');
    
    if (nameEl) {
        nameEl.textContent = `${zone.name} — ${zone.desc}`;
        panel.style.display = 'block';
    }
}

function hideRoomPanel() {
    const panel = document.getElementById('selected-room-panel');
    if (panel) {
        panel.style.display = 'none';
    }
}

function showTartaroPanel() {
    let panel = document.getElementById('tartaro-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'tartaro-panel';
        panel.className = 'selected-room';
        panel.innerHTML = `
            <h3 style="color: #FF4444;">⚫ El Tártaro</h3>
            <p style="color: #BFC7C9;">Centro de la Dimensión - Abismo</p>
            <p style="color: #FF6666; font-size: 0.9em; margin-top: 10px;">Presiona <strong>G</strong> para acceder</p>
        `;
        document.getElementById('cube-view').appendChild(panel);
    }
    panel.style.display = 'block';
}
function hideTartaroPanel() {
    const panel = document.getElementById('tartaro-panel');
    if (panel) {
        panel.style.display = 'none';
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    if (hypercube) {
        hypercube.rotation.x += 0.001;
        hypercube.rotation.y += 0.0015;
    }
    
    if (innerCube) {
        const pulse = Math.sin(Date.now() * 0.001) * 0.03 + 1;
        innerCube.scale.set(pulse, pulse, pulse);
    }
    
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
