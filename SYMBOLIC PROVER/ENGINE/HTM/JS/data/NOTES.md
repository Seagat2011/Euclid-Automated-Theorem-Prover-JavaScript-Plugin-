
REQUIREMENTS

1. Symbols => Glyphs
2. Operators => Behaviors

// user-defined class definitions //

class Symbol.Number.

// Axioms (Logic & Semantics are assumed valid syntax); these statements are later pretty-printed //


TEST CASE [PASS]

USING Math.Symbol.Number.Real

{ one } plus { two } plus { ellipses } = Infinity
{ $(0) } plus { zero } plus { zero } plus { ellipses } = { $(0) } // Vars are domain-specific //
{ one } plus { one } plus { two } = { two } plus { two }
{ one } plus { one } = { two }
{ two } plus { two } = { four }
{ four } plus { two } = { six }
{ one } plus { one } plus { one } plus { one } plus { one } plus { one } = { six }

lemma: { one } plus { two } plus { two } plus { one } = { six }


// Pretty-printed //

1 + 2 + ... = Infinity
Z_0 + 0 + 0 + ... = Z_0
1 + 1 = 2 
2 + 2 = 4 
4 + 2 = 6 
1 + 1 + 1 + 1 + 1 + 1 = 6 

lemma: 1 + 2 + 2 + 1 = 6


// Numeric Representations in Euclid

one.three.five.seven.dot.nine.j => 1357.9j
one.three.five.seven.dot.nine.i => 1357.9i
one.three.five.seven.dot..nine.nine.bar => 1357.[99]
one.three.five.over.seven.nine => 135/79
complex { { real { negative one.three.five } } plus { imaginary { seven.nine.dot..nine.nine.bar } } } => -135+79.[99]j
complex { { negative one.three.five } plus { seven.nine.dot.eight..nine.nine.bar.j } } => -135+79.8[99]j


1+35.5[99]j
