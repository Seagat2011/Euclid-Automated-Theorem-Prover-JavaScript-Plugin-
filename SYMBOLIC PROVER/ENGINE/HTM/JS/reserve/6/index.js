
function genProof(){
  console.clear()
  var solution = [theorem.LHS[0]]
  var solutionFOUND = true
  while(solutionFOUND){
    solutionFOUND = false
    Axioms.map(function(axiom){
      var thm = theorem.LHS[0]
      var i = -1
      var I = theorem.LHS[0].length
      while(i++<I){
        var tok = thm[i];    
        if((tok in axiom.symbols) && (axiom.state_machine[axiom.index].id==tok)){
          axiom.state_machine[axiom.index].idx = i
          axiom.index++
          if(axiom.index==axiom.state_machine.length){
            solutionFOUND = true
            axiom.index = 0
            var tmp = [...thm]
            axiom.state_machine.map(function(u){
              tmp[u.idx] = null
              u.idx = null
              return u
            })
            tmp[i] = axiom.basenet
            thm = []
            tmp.map(function(u){
              if(u != null){
                thm.push(u)
              }
              return u
            })
            theorem.LHS[0] = thm
            solution.push(thm)
            I = thm.length
            i = -1
          } // test(idx) //
        } // test(tok) //
      } // while(i) //
      return axiom
    }); // map(...) //
  }
  console.log("solution:",solution)
}

var theorem = {
  LHS:[["1","+","1","+","1","+","1"]],
  RHS:[["4"]],
}

// TODO //
// Using 1 + 1 = 2 <=> 2 = 1 + 1, still reduces LHS to 4; (ie noise) // 
// removing 2 + 2 = 4, adding 1 + 1 + 1 + 1 = 4, still reduces LHS to 4; ie (depth vs breadth) //