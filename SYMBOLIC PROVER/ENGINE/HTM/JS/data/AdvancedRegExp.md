
// Advanced RegExp objects are valid syntax within axioms //

{ expr }* <=> { exp }{0,}   // match 0+ expr //
{ expr }+ <=> { exp }{1,}   // match 1+ expr //
{ expr }? <=> { exp }{0,1}  // match atmost 1 expr //
{ expr }{a,b}               // match from a upwards to b (inclusive) of expr //
{ expr }{\n}                // record number of matches and SAVE as backreference; n>0 //
{ expr }{,,\n}              // record expr.location and SAVE as backreference; n>0
{ expr }{,,func [\m]}       // class-validator-macro callback which receives expr properties, as well as all globals (eg. domain variables, and backreferences) //
                            // callbacks can perform class-validation/subclass-validation/reformat/global update, or return a backreference //
                            // if func returns a value, b, then return {b} with optional SAVE as backreference, \m

...where expr => RegExp | class-macro | class-validator-macro