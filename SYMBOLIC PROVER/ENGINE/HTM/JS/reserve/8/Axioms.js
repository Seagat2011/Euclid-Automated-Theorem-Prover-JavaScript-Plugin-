
function g_Axiom(){
  var self = this
  var args = arguments[0]
  self.addProperties(args)  
  self.state_machine = args.expr.split(/\s+/)
}
g_Axiom.prototype = {}
g_Axiom.prototype.addProperties = function(args) {
  var self = this
  for(var o in args){
    if(args.hasOwnProperty(o)){
      self[o] = args[o]
    }
  }
}

var Axioms = [
//  new g_Axiom({ id:"2p2e4",expr:"2 + 2",basenet:"4" }),
//  new g_Axiom({ id:"1p1e2",expr:"1 + 1",basenet:"2" }),
//  { symbols: "(":1, ")":1, "scope.parens":["(+",")m"], index:0 }, //
];
Axioms.attachSourceEditor(srcEditor)