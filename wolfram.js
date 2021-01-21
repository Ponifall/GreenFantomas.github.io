const wolframURL = "https://www.wolframalpha.com/input/?i=";

function limRedirect() {
  lim = $("#lim").val();
  seek = $("#limSeek").val();
  window.open(
    wolframURL + encodeURIComponent(lim) + "+as+x->" + encodeURIComponent(seek)
  );
}
