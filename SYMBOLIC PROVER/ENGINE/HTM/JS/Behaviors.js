
/*

  TITLE: 
  Behaviors.js 

  AUTHOR: Seagat2011 
  http://eterna.cmu.edu/web/player/90270/
  http://fold.it/port/user/1992490

  DESCRIPTION: 
  Main (math) operations interface to euclid and its components

  UPDATED
  +Available operations (add,multiply)

  REFERENCES:

  INPUT: 
  op = "multiply" 
  rhs = ["five","four","three","seven","nine"] // 54379
  lhs = ["five","five"] // 55

  euclid_operation(lhs,rhs,op)

  OUTPUT:
  ["two","nine","nine","zero","eight","four","five"]  // 2990845

  SCRIPT TYPE: 
  Euclid Tool

*/

function euclid_num_array_to_string_object(arr){
  var o = {}
  var u = { "0":"zero","1":"one","2":"two","3":"three","4":"four","5":"five","6":"six","7":"seven","8":"eight","9":"nine" }
  var a = ["zero","one","two","three","four","five","six","seven","eight","nine"].map(function(i,idx,me){
      o[i] = arr[idx].toString().split('').map(function(j,jdx,metoo){ return u[j] }).join(".")
    })
  return o    
}

function euclid_num_array_to_string_array(arr){
  var a = ["zero","one","two","three","four","five","six","seven","eight","nine"]
  return arr.map(function(i,idx,me){ 
    return a[i]
  })

}

var euclid_addition_table = {
  "zero":   euclid_num_array_to_string_object([0,1,2,3,4,5,6,7,8,9]),   
  "one":    euclid_num_array_to_string_object([1,2,3,4,5,6,7,8,9,10]),
  "two":    euclid_num_array_to_string_object([2,3,4,5,6,7,8,9,10,11]),
  "three":  euclid_num_array_to_string_object([3,4,5,6,7,8,9,10,11,12]),
  "four":   euclid_num_array_to_string_object([4,5,6,7,8,9,10,11,12,13]),
  "five":   euclid_num_array_to_string_object([5,6,7,8,9,10,11,12,13,14]),
  "six":    euclid_num_array_to_string_object([6,7,8,9,10,11,12,13,14,15]),
  "seven":  euclid_num_array_to_string_object([7,8,9,10,11,12,13,14,15,16]),
  "eight":  euclid_num_array_to_string_object([8,9,10,11,12,13,14,15,16,17]),
  "nine":   euclid_num_array_to_string_object([9,10,11,12,13,14,15,16,17,18])
}

var euclid_multiplication_table = {
  "zero":   euclid_num_array_to_string_object([0,0,0,0,0,0,0,0,0,0]),    
  "one":    euclid_num_array_to_string_object([0,1,2,3,4,5,6,7,8,9]),
  "two":    euclid_num_array_to_string_object([0,2,4,6,8,10,12,14,16,18]),
  "three":  euclid_num_array_to_string_object([0,3,6,9,12,15,18,21,24,27]),
  "four":   euclid_num_array_to_string_object([0,4,8,12,16,20,24,28,32,36]),
  "five":   euclid_num_array_to_string_object([0,5,10,15,20,25,30,35,40,45]),
  "six":    euclid_num_array_to_string_object([0,6,12,18,24,30,36,42,48,54]),
  "seven":  euclid_num_array_to_string_object([0,7,14,21,28,35,42,49,56,63]),
  "eight":  euclid_num_array_to_string_object([0,8,16,24,32,40,48,56,64,72]),
  "nine":   euclid_num_array_to_string_object([0,9,18,27,36,45,54,63,72,81])
}

