// Create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Tree geometry
const geometry = new THREE.CylinderGeometry(0.2, 0.5, 2, 8);
const material = new THREE.MeshLambertMaterial({ color: 0x4c8a41 });

const trees = [];

const pages = [
  { x: -4, z: -2, label: "Field Notes", link: "field-notes.html" },
  { x: 0, z: -2, label: "Creative Practices", link: "creative-practices.html" },
  { x: 4, z: -2, label: "Reflections", link: "reflections.html" },
  { x: -2, z: 2, label: "Soundscapes", link: "soundscapes.html" },
  { x: 2, z: 2, label: "Guest Spot", link: "guest-spot.html" }
];

for (let p of pages) {
  const tree = new THREE.Mesh(geometry, material.clone());
  tree.position.set(p.x, 1, p.z);
  tree.userData = { link: p.link };
  scene.add(tree);
  trees.push(tree);
}

// Camera setup
camera.position.set(0, 2, 6);

// Raycaster for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(trees);
  if (intersects.length > 0) {
    const link = intersects[0].object.userData.link;
    window.location.href = link;
  }
}

window.addEventListener('click', onClick, false);

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
