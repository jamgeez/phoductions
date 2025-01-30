let scene, camera, renderer, mesh;

init();
animate();

function init() {
    import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
    
    const controls = new OrbitControls(camera, renderer.domElement);

    import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';

    const loader = new GLTFLoader();
    loader.load("github website/Keycap.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    
    });
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('render-container').appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.SphereGeometry(2, 32, 32);

    // Texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("github website/Keycap.glb"); // Replace with your 360 image path

    // Material
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

    // Mesh
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse controls
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    document.addEventListener('mousedown', function(e) {
        isDragging = true;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };

            const deltaRotationQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(deltaMove.y * 1),
                    toRadians(deltaMove.x * 1),
                    0,
                    'XYZ'
                ));

            mesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, mesh.quaternion);
        }

        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    });

    document.addEventListener('mouseup', function(e) {
        isDragging = false;
    });

    // Window resize
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}
