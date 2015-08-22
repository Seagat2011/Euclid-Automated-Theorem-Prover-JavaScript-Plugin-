    this.buildTensorReduction = function(tmpParser,s_k_object,j,j_2,k,i){
        var result
        try{
            var o = s_k_object.Clone() // tmpParser[j][k][i].Clone() //
            //var orig = s_k_object.Clone() // tmpParser[j][k][i].Clone() //
            var k_rep = (k==0) ? 1:0
            var p_lhs = tmpParser[j][k][i] // tmpParser[j_2][k][i] //
            var p_rhs = tmpParser[j][k_rep][i]
            //var archive = []
            for(var idx in o){
                //var b = typeof(p_lhs[idx]) != 'function'
                var c = typeof(p_lhs[idx]) == 'number'
                //if(c && b){
                if(c){
                    var u = o[idx]
                    o[idx] = undefined
                    for(var w in p_rhs){
                        var c = typeof(p_rhs[w]) != 'function'
                        if(p_rhs[w] && c){
                            o[w] = u
                        }
                    }
                }
                var c = typeof(o[idx]) == 'object'
                if(c){
                    for(var idx_2 in o[idx]){
                        var c = typeof(o[idx][idx_2]) != 'function'
                        if(p_lhs[idx_2] && c){
                            var u = o[idx][idx_2]
                            o[idx][idx_2] = undefined
                            for(var w in p_rhs){
                                var c = typeof(p_rhs[w]) != 'function'
                                if(p_rhs[w] && c){/*
                                    if(!o[idx]){
                                        o[idx] = {}
                                    }*/
                                    o[idx][w] = u
                                }
                            }
                        }
                    }
                }/*
                if(p_lhs[o[idx]] && b){
                    var idx_2 = p_lhs[o[idx]]
                    var u = o[idx][idx_2]
                    o[idx][idx_2] = undefined
                    for(var w in p_rhs){
                        var c = typeof(p_rhs[w]) != 'function'
                        if(p_rhs[w] && c){/*
                            if(!o[idx]){
                                o[idx] = {}
                            }/
                            o[idx][w] = u
                        }
                    }
                }*/
            }/*
            if(p){
                var k_rep = (k==0) ? 1:0
                orig = tmpParser[j][k_rep]
                for(var w in orig){
                    var b = typeof(orig[w]) != 'function'
                    if(w && b){
                        o[w] = 1
                    }
                }
                result = o
            }*/
            result = o
        }
        catch(e)
        {
        
        }
        return result
    }
//
               o.push([obj,obj_2])
               o.push([obj_2,obj])
               
//

                var w = {}
                for(var i in obj){
                    var b = typeof(obj[i]) != 'function'
                    if(i && b){
                    console.log(b,i)
                        w[i] = obj[i]
                    }
                }
                for(var i in obj_2){
                    var b = typeof(obj_2[i]) != 'function'
                    if(i && b){
                    console.log(b,i)
                        w[i] = obj_2[i]
                    }
                }
               //o.push(obj)
               //o.push(obj_2)
               o.push(w)
               o.push(w)

function prover( includes ){
    includes[0].shift(),includes[0].shift(),includes[0].pop()
    this.buffer = includes[0]; includes.shift()
    this.axioms = includes
   this.buildDiGraph = function(){
        var route_map = new Route_Map()
      var parseDG = false
      var axioms_eol = this.axioms.length-1
      Parser = new Parser_init ( this.buffer )
      var tmpParser = []
      this.axioms.map(function(curNode,j,we){
         var curNode_eol = curNode.length-1
         var o = []
         var obj = {}
         var obj_2 = {}
         var last_i = 0
         curNode.map(function(curVertex,i,me){
            if(curVertex.literal == '='){
                var a = me.slice(last_i,i)
                var b = me.slice(i+1,me.length)
                last_i = i+1
                if(Parser[j]){
                    o.pop() // remove incorrect last entry //
                    Parser[j].pop() // remove incorrect last entry //
                    Parser[j].push(a)
                } else {
                    Parser.push([a,b])
                }
                a.map(function(v,i,blob){
                    var w = v.literal
                    if(i<blob.length-1){
                        if(!obj[w]){
                            obj[w] = {}
                        }
                        var w_next = blob[i+1].literal
                        if(route_map[w]){
                            var w_last = blob[i-1].literal
                            obj[w] = route_map[w]( w_last,w_next,obj[w] )
                        } else {
                            obj[w][w_next] = 1
                        }
                    } else {
                        obj[w] = 1
                    }
                    return v
                })
                b.map(function(v,i,blob){
                    var w = v.literal
                    if(i<blob.length-1){
                        if(!obj_2[w]){
                            obj_2[w] = {}
                        }
                        var w_next = blob[i+1].literal
                        if(route_map[w]){
                            var w_last = blob[i-1].literal
                            obj_2[w] = route_map[w]( w_last,w_next,obj_2[w] )
                        } else {
                            obj_2[w][w_next] = 1
                        }
                    } else {
                        obj_2[w] = 1
                    }
                    return v
                })
               o.push(obj)
               o.push(obj_2)
            }
            return curVertex
         })
         if(o){
            tmpParser.push(o)
         }
         return curNode 
      })
   
      //var archive = {}
        tmpParser.map(function(s_j,j){
            tmpParser.map(function(s_j_2,j_2){
                if(j!=j_2){
                    s_j_2.map(function(s_k,k){
                        s_j.map(function(s_k_2,k_2){
                                var w = []
                            
                                Parser.push(w)
                            return s_k_2
                        })
                        return s_j_2
                    })
                }
                return s_k
            })
            return s_j
        })
         /*
            if(Parser[s_j]){
              if(s_j!=s_k){
                 if(!archive[s_k]){
                    archive[s_k] = {}
                 }
                 if(!archive[s_j]){
                    archive[s_j] = {}
                 }
                 if(!archive[s_j][s_k] && !archive[s_k][s_j]){
                    if(Parser[s_k]){
                       var w = {}
                       for(var t in Parser[s_j]){
                          if(t!='Print'){
                             w[t] = Parser[s_j][t]
                          }
                       }
                       for(var t in Parser[s_k]){
                          if(t!='Print'){
                             w[t] = Parser[s_k][t]
                          }
                       }
                       Parser[s_j] = w
                       Parser[s_k] = w
                    } else {
                       Parser[s_k] = Parser[s_j]
                    } 
                    archive[s_k][s_j] = 1
                 }
              }
            } // test(s_j) //
            */
            return s_k
         }) // loop(j) //
         return s_j
      })
      parseDG = true
      return parseDG
   }
} 

function Route_Map() {
        this['plus'] = function(l,r,o){
            return this['+'](l,r,o)
        }
        this['minus'] = function(l,r,o){
            return this['-'](l,r,o)
        }
        this['+'] = function(l,r,o){
            var obj = o || {}
            if(!obj[l]){
                obj[l] =1
            }
            if(!obj[r]){
                obj[r] = 1
            }
            /*
            if(!obj[l]){
                obj[l] = {}
            }
            if(!obj[r]){
                obj[r] = {}
            }
            obj[l][r] = 1
            obj[r][l] = 1
            */
            return obj
        }
        this['-'] = function(l,r,o){
            var obj = o || {}
            if(!obj[l]){
                obj[l] = {}
            }
            obj[l][r] = 1
            return obj
        }
    }
    Route_Map.prototype = new Object()


proof.push('Proof Found !')
   proof.push('Proof successfully built from axioms ..  ')
   proof.push('Successfull attempt to build axioms ..  ')
   proof.push('Successfully attempted to build axioms ..  ')

      this.axioms.map(function(curNode,j,we){
         var curNode_eol = curNode.length-1
         var obj = []
         curNode.map(function(curVertex,i,me){
            if(curVertex.literal == '='){
               obj.push(me.slice(0,i))
               obj.push(me.slice(i+1,me.length))
            }
            return curVertex
         })
         if(obj){
            tmpParser.push(obj)
         }
         return curNode 
      })
   
   
   this.parseDiGraph = function(){
      var result
      var EXIT_SUCCESS = true
      try{
         //Parser = Parser_LHS
         var eol = buffer.length-1
         var side = 'LHS - '
         buffer.map(function(v,i,me){
            /*
            if(v.literal == '='){
               side = 'RHS - '
               Parser = Parser_RHS //; console.log(i,Parser_LHS,Parser_RHS,Parser,v.tok+':'+me[i+1].tok)
            }*/
            if(i<=eol)
            {
               if(i<eol){
                  var v_2 = me[i+1]
                  if(Parser[v.literal][v_2.literal])
                  {
                     proofStack.push(v.literal)
                     return v
                  } else {
                  //console.log('error '+side+v.literal+':'+v_2.literal+'=1',Parser.Print())
                     result = false
                     Parser['44CDEB54C6F2AEBAD54611201C26D6F0']((i+1),v_2.literal,'Parser['+v.literal+']['+v_2.literal+']==1')
                  }
               } else
               if(i == eol){
                  if(Parser[v.literal])
                  {
                     proofStack.push(v.literal)
                     return v
                  } else {
                  //console.log('error '+side+v.literal+':1',Parser.Print())
                     result = false
                     Parser['44CDEB54C6F2AEBAD54611201C26D6F0'](i,v.literal+' is undefined',v.literal)
                  }
               }
            } 
         })
         var status = {
            true:function(){ return 'Matching number of '+arguments[0]+' \n' },
            false:function(){ return '' }
         }
         EXIT_FAILURE = 
         status[(stack.parens!=0)]('parenthesis')+
         status[(stack.brackets!=0)]('square brackets')+
         status[(stack.braces!=0)]('curly braces')
         if(EXIT_FAILURE){
            result = false
            Parser['44CDEB54C6F2AEBAD54611201C26D6F0'](0,'non'+EXIT_FAILURE,EXIT_FAILURE)
         }
         else
         {
            result = EXIT_SUCCESS
         }
         return result
      } catch (e) {
         console.log(e)
         return false
      }
   }
   this.buildDiGraph = function(){
      var parseDG = false
      var rhs_push_requested = false
      var parameterList = PARAMETER_LIST
      var codeUpperBody = CODE_UPPER_BODY
      var codeMidBody = CODE_MID_BODY
      var codeLowerBody = CODE_LOWER_BODY
      var axioms_eol = this.axioms.length-1
      Parser = new Parser_init( this.buffer )
   //console.log(this.axioms[0].Print())
      this.axioms.map(function(curNode,j,we){
         //Parser = Parser_LHS
         //Parser = new Parser_init( this.buffer )
         var obj = {}
         var curNode_eol = curNode.length-1
         curNode.map(function(curVertex,i,me){
            if(curVertex.literal == '='/* && j==axioms_eol*/){
               //Parser_LHS = Parser
               //Parser = Parser_RHS
               //rhs_push_requested = true
               //obj['lhs'] = Parser
               //obj['mapsTo'] = {}
               //obj['mapsTo'][ me[i-1].literal ] = j+1
               //obj['mapsTo'][ me[i+1].literal ] = j+1
               obj[ me[i-1].literal ] = j+1
               obj[ me[i+1].literal ] = j+1
               //Parser = new Parser_init( this.buffer )
            }
            if(i<curNode_eol){
               var nextVertex = me[i+1]
               if(!Parser[curVertex.literal]){
                  Parser[curVertex.literal] = {}
               } 
               if(!Parser[curVertex.literal][nextVertex.literal]){
                  Parser[curVertex.literal][nextVertex.literal] = 1
               }
            } else
            if(i == curNode_eol){
               if(!Parser[curVertex.literal]){
                  Parser[curVertex.literal] = 1
               } 
            } 
            return curVertex
         })
         if(rhs_push_requested){
            //Parser_RHS = Parser
            //obj['rhs'] = Parser
         } else {
            //Parser_LHS = Parser
            //obj['lhs'] = Parser
         }
         tmpParser.push(obj)
         return curNode 
      })
   //console.log(tmpParser)
   //console.log(Parser.Print())
      tmpParser.map(function(v,i){
         var s = []
         for(var j in v){
         //console.log(j,v[j],typeof(v[j]))
            //if(typeof(v[j])=='number'){
            //console.log(j)
               s.push(j)
            //}
         }
         var J = s.length
         for(var j=0;j<J;j++){
            var s_j = s[j]
            if(Parser[s_j]){
               s.map(function(q,k){
                  if(j!=k){
                     if(Parser[q]){
                        var w = {}
                        for(var t in Parser[s_j]){
                           if(typeof(Parser[s_j][t])=='number'){
                              w[t] = Parser[s_j][t]
                           }
                        }
                        for(var t in Parser[q]){
                           if(typeof(Parser[q][t])=='number'){
                              w[t] = Parser[q][t]
                           }
                        }
                        Parser[s_j] = w
                        Parser[q] = w
                     } else {
                        Parser[q] = Parser[s_j]
                     } 
                  //console.log(Parser)
                  }
                  return q
               })
               break
            } // test(s_j) //
         } // loop(j) //
         return v
      })
   console.log(Parser)
      parseDG = true
      return parseDG
   }

/*
var buffer = 
[
{ id:en.OpenCurly,val:'{',tok:en.OpenCurly },
{ id:en.Idnum,val:'15',tok:'15' },
{ id:en.CloseCurly,val:'}',tok:en.CloseCurly },
{ id:en.FOFXor,val:'^',tok:en.FOFXor  },
{ id:en.OpenCurly,val:'{',tok:en.OpenCurly },
{ id:en.Idnum,val:'16',tok:'16' },
{ id:en.CloseCurly,val:'}',tok:en.CloseCurly },
{ id:en.NullToken,val:null,tok:en.NullToken }
] // NOTE: Only Idnums are inserted directly into the DiGraph //

var includes = 
[
{ id:en.OpenCurly,val:'{',tok:en.OpenCurly },
{ id:en.Idnum,val:'15',tok:'15' },
{ id:en.CloseCurly,val:'}',tok:en.CloseCurly },
{ id:en.FOFXor,val:'^',tok:en.FOFXor  },
{ id:en.OpenCurly,val:'{',tok:en.OpenCurly },
{ id:en.Idnum,val:'16',tok:'16' },
{ id:en.CloseCurly,val:'}',tok:en.CloseCurly },
{ id:en.NullToken,val:null,tok:en.NullToken }
] // axioms
*/

