// $(function () {
//   $("#target-form").submit(getAndShowResults);
//   $("#modal-opener").click(openModal);
//   $(".modal-wrapper").click(closeModal);
// });

// function getAndShowResults(event) {
//   const target = $("#target").val();
//   const hours = $("#hours-for-target").val();

//   if (target === "" || isNaN(hours)) {
//     event.preventDefault();
//     return;
//   }

//   $("#target-result").text(target);
//   $("#days-for-target").text(calDaysForTarget(hours));
//   $("html").animate(
//     {
//       scrollTop: $("#target-result").offset().top,
//     },
//     600
//   );

//   event.preventDefault();
// }

// function calDaysForTarget(hoursPerDay) {
//   return Math.round(10000 / hoursPerDay).toString();
// }

// function openModal() {
//   $(".modal-wrapper").css("display", "block");
//   $(".modal-wrapper").animate({ opacity: 0 }, 0);
//   $(".modal-wrapper").animate({ opacity: 1 }, 150);
// }

// function closeModal() {
//   $(".modal-wrapper").animate({ opacity: 0 }, 150, () =>
//     $(".modal-wrapper").css("display", "none")
//   );
// }

const $form = document.getElementById("target-form");
const $target = document.getElementById("target");
const $hours = document.getElementById("hours-for-target");
const $targetResult = document.getElementById("target-result");
const $resultValue = document.getElementById("days-for-target");

$form.addEventListener("submit", getAndShowResults);

const $modalOpener = document.getElementById("modal-opener");
const $modalWrapper = document.getElementById("modal-wrapper");

$modalOpener.addEventListener("click", openModal);
$modalWrapper.addEventListener("click", closeModal);

function getAndShowResults(event) {
  const targetVal = $target.value;
  const hoursVal = $hours.value;
  console.log(targetVal);

  if (targetVal === "" || isNaN(hoursVal)) {
    event.preventDefault();
    return;
  }

  $targetResult.textContent = targetVal;
  $resultValue.textContent = calDaysForTarget(hoursVal);

  $targetResult.scrollIntoView({ behavior: "smooth" });

  event.preventDefault();
}

function calDaysForTarget(hoursPerDay) {
  return Math.round(10000 / hoursPerDay).toString();
}

function openModal() {
  $modalWrapper.style.display = "block";
  $modalWrapper.classList.add("activated");
}

function closeModal() {
  $modalWrapper.classList.remove("activated");
  setTimeout(() => ($modalWrapper.style.display = "none"), 400);
}
