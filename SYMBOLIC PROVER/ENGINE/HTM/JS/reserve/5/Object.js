
Object.prototype.addProperties = function(args){
  var self = this
  for(var o in args){
    if(args.hasOwnProperty(o)){
      self[o] = args[o]
    }
  }
}