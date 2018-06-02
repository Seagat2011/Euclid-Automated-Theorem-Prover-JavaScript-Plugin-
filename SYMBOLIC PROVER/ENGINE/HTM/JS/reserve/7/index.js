
function genProof(){
  console.clear()
  var thm = theorem.LHS[0]
  var solution = [...theorem.LHS[0]]
  var solutionFOUND = true
  while(solutionFOUND){
    solutionFOUND = false
    Axioms.map(function(axiom){
      var thm2 = thm[0].replace(axiom.regex,function(stm,b0,num,b1,op,b2,num2,b3){
        num2 = axiom.basenet
        return (b0+b1+num2+b3).replace(/\s+/g," ")
      }) 
      if(thm2 != thm[0]) {
        thm[0] = thm2
        solution.push(thm2)
        solutionFOUND = true
      }
      return axiom
    }); // map(...) //
  }
  console.log("solution:",solution)
}

var theorem = {
  LHS:[["1 + 2 + 2 + 1"]],
  RHS:[["4"]],
}

// TODO //
// Using 1 + 1 = 2 <=> 2 = 1 + 1, still reduces LHS to 4; (ie noise) // 
// removing 2 + 2 = 4, adding 1 + 1 + 1 + 1 = 4, still reduces LHS to 4; ie (depth vs breadth) //