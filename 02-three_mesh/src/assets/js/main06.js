import * as THREE from "three"
// target：环境贴图遮挡与贴图
import wl1 from "../textures/door/color.jpg"
import wl2 from "../textures/door/alpha.jpg"
import wl3 from "../textures/door/ambientOcclusion.jpg"
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
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 导入纹理
let texture = new THREE.TextureLoader().load(wl1)
let texture2 = new THREE.TextureLoader().load(wl2)
let doorAoTexture = new THREE.TextureLoader().load(wl3)
console.log(doorAoTexture)
// 创建材质
const basicMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  alphaMap: texture2,
  transparent: true,
  side: THREE.DoubleSide,
  aoMap: doorAoTexture,
  // aoMapIntensity: 1,

});
console.log(cubeGeometry)
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
console.log(cubeGeometry)
const PlaneGeometry = new THREE.PlaneGeometry(1, 1)

const plane = new THREE.Mesh(
  PlaneGeometry,
  basicMaterial
);
plane.position.set(3, 0, 0)
scene.add(plane)
PlaneGeometry.setAttribute("uv2", new THREE.BufferAttribute(PlaneGeometry.attributes.uv.array, 2))

gui.add(basicMaterial, "aoMapIntensity").min(0).max(1).name("ao贴图强度");

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
console.log(scene.children[2].type)
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

