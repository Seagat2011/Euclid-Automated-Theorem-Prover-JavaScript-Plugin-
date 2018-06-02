# Elementary Mathematics
    { a } = a
    { a } = a
    [ a ] = a
    plus = +
    minus = -
    a + 0 = 0 + a = a
    a - 0 = a
    a - b + b = a
    a minus b = neg b plus a
    b = { b c } over c
    1 = c over c
# Secondary Mathematics
# Engineering Analysis
    # differentiation
        dx dn 1 { c times x } = c times { dx dn { x } }   # A-Z constants; a-z Expressions
        { x plus y } ' = x ' plus y '
        { x cdot y } ' =  { x ' cdot y } plus { x cdot y ' }
        { x over y } ' = { { x ' cdot y } minus { x cdot y ' } } over { y raised 2 }
        dv dn = dv dx cdot dx dn     # chain rule
        { x raised c } ' = c cdot x raised { c minus 1 }
        { exp raised x } ' = exp raised x
        { c raised x } ' = c raised x cdot ln c
        { sin x } ' = cos x
        { cos x } ' = neg sin x
        { tan x } ' = sec raised 2 x
        { cot x } ' = neg csc raised 2 x
        { sinh x } ' = cosh x
        { coshx } ' = sinh x
        { ln x } ' = 1 over x
        { log _ a x } ' = { log _ a exp {} } over x
        { arc sin x } ' = 1 over { sqrt { 1 minus x raised 2 } }
        { arc cos x } ' = neg { 1 over { sqrt { 1 minus x raised 2 } } }
        { arc tan x } ' = 1 over { 1 plus x raised 2 }
        { arc cot x } ' = neg 1 over { 1 plus x raised 2 }
    # integration
        int { u times v ' } dx = { u times v } minus int { u ' times v } dx
        int { x raised c } dx = { { x raised { c plus 1 } } over { c plus 1 } } plus n , given n noteq 1
        int { 1 over x } dx  = ln { abs { x } } plus c
        int { exp raised { c x } } dx = { 1 over c } times { exp raised { c x } } + n
        int { sin x } dx = neg { cos x } plus c
        int { cos x } dx = { sin x } plus c
        int { tan x } dx = neg { ln { abs { cos x } } } plus c
        int { cot x } dx = ln { abs { sin x } } plus c
        int { sec x } dx = ln { abs { sec x plus tan x } } plus c
        int { csc x } dx = ln { abs { csc x minus cot x } } plus c
        int { 1 over { x raised 2 plus c raised 2 } } dx = { 1 over c } times { arc tan { x over c } } + n
        int { 1 over sqrt { c raised 2 minus x raised 2 } } dx = arc sin { x over c } + n
        int { 1 over sqrt { x raised 2 plus c raised 2 } } dx = inv { sinh {} } times { x over c } plus n
        int { 1 over sqrt { x raised 2 minus c raised 2 } } dx = inv { cosh {} } times { x over c } plus n
        int { sin raised 2 x } dx = { 1 over 2 } times x minus { { 1 over 4 } times sin { 2 x } } + c
        int { cos raised 2 x } dx = { 1 over 2 } times x plus { { 1 over 4 } times sin { 2 x } } + c
        int { tan raised 2 x } dx = tan x minus x + c
        int { cot raised 2 x } dx = neg { cot x } minus x + c
        int { ln x } dx = x ln x minus x plus c
        int { exp raised { a x } cdot sin { b x } } dx = { exp raised { a x } over { a raised 2 plus b raised 2 } } cdot { a sin { b x } minus b cos { b x } } plus c
        int { exp raised { a x } times cos { b x } } dx = { exp raised { a x } over { a raised 2 plus b raised 2 } } times { a cos { b x } plus b sin { b x } } plus c
    # Polar Coords
        x = r times { cos theta }
        y = r times { sin theta }
        r = sqrt { x raised 2 plus y raised 2 }
        theta = arc tan { y over x }
        dx dy = r dr dtheta
    # Series
        1 over { 1 minus x } = sum from { m = 0 } to infinity { x raised m } , given abs { x } lessthan 1
        exp raised x = sum from { m = 0 } to infinity { x raised m over m fact }
        sin x = sum from { m = 0 } to infinity { { neg 1 raised m times x raised { 2 m plus 1 } } over { { 2 m plus 1 } fact } }
        cos x = sum from { m = 0 } to infinity { { neg 1 raised m times x raised { 2 m } } over { { 2 m } fact } }
        ln { 1 minus x } = neg sum from { m = 0 } to infinity { { x raised m } over m } , given { abs { x } lessthan 1 }
        arc tan x = sum from { m = 0 } to infinity { neg 1 raised m times { x raised { 2 times m plus 1 } } over { 2 times m plus 1 } } , given { abs { x } lessthan 1 }
    # Vectors
        a cdot b = { a_1 times b_1 } plus { a_2 times b_2 } plus { a_3 times b_3 }
        a cross b = left [ matrix { i # j # k ## a_1 # a_2 # a_3 ## b_1 # b_2 # b_3 } right ]
        grad f = { partial f over partial x } vec i plus { partial f over partial y } vec j plus { partial f over partial z } vec k
        div v = { partial v_1 over partial x } plus { partial v_2 over partial y } plus { partial v_3 over partial z }
        curl v = left [ matrix { i # j # k ## { partial over partial x } # { partial over partial y } # { partial over partial z } ## v_1 # v_2 # v_3 } right ]
    # SI units
        exp = 2.718281828459045
        sqrt exp = 1.648721270700128
        exp raised 2 = 7.389056098930650
        pi = 3.141592653589793
        pi raised 2 = 9.869604401089358
        sqrt pi = 1.772453850905516
        log_10 pi = 0.497149872694133
        ln pi = 1.144729885849400
        log_10 exp = 0.434294481903251
        ln 10 = 2.302585092994045
        sqrt 2 = 1.414213562373095
        nroot 3 2 = 1.259921049894873
        sqrt 3 = 1.732050807568877
        nroot 3 3 = 1.442249570307408
        ln 2 = 0.693147180559945
        ln 3 = 1.098612288668109
        gamma = 0.577215664901523
        ln gamma = neg { 0.549539312981644 }
        1 degrees = 0.017453292519943 rad
        1 rad = 57.295779513083230 degrees = 57 degrees 17 minutes 44.806 seconds { 57 cdot 27'44.806" }
# Signal Processing
# Calculus
    # Reciprocal identities
        sin x = 1 over { csc x }
        csc x = 1 over { sin x }
        sec x = 1 over { cos x }
        cos x = 1 over { sec x }
        tan x = 1 over { cot x }
        cot x = 1 over { tan x }
    # Tangent & Cotangent identities
        tan x = { sin x } over { cos x }
        cot x = { cos x } over { sin x }
    # Pythagorean identities
        sin raised 2 x plus cos raised 2 x = 1
        1 plus { tan raised 2 x } =  sec raised 2 x
        1 plus { cot raised 2 x } = csc raised 2 x
    # function identities
        sin { { pi over 2 } minus x } = cos x
        csc { { pi over 2 } minus x } = sec x
        sec { { pi over 2 } minus x } = csc x
        cos { { pi over 2 } minus x } = sin x
        tan { { pi over 2 } minus x } = cot x
        cot { { pi over 2 } minus x } = tan x
    # Reduction formulas
        sin { neg x } = neg sin x
        csc { neg x } = neg csc x
        sec { neg x } = sec x
        cos { neg x } = cos x
        tan { neg x } = neg tan x
        cot { neg x } = neg cot x
    # Sum & difference formulas
        sin { u plusminus v } = sin u cos v plusminus cos sin v
        cos { u plusminus v } = cos u cos v plusminus sin u sin v
        tan { u plusminus v } = { tan u plusminus tan v } over { 1 minusplus { tan u tan v } }
    # Double-angle formulas
        sin { 2 times u } = 2 sin u cos u
        cos { 2 times u } = cos raised { 2 u } minus sin raised { 2 u } minus sin raised { 2 u } = 2 times { cos raised 2 y } minus 1 = 1 minus 2 sin raised { 2 u }
        tan { 2 times u } = { 2 times tan u } over { 1 minus tan raised 2 u }
    # Power reducing formula
        sin raised 2 u = { 1 minus cos { 2 times u } } over 2
        cos raised 2 u = { 1 plus cos { 2 times u } } over 2
        tan raised 2 u = { 1 minus cos { 2 times u } } over { 1 plus cos { 2 times u } }
    # Sum-to-product formulas
        sin u plus sin v = 2 times sin { { u plus v } over 2 } times cos { { u minus v } over 2 }
        sin u minus sin v = 2 times cos { { u plus v } over 2 } times sin { { u minus v } over 2 }
        cos u plus cos v = 2 times cos { { u plus v } over 2 } times cos { { u minus v } over 2 }
        cos u minus cos v = neg 2 times cos { { u plus v } over 2 } times sin { { u minus v } over 2 }
    # Product-to-Sum formulas
        sin u times sin v = { 1 over 2 } times cos { u minus v } minus cos { u plus v }
        cos u times cos v = { 1 over 2 } times cos { u minus v } plus cos { u plus v }
        sin u times cos v = { 1 over 2 } times sin { u plus v } plus cos { u minus v }
        cos u times sin v = { 1 over 2 } times sin { u minus v } minus sin { u minus v }
    # Trigonometric functions, given theta = { 0 lessthan theta lessthan { pi / over 2 } }
        let x = coord x in x plane and y = coord y in y plane and
        let r = sqrt { x raised 2 plus y raised 2 } then
        sin theta = y over r
        cos theta = x over y
        tan theta = y over x
        csc theta = y over r
        sec theta = r over x
        tan theta = x over y
    # Factors & zeros of polynamials
        let p of x = a_n x raised n + a_{ n minus 1 } x raised { x minus 1 } + ellipses + a_1 x + a_0, if { p of a == 0 } then a isa zero of p of x and { x minus a } isa factor of p of x
    # Fundamental theorem of algebra
        let f of n = { a raised n } then
        polynomial hasa f of n hasa zeros == n and zeros isa { imaginary || real } , and
        polynominal hasa real hasa degree % 2 != 0 and polynominal hasa real hasa zeros == { n % 2 != 0 }
    # Quadratic formula
        if p of x = a x raised 2 plus b x plus c and { 0 le b raised 2 minus 4 a c } then p of x hasa real hasa zeros = { neg b plusminus sqrt { b raised 2 minus 4 a c } } over { 2 a }
    # Special factors
        x raised 2 minus a raised 2 = { x minus a } times { x plus a }
        x raised 3 plus a raised 3 = { x plus a } times { x raised 2 minus a x plus a raised 2 }
        x raised 3 minus a raised 3 = { x minus a } times { x raised 2 plus a x plus a raised 2 }
        x raised 4 minus a raised 4 = { x raised 2 minus a raised 2 } times { x raised 2 plus a raised 2 }
    # Binomial theorem
        { x plus y } raised n = { x raised n plus n x raised { n minus 1 } } times y plus { { n times { n minus 1 } } over 2 fact } times { x raised { n minus 2 } times y raised 2 } plus ... plus n times x times y raised { n minus 1 } plus y raised n
        { x minus y } raised n = { x raised n minus n x raised { n minus 1 } } times y plus { { n times { n minus 1 } } over 2 fact } times { x raised { n minus 2 } times y raised 2 } minus ... plusminus n times x times y raised { n minus 1 } minusplus y raised n
    # Rational zero theorem
        let p of x = sum from { n = 0 } to infinity { a_n x raised n plus a_{ n minus 1 } x raised { n minus 1 } } plus sum from { x = 0 } to n { a_1 x plus a_0 } likewise
        let p of x = { a_n times x raised n plus a_{ n minus 1 } times x raised { n minus 1 } plus ... plus a_1 times x plus a_0 } 
        given a_0 hasa r and r isa factor of a_0
        given a_n hasa s and s isa factor of a_n
        and p of x hasa coefficient and coefficient isa integer 
        then p of x hasa zero that isa rational x with x = r over s
    # Factoring by grouping
        a c x raised 3 plus a d x raised 2 plus b c x plus b d = a x raised 2 { c x plus d } = { a x raised 2 plus b } cdot { c x plus d }
    # Arithmetic operations
        a times b plus a times c = a times { b plus c }
        { a over b } over { c over d } = { a times d } over { b times c }
        a times { b over c } = a times { b plus c }
        { a over b } plus { c over d } = { a times d plus b times c } over { b times d }
        { a over b } over c = a over { b times c }
        { a minus b } over { c minus d } = neg { { b minus a } over { d minus c } }
        { a plus b } over c = { a over c } plus { b over c }
        a over { b over c } = { a times c } over b
        { a times b plus a times c } over a = b plus c
    # Exponents and radicals
        nroot 2 x = sqrt { x }
        a raised 0 = 1, given a noteq 0
        { a over b } raised x = { a raised x } over { b raised x }
        { a times b } raised x = { a raised x } times { b raised x }
        nroot n { a raised m } = a raised { m over n }
        { a raised x } times { a raised y } = a raised { x plus y }
        a raised { neg x } = 1 over { a raised x }
        sqrt a = a raised { 1 over 2 }
        nroot n { a times b } = { nroot n a } cdot { nroot n b }
        { a raised x } over { a raised y } = a raised { x minus y }
        { a raised x } raised y = a raised { x times y }
        nroot n a = a raised { 1 over n }
        nroot n { a over b } = { nroot n a } over { nroot n b }
# Linear Algebra
    # Basics
        given Vector isa array from 0 to m { Vector [ m ] } then
        Matrix isa Vector from 0 to n { Matrix [ m ][ n ] }