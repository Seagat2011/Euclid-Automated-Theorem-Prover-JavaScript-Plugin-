
function g_token(id){
  this.id = id
  this.idx = null 
}
Object.prototype.updateAllStateMachines = function(){
  
}
Object.prototype.getLength = function(){
  return this.split(/\s+/).length
}

Object.prototype.tokenize = function(){
  return this.split(/\s+/).map(function(u,idx,me){
    return new g_token(u)
  })
}
Object.prototype.rebuildStatementFromAxiom = function(me,o){
  var self = this
  var t = [...me]
  o.incidenceMap.map(function(u,idx,me2){
    t[u.idx] = null
    return u
  })
  var i = o.incidenceMap.length-1
  var j = o.incidenceMap[i].idx
  t[j] = o.ref
  t.map(function(u,idx,me2){
    if(u != null){
      self.push(u)
    }
    return u
  })
}
Object.prototype.LHS_map = function(){
  this.LHS[0].lhsROOT = this.LHS
  this.LHS[0].map(parse_lhsTOKEN)
}
Object.prototype.RHS_map = function(){
  this.RHS[0].rhsROOT = this.RHS
  this.RHS[0].map(parse_rhsTOKEN)
}
Object.prototype.getBASENET = function(){
  return this.replace(/\d+$/,"0")
}