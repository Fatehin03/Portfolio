const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById('bg'),alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

const geometry=new THREE.IcosahedronGeometry(2,1);
const material=new THREE.MeshStandardMaterial({color:0x7cf9ff,wireframe:true});
const mesh=new THREE.Mesh(geometry,material);
scene.add(mesh);

const light=new THREE.PointLight(0xffffff,1);
light.position.set(5,5,5);
scene.add(light);

camera.position.z=6;

function animate(){
  requestAnimationFrame(animate);
  mesh.rotation.x+=0.002;
  mesh.rotation.y+=0.003;
  renderer.render(scene,camera);
}

animate();

window.addEventListener('resize',()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});
