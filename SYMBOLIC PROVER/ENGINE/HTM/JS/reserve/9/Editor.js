
function srcHighlighter(){
  var o = srcEditor.innerText.split(/\n/).map(
    function(txt,idx,me){
      if(txt.match(/^#|\/\//)){
        txt = "<comment>" + txt + "</comment>";
      }
      return txt;
    }
  );
  srcHlt.innerHTML = o.join("<br>")
}
addEventListener("keyup",srcHighlighter,false);