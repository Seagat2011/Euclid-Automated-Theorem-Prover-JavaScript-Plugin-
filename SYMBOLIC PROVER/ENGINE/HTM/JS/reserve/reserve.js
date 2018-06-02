
var a=[];var b=[];for(var i=0;i<16;i++){ a.push(Math.floor(Math.random()*10));b.push(Math.floor(Math.random()*10)) }; a=euclid_num_array_to_string_array(a); b=euclid_num_array_to_string_array(b);
result = euclid_operation(a,b,"multiply");

var a=[];var b=[];for(var i=0;i<1e6;i++){ a.push(Math.ceil(Math.random()*5));b.push(Math.ceil(Math.random()*5)) }; a=euclid_num_array_to_string_array(a); b=euclid_num_array_to_string_array(b);
result = euclid_operation(a,b,"multiply");

__exec:function(lhs,rhs,result){
                var l = lhs.length
                var r = rhs.length
                var L = Math.max(l,r)
                var R = Math.min(l,r)
                var LHS = (l>=r) ? lhs : rhs;
                var RHS = (l>=r) ? rhs : lhs;
                result = this.sizeOf(result,L)
                //result || (result = [])
                // multiplicands of any magnitude //
                //var ui = L
                for(var i=0;i<R;i++){
                  //ui--
                  for(var j=0;j<L;j++){
                    var li = L-j-1
                    var ri = R-i-1
                    var a = LHS[li]
                    var b = RHS[ri]
                    var tmp = euclid_multiplication_table[a][b]
                    var ui = (i+j+2)-R //Math.abs() // preserve a multiplicands place-value //
                    var new_column_not_required = ((ui) in result)
                    if(new_column_not_required){
                      result[ui].push(tmp)
                    }
                    else{
                      result.unshift([tmp])
                    }
                    //result[(li>ri)?ui:li].push(tmp)
                  }
                }
                euclid_add_carry(result)
            },
                  
    "multiply": { 
            __exec:function(lhs,rhs,result){
                var l = lhs.length
                var r = rhs.length
                var Rs = Math.max(l,r)
                //var Rn = Math.min(l,r)
                result = this.sizeOf(result,Rs)
                // multiplicands of any magnitude //
                for(var L=0;L<l;L++){
                  for(var R=0;R<r;R++){
                    var li = l-L-1
                    var ri = r-R-1
                    var a = lhs[li]
                    var b = rhs[ri]
                    var tmp = euclid_multiplication_table[a][b]
                    result[(Math.max(li,ri))].push(tmp)
                    //console.log(`index: ${(Rs-k-1)}`,`value: ${tmp}`)
                  }
                }
                euclid_add_carry(result)


function euclid_add_carry(tmp,K,result){
  var re = /\./;
  var carry_overflow = (tmp && tmp.match(re) && true)
  if (carry_overflow) { // carry between lhs/rhs //
    tmp = tmp.split(re)
    var n = tmp.length-1
    euclid_add_carry(tmp[n],K,result)
    euclid_add_carry(tmp[0],K-1,result)
  }
  else{
    if(K in result){
      tmp = euclid_addition_table[result[K]][tmp]
      var carry_overflow2 = (tmp && tmp.match(re) && true)
      if (carry_overflow2) { // carry between tmp/result //
        tmp = tmp.split(re)
        var n = tmp.length-1
        euclid_add_carry(tmp[n],K,result)
        euclid_add_carry(tmp[0],K-1,result)
        tmp = tmp[0]
      } // test(carry_overflow2)
      else{
        result[K] += `.${tmp}` //result[K] = tmp
      }
    } // test(K)
    else{
      result.unshift(tmp)
    }
  } // test(carry_overflow)
}

function euclid_add_carry(lhs,rhs,tmp,i,j,result,op){
  var re = /\./;
  var K = Math.max(i,j)
  do{
     var carry_overflow = (tmp && tmp.match(re) && true)
     if (carry_overflow) { // carry between lhs/rhs //
        tmp = tmp.split(re)
        var n = tmp.length-1
        tmp[n] = OP[op].op[result[K]][tmp.last()]
        var carry_overflow2 = (tmp[n] && tmp[n].match(re) && true)
        if(!carry_overflow2){
          result[K] = tmp[n]
          tmp = tmp[0]
       }
     }
     else{ // add tmp and result[K]
        tmp = OP[op].op[result[K]][tmp]
        var carry_overflow2 = (tmp && tmp.last().match(re) && true)
        if(!carry_overflow2){
          result[K] = tmp
       }
     }
    i--
    j--
    K--
  } while(carry_overflow);
}

function euclid_operation(lhs,rhs,op){
  rhs = ["five","five","five"]
  lhs = ["five","five","five"]
  var I = lhs.length
  var J = rhs.length
  var K = Math.max(I,J) - Math.min(I,J) - 1
  var result = OP[op].sizeOf(I--,J--)
  // [0] holds MSB //
  var operation = OP[op].op
  for(var i=I;i>0;i--){
      var operationI = operation[lhs[i]]
      for(var j=J;j>0;j--){
          var tmp = operationI[rhs[j]]
          euclid_add_carry(lhs,rhs,tmp,i,j,result,op)
      }
  }
  var res = (I>=J) ? lhs : rhs;
  for(var i=K;i>-1;i--){
      var operationI = operation[res[i]]
      for(var j=K;j>-1;j--){
          var tmp = operationI[result[j]]
          euclid_add_carry(lhs,rhs,tmp,i,j,result,op)
      }
  }
  return result
}


function euclid_add_carry(lhs,rhs,tmp,i,j,result,op){
  var re = /\./;
  var K = Math.max(i,j)
  do{
     var carry_overflow = (tmp && tmp.match(re) && true)
     if (carry_overflow) { // carry between lhs/rhs //
        tmp = tmp.split(re)   
     var n = tmp.length-1
        tmp[n] = OP[op].op[result[K]][tmp.last()] 
        var carry_overflow2 = (tmp && tmp.last().match(re) && true)
        if(!carry_overflow2){ 
          result[K] = tmp.last()
          tmp = tmp[0]
        }
        else{ // carry between tmp/result //
          result[K] = tmp[n].last()
          tmp[n] = tmp[n][0]
          tmp = tmp.join(".")
          i--
          j--
          K--
          continue
        }
        /*
        if((K-1) in result){
          tmp = OP[op].op[result[K-1]][tmp]
        }
        else{
          result.unshift(tmp)
          break
        }
        */
     }
     else{
       result[K] = tmp
       // tmp = OP[op].op[result[K-1]][tmp]
     }
    i--
    j--
    K--
    if(K in result){
      tmp = OP[op].op[result[K]][tmp]
    }/*
    else{
      result.unshift(tmp)
      break
    }*/
  } while(carry_overflow);
}
          /*
          var carry_overflow2 = (tmp.match(re) && true) // false
          if (carry_overflow2) { // carry between tmp and result //
            tmp = tmp.split(re) 
            result[j-1] = tmp.last()
            tmp = tmp[0]
          }
          else{
            result[j-1] = tmp
          }
          */

var g_GUID = g_GUID_ROOT = 1

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
      var Proof = []
      var vkeys = []
      var tmpHTML = { 
        pre:[...val.split(/\s+/)], 
        post:[...val.split(/\s+/)] } 
      var alhs = self._axiom.split(/\s+/)
      var arhs = self._basenet.split(/\s+/)
      var jdx = 0
      tmp.map(function(tok,idx){
        if(tok == arhs){
          self._subnetFOUND = true
          tmpHTML.pre[idx] += self._id.addTAG("sub")
          tmpHTML.post[idx] = alhs.map(function(atok,jdx){ return (atok + self._id.addTAG("sub")) }).join(" ")
          Proof.push(...alhs)
          //vkeys.push(idx)
        }
        else{
          Proof.push(tok)
        }
        return tok
      })
      if(self._subnetFOUND && !solutionEditor.innerText.match(/\nQ\.E\.D\./)){
        var solutionComplete = Proof.solutionComplete("Expand")
        self._history[val] = true
        g_history[val] = true // comment-out to view alternative partial-solutions //
        solutionEditor.appendlog(tmpHTML.pre.join(" "))
        solutionEditor.appendlog(tmpHTML.post.join(" "))
        if(solutionComplete){
          solutionEditor.appendlog(Proof.join(" ")+solutionComplete)
        }
        else{
          postMessage({ source:self._guid,val:Proof.join(" "),indir:u.indir },g_origin)
        }
      }
    }
    console.log("Source:",u.source,", target:",self._guid,self._subnetFOUND ? "(Partial Solution Found)"+solutionComplete.replace(/<br><br>/,""):"")
  }
}