var status = 
    [
    function(){ return updateParseStatus( 'Lexer now Parsing..\n',my_func_lexer({ data:_in_ })) },
 // function(tok){ return updateParseStatus( 'Syntaxer now Parsing..\n',my_func_syntax({ data:tok })) },
    function(tok){ return updateParseStatus( 'Euclid now Parsing..\n',my_func_euclid({ data:tok })) },
    function(tok){ postMessage ({ origin:'ThreadWorker_00',value:tok,error:false }) },
    ]

   this.parseDiGraph = function(){
      var result
      var EXIT_SUCCESS = true
      try{
         proofStack.push(buffer[0].literal) // init'z stack //
         Parser = Parser_LHS
         buffer.map(function(v,i,me){
            if(v.literal == '='){
              Parser = Parser_RHS
            }
            if(i<me.length-1)
            {
               if(Parser[v.tok])
               {
                  Parser[v.tok](i)
                  return v
               }
               else
               {
                  Parser['44CDEB54C6F2AEBAD54611201C26D6F0'](i,v.literal,Parser['7F2DB423A49B305459147332FB01CF87'][i].literal)
                  result = false
               }
            }
         })
         var status = {
            true:function(){ return 'Matching number of '+arguments[0]+' \n' },
            false:function(){ return '' }
         }
         EXIT_FAILURE = 
         status[(stack.parens!=0)]('parenthesis')+
         status[(stack.brackets!=0)]('square brackets')+
         status[(stack.braces!=0)]('curly braces')
         if(EXIT_FAILURE){
            Parser['44CDEB54C6F2AEBAD54611201C26D6F0'](0,'non'+EXIT_FAILURE,EXIT_FAILURE)
            result = false
         }
         else
         {
            result = EXIT_SUCCESS
         }
         return result
      } catch (e) {
         console.log(e)
         return false
      }
   }

this.buildDiGraph = function(){
      var parseDG = false
      var rhs_push_requested = false
      var parameterList = PARAMETER_LIST
      var codeUpperBody = CODE_UPPER_BODY
      var codeMidBody = CODE_MID_BODY
      var codeLowerBody = CODE_LOWER_BODY
      this.axioms.map(function(curNode,j,we){
         Parser = Parser_LHS
         curNode.map(function(curVertex,i,me){
            if(curVertex.literal == '='){
               Parser_LHS = Parser
               Parser = Parser_RHS
               rhs_push_requested = true
            }
            if(i<me.length-1){
               var nextVertex = me[i+1]
               var codebody = codeUpperBody+inQuotes(nextVertex.tok)+codeMidBody+inQuotes(nextVertex.tok)+codeLowerBody
               if(!Parser[curVertex.tok]){
                  Parser[curVertex.tok] = new Function(parameterList,codebody)
               } else {
                  codebody = Parser[curVertex.tok].toSource()
                  codebody = codebody.match(/\{.*\}/)[0]
                  var n = codebody.match(/length:(\d+)/)[1]*1
                  n++
                  var newSection = codebody.replace(/length:\d+/,inQuotes(nextVertex.tok)+':Parser['+inQuotes(nextVertex.tok)+'],length:'+n)
                  Parser[curVertex.tok] = new Function(parameterList,newSection)
               }
            } else {
               var codebody = CODE_NULL
               if(!Parser[curVertex.tok]){
                  Parser[curVertex.tok] = new Function(parameterList,codebody)
               }
            }
            return curVertex
         })
         if(rhs_push_requested){
           Parser_RHS = Parser
         }
         return curNode 
      })
      parseDG = true
      return parseDG
   }

   this.mergeAxioms = function(lhs,rhs){
     for(var k in rhs){
       if(lhs[k] && rhs[k]){
         lhs[k] = this.mergeAxioms(lhs[k],rhs[k])
       } else {
         lhs[k] = rhs[k]
       }
     }
     return lhs
   }

function nfa_init(e)
{
   NFA = e.data.value
/*
   NFA = {}
   var nfa_rules = e.data.value
   for(var key1 in nfa_rules){
      for(var key2 in nfa_rules){
         if(nfa_rules[key1][key2]){
            if(!NFA[ en[key1] ]){
               NFA[ en[key1] ] = {}
            }
            NFA[ en[key1] ][ en[key2] ] = 1
         }
      }
   }
*/
}

/*
var padIP = {
    'csup':1,
    'csub':1,
    'dot':1,
    'ddot':1,
    'dddot':1,
    'vec':1,
}*/

typeof(d.trTALLY)!='undefined' || typeof(d.tdTALLY)!='undefined'

'matrix':function(){ var v = arguments[0]; var j = arguments[1]; 
    var k = peekSYMBOL(v,++j);  
    var s = peekSCOPE(v,j,k);
    return ('</td><td>'+s+'</td><td>')
    //return ('<table class=cssFormula><tbody><tr>'+s.replace(/^\(/gm,'').replace(/\)$/gm,'')+'</tr></tbody></table>') 
    },

'binom':function(){ var v = arguments[0]; var j = arguments[1]; 
    var k = peekSYMBOL(v,++j); 
    var l = peekSYMBOL(v,k); 
    var s = peekSCOPE(v,j,k); 
    var b = peekSCOPE(v,k,l); 
    v.trTALLY = 2
    var c = (v.trTALLY+0)*FORMULA_FONT_SIZE; 
    v.trTALLY = undefined
    return ('<td class=cssMATRIX style="font-size:'+c+'">(</td><td>'+s+'<br/>'+b+'</td><td class=cssMATRIX style="font-size:'+c+'">)</td>')
    //return ('<table class=cssFormula><tbody><tr>'+s.replace(/^\(/gm,'').replace(/\)$/gm,'')+'</tr></tbody></table>') 
    },
'stack':function(){ var v = arguments[0]; var j = arguments[1]; 
    var k = peekSYMBOL(v,++j); 
    var l = peekSYMBOL(v,k); 
    var s = peekSCOPE(v,j,k); 
    var b = peekSCOPE(v,k,l); 
    return (s+'<br/>'+b)
    //return ('<table class=cssFormula><tbody><tr>'+s.replace(/^\(/gm,'').replace(/\)$/gm,'')+'</tr></tbody></table>') 
    },

'lsup':function(){ var v = arguments[0]; var j = arguments[1]; 
    var k = peekSYMBOL(v,++j); 
    var l = peekSYMBOL(v,k); 
    var s = peekSCOPE(v,j,k); 
    var b = peekSCOPE(v,k,l); 
    v[j-1].tdUPPER = s
    return '&nbsp;&nbsp;&nbsp;&nbsp;'+b
    //return ('<table class=cssFormula><tbody><tr><td><sub style="align:left">'+b+'</sub></td></tr><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;'+s+'</td></tr></tbody></table>') 
    }, // superscript x (left-sided) //
'lsub':function(){ var v = arguments[0]; var j = arguments[1]; 
    var k = peekSYMBOL(v,++j); 
    var l = peekSYMBOL(v,k); 
    var s = peekSCOPE(v,j,k); 
    var b = peekSCOPE(v,k,l); 
    v[j-1].tdLOWER = b
    return '&nbsp;&nbsp;&nbsp;&nbsp;'+s
    //return ('<table class=cssFormula><tbody><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;'+s+'</td></tr><tr><td><sup style="align:left">'+b+'</sup></td></tr></tbody></table>') 
    }, // subscript x (lef-sided) //

function SKN(v,b)
{
   this.scan_token = function( i,j ){
      var peek = parser['7F2DB423A49B305459147332FB01CF87'][i]
      if(NFA[peek[j].tok ][peek[(j+1)].tok ]){
         ;; // NOP //
      } else {
         var hist = {}
         var w = []; 
         w.push('NFA['+invEN[peek[j].tok]+']['+invEN[peek[j+1].tok]+'] == 0')
      /*
         for(var expected in NFA[peek[j].tok ]){ 
            w.push(invEN[expected] || '????' )
         } 
      */
         throw parser['44CDEB54C6F2AEBAD54611201C26D6F0'](i,(j+1),invEN[peek[(j+1)].tok],w.join(' or '))
      }
   }
}

'to':function(){ var v = arguments[0]; var j = arguments[1]; var s = v[j].val; 
    var i = peekSYMBOLrev(v,j-1); 
    var h = peekSYMBOLrev(v,i-1);
    var g = peekSYMBOLrev(v,h-1);
    if(v[g] && v[g].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluated?/)){ // LBOUNDS also exists ? //
    /*
        if(v[g].val.match(/sum|lim/)){ // skip next few //
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
            v[g].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        } else { // no skip //
    */
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
            v[g].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        //}
        s = '' 
    } 
//    var h = peekSYMBOLrev(v,g-1); 
/*
    if(v[h] && v[h].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluated?/)){ // LBOUNDS also exists ? //
        if(v[h].val.match(/sum|lim/)){ // skip next few //
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j+4,k+4); 
            v[h].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        } else { // no skip //
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
            v[h].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        }
        s = '' 
    } 
*/
    else // UBOUNDS exclusively //
    if(v[i] && v[i].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluated?/)){
        var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
        v[i].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        s = '' 
    }
    return s 
    },

'from':function(){ var v = arguments[0]; var j = arguments[1]; var s = v[j].val; 
    var i = peekSYMBOLrev(v,j-1);
    if(v[i] && v[i].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluated?/)){
        // current scope //
        var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
        v[i].tdLOWER = buildSYMBOL[s]?buildSYMBOL[s](v,j):s;
    /*
        if(!v[i].val.match(/sum|lim/)){
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
            v[i].tdLOWER = buildSYMBOL[s]?buildSYMBOL[s](v,j):s;
        } else {
            k = peekSYMBOL(v,++j); var m = peekSCOPE(v,j,k); 
            k = peekSYMBOL(v,++j); var n = peekSCOPE(v,j,k); 
            k = peekSYMBOL(v,++j); var p = peekSCOPE(v,j,k); 
            v[i].tdLOWER = buildSYMBOL[m]?buildSYMBOL[m](v,j):m + ' ' + (buildSYMBOL[n]?buildSYMBOL[n](v,j):n) + ' ' + (buildSYMBOL[p]?buildSYMBOL[p](v,j):p); 
        }
    */
        // lookahead //
        if(v[++j] && v[j].val.match(/^to$/)){
            k = peekSYMBOL(v,++j); 
            var n = peekSCOPE(v,j,k); 
            v[i].tdUPPER = buildSYMBOL[n]?buildSYMBOL[n](v,j):n;
        }
        s = '' 
    }
    return s 
    },

'to':function(){ var v = arguments[0]; var j = arguments[1]; var s = v[j].val; 
    var i = peekSYMBOLrev(v,j-1); 
    var g = peekSYMBOLrev(v,i-1); 
    var h = peekSYMBOLrev(v,g-1); 
    if(v[h] && v[h].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluated?/)){
        if(v[h].val.match(/sum|lim/)){ // skip next few ? //
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j+4,k+4); 
            v[h].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        } else {
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
            v[h].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        }
        s = '' 
    } else
    if(v[i] && v[i].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluated?/)){/*
        if(v[i].val.match(/sum|lim/)){ // skip next few ? //
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j+1,k+1); 
            v[i].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        } else {*/
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
            v[i].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        //}
        s = '' 
    }
    return s 
    },

function generateBOUNDS()
{
    var v = arguments[0]
    var j = arguments[1]
    var s = arguments[0][ arguments[1] ].val
    var k = peekSYMBOL(v,++j); var l = peekSYMBOL(v,k);
    var m = v[j].val
    if(m && m.match(/from|to/)){
        var tmp_pc = j
        buildSYMBOL[m](v,j) // tdLOWER .. tdUPPER //
/*        tmp_pc = v.pc
        m = v[tmp_pc].val
        if(m && m.match(/^to$/)){
            buildSYMBOL[m](v,j) // tdUPPER //
            tmp_pc = v.pc
        }
        v.pc = tmp_pc
*/
    }
    return s
}

'from':function(){ var v = arguments[0]; var j = arguments[1]; var s = v[j].val; 
    var i = peekSYMBOLrev(v,j-1);
    if(v[i].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluated?/)){
        // build scope //
        if(!v[i].val.match(/sum|lim/)){
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
            v[i].tdLOWER = buildSYMBOL[s]?buildSYMBOL[s](v,j):s;
        } else {
            k = peekSYMBOL(v,++j); var m = peekSCOPE(v,j,k); 
            k = peekSYMBOL(v,++j); var n = peekSCOPE(v,j,k); 
            k = peekSYMBOL(v,++j); var p = peekSCOPE(v,j,k); 
            v[i].tdLOWER = buildSYMBOL[m]?buildSYMBOL[m](v,j):m + ' ' + (buildSYMBOL[n]?buildSYMBOL[n](v,j):n) + ' ' + (buildSYMBOL[p]?buildSYMBOL[p](v,j):p); 
        }
        // lookahead //
        k = peekSYMBOL(v,++j); 
        if(v[j].val.match(/^to$/)){
            var n = peekSCOPE(v,j+1,k+1); 
            //k = peekSYMBOL(v,++j); var p = peekSCOPE(v,j,k); 
            v[i].tdUPPER = buildSYMBOL[n]?buildSYMBOL[n](v,j):n;
            //buildSYMBOL[p]?buildSYMBOL[p](v,j):p;
        }
        s = '' 
    }
    return s 
    },

