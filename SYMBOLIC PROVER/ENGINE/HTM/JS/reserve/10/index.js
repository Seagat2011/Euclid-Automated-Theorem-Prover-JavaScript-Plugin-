// v10.0.0.0 //

var g_Solution = []
var g_code = []
var g_GUID = 0
var g_history = {}
var g_origin = "*"
g_code.attachSourceEditor(srcEditor)

function reset(){
  g_Solution = []
  g_history = {}
  solutionEditor.innerText = "" 
  g_code.build()
}
function Solve(){ 
  reset()
  postMessage({ source:"axiomROOT",val:g_code.Theorem.lhs,basenet:g_code.Theorem.rhs },g_origin)
  console.clear()
  console.log("Solution:",g_Solution)
}

// TODO //
// remove: 2 + 2 = 4, add: 1 + 1 + 2 = 4, still finds a solution (expand vs reduce)