else
if( // end-of-reduce ? //
(self._id==g_code.length-1) &&
  (
  (solutionEditor.innerText.length == 0) ||
  ((self._id==g_code.length-1) && (u.source.match(new RegExp("Axiom"+g_code.length-2))))
  ) &&
u.indir.match(/Auto/)
){
  ProofFailed = true
}

  this._reduce = function(e){
    var u = e.data
    if(u.source.startsWith("axiom") && (u.source != self._guid) && u.indir.match(/Reduce/)){
      var val = u.val
      self._subnetFOUND = false
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
        tmp.map(function(tok,idx){
          if(tok == "="){
            jdx=0
          }
          if(tok == alhs[jdx]){
            if(++jdx==alhs.length){  
              vkeys.push(idx)
              self._subnetFOUND = true
              vkeys.map(function(kdx){
                tmpHTML.pre[kdx] += self._id.addTAG("sub")
                tmpHTML.post[kdx] = null
              })
              tmpHTML.post[idx] = arhs.map(function(atok){ return (atok + self._id.addTAG("sub")) }).join(" ")
              jdx=0
              vkeys = []
              Proof.push(...arhs)
            }
            else{    
              vkeys.push(idx)
            }
          }
          else{
            Proof.push(tok)
          }
          return tok
        })
        if(self._subnetFOUND && !solutionEditor.innerText.match(/Q\.E\.D\.\n$/)){
          var solutionComplete = Proof.solutionComplete()
          self._history[val] = true
          g_history[val] = true // comment-out to view alternative partial-solutions //
          solutionEditor.appendlog(tmpHTML.pre.join(" "))
          solutionEditor.appendlog(tmpHTML.post.join(" "))
          if(solutionComplete){
            solutionEditor.appendlog(Proof.join(" ")+solutionComplete)
          }
          else{
            postMessage({ source:self._guid,val:Proof.join(" "),indir:u.indir },g_origin)
          }
        }
      }
      console.log("Source:",u.source,", target:",self._guid,self._subnetFOUND ? "(Partial Solution Found)"+solutionComplete.replace(/<br><br>/,""):"")
    }
  }

