
function genProof(){
  console.clear()
  var solution = [theorem.LHS[0]]
  Axioms.map(function(axiom){
    var thm = theorem.LHS[0]
    var i = -1
    var I = theorem.LHS[0].length
    var doReset
    while(i++<I){
      var tok = thm[i];    
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
          theorem.LHS[0] = thm
          I = thm.length
          i = -1
        } // test(index) //
      } // test(tok) //
    } // while(i) //
    return axiom
  }); // map(...) //
  console.log("solution:",solution)
}

var theorem = {
  LHS:[["1","+","1","+","1","+","1"]],
  RHS:[["4"]],
}