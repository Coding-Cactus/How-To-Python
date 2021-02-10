let themen = 0;
const themes = ["style.css", "dark.css", "style-1.css", "dark-1.css"]
function changeTheme(){
  themen++;
  if(themen === themes.length) themen = 0
  document.querySelector(`link[rel=stylesheet][type]`).href=themes[themen];
}

function hl(tokens, code) {
    var ind = 0;
    var str = code;
    var tks = "";
    while (str.length > ind) {
      var i, m;
      for (i in tokens) {
        var m = [];
        let z = 0;
        str.replace(new RegExp(tokens[i], "gm"), function (n) {
          var l = arguments[arguments.length - 2];
          if (z) return;
          if (l == ind) {
            z = 1;
            m[0] = l;
            m[1] = n.length + l;
          }
          if (l > ind) { z = 1 }
        });
        if (m.length == 0) continue;
        break;
      }
      if (m.length == 0 || m[0] != ind || m[1] == ind) {
        tks += str[ind]
        ind++;
        continue;
      }
      ind += m[1] - m[0];
      tks += "<span class='"+i+"'>" + str.slice(m[0], m[1]) + "</span>"
    }
    return tks;
  }
  py = {
    "comment": /(#[^\n]*)/,
    "str": /\w?"([^"]|(?<=\\)")*"/,
    "num": /(?<!\w)(\-)?(\d+(?:\.\d*)?|\.\d+)/,
    "key": /(?<!\w)(print|False|await|else|import|pass|None|break|except|in|raise|True|class|finally|is|return|and|continue|for|lambda|try|as|def|from|nonlocal|while|assert|del|global|not|with|async|elif|if|or|yield)(?!\w)/
  }

codes = document.querySelectorAll("div.code code")
codes.forEach(function(itm){
  //code here
	itm.innerHTML = hl(py, itm.textContent);
})