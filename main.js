// main.js
import * as THREE from 'https://esm.sh/three@0.160.1';
import { PointerLockControls } from 'https://esm.sh/three@0.160.1/examples/jsm/controls/PointerLockControls.js';

// ... todo lo demás igual ...

// Escena, cámara, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controles tipo FPS
const controls = new PointerLockControls(camera, document.body);
document.addEventListener('click', () => controls.lock());
scene.add(controls.getObject());

// Piso
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// NPC (cubo rojo)
const npc = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
npc.position.set(0, 1, -5);
scene.add(npc);

// Diálogo
const dialogBox = document.getElementById('dialogBox');

// Movimiento
const velocity = new THREE.Vector3();
const keys = {};
document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);

function movePlayer(delta) {
  velocity.set(0, 0, 0);
  const speed = 5;
  if (keys['KeyW']) velocity.z -= speed * delta; // W = hacia adelante (Z -)
  if (keys['KeyS']) velocity.z += speed * delta; // S = hacia atrás (Z +)
  if (keys['KeyA']) velocity.x -= speed * delta; // A = izquierda (X -)
  if (keys['KeyD']) velocity.x += speed * delta; // D = derecha (X +)

  controls.moveRight(velocity.x);
  controls.moveForward(-velocity.z); // ⚠️ Aquí está el truco: invertir Z
}

// Raycasting para diálogo con NPC
const raycaster = new THREE.Raycaster();
function checkInteraction() {
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  const intersects = raycaster.intersectObject(npc);
  if (intersects.length > 0) {
    dialogBox.style.display = 'block';
  } else {
    dialogBox.style.display = 'none';
  }
}

// Animación
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  movePlayer(delta);
  checkInteraction();
  renderer.render(scene, camera);
}

animate();


