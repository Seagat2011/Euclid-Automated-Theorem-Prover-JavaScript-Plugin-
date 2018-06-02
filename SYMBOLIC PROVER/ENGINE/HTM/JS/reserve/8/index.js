// v8.0.0.0 //

function Solve(){
  
  Axioms.build()
  
  console.clear()
  var thm = Axioms.Theorem.lhs[0]
  var solution = [Axioms.Theorem.lhs[0]]
  var solutionFOUND = true
  while(solutionFOUND){
    solutionFOUND = false
    Axioms.map(function(axiom) {
      var n, i = 0, next = 0, tmp = [...thm]
      while((n = thm.indexOf(axiom.state_machine[i],next)) > -1){
        next = n
        tmp[n] = ""
        i++
      }
      if(i == axiom.state_machine.length){
        tmp[next] = axiom.basenet
        thm = [...tmp].deflate()
        solution.push(thm)
        srcEditor.innerText += "\n" + tmp.join(" ") + " = " + Axioms.Theorem.rhs[0].join(" ")
        solutionFOUND = true
      }
      return axiom
    }); // map(...) //
  }
  //solution.deflateSOLUTION()
  console.log("solution:",solution)
}

// TODO //
// Using 1 + 1 = 2 <=> 2 = 1 + 1, still reduces LHS to 4; (ie noisetolerance) // 
// removing 2 + 2 = 4, adding 1 + 1 + 1 + 1 = 4, still reduces LHS to 4; ie (depth-first v breadth-first) //