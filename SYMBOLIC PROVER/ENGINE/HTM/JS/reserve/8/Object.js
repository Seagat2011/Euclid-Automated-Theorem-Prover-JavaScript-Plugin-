
Object.prototype.deflate = function () {
  return this.filter(function(u){return u != "" })
}

Object.prototype.attachSourceEditor = function(o){
  this.edt = o
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
  this.LoadAndCompileAxioms(u1)
  var w = u2[0].split(/\s+=\s+/)
  this.Theorem = { 
    lhs:[w[0].split(/\s+/)], 
    rhs:[w[1].split(/\s+/)] 
  } 
}

Object.prototype.minify = function(){
  return this.replace(/\s+/,"").replace(/(\W+)+/,function(u){
    u = u.replace(/\s+/,"")
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

Object.prototype.LoadAndCompileAxioms = function(a){
  var self = this
  a.map(function(u){
    var _u = u.split(/\s+\=\s+/)
    self.push(new g_Axiom({ id:_u[0].minify(), expr:_u[0], basenet:_u[1] }))
    return u
  })
}