function euclid_add_carry(result){
  var re = /\./;
  // distille addends into columns //
  for(var i=(result.length-1);i>-1;i--){
    for(var j = (result[i].length-1);j>-1;j--){
      var tmp = result[i][j]
      var overflow_carry = (tmp && tmp.match(re) && true)
      if(overflow_carry){ // perform carry, if needed //
        tmp = tmp.split(re)
        var n = tmp.length-1
        var new_column_not_required = ((i-1) in result)
        result[i][j] = tmp[n]
        if(new_column_not_required){
          result[(i-1)].push(tmp[0])
        }
        else {
          result.unshift([tmp[0]])
        }
      }
    }
  }
  // sum columns //
  for(var i=(result.length-1);i>-1;i--){
    var sum = "zero"
    for(var j = (result[i].length-1);j>-1;j--){
      var tmp = result[i][j]
      sum = euclid_addition_table[tmp][sum]
      var overflow_carry = (sum && sum.match(re) && true)
      if(overflow_carry){ // carry, if needed //
        tmp = sum.split(re)
        var n = tmp.length-1
        var new_column_not_required = ((i-1) in result)
        if(new_column_not_required){
          result[(i-1)].push(tmp[0])
          sum = tmp[n]
        }
        else {
          result.unshift([tmp[0]])
        }
      }
    }
    result[i] = sum
  }
}

var sizeOf = function(result,K){ 
  while(K--){
    result.push(["zero"])
  }
  return result
}

var euclid_operation = {
  add (args) {
    var result = [];
    var lhs = [];
    var rhs = [];
    if(args.length<2){
      result = args[0]
    }
    else{
      while(args.length){
        lhs = [...args.shift()]
        if(result.length){
          rhs = [...result]
        }
        else{
          rhs = [...args.shift()]
        }
        var l = lhs.length
        var r = rhs.length
        var K = Math.min(l,r)
        var Rs = Math.max(l,r)
        var result = sizeOf([],Rs)
        // addends of equal magnitude //
        for(var k=0;k<K;k++){
          var a = lhs[l-k-1]
          var b = rhs[r-k-1]
          var tmp = euclid_addition_table[a][b]
          result[(Rs-k-1)].push(tmp)
        }
        // addends of unequal magnitude //
        res = (l>=r) ? lhs : rhs;
        var J = Rs-K
        for(var j=0;j<J;j++){
          var a = res[(J-j-1)]
          result[(J-j-1)].push(a)
        }
        euclid_add_carry(result)
      } // loop(args) //
    }
    return result
    },
                
  multiply (args) {
    var result = [];
    var lhs = [];
    var rhs = [];
    if(args.length<2){
      result = args[0]
    }
    else{
      while(args.length){
        lhs = [...args.shift()]
        if(result.length){
          rhs = [...result]
        }
        else{
          rhs = [...args.shift()]
        }
        var l = lhs.length
        var r = rhs.length
        var L = Math.max(l,r)
        var R = Math.min(l,r)
        var LHS = (l>=r) ? lhs : rhs;
        var RHS = (l>=r) ? rhs : lhs;
        result = sizeOf([],L)
        // multiplicands of any magnitude //
        for(var i=0;i<R;i++){
          for(var j=0;j<L;j++){
            var li = L-j-1
            var ri = R-i-1
            var a = LHS[li]
            var b = RHS[ri]
            var tmp = euclid_multiplication_table[a][b]
            var ui = li+ri // preserve product place-value //
            var new_column_not_required = ((ui) in result)
            if(new_column_not_required){
              result[ui].push(tmp)
            }
            else{
              while(ui>=result.length){
                result.push(["zero"])
              }
              result[ui].push(tmp)
            }
          }
        }
        euclid_add_carry(result)
      } // loop(args.length) //
    } // end test(result) //
    return result
    }, 
}

/* TEST CASE

_rhs_ = ["five","four","three","seven","nine"] // 54379
_lhs_ = ["five","five"] // 55

console.log( euclid_operation["multiply"]( [_rhs_,_lhs_] ) ) // ["two","nine","nine","zero","eight","four",five"] // 2990845
console.log( euclid_operation["add"]( [_rhs_,_lhs_] ) ) // ["five","four","four","three","four"] // 54434

*/