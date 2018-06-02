
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
    self.innerText += (arguments[i]).toString() + "\n"
  }
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
Object.prototype.build = function(u) {
  var u = this.edt.innerText.split(/\n{2}/)
  var u0 = u[0].split(/\n/)
  var u1 = u[1].split(/\n/)
  var u2 = u[2].split(/\n/)
  u0.shift()
  u1.shift()
  u2.shift()
  this.Libraries = u0
  this.compileAxioms(u1)
  var w = u2[0].split(/\s+=\s+/g)
  this.Theorem = { 
    lhs:w[0], 
    rhs:w[1] 
  } 
}
Object.prototype.stripWhiteSpace = function(){
  return this.replace(/^\s+/,"").replace(/\s+$/,"")
}
Object.prototype.toRegExp = function(){
  var args = [];
  var a = this
    .split(/\s+/)
    .map(function(u,i,me){
      var v = u.replace(/([+-.\\*'"])+/g,"\\$1")
      args.push(v)
      if(++i in me){
        args.push("([^"+me[i].replace(/([+-.\\*'"])+/g,"\\$1")+"]+)")
      }
      return u
    })
  return args.join("")
}
Object.prototype.compileAxioms = function(a){
  var self = this
  a.map(function(u,idx){
    var _u = u.split(/\s+\=\s+/)
    if(idx in self){
      self[idx]._update
        ({ 
          _axiom:new RegExp(_u[0].toRegExp(),"g"),
          _basenet:_u[1],
          _stack:[],
          _history:{}
        })
    }
    else{
      self.push(new _AXIOM_
        ({ 
          _guid:"axiom_"+g_GUID++,
          _axiom:new RegExp(_u[0].toRegExp(),"g"),
          _basenet:_u[1],
          _stack:[],
          _history:{},
          _isOnline:true,
          _basenetFOUND:false
        })
      ) 
    }
    return u
  })
  self.turnAxiomsOfflineFrom(a.length)
}
Object.prototype.turnAxiomsOfflineFrom = function(i){
  var self = this
  var I = self.length
  for(i;i<I;i++){
    self._isOnline = false
  }
}
Object.prototype.attachSourceEditor = function(o){
  this.edt = o
}