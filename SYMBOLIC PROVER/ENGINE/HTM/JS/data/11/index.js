/*

  AUTHOR
  Seagat2011 www.gitub.com/Seagat2011

  VERSION
  Major.Minor.Bugfix.Patch
  11.0.0.0

  DESCRIPTION
  Theorem prover written in HTML and JavaScript

  UPDATED
  -Axiom._eval eventListener
  +Axiom._eval => Axiom._reduce
  +Axiom.{_reduce,_expand} eventListener(s)
  +solutionEditor now contentEditable
  +Prove via Reduce functionality added
  +Prove via Expand functionality added
  +Prove via Auto functionality added

  REFERENCES

  COMPATIBILITY
  Chrome 35+
  
*/

var g_Solution = []
var g_code = []
var g_GUID = 1
var g_history = {}
var g_origin = "*"
g_code.attachSourceEditor({ edt:srcEditor,lib:libEditor,axm:axmEditor })

function reset(partial){
  g_Solution = []
  g_history = {}
  g_code._resetRound()
  if(!partial){
    solutionEditor.innerHTML = "" 
    g_code.build()
  }
}
function Solve(param){
  reset()   
  postMessage({ source:"axiomROOT",val:g_code.Theorem.lemma,indir:param },g_origin)
  console.clear() //console.log("Solution:",g_Solution)
}