'to':function(){ var v = arguments[0]; var j = arguments[1]; var s = v[j].val; 
    var i = peekSYMBOLrev(v,j-1); 
    //if(v[i].tdLOWER){
        if(v[i].val.match(/sum|lim/)){ // skip next four ? //
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j+4,k+4); 
            v[i].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        } else {
            var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
            v[i].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        }
        s = '' /*
    } else if(v[i].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluated?/)){
        var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
        v[i].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s);
        s = ''
    }*/
    return s 
    },   
   
   /*
    if(padSP[d.val]){
        val = '</td><td>'+val+'</td><td>'
    }*/

'from':function(){ var v = arguments[0]; var j = arguments[1]; var s = v[j].val; 
    var i = peekSYMBOLrev(v,j-1);
    if(v[i].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluate?/)){
    //if(v[j].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluate?/)){
        //var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j,k); 
        if(!v[i].val.match(/sum|lim/)){
        //if(!v[j].val.match(/sum|lim/)){
            v[i].tdLOWER = buildSYMBOL[s]?buildSYMBOL[s](v,++j):s;
        } else {
            k = peekSYMBOL(v,++j); var m = peekSCOPE(v,j,k); 
            k = peekSYMBOL(v,++j); var n = peekSCOPE(v,j,k); 
            v[i].tdLOWER = buildSYMBOL[s]?buildSYMBOL[s](v,j):s + ' ' + (buildSYMBOL[m]?buildSYMBOL[m](v,j):m) + ' ' + (buildSYMBOL[n]?buildSYMBOL[n](v,j):n); 
        }
        s = '' 
    }
    return s 
    },
'to':function(){ var v = arguments[0]; var j = arguments[1]; var s = v[j].val; 
    var i = peekSYMBOLrev(v,j-1); 
    if(v[i].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluate?/) || v[i].tdLOWER){ 
    //if(v[j].val.match(/sum|i{1,3}nt|l{1,3}int|prod|coprod|lim|evaluate?/) || v[j].tdLOWER){ 
        var k = peekSYMBOL(v,++j); s = peekSCOPE(v,j+2,k+2); 
        v[i].tdUPPER = (buildSYMBOL[s]?buildSYMBOL[s](v,j):s) ; 
        s = '' 
    } 
    return s 
    },
 
'int':function(){ var v = arguments[0]; var j = arguments[1]; 
 var k = peekSYMBOL(v,++j); var l = peekSYMBOL(v,k);
 var m = v[j].val
 if(m && m.match(/from|to/)){
     v.pc = j
     this[m](v,j) // tdLOWER; tdUPPER //
     v.pc = k
     m = v[j+2].val
     if(m && m.match(/^to$/)){
         this[m](v,j) // tdUPPER //
         v.pc = l+2
     }
 }
 return spanFormulaOperator_LHS+'&int;'+span_RHS 
 },
 
