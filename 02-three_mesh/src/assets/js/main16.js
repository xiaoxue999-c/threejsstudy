import * as THREE from "three"
// target：聚光灯
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from "dat.gui";
const gui = new dat.GUI();
const AxesHelper = new THREE.AxesHelper(5)
// 创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器范围
renderer.setSize(window.innerWidth, window.innerHeight)
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrentLights = true;
// 渲染器添加到body上
document.body.append(renderer.domElement)
// 坐标轴线添加到场景中
scene.add(AxesHelper)
const controls = new OrbitControls(camera, renderer.domElement)
// controls.update()
let clock = new THREE.Clock()
// 根据type区分实体 相机 坐标轴
function animate() {
  let t = clock.getElapsedTime()//秒
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
// 创建一个球
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({
  // metalness: 0.7,
  // roughness: 0.1,
  // envMap: envMapTexture,
});
const sphere = new THREE.Mesh(sphereGeometry, material);
// 投射阴影
sphere.castShadow = true
scene.add(sphere);
// 创建一个平面
const geometry = new THREE.PlaneGeometry(50, 50);
const plane = new THREE.Mesh(geometry, material);
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 接收阴影
plane.receiveShadow = true
scene.add(plane)
// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
// 聚光灯
const spotLight = new THREE.SpotLight(0xffffff, 2);
spotLight.position.set(5, 5, 5);
// //设置直线光源产生阴影
// spotLight.castShadow = true;
// //设置阴影贴图模糊度
// spotLight.shadow.radius = 20;
// //设置阴影贴图的分辨率(让它变得更加细致)
// spotLight.shadow.mapSize.set(4096, 4096);
// //设置打在小球上
// spotLight.target = sphere;
// // 光源角度
// spotLight.angle = Math.PI / 6
// //聚光灯的衰减
// spotLight.distance = 0;
// //聚光灯的半影的衰减
// spotLight.penumbra = 0.5;
// //聚光灯 沿着光照距离的衰减
spotLight.decay = 0;
scene.add(spotLight);
gui.add(sphere.position, "x").min(-5).max(5).step(0.1)
gui.add(spotLight, 'angle').min(0).max(Math.PI / 2).step(0.1)
gui.add(spotLight, 'distance').min(0).max(20).step(0.1)
gui.add(spotLight, 'penumbra').min(0).max(1).step(0.1)
gui.add(spotLight, 'decay').min(0).max(1).step(0.1)


