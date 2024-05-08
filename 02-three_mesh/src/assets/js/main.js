import * as THREE from "three"
// bufferGeometry
// 创建场景
const scene = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(0, 0, 15)
scene.add(camera)
// 创建物体
// 创建几何结构
for (var i = 0; i <= 50; i++) {
  const geometry = new THREE.BufferGeometry();
  let positionArray = new Float32Array(9)
  for (let j = 0; j <= 9; j++) {
    positionArray[j] = Math.random() * 10 - 5
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
  // 创建材质
  let color = new THREE.Color(Math.random(), Math.random(), Math.random())
  const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 });
  const cube = new THREE.Mesh(geometry, material);
  // 物体添加到场景中
  scene.add(cube)
}
// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染器范围
renderer.setSize(window.innerWidth, window.innerHeight)
// 渲染器添加到body上
document.body.append(renderer.domElement)
renderer.render(scene, camera)