var NFA = 
{
   "A5FE5D548A3DA1C957C1944CCE73B215": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "2AB1F3F893823298751FDF60B4E0365A":{
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   },
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": {
   "2AB1F3F893823298751FDF60B4E0365A":1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.F2B798F672D4B42C0359CED11D4F10CD": 1,
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": 1,
   "E109705703E0324D1A5DE1D84A3A8951.DABE6E597B70E5760826AEA1DCC564F7": 1,
   "77B7E24BB3642A4B9D3081D393785273": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.D7D18CFB3A0D8293E2F5D94EA30E04D2": 1,
   "E7B8427783105A8F10F05B7F4EFDB3E7": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.BBFD87BD78B94790F1D39C88DB250530": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.3B759A9CA80234563D87672350659B2B": 1,
   "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.B0AB0254BD58EB87EAEE3172BA49FEFB": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.4D00D79B6733C9CC066584A02ED03410": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.5B2D4484498235E80D61A233A7C04991": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.97223FAB7B0D4C64C07E6E004C602302": 1,
   "0615A38067B62382DC1667010669B238.B6D00DC1BA038E5901CD6C06B2DAA192": 1,
   "E109705703E0324D1A5DE1D84A3A8951.D0CC7FA42A4F86B8C0B6ED1629018611": 1,
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1,
   "B3C5827F54218753BB2C3338236446C2.3880A6CC2F3E0C30102C67845627F810": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.B82C91E2103D0A495C099F0A12F66363": 1,
   "0615A38067B62382DC1667010669B238.B81453378A0C6E5389111178CF249C11": 1,
   "A5FE5D548A3DA1C957C1944CCE73B215": 1,
   "C2269A9B6BEA4200B7E6E6ECD05111D1": 1,
   "52EF9633D88A7480B3A938FF9EAA2A25.A096FD08AF89F16E286F268063C06AF6": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.36C2F310FBF1721666C750FFC33DC9FA": 1,
   "F38F249F06E9190DBCB8C34370A1F046.13B5BFE96F3E2FE411C9F66F4A582ADF": 1,
   "52EF9633D88A7480B3A938FF9EAA2A25.BB302C9B5204D593BA3657055842A5FB": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.61A74BE60D291CC4678AB46CC1CDAF91": 1,
   "B3C5827F54218753BB2C3338236446C2.8BF8854BEBE108183CAEB845C7676AE4": 1,
   "E109705703E0324D1A5DE1D84A3A8951.B9DFC657B70A1A442A13065822AE5C3A": 1,
   "24BD4C7C4859015A1B343B90943FBDB8.165A1761634DB1E9BD304EA6F3FFCF2B": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.BE5D5D37542D75F93A87094459F76678": 1,
   "24BD4C7C4859015A1B343B90943FBDB8.B3E232550A910F3BCF9A2DFD8B6889DB": 1,
   "B3C5827F54218753BB2C3338236446C2.354F047BA64552895B016BBDD60AB174": 1,
   "24BD4C7C4859015A1B343B90943FBDB8.21582C6C30BE1217322CDB9AEBAF4A59": 1,
   "B3C5827F54218753BB2C3338236446C2.23A58BF9274BEDB19375E527A0744FA9": 1,
   "B3C5827F54218753BB2C3338236446C2.D98A07F84921B24EE30F86FD8CD85C3C": 1,
   "16E127072878E35F572B8F19BDB4B686.60DD75115E02A517CFBA5580098AE1C8": 1,
   "16E127072878E35F572B8F19BDB4B686.53E2EDEE624B8B5A755C57C3DF9174F7": 1,
   "16E127072878E35F572B8F19BDB4B686.CAAE5938C6C83D12D2CAF634A0D2C0FF": 1
   },
   "B3C5827F54218753BB2C3338236446C2.231E60582F487AD2C2FF5190717856CC": {
   "B3C5827F54218753BB2C3338236446C2.B1932C2B89031F68B41EAD3BA4A5B9A5": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.BBFD87BD78B94790F1D39C88DB250530": 1,
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1,
   "B3C5827F54218753BB2C3338236446C2.C9452B661E1DC4CFD77C4AB83C7CEBB8": 1
   },
   "B3C5827F54218753BB2C3338236446C2.B1932C2B89031F68B41EAD3BA4A5B9A5": {
   "52104F74F9A3C743625031A4715B1887": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1,
   "A5FE5D548A3DA1C957C1944CCE73B215": 1
   },
   "52104F74F9A3C743625031A4715B1887": {
   "2AB1F3F893823298751FDF60B4E0365A":1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.BBFD87BD78B94790F1D39C88DB250530": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.3B759A9CA80234563D87672350659B2B": 1,
   "E109705703E0324D1A5DE1D84A3A8951.DABE6E597B70E5760826AEA1DCC564F7": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.D7D18CFB3A0D8293E2F5D94EA30E04D2": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.F2B798F672D4B42C0359CED11D4F10CD": 1,
   "B3C5827F54218753BB2C3338236446C2.01B6E20344B68835C5ED1DDEDF20D531": 1,
   "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8": 1,
   "A5FE5D548A3DA1C957C1944CCE73B215": 1,
   "C2269A9B6BEA4200B7E6E6ECD05111D1": 1,
   "3DD8A3067D2147D8342717B40A9833AE": 1,
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.72AB8AF56BDDAB33B269C5964B26620A": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.B0AB0254BD58EB87EAEE3172BA49FEFB": 1,
   "52104F74F9A3C743625031A4715B1887": 1,
   "B3C5827F54218753BB2C3338236446C2.18DAEE01FC6E54AACD7F4C2EEF60FF4D": 1,
   "B3C5827F54218753BB2C3338236446C2.340F7C2DCAEDEAE68E4A62C281C7350B": 1,
   "B3C5827F54218753BB2C3338236446C2.640FD0CC0FFA0316AE087652871F4486": 1,
   "B3C5827F54218753BB2C3338236446C2.783E8E29E6A8C3E22BAA58A19420EB4F": 1,
   "E7B8427783105A8F10F05B7F4EFDB3E7": 1,
   "27118326006D3829667A400AD23D5D98": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.01A3568510E7FFBC2458AA4421E8ECD2": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": 1,
   "E109705703E0324D1A5DE1D84A3A8951.A5FA324707BE552E3FCDE68359BA1330": 1,
   "0615A38067B62382DC1667010669B238.B6D00DC1BA038E5901CD6C06B2DAA192": 1,
   "16E127072878E35F572B8F19BDB4B686.EC9962F64DBBC61B566D4D3478A4902A": 1,
   "E109705703E0324D1A5DE1D84A3A8951.D0CC7FA42A4F86B8C0B6ED1629018611": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.BE5D5D37542D75F93A87094459F76678": 1,
   "E109705703E0324D1A5DE1D84A3A8951.D9180594744F870AEEFB086982E980BB": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.B82C91E2103D0A495C099F0A12F66363": 1,
   "24BD4C7C4859015A1B343B90943FBDB8.B3E232550A910F3BCF9A2DFD8B6889DB": 1
   },
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "B3C5827F54218753BB2C3338236446C2.231E60582F487AD2C2FF5190717856CC": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.B0AB0254BD58EB87EAEE3172BA49FEFB": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.F8E19F449F17C9D37DCC93DD244EC3BB": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.4D00D79B6733C9CC066584A02ED03410": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.5B2D4484498235E80D61A233A7C04991": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.97223FAB7B0D4C64C07E6E004C602302": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.A7CD83FE6A92873F5118A3DD9EDEFF2D": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.DC1D71BBB5C4D2A5E936DB79EF10C19F": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.DD1DE98E8B0E34D5CF5396E83036F4D5": 1,
   "52104F74F9A3C743625031A4715B1887": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.F9AC6B05BECCB0FC5837B6A7FEF4C1D3": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.1A9B5EE12F27E6F4BD9371EC529AA76F": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.F24C2C15B9D03797C6874986A8D19516": 1,
   "B3C5827F54218753BB2C3338236446C2.1D623B89683F9CE4E074DE1676D12416": 1,
   "52EF9633D88A7480B3A938FF9EAA2A25.0E87C1212A698494DCDB198AF3E0EB2F": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.72AB8AF56BDDAB33B269C5964B26620A": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.EDA0B76DA6F92E54A7E54750FDB10213": 1
   },
   "FDE7ED8E71279ADA2A65FA925C408876.F2B798F672D4B42C0359CED11D4F10CD": {
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.5B2D4484498235E80D61A233A7C04991": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.4D00D79B6733C9CC066584A02ED03410": 1
   },
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": {
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": 1,
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1,
   "A5FE5D548A3DA1C957C1944CCE73B215": 1,
   "E7B8427783105A8F10F05B7F4EFDB3E7": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.D7D18CFB3A0D8293E2F5D94EA30E04D2": 1,
   "E109705703E0324D1A5DE1D84A3A8951.DABE6E597B70E5760826AEA1DCC564F7": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.3B759A9CA80234563D87672350659B2B": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.BBFD87BD78B94790F1D39C88DB250530": 1,
   "B3C5827F54218753BB2C3338236446C2.231E60582F487AD2C2FF5190717856CC": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.F2B798F672D4B42C0359CED11D4F10CD": 1,
   "0615A38067B62382DC1667010669B238.B6D00DC1BA038E5901CD6C06B2DAA192": 1,
   "E109705703E0324D1A5DE1D84A3A8951.A5FA324707BE552E3FCDE68359BA1330": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.B82C91E2103D0A495C099F0A12F66363": 1,
   "16E127072878E35F572B8F19BDB4B686.7C4F29407893C334A6CB7A87BF045C0D": 1,
   "287234A1FF35A314B5B6BC4E5828E745.EC99834B54FB5BC3D50F5FE0EFB9B93B": 1,
   "C2269A9B6BEA4200B7E6E6ECD05111D1": 1,
   "24BD4C7C4859015A1B343B90943FBDB8.0E5243D9965540F62AAC19A985F3F33E": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "24BD4C7C4859015A1B343B90943FBDB8.165A1761634DB1E9BD304EA6F3FFCF2B": 1,
   "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.01A3568510E7FFBC2458AA4421E8ECD2": 1,
   "24BD4C7C4859015A1B343B90943FBDB8.7DA2931FEBD860A8B7E5F3AE252649D0": 1
   },
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "B3C5827F54218753BB2C3338236446C2.DA46ECA59CE56AD13F03D16D0D57583C": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.B0AB0254BD58EB87EAEE3172BA49FEFB": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.4D00D79B6733C9CC066584A02ED03410": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.F24C2C15B9D03797C6874986A8D19516": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.1A9B5EE12F27E6F4BD9371EC529AA76F": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.A7CD83FE6A92873F5118A3DD9EDEFF2D": 1,
   "52104F74F9A3C743625031A4715B1887": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.F8E19F449F17C9D37DCC93DD244EC3BB": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.545F7F577C93318B34476E9999931731": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.5B2D4484498235E80D61A233A7C04991": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.DD1DE98E8B0E34D5CF5396E83036F4D5": 1,
   "B3C5827F54218753BB2C3338236446C2.1D623B89683F9CE4E074DE1676D12416": 1,
   "16E127072878E35F572B8F19BDB4B686.811882FECD5C7618D7099EBBD39EA254": 1,
   "52EF9633D88A7480B3A938FF9EAA2A25.A40B9DB0A4AB344566E5D1A4C04D8175.B3C5827F54218753BB2C3338236446C2.E37B6E74A3BD476DFDE7E0577B9E81D6": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.97223FAB7B0D4C64C07E6E004C602302": 1,
   "52EF9633D88A7480B3A938FF9EAA2A25.332DE775A36BBFCB140E1CAA06299A8A": 1
   },
   "E109705703E0324D1A5DE1D84A3A8951.DABE6E597B70E5760826AEA1DCC564F7": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "52104F74F9A3C743625031A4715B1887": 1,
   "B3C5827F54218753BB2C3338236446C2.FA7153F7ED1CB6C0FCF2FFB2FAC21748": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.97223FAB7B0D4C64C07E6E004C602302": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.5B2D4484498235E80D61A233A7C04991": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.4D00D79B6733C9CC066584A02ED03410": 1,
   "B3C5827F54218753BB2C3338236446C2.01B6E20344B68835C5ED1DDEDF20D531": 1,
   "B3C5827F54218753BB2C3338236446C2.80016CA1EAD584DB2209B9BDD97C184F": 1
   },
   "77B7E24BB3642A4B9D3081D393785273": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "FDE7ED8E71279ADA2A65FA925C408876.D7D18CFB3A0D8293E2F5D94EA30E04D2": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "52104F74F9A3C743625031A4715B1887": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.5B2D4484498235E80D61A233A7C04991": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.4D00D79B6733C9CC066584A02ED03410": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": 1,
   "B3C5827F54218753BB2C3338236446C2.80016CA1EAD584DB2209B9BDD97C184F": 1,
   "B3C5827F54218753BB2C3338236446C2.1D623B89683F9CE4E074DE1676D12416": 1
   },
   "E7B8427783105A8F10F05B7F4EFDB3E7": {
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1,
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.BBFD87BD78B94790F1D39C88DB250530": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.F2B798F672D4B42C0359CED11D4F10CD": 1,
   "52104F74F9A3C743625031A4715B1887": 1
   },
   "FDE7ED8E71279ADA2A65FA925C408876.BBFD87BD78B94790F1D39C88DB250530": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "B3C5827F54218753BB2C3338236446C2.231E60582F487AD2C2FF5190717856CC": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "52104F74F9A3C743625031A4715B1887": 1
   },
   "FDE7ED8E71279ADA2A65FA925C408876.3B759A9CA80234563D87672350659B2B": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.DD1DE98E8B0E34D5CF5396E83036F4D5": 1,
   "52104F74F9A3C743625031A4715B1887": 1,
   "52EF9633D88A7480B3A938FF9EAA2A25.0E87C1212A698494DCDB198AF3E0EB2F": 1
   },
   "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8": {
   "52104F74F9A3C743625031A4715B1887": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "B3C5827F54218753BB2C3338236446C2.DA46ECA59CE56AD13F03D16D0D57583C": {
   "B3C5827F54218753BB2C3338236446C2.B1932C2B89031F68B41EAD3BA4A5B9A5": 1,
   "B3C5827F54218753BB2C3338236446C2.231E60582F487AD2C2FF5190717856CC": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.B0AB0254BD58EB87EAEE3172BA49FEFB": {
   "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8": 1,
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": 1,
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.F8E19F449F17C9D37DCC93DD244EC3BB": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.72AB8AF56BDDAB33B269C5964B26620A": 1,
   "52104F74F9A3C743625031A4715B1887": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.05B048D7242CB7B8B57CFA3B1D65ECEA": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.61A74BE60D291CC4678AB46CC1CDAF91": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.4D00D79B6733C9CC066584A02ED03410": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.61A74BE60D291CC4678AB46CC1CDAF91": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": 1
   },
   "FDE7ED8E71279ADA2A65FA925C408876.F24C2C15B9D03797C6874986A8D19516": {
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "52104F74F9A3C743625031A4715B1887": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.5B2D4484498235E80D61A233A7C04991": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.97223FAB7B0D4C64C07E6E004C602302": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.5B2D4484498235E80D61A233A7C04991": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.61A74BE60D291CC4678AB46CC1CDAF91": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.97223FAB7B0D4C64C07E6E004C602302": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.A7CD83FE6A92873F5118A3DD9EDEFF2D": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.1A9B5EE12F27E6F4BD9371EC529AA76F": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.DC1D71BBB5C4D2A5E936DB79EF10C19F": {
   "0615A38067B62382DC1667010669B238.B81453378A0C6E5389111178CF249C11": 1
   },
   "0615A38067B62382DC1667010669B238.B81453378A0C6E5389111178CF249C11": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "52104F74F9A3C743625031A4715B1887": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.DD1DE98E8B0E34D5CF5396E83036F4D5": {
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.B0AB0254BD58EB87EAEE3172BA49FEFB": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.72AB8AF56BDDAB33B269C5964B26620A": 1,
   "52104F74F9A3C743625031A4715B1887": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "B3C5827F54218753BB2C3338236446C2.FA7153F7ED1CB6C0FCF2FFB2FAC21748": {
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "0615A38067B62382DC1667010669B238.B6D00DC1BA038E5901CD6C06B2DAA192": {
   "24BD4C7C4859015A1B343B90943FBDB8.B9F4C1CC743AF7B09673BA380390D2F1": 1,
   "24BD4C7C4859015A1B343B90943FBDB8.39C8942E1038872A822C0DC75EEDBDE3": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.BE5D5D37542D75F93A87094459F76678": 1
   },
   "24BD4C7C4859015A1B343B90943FBDB8.B9F4C1CC743AF7B09673BA380390D2F1": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.F9AC6B05BECCB0FC5837B6A7FEF4C1D3": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.61A74BE60D291CC4678AB46CC1CDAF91": 1
   },
   "E109705703E0324D1A5DE1D84A3A8951.D0CC7FA42A4F86B8C0B6ED1629018611": {
   "52104F74F9A3C743625031A4715B1887": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.F9AC6B05BECCB0FC5837B6A7FEF4C1D3": {
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "FDE7ED8E71279ADA2A65FA925C408876.545F7F577C93318B34476E9999931731": {
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "AF30619F4CBE3AD9C135AEC6910A4805.61A74BE60D291CC4678AB46CC1CDAF91": {
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": 1,
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1,
   "E109705703E0324D1A5DE1D84A3A8951.A5FA324707BE552E3FCDE68359BA1330": 1
   },
   "B3C5827F54218753BB2C3338236446C2.C9452B661E1DC4CFD77C4AB83C7CEBB8": {
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1
   },
   "B3C5827F54218753BB2C3338236446C2.3880A6CC2F3E0C30102C67845627F810": {
   "B3C5827F54218753BB2C3338236446C2.F2F62CDD809DA0B593DF8D93DCEB2477": 1
   },
   "B3C5827F54218753BB2C3338236446C2.1D623B89683F9CE4E074DE1676D12416": {
   "B3C5827F54218753BB2C3338236446C2.D98A07F84921B24EE30F86FD8CD85C3C": 1
   },
   "B3C5827F54218753BB2C3338236446C2.D98A07F84921B24EE30F86FD8CD85C3C": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "52104F74F9A3C743625031A4715B1887": 1
   },
   "B3C5827F54218753BB2C3338236446C2.01B6E20344B68835C5ED1DDEDF20D531": {
   "52EF9633D88A7480B3A938FF9EAA2A25.F2FDEE93271556E428DD9507B3DA7235": 1,
   "E109705703E0324D1A5DE1D84A3A8951.DABE6E597B70E5760826AEA1DCC564F7": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "52EF9633D88A7480B3A938FF9EAA2A25.F2FDEE93271556E428DD9507B3DA7235": {
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "E109705703E0324D1A5DE1D84A3A8951.A5FA324707BE552E3FCDE68359BA1330": {
   "52104F74F9A3C743625031A4715B1887": 1,
   "AF30619F4CBE3AD9C135AEC6910A4805.61A74BE60D291CC4678AB46CC1CDAF91": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.B82C91E2103D0A495C099F0A12F66363": {
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": 1
   },
   "16E127072878E35F572B8F19BDB4B686.811882FECD5C7618D7099EBBD39EA254": {
   "16E127072878E35F572B8F19BDB4B686.60DD75115E02A517CFBA5580098AE1C8": 1
   },
   "16E127072878E35F572B8F19BDB4B686.60DD75115E02A517CFBA5580098AE1C8": {
   "0615A38067B62382DC1667010669B238.21B72C0B7ADC5C7B4A50FFCB90D92DD6": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "0615A38067B62382DC1667010669B238.21B72C0B7ADC5C7B4A50FFCB90D92DD6": {
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "C2269A9B6BEA4200B7E6E6ECD05111D1": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "16E127072878E35F572B8F19BDB4B686.7C4F29407893C334A6CB7A87BF045C0D": {
   "16E127072878E35F572B8F19BDB4B686.53E2EDEE624B8B5A755C57C3DF9174F7": 1
   },
   "B3C5827F54218753BB2C3338236446C2.E37B6E74A3BD476DFDE7E0577B9E81D6.0615A38067B62382DC1667010669B238.A40B9DB0A4AB344566E5D1A4C04D8175": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "52EF9633D88A7480B3A938FF9EAA2A25.A40B9DB0A4AB344566E5D1A4C04D8175.B3C5827F54218753BB2C3338236446C2.E37B6E74A3BD476DFDE7E0577B9E81D6": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.BBFD87BD78B94790F1D39C88DB250530": 1
   },
   "52EF9633D88A7480B3A938FF9EAA2A25.0E87C1212A698494DCDB198AF3E0EB2F": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.3B759A9CA80234563D87672350659B2B": 1
   },
   "287234A1FF35A314B5B6BC4E5828E745.EC99834B54FB5BC3D50F5FE0EFB9B93B": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "B3C5827F54218753BB2C3338236446C2.38696558DC98494C08D951C052900A2A": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "B3C5827F54218753BB2C3338236446C2.F6E57C9DE709E45FEB0D955351F53548": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "3DD8A3067D2147D8342717B40A9833AE": {
   "52104F74F9A3C743625031A4715B1887": 1
   },
   "AF30619F4CBE3AD9C135AEC6910A4805.72AB8AF56BDDAB33B269C5964B26620A": {
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1,
   "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.3B759A9CA80234563D87672350659B2B": 1,
   "F38F249F06E9190DBCB8C34370A1F046.0C1E770F0B8E17138150A893ABD033B2": 1
   },
   "E93ACB146E114B5DFA6CE2D12DCB96E4.EDA0B76DA6F92E54A7E54750FDB10213": {
   "52104F74F9A3C743625031A4715B1887": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "AF30619F4CBE3AD9C135AEC6910A4805.05B048D7242CB7B8B57CFA3B1D65ECEA": {
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1
   },
   "B3C5827F54218753BB2C3338236446C2.18DAEE01FC6E54AACD7F4C2EEF60FF4D": {
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1,
   "52104F74F9A3C743625031A4715B1887": 1
   },
   "B3C5827F54218753BB2C3338236446C2.340F7C2DCAEDEAE68E4A62C281C7350B": {
   "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284": 1
   },
   "B3C5827F54218753BB2C3338236446C2.640FD0CC0FFA0316AE087652871F4486": {
   "52104F74F9A3C743625031A4715B1887": 1
   },
   "B3C5827F54218753BB2C3338236446C2.783E8E29E6A8C3E22BAA58A19420EB4F": {
   "16E127072878E35F572B8F19BDB4B686.152370721853AF95444F2F05AB29D4CC": 1
   },
   "16E127072878E35F572B8F19BDB4B686.152370721853AF95444F2F05AB29D4CC": {
   "52104F74F9A3C743625031A4715B1887": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "27118326006D3829667A400AD23D5D98": {
   "16E127072878E35F572B8F19BDB4B686.EC9962F64DBBC61B566D4D3478A4902A": 1
   },
   "52EF9633D88A7480B3A938FF9EAA2A25.A096FD08AF89F16E286F268063C06AF6": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "FDE7ED8E71279ADA2A65FA925C408876.36C2F310FBF1721666C750FFC33DC9FA": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.4D00D79B6733C9CC066584A02ED03410": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.5B2D4484498235E80D61A233A7C04991": 1,
   "E93ACB146E114B5DFA6CE2D12DCB96E4.DD1DE98E8B0E34D5CF5396E83036F4D5": 1
   },
   "FDE7ED8E71279ADA2A65FA925C408876.01A3568510E7FFBC2458AA4421E8ECD2": {
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "F38F249F06E9190DBCB8C34370A1F046.0C1E770F0B8E17138150A893ABD033B2": {
   "FDE7ED8E71279ADA2A65FA925C408876.3B759A9CA80234563D87672350659B2B": 1
   },
   "24BD4C7C4859015A1B343B90943FBDB8.E1686078D1B60D351DA5A87543A2A663": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "52EF9633D88A7480B3A938FF9EAA2A25.332DE775A36BBFCB140E1CAA06299A8A": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "F38F249F06E9190DBCB8C34370A1F046.13B5BFE96F3E2FE411C9F66F4A582ADF": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "52EF9633D88A7480B3A938FF9EAA2A25.BB302C9B5204D593BA3657055842A5FB": {
   "FDE7ED8E71279ADA2A65FA925C408876.BE5D5D37542D75F93A87094459F76678": 1
   },
   "FDE7ED8E71279ADA2A65FA925C408876.BE5D5D37542D75F93A87094459F76678": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "B3C5827F54218753BB2C3338236446C2.8BF8854BEBE108183CAEB845C7676AE4": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "B3C5827F54218753BB2C3338236446C2.80016CA1EAD584DB2209B9BDD97C184F": {
   "FDE7ED8E71279ADA2A65FA925C408876.D7D18CFB3A0D8293E2F5D94EA30E04D2": 1,
   "FDE7ED8E71279ADA2A65FA925C408876.36C2F310FBF1721666C750FFC33DC9FA": 1
   },
   "24BD4C7C4859015A1B343B90943FBDB8.39C8942E1038872A822C0DC75EEDBDE3": {
   "16E127072878E35F572B8F19BDB4B686.152370721853AF95444F2F05AB29D4CC": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "E109705703E0324D1A5DE1D84A3A8951.B9DFC657B70A1A442A13065822AE5C3A": {
   "52104F74F9A3C743625031A4715B1887": 1,
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "16E127072878E35F572B8F19BDB4B686.EC9962F64DBBC61B566D4D3478A4902A": {
   "24BD4C7C4859015A1B343B90943FBDB8.0E5243D9965540F62AAC19A985F3F33E": 1
   },
   "24BD4C7C4859015A1B343B90943FBDB8.0E5243D9965540F62AAC19A985F3F33E": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "24BD4C7C4859015A1B343B90943FBDB8.165A1761634DB1E9BD304EA6F3FFCF2B": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1,
   "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69": 1
   },
   "24BD4C7C4859015A1B343B90943FBDB8.B3E232550A910F3BCF9A2DFD8B6889DB": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "B3C5827F54218753BB2C3338236446C2.354F047BA64552895B016BBDD60AB174": {
   "52104F74F9A3C743625031A4715B1887": 1
   },
   "E109705703E0324D1A5DE1D84A3A8951.D9180594744F870AEEFB086982E980BB": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "24BD4C7C4859015A1B343B90943FBDB8.21582C6C30BE1217322CDB9AEBAF4A59": {
   "24BD4C7C4859015A1B343B90943FBDB8.165A1761634DB1E9BD304EA6F3FFCF2B": 1
   },
   "B3C5827F54218753BB2C3338236446C2.23A58BF9274BEDB19375E527A0744FA9": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   },
   "16E127072878E35F572B8F19BDB4B686.53E2EDEE624B8B5A755C57C3DF9174F7": {
   "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD": 1
   },
   "16E127072878E35F572B8F19BDB4B686.CAAE5938C6C83D12D2CAF634A0D2C0FF": {
   "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228": 1
   }
} // NFA {} (initial setup)

function SKN(v,b)
{
   //this.state00 = v // new Array() //
   //this.lookahead = b || 1
   this.scan_token = function( i,j ){
   /*
      if(this.state00.length){
         var peek = parser['7F2DB423A49B305459147332FB01CF87'][i]
         for(var k=0;k<this.lookahead;k++){
            if(this.state00[k][peek[(this.lookahead+j+1)].tok ]){
               ;; // NOP //
            } else {
               var w = []; 
               for(var expected in state00[k]){ 
                  if(expected != 'length') { 
                     w.push(expected || '????' ); 
                  } 
               } 
               throw parser['44CDEB54C6F2AEBAD54611201C26D6F0'](peek[(this.lookahead+j+1)].tok,w.join(' or '))
            }
         } // loop k //
      } // test(state00) //
   */
   }
}

if(EXIT_FAILURE){
         throw parser['44CDEB54C6F2AEBAD54611201C26D6F0'](J-1,EXIT_FAILURE)
      }/*
      else
      {
         console.log('Syntaxer: String successfully parsed!')
      }*/

var Comment = {
   lineComment:0,
   multilineComment:0,
}

function STAppend()
{
   var length = 0
   var v = arguments[0]
   var s = arguments[1]
   var incr = arguments[2] || 1
   v.literal += s
   if(s=='\n')
   {
      v.i++
      v.j = 0
   }
   else
   {
      v.j += incr
   }
   v.pos += incr
   return v
}

function scan_element()
{
   var obj = function(v,ch){
      var v = arguments[0]; 
      var ch = arguments[1]; 
      if(en[ch]){
         v.tok = en[ch]; 
      } else if(FOFhash[ch])
      {
         v.tok = en[FOFhash[ch] ]; 
      } else {
         console.log('scan_element: *** Warning *** - g_TPTtoken token not found for ( '+ch+' ). Ignoring.')
      }
      if(Comment.lineComment || Comment.multilineComment){
         v.comment = ch; 
      } else {
         v.literal = ch; 
      }
      return v
   }
   return obj
}


   var choose = {
      ' ':function(){ var v = arguments[0]; v.tok = en.WhiteSpace; while( token_buffer[v.pos].match(/\s/) ){ v = STAppend(v,token_buffer[v.pos]) } v.literal = ' '; return v },
      '_':function(){ var v = arguments[0]; v.tok = en.Ident; v.literal='_'; v.pos++; v.j++; return v },
      '#':function(){ var v = arguments[0]; if((token_buffer[pos-1] && (token_buffer[pos-1]=='\n')) || (pos==0)){ v.tok = en.Comment; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\n]/) ){ v = STAppend(v,token_buffer[v.pos]) } v.comment += v.literal; v.literal=''; } else { v.tok = en.hashmark; v.literal = '#'; v.pos++; v.j++ } return v },
      '%':function(){ var v = arguments[0]; v.tok = en.Comment; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\n]/) ){ v = STAppend(v,token_buffer[v.pos]) } v.comment += v.literal; v.literal=''; return v },
      '"':function(){ var v = arguments[0]; v.tok = en.String; v.literal = '"'; v.pos++; v.j++; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\"]/) ){ v = STAppend(v,token_buffer[v.pos]) } return v },
      "'":function(){ var v = arguments[0]; v.tok = en.SQString; v.literal = "'"; v.pos++; v.j++; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\']/) ){ v = STAppend(v,token_buffer[v.pos]) } return v },
      '(':function(){ var v = arguments[0]; v.tok = en.OpenBracket; v.literal='('; v.pos++; v.j++; return v },
      ')':function(){ var v = arguments[0]; v.tok = en.CloseBracket; v.literal=')'; v.pos++; v.j++; return v },
      '{':function(){ var v = arguments[0]; v.tok = en.OpenCurly; v.literal='{'; v.pos++; v.j++; return v },
      '}':function(){ var v = arguments[0]; v.tok = en.CloseCurly; v.literal='}'; v.pos++; v.j++; return v },
      '[':function(){ var v = arguments[0]; v.tok = en.OpenSquare; v.literal='['; v.pos++; v.j++; return v },
      ']':function(){ var v = arguments[0]; v.tok = en.CloseSquare; v.literal=']'; v.pos++; v.j++; return v },
      '^':function(){ var v = arguments[0]; v.tok = en.FOFXor; v.literal='^'; v.pos++; v.j++; return v },
      '<':function(){ var v = arguments[0]; v.tok = en.LesserSign; v.literal='<'; v.pos++; v.j++; return v },
      '>':function(){ var v = arguments[0]; v.tok = en.GreaterSign; v.literal='>'; v.pos++; v.j++; return v },
      '=':function(){ var v = arguments[0]; v.tok = en.EqualSign; v.literal='='; v.pos++; v.j++; return v },
      '~':function(){ var v = arguments[0]; v.tok = en.TildeSign; v.literal='~'; v.pos++; v.j++; return v },
      '!':function(){ var v = arguments[0]; v.tok = en.Exclamation; v.literal='!'; v.pos++; v.j++; return v },
      '?':function(){ var v = arguments[0]; v.tok = en.QuestionMark; v.literal='?'; v.pos++; v.j++; return v },
      ',':function(){ var v = arguments[0]; v.tok = en.Comma; v.literal=','; v.pos++; v.j++; return v },
      ';':function(){ var v = arguments[0]; v.tok = en.Semicolon; v.literal=';'; v.pos++; v.j++; return v },
      ':':function(){ var v = arguments[0]; v.tok = en.Colon; v.literal=':'; v.pos++; v.j++; return v },
      '-':function(){ var v = arguments[0]; v.tok = en.Hyphen; v.literal='-'; v.pos++; v.j++; return v },
      '+':function(){ var v = arguments[0]; v.tok = en.Plus; v.literal='+'; v.pos++; v.j++; return v },
      '*':function(){ var v = arguments[0]; v.tok = en.Mult; v.literal='*'; v.pos++; v.j++; return v },
      '.':function(){ var v = arguments[0]; v.tok = en.Fullstop; v.literal='.'; v.pos++; v.j++; return v },
      '|':function(){ var v = arguments[0]; v.tok = en.Pipe; v.literal='|'; v.pos++; v.j++;  return v},
      '/':function(){ var v = arguments[0]; v.tok = en.Slash; v.literal='/'; v.pos++; v.j++; return v},
      '&':function(){ var v = arguments[0]; v.tok = en.Ampersand; v.literal='&'; v.pos++; v.j++; return v },
      '$':function(){ var v = arguments[0]; v.tok = en.Dollar; v.literal='$'; v.pos++; v.j++; return v },
      '\n':function(){ var v = arguments[0]; v.tok = en.Newline; v.literal='\n'; v.pos++; v.i++; v.j=0; return v },
      '<=':function(){ var v = arguments[0]; v.tok = en.FOFRLImpl; v.literal='<='; v.pos += 2; v.j += 2; return v },
      '##':function(){ var v = arguments[0]; v.tok = en.dblhashmark; v.literal='##'; v.pos += 2; v.j += 2; return v },
      '=>':function(){ var v = arguments[0]; v.tok = en.FOFLRImpl; v.literal='=>'; v.pos += 2; v.j += 2; return v },
      '>=':function(){ var v = arguments[0]; v.tok = en.GreaterEq; v.literal='>='; v.pos += 2; v.j += 2; return v }, 
      '>>':function(){ var v = arguments[0]; v.tok = en.MuchGreater; v.literal='>>'; v.pos += 2; v.j += 2; return v },
      '<<':function(){ var v = arguments[0]; v.tok = en.MuchLess; v.literal='<<'; v.pos += 2; v.j += 2; return v },
      '<>':function(){ var v = arguments[0]; v.tok = en.NegEqual; v.literal='<>'; v.pos += 2; v.j += 2; return v },
      '-+':function(){ var v = arguments[0]; v.tok = en.MinusPlus; v.literal='-+'; v.pos += 2; v.j += 2; return v },
      '+-':function(){ var v = arguments[0]; v.tok = en.PlusMinus; v.literal='+-'; v.pos += 2; v.j += 2; return v },
      '~|':function(){ var v = arguments[0]; v.tok = en.FOFNor; v.literal='~|'; v.pos += 2; v.j += 2; return v },
      '&|':function(){ var v = arguments[0]; v.tok = en.FOFNand; v.literal='&|'; v.pos += 2; v.j += 2; return v },
      '!=':function(){ var v = arguments[0]; v.tok = en.NegEqual; v.literal='!='; v.pos += 2; v.j += 2; return v },
      '/*':function(){ var v = arguments[0]; v.tok = en.LMultilineComment; v.literal='/*'; v.pos += 2; v.j += 2; while( (token_buffer[v.pos] && token_buffer[v.pos+1]) && token_buffer[v.pos].match(/[^\*]/) && token_buffer[v.pos+1].match(/[^\/]/) ){ v = STAppend(v,token_buffer[v.pos]) } v.comment += v.literal; v.literal=''; return v },
      '*/':function(){ var v = arguments[0]; v.tok = en.RMultilineComment; v.comment='*/'; v.pos += 2; v.j += 2; return v },
      '//':function(){ var v = arguments[0]; v.tok = en.Comment; v.comment='//'; v.pos += 2; v.j += 2; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\n]/) ){ v = STAppend(v,token_buffer[v.pos]) } v.comment += v.literal; v.literal=''; return v },
      '<~>':function(){ var v = arguments[0]; v.tok = en.FOFXor; v.literal='<~>'; v.pos += 3; v.j += 3; return v },
      '<=>':function(){ var v = arguments[0]; v.tok = en.FOFEquiv; v.literal='<=>'; v.pos += 3; v.j += 3; return v },
      'match_idAlphaNum':function(){ var v = arguments[0]; v.tok = en.SemIdent; v.literal = token_buffer[v.pos] + token_buffer[v.pos+1]; v.pos += 2; v.j += 2; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[\w\d_]/) ){ v = STAppend(v,token_buffer[v.pos]) } return v },
      'match_digit':function(){ var v = arguments[0]; v.tok = en.Idnum; while( token_buffer[v.pos].match(/[\d\.]/) ){ v = STAppend(v,token_buffer[v.pos]) } return v },
      'match_id':function(){ var v = arguments[0]; v.tok = en.Identifier; while( token_buffer[v.pos].match(/[\w_]/i) ){ v = STAppend(v,token_buffer[v.pos]) } return v },
      'OnError':function(s){ throw 'scan_token: *** Error *** - Illegal token or character - '+s }