tmpHTML.pre[idx] = alhs.map(function(atok){ return (atok + self._id.addTAG("sub")) }).join(" ")
              
  this._reduce = function(e){
    var u = e.data
    if(u.source.startsWith("axiom") && (u.source != self._guid) && u.indir.match(/Reduce/)){
      var val = u.val
      self._basenetFOUND = false
      if(self._isOnline && 
      !(val in g_history) && 
      !(val in self._history)
      ){
        var symtable = self._axiom.split(/\s+/)
        var j = 0
        var J = symtable.length
        var vkeys = []
        var tmpHTML = { pre:[...val.split(/\s+/)],post:[...val.split(/\s+/)] }
        var tmp = [...val.split(/\s+/)]
        val.split(/\s+/).map(function(tok,i,me){
          if((j in symtable)&&(tok==symtable[j])){
            if(++j==J){
              j=0
              self._basenetFOUND = true
              tmp[i] = self._basenet
              tmpHTML.post[i] = self._basenet+self._id.addTAG("sub")
              tmpHTML.pre[i] += self._id.addTAG("sub")
              vkeys.map(function(s){
                tmp[s] = null
                tmpHTML.post[s] = null
                tmpHTML.pre[s] = tmpHTML.pre[s]+self._id.addTAG("sub") 
              })
              vkeys = []
            }
            else{
              vkeys.push(i)
            }
          }
          return tok
        })
        if(self._basenetFOUND && !solutionEditor.innerText.match(/Q\.E\.D\.\n$/)){
          tmp = tmp.filter(function(tok){
            return tok != null
          }).join(" ")
          self._history[val] = true
          g_history[val] = true // comment-out to view alternative partial-solutions //
          val = tmp
          g_Solution.push(val)
          var solutionComplete = (u.basenet == self._basenet) ? "<br><br>Q.E.D." : "";
          solutionEditor.appendlog(tmpHTML.pre.join(" ")+" = "+u.basenet)
          solutionEditor.appendlog(tmpHTML.post.join(" ")+" = "+u.basenet+solutionComplete)
          postMessage({ source:self._guid,val:val,basenet:u.basenet,indir:u.indir },g_origin)
        }
      }
      console.log("Source:",u.source,", target:",self._guid,self._basenetFOUND ? "(Partial Solution Found)"+solutionComplete.replace(/<br><br>/,""):"")
    }
  }
