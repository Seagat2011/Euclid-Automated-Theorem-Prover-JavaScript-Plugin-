
SYMP: (ex. 2=2, Axiom fails to halt)
SOLU: version 8.0.0.0 Remove RHS (self-reference) solutions from Symbol table: Symobl:{ "2":["0:1","0:0"] } => Symobl:{ "2":["0:1"], }

SYMP: new _AXIOM_() objects remain memory resident after use (ie memory leak)
SOLU: Add an _AXIOM_._update method to reuse objects

SYMP: Prover returns false positive matches for partial solutions found
SOLU: init self._basenetFOUND = false, test: self._basenetFOUND != val => 
      init self._basenetFOUND = MD5('false'), test: (self._basenetFOUND != MD5('false')) && (self._basenetFOUND != val)
      
SYMP: lineNumber HTML objects inserts incorrect number of lines (eg. axmEditor( Total lines ) + 1 )
PATCH: Possibly from garbage malware, requires two (2) splits: HTMLObject.innerText.split(/\n$/)[0].split(/\n/)


// COMPLETED
// remove: 2 + 2 = 4, add: 1 + 1 + 1 + 1 = 4, still reduces LHS to 4; ie (depth-first vs breadth-first) //
// Given: 1 + 1 = 2; 2 + 2 = 4; Prove: 1 + 1 + 1 + 1 = 4 


TODO
// Given: 1 + 1 = 2 <=> 2 = 1 + 1, still reduces LHS to 4; (ie noise tolerance)