import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
window.addEventListener("load", function () {
  init();
});

function init() {
  const options = {
    color: 0x00ffff,
  };
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true, //도형의 계단현상을 없앨수 있음
  }); //우리가 만든 장면을 웹상에 보여줄수 잇는 렌더러임 ,3d애들이 그려질 캔버스돔 요소가 들어있음

  renderer.setSize(window.innerWidth, window.innerHeight); //컨텐츠를 보여줄 캔버스 사이즈조절

  document.body.append(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75, // 시야각,for (field of view),물체를 바라볼때 얼마만큼의 시야각으로 바라볼지,각도가 넓어지면 카메라에 더 많은 범위가 담김
    window.innerWidth / window.innerHeight, //종횡비
    1, //near, 카메라가 얼마나 가까이 볼수 있는지
    500 //far, 카메라가 얼마나 멀리 볼 수 있는지 ?이건 뭐 pixcel단위겠지? 궁금
  );
  //위 파라미터에 해당하는 범위를 벗어나면 렌더링이 아예안됨,near,far는 필수가 아니지만 불필요한 범위에 있는 애들은 렌더링이 안되는게 좋으니 넣는게 좋다 성능을 위해서

  const controls = new OrbitControls(camera, renderer.domElement); //카메라를 쉽게 조작할 수 있는 객체, 카메라의 위치를 옮기는 거지 mesh의 위치가 변화하는게 아님
  controls.autoRotate = true; //카메라의 위치를 자동으로 돌림
  // controls.autoRotateSpeed = 3;
  // const axesHelper = new THREE.AxesHelper(5);//빨간색 x축, 초록색 y축 , 파란색 z축
  // scene.add(axesHelper);
  controls.enableDamping = true; //드래그를 했을때 바로 멈추는게 아니라 관성이 있어서 천천히 멈추겠금 한다
  // controls.dampingFactor = 0.01; //관성력
  // controls.enableZoom = true; //카메라 줌
  // controls.enablePan = true; //카메라를 잡고 움직일수 있음
  // controls.maxDistance = 50; //최대
  // controls.minDistance = 10; //최소 거리
  // controls.maxPolarAngle = Math.PI / 2; //카메라를 수직방향으로 움직일수 있는 최대,최소 각도
  // controls.minPolarAngle = Math.PI / 3;
  // controls.maxAzimuthAngle = Math.PI / 2; //카메라를 수평방향으로 움직일수 있는 최대,최소 각도
  // controls.minAzimuthAngle = Math.PI / 3;

  const cubeGeometry = new THREE.IcosahedronGeometry(1); //도형
  // const material = new THREE.MeshBasicMaterial({ color: 0xcc99ff }); //재질(조명의 영향을 안받음, 조명 추가 필요없음 어차피 잘보임)
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    emissive: 0x111111,
    // transparent: true, //불투명도 조절가능하게 함
    // opacity: 0.5,
    // visible: false,
    // wireframe: true, //true면 뼈대를 확인하는 용도로 사용
    // side: THREE.DoubleSide, //materia의 양면들 중에 어디를 렌더링 할 것인지를 정함
  }); //재질(조명의 영향을 안받음, 조명 추가 필요)

  const skeletonGeometry = new THREE.IcosahedronGeometry(2); //도형
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xaaaaaa,
  }); //재질

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);

  scene.add(cube, skeleton);

  camera.position.z = 5;
  // camera.lookAt(cube.position); //카메라가 항상 오브젝트를 중앙으로 비출수 있는 함수

  const directionLight = new THREE.DirectionalLight(0xffffff, 1); //직선으로 빛을 보냄
  // directionLight.position.set(-1, 2, 3);
  scene.add(directionLight);

  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); //씬 전체의 빛
  // ambientLight.position.set(3, 2, 1);
  // scene.add(ambientLight);

  const clock = new THREE.Clock();

  render();

  function render() {
    // cube.rotation.x = THREE.MathUtils.degToRad(45); //three에서 제공하는 수학함수: 원하는 각도를 넣으면 알아서 라디안값으로 변환해줌
    // cube.rotation.x += 0.01;
    // cube.position.y = Math.sin(cube.rotation.x);
    // cube.scale.x = Math.cos(cube.rotation.x);

    const elapsedTime = clock.getElapsedTime();
    // cube.rotation.x = elapsedTime;
    // cube.rotation.y = elapsedTime;
    // skeleton.rotation.x = elapsedTime * 1.5;
    // skeleton.rotation.y = elapsedTime * 1.5;

    controls.update(); //autoupdate같은걸 하면 매 렌더시 마다 업데이트 시켜줘야 적용이 된다
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight; //종횡비
    camera.updateProjectionMatrix(); //카메라에 대한 변화를 준경우 이 메소드를 꼭 실행해야 반영이됨
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    controls.update(); //autoupdate같은걸 하면 매 렌더시 마다 업데이트 시켜줘야 적용이 된다
  }
  window.addEventListener("resize", handleResize);

  //controller
  const gui = new GUI();
  // gui.add(cube.position, "y", -3, 3, 0.1);
  gui.add(cube.position, "y").min(-3).max(3).step(0.1);

  gui.add(cube, "visible");
  gui.addColor(options, "color").onChange((value) => {
    cube.material.color.set(value);
  });
}
