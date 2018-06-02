/*

  AUTHOR
  Seagat2011 www.gitub.com/Seagat2011
  eterna.cmu.edu/web/player/90270/
  fold.it/port/user/1992490

  VERSION
  Major.Minor.Bugfix.Patch
  11.0.0.0

  DESCRIPTION
  Theorem prover written in HTML and JavaScript

  UPDATED
  -Axiom._eval eventListener
  +Axiom._eval => Axiom._reduce
  +Axiom.{_reduce,_expand} eventListener(s)
  +solutionEditor made contentEditable
  +Prove via Reduce functionality added
  +Prove via Expand functionality added
  +Prove via Auto functionality added
  +scoping functionality

  REFERENCES

  COMPATIBILITY
  Chrome 53+
  
*/

var g_Solution = []
var g_code = []
var g_GUID = 1
var g_history = {}
var g_origin = "*"
//g_code.attachSourceEditor({ edt:edtCtl,lib:libEditor,axm:axmEditor,solutionEditor:solutionEditor }) // debug-mode only //

function reset(partial){
  g_Solution = []
  g_history = {}
  g_code._resetRound()
  if(!partial && g_code.init()){
    g_code.solutionEditor.innerHTML = "" 
    g_code.build()
  }
}
function Solve(param){
  if(!g_code.init()){    
    g_code.attachSourceEditor({ edt:axmEditor,lib:libEditor,axm:axmEditor,solutionEditor:solutionEditor })
    g_code.build()
  }
  reset()   
  postMessage({ source:"axiomROOT",val:g_code.Theorem.lemma,indir:param },g_origin)
  console.clear() 
}