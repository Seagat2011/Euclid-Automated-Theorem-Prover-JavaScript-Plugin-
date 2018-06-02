
function Axio(o){
  var self = this
  this._name = o._name || "untitled"
  this._md5 = o._md5 || "61bfee279f0e534bdc1ffbc6700e322e" // untitled //
  this._criteria = o._criteria || [[1]]
  this._stack = []
  this._incidenceMap = []
  this._precedence = (("_obj" in o) && o._obj.map(
    function(u,idx,me){
      var u2 = u.split(/\s+/).length || "NaN"
      self._incidenceMap.push([])
      return u2
    })) || ["NaN"]
  this._obj = (("_obj" in o) && o._obj.map(
    function(u,idx,me){
      return u.split(/\s+/)
    })) || {}
  this._updateIncidenceMap = function(v,i){
    self._incidenceMap[i].push(v)
  }
  this._resetIncidenceMap = function(){
    var a = self._incidenceMap.map(function(u,idx,me){
      return []
    });
    self._incidenceMap = a
    self._haltIDX = null
  }
  this._incidenceMapStatus = function(){
    var haltSTATUS = false
    var I = self._precedence.length
    if(I){
      //for(var i=0;i<I;i++){
        var J = self._precedence[0] //length//
        var K = self._incidenceMap[0].length
        if(J && K && (J==K)){
          haltSTATUS = true
          self._haltIDX = K
        }
        J = self._precedence[1] //length//
        K = self._incidenceMap[1].length
        if(J && K && (J==K)){
          haltSTATUS = true
          self._haltIDX = [K,self._haltIDX]
        }
      //}
    }
    return haltSTATUS
  }
  this._test = function(u,col,postpone){
    var return_obj = { halt:false, val:[u], haltIDX:null };
    var subnet = {
      "true":function(){// push to stack //
        },
      "false":function(){// pop from stack //
        },
      "default":function(v,j){// update state-machine //
          self._updateIncidenceMap(v,j)
          var incidenceMapFound = self._incidenceMapStatus()
          if(incidenceMapFound){
            return_obj.halt = true
            return_obj.val = self._obj
            return_obj.haltIDX = self._haltIDX
            self._resetIncidenceMap()
          }
        }
    }
    if(postpone in subnet){
      subnet[postpone]() 
    }
    else{
      subnet["default"](u,col)
    }
    return return_obj
  }
}
Axio.prototype = {}

var Axiom = [
  new Axio({ _name:"_1p1e2_", _md5:"0031636467f91c013bba75b1ffbca3d0", _criteria:[[1]], _obj:["2","1 + 1"] }),
  new Axio({ _name:"_2p2e4_", _md5:"ff6bc4979f46028d25915b5acda05b55", _criteria:[[1]], _obj:["4","2 + 2"] }),
]