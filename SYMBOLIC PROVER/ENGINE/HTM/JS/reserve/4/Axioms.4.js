
var subnet = {
  "true":function(){// push to stack //
      },
  "false":function(){// pop from stack //
      },
  "default-parse":function(self,return_obj,v,idx){// update state-machine //
      var incidenceMapFound = self._updateIncidenceMap(v,idx)
      if(incidenceMapFound){
        return_obj.halt = true
        return_obj.incidenceMap = [...self._incidenceMap]
        return_obj.id = self._id.getBASENET()
        self._resetIncidenceMap()
      }
      },
}

function g_obj(){
  this.halt=false
}    
g_obj.prototype = {}

function g_halt(){
  var i = this._incidenceMapIDX
  var I = this._incidenceMap.length
  return (i==I)
}
function g_evaluateIncidenceMapIDX(v,idx){
  var imap = this._incidenceMap
  var i = this._incidenceMapIDX
  if(imap[i].id==v){
    imap[i].idx = idx
    this._incidenceMapIDX++
  }
}
function g_updateIncidenceMap (v,idx){
  var haltSTATUS = false
  if(this._halt()){
    haltSTATUS = true
  }
  else{
    this._evaluateIncidenceMapIDX(v,idx)
  }
  return haltSTATUS
}
function g_resetIncidenceMap (){
  this._incidenceMap = this._ref.tokenize() //[]
  this._incidenceMapIDX = 0
  this._haltIDX = null
}
function g_test (u,idx,postpone){
  var return_obj = new g_obj();
  if(postpone in subnet){
    subnet[postpone]() 
  }
  else{
    subnet["default-parse"](this,return_obj,u,idx)
  }
  return return_obj
}

function Axio(o){
  var self = this
  for(me in o){
    if(o.hasOwnProperty(me)){
      self[me] = o[me];
    }
  }
  this._ref = o._ref
  this._criteria = [[1]]
  this._stack = []
  this._incidenceMap = o._ref.tokenize()
  this._incidenceMapIDX = 0
  this._evaluateIncidenceMapIDX = g_evaluateIncidenceMapIDX
  this._updateIncidenceMap = g_updateIncidenceMap
  this._resetIncidenceMap = g_resetIncidenceMap 
  this._test = g_test
  this._halt = g_halt
}
Axio.prototype = {}
/*
Axiom = {
  "0:0":new Axio({ _id:"0:0", _name:"_1p1e2_", _md5:"0031636467f91c013bba75b1ffbca3d0", _ref:"2" }),
  "0:1":new Axio({ _id:"0:1", _name:"_1p1e2_", _md5:"0031636467f91c013bba75b1ffbca3d0", _ref:"1 + 1" }),
  "1:0":new Axio({ _id:"1:0", _name:"_2p2e4_", _md5:"ff6bc4979f46028d25915b5acda05b55", _ref:"4" }),
  "1:1":new Axio({ _id:"1:1", _name:"_2p2e4_", _md5:"ff6bc4979f46028d25915b5acda05b55", _ref:"2 + 2" }),
}
*/