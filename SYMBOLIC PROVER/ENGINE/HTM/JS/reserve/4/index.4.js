
function genProof(){
  console.clear()
  var solution = [theorem.LHS[0]]
  var Axioms = [
    { symbols:{ "1":1, "+":1 }, state_machine:[new g_token("1"),new g_token("+"),new g_token("1")], index:0, basenet:"2" },
    { symbols:{ "2":1, "+":1 }, state_machine:[new g_token("2"),new g_token("+"),new g_token("2")], index:0, basenet:"4" },
    ];
  var thm = theorem.LHS[0]
  var i = -1
  var I = thm.length
  var doReset
  while(i++<I){
    var doReset = false
    var tok = thm[i];    
    Axioms.map(function(axiom){
        if((tok in axiom.symbols) && (axiom.state_machine[axiom.index].id==tok)){
          axiom.state_machine[axiom.index].idx = i
          axiom.index++
          if(axiom.index==axiom.state_machine.length){
            axiom.index = 0
            var tmp = [...thm]
            axiom.state_machine.map(function(u,j,me){
              tmp[u.idx] = null
              u.idx = null
              return u
            })
            tmp[i] = axiom.basenet
            thm = []
            tmp.map(function(u,j,me){
              if(u != null){
                thm.push(u)
              }
              return u
            })
            solution.push(thm)
            doReset = true
          }
        }
      return axiom
    });
    if(doReset){
      i = -1
    }    
  }// while(i) //
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
  LHS:[["1","+","2","+","1","+","1"]],
  RHS:[["4"]],
}