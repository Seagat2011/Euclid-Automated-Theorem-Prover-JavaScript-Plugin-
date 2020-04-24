
/*

  TITLE: 
  Axioms.js 

  AUTHOR: Seagat2011 
  http://eterna.cmu.edu/web/player/90270/
  http://fold.it/port/user/1992490

  VERSION: 
  Major.Minor.Release.Build
  1.0.0.0

  DESCRIPTION: 
  Main (math) operations interface to euclid and its components

  UPDATED
  +Scoping functionality

  STYLEGUIDE: 
  http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml

  REFERENCES:

  SCRIPT TYPE: 
  Euclid Tool

*/

function _AXIOM_(){
  var self = this
  var args = arguments[0]
  args.forEach(function(u){
    self[u] = args[u]
  })
  this._update = function(){
    var args = arguments[0]
    args.forEach(function(w){
      self[w] = args[w]
      return w
    })
  }
  this._reduce = function(e){
    var u = e.data
    if(u.source.startsWith("axiom") && (u.source != self._guid) && u.indir.match(/Reduce|Auto/)){
      var val = u.val
      self._subnetFOUND = false
      var ProofFailed = false
      if(self._isOnline && 
      !(val in g_history) && 
      !(val in self._history)
      ){
        var val = u.val
        var tmp = [...val.split(/\s+/)]
        var Proof = [...val.split(/\s+/)]
        var vkeys = []
        var tmpHTML = { 
          pre:[...val.split(/\s+/)], 
          post:[...val.split(/\s+/)] } 
        var alhs = self._axiom.split(/\s+/)
        var arhs = self._basenet.split(/\s+/)
        var jdx = 0
        tmp.map(function(tok,idx,me){
          if(tok == "="){
            jdx=0
          }
          if(self._scope_satisfied(tok,me,idx,alhs,jdx)){
            vkeys.push(idx)
            if(++jdx==alhs.length){
              g_code._passRound()
              self._subnetFOUND = true
              vkeys.map(function(kdx){
                tmpHTML.pre[kdx] += self._id.addTAG("sub")
                tmpHTML.post[kdx] = null
                Proof[kdx] = null
              })
              tmpHTML.post[idx] = arhs.map(function(atok){ return (atok + self._id.addTAG("sub")) }).join(" ")
              jdx=0
              vkeys = []
              Proof[idx] = arhs.join(" ")
            }
          }
          return tok
        })
        if(self._subnetFOUND && !self._solutionEditor.innerText.match(/\nQ\.E\.D\./)){
          var solutionComplete = Proof.solutionComplete("Reduce")
          self._history[val] = true
          g_history[val] = true // comment-out to view other partial-solutions //
          self._solutionEditor.appendlog(tmpHTML.pre.join(" "))
          self._solutionEditor.appendlog(tmpHTML.post.join(" "))
          if(solutionComplete){
            self._solutionEditor.appendlog(Proof.join(" ")+solutionComplete)
          }
          else{
            postMessage({ source:self._guid,val:Proof.join(" "),indir:u.indir },g_origin)
          }
        }
        else
        if( // end-of-reduce ? //
        (self._id==g_code.length-1) &&
        (u.indir.match(/Auto/) && true)
        ){
          ProofFailed = true
        }
        g_code._resetRound()
      }
      if(self._subnetFOUND){
        console.log("Source:",u.source,"; target:",`${self._guid} (Partial Solution Found)`+solutionComplete.replace(/<br><br>/,""))
      }
      if(ProofFailed){
        self._solutionEditor.appendlog("<br>========( Reduce )=========<br>========( Expand )=========<br>")
        reset("partial")
        console.log("Prove via Reduce() Failed: Now attempting Expand()..")
        postMessage({ source:"axiomROOT",val:g_code.Theorem.lemma,indir:"Expand" },g_origin)
      }
    }
  }
  this._expand = function(e){
    var u = e.data
    if(u.source.startsWith("axiom") && (u.source != self._guid) && u.indir.match(/Expand/)){
      var val = u.val
      self._subnetFOUND = false
      if(self._isOnline && 
      !(val in g_history) && 
      !(val in self._history)
      ){
        var val = u.val
        var tmp = [...val.split(/\s+/)]
        var Proof = [...val.split(/\s+/)]//[]
        var vkeys = []
        var tmpHTML = { 
          pre:[...val.split(/\s+/)], 
          post:[...val.split(/\s+/)] } 
        var alhs = self._axiom.split(/\s+/)
        var arhs = self._basenet.split(/\s+/)
        var jdx = 0
        tmp.map(function(tok,idx,me){
          if(tok == "="){
            jdx=0
          }
          if(self._scope_satisfied(tok,me,idx,arhs,jdx)){
            vkeys.push(idx)
            if(++jdx==arhs.length){
              self._subnetFOUND = true
              vkeys.map(function(kdx){
                tmpHTML.pre[kdx] += self._id.addTAG("sub")
                tmpHTML.post[kdx] = null
                Proof[kdx] = null
              })
              tmpHTML.post[idx] = alhs.map(function(atok){ return (atok + self._id.addTAG("sub")) }).join(" ")
              Proof[idx] = alhs.join(" ")
              jdx=0
              vkeys = []
            }
          }
          return tok
        })
        if(self._subnetFOUND && !self._solutionEditor.innerText.match(/\nQ\.E\.D\./)){
          var solutionComplete = Proof.solutionComplete("Expand")
          self._history[val] = true
          g_history[val] = true // comment-out to view other partial-solutions //
          self._solutionEditor.appendlog(tmpHTML.pre.join(" "))
          self._solutionEditor.appendlog(tmpHTML.post.join(" "))
          if(solutionComplete){
            self._solutionEditor.appendlog(Proof.join(" ")+solutionComplete)
          }
          else{
            postMessage({ source:self._guid,val:Proof.join(" "),indir:u.indir },g_origin)
          }
        }
      }
      if(self._subnetFOUND){
        console.log("Source:",u.source,"; target:",`${self._guid} (Partial Solution Found)`+solutionComplete.replace(/<br><br>/,""))
      }
    }
  }
  this._auto = function(e){

  }
  this._balance = function(e){

  }
  this._reduce_stepwise = function(){

  }
  this._expand_stepwise = function(){
    
  }
  this._scope_satisfied = function(etok,lhs,li,rhs,ri){
    var i = 1
    var end_scope = { "(":")", "{":"}" }
    var sat = true
    if(lhs[li] != rhs[ri]){
      sat = false
    }
    else
    if(etok in end_scope){
      if(((li+i) in lhs) && ((ri+i) in rhs)){
        var ltok = lhs[li+i]
        var rtok = rhs[ri+i]
        var I = rhs.length // Math.min(lhs.length,rhs.length) //
        etok = end_scope[etok]
        while(i++<I){
          if(ltok!=rtok){
            sat = false
            break
          }
          if(rtok == etok){
            break
          }
          //i++
          ltok = lhs[li+i]
          rtok = rhs[ri+i]
        }
      } 
      else {
        sat = false
      }      
    }// test(etok) //
    return sat
  }
  //addEventListener("message",self._auto)
  //addEventListener("message",self._balance)
  addEventListener("message",self._reduce)
  addEventListener("message",self._expand)
}
