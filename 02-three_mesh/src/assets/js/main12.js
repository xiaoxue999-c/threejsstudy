import * as THREE from "three"
// target：纹理加载进度
import wl1 from "../textures/door/color.jpg"
import wl2 from "../textures/door/alpha.jpg"
import wl3 from "../textures/door/ambientOcclusion.jpg"
import wl4 from "../textures/door/height.jpg"
import wl5 from "../textures/door/roughness.jpg"
import wl6 from "../textures/door/metalness.jpg"
import wl7 from "../textures/door/normal.jpg"
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
// 创建物体
// 创建几何结构
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100)
let event = {}
event.onLoad = function () {
  console.log("图片加载完成")
}
event.onProgress = function (url, num, total) {
  console.log(url, num, total, "加载进度:", (num / total * 100) + "%")
}
event.onError = function () {
  console.log("图片加载错误")
}
// 纹理加载管理器
const loaderManager = new THREE.LoadingManager(event.onLoad, event.onProgress, event.onError)
// 导入纹理
const loader = new THREE.TextureLoader(loaderManager);
let texture = loader.load(wl1)
let texture2 = loader.load(wl2)
let doorAoTexture = loader.load(wl3)
let displaceTexture = loader.load(wl4)
let roughnessTexture = loader.load(wl5)
let matelnessTexture = loader.load(wl6)
let normalTexture = loader.load(wl7)
console.log(loader, normalTexture)
// 加载进度

// 创建材质
const basicMaterial = new THREE.MeshStandardMaterial({
  map: texture,
  alphaMap: texture2,
  transparent: true,
  side: THREE.DoubleSide,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  displacementMap: displaceTexture,
  displacementScale: 0.1,
  roughness: 1,
  roughnessMap: roughnessTexture,
  metalness: 1,
  metalnessMap: matelnessTexture,
  normalMap: normalTexture
});

// cubeGeometry.setAttribute("uv2", new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
// cube.position.set(5, 0, 0)
// 物体添加到场景中
scene.add(cube)
// 给cube添加第二组uv
cubeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);
const PlaneGeometry = new THREE.PlaneGeometry(1, 1, 100, 100)
const plane = new THREE.Mesh(
  PlaneGeometry,
  basicMaterial
);
plane.position.set(1.5, 0, 0)
scene.add(plane)
PlaneGeometry.setAttribute("uv2", new THREE.BufferAttribute(PlaneGeometry.attributes.uv.array, 2))
// 灯光
// 环境光
const light = new THREE.AmbientLight(0Xffffff, 0.5)
scene.add(light)
// 平型光
const directionalLight = new THREE.DirectionalLight(0Xffffff, 0.5)
directionalLight.position.set(10, 10, 10)
scene.add(directionalLight)
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器范围
renderer.setSize(window.innerWidth, window.innerHeight)
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
  // console.log("过去的时间", t)
  // let delayTime = clock.getDelta()//
  // console.log("间隔的时间", delayTime)
  // let t = time / 1000 % 5
  // cube.position.x = t;
  // cube.rotation.x = t
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()

