import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

 // Set up scene
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 const renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild(renderer.domElement);

 // Sphere parameters
 const radius = 5;
 const widthSegments = 32;
 const heightSegments = 16;

 const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
 const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
 const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

 scene.add(sphere);

 // Animation
 const animate = () => {
   requestAnimationFrame(animate);

   // Rotate sphere
   sphere.rotation.x += 0.01;
   sphere.rotation.y += 0.01;

   renderer.render(scene, camera);
 };

 // Camera position
 camera.position.z = 15;

 // GUI setup
 const gui = new dat.GUI();
 const guiParams = {
   radius: radius,
   widthSegments: widthSegments,
   heightSegments: heightSegments,
 };

 gui.add(guiParams, 'radius', 1, 10).onChange((value) => {
   sphere.geometry = new THREE.SphereGeometry(value, guiParams.widthSegments, guiParams.heightSegments);
 });

 gui.add(guiParams, 'widthSegments', 3, 64).onChange((value) => {
   sphere.geometry = new THREE.SphereGeometry(guiParams.radius, value, guiParams.heightSegments);
 });

 gui.add(guiParams, 'heightSegments', 2, 32).onChange((value) => {
   sphere.geometry = new THREE.SphereGeometry(guiParams.radius, guiParams.widthSegments, value);
 });

 // Handle window resize
 window.addEventListener('resize', () => {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight);
 });

 // Start animation
 animate();