/*
var padSP = {
    'exp':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
    'int':'',
    'iint':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
    'iiint':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
    'lint':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
    'llint':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
    'lllint':'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
    'plus':'&nbsp;&nbsp;&nbsp;',
    'sum':'',
}
*/

if(d.val){
    var sp = ''
    if(!buildSYMBOL[d.val]){
        if(d.val.length > 1){
            var cnt = d.val.length
            while(cnt--){
                sp += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
            }
        } else {
            sp = '&nbsp;&nbsp;'
        }
    } else 
    if(buildSYMBOL[d.val]){
        if(padSP[d.val]){
            sp = padSP[d.val]
        } else {
            sp = '&nbsp;'
        }
    }
    tdUPPERSTACK.push(sp)
}
if(d.tdLOWER){
    tdLOWERSTACK.push(d.tdLOWER)
    tdLOWER = tdLOWERSTACK.join('') // &nbsp;&nbsp;&nbsp;&nbsp; //
} else 
if(d.val){
    var sp = ''
    if(!buildSYMBOL[d.val]){
        if(d.val.length > 1){
            var cnt = d.val.length
            while(cnt--){
                sp += '&nbsp;&nbsp;&nbsp;&nbsp;'
            }
        } else {
            sp = '&nbsp;&nbsp;'
        }
    } else 
    if(buildSYMBOL[d.val]){
        if(padSP[d.val]){
            sp = padSP[d.val]
        } else {
            sp = '&nbsp;&nbsp;'
        }
    }
    tdLOWERSTACK.push(sp)
}

