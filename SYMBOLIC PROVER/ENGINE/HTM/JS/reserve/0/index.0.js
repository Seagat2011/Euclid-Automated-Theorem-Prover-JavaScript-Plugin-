
function simplify(me){

}
Object.prototype.buildAtLHS = function(me,o,idx){
  var j = idx
  for(i=0;i<j;i++){
    this.push(me[i])
  }
}
Object.prototype.buildAtAxiom = function(o,idx){
  var self = this
  var k = o.val.length-1
  //self.push("(");
  o.val[k].map(
    function(u,idx,me){
      self.push(u)
      return u
    }
  );
  //self.push(")")
}
Object.prototype.buildAtRHS = function(me,o,idx){
  var J = me.length
  var I = idx - o._haltIDX
  for(var i=I;i<J;i++){
    this.push(me[i])
  }
}
function parse_TOKEN(tok,tokIDX,me,stepJDX){
  (tok in Symbol) && Symbol[tok].map(function(_axiomLIBRARY_,axmLIBRARYIDX,me2){
    _axiomLIBRARY_.map(function(col,axmIDX,me3){
      //if(axmIDX>0){ //assuming [i,j] //
        var i = axmLIBRARYIDX//0 //axmIDX//
        var j = col
        //var k = axmLIBRARYIDX
        var o = Axiom[i]._test(tokIDX,j)
        if(o && o.halt){
          var tmp = []
          tmp.buildAtLHS(me,o,IDX)
          tmp.buildAtAxiom(o,IDX)
          tmp.buildAtRHS(me,o,IDX)
          me.push([...tmp])
        }
      //}
      return col
    })
    return _axiomLIBRARY_
  })
  return tok
}
function parse_STATEMENT(u,idx,me){
  var I = u.length;
  for(var i=0;i<I;i++){
    parse_TOKEN(u[i],i,u,idx)
  }
}
Object.prototype.LHS_map = function(){
  this.LHS.map(parse_STATEMENT)
}
Object.prototype.RHS_map = function(){
  this.RHS.map(parse_STATEMENT)
}
function genProof(){
  theorem.LHS_map() 
  theorem.RHS_map()
}
function srcHighlighter(){
  var o = srcEditor.innerText.split(/\n/).map(
    function(txt,idx,me){
      if(txt.match(/^#|\/\//)){
        txt = "<comment>" + txt + "</comment>";
      }
      return txt;
    }
  );
  srcHlt.innerHTML = o.join("<br>")
}
addEventListener("keyup",srcHighlighter,false);

var solution = []
var theorem = {
  LHS:[
    ["1","+","1","+","1","+","1"],
    ],
  RHS:[
    ["4"]
    ],
}