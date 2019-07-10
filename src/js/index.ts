import * as THREE from "three";
import { TimelineMax, Elastic } from "gsap";
const vertexShader = require("../glsl/vertexShader");
const fragmentShader = require("../glsl/fragmentShader");
const OrbitControls = require("three-orbit-controls")(THREE);

import { emoji } from "./emoji";
import { getRandomEmojiTexture } from "./EmojiTexture";

const scene = new THREE.Scene();
const destination = { x: 0, y: 0 };
scene.background = new THREE.Color(0x000000);

const renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerWidth);

const container = document.getElementById("app");
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.001,
  100,
);
camera.position.set(0, 0, 1);

const controls = new OrbitControls(camera, renderer.domElement);

const material = new THREE.ShaderMaterial({
  // wireframe: true,
  uniforms: {
    time: { type: "f", value: 0 },
    blend: { type: "f", value: 0 },
    original: {
      type: "t",
      value: getRandomEmojiTexture(emoji),
    },
    target: {
      type: "t",
      value: getRandomEmojiTexture(emoji),
    },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

material.extensions.derivatives = true;

// let points = new THREE.Points(geometry,material);
let plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 200, 200), material);
scene.add(plane);

let isAnimating = false;

if (document.body) {
  document.body.addEventListener("click", () => {
    if (document.body && isAnimating === false) {
      isAnimating = true;

      if (document.body.classList.contains("done")) {
        new TimelineMax().to(material.uniforms.blend, 1, {
          value: 0,
          ease: Elastic.easeOut.config(1, 0.3),
          onComplete: () => {
            material.uniforms.target.value = getRandomEmojiTexture(emoji);
            isAnimating = false;
          },
        });
        document.body.classList.remove("done");
      } else {
        new TimelineMax().to(material.uniforms.blend, 1, {
          value: 1,
          ease: Elastic.easeOut.config(1, 0.3),
          onComplete: () => {
            material.uniforms.original.value = getRandomEmojiTexture(emoji);
            isAnimating = false;
          },
        });
        document.body.classList.add("done");
      }
    }
  });
}

resize();

window.addEventListener("resize", resize);
function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

let time = 0;
function animate() {
  time++;
  material.uniforms.time.value = time;

  requestAnimationFrame(animate);
  render();
}

function render() {
  scene.rotation.x += (destination.x - scene.rotation.x) * 0.05;
  scene.rotation.y += (destination.y - scene.rotation.y) * 0.05;
  renderer.render(scene, camera);
}

let ww = window.innerWidth;
let wh = window.innerHeight;
function onMousemove(e) {
  var x = (e.clientX - ww / 2) / (ww / 2);
  var y = (e.clientY - wh / 2) / (wh / 2);
  destination.x = y * 0.5;
  destination.y = x * 0.5;
}
window.addEventListener("mousemove", onMousemove);

resize();
animate();
