
function genProof(){
  console.clear()
  var solution = [theorem.LHS[0]]
  var Axioms = [
    { symbols:{ "1":1, "+":1 }, state_machine:[new g_token("1"),new g_token("+"),new g_token("1")], index:0, basenet:"2" },
    { symbols:{ "2":1, "+":1 }, state_machine:[new g_token("2"),new g_token("+"),new g_token("2")], index:0, basenet:"4" },
    ]
  var axioms = [new g_token("1"),new g_token("+"),new g_token("1")]
  var axioms2 = [new g_token("2"),new g_token("+"),new g_token("2")]
  var axiomsIDX = 0
  var axioms2IDX = 0
  var symbols = { "1":1, "+":1 }
  var symbols2 = { "2":1, "+":1 }
  var thm = theorem.LHS[0]
  var i = -1
  var I = thm.length
  var doReset
  while(i++<I){
    var doReset = false
    var tok = thm[i]
  
    if(tok in symbols){
      if(axioms[axiomsIDX].id==tok){
        axioms[axiomsIDX].idx = i
        axiomsIDX++
        if(axiomsIDX==axioms.length){
          axiomsIDX = 0
          var tmp = [...thm]
          axioms.map(function(u,j,me){
            tmp[u.idx] = null
            u.idx = null
            return u
          })
          tmp[i] = "2"
          thm = []
          tmp.map(function(u,j,me){
            if(u != null){
              thm.push(u)
            }
            return u
          })
          solution.push(thm)
          doReset = true
        }
      }
    }
    
    if(tok in symbols2){
      if(axioms2[axioms2IDX].id==tok){
        axioms2[axioms2IDX].idx = i
        axioms2IDX++
        if(axioms2IDX==axioms2.length){
          axioms2IDX = 0
          var tmp = [...thm]
          axioms2.map(function(u,j,me){
            tmp[u.idx] = null
            u.idx = null
            return u
          })
          tmp[i] = "4"
          thm = []
          tmp.map(function(u,j,me){
            if(u != null){
              thm.push(u)
            }
            return u
          })
          solution.push(thm)          
          doReset = true
        }
      }
    }

    if(doReset){
      i = -1
    }
    
  }
  console.log("solution:",solution)
}
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

var theorem = {
  LHS:[["1","+","1","+","1","+","1"]],
  RHS:[["4"]],
}