
Object.prototype.last = function(){
  var i = this.length-1
  return this[i]
}

Object.prototype.search = function(thm,solution){
  var exec = [[],[]]
  var solu = {}
  var ret = []
  this.map(function(axiom,idx) {
    exec[0].push("solu["+idx+"] = evaluate(Axioms["+idx+"],[...thm],[...solution])")
    var code = [      
      "if(solu["+idx+"]){",
      " ret.push(solu["+idx+"])",
      "}"
    ];
    exec[1].push(code.join("\n"))
    return axiom
  })
  exec[0] = exec[0].join("\n")
  exec[1] = exec[1].join("\n")
  eval(exec.join("\n\n"))
  return ret
}
Object.prototype.deflate = function () {
  return this.filter(function(u){return u != "" })
}

Object.prototype.attachSourceEditor = function(o){
  this.edt = o
}

Object.prototype.empty = function(){
  this.length = 0
}

Object.prototype.rebuild = function(u) {
  var u = this.edt.innerText.split(/\n{2}/)
  var u0 = u[0].split(/\n/)
  var u1 = u[1].split(/\n/)
  var u2 = u[2].split(/\n/)
  u0.shift()
  u1.shift()
  u2.shift()
  this.Libraries = u0
  this.LoadAndCompileAxioms(u1)
  var w = u2[0].split(/\s+=\s+/)
  this.Theorem = { 
    lhs:[w[0].split(/\s+/)], 
    rhs:[w[1].split(/\s+/)] 
  } 
}

Object.prototype.minify = function(){
  return this.replace(/\s+/,"").replace(/(\W+)+/g,function(u){
    u = u.replace(/\s+/g,"")
    var keyShorts = {
      "+":"p",
      "-":"m",
      "~":"Tilde",
      "`":"Accent",
      "!":"Exclam",
      "@":"At",
      "#":"Hash",
      "$":"Dollar",
      "%":"Percent",
      "^":"Raised",
      "&":"Ampers",
      "*":"Star",
      "(":"Lp",
      ")":"Rp",
      "_":"Unders",
      "=":"Eq",
      "{":"Lv",
      "[":"Lb",
      "}":"Rv",
      "]":"Rb",
      "|":"Pipe",
      ":":"Col",
      ";":"semi",
      "<":"Lang",
      ",":"Comm",
      ">":"Rang",
      ".":"Perd",
      "?":"Question",
      "\\":"Fwdsl",
      "/":"Bksl",
      "default":"_",
    }
    return (u in keyShorts) ? keyShorts[u] : keyShorts["default"];
  })
}

Object.prototype.updateBASENET = function(next,tmp){
  var w = this.basenet.split(" ")
  var u = [];
  for(var j=0;j<tmp.length;j++){
    if(j!=next){
      u.push(tmp[j])
    }
    else{
      for(var k=0;k<w.length;k++){
        u.push(w[k])
      }
    }
  }
  return u
}

Object.prototype.LoadAndCompileAxioms = function(a){
  var self = this
  a.map(function(u){
    var _u = u.split(/\s+\=\s+/)
    self.push(new g_Axiom({ id:_u[0].minify(), expr:_u[0], basenet:_u[1] }))
    return u
  })
}

Object.prototype.forEach = function(cb){
  for(o in this){
    if(this.hasOwnProperty(o)){
      this[o] = cb(o)
    }
  }
}