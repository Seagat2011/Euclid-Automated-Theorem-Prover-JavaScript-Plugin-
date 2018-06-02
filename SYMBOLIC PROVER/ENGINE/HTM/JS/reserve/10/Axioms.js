
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
  this._eval = function(e){
    var u = e.data
    if(u.source.startsWith("axiom") && (u.source != self._guid)){
      var val = u.val
      if(self._isOnline && !(val in g_history) && !(val in self._history) && (val != (self._basenetFOUND = val.replace(self._axiom,"$1$2"+self._basenet).stripWhiteSpace()))){
        self._history[val] = true
        g_history[val] = true // comment-out to view alternate solutions //
        g_Solution.push(self._basenetFOUND)
        var solutionComplete = (self._basenetFOUND == u.basenet) ? " Q.E.D" : "";
        solutionEditor.appendlog(self._basenetFOUND+" = "+u.basenet+" ("+self._guid+")"+solutionComplete)
        postMessage({ source:self._guid,val:self._basenetFOUND,basenet:u.basenet },g_origin)
      }
      console.log("Source:",u.source,", target:",self._guid,(self._basenetFOUND != val)? "(Partial Solution Found)":"")
    }
  }
  addEventListener("message",self._eval)
}