
function genProof(){
  console.clear()
  //theorem.LHS_map() 
  //theorem.RHS_map()
  var solution = [theorem.LHS[0]]
  var thm = theorem[0]
}
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

var theorem = {
  LHS:[["1","+","1","+","1","+","1"]],
  RHS:[["4"]],
}