import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

const size = Math.min(document.body.offsetWidth, document.body.offsetHeight);
const width = size;
const height = size;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f1f1f);

function material_from_path(path, rot = 0) {
  const texture = new THREE.TextureLoader().load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.center.x = 0.5;
  texture.center.y = 0.5;
  texture.rotation = 2 * Math.PI * rot;
  return new THREE.MeshBasicMaterial({ map: texture });
}

scene.add(
  new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), [
    material_from_path("fig/car.png"),
    material_from_path("fig/grape.png", 3 / 4),
    material_from_path("fig/cabbage.png"),
    material_from_path("fig/stake.png"),
    material_from_path("fig/balloon.png"),
    material_from_path("fig/fish.png"),
  ])
);

const camera = new THREE.PerspectiveCamera(60, width / height);
camera.position.set(1, 1, 1);

const controls = new TrackballControls(camera, canvas);
controls.panSpeed = 0;
controls.zoomSpeed = 0;

function tick() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();