'exp':function(){ var v = arguments[0]; var j = arguments[1]; /*var k = peekSYMBOL(v,++j); var q = peekSCOPE(v,j,k++); v.pc=k;*/ return ('e '/*+q/*sup_LHS+q+sup_RHS*/) },


/*
function isa (){
   this.name = arguments[1]
   this.type = new arguments[0]()
   this.value = this.type(arguments[2]) ? arguments[2]:null;
}

function hasa (){
   this[arguments[0] ] = new arguments[1]()
}
*/

<table>
<tbody>
<tr>
<td style=font-size:63px>[</td>
<td>a b c<br/>d e f<br/>h i j<br/></td>
<td style=font-size:63px>]</td>
</tr>
</tbody>
</table>

//

'left':function(){ var v = arguments[0]; var j = arguments[1]; 
    var k = peekSYMBOL(v,++j); var l = peekSYMBOL(v,k); /*var m = peekSYMBOL(v,l); var n = peekSYMBOL(v,m);*/ var d = ''; var s = ''; 
    if((v[j].val=='[') && (v[j+1].val=='matrix')){ 
        v.tdTALLY = 0; v.trTALLY = 0; 
        d = peekSCOPE(v,j,k);
        /* increment program counter internally, throw away unneeded values */ 
        //peekSCOPE(v,j,j+1);       // '[' //
        //d = peekSCOPE(v,j+1,k-1);   // matrix { .. } //
        //peekSCOPE(v,l,m);       // right //
        //peekSCOPE(v,m,n);       // ']' //
        var c = v.trTALLY*FORMULA_FONT_SIZE; 
        v.tdTALLY = undefined; v.trTALLY = undefined; 
        s = d.replace(/(^\[|\]$)/gm,'<span style="font-size:'+c+'">$1</span>');  
        //s = '<span style="font-size:'+c+'">[</span>'+d+'<span style="font-size:'+c+'">]</span>';  
    }
    return s 
    },

/*
    if(val.match(/\u[a-fA-F0-9]+|&.+;/g)){
        sp = '&nbsp;&nbsp;&nbsp;'
        if(val.match(/\u222c/g)){ // lint
            sp = '&nbsp;&nbsp;'
        }
    } else
    if(d.val.length > 1 && !val.match(/cssSUP|\u[a-fA-F0-9]+|&.+;/g)) {
        var cnt = d.val.length
        while(cnt--){
            sp += '&nbsp;'
        }
    }
*/

if(d.tdUPPER){
    tdUPPERSTACK.push(d.tdUPPER)
    tdUPPER = tdUPPERSTACK.join('&nbsp;&nbsp;') 
} else if(val){
    var sp = ''/*
    if(val.match(/&minus;|&plus;/)){
        sp = '&nbsp;&nbsp;&nbsp;'
    } else 
    if(d.val.match(/[\(\)=\/\\]/)){
        sp = '&nbsp;&nbsp;'
    } else */
    if(d.val.length > 1 && !val.match(/&minus;|&plus;|cssSUP/g)) {
    //if(!val.match(/sum|\-|\+|\(|\)|=|\/|\\/) && (d.val.length > 2)){
        //var cnt = Math.ceil(Math.max(0,d.val.length) )
        var cnt = d.val.length
        while(cnt--){
            //if(cnt%2==0){
                sp += '&nbsp;'
            //}
        }
        //sp = '&nbsp;&nbsp;&nbsp;&nbsp;'
    } 
    tdUPPERSTACK.push(sp)
}

