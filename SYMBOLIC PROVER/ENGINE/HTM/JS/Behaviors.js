/*

  TITLE: 
  Behaviors.js 

  AUTHOR: Seagat2011 
  http://eterna.cmu.edu/web/player/90270/
  http://fold.it/port/user/1992490

  DESCRIPTION: 
  Main (math) operations interface to euclid and its components
  to operate on numbers of infinite magnitude

  UPDATED
  +Available operations (add,multiply)
  +Revised internal number representation (performance)
  +Add algorithm uses lookup table reference (performance)

  REFERENCES:

  TEST CASES: 

  _rhs_ = '54379'
  _lhs_ = '55'
  console.log( euclid_operation["add"]( [_rhs_,_lhs_] ) ) // '54434' 
  console.log( euclid_operation["add"]( [_rhs_,_lhs_,_lhs_,_lhs_] ) ) // '54544' 
  console.log( euclid_operation["mult"]( [_rhs_,_lhs_] ) ) // '2990845' 

  _rhs_ = '5437955555'
  _lhs_ = '5555554379'
  console.log( euclid_operation["mult"]( [_rhs_,_lhs_] ) ) // '30210857796387625345' 

  _lhs_ = []
  _rhs_ = []
  for(var i=0;i<1e2;i++){ 
    _lhs_.push(Math.floor(Math.random()*10)); // eg. 7098304882360020720796160762297300381468514667792154049788667527780627801534604067107687525730402417
    _rhs_.push(Math.floor(Math.random()*10)); // eg. 9155738670598384026247188934462192826077798037115972850260469939179096904288260182980618411131691940 

  }
  euclid_operation["mult"]( [_rhs_.join(''),_lhs_.join('')] ) // eg. '64990224507120954830431350279613854261635043065747861729032597048651797897345475926325069109323814415474976047993149825690040695606991469897439989128921024213301765728297345753230285726335998275418980' 

  SCRIPT TYPE: 
  Euclid Tool

*/
var euclid_add = {}
for(var i=0;i<10;i++){
  for(var j=0;j<10;j++){
    for(var c_out=0;c_out<10;c_out++){
      if(!(i in euclid_add)){
        euclid_add[i] = {}
      }
      if(!(j in euclid_add[i])){
        euclid_add[i][j] = {}
      }
      var val = i+j+c_out
      euclid_add[i][j][c_out] = { carry:0,sum:0 }
      euclid_add[i][j][c_out].carry = Math.floor(val/10)
      euclid_add[i][j][c_out].sum = val%10
    }
  }
}
var euclid_num_to_numstr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var euclic_numstr_to_num = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9
}
Object.prototype.euclid_numstr_array_to_num_array = function() {
  return this.map(function(i) {
    return euclic_numstr_to_num[i]
  })
}
Object.prototype._numstr_to_num_array = function() {
  return (this.split('')).euclid_numstr_array_to_num_array()
}
var euclid_operation = {
  add(args) {
    var result = [];
    var lhs = [];
    var rhs = [];
    if (args.length < 2) {
      result = args[0]
    } else {
      while (args.length) {
        // input args //
        if(result.length){
          lhs = [...result]
        }
        else{
          lhs = (args.shift()).split('')
        }
        if (args.length) {
          rhs = (args.shift()).split('')
        }
        var l = lhs.length-1
        var r = rhs.length-1
        var L = Math.max(l, r)
        var R = Math.min(l, r)
        var LHS = (l >= r) ? lhs : rhs;
        var RHS = (l >= r) ? rhs : lhs;
        result = []
        var carry_out = 0
        var carry_out2 = 0
        while((l>-1)||(r>-1)){
          var _lhs_ = LHS[l]
          var _rhs_ = (r<0) ? 0 : RHS[r];
          var val = euclid_add[_lhs_][_rhs_][carry_out]
          carry_out = val.carry
          result[l] = val.sum
          --l
          --r
        } // end loop(l,r)
        if(carry_out){
          result.unshift(carry_out)
        }
      }
    }
    return result.join('')
  },
  mult(args) {
    var result = [];
    var lhs = [];
    var rhs = [];
    if (args.length < 2) {
      result = args[0]
    } else {
      while (args.length) {
        // input args //
        if (result.length) {
          lhs = [...result]
        } else {
          lhs = (args.shift())._numstr_to_num_array()
        }
        if (args.length) {
          rhs = (args.shift())._numstr_to_num_array()
        }
        var l = lhs.length
        var r = rhs.length
        var L = Math.max(l, r)
        var R = Math.min(l, r)
        var LHS = (l >= r) ? lhs : rhs;
        var RHS = (l >= r) ? rhs : lhs;
        result = []
        for (var i = L - 1; i > -1; i--) {
          // init result[] //
          result.push([])
        }
        var _lhs_ = l - 1
        var _rhs_ = r - 1
        var nop = false
        while (!nop) {
          // build-then-multiply columns //
          if ((_lhs_ > -1) && (_rhs_ > -1)) {
            var val = RHS[_rhs_] * LHS[_lhs_]
            var _idx_ = (_rhs_ + _lhs_)
            var add_new_column = (!(_idx_ in result) && true)
            if (add_new_column) {
              while (result.length <= _idx_) {
                result.unshift([])
              }
            }
            result[_idx_].push(val)
          } else if (_lhs_ > -1) {
            var val = LHS[_lhs_]
            var _idx_ = (_lhs_)
            var add_new_column = (!(_idx_ in result) && true)
            if (add_new_column) {
              while (result.length <= _idx_) {
                result.unshift([])
              }
            }
            result[_idx_].push(val)
          } else if (_rhs_ > -1) {
            var val = RHS[_rhs_]
            var _idx_ = (_rhs_)
            var add_new_column = (!(_idx_ in result) && true)
            if (add_new_column) {
              while (result.length <= _idx_) {
                result.unshift([])
              }
            }
            result[_idx_].push(val)
          } else {
            nop = true
          }
          if (_lhs_ > 0) {
            _lhs_--
          } else if (_rhs_ > 0) {
            _rhs_--
            _lhs_ = l - 1
            // reset inner-loop //
          } else {
            break
          }
        }
        // loop(cols) //
        for (var i = result.length - 1; i > -1; i--) {
          // sum columns //
          var s = 0
          var arr = result[i]
          for (var j = arr.length - 1; j > -1; j--) {
            s += arr[j]
          }
          var column_exists = (((i - 1)in result) && true)
          var carry_out = Math.floor(s / 10)
          if (carry_out) {
            var val = s - carry_out * 10
            result[i] = [val]
            if (column_exists) {
              result[i - 1].push(carry_out)
            } else {
              result.unshift([carry_out])
            }
          } else {
            result[i] = [s]
          }
        }
        // loop(result) //
      }
      // loop(true) //
    }
    // test(args) //
    return result.join('')
  },
}
