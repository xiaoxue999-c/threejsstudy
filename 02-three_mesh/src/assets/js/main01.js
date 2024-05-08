import * as THREE from "three"
//炫酷三角形
// 创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(0, 0, 5)
scene.add(camera)
// 创建物体
// 创建几何结构
const geometry = new THREE.BufferGeometry(1);
const vertics = new Float32Array([
  -1.0, -1.0, 1.0, // v0
  1.0, -1.0, 1.0, // v1
  1.0, 1.0, 1.0, // v2

  1.0, 1.0, 1.0, // v3
  -1.0, 1.0, 1.0, // v4
  -1.0, -1.0, 1.0  // v5
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertics))
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// 物体添加到场景中
scene.add(cube)
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器范围
renderer.setSize(window.innerWidth, window.innerHeight)
// 渲染器添加到body上
document.body.append(renderer.domElement)
renderer.render(scene, camera)