import * as THREE from "three"
// target：dat.gui
import { gsap } from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
const AxesHelper = new THREE.AxesHelper(5)
// 创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)
// 创建物体
// 创建几何结构
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// cube.position.set(5, 0, 0)
// 物体添加到场景中
scene.add(cube)
const gui = new dat.GUI();


let params = {
  color: "#ffff00",
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 6, repeat: -1, yoyo: true })
  }
}
gui.addColor(params, "color").onChange(function (value) {
  cube.material.color.set(value)
})
gui.add(cube.position, 'x').min(1).max(5).name("x轴移动").step(0.01)
gui.add(cube, "visible").name("几何体是否显示")
gui.add(params, "fn").name("几何体移动")
gui.addFolder("设置立方体").add(cube.material, "wireframe")

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器范围
renderer.setSize(window.innerWidth, window.innerHeight)
// 渲染器添加到body上
document.body.append(renderer.domElement)
// 坐标轴线添加到场景中
scene.add(AxesHelper)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true//添加阻尼
window.addEventListener("dblclick", () => {
  const fullscreenelement = document.fullscreenElement
  if (!fullscreenelement) {
    console.log(renderer.domElement)
    renderer.domElement.requestFullscreen()
  } else {
    console.log(renderer.domElement)
    document.exitFullscreen();
  }
})
let clock = new THREE.Clock()
function animate() {
  let t = clock.getElapsedTime()//秒
  // console.log("过去的时间", t)
  // let delayTime = clock.getDelta()//
  // console.log("间隔的时间", delayTime)
  // let t = time / 1000 % 5
  // cube.position.x = t;
  // cube.rotation.x = t
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
window.addEventListener("resize", () => {
  // 更新摄像头
  console.log(camera)
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 更新像素比
  renderer.setPixelRatio(window.devicePixelRatio);
})
animate()