// comments disabled
function render(){
    var s = arguments[0]
    var e = arguments[1]
    var status = {
        true:function(v){
            srcTranslated.value = v
        },
        false:function(v){
            var s = v.map(function(r,i){
                var tdUPPER = ''
                var tdLOWER = ''
                var tdUPPERSTACK = []
                var tdLOWERSTACK = []
                if((r[0] && r[0].val.match(/#|\/\//))||(r[1] && r[1].val.match(/#|\/\//))){
                    r = r.map(function(v){
                        return v.val
                    }).join(' ')
                } else {
                    r = r.map(function(d,j,me){
                        if(buildSYMBOL[d.val]){
                            d.val = buildSYMBOL[d.val](me,j)
                        } else if(d.val){ 
                            d.val = buildSYMBOL['C21F969B5F03D33D43E04F8F136E7682'](me,j) // MD5('default') //
                        }
                        if(d.tdUPPER){
                            tdUPPERSTACK.push(d.tdUPPER)
                            tdUPPER = tdUPPERSTACK.join('&nbsp;&nbsp;&nbsp;&nbsp;') 
                        } else if(d.val){
                            tdUPPERSTACK.push('')
                        }
                        if(d.tdLOWER){
                            tdLOWERSTACK.push(d.tdLOWER)
                            tdLOWER = tdLOWERSTACK.join('&nbsp;&nbsp;&nbsp;') 
                        } else if(d.val){
                            tdLOWERSTACK.push(d.val.match(/sum/)?'&nbsp;&nbsp;&nbsp;':'')
                        }
                        return d.val
                    }).join(' ')
                } 
                return ('<table class=cssTABLE><tbody class="cssFormulaFont"><tr class="cssUBOUNDS"><td>'+tdUPPER+'</td></tr><tr class="cssFormula"><td>'+r+'</td><td class="cssLINE">('+getNUM(lineCOUNT++)+')</td></tr><tr class="cssLBOUNDS"><td>'+tdLOWER+'</td></tr></tbody></table>')
            }).join('\n')
            formulaTBL.innerHTML = s
        },
    }
    status[(e==true)](s)
}

// abs:{ var v = arguments[0]; var j = arguments[1]; var k = peekSYMBOL(v,++j); var q = []; do{ var w = v[j].val; if(w){q.push(buildSYMBOL[w]?buildSYMBOL[w](v,j):w); v[j] = '' } j++; }while(j<k); return ('|'+q.join(' ')+'|') },
// fact: var k = peekSYMBOL(v,++j); var q = []; do{ var w = v[j].val; if(w){q.push(buildSYMBOL[w]?buildSYMBOL[w](v,j):w); v[j] = '' } j++; }while(j<k); return (q.join(' ')+'!') },
// exp:{ var v = arguments[0]; var j = arguments[1]; var k = peekSYMBOL(v,++j); var q = []; do{ var w = v[j].val; if(w){q.push(buildSYMBOL[w]?buildSYMBOL[w](v,j):w); v[j] = '' } j++; }while(j<k); return ('e'+sup_LHS+q.join(' ')+sup_RHS) },
// nroot: var v = arguments[0]; var j = arguments[1]; var k = peekSYMBOL(v,++j); var l = peekSYMBOL(v,k+1); var s = []; var q = []; do{ var w = v[j].val; if(w){s.push(buildSYMBOL[w]?buildSYMBOL[w](v,j):w); v[j] = '' } j++; }while(j<k); ++k; do{ var w = v[k].val; if(w){q.push(buildSYMBOL[w]?buildSYMBOL[w](v,k):w); v[k] = '' } j++; }while(k<l);return (s.join(' ')+'&Sqrt;'+q.join(' ')) }, // { return '&Sqrt;' }, //
// over: { var v = arguments[0]; var j = arguments[1]; var i = peekSYMBOLrev(v,j-1); if(i<=(j-1)){ i++ } var k = peekSYMBOL(v,j+1); if(j<=(k-1)){ j++ } var q = []; var s = []; do{ var w = v[i].val; if(w){q.push(buildSYMBOL[w]?buildSYMBOL[w](v,i):w); v[i] = ''} i++; }while(i<(j-1)); return '<span>'+q.join(' ')+'\n<hr></hr>\n'+s.join(' ')+'</span>' }, //  do{ var w = v[j].val; if(w){ s.push(buildSYMBOL[w]?buildSYMBOL[w](v,j):w); v[j] = ''} j++; }while(j<k);


// var parenSTACK = 0
// var workerSTACK = []

/*
function g_TPTtoken()
{                           // LSB                                                        ..MSB
   this.NoToken             = "1" 
   this.WhiteSpace          = "01"
   this.SkipToken           = "011" // = this.WhiteSpace |this.Comment
   this.Comment             = "001"
   this.Ident               = "0001"
   this.Identifier          = "00011" // = this.Ident | this.Idnum
   this.Idnum               = "00001"
   this.SemIdent            = "000001"
   this.String              = "0000001"
   this.Name                = "0001101" // = this.Identifier |this.String
   this.SQString            = "00000001"
   this.PosInt              = "000000001"
   this.OpenBracket         = "0000000001"
   this.CloseBracket        = "00000000001"
   this.OpenCurly           = "000000000001"
   this.CloseCurly          = "0000000000001"
   this.OpenSquare          = "00000000000001"
   this.CloseSquare         = "000000000000001"
   this.LesserSign          = "0000000000000001"
   this.GreaterSign         = "00000000000000001"
   this.EqualSign           = "000000000000000001"
   this.NegEqual            = "0000000000000000001"
   this.TildeSign           = "00000000000000000001"
   this.Exclamation         = "000000000000000000001"
   this.AllQuantor          = "000000000000000000001" // aka AllQuantor
   this.QuestionMark        = "00000000000000000000001" 
   this.ExistQuantor        = "00000000000000000000001" // aka QuestionMark
   this.Comma               = "0000000000000000000000001"
   this.Semicolon           = "00000000000000000000000001"
   this.Colon               = "000000000000000000000000001"
   this.Hyphen              = "0000000000000000000000000001"
   this.Plus                = "00000000000000000000000000001"
   this.Mult                = "000000000000000000000000000001"
   this.Fullstop            = "0000000000000000000000000000001"
   this.Dollar              = "00000000000000000000000000000001"
   this.Slash               = "000000000000000000000000000000001"
   this.Pipe                = "0000000000000000000000000000000001"
   this.FOFOr               = "0000000000000000000000000000000001" // aka pipe
   this.Ampersand           = "00000000000000000000000000000000001"
   this.FOFAnd              = "00000000000000000000000000000000001" // aka Ampersand
   this.FOFAssocOp          = "00000000000000000000000000000000011" // = this.FOFAnd|this.FOFOr
   this.FOFLRImpl           = "00000000000000000000000000000000000001"
   this.FOFRLImpl           = "000000000000000000000000000000000000001"
   this.FOFEquiv            = "0000000000000000000000000000000000000001"
   this.FOFXor              = "00000000000000000000000000000000000000001"
   this.FOFNand             = "000000000000000000000000000000000000000001"
   this.FOFNor              = "0000000000000000000000000000000000000000001"
   this.FOFBinOp            = "0000000000000000000000000000000001100111111" // = (this.FOFAnd|this.FOFOr|this.FOFLRImpl|this.FOFRLImpl|this.FOFEquiv|this.FOFXor|this.FOFNand|this.FOFNor)
   this.LMultilineComment   = "0010000000000000000000000000000000000000000000001" // = 1<<39|this.Comment
   this.RMultilineComment   = "00000000000000000000000000000000000000000000000001"
   this.Newline             = "000000000000000000000000000000000000000000000000001"
   this.hashmark            = "0000000000000000000000000000000000000000000000000001"
   this.dblhashmark         = "00000000000000000000000000000000000000000000000000001"
   this.GreaterEq           = "000000000000000000000000000000000000000000000000000001"
   this.MuchGreater         = "0000000000000000000000000000000000000000000000000000001"
   this.MuchLess            = "00000000000000000000000000000000000000000000000000000001"
   this.NegEqual            = "000000000000000000000000000000000000000000000000000000001"
   this.MinusPlus           = "0000000000000000000000000000000000000000000000000000000001"
   this.PlusMinus           = "00000000000000000000000000000000000000000000000000000000001"
   this.UnaryBinaryOPS      = "000000000000000000000000000000000000000000000000000000000001"
   // UNARY / BINARY OPERATORS (22)
"0000000000000000000000000000000000000000000000000000000000011"
"00000000000000000000000000000000000000000000000000000000000101"
"000000000000000000000000000000000000000000000000000000000001001"
"0000000000000000000000000000000000000000000000000000000000010001"
"00000000000000000000000000000000000000000000000000000000000100001"
"000000000000000000000000000000000000000000000000000000000001000001"
"0000000000000000000000000000000000000000000000000000000000010000001"
"00000000000000000000000000000000000000000000000000000000000100000001"
"000000000000000000000000000000000000000000000000000000000001000000001"
"0000000000000000000000000000000000000000000000000000000000010000000001"
"00000000000000000000000000000000000000000000000000000000000100000000001"
"000000000000000000000000000000000000000000000000000000000001000000000001"
"0000000000000000000000000000000000000000000000000000000000010000000000001"
"00000000000000000000000000000000000000000000000000000000000100000000000001"
"000000000000000000000000000000000000000000000000000000000001000000000000001"
"0000000000000000000000000000000000000000000000000000000000010000000000000001"
"00000000000000000000000000000000000000000000000000000000000100000000000000001"
"000000000000000000000000000000000000000000000000000000000001000000000000000001"
"0000000000000000000000000000000000000000000000000000000000010000000000000000001"
"00000000000000000000000000000000000000000000000000000000000100000000000000000001"
"000000000000000000000000000000000000000000000000000000000001000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000010000000000000000000001"
// RELATIONS (38)
this.Relations = 
"0000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000001"
// SET OPERATIONS (21)
this.SetOperations = 
"00000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000001"
// FUNCTIONS (24)
this.Functions = 
"000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
// OPERATORS (39)
this.Operators = 
"0000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
// ATTRIBUTES (29)
this.Attributes = 
"00000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
"00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
// BRACKETS (22)
this.Brackets = 
"000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000001"
// FORMATS (16)
this.Formats = 
"0000000000000000000000000000000000000000000000000000000000000000001"
"0000000000000000000000000000000000000000000000000000000000000000001"
// OTHERS (19)
this.Others = 
"00000000000000000000000000000000000000000000000000000000000000000001"
"00000000000000000000000000000000000000000000000000000000000000000001"
// GREEK ALPHABET (case-sensitive) (23)
this.GreekAlpha = 
"000000000000000000000000000000000000000000000000000000000000000000001"
"000000000000000000000000000000000000000000000000000000000000000000001"
}
var en = new g_TPTtoken()
*/
         var proof = []
         for(var i in this.axioms){
            if(!this.archive[this.axioms[i]]){
               this.archive[this.axioms[i]] = {}
               this.archive[this.axioms[i]][i] = 1
               this.archive[this.axioms[i]].length = i.toString() // eg[key1:key2..keyN]
            } else if(this.archive[this.axioms[i]].length && !this.archive[this.axioms[i]][i]) {
               this.rhs = i
               this.lhs = this.archive[this.axioms[i]].length.split(/:/g)[0]
               this.proof_staus = 'Success! .. '
               var obj = {}
               obj.lhs = this.lhs
               obj.rhs = this.rhs
               proof.push(obj)
               break
            }
         }
         return proof

/*
        function rebuildParameterList(){
            var t = ''
            var v = arguments[0]
            var j = arguments[1]
            if( v[j].match(/\(/g) ){
                do{
                    if(v[j].match(/\)/gm)){
                        parenStack--
                        t +=  v[j]
                        if(v[j].match(/[^\)]/gm)){
                            v[j] = v[j].split(/\)$/)[1]
                        } else {
                            v[j++]=''
                        }
                    }
                    else if(v[j].match(/\(/gm)){
                        parenStack++
                        t +=  v[j]
                        v[j++]=''
                    }
                }while(parenStack && (j<J))
                t += v[j]
                v[j] = t
            } 
            return v
        }
        try{/*
            while(j<J){
                if(s[j].match(/\(/g) && !s[j].match(/\)/g)){
                    s = rebuildParameterList(s,j)
                    J = s.length
                } 
                if(s[j].match(/^\w+.*\(.+\)/)){ 
                    var q = s[j].replace(/\*+/,'').split('\(')
                    var h = q[0].split(' ')
                    while(h.length>2){
                        h.shift()
                    }
                    q[0] = h.join(' ')
                    s[j] = q.join('(')
                    j = matchBrace(j)
                }
                else
                {
                    result.push(s[j])
                    //result[j] = s[j]
                    j++
                }
            }
        */

        //if(v.match(/^\w+\s+\w+.*\(/g) && !v.match(/\)/g)){
           // v = rebuildParameterList(me,i)[i]
        //}         
/*
            result = result.map(function(r){
                if(r.match(/^\w+\s+\w+\(.+\)/)){
                    r = intf[1](r,true)
                }
                return r
            })*/

//result.push(v.join('\n'))
        /*
            J = result.length
            for(var j=0;j<J;j++){
                if(result[j].match(/^\w+\s+\w+\(.+\)/)){
                    result[j] = intf[1](result[j],true)
                }
            }*/

//
            //.replace(/\#define/gm,'var')
            //.replace(/(\w+)\s+(["']?\w+["']?)/g,'$1 = $2')
            //.replace(/\s*(\w+)$/gm,' = $1')

// Works SLOW (poor performance)
function my_func(e){ // part_of_speech lookup
    var result = []
    try{
        var s = e.data.replace(/\n+/gmi,'\n').split('\n')
        var N = s.length
        var POS = 1
        for(var n=0; n<N; n++){
            var v = s[n].replace(/\s+/gmi,' ').replace(/[^\sa-zA-Z0-9]/gmi,'').split(' ') 
            var M = v.length
            var sentence = []
            for(var m=0; m<M; m++){
                var tst = ''
                var word = v[m]
                if(ano_buffer[word]){
                    tst = ano_buffer[word]
                } else if (IS_TOKEN(TOKEN[word])){
                    if(TOKEN[word].match(/(\.pronoun)|(pronoun\.)/gmi)){
                        tst = g_token_II.WHO+wANNOTATOR+TOKEN[word]+wSEPARATOR+word
                    } else {
                        tst = TOKEN[word]+wSEPARATOR+word
                    }
                } else if(!IS_TOKEN(mysql_wn_data_synsets_II[word])){
                    if(IS_TOKEN(word) && word.match(/^[A-Z]/)){
                        tst = g_token_II.WHO+wANNOTATOR+TOKEN['undefined']+wSEPARATOR+word
                    } else if(IS_TOKEN(word) && word.match(/^[0-9]+/gmi)){
                        var token_TMP = 'noun.quantity.number'
                        tst = token_TMP+wSEPARATOR+word
                    }
                } else {
                    try{
                        var W = mysql_wn_data_synsets_II[word].length
                        var str = []
                        var NV = false
                        for(var w=0; w<W; w++){
                            var phr = part_of_speech[mysql_wn_data_synsets_II[word][w]]
                            if(NV==false && ((phr == 'noun') || (phr == 'verb'))){
                                NV = true
                            }
                            str = ANNOTATE( str,phr+'.'+word )
                        }
                    } catch(e){
                        console.log(e)
                    }
                    if(NV){
                        var tmp = {}
                        archive.map(function(v){
                            try{
                                if(typeof(v[word] === 'object')){
                                    var p = v[word][0]
                                    var X = v[word][0].length
                                    for(var x=0; x<X; x++){
                                        tmp[p[x]] = 1
                                    } // loop x
                                } // test (word)
                            } catch(e){
                                //console.log(e)
                            } // try / catch
                        })
                        for(var _s_ in tmp){
                            str = ANNOTATE( str,_s_ )
                        }
                    } // test(NV)
                    tst = str.join(wANNOTATOR)+wSEPARATOR+word
                } // test (word)
                if(tst == ''){
                    tst = '????'+wSEPARATOR+word
                }
                ano_buffer[word] = tst
                sentence = ANNOTATE( sentence,tst )
            } // loop m
            if(sentence.length){
                result.push(sentence)
            } // test length
        } // loop n
    } catch(e) {
        sentence.push('Pattern Library *** grammar mismatch *** - I have not been trained to answer this kind of question - '+e)
        console.log(e)
    } // try / catch
    console.log(result,ano_buffer)
    postMessage ( { origin:'mysql_wn_data_0',value:result } )
} // my_func ()

//

var g_token_II = {
    WHO:'who',
    WHAT:'what',
    WHEN:'when',
    WHERE:'where',
    WHY:'why',
    WHICH:'which',
    HOW:'how',
   'HOW MANY':'how many',
}

function AND(){ // AND operation (performed on bitfield array)
    var N = arguments.length
    var BIT = arguments[0].length
    for(var n=1; n<N; n++){
        for(var bit=0; bit<BIT; bit++){
            arguments[0][bit] &= arguments[n][bit]
        }
    }
    return arguments[0]
}

function OR(){ // OR operation (performed on bitfield array)
    var N = arguments.length
    var BIT = arguments[0].length
    for(var n=1; n<N; n++){
        for(var bit=0; bit<BIT; bit++){
            arguments[0][bit] |= arguments[n][bit]
        }
    }
    return arguments[0]
}

function NOT(){ // NOT operation (performed on bitfield array)
    var N = arguments.length
    var BIT = arguments[0].length
    for(var n=0; n<N; n++){
        for(var bit=0; bit<BIT; bit++){
            arguments[n][bit] = (arguments[n][bit]==1) ? 0: 1
        }
    }
    return arguments
}

var ISA = {}
ISA[g_token.NOUN] = {}
ISA[g_token.NOUN][g_token.OBJECT] = 1 // DIRECT or INDIRECT ?
ISA[g_token.NOUN][g_token.COMPOUND_OBJECT] = 1 // DIRECT or INDIRECT ?
ISA[g_token.NOUN][g_token.DIRECT_OBJECT] = 1 // SIMPLE or COMPUND ?
ISA[g_token.NOUN][g_token.INDIRECT_OBJECT] = 1 // SIMPLE or COMPUND ?
ISA[g_token.NOUN][g_token.COMPOUND_DIRECT_OBJECT] = 1
ISA[g_token.NOUN][g_token.COMPOUND_INDIRECT_OBJECT] = 1

/*
NOTE:
    clauses: everything before the first occuring noun can be parsed as the subject
ISA[g_token.NOUN][g_token.SUBJECT] = 1
ISA[g_token.NOUN][g_token.SUBJECT_COMPLEMENT] = 1
*/

ISA[g_token.VERB] = {}
ISA[g_token.VERB][g_token.LINKING_VERB] = 1


var CLAUSE = {}
CLAUSE[g_token.SUBJECT] = {}
CLAUSE[g_token.SUBJECT][g_token.VERB] = {} 

/* 
PATTERN 1
    the [children] did not [listen]
    the [lights] on the patrol car [flashed] ominously  */
CLAUSE[g_token.SUBJECT][g_token.VERB][null] = 1 

/* 
PATTERN 2
    [mice] [frighten] [elephants]
    [elephants] [frighten] [mice]
    kenya's [athletes] often [win] the [marathon] */
CLAUSE[g_token.SUBJECT][g_token.VERB][g_token.OBJECT] = 1 

/*
PATTERN 3
    [jan] [showed] [carl] the [book]
    the [company] will probably [send] [me] a small [refund] */
CLAUSE[g_token.SUBJECT][g_token.VERB][g_token.INDIRECT_OBJECT] = {}
CLAUSE[g_token.SUBJECT][g_token.VERB][g_token.INDIRECT_OBJECT][g_token.DIRECT_OBJECT] = 1

/*
PATTERN 4
    My son's [name] [is] [aaron]
    the [fence] [was] [white] */
CLAUSE[g_token.SUBJECT][g_token.LINKING_VERB] = {}
CLAUSE[g_token.SUBJECT][g_token.LINKING_VERB][g_token.SUBJECT_COMPLEMENT] = 1

/*
PATTERN 5
    [I] [named] my [son] aaron
    [I] [painted] the [fence] white */
CLAUSE[g_token.SUBJECT][g_token.VERB][g_token.DIRECT_OBJECT] = 1

var part_of_speech = {
    'n':'noun',
    'v':'verb',
    'r':'adv',
    'a':'adj',
    's':'verb.sense'
}

var TOKEN = {
    // noun (common) (woman, street, dogs)
    // noun (collective) (team, committee, class)
    // noun (concrete) (truck, cup, foot, fish)
    // noun (abstract) (love, justice, fear)
    // noun (count) (cents, bytes, assignment, revisions)
    // noun (noncount) (concern, consideration, revenue)
    
    // noun (proper) (Ms, Wentworth, Dallas, White House)
    'undefined':'noun.proper',
    
    // pronoun (can be resubstituted when stated as a question eg who:my/their)
    'I':'noun.pronoun',
    'me':'noun.pronoun',
    'mine':'noun.pronoun',
    'myself':'noun.pronoun',
    'you':'noun.pronoun',
    'your':'noun.pronoun',
    'yours':'noun.pronoun',
    'yourself':'noun.pronoun',
    'he':'noun.pronoun',
    'him':'noun.pronoun',
    'his':'noun.pronoun',
    'she':'noun.pronoun',
    'her':'noun.pronoun',
    'hers':'noun.pronoun',
    'it':'noun.pronoun',
    'its':'noun.pronoun',
    'we':'noun.pronoun',
    'us':'noun.pronoun',
    'our':'noun.pronoun',
    'they':'noun.pronoun',
    'them':'noun.pronoun',
    'their':'noun.pronoun',
    'this':'noun.pronoun',
    'these':'noun.pronoun',
    'who':'noun.pronoun',
    'whom':'noun.pronoun',
    'whose':'noun.pronoun',
    'which':'noun.pronoun',
    'that':'noun.pronoun',
    'one':'noun.pronoun',
    'ones':'noun.pronoun',
    'everybody':'noun.pronoun',
    'nobody':'noun.pronoun',
    'anyone':'noun.pronoun',
    'everyone':'noun.pronoun',
    
    // auxillary (helping) verb assignments
    'is':'verb.aux.is',
    'are':'verb.aux.is',
    'am':'verb.aux.is',
    'do':'verb.aux.is',
    'equals':'adj.is',
    'was':'verb.aux.was',
    'were':'verb.aux.was',
    
    // modal auxillary verbs
    'will be':'verb.modal.aux.will',
    'will':'verb.modal.aux.will',
    'shall':'verb.modal.aux.will',
    
    // coordinating conjunction
    'not':'conj.coord.not',
    '!':'conj.coord.not.!',
    'both':'conj.coord.and',
    'and':'conj.coord.and',
    'but':'conj.coord',
    'however':'',
    'yet':'',
    '&':'conj.coord.and',
    ',':'conj.coord.and',
    '|':'conj.coord.or',
    'or':'conj.coord.or',
    'nor':'conj.coord.nor.^|',
    'for':'conj.coord',
    'so':'conj.coord',
    'yet':'conj.coord',
    
    // subordinating conjunction
    'after':'conj.subord',
    'although':'conj.subord',
    'as far as':'conj.subord',
    'as soon as':'conj.subord',
    'as if':'conj.subord',
    'because':'conj.subord.because.because',
    'before':'conj.subord',
    'even if':'conj.subord',
    'even though':'conj.subord',
    'how':'conj.subord',
    'if':'conj.subord',
    'inasmuch as':'conj.subord',
    'in case that':'conj.subord',
    'insofar as':'conj.subord',
    'in that':'conj.subord',
    'lest':'conj.subord',
    'else':'conj.subord',
    'no matter how':'conj.subord',
    'now that':'conj.subord',
    'once':'conj.subord',
    'provided':'conj.subord',
    'provided that':'conj.subord',
    'since':'conj.subord',
    'so that':'conj.subord',
    'supposing that':'conj.subord',
    'than':'conj.subord',
    'though':'conj.subord',
    'till':'conj.subord',
    'unless':'conj.subord',
    'until':'conj.subord',
    'when':'conj.subord',
    'whenever':'conj.subord',
    'where':'conj.subord',
    'wherever':'conj.subord',
    'whether':'conj.subord',
    'while':'conj.subord',
    'why':'conj.subord',
    
    // preposition
    'about':'prep',
    'above':'prep',
    'across':'prep',
    'after':'prep',
    'against':'prep',
    'along':'prep',
    'among':'prep',
    'amongst':'prep',
    'around':'prep',
    'at':'prep',
    'before':'prep',
    'behind':'prep',
    'below':'prep',
    'beneath':'prep',
    'beside':'prep',
    'between':'prep',
    'beyond':'prep',
    'but':'prep',
    'by':'prep',
    'concerning':'prep',
    'despite':'prep',
    'down':'prep',
    'during':'prep',
    'except':'prep',
    'excepting':'prep',
    'for':'prep',
    'from':'prep',
    'in':'prep',
    'inside':'prep',
    'into':'prep',
    'like':'prep',
    'near':'prep',
    'of':'prep',
    'off':'prep',
    'on':'prep',
    'onto':'prep',
    'out':'prep',
    'outside':'prep',
    'over':'prep',
    'past':'prep',
    'regarding':'prep',
    'round':'prep',
    'since':'prep',
    'through':'prep',
    'throughout':'prep',
    'till':'prep',
    'to':'prep',
    'toward':'prep',
    'under':'prep',
    'underneath':'prep',
    'until':'prep',
    'up':'prep',
    'upon':'prep',
    'with':'prep',
    'within':'prep',
    'without':'prep',
    
    // phrasal (preposition)
    'according to':'prep.phrasal',
    'along with':'prep.phrasal',
    'apart from':'prep.phrasal',
    'as for':'prep.phrasal',
    'as regards':'prep.phrasal',
    'as to':'prep.phrasal',
    'because of':'prep.phrasal',
    'by means of':'prep.phrasal',
    'by reason of':'prep.phrasal',
    'by way of':'prep.phrasal',
    'due to':'prep.phrasal',
    'except for':'prep.phrasal',
    'in addition to':'prep.phrasal',
    'in case of':'prep.phrasal',
    'in front of':'prep.phrasal',
    'in lieu of':'prep.phrasal',
    'in place of':'prep.phrasal',
    'in regard to':'prep.phrasal',
    'in spite of':'prep.phrasal',
    'instead of':'prep.phrasal',
    'on account of':'prep.phrasal',
    'out of':'prep.phrasal',
    'up to':'prep.phrasal',
    'with reference to':'prep.phrasal',
    'with regard to':'prep.phrasal',
    'with respect to':'prep.phrasal',
    'with exception of':'prep.phrasal',
    
    // phrasal (transitional)
    'after all':'phr.trans',
    'as a result':'phr.trans',
    'at any rate':'phr.trans',
    'at the same time':'phr.trans',
    'by the way':'phr.trans',
    'even so':'phr.trans',
    'for example':'phr.trans',
    'in addition':'phr.trans',
    'in fact':'phr.trans',
    'in other words':'phr.trans',
    'in the first place':'phr.trans',
    'on the contrary':'phr.trans',
    'on the other hand':'phr.trans',
    
    // conjunctive adverb
    'also':'adv.conj',
    'anyhow':'adv.conj',
    'anyway':'adv.conj',
    'beside':'adv.conj',
    'consequently':'adv.conj',
    'finally':'adv.conj',
    'furthermore':'adv.conj',
    'hence':'adv.conj',
    'however':'adv.conj',
    'incidentally':'adv.conj',
    'indeed':'adv.conj',
    'instead':'adv.conj',
    'likewise':'adv.conj',
    'meanwhile':'adv.conj',
    'moreover':'adv.conj',
    'nevertheless':'adv.conj',
    'next':'adv.conj',
    'nonetheless':'adv.conj',
    'otherwise':'adv.conj',
    'similarly':'adv.conj',
    'otherwise':'adv.conj',
    'similarly':'adv.conj',
    'still':'adv.conj',
    'then':'adv.conj',
    'therefore':'adv.conj',
    'thus':'adv.conj',
    
    // expletive (establishes sentence tense: there/were; here/are
    'there':'expl',
    'here':'expl',
    
    // infinitive (precedes a subject/object)
    'the':'inf',
    'a':'inf.a.noun.a',
    'an':'inf',
}

var wSEPARATOR = '|'
var cSEPARATOR = '::'
var sSEPARATOR = ':::'
var wANNOTATOR = '.'

function Attribute(){
    this.value = 0
    this.feature = {}
}
Attribute.prototype = new Object()

function canAnswer () {
    this[g_token_II.WHO] = new Attribute()
    this[g_token_II.WHAT] = new Attribute()
    this[g_token_II.WHEN] = new Attribute()
    this[g_token_II.WHERE] = new Attribute()
    this[g_token_II.WHY] = new Attribute()
    this[g_token_II.WHICH] = new Attribute()
    this[g_token_II.HOW] = new Attribute()
    this[g_token_II['HOW MANY']] = new Attribute()
}
canAnswer.prototype = new Object()

function IS_TOKEN(){
    return (arguments[0] && 1)
}

function ANNOTATE(){
    arguments[0].push(arguments[1])
    return arguments[0]
}

function my_func(e){ // part_of_speech lookup
    var result = []
    try{
        var s = e.data.replace(/\n+/gmi,'\n').split('\n')
        var N = s.length
        var POS = 1
        for(var n=0; n<N; n++){
            var v = s[n].replace(/\s+/gmi,' ').replace(/[^\sa-zA-Z0-9]/gmi,'').split(' ') 
            var M = v.length
            var sentence = []
            for(var m=0; m<M; m++){
                var word = v[m]
                if (IS_TOKEN(TOKEN[word])){
                    if(TOKEN[word].match(/(\.pronoun)|(pronoun\.)/gmi)){
                        sentence = ANNOTATE( sentence,g_token_II.WHO+wANNOTATOR+TOKEN[word]+wSEPARATOR+word )
                    } else {
                        sentence = ANNOTATE( sentence,TOKEN[word]+wSEPARATOR+word )
                    }
                } else if(!IS_TOKEN(mysql_wn_data_synsets_II[word])){
                    if(IS_TOKEN(word) && word.match(/^[A-Z]/)){
                        sentence = ANNOTATE( sentence,g_token_II.WHO+wANNOTATOR+TOKEN['undefined']+wSEPARATOR+word )
                    } else if(IS_TOKEN(word) && word.match(/^[0-9]/gmi)){
                        var token_TMP = 'noun.number'
                        sentence = ANNOTATE( sentence,token_TMP+wSEPARATOR+word )
                    }
                } else {
                    var W = mysql_wn_data_synsets_II[word].length
                    var str = []
                    for(var w=0; w<W; w++){
                        str = ANNOTATE( str,part_of_speech[mysql_wn_data_synsets_II[word][w][POS]]+'.'+word )
                    }
                    sentence = ANNOTATE( sentence,str.join(wANNOTATOR)+wSEPARATOR+word )
                } // test (word)
            } // loop i
            if(sentence.length){
                result.push(sentence)
            }
        }
    } catch(e) {
        sentence.push('Pattern grammar Library *** mismatch *** - I have not been trained to answer this question - '+e)
        console.log(e)
    } // try / catch
    if(result.length == N){
        result.pop()
    }
    console.log(result)
    postMessage ( { origin:'0',value:result } )
}

//

    if(IS_TOKEN(word) && word.match(/^[A-Z]/)){
        sentence = ANNOTATE( 'who'+wANNOTATOR+sentence,TOKEN['undefined']+wSEPARATOR+word )
        CA.who.value = 1
        CA.who.feature[word] = 1
        CA.what.value = 1
        CA.what.feature[word] = 1
    }

//
    //var obj = {}
    //obj[ TOKEN[word] ] = word
    //sentence.push( obj )

    //var obj = {}
    //obj[ TOKEN['undefined']+''+word ] = word
    //sentence.push( obj )
    
    //var obj = {}
    //obj[ str.join(':') ] = word
    //sentence.push( obj)
//

function parse(result,v,row){
    var letter = v.split('')
    var COL = letter.length
    for(var col=0; col<COL; col++){
        if(!result[letter[col]]){
            result[letter[col]] = '::'
        }
        var LHS_row = 0
        var RHS_col = 1
        var lhs_match = false
        var rhs_match = false
        var q = result[letter[col]].split('::')
        if(!q[LHS_row].match(/\d+/gmi)){
            q[LHS_row] = (row).toString()
            lhs_match = true
        }
        if(!q[RHS_col].match(/\d+/gmi)){
            q[RHS_col] = (col).toString()
            rhs_match = true
        }
        if(!lhs_match){
            var w1 = q[LHS_row].match(/\d+/gmi)
            var N1 = w1.length
            for(var n1=0; n1<N1; n1++){
                if( (w1[n1]*1)==row ){
                    lhs_match = true
                    break
                }
            }
            if(!lhs_match){
                w1.push(row)
            }
            q[LHS_row] = w1.join(':')
        }
        if(!rhs_match){
            var w2 = q[RHS_col].match(/\d+/gmi)
            var N2 = w2.length
            for(var n2=0; n2<N2; n2++){
                if( (w2[n2]*1)==col ){
                    rhs_match = true
                    break
                }
            }
            if(!rhs_match){
                w2.push(col)
            }
            q[RHS_col] = w2.join(':')
        }
        result[letter[col]] = q.join('::')
    }
    return result
}

var archive = {}

function my_func(e){
    var result = []
    var ROW = 0
    for(var word in mysql_wn_data_synsets_II){
        var DEFS = mysql_wn_data_synsets_II[word].length
        for(var defs=0; defs<DEFS; defs++){
            var s = mysql_wn_data_synsets_II[word][defs][3].split('')
            var COLUMN = s.length
            for(var column=0; column<COLUMN; column++){
                if(!result[column]){
                    result.push({})
                }
                if(!result[column][ s[column] ]){
                    result[column][ s[column] ] = []
                }
                if(!archive[column]){
                    archive[column] = {}
                }
                if(!archive[column][ s[column] ]){
                    archive[column][ s[column] ] = {}
                }
                if(!archive[column][ s[column] ][ROW]){
                    archive[column][ s[column] ][ROW] = 1
                    result[column][ s[column] ].push(ROW) // parse(result[column][ s[column] ],word,ROW)
                }
            }
            ROW++
        }
    }
    postMessage ( { origin:'0',value:JSON.stringify(result).replace(/},/gmi,'},\n').toString() } )
}

/*
function parse(result,v){
    var word = v.split('')
    var N = word.length
    for(var n=0; n<N; n++){
        result[word[n]] = 1
    }
    return result
}

function my_func(e){ // part_of_speech lookup
    var result = []//{}
    var COLUMN = 0
    for(var word in mysql_wn_data_synsets_II){/*
        var s = word.split('')
        var COLUMN = s.length
        for(var column=0; column<COLUMN; column++){
            if(!result[column]){
                result.push({})
            }
            result[column][ s[column] ] = 1
        }
        var DEFS = mysql_wn_data_synsets_II[word].length
        for(var defs=0; defs<DEFS; defs++){
            var s = mysql_wn_data_synsets_II[word][defs][3].split('')
            var COLUMN = s.length
            for(var column=0; column<COLUMN; column++){
                if(!result[column]){
                    result.push({})
                }
                if(!result[column][ s[column] ]){
                    result[column][ s[column] ] = {}                    
                }
                result[column][ s[column] ] = parse(result[column][ s[column] ],word)
            }/*
            if(!result[COLUMN]){
                result.push({})
            }
            if(!result[COLUMN][null]){
                result[COLUMN][null] = {}
            }
            result[COLUMN][null] = parse(result[column][null],word)
        }
    }
    postMessage ( { origin:'0',value:JSON.stringify(result).replace(/}},/gmi,'}},\n').toString() } )
}
*/

/*
function my_func(e){ // part_of_speech lookup
    var result = []//{}
    var COLUMN = 0
    for(var word in mysql_wn_data_synsets_II){
        var s = word.split('')
        var COLUMN = s.length
        for(var column=0; column<COLUMN; column++){
            if(!result[column]){
                result.push({})
            }
            result[column][ s[column] ] = 1
        }
        if(!result[COLUMN]){
            result.push( {} )
        }
        result[COLUMN][null] = 1
    }
    //result.LENGTH = 71
    postMessage ( { origin:'0',value:JSON.stringify(result).replace(/},/gmi,'},\n').toString() } )
}
*/
/*
function my_func(e){ // part_of_speech lookup
    var result = {}
    var ROW = 0
    var DEFINITION = 3
    for(var word in mysql_wn_data_synsets_II){
        var DEFS = mysql_wn_data_synsets_II[word].length
        for(var defs=0; defs<DEFS; defs++){
            mysql_wn_data_synsets_II[word][defs].unshift(word)
        }
        result[ROW++] = mysql_wn_data_synsets_II[word]
    }
    result.LENGTH = ROW
    postMessage ( { origin:'0',value:JSON.stringify(result).replace(/\]\],/gmi,']],\n') } )
}

function my_func(e){ // part_of_speech lookup
    var result = []
    var DEFINITION = 3
    for(var word in mysql_wn_data_synsets_II){
        var DEFS = mysql_wn_data_synsets_II[word].length
        for(var defs=0; defs<DEFS; defs++){
            var s = mysql_wn_data_synsets_II[word][defs][DEFINITION].split('')
            var COLUMN = s.length
            for(var column=0; column<COLUMN; column++){
                if(!result[ column ]){
                    result[ column ] = []
                }
                result[ column ].push( s[column] )
            }
            if(!result[COLUMN]){
                result[COLUMN] = []
            }
            result[ COLUMN ].push( null ) // use null marker for EOL
        }
    }    
    postMessage ( { origin:'0',value:JSON.stringify(result).replace(/}},/gmi,'}},\n').toString() } )
}
*/
/*