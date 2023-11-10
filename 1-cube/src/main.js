import * as THREE from "three";

window.addEventListener("load", function () {
  init();
});

function init() {
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

  const geometry = new THREE.BoxGeometry(2, 2, 2); //도형
  // const material = new THREE.MeshBasicMaterial({ color: 0xcc99ff }); //재질(조명의 영향을 안받음, 조명 추가 필요없음 어차피 잘보임)
  const material = new THREE.MeshStandardMaterial({
    color: "skyblue",
    transparent: true, //불투명도 조절가능하게 함
    opacity: 0.5,
    // visible: false,
    // wireframe: true, //true면 뼈대를 확인하는 용도로 사용
    side: THREE.DoubleSide, //materia의 양면들 중에 어디를 렌더링 할 것인지를 정함
  }); //재질(조명의 영향을 안받음, 조명 추가 필요)

  const cube = new THREE.Mesh(geometry, material);

  scene.add(cube);

  camera.position.set(3, 2, 5);
  camera.lookAt(cube.position); //카메라가 항상 오브젝트를 중앙으로 비출수 있는 함수

  const directionLight = new THREE.DirectionalLight(0xf0f0f0, 1); //직선으로 빛을 보냄
  directionLight.position.set(-1, 2, 3);
  scene.add(directionLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); //씬 전체의 빛
  ambientLight.position.set(3, 2, 1);
  scene.add(ambientLight);

  renderer.render(scene, camera);
}
