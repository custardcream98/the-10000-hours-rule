/*
  Vanilla JS

  공통 로직

  1. 처음 페이지가 로드될 때 eventListener들을 선언합니다.

  각각의 로직은 각 함수에 적었습니다.
*/

/**
 * 클래스 이름들로 요소 Ref 를 반환하는 함수
 * @param {string} classNames
 * @returns {HTMLCollectionOf<Element>} 요소 Collection
 */
const getByClass = (classNames) => document.getElementsByClassName(classNames);

const $ruleForm = getByClass("rule-form-js")[0];
const $inputTarget = getByClass("rule-form__input-target-js")[0];
const $inputHours = getByClass("rule-form__input-hours-js")[0];
const $resultTarget = getByClass("result__target-js")[0];
const $resultDays = getByClass("result__days-js")[0];

const $shareBtn = getByClass("share-link")[0];

const $modalOpenerBtn = getByClass("cheerup-modal__opener-js")[0];
const $modalWrapper = getByClass("cheerup-modal__wrapper-js")[0];

$ruleForm.addEventListener("submit", getAndShowResults);

$shareBtn.addEventListener("click", copyShareLink);

$modalWrapper.addEventListener("wheel", preventScroll, { passive: false });
$modalWrapper.addEventListener("touchmove", preventScroll, {
  passive: false,
}); // 모바일
/* 
  passive: false 옵션을 줘서 preventDefault() 메소드를 사용할 수 있게 합니다.

  Bubbling은 막았지만
  Captureing을 건들지는 못해서
  modal이 길어질 경우 modal 자체의 스크롤이 안됩니다.

  추후 보완사항으로 우선은 남겨뒀습니다.
*/

$modalOpenerBtn.addEventListener("click", openModal);
$modalWrapper.addEventListener("click", closeModal);

/**
 * 입력값이 들어오는 `<form>` 요소의
 * `submit` 이벤트를 헨들링하는 함수
 * @param {SubmitEvent} event
 */
function getAndShowResults(event) {
  const targetVal = $inputTarget.value;
  const hoursVal = parseFloat($inputHours.value);
  // 각 입력값을 불러옵니다.
  // 시간은 float으로 형변환합니다.

  if (targetVal === "" || isNaN(hoursVal)) {
    // 두 값중 하나라도 비어있다면 아무것도 하지 않습니다.
    event.preventDefault();
    return;
  }

  // 결과가 들어갈 곳을 채웁니다.
  $resultTarget.textContent = targetVal;
  $resultDays.textContent = calDaysForTarget(hoursVal);

  // 결과로 자동 스크롤
  $resultTarget.scrollIntoView({ behavior: "smooth" });

  // default action의 작동을 막습니다.
  event.preventDefault();
}

/**
 * 1만 시간까지 몇 일 걸릴지 계산하는 함수
 * @param {number} hoursPerDay - 하루에 투자할 시간
 * @return {string} 1만 시간까지 걸리는 일 수
 */
function calDaysForTarget(hoursPerDay) {
  return Math.round(10000 / hoursPerDay).toString();
}

/**
 * 공유할 링크를
 * 사용자의 클립보드에 복사하는 함수
 *
 * 복사에는 `Clipboard API`를 사용했습니다.
 *
 * [참고한 MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
 * @param {MouseEvent} event
 */
async function copyShareLink(event) {
  // event를 일으킨 요소에서 data attribute를 통해 복사할 링크를 가져옵니다.
  const link = event.target.dataset.copiedlink;

  // writeText 메소드는 비동기적으로 작동합니다.
  await navigator.clipboard.writeText(link);

  window.alert("🙌 링크가 복사됐습니다 🙌\n친구에게 공유해보세요 😁👍");
}

/**
 * modal 배경 스크롤을 방지하기 위한 함수
 * @param {Event} event
 */
function preventScroll(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

/**
 * modal 창을 여는 함수
 */
function openModal() {
  /*
    먼저 display: none; 이던 wrapper에
    display: block;을 부여해 보이도록 합니다.
  */
  $modalWrapper.style.display = "block";

  /*
    activated class를 부여해서 animation을 트리거합니다.
  */
  $modalWrapper.classList.add("activated");
}

/**
 * modal 창을 닫는 함수
 */
function closeModal() {
  /*
    activated class를 삭제해서 animation을 트리거합니다.
  */
  $modalWrapper.classList.remove("activated");

  /*
    400ms만큼의 애니메이션이 끝나면
    display: none;을 다시 부여해 가립니다.
  */
  setTimeout(() => ($modalWrapper.style.display = "none"), 400);
}
