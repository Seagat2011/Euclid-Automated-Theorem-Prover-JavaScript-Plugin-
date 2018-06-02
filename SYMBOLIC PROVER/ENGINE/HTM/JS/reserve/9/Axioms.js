
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

var Axioms = []
Axioms.attachSourceEditor(srcEditor)