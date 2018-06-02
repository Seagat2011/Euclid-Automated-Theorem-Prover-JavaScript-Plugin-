
Object.prototype.addProperties = function(args){
  var self = this
  for(var o in args){
    if(args.hasOwnProperty(o)){
      self[o] = args[o]
    }
  }
}

Object.prototype.updateSymbolTable = function(){
  var self = this
  this.symbols = []
  this.map(function(u,i){
    u.state_machine.map(function(obj){
      var v = obj.id
      if(v in self.symbols){
        self.symbols[v].pushUNIQUE(i)
      }
      else{
        self.symbols[v] = [i]
      }
      return v
    })      
    return u
  })
}

Object.prototype.pushUNIQUE = function(I){
  var isUnique = true
  this.map(function(i,idx,me){
    if(i==I){
      isUnique = false
    }
    return i
  })
  if(isUnique){
    this.push(I)
  }
}