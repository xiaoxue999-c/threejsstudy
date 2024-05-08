import * as THREE from "three"
// target：阴影的属性 阴影相机原理
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
const geometry = new THREE.PlaneGeometry(10, 10);
const plane = new THREE.Mesh(geometry, material);
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2
// 接收阴影
plane.receiveShadow = true
scene.add(plane)
// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
// 直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
//设置直线光源产生阴影
directionalLight.castShadow = true;
// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20;
// 设置阴影贴图模糊度
directionalLight.shadow.mapSize.set(4096, 4096)
// 设置平行光投射相机属性
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
gui.add(directionalLight.shadow.camera, 'near').min(0).max(100).step(0.1).onChange(() => {
  directionalLight.shadow.camera.updateProjectionMatrix();
})
scene.add(directionalLight);
