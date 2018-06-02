
function srcHighlighter(e){
  if(e && (e.srcElement.id=="axmEditor")){
    lineNumber.innerText = axmEditor
      .innerText
      .getLines()
      .map(function(_,idx){
        return "(" + ++idx + ")"
      }).join("\n")
  }
}
addEventListener("keyup",srcHighlighter,false);
addEventListener("keypress",srcHighlighter,false);