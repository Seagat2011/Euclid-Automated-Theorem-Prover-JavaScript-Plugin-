  1
  55
 +55
 ===
 110
 
 var i,j..
 
 // add lhs(5) + rhs(5) => tmp // tmp = "one.zero"
 
 var K = Math.max(i,j)
 var re = /\./
 var carry_overflow = (tmp && tmp.match(re) && true) // true
 if (carry_overflow) { // carry between lhs/rhs //
    tmp = tmp.split(re) // tmp = ["one","zero"]   
    result[j] = tmp.last() // tmp[:last] = ["zero"]
    tmp = tmp[0]   
    if((j-1) in result){
      tmp = operation[op].op[result[j-1]][tmp]
      var carry_overflow2 = (tmp.match(re) && true) // false
      if (carry_overflow2) { // carry between tmp and result //
        tmp = tmp.split(re) // tmp[j] = ["one","zero"]   
        result[j-1] = tmp.last() // tmp.last() = ["zero"]
        tmp = tmp[0]
      }
    }
    else{
      result.unshift(tmp)
    }
 }
 else{
  result[j] = tmp
 }
   
i--
j--
 

// here, any code not intended for the js interpreter //

{ expr }{,,a}             // match expr iff expr.location == a //
{ expr }{,,op a [,][\n]}  // match expr iff expr.location is { op } to a, where op is: >, <, >=, <=, ==, != ; with optional backreference SAVE; n>0 
                          // a match is not necessarily acted upon; to act upon, include the "," operator //
{ expr }{\n}              // record number of matches and SAVE as backreference; n>0 //
{ expr }{,,\n}            // record expr.location and SAVE as backreference; n>0
{ expr }{,,[a|op] rel \n} // recursive matching, where op is: >, <, >=, <=, ==, != ; where a>=0, relative to \n; where \n is a pre-defined backference //

Example Proof via Expand

Axiom
(1) 1 + 1 = 2
(2) 2 + 2 = 4
(3) 4 + 2 = 6
(4) 1 + 1 + 1 + 1 + 1 + 1 = 6

Prove
1 + 2 + 2 + 1 = 6

Proof
1 + 2 + 2 + 1 = 6
1 + (2) + (2) + 1 = (6)
1 + (1 + 1) + (1 + 1) + 1 = (1 + 1 + 1 + 1 + 1 + 1)
1 + 1 + 1 + 1 + 1 + 1 = 1 + 1 + 1 + 1 + 1 + 1
Q.E.D. (via Expand)


ALGORITHM

var solutionComplete = ""
var val = u.val
var tmp = [...val.split(/\s+/)]
var vkeys = []
var Proof = []
var tmpHTML = { 
  pre:[...val.split(/\s+/)], 
  post:[...val.split(/\s+/)] } 
var alhs = self._axiom.split(/\s+/)
var arhs = self._basenet // self._basenet.split(/\s+/)
var jdx = 0
tmp.map(function(tok,idx){
  if(tok == arhs){
    self._basenetFOUND = true
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

if(self._basenetFOUND){
  solutionEditor.appendlog(tmpHTML.pre.join(" "))
  solutionEditor.appendlog(tmpHTML.post.join(" ")+solutionComplete)
}



// finds rhs/lhs Expansion locations
for Axiom[j=0:length:1]
for Prove[i=0:length:1]
  a=Axiom[j]
  iff a.rhs == Prove[i]: vkeys.push(i)

// when vkeys.length @ j: do before/after Expansion for (j) 
  
  // perform Expansion
  
//
  Proof.push(...a.lhs), Proof.push(Prove[i])

BEGIN_MACRO : Math.Globals // Provides correct arity,number-field formatting, ...etc. //

      (Laws & Identities: (a)ssociative,(c)ommutative,(d)istributive,(z)ero,(i)dentity)
      
      USING Math.Global   // Applies to LHS //

            Unary = [Plus,Minus,+,-]
            Digit = [0-9]
            Number = [Digits]+
            Decimal = [.]
            Operator = [
                  Plus[+],Minus[-],LessThan[<],GreaterThan[>],LessThanEqualTo[<=],GreaterThanEqualTo[>=],Equals[=],Power[^],RaisedTo[^],Shift.LeftSigned[<<<],Not[[!][~]],
                  Shift.RightSigned[>>>],Shift.Left[<<],Shift.Right[>>],MultipliedBy,DividedBy,Percent[%],Modulus[%],DecimalPoint[.],Unary[[+][-]],Complex[[j][i]]
            ]

      USING Math.Symbol.Number

      WITH Integer  // Math.Symbol.Number.Integer //

            Unsigned = [Number]
            UnsignedOperator = [Operator]
            Signed = [Unary]?[Number]
            SignedOperator = [Operator]

      WITHOUT Integer   // Math.Symbol.Number //

            Complex.Complex = [i,j]
            Complex.ComplexOperator = [Operator]
            Natural = [1-9][Number]

      USING Math.Symbol.Number

            Improper.Unsigned = [Unsigned][Improper.ImproperOperator.DividedBy][Unsigned]
            Improper.Signed = [Signed][Improper.ImproperOperator.DividedBy][Unsigned]
            Rational.Decimal = []
            Rational.Unsigned = [Unsigned][Rational.RationalOperator.Decimal][Unsigned]
            Rational.Signed = [Signed][Rational.Decimal][Signed]
            Complex.Unsigned = [Rational.Unsigned] [Complex.ComplexOperator] [Complex.ComplexOperator][Rational.Unsigned]
            Complex.Signed = [Rational.Signed] [Complex.ComplexOperator] [Complex.Complex][Rational.Unsigned]
            Real = [Signed]

      WITH Complex    // Math.Symbol.Number.Complex //

      USING WITH Integer  // (Math.Symbol.Number).Integer //

            { Signed } ( IntegerOperator { Signed } )* IntegerOperator.Equals { Signed }

      USING Math.Symbol

            { Number } NumberOperator.Equals { Number } ( NumberOperator { Number } )+

END_MACRO


{ expr }{,,a}             // match expr iff expr.location == a //
{ expr }{,,op a [,][\n]}  // match expr iff expr.location is { op } to a, where op is: >, <, >=, <=, ==, != ; with optional backreference SAVE; n>0 
                          // a match is not necessarily acted upon; to act upon, include the "," operator //
{ expr }{\n}              // record number of matches and SAVE as backreference; n>0 //
{ expr }{,,\n}            // record expr.location and SAVE as backreference; n>0
{ expr }{,,[a|op] rel \n} // recursive matching, where op is: >, <, >=, <=, ==, != ; where a>=0, relative to \n; where \n is a pre-defined backference //