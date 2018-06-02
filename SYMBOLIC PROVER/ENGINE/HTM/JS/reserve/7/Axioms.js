
function g_Axiom(){
  var self = this
  var args = arguments[0]
  this.addProperties(args)  
  this.regex = new RegExp("(.*)" 
    + args.expr.replace(/(\+)/g,"\\$1")
      .replace(/([\\\(\)\{\}\-\+\w]+)/g,"($1)")
      .split(/\s+/)
      .join("(.+)") + "(.*)")
}

var Axioms = [
  new g_Axiom({ id:"2p2e4",expr:"2 + 2",basenet:"4" }),
  new g_Axiom({ id:"1p1e2",expr:"1 + 1",basenet:"2" }),
//  { symbols: "(":1, ")":1, "scope.parens":["(+",")m"], index:0 }, //
];