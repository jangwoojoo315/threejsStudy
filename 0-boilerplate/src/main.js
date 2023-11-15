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

  camera.position.z = 5;

  render();

  function render() {
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
}
