var notationBases = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "16"];

function calcLog2() {
  k = $("#logK").val();
  $("#logKN").val(Math.log2(k));
  $("#logKNAnswer").val(Math.ceil(Math.log2(k)));
}

function getAsciiCode() {
  var char = $("#charToAscii").val();
  $("#asciiNum").val(char.charCodeAt(0));
  $("#asciiHex").val(char.charCodeAt(0).toString(16));
}

function getCharFromASCII() {
  var num = $("#numToAscii").val();
  var hex = $("#hexToAscii").val();
  if (num != "") {
    $("#asciiChar").val(String.fromCharCode(num));
  } else {
    $("#asciiChar").val(String.fromCharCode(parseInt(hex, 16)));
  }
}

function decodeThreeBits() {
  str = $("#stringToDecodeThree").val();
  if (str.length % 3 != 0) {
    $("#decodeThreeBits-toast").toast("show");
    return;
  }

  blocks = [];
  final = "";
  for (i = 0; i < str.length; i++) {
    if (i % 3 == 0) {
      blocks[i / 3] = "";

      if (i > 0) {
        final +=
          blocks[i / 3 - 1].split("0").length - 1 >
          blocks[i / 3 - 1].split("1").length - 1
            ? "0"
            : "1";
      }
    }

    blocks[Math.floor(i / 3)] += str[i];
  }
  final +=
    blocks[blocks.length - 1].split("0").length - 1 >
    blocks[blocks.length - 1].split("1").length - 1
      ? "0"
      : "1";
  $("#decodedThreeBits").val(final);
}

function entropy(p) {
  return -1 * p * Math.log2(p);
}

function calcDelta() {
  code1 = $("#deltaInput1").val();
  code2 = $("#deltaInput2").val();

  if (code1.length != code2.length && code1 != "" && code2 != "") {
    $("#deltaError-toast").toast("show");
    return;
  }
  $("#deltaError-toast").toast("hide");

  delta = 0;
  for (i = 0; i < code1.length; i++) {
    if (code1[i] != code2[i]) delta++;
  }

  $("#delta").val(delta);
}

function calcNotation(element) {
  if (element.value == "") {
    return;
  }
  base = element.id.replace("notation", "");
  for (i = 0; i < notationBases.length; i++) {
    $("#notation" + notationBases[i]).val(
      parseInt(element.value, base).toString(notationBases[i]).toUpperCase()
    );
  }
}

function calcNotations() {
  n = $("#notationN").val();
  t = $("#notationT").val();
  notations = "";
  for (i = 2; i <= 36; i++) {
    a = parseInt(n, 10).toString(i);
    if (a[a.length - 1] == "4") {
      notations += i + ",";
    }
  }
  $("#notations").val(notations.substring(0, notations.length - 1));
}

function calcCode(element) {
  type = element.id.split("Code")[0];

  num = $("#" + type + "Code").val();

  if (num == "" || num.length != 7) {
    return;
  }

  reverse = flipbits(num);
  switch (type) {
    case "direct":
      $("#reverseCode").val(reverse);
      add = fillAndStripBits((parseInt(reverse, 2) + 1).toString(2));
      $("#addCode").val(add);
      break;
    case "reverse":
      $("#directCode").val(reverse);
      add = fillAndStripBits((parseInt(num, 2) + 1).toString(2));
      $("#addCode").val(add);
      break;
    case "add":
      reverse = fillAndStripBits((parseInt(num, 2) - 1).toString(2));
      $("#reverseCode").val(reverse);
      $("#directCode").val(flipbits(reverse));
      break;
  }
}

function flipbits(str) {
  return str
    .split("")
    .map(function (b) {
      return (1 - b).toString();
    })
    .join("");
}

function fillAndStripBits(str) {
  n = "";
  for (i = 0; i < 7 - str.length; i++) {
    n += "0";
  }
  n += str;
  if (n.length > 7) {
    n = n.substring(1, 7);
  }
  return n;
}
