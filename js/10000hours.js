/*
  Vanilla JS

  공통 로직

  1. 처음 페이지가 로드될 때 eventListener들을 선언합니다.

  각각의 로직은 각 함수에 적었습니다.
*/

/**
 * Selector로 요소 Ref 를 반환하는 함수
 * @param {string} selector
 * @returns {Element}
 */
const getBySelector = (selector) => document.querySelector(selector);

const $ruleForm = getBySelector(".rule-form-js");
const $inputTarget = getBySelector(".rule-form__input-target-js");
const $inputHours = getBySelector(".rule-form__input-hours-js");
const $resultSection = getBySelector("section.result-js");
const $resultTarget = getBySelector(".result__target-js");
const $resultDays = getBySelector(".result__days-js");

const $shareBtn = getBySelector(".share-link-js");

const $modalOpenerBtn = getBySelector(".cheerup-modal__opener-js");
const $modalWrapper = getBySelector(".cheerup-modal__wrapper-js");

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

/**
 * 모달 창을 열거나 닫는 함수
 * @returns {none}
 */
const toggleModalActivation = () => toggleActivation($modalWrapper);

$modalOpenerBtn.addEventListener("click", toggleModalActivation);
$modalWrapper.addEventListener("click", toggleModalActivation);

/**
 * `.activated` / `.deactivated` class 토글
 * @param {Element} element
 */
function toggleActivation(element) {
  const state = element.classList.contains("activated");
  const classToRemove = state ? "activated" : "deactivated";
  const classToAdd = state ? "deactivated" : "activated";

  element.classList.remove(classToRemove);
  element.classList.add(classToAdd);
}

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

  /* 유효성 검사 */
  if (targetVal === "" || hoursVal === NaN) {
    return;
  }

  // 결과가 들어갈 곳을 채웁니다.
  $resultTarget.textContent = targetVal;
  $resultDays.textContent = calDaysForTarget(hoursVal);

  // 가려져 있던 결과 section을 보여줍니다.
  if ($resultSection.classList.contains("deactivated"))
    toggleActivation($resultSection);

  // 결과로 자동 스크롤
  $resultTarget.scrollIntoView({ behavior: "smooth" });

  // input의 입력값을 초기화합니다.
  $inputTarget.value = "";
  $inputHours.value = "";

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
