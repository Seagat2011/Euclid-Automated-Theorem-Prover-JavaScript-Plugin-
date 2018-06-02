
function g_token(id){
  this.id = id
  this.idx = null 
}

function g_Axiom(){
  var args = arguments[0]
  this.addProperties(args)
  if("state_machine" in args){
    self.index = 0
    self.state_machine = args.state_machine.map(function(u){
      return new g_token(u)
    })
  }
}

function g_evaluator(){ // g_evaluator("state_machine",["1","+","1"],"2") //
  
}

var Axioms = [
//  new g_Axiom({ id:"1p1e2",state_machine:["1","+","1"],basenet:"2" }),
//  new g_Axiom({ id:"2p2e4",state_machine:["2","+","2"],basenet:"4" }),

  { id:"1p1e2", symbols:{ "1":2, "+":1 }, state_machine:[new g_token("1"),new g_token("+"),new g_token("1")], index:0, basenet:"2" },
  { id:"2p2e4", symbols:{ "2":2, "+":1 }, state_machine:[new g_token("2"),new g_token("+"),new g_token("2")], index:0, basenet:"4" },
//  { symbols: "(":1, ")":1, "scope.parens":["(+",")m"], index:0 }, //
];