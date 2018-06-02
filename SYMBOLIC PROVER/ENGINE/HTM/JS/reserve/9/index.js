// v9.0.0.0 //

var solutionFOUND = false
var solutionSTEP = {}
var g_Solution = []

function evaluate(axiom,thm,solution){
  var axiomFOUND
  if(!solutionFOUND){
    var n
    var i = 0
    var next = 0
    var tmp = [...thm]
    while((n = thm.indexOf(axiom.state_machine[i],next)) > -1){
      next = n
      tmp[n] = ''
      i++
    }
    if(i == axiom.state_machine.length){
      var u = axiom.updateBASENET(next,tmp)
      thm = [...u].deflate()
      solution.push(thm)
      var lhs = solution.last().join(" ")
      var rhs = Axioms.Theorem.rhs.last().join(" ")
      if(axiom.basenet == rhs){
        solutionFOUND = true
        axiomFOUND = solution
        g_Solution.push(solution)
      }
      else
      {
        if(!(thm in solutionSTEP)){
          solutionSTEP[thm.join(" ")] = rhs
        }
        axiomFOUND = Axioms.search(thm,solution)
      }
    }
  }
  return axiomFOUND  
}
function Solve(){
  
  g_Solution = [] 
  Axioms.empty()
  Axioms.rebuild()
  
  console.clear()

  var thm = Axioms.Theorem.lhs[0]
  var rhs = Axioms.Theorem.rhs[0].join(' ')

  solutionFOUND = false
  solutionSTEP = {}
  solution = Axioms.search(thm,[Axioms.Theorem.lhs[0]]) 
  
  solutionEditor.innerText = ""
  if(solutionFOUND){
    g_Solution.map(function(nextSolu){
        nextSolu.map(function(step){
          solutionEditor.innerText += '\n' + step.join(' ') + ' = ' + rhs
          return step
        })
      return nextSolu
    })
  }
  else{
    solutionEditor.innerText = "\nProgress..."
    solutionSTEP.forEach(function(step){
      solutionEditor.innerText += '\n' + step + ' ?= ' + rhs
      return step
    })
  }
  console.log("solution:",solution)
}

// TODO //
// remove: 2 + 2 = 4, add: 1 + 1 + 2 = 4, still finds a solution (expand vs reduce)