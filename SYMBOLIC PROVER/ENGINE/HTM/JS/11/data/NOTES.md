
REQUIREMENTS

1. Symbols => Glyphs
2. Operators => Behaviors

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

// Axioms (Logic & Semantics are assumed valid syntax); these statements are later pretty-printed //

// $(i) => variables 
// $G => domain glyphs 
// {...}L => Lists
// {...}{[Regexp][func]}

USING Math.Symbol.Number.Real

{ one } ellipsis { plus { two } plus } = Infinity      // (L)ist represents and generates a continuum or an infinite sequence, populated by Math.Symbol.Number.Integer::__LIST() //
{ $(0) } { plus { zero } }* = { $(0) }    // Variables will later assume their appropriate domain glyph (eg. Integer(Z) ) //
{ one } plus { one } = { two } 
{ two }  plus { two } = { four }
{ four } plus { two } = { six }
{ one } plus { one } plus { one } plus { one } plus { one } plus { one } = { six }

lemma: { one } plus { two } plus { two } plus { one } = { six }


// Pretty-printed //

1 + 2 +... = Inf
Z_0 + 0 + 0 +... = Z_0
1 + 1 = 2 
2 + 2 = 4 
4 + 2 = 6 
1 + 1 + 1 + 1 + 1 + 1 = 6 

lemma: 1 + 2 + 2 + 1 = 6


// Numeric Ex.

one.three.five.seven..nine.j => 1357.9j
one.three.five.seven..nine.i => 1357.9i
one.three.five.seven..bar.nine.nine => 1357.[99]
one.three.five.over.seven.nine => 135/79
{ real { negative one.three.five } } plus { imaginary { seven.nine..bar.nine.nine } } => -135+79.[99]j



