
function g_token(id){
  this.id = id
  this.idx = null 
}

function g_Axiom(){
  var self = this
  var args = arguments[0]
  this.addProperties(args)
  if("state_machine" in args){
    self.index = 0
    self.symbols = {}
    self.state_machine = args.state_machine.map(function(u){
      if(u in self.symbols){
        self.symbols[u]++
      }
      else{
        self.symbols[u] = 1
      }
      return new g_token(u)
    })
  }
}

var Axioms = [
  new g_Axiom({ id:"2p2e4",state_machine:["2","+","2"],basenet:"4" }),
  new g_Axiom({ id:"1p1e2",state_machine:["1","+","1"],basenet:"2" }),
//  { symbols: "(":1, ")":1, "scope.parens":["(+",")m"], index:0 }, //
];
Axioms.updateSymbolTable()