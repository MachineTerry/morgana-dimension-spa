const zonesData = {
    0: {
        name: 'Copia de la Ciudad',
        image: 'img/yokohama.webp',
        background: 'linear-gradient(135deg, #3D4F3A 0%, #6B7A68 100%)',
        containerBg: 'rgba(107, 122, 104, 0.92)',
        borderColor: 'rgba(139, 174, 140, 0.4)',
        titleColor: '#E8EBD9',
        textColor: '#D4D9CB',
        infoBoxBg: 'rgba(139, 174, 140, 0.15)',
        infoBoxBorder: '#8BAE8C',
        html: `
            <h1>🏙️ Entrada - Zona 0</h1>
            <p>Una réplica perfecta de tu ciudad natal. La primera trampa del Cubo de Morgana: todo parece exactamente como lo recordabas, pero esta familiaridad es una <em>mentira seductora</em>. Las calles que reconoces, los edificios donde trabajaste, el parque donde jugabas. Todo está ahí, congelado en una copia dimensional.</p>
            
            <h2>Naturaleza de la Zona</h2>
            <p>Esta zona funciona como punto de entrada para la mayoría de habitantes atrapados. Es una habitación del mundo real —Yokohama, por ejemplo— trasladada al Cubo. La física aquí es <em>casi</em> normal: la gravedad funciona, los objetos caen como deberían. Pero hay distorsiones temporales sutiles que revelan su verdadera naturaleza.</p>
            
            <p>El peligro no es físico, sino mental. Los exploradores que permanecen demasiado tiempo comienzan a <em>olvidar</em> que están atrapados. La mente busca normalidad, y esta zona la ofrece. Es fácil convencerte de que todo está bien, que solo tuviste un mal sueño.</p>
            
            <h2>Reconfiguración Dimensional</h2>
            <p>Cada diez minutos, la ciudad se reconfigura. Las puertas interdimensionales se cierran durante el cambio estructural. Una puerta que estaba a tu izquierda ahora está a tu derecha. La calle que cruzaste se extiende más de lo que debería. Este ciclo convierte la zona en una trampa perfecta: intentas llegar a un lugar específico, pero la ciudad se reorganiza constantemente.</p>
            
            <p>Durante las reconfiguraciones se generan temblores. Es extremadamente peligroso estar fuera del Cubo durante estos cambios: prácticamente estarías en un espacio sin oxígeno, sin leyes físicas que te mantengan entre la tierra y el abismo. Los espejos reflejan el mundo al revés y el espacio exterior.</p>
            
            <div class="info-box">
                <p><strong>Tipo:</strong> COPIA EXACTA / ZONA DE SUPERFICIE</p>
                <p><strong>Peligro:</strong> Bajo-Medio (atrapamiento mental, desorientación espacial)</p>
                <p><strong>Período de reconfiguración:</strong> 10 minutos exactos</p>
                <p><strong>Advertencia:</strong> La familiaridad es tu enemiga. Si empiezas a sentir que "todo está bien", evacúa hacia zonas más profundas. Paradójicamente, las zonas más peligrosas son más honestas sobre su naturaleza.</p>
            </div>
        `
    },
    
    1: {
        name: 'Zona Residencial',
        image: 'img/residencial.webp',
        background: 'linear-gradient(135deg, #146464 0%, #3b9948 100%)',
        containerBg: 'rgba(28, 118, 134, 0.95)',
        borderColor: 'rgba(158, 179, 194, 0.4)',
        titleColor: '#f3e8dd',
        textColor: '#f0ece2',
        infoBoxBg: 'rgba(59, 153, 72, 0.25)',
        infoBoxBorder: '#65c0a5',
        html: `
            <h1>🏘️ Zona Residencial - Capa Media</h1>
            <p>Barrios suburbanos congelados en un eterno atardecer. La Zona Residencial parece normal a primera vista: casas de dos pisos con jardines cuidados, calles pavimentadas. Pero esta normalidad es un reflejo imperfecto que revela sus horrores lentamente.</p>
            
            <h2>Gravedad Fragmentada</h2>
            <p>El fenómeno más desorientador: las leyes físicas no son uniformes. La gravedad cambia de habitación en habitación, a veces de esquina en esquina. Entras a una cocina y la gravedad apunta hacia el techo. Pasas al salón y tira lateralmente, convirtiendo las paredes en pisos.</p>
            
            <p>En los dormitorios, la gravedad puede cambiar <em>mientras duermes</em>. Algunos exploradores reportan haberse despertado en el techo, o "cayendo" horizontalmente hacia una pared. La arquitectura aquí contiene más espacio del que debería: casas con cincuenta habitaciones en estructuras de cien metros cuadrados.</p>
            
            <h2>Los Residentes Fantasma</h2>
            <p>Oficialmente está deshabitada. Pero las camas están hechas, hay comida fresca en los refrigeradores que nunca se pudre, las tazas de té están calientes. Los televisores se encienden solos mostrando programas inexistentes.</p>
            
            <p>La zona no está vacía, sino habitada por <em>ecos</em> de personas. Fragmentos de vidas capturadas por el Cubo, reproducidas como grabaciones atrapadas en un loop. No son fantasmas, sino impresiones residuales de existencias absorbidas por la dimensión.</p>
            
            <div class="info-box">
                <p><strong>Tipo:</strong> RESIDENCIAL DISTORSIONADO / CAPA MEDIA</p>
                <p><strong>Peligro:</strong> Medio-Alto (gravitación inconsistente, desorientación espacial)</p>
                <p><strong>Fenómeno:</strong> Anochecer eterno, arquitectura imposible</p>
                <p><strong>Advertencia:</strong> No confíes en tu sentido de orientación. La gravedad puede cambiar sin previo aviso.</p>
            </div>
        `
    },
    
    2: {
        name: 'Zona Antinatura',
        image: 'img/antinatura.jpg',
        background: 'linear-gradient(135deg, #4B0082 0%, #8B008B 100%)',
        containerBg: 'rgba(75, 0, 130, 0.95)',
        borderColor: 'rgba(155, 89, 182, 0.4)',
        titleColor: '#E8DAEF',
        textColor: '#E8E8F0',
        infoBoxBg: 'rgba(155, 89, 182, 0.2)',
        infoBoxBorder: '#9B59B6',
        html: `
            <h1>🌀 Zona Antinatura - Capa Profunda</h1>
            <p>El punto donde la realidad se rinde completamente. La Antinatura no es simplemente "extraña" o "imposible": es el lugar donde las leyes naturales dejan de aplicarse por completo. Aquí, lo orgánico y lo inorgánico se fusionan en formas que desafían toda lógica.</p>
            
            <h2>Geometría Viva</h2>
            <p>Los edificios aquí <em>respiran</em>. Las paredes laten como corazones gigantes. Las escaleras crecen y se marchitan como plantas. Los pasillos se alargan y contraen como intestinos. La arquitectura no está construida: está <em>viva</em>, y muy posiblemente consciente.</p>
            
            <p>Caminar por la Antinatura es navegar por el interior de un organismo colosal. Los pisos son como membranas que ceden bajo tu peso. Las puertas son más similares a esfínteres que a estructuras mecánicas. Todo pulsa, todo se mueve, todo observa.</p>
            
            <h2>Los Fragmentos</h2>
            <p>Aquí habitan los <em>Fragmentos</em>: entidades que alguna vez fueron humanas, ahora fundidas con la estructura misma del Cubo. No son hostiles en el sentido tradicional, pero su existencia es una advertencia. Susurran desde las paredes, sus voces distorsionadas por la transformación dimensional.</p>
            
            <p>Algunos teorizan que la Antinatura es una zona de transición. El punto donde los que caen al Tártaro se fusionan parcialmente con la dimensión antes de desaparecer por completo. Los Fragmentos son aquellos que quedaron atrapados a medio camino.</p>
            
            <h2>Peligro Existencial</h2>
            <p>El verdadero peligro no es físico. Es la erosión gradual de tu concepto de "yo". Cuanto más tiempo pasas aquí, más difícil se vuelve recordar dónde terminas tú y dónde comienza el entorno. La frontera entre observador y observado se difumina hasta desaparecer.</p>
            
            <div class="info-box">
                <p><strong>Tipo:</strong> ANTINATURA / ZONA LIMINAL EXTREMA</p>
                <p><strong>Peligro:</strong> CRÍTICO (fusión dimensional, pérdida de identidad)</p>
                <p><strong>Entidades:</strong> Fragmentos (humanos parcialmente fusionados)</p>
                <p><strong>Regla absoluta:</strong> No respondas si algo te llama por tu nombre. No respondas si usa la voz de alguien que conoces.</p>
            </div>
        `
    },
    
    3: {
        name: 'Zona Protegida',
        image: 'img/zonaprotegida.jpg',
        background: 'linear-gradient(135deg, #FFFF99 0%, #FFD700 100%)',
        containerBg: 'rgba(255, 255, 204, 0.95)',
        borderColor: 'rgba(255, 215, 0, 0.5)',
        titleColor: '#8B4513',
        textColor: '#654321',
        infoBoxBg: 'rgba(255, 215, 0, 0.2)',
        infoBoxBorder: '#DAA520',
        html: `
            <h1>🛡️ Zona Protegida - El Santuario</h1>
            <p>Una grieta de cordura en medio del caos dimensional. La Zona Protegida es el único lugar dentro del Cubo de Morgana donde las leyes físicas funcionan como deberían, donde el tiempo avanza linealmente, y donde el aire no vibra con amenazas dimensionales. Es un santuario raro dentro de un infierno geométrico.</p>
            
            <h2>Origen del Santuario</h2>
            <p>Esta zona existe debido a un accidente dimensional. Hace eones, cuando la dimensión de Morgana amenazaba con colapsar hacia la entropía total, algo —o alguien— intervino. Anclaron la grieta más grande y la conectaron con el Cubo, estabilizando la zona y estableciéndola como un punto fijo.</p>
            
            <p>Los que lograron sellar este lugar comprendieron que si el Cubo de Morgana colapsara completamente, la grieta alcanzaría otras dimensiones, incluida la suya. Así que crearon un <em>tapón dimensional</em>, un espacio de geometría perfecta que mantiene el sello intacto.</p>
            
            <h2>Los Guardianes Íricos</h2>
            <p>Los Guardianes Íricos no son malevolentes. Son <em>funcionales</em>. Su misión es mantener el sello intacto, y solo quienes han sobrevivido a otras zonas del Cubo y resuelto el Enigma de Morgana pueden acceder. No hablan pero se comunican a través de resonancias mentales directas.</p>
            
            <p>Miden al intruso voluntariamente con una capacidad para mantener su identidad intacta frente a lo imposible. Solo quienes han sobrevivido y permanecen cuerdos pueden entrar. No es experiencia lo que buscan: es <em>estabilidad mental</em>.</p>
            
            <h2>Dentro de la Zona</h2>
            <p>El interior es desconcertantemente normal: arquitectura euclidiana, gravedad constante, luz natural que emana de fuentes comprensibles. Las paredes son sólidas, no laten. Los ángulos forman 90 grados perfectos. Los espacios son amplios, con techos altos que crean sensación de dimensionalidad controlada, de orden absoluto.</p>
            
            <p>Hay plantas que crecen por las paredes con armonía que llueve hacia la gravedad. Los espacios reflejan una tranquilidad casi onírica. Las habitaciones tienen ángulos rectos para pérdida de gravedad. Las habitaciones tienen paz.</p>
            
            <h2>El Precio de la Estabilidad</h2>
            <p>Pero la paz es frágil. Las paredes del Santuario resuenan con sonidos lejanos de un esfuerzo titánico. Los bloques geométricos se ajustan microscópicamente manteniéndose. Si alguien intenta salir sin permiso, si alguien rompe la simetría, la zona comienza a desestabilizarse.</p>
            
            <p>La arquitectura parece responder: los bloques se mueven, las superficies se realinean, todo manteniendo el equilibrio. Es un fragmento de normalidad en un océano de caos dimensional, pero es también una pregunta permanente: ¿Preferirías vivir en un mundo bloqueado o enfrentar el vacío exterior?</p>
            
            <div class="info-box">
                <p><strong>Tipo:</strong> SANTUARIO DIMENSIONAL / ZONA ESTABILIZADA</p>
                <p><strong>Peligro:</strong> Mínimo (zona más segura del Cubo)</p>
                <p><strong>Acceso:</strong> Requiere superar el Enigma de Morgana</p>
                <p><strong>Guardianes:</strong> Íricos (entidades funcionales no hostiles)</p>
                <p><strong>Regla crítica:</strong> No intentes romper la geometría. La estabilidad es frágil y cualquier perturbación puede colapsar el sello.</p>
            </div>
        `
    },
    
    4: {
        name: 'Zona de Infraestructura',
        image: 'img/edificio.webp',
        background: 'linear-gradient(135deg, #00CED1 0%, #008B8B 100%)',
        containerBg: 'rgba(0, 139, 139, 0.95)',
        borderColor: 'rgba(86, 193, 211, 0.4)',
        titleColor: '#E0F7FA',
        textColor: '#E0F2F1',
        infoBoxBg: 'rgba(0, 206, 209, 0.2)',
        infoBoxBorder: '#00CED1',
        html: `
            <h1>🏗️ Zona de Infraestructura</h1>
            <p>La columna vertebral mecánica del Cubo de Morgana. Si las otras zonas son las habitaciones de una casa dimensional, la Infraestructura son sus entrañas: los conductos de ventilación, las tuberías, los cables eléctricos, los sistemas que mantienen todo funcionando. Pero aquí, "funcionando" tiene un significado muy diferente.</p>
            
            <h2>Arquitectura Industrial</h2>
            <p>Enormes salas llenas de maquinaria incomprensible. Engranajes del tamaño de edificios girando en patrones hipnóticos. Tuberías que transportan líquidos luminiscentes de colores imposibles. Paneles de control cubiertos con instrumentos que no miden nada reconocible.</p>
            
            <p>Todo está en movimiento constante. Los pistones golpean en ritmos que casi parecen musicales. Las correas transportadoras llevan objetos que cambian de forma mientras se mueven. Los ventiladores gigantes empujan aire que huele a ozono y especias desconocidas.</p>
            
            <h2>Los Sistemas de Reconfiguración</h2>
            <p>Aquí es donde ocurre la magia dimensional. Los mecanismos que permiten al Cubo reorganizarse cada 10 minutos están ubicados en esta zona. Enormes brazos robóticos mueven secciones enteras de realidad como si fueran piezas de Lego.</p>
            
            <p>Ver el proceso es hipnótico y aterrador. Habitaciones completas siendo desmanteladas y reconstruidas. Fragmentos de diferentes zonas siendo intercambiados. El zumbido omnipresente de la maquinaria dimensional trabajando sin descanso.</p>
            
            <h2>Peligro Mecánico</h2>
            <p>El peligro aquí es directo y físico. No hay entidades extrañas ni erosión mental. Solo toneladas de metal en movimiento que no reconocen tu existencia como relevante. Un paso en falso y puedes ser aplastado, cortado, o arrastrado hacia mecanismos que procesan materia dimensional.</p>
            
            <p>Los exploradores deben moverse con extremo cuidado, cronometrando sus pasos con los ciclos de la maquinaria. No hay malicia aquí, solo indiferencia industrial absoluta.</p>
            
            <div class="info-box">
                <p><strong>Tipo:</strong> INFRAESTRUCTURA / CAPA SUPERFICIE-MEDIA</p>
                <p><strong>Peligro:</strong> Alto (peligro mecánico, aplastamiento)</p>
                <p><strong>Función:</strong> Centro de reconfiguración dimensional</p>
                <p><strong>Advertencia:</strong> La maquinaria no te ve como amenaza ni como aliado. Eres simplemente materia que puede estar en el lugar equivocado.</p>
            </div>
        `
    },
    
    5: {
        name: 'Frontera del Tártaro',
        image: 'img/morgana.jpg',
        background: 'linear-gradient(135deg, #8B0A50 0%, #4B0026 100%)',
        containerBg: 'rgba(75, 0, 38, 0.95)',
        borderColor: 'rgba(139, 10, 80, 0.4)',
        titleColor: '#FF6B9D',
        textColor: '#FFD1DC',
        infoBoxBg: 'rgba(139, 10, 80, 0.25)',
        infoBoxBorder: '#8B0A50',
        html: `
            <h1>🌑 Frontera del Tártaro</h1>
            <p>La última barrera antes del abismo absoluto. La Frontera del Tártaro no es una zona en el sentido tradicional: es el límite, el punto donde la dimensión de Morgana termina y comienza el vacío puro. Es la membrana entre existir y dejar de existir.</p>
            
            <h2>La Última Zona</h2>
            <p>Aquí, la realidad ya no intenta mantener coherencia. Las paredes son superficies fractales que cambian cuando las observas. Los pasillos se extienden infinitamente en direcciones que no deberían existir. El suelo es sólido y líquido simultáneamente.</p>
            
            <p>La gravedad es más una sugerencia que una ley. Puedes estar caminando normalmente, luego de repente encuentras que estás en una pared sin haber notado la transición. Las puertas conducen a lugares que estaban en la dirección opuesta. La geometría aquí ha perdido todo significado.</p>
            
            <h2>El Tablero de Ajedrez Dimensional</h2>
            <p>En el centro de la Frontera existe un espacio anómalo: un tablero de ajedrez que se extiende hasta el horizonte en todas direcciones. Las piezas son torres, reyes, reinas del tamaño de edificios. Algunas se mueven solas, siguiendo reglas de un juego que nadie comprende completamente.</p>
            
            <p>Cruzar el tablero es obligatorio para alcanzar el Tártaro. Pero las piezas no reconocen tu existencia como relevante para su juego. Puedes ser aplastado por un peón que se mueve según patrones que desafían la lógica tridimensional.</p>
            
            <h2>El Umbral Final</h2>
            <p>Más allá del tablero está la puerta al Tártaro. No es una puerta física: es una ausencia, un agujero en la realidad que devora la luz. Cruzarla no requiere valor ni preparación. Requiere la voluntad de renunciar a todo lo que conoces sobre existir.</p>
            
            <p>La Frontera es la última oportunidad de retroceder. Una vez que cruzas hacia el Tártaro, ya no hay zonas, no hay reconfiguraciones, no hay nada excepto el vacío absoluto. Es el punto de no retorno dimensional.</p>
            
            <div class="info-box">
                <p><strong>Tipo:</strong> FRONTERA DIMENSIONAL / LÍMITE</p>
                <p><strong>Peligro:</strong> CRÍTICO (colapso de la geometría, proximidad al vacío)</p>
                <p><strong>Característica:</strong> Tablero de ajedrez dimensional</p>
                <p><strong>Advertencia Final:</strong> Esta es tu última oportunidad. Más allá de aquí no hay retorno. El Tártaro no te dejará ir una vez que entres.</p>
            </div>
        `
    },
    
    tartaro: {
        name: 'El Tártaro - Abismo',
        image: 'img/tartaro-abismo.webp',
        background: 'linear-gradient(135deg, #0D1B2A 0%, #0A0A0C 100%)',
        containerBg: 'rgba(13, 27, 42, 0.9)',
        borderColor: 'rgba(86, 193, 211, 0.3)',
        titleColor: '#56C1D3',
        textColor: '#BFC7C9',
        infoBoxBg: 'rgba(155, 27, 48, 0.2)',
        infoBoxBorder: '#9B1B30',
        html: `
            <h1>⚫ El Tártaro - Abismo</h1>
            <p>Las profundidades de la dimensión astral. El Tártaro no es simplemente otra zona: es el corazón oscuro del Cubo de Morgana, el punto desde el cual todo lo demás se expande. Aquí, la realidad se rinde completamente. No hay física, no hay tiempo, no hay espacio.</p>
            
            <h2>El Vacío Absoluto</h2>
            <p>El Tártaro existe como un vacío dentro de Morgana. Es la ausencia más pura, el lugar donde incluso la nada deja de tener significado. Los exploradores que han llegado —y los que regresaron son contados con los dedos de una mano— describen una oscuridad que devora la luz antes de que pueda existir.</p>
            
            <p>No hay suelo, paredes, ni techo. Flotas en un abismo infinito, sin referencias espaciales. El silencio aquí no es ausencia de sonido: es un silencio que <em>consume</em> el sonido, que lo borra antes de que pueda propagarse.</p>
            
            <h2>Distorsión Temporal</h2>
            <p>El tiempo se mueve de manera diferente y mucho más lento que en el exterior. Entre más profundo caigas, más difícil será salir y mayor será la diferencia temporal. Diez años en el Tártaro equivalen a un siglo en el mundo exterior.</p>
            
            <p>El abismo se divide en pisos, con escaleras que descienden en espiral como caracol hacia las profundidades. Las dimensiones de Morgana se consideran la primera planta de este lugar: la interlínea entre el mundo terrenal y el vacío.</p>
            
            <h2>Los Espectros</h2>
            <p>Los únicos atisbos de "vida" son los espectros de enorme poder y rango. Seres irracionales que devoran lo que se cruza en su camino.</p>
            
            <h2>Escape Imposible</h2>
            <p>La única manera de salir es teniendo un iris dimensional o un poder mental colosal. Todos los que han escapado comparten una peculiaridad: heredan la energía de la Maga Morgana. Es como si el abismo marcara a aquellos que logran desafiarlo.</p>
            
            <div style="background: rgba(86, 193, 211, 0.15); border: 2px solid #56C1D3; border-radius: 15px; padding: 25px; margin: 30px 0;">
                <h3 style="color: #56C1D3; margin-bottom: 15px; font-size: 1.5em; text-align: center;">🌌 Evento: El Mar de Estrellas</h3>
                
                <img src="img/marestrellas.jpg" alt="El Mar de Estrellas" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin: 20px 0; box-shadow: 0 8px 30px rgba(86, 193, 211, 0.4); border: 2px solid #56C1D3;">
                
                <p style="color: #BFC7C9; text-align: center; font-size: 1.05em;">
                    Cada 10 años dimensionales (100 años terrestres), la oscuridad del Tártaro se ilumina. El mar dentro del abismo refleja el espacio exterior en un fenómeno aterrador y hermoso. Las aguas negras cobran vida con bioluminiscencia astral.
                </p>
                
                <div style="background: rgba(86, 193, 211, 0.1); border-left: 3px solid #56C1D3; padding: 15px; margin: 15px 0;">
                    <p style="color: #F2F4F8; margin: 0;">
                        <strong style="color: #56C1D3;">Duración:</strong> 108 minutos exactos<br>
                        <strong style="color: #56C1D3;">Frecuencia:</strong> 100 años terrestres / 10 años dimensionales<br>
                        <strong style="color: #56C1D3;">Fenómeno:</strong> El vacío refleja el cosmos
                    </p>
                </div>
                
                <p style="color: #56C1D3; font-style: italic; text-align: center; margin-top: 15px;">
                    Este evento es extremadamente raro de observar. La luz refleja estrellas lejanas e información de múltiples tiempos. Si tu conciencia tolera la sobrecarga del saber, podrías contactar con el verdadero <em>ente</em> de este lugar.
                </p>
            </div>
            
            <div class="info-box">
                <p><strong>Clasificación:</strong> NÚCLEO DIMENSIONAL / ANTI-EXISTENCIA</p>
                <p><strong>Localización:</strong> Centro absoluto del Hipercubo</p>
                <p><strong>Peligro:</strong> MUY ALTO</p>
                <p><strong>Distorsión temporal:</strong> 10:1 (10 años aquí = 100 años exterior)</p>
                <p><strong>Entidades:</strong> Espectros de alto rango</p>
                <p><strong>Escape:</strong> Solo mediante iris dimensional o poder mental extremo</p>
                <p><strong>Advertencia:</strong> Entrar al Tártaro es renunciar a tu existencia. No hay protocolos de supervivencia porque la supervivencia deja de ser relevante.</p>
            </div>
        `
    }
};
