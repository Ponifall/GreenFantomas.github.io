const wolframURL = "https://www.wolframalpha.com/input/?i=";

function limRedirect() {
  lim = $("#lim").val();
  seek = $("#limSeek").val();
  window.open(
    wolframURL + encodeURIComponent(lim) + "+as+x->" + encodeURIComponent(seek)
  );
}

function maxRedirect() {
  func = $("#maxFunc").val();
  window.open(wolframURL + "max+z=" + encodeURIComponent(func));
}

function diffRedirect() {
  func = $("#diffFunc").val();
  x = $("#diffX").val();
  if (func == "") {
    $("#diffToast").toast("show");
    return;
  }

  if (x == "") {
    window.open(wolframURL + "y=(" + encodeURIComponent(func) + ")'");
  } else {
    window.open(
      wolframURL +
        "y=(" +
        encodeURIComponent(func) +
        ")',+x=" +
        encodeURIComponent(x)
    );
  }
}
