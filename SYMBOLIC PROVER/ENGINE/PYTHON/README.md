
NOTES

  -- File auto-enumerate symbol Ex. ( filename.--.theorem )

TODO

  Auto-generate new theorems and axioms
  Incorporate only basic ALU axioms, as well as a proper ( extensible ) math symbols dictionary
  Use Sets/Rings to reduce solution space searches
  Employ concept of superposition; use 0 as dimensional placeholder

FILE TYPES

  file.axioms   => Euclid.axioms ( Newest axioms shown 1st )
  file.symbols  => Euclid.symbols
  file.proof    => [ MD5 or name ].proof ( An MD5 will match MD5 axiom in axioms file )
  file.theorem  => [ name ].[ number sequemce or -- ].theorem

FILE DESCRIPTIONS

  EUCLID.AXIOMS
  
    axiom = { axiom:"", MD5:"", publication date:"" }    
    axioms { MD5:{ "":axiom,.. } }
  
  EUCLID.SYMBOLS
  
  FILE.PROOF
  
  FILE.--.THEOREM