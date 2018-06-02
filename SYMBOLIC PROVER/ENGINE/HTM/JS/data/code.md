// strict    // forces class macros to inherit only declared (RHS) behavior //
// class macros provide necessary Symbol-format validators //

class Math.Global {

    (Laws & Identities: (a)ssociative,(c)ommutative,(d)istributive,(z)ero,(i)dentity)

    // Applies to LHS //

    this.Alphanum = `[A-Za-z]+[A-Za-z0-9]*`
    this.Unary = `[ Plus[+] Minus[-] ]`
    this.Digit = `[0-9]`
    this.Number = `[ [Digits]+ ]`
    this.Decimal = `[.]`
    this.Operator = `[ Plus[+] Minus[-] Times[*] MultipliedBy[*] DividedBy[/] Over[/] ]`
    this.ExtendedOperator = `[ LessThan[<] GreaterThan[>] LessThan[<] GreaterThan[>] IsEqualTo[==] EqualTo[=] Equals[=] Power[^] RaisedTo[^] Shift.Left.Unsigned[<<] Shift.Left.Signed[<<<] Not[ [!][~] ] 
        Shift.Right.Unsigned[>>] Shift.Right.Signed[>>>]  MultipliedBy[*] DividedBy[/] Percent[%] Modulus[%] DecimalPoint[Decimal] Unary[ Plus Minus ] Complex Negative[-]
    ]`

}

class Math.Symbol.Number.Natural : Math.Global {

    // Any global variable[s] of type Natural will later assume this appropriate domain glyph //
    this.__GLYPH = `N`
    this.Operator = `[Operator]`
    this.Unsigned = `[1-9][Number]`
    
    // Sample subclass validator or filter, written in JavaScript //
    
    this.isPrime = (lhs) => {
    
        this.expr  // expr //
        this.location // >=0 //
        this.match  // match[]; match.length >= 0 //
        this.global  // global[] = [any object[s] not a backreference or variable //
        this.global.backreference // backreference[i] = { [data pertaining to \i] }; each entry is a global backreference //
        this.global.variable // variable[i] = { [data pertaining to $(i)] }; each entry is a global variable //

        let pstatus = false
        if (lhs<=1)
            pstatus = false
        else
        if (lhs <= 3)
            pstatus = true
        else
        if ((lhs%2 == 0) || (lhs%3 == 0 )){
            pstatus false
        }
        else {
            let i = 5
            while(i*i<=lhs){
                if ((lhs%i == 0) || (lhs%(i+2)==0)){
                    pstatus = false
                    break
                }
                i += 6
            }
        }
        return pstatus
    }

}

class Math.Symbol.Number.Whole : Math.Symbol.Number.Natural {

    this.__GLYPH = `W`
    Operator = `[Operator]`
    Unsigned = `[Number]`

}

class Math.Symbol.Number.Integer : Math.Symbol.Number.Natural {

    this.Unsigned = `[Number]`
    this.Signed = `[Unary]?[Number]`
    this.Operator = `[Operator]`
    
    // A built-in overridable method for generating a continuum or sequence //
    this.__LIST = (lhs) => {
        return this.expr + ` +...` 
    }

}

class Math.Symbol.Number.Rational : Math.Symbol.Number.Integer {

    this.__GLYPH = `Q`
    this.Operator = `[Operator]`
    
    let ImproperOperator = `[DividedBy,Over]`   // Declare a local-scope operator //   // Declare a local-scope operator //
    
    this.Unsigned = `[Unsigned][Decimal][Unsigned] | [Unsigned][ImproperOperator][Unsigned] | [Unsigned][Decimal][Signed]?[BarOver { [Signed] }]`
    this.Signed = `[Signed][Rational.Decimal][Signed] | [Signed][ImproperOperator][Signed] | [Unsigned][Decimal][Signed]?[BarOver { [Signed] }]`

}

class Math.Symbol.Number.Irrational : 
    Math.Global, 
    Math.Symbol.Number.Rational 
{

    this.__GLYPH = `Q`
    this.Signed = `[Math.Symbol.Number.Rational.Signed] | [AlphaNum]`

}

class Math.Symbol.Number.Complex : 
    Math.Symbol.Number.Rational, 
    Math.Symbol.Number.Irrational 
{

    this.__GLYPH = `C`
    
    let Complex = `[i,j]`
    let InnerOperator = `[+,-]`
    
    this.Operator = `[Operator]`
    this.Unsigned = `[Rational.Unsigned] [InnerOperator] [Rational.Unsigned][Complex]`
    this.Signed = `[Rational.Signed] [InnerOperator] [Rational.Unsigned][Complex]`

}

class Math.Symbol.Number.Real : Math.Symbol.Number.Complex {

    this.__GLYPH = `R`
    this.Signed = `[Signed]`
    this.Operator = `[Operator]`

}  
  
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


// $(i) => variables 
// $G => domain glyphs 
// {...}L => Lists
// {...}{[Regexp][func]}

{ one } ellipsis { plus { two } plus } = Infinity      // (L)ist represents and generates a continuum or an infinite sequence, populated by Math.Symbol.Number.Integer::__LIST() //
{ $(0) } { plus { zero } }* = { $(0) }    // Variables will later assume their appropriate domain glyph (eg. Integer(Z) ) //

// Langauge (Lexical,Symbols)
{ [+=0-9] }

// Syntax
Symbol.Integer.Number ( Symbol.Integer.Operator { + } { Symbol.Integer.Number } )* ) Symbol.Integer.Operator { = } Symbol.Integer.Number ( Symbol.Integer.Operator { + } { Symbol.Integer.Number } )* ) ,

Where Symbol.Number.Integer is syntactic sugar for Symbol.Number.Integer{} , An empty paramater-list indicates Number should be treated as a variable. 
Multiple (independant) variables can use Symbol.Number.Integer[N], where N=0 to Infinity
This theorem prover demonstrates an event-driven valid-syntax: 
Although a syntax may be correct, it is not valid (cannot be used) until its predecessor(s) occur, as Axioms. (compare to the occurrence of new enzymes in the body(enzymes are truth tables))
Notice Axioms contains discrete values, whereas Syntax does not