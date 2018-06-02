/*

  AUTHOR
  Seagat2011 www.gitub.com/Seagat2011
  eterna.cmu.edu/web/player/90270/
  fold.it/port/user/1992490

  VERSION
  Major.Minor.Bugfix.Patch
  1.0.0.0

  DESCRIPTION
  Properties file

  UPDATED
  

  REFERENCES

  COMPATIBILITY
  Chrome 53+
  
*/

Object.prototype.last = function(){
  var i = this.length-1
  return this[i]
}
Object.prototype.mylog = function(){
  var i,I = arguments.length
  var self = this
  this.innerText = ""
  for(i=0;i<I;i++){
    self.innerText += (arguments[i]).toString() + "\n"
  }
}
Object.prototype.appendlog = function(){
  var i,I = arguments.length
  var self = this
  for(i=0;i<I;i++){
    self.innerHTML += "<br>" + (arguments[i]).toString() + "<br>"
  }
  self.scrollIntoViewIfNeeded()
}
Object.prototype.startsWith = function(re){
  return this.toString().match(new RegExp("^"+re))
}
Object.prototype.empty = function(){
  this.length = 0
}
Object.prototype.forEach = function(cb){
  for(o in this){
    if(this.hasOwnProperty(o)){
      this[o] = cb(o,this[o],this)
    }
  }
}
Object.prototype.solutionComplete = function(u){
  var obj = this.join(" ").stripWhiteSpace().split(/\s+=\s+/)
  var result = obj[0]
  obj.map(function(w){
    if(result && (result != w)){
      result = ""
    }
  })
  if(result){
    result = "<br><br>Q.E.D. (via "+u+")"
  }
  return result
}
Object.prototype.getLines = function(){
  return this.toString().replace(/\n$/,"").split(/\n/)
}
Object.prototype._init = false
Object.prototype.init = function(){
    return this._init
}
Object.prototype.build = function(u){
  var self = this
  self.Libraries = self.lib.innerText.getLines()
  self.compileAxioms(self.axm.innerText.getLines())
  var w
  var lemma
  if(self.edt.id==self.axm.id){ // non-debug mode ? //
    var partial_lemma = self.axm.innerText.match(/Prove.*/i)[0]
    lemma = partial_lemma.replace(/Prove\s+/i,'')
    w = lemma.split(/\s+=\s+/g)
  }
  else { // debug mode //
    lemma = self.edt.innerText
    w = self.edt.innerText.split(/\s+=\s+/g)
  }
  self.Theorem = { 
    lhs:w[0], 
    rhs:w[1],
    lemma:lemma,
  }
  self._init = true
}
Object.prototype._roundPassed = function(){
  return (this._roundStatus && true)
}
Object.prototype._passRound = function(){
  this._roundStatus = true
}
Object.prototype._resetRound = function(){
  this._roundStatus = false
}
Object.prototype.stripWhiteSpace = function(){
  return this.replace(/^\s+|\s+$/,"").replace(/\s{2,}/g," ")
}
Object.prototype.compileAxioms = function(a){
  var self = this
  a && a.map(function(u,idx){
    var _u = u.split(/\s+\=\s+/)
    if(idx in self){
      self[idx]._update
        ({ 
          _axiom:_u[0],
          _basenet:_u[1],
          _stack:[],
          _history:{},
          _isOnline:true,          
          _basenetFOUND:"68934A3E9455FA72420237EB05902327"
        })
    }
    else{
      self.push(new _AXIOM_
        ({ 
          _guid:"axiom_"+g_GUID,
          _id:g_GUID++,
          _axiom:_u[0],
          _basenet:_u[1],
          _stack:[],
          _history:{},
          _isOnline:true,
          _false:"68934A3E9455FA72420237EB05902327",
          _basenetFOUND:"68934A3E9455FA72420237EB05902327",
          _solutionEditor:self.solutionEditor
        })
      ) 
    }
    return u
  })
  self.turnAxiomsOffFrom(a.length)
}
Object.prototype.turnAxiomsOffFrom = function(i){
  var self = this
  var I = self.length
  for(i;i<I;i++){
    self._isOnline = false
  }
}
Object.prototype.attachSourceEditor = function(){
  var self = this
  var args = arguments[0]
  args.forEach(function(w){
    self[w] = args[w]
    return w
  })
}
Object.prototype.addTAG = function(s){
  return "<"+s+">("+this.toString()+")</"+s+">"
}