function Solve(param){
  reset()
  /*
  switch(param){
    case "Reduce":
    postMessage({ source:"axiomROOT",val:g_code.Theorem.lhs,basenet:g_code.Theorem.rhs,indir:param },g_origin)
    break;

    case "Expand":    
    postMessage({ source:"axiomROOT",val:g_code.Theorem.lemma,indir:param },g_origin)
    break;

    default:
    break;
  }
  */
  console.clear() //console.log("Solution:",g_Solution)
}
  this._eval = function(e){
    var u = e.data
    switch(u.indir){
      case "Auto":
      case "Reduce":
      case "Expand":
      case "Balance":
      default:
    }
  }
  addEventListener("message",self._eval)
var g_Solver = {
  "Auto":function(){ postMessage({ source:"axiomROOT",val:g_code.Theorem.lhs,basenet:g_code.Theorem.rhs,indir:param },g_origin) },
  "Reduce":function(){},
  "Expand":function(){},
  "Balance":function(){},
  "Default":function(){},
}
function srcHighlighter(e){
  if(e && (e.srcElement.id=="axmEditor")){
    lineNumber.innerText = axmEditor
      .innerText
      .replace(/\n$/,"")
      .split(/\n/)
      .map(function(_,idx){
        return "(" + ++idx + ")"
      }).join("\n")
  }
}
function srcHighlighter(e){
  if(e && (e.srcElement.id=="axmEditor")){
    lineNumber.innerText = axmEditor
      .innerText
      .split(/\n/)
      .map(function(_,idx){
        return "(" + ++idx + ")"
      }).join("\n")
  }
}
addEventListener("keyup",srcHighlighter,false);
addEventListener("keypress",srcHighlighter,false);
function srcHighlighter(){
  var o = srcEditor.innerText.split(/\n/).map(
    function(txt,idx,me){
      if(txt.match(/^#|\/\//)){
        txt = "<comment>" + txt + "</comment>";
      }
      return txt;
    }
  );
  srcHlt.innerHTML = o.join("<br>")
}
addEventListener("keyup",srcHighlighter,false);
Object.prototype.build = function(u) {
  var u = this.edt.innerText.split(/\n{2}/)
  var u0 = u[0].split(/\n/)
  var u1 = u[1].split(/\n/)
  var u2 = u[2].split(/\n/)
  u0.shift()
  u1.shift()
  u2.shift()
  this.Libraries = u0
  this.compileAxioms(u1)
  var w = u2[0].split(/\s+=\s+/g)
  this.Theorem = { 
    lhs:w[0], 
    rhs:w[1] 
  } 
}

  solutionEditor.innerText = "==========================="//+u1.map(function(w,j){ return j.toString()+". "+ w }).join("\n")

//  [or[and,..],..]
function g_incidenceMapStatus(){
  var haltSTATUS = false
  var I = this._precedence
  if(I){
      var J = this._precedence //length//
      var K = this._incidenceMap.length
      if(J && K && (J==K)){
        haltSTATUS = true
        this._haltIDX = K
      }
  }
  return haltSTATUS
}
Object.prototype.buildAtLHS = function(me,o,j){
  var I = o.haltIDX
  var i2 = o.oldval.length
  for(var i=i2;i<I;i++){
    this.push(me[i])
  }
}
Object.prototype.buildAtAxiom = function(o,idx){
  var self = this;
  o.val.map(
    function(u,idx,me){
      self.push(u)
      return u
    }
  );
}
Object.prototype.buildAtRHS = function(me,o,idx){
  var J = me.length
  var I = o.oldval.length
  for(var i=I;i<J;i++){
    this.push(me[i])
  }
}
Object.prototype.compileAxioms = function(a){
  var self = this
  /*
  var i = this.length
  this.forEach(function(u){
    self[i++] = "new _AXIOM_("+(new RegExp(_u[0].toRegExp(),"g"))+",'"+_u[1]+"',[])"
    return u
  })
  this.length = i
  */
  a.map(function(u){
    var _u = u.split(/\s+\=\s+/)
    self.push("new _AXIOM_("+(new RegExp(_u[0].toRegExp(),"g"))+",'"+_u[1]+"',[])")
    return u
  })
}
Object.prototype.compileAxioms = function(a){
  var self = this
  a.map(function(u){
    var _u = u.split(/\s+\=\s+/)
    self.push(new _AXIOM_(new RegExp(_u[0].toRegExp(),"g"),_u[1],[]))
    //self.push("new _AXIOM_("+(new RegExp(_u[0].toRegExp(),"g"))+",'"+_u[1]+"',[])")
    return u
  })
}
Object.prototype.reset = function(){
  var i = -1
  while(i++<this.length){
    delete this[i]
  }
  this.length = 0
}
function _AXIOM_(/*a,b,u*/){
  var self = this
  var args = arguments[0]
  args.forEach(function(u){
    self[u] = args[u]
  })
  /*
  this._guid = "axiom_"+g_GUID++
  this._stack = u || []
  this._axiom = a || null
  this._basenet = b
  this._basenetFOUND = false
  this._isOnline
  */
  this._update = function(){
    var args = arguments[0]
    args.forEach(function(w){
      self[w] = args[w]
      return w
    })
  }
  this._eval = function(e){
    var u = e.data
    if(u.source.startsWith("axiom")){
      var val = u.val
      if(self._isOnline && (val != (self._basenetFOUND = val.replace(self._axiom,self._basenet)))){
        g_Solution.push(self._basenetFOUND)
        solutionEditor.appendlog(self._basenetFOUND + " = " + u.basenet)
        postMessage({ source:self._guid,val:self._basenetFOUND,basenet:u.basenet },g_origin)
      }
      console.log("Source:",u.source,", target:",self._guid,(self._basenetFOUND != val)? "(Partial Solution Found)":"")
    }
  }
  addEventListener("message",self._eval)
}

        var tmp = val.split(/\s+/).map(function(tok){
          if((j in symtable)&&(tok==symtable[j])){
            if(++j==J){
              j=0
              self._basenetFOUND = true
              tmp.push(self._basenet)
            }
          }
          else{
            tmp.push(tok)
          }
          return tok
        })

<div id=solutionEditor class=edtCtl><br>
1<sub>(0)</sub> +<sub>(0)</sub> 2 + 2 + 1<sub>(0)</sub> = 6<br><br>
2 + 2 + 2<sub>(0)</sub> = 6<br><br>
2<sub>(1)</sub> +<sub>(1)</sub> 2<sub>(1)</sub> + 2 = 6<br><br>
4<sub>(1)</sub> + 2 = 6<br><br>
4<sub>(2)</sub> +<sub>(2)</sub> 2<sub>(2)</sub> = 6<sub>(2)</sub><br><br>
6<sub>(2)</sub> = 6<sub>(2)</sub> Q.E.D.<br> 
</div>        