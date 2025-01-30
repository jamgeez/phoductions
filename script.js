// Initialize scene, camera, and renderer
let scene, camera, renderer, controls;

init();
animate();

function init() {
    // 1. Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // White background

    // 2. Create Camera
    camera = new THREE.PerspectiveCamera(
        75, // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.z = 5;

    // 3. Create Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400); // Match container size
    document.getElementById('model-container').appendChild(renderer.domElement);

    // 4. Add Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // 5. Load 3D Model
    const loader = new THREE.GLTFLoader();
    loader.load(
        'github website/Keycap.glb', // Path to your .glb file
        (gltf) => {
            const model = gltf.scene;
            scene.add(model);
        },
        undefined, // Progress callback (optional)
        (error) => {
            console.error('Error loading model:', error);
        }
    );

    // 6. Add Orbit Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.dampingFactor = 0.05;
    controls.minDistance = 2; // Prevent zooming too close
    controls.maxDistance = 10; // Prevent zooming too far
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Required for damping
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = 600 / 400; // Keep fixed container aspect ratio
    camera.updateProjectionMatrix();
    renderer.setSize(600, 400);
});
