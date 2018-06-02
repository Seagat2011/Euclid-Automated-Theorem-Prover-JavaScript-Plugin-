
function genProof(){
  console.clear()
  //theorem.LHS_map() 
  //theorem.RHS_map()
  var solution = [theorem.LHS[0]]
  var axioms = [new g_token("1"),new g_token("+"),new g_token("1")]
  var axiomsIDX = 0
  var symbols = { "1":1, "+":1 }
  var thm = theorem.LHS[0]
  var i = -1
  var I = thm.length
  while(++i<I){
    var tok = thm[i]
    if(tok in symbols){
      if(axioms[axiomsIDX].id==tok){
        axioms[axiomsIDX].idx = i
        axiomsIDX++
        if(axiomsIDX==axioms.length){
          axiomsIDX = 0
          var tmp = [...thm]
          axioms.map(function(u,j,me){
            tmp[u.idx] = null
            u.idx = null
            return u
          })
          tmp[axioms.length-1] = "2"
          thm = []
          tmp.map(function(u,j,me){
            if(u != null){
              thm.push(u)
            }
            return u
          })
          solution.push(thm)
          i = -1
        }
      }
    }
  }
  console.log("solution:",solution)
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