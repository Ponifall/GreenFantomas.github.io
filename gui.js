navbarElement = `<li><a class="dropdown-item" href="#">X</a></li>`;

//Generate navbar
$("h2").each(function (index) {
  anchor = $(this).text();
  $("#navbar").append(
    navbarElement.replaceAll("X", anchor).replaceAll("#", "#" + this.id)
  );
});

var divId;

//Fix scrolling to anchor with fix navbar
$(".dropdown-item").click(function () {
  divId = $(this).attr("href");
  $("html, body").animate(
    {
      scrollTop: $(divId).offset().top - 54,
    },
    100
  );
});
