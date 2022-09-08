$(function () {
  $("#target-form").submit(getAndShowResults);
  $("#modal-opener").click(openModal);
  $(".modal-wrapper").click(closeModal);
});

function getAndShowResults(event) {
  const target = $("#target").val();
  const hours = $("#hours-for-target").val();

  if (target === "" || isNaN(hours)) {
    event.preventDefault();
    return;
  }

  $("#target-result").text(target);
  $("#days-for-target").text(calDaysForTarget(hours));
  $("html").animate(
    {
      scrollTop: $("#target-result").offset().top,
    },
    600
  );

  event.preventDefault();
}

function calDaysForTarget(hoursPerDay) {
  return Math.round(10000 / hoursPerDay).toString();
}

function openModal() {
  $(".modal-wrapper").css("display", "block");
  $(".modal-wrapper").animate({ opacity: 0 }, 0);
  $(".modal-wrapper").animate({ opacity: 1 }, 150);
}

function closeModal() {
  $(".modal-wrapper").animate({ opacity: 0 }, 150, () =>
    $(".modal-wrapper").css("display", "none")
  );
}
