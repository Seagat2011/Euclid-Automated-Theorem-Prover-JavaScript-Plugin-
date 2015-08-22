/*

TITLE: 
    SYNTAXER.js

AUTHOR: Seagat2011 
    http://eterna.cmu.edu/web/player/90270/
    http://fold.it/port/user/1992490

VERSION: 
    Major.Minor.Release.Build
    1.0.0.0

STYLEGUIDE: 
    http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
    
REFERENCES:
    N/A

DESCRIPTION: 
    Syntax (analysis) engine:
    This tool studies Euclid operators
    in an attempt to verify syntax.

INPUT: 
   [
    { type:Prove, link:[val:x,op:plus,val:y,op:equals,val:z] },
    { type:Clause, link:[val:x,op:equals,val:a] }, 
    { type:Clause, link:[val:y,op:equals,val:b] },
    { type:Clause, link:[val:a,op:plus,val:b,op:equals,val:z] },
   ]

OUTPUT:
    Valid syntax! ..

SCRIPT TYPE: 
    Syntax/Semantics engine

*/
/* ------------------------------------------------------

UNARY / BINARY OPERATORS
    +<?> 
    -<?> 
    +-<?> 
    -+<?> 
    <?> + <?> 
    <?> - <?> 
    <?> cdot <?> 
    <?> times <?> 
    <?> * <?> 
    {<?>} over {<?>} 
    <?> div <?> 
    <?> / <?> 
    <?> circ <?> 
    {<?>} wideslash {<?>} 
    <?> widebslash <?> 
    neg <?> 
    <?> and <?> 
    <?> or <?> 


RELATIONS
    <?> = <?> 
    <?> <> <?> 
    <?> < <?> 
    <?> <= <?> 
    <?> leslant <?> 
    <?> > <?> 
    <?> >= <?> 
    <?> geslant <?> 
    <?> << <?> 
    <?> >> <?> 
    <?> approx <?> 
    <?> sim <?> 
    <?> simeq <?> 
    <?> equiv <?> 
    <?> prop <?> 
    <?> parallel <?> 
    <?> ortho <?> 
    <?> divides <?> 
    <?> ndivides <?> 
    <?> toward <?> 
    <?> dlarrow <?> 
    <?> dlrarrow <?> 
    <?> drarrow <?> 
    <?> prec <?> 
    <?> succ <?> 
    <?> preccurlyeq <?> 
    <?> succcurlyeq <?> 
    <?> precsim <?> 
    <?> succsim <?> 
    <?> nprec <?> 
    <?> nsucc <?> 


SET OPERATIONS
    <?> in <?> 
    <?> notin <?> 
    <?> owns <?> 
    <?> intersection <?> 
    <?> union <?> 
    <?> setminus <?> 
    <?> slash <?> 
    <?> subset <?> 
    <?> subseteq <?> 
    <?> supset <?> 
    <?> supseteq <?> 
    <?> nsubset <?> 
    <?> nsubseteq <?> 
    <?> nsupset <?> 
    <?> nsupseteq <?> 
    emptyset 
    aleph 
    setN 
    setZ 
    setQ 
    setR 
    setC 


FUNCTIONS
    abs {<?>} 
    fact {<?>} 
    sqrt {<?>} 
    nroot {<?>}{<?>} 
    <?>^{<?>}
    func e^{<?>} 
    ln <?> 
    exp <?> 
    log <?> 
    sin <?> 
    cos <?> 
    tan <?> 
    cot <?> 
    sec <?>
    csc <?>
    sinh <?> 
    cosh <?> 
    tanh <?> 
    coth <?> 
    arcsin <?> 
    arccos <?> 
    arctan <?> 
    arccot <?> 
    arsinh <?> 
    arcosh <?> 
    artanh <?> 
    arcoth <?> 


OPERATORS
    lim <?> 
    sum <?> 
    prod <?> 
    d?d? <degree?> {<expr>} // ? => a-z (eg dxdn)
    coprod <?> 
    int <?> 
    iint <?> 
    iiint <?> 
    lint <?> 
    llint <?> 
    lllint <?> 
    lim from{<?>} to <?> 
    sum from{<?>} to{<?>} 
    prod from{<?>} to <?> 
    coprod from{<?>} to <?> 
    int from{<?>} to <?> 
    iint from{<?>} to <?> 
    iiint from{<?>} to <?> 
    lint from{<?>} to <?> 
    llint from{<?>} to <?> 
    lllint from{<?>} to <?> 
    lim to{<?>} <?> 
    sum to{<?>} <?> 
    prod to{<?>} <?> 
    coprod to{<?>} <?> 
    int to{<?>} <?> 
    iint to{<?>} <?> 
    iiint to{<?>} <?> 
    lint to{<?>} <?> 
    llint to{<?>} <?> 
    lllint to{<?>} <?> 
    lim from{<?>} to{<?>}  
    sum from{<?>} to{<?>}  
    prod from{<?>} to{<?>} 
    coprod from{<?>} to{<?>} 
    int from{<?>} to{<?>} 
    iint from{<?>} to{<?>} 
    iiint from{<?>} to{<?>} 
    lint from{<?>} to{<?>} 
    llint from{<?>} to{<?>} 
    lllint from{<?>} to{<?>} 


ATTRIBUTES
    acute <?> 
    grave <?> 
    breve <?> 
    circle <?> 
    dot <?> 
    ddot <?> 
    dddot <?> 
    bar <?> 
    vec <?> 
    tilde <?> 
    hat <?> 
    check <?> 
    widevec {<?>} 
    widetilde {<?>} 
    widehat {<?>} 
    overline {<?>} 
    underline {<?>} 
    overstrike {<?>} 
    phantom {<?>} 
    bold <?> 
    ital <?> 
    size <?> {<?>} 
    font <?> {<?>} 
    color black {<?>} 
    color blue {<?>} 
    color green {<?>} 
    color red {<?>} 
    color cyan {<?>} 
    color magenta {<?>} 
    color yellow {<?>} 


BRACKETS
    {<?>} 
    (<?>) 
    [<?>] 
    ldbracket <?> rdbracket 
    lbrace <?> rbrace 
    langle <?> rangle 
    langle <?> mline <?> rangle 
    lceil <?> rceil 
    lfloor <?> rfloor 
    lline <?> rline 
    ldline <?> rdline 
    left ( <?> right ) 
    left [ <?> right ] 
    left ldbracket <?> right rdbracket 
    left lbrace <?> right rbrace 
    left langle <?> right rangle 
    left langle <?> mline <?> right rangle 
    left lceil <?> right rceil 
    left lfloor <?> right rfloor 
    left lline <?> right rline 
    left ldline <?> right rdline 
    {<?>} overbrace {<?>} 
    {<?>} underbrace {<?>} 


FORMATS
    <?>^{<?>}
    <?>_{<?>}
    <?> lsup{<?>} 
    <?> lsub{<?>} 
    <?> csup{<?>} 
    <?> csub{<?>} 
    newline 
    `
    ~
    nospace {<?>} 
    alignl <?> 
    alignc <?> 
    alignr <?> 
    binom{<?>}{<?>} 
    stack{<?> # <?> # <?>} 
    matrix{<?> # <?> ## <?> # <?>} 


OTHERS
    infinity 
    partial 
    nabla 
    exists 
    notexists 
    forall 
    hbar 
    lambdabar 
    Re 
    Im 
    wp 
    leftarrow 
    rightarrow 
    uparrow 
    downarrow 
    dotslow 
    dotsaxis 
    dotsvert 
    dotsup 
    dotsdown 


------------------------------------------------------*/

/*
Extensible Primitive types
---------
Number()
Object()
String()
Array()
*/
// all isa/hasa objects evaluate to TRUE or FALSE //
var Entity = new Object()
function isa(){
  var y = arguments[1]
  var _x_ = arguments[0]
  var _y_ = arguments[1].toString()
  if(Entity[_x_]){
       console.log('*** WARNING *** - Possible Object redefinition: name ( '+_x_+' ) isa ( '+_y_+' )')
  }
  Entity[_x_] = {}
  Entity[_x_].name = _x_
  Entity[_x_].isa = {}
  Entity[_x_].isa[_y_] = 1
  return Entity[_x_]
}
function hasa(){
   var y = arguments[1]
   var _x_ = arguments[0]
   var _y_ = arguments[1].toString()
   if(!Entity[_x_]){
       Entity[_x_] = {}
       Entity[_x_].name = _x_
       Entity[_x_].hasa = {}
   }
   if(Entity[_x_].hasa[_y_]){
       console.log('*** WARNING *** - Possible Object re-attribution: name ( '+_x_+' ) hasa ( '+_y_+' )')
   }
   Entity[_x_].hasa[_y_] = 1
   return Entity[_x_]
}
var EntityAnnotator = {
   'isa':isa,
   'hasa':hasa,
   'C21F969B5F03D33D43E04F8F136E7682':function(z){
       console.log('Unexpected token '+z )
   },
}

function g_TPTtoken()
{                           // LSB                                                        ..MSB
   this.NoToken             = "1000000000000000000000000000000000000000000000000000000000000000" 
   this.WhiteSpace          = "0100000000000000000000000000000000000000000000000000000000000000"
   this.SkipToken           = "0110000000000000000000000000000000000000000000000000000000000000" // = this.WhiteSpace |this.Comment
   this.Comment             = "0010000000000000000000000000000000000000000000000000000000000000"
   this.Ident               = "0001000000000000000000000000000000000000000000000000000000000000"
   this.Identifier          = "0001100000000000000000000000000000000000000000000000000000000000" // = this.Ident | this.Idnum
   this.Idnum               = "0000100000000000000000000000000000000000000000000000000000000000"
   this.SemIdent            = "0000010000000000000000000000000000000000000000000000000000000000"
   this.String              = "0000001000000000000000000000000000000000000000000000000000000000"
   this.Name                = "0001101000000000000000000000000000000000000000000000000000000000" // = this.Identifier |this.String
   this.SQString            = "0000000100000000000000000000000000000000000000000000000000000000"
   this.PosInt              = "0000000010000000000000000000000000000000000000000000000000000000"
   this.OpenBracket         = "0000000001000000000000000000000000000000000000000000000000000000"
   this.CloseBracket        = "0000000000100000000000000000000000000000000000000000000000000000"
   this.OpenCurly           = "0000000000010000000000000000000000000000000000000000000000000000"
   this.CloseCurly          = "0000000000001000000000000000000000000000000000000000000000000000"
   this.OpenSquare          = "0000000000000100000000000000000000000000000000000000000000000000"
   this.CloseSquare         = "0000000000000010000000000000000000000000000000000000000000000000"
   this.LesserSign          = "0000000000000001000000000000000000000000000000000000000000000000"
   this.GreaterSign         = "0000000000000000100000000000000000000000000000000000000000000000"
   this.EqualSign           = "0000000000000000010000000000000000000000000000000000000000000000"
   this.NegEqual            = "0000000000000000001000000000000000000000000000000000000000000000"
   this.TildeSign           = "0000000000000000000100000000000000000000000000000000000000000000"
   this.Exclamation         = "0000000000000000000010000000000000000000000000000000000000000000"
   this.AllQuantor          = "0000000000000000000010000000000000000000000000000000000000000000" // aka AllQuantor
   this.QuestionMark        = "0000000000000000000000100000000000000000000000000000000000000000" 
   this.ExistQuantor        = "0000000000000000000000100000000000000000000000000000000000000000" // aka QuestionMark
   this.Comma               = "0000000000000000000000001000000000000000000000000000000000000000"
   this.Semicolon           = "0000000000000000000000000100000000000000000000000000000000000000"
   this.Colon               = "0000000000000000000000000010000000000000000000000000000000000000"
   this.Hyphen              = "0000000000000000000000000001000000000000000000000000000000000000"
   this.Plus                = "0000000000000000000000000000100000000000000000000000000000000000"
   this.Mult                = "0000000000000000000000000000010000000000000000000000000000000000"
   this.Fullstop            = "0000000000000000000000000000001000000000000000000000000000000000"
   this.Dollar              = "0000000000000000000000000000000100000000000000000000000000000000"
   this.Slash               = "0000000000000000000000000000000010000000000000000000000000000000"
   this.Pipe                = "0000000000000000000000000000000001000000000000000000000000000000"
   this.FOFOr               = "0000000000000000000000000000000001000000000000000000000000000000" // aka pipe
   this.Ampersand           = "0000000000000000000000000000000000100000000000000000000000000000"
   this.FOFAnd              = "0000000000000000000000000000000000100000000000000000000000000000" // aka Ampersand
   this.FOFAssocOp          = "0000000000000000000000000000000001100000000000000000000000000000" // = this.FOFAnd|this.FOFOr
   this.FOFLRImpl           = "0000000000000000000000000000000000000100000000000000000000000000"
   this.FOFRLImpl           = "0000000000000000000000000000000000000010000000000000000000000000"
   this.FOFEquiv            = "0000000000000000000000000000000000000001000000000000000000000000"
   this.FOFXor              = "0000000000000000000000000000000000000000100000000000000000000000"
   this.FOFNand             = "0000000000000000000000000000000000000000010000000000000000000000"
   this.FOFNor              = "0000000000000000000000000000000000000000001000000000000000000000"
   this.FOFBinOp            = "0000000000000000000000000000000001100111111000000000000000000000" // = (this.FOFAnd|this.FOFOr|this.FOFLRImpl|this.FOFRLImpl|this.FOFEquiv|this.FOFXor|this.FOFNand|this.FOFNor)
   this.LMultilineComment   = "0010000000000000000000000000000000000000000000001000000000000000" // = 1<<39|this.Comment
   this.RMultilineComment   = "0000000000000000000000000000000000000000000000000100000000000000"
   this.Newline             = "0000000000000000000000000000000000000000000000000010000000000000"
   this.hashmark            = "0000000000000000000000000000000000000000000000000001000000000000"
   this.dblhashmark         = "0000000000000000000000000000000000000000000000000000100000000000"
   this.GreaterEq           = "0000000000000000000000000000000000000000000000000000010000000000"
   this.MuchGreater         = "0000000000000000000000000000000000000000000000000000001000000000"
   this.MuchLess            = "0000000000000000000000000000000000000000000000000000000100000000"
   this.NegEqual            = "0000000000000000000000000000000000000000000000000000000010000000"
   this.MinusPlus           = "0000000000000000000000000000000000000000000000000000000001000000"
   this.PlusMinus           = "0000000000000000000000000000000000000000000000000000000000100000"
}

var en = new g_TPTtoken()

var parser = {}

parser[en.NoToken] = function(){ var j = ++arguments[0]; return j } 
parser[en.WhiteSpace] = function(){ var j = ++arguments[0]; return j }
parser[en.SkipToken] = function(){ var j = ++arguments[0]; return j } // parser[en.WhiteSpace |parser[en.Comment
parser[en.Comment] = function(){ var j = ++arguments[0]; return j }
parser[en.Ident] = function(){ var j = ++arguments[0]; return j }
parser[en.Identifier] = function(){ var j = ++arguments[0]; return j } // parser[en.Ident |parser[en.Idnum
parser[en.Idnum] = function(){ var j = ++arguments[0]; return j }
parser[en.SemIdent] = function(){ var j = ++arguments[0]; return j }
parser[en.String] = function(){ var j = ++arguments[0]; return j }
parser[en.Name] = function(){ var j = ++arguments[0]; return j } // parser[en.Identifier |parser[en.String
parser[en.SQString] = function(){ var j = ++arguments[0]; return j }
parser[en.PosInt] = function(){ var j = ++arguments[0]; return j }
parser[en.OpenBracket] = function(){ var j = ++arguments[0]; return j }
parser[en.CloseBracket] = function(){ var j = ++arguments[0]; return j }
parser[en.OpenCurly] = function(){ var j = ++arguments[0]; return j }
parser[en.CloseCurly] = function(){ var j = ++arguments[0]; return j }
parser[en.OpenSquare] = function(){ var j = ++arguments[0]; return j }
parser[en.CloseSquare] = function(){ var j = ++arguments[0]; return j }
parser[en.LesserSign] = function(){ var j = ++arguments[0]; return j }
parser[en.GreaterSign] = function(){ var j = ++arguments[0]; return j }
parser[en.EqualSign] = function(){ var j = ++arguments[0]; return j }
parser[en.NegEqual] = function(){ var j = ++arguments[0]; return j }
parser[en.TildeSign] = function(){ var j = ++arguments[0]; return j }
parser[en.Exclamation] = function(){ var j = ++arguments[0]; return j }
parser[en.AllQuantor] = function(){ var j = ++arguments[0]; return j } // aka AllQuantor
parser[en.QuestionMark] = function(){ var j = ++arguments[0]; return j } 
parser[en.ExistQuantor] = function(){ var j = ++arguments[0]; return j } // aka QuestionMark
parser[en.Comma] = function(){ var j = ++arguments[0]; return j }
parser[en.Semicolon] = function(){ var j = ++arguments[0]; return j }
parser[en.Colon] = function(){ var j = ++arguments[0]; return j }
parser[en.Hyphen] = function(){ var j = ++arguments[0]; return j }
parser[en.Plus] = function(){ var j = ++arguments[0]; return j }
parser[en.Mult] = function(){ var j = ++arguments[0]; return j }
parser[en.Fullstop] = function(){ var j = ++arguments[0]; return j }
parser[en.Dollar] = function(){ var j = ++arguments[0]; return j }
parser[en.Slash] = function(){ var j = ++arguments[0]; return j }
parser[en.Pipe] = function(){ var j = ++arguments[0]; return j }
parser[en.FOFOr] = function(){ var j = ++arguments[0]; return j } // aka pipe
parser[en.Ampersand] = function(){ var j = ++arguments[0]; return j }
parser[en.FOFAnd] = function(){ var j = ++arguments[0]; return j } // aka Ampersand
parser[en.FOFAssocOp] = function(){ var j = ++arguments[0]; return j } // parser[en.FOFAnd|parser[en.FOFOr
parser[en.FOFLRImpl] = function(){ var j = ++arguments[0]; return j }
parser[en.FOFRLImpl] = function(){ var j = ++arguments[0]; return j }
parser[en.FOFEquiv] = function(){ var j = ++arguments[0]; return j }
parser[en.FOFXor] = function(){ var j = ++arguments[0]; return j }
parser[en.FOFNand] = function(){ var j = ++arguments[0]; return j }
parser[en.FOFNor] = function(){ var j = ++arguments[0]; return j }
parser[en.FOFBinOp] = function(){ var j = ++arguments[0]; return j } // (parser[en.FOFAnd|parser[en.FOFOr|parser[en.FOFLRImpl|parser[en.FOFRLImpl|parser[en.FOFEquiv|parser[en.FOFXor|parser[en.FOFNand|parser[en.FOFNor)
parser[en.LMultilineComment] = function(){ var j = ++arguments[0]; return j } // 1<<39|parser[en.Comment
parser[en.RMultilineComment] = function(){ var j = ++arguments[0]; return j }
parser[en.Newline] = function(){ var j = ++arguments[0]; return j }
parser[en.hashmark] = function(){ var j = ++arguments[0]; return j }
parser[en.dblhashmark] = function(){ var j = ++arguments[0]; return j }
parser[en.GreaterEq] = function(){ var j = ++arguments[0]; return j }
parser[en.MuchGreater] = function(){ var j = ++arguments[0]; return j }
parser[en.MuchLess] = function(){ var j = ++arguments[0]; return j }
parser[en.NegEqual] = function(){ var j = ++arguments[0]; return j }
parser[en.MinusPlus] = function(){ var j = ++arguments[0]; return j }
parser[en.PlusMinus] = function(){ var j = ++arguments[0]; return j }
parser['7F2DB423A49B305459147332FB01CF87']={}, // extant memory buffer
parser['44CDEB54C6F2AEBAD54611201C26D6F0']=function(){ var j = arguments[0]; var k = arguments[1]; throw 'Euclid parser: *** Error *** - Line 0000: Unexpected token ( '+parser['7F2DB423A49B305459147332FB01CF87'][j].val+' ) - Expected '+k } // OnError

/*
var keywords = {
// UNARY / BINARY OPERATORS
    +<?> 
    pos <?>
    -<?> 
    neg <?> 
    +-<?> 
    plusminus <?>
    -+<?> 
    minusplus <?>
    <?> + <?> 
    <?> plus <?>
    <?> - <?> 
    <?> minus <?>
    <?> cdot <?> 
    <?> * <?> 
    <?> times <?>
    <?> div <?> 
    <?> / <?> 
    {<?>} over {<?>} 
    <?> circ <?> 
    {<?>} wideslash {<?>} 
    <?> widebslash <?> 
    <?> and <?> 
    <?> or <?> 


// RELATIONS
    <?> = <?> 
    <?> <> <?> 
    <?> < <?> 
    <?> <= <?> 
    <?> lessequal <?>
    <?> le <?>
    <?> leslant <?> 
    <?> > <?> 
    <?> >= <?> 
    <?> greaterequal <?>
    <?> geslant <?> 
    <?> << <?> 
    <?> muchless <?>
    <?> >> <?> 
    <?> muchgreater <?>
    <?> equals <?>
    <?> minus <?>
    <?> notequal <?>
    <?> approx <?> 
    <?> sim <?> 
    <?> simeq <?> 
    <?> equiv <?> 
    <?> prop <?> 
    <?> parallel <?> 
    <?> ortho <?> 
    <?> divides <?> 
    <?> ndivides <?> 
    <?> toward <?> 
    <?> dlarrow <?> 
    <?> dlrarrow <?> 
    <?> drarrow <?> 
    <?> prec <?> 
    <?> succ <?> 
    <?> preccurlyeq <?> 
    <?> succcurlyeq <?> 
    <?> precsim <?> 
    <?> succsim <?> 
    <?> nprec <?> 
    <?> nsucc <?> 


// SET OPERATIONS
    <?> in <?> 
    <?> notin <?> 
    <?> owns <?> 
    <?> intersection <?> 
    <?> union <?> 
    <?> setminus <?> 
    <?> slash <?> 
    <?> subset <?> 
    <?> subseteq <?> 
    <?> supset <?> 
    <?> supseteq <?> 
    <?> nsubset <?> 
    <?> nsubseteq <?> 
    <?> nsupset <?> 
    <?> nsupseteq <?> 
    emptyset 
    aleph 
    setN 
    setZ 
    setQ 
    setR 
    setC 


// FUNCTIONS
    abs{<?>} 
    fact {<?>} 
    sqrt{<?>} 
    nroot{<?>}{<?>} 
    <?>^{<?>}
    func e^{<?>} 
    ln(<?>) 
    exp(<?>) 
    log(<?>) 
    sin(<?>) 
    cos(<?>) 
    tan(<?>) 
    cot(<?>) 
    sinh(<?>) 
    cosh(<?>) 
    tanh(<?>) 
    coth(<?>) 
    arcsin(<?>) 
    arccos(<?>) 
    arctan(<?>) 
    arccot(<?>) 
    arsinh(<?>) 
    arcosh(<?>) 
    arctanh(<?>) 
    arcoth(<?>) 


// OPERATORS
    lim <?> 
    sum <?> 
    prod <?> 
    coprod <?> 
    int <?> 
    iint <?> 
    iiint <?> 
    lint <?> 
    llint <?> 
    lllint <?> 
    lim from{<?>} <?> 
    sum from{<?>} <?> 
    prod from{<?>} <?> 
    coprod from{<?>} <?> 
    int from{<?>} <?> 
    iint from{<?>} <?> 
    iiint from{<?>} <?> 
    lint from{<?>} <?> 
    llint from{<?>} <?> 
    lllint from{<?>} <?> 
    lim to{<?>} <?> 
    sum to{<?>} <?> 
    prod to{<?>} <?> 
    coprod to{<?>} <?> 
    int to{<?>} <?> 
    iint to{<?>} <?> 
    iiint to{<?>} <?> 
    lint to{<?>} <?> 
    llint to{<?>} <?> 
    lllint to{<?>} <?> 
    lim from{<?>} to{<?>} <?> 
    sum from{<?>} to{<?>} <?> 
    prod from{<?>} to{<?>} <?> 
    coprod from{<?>} to{<?>} <?> 
    int from{<?>} to{<?>} <?> 
    iint from{<?>} to{<?>} <?> 
    iiint from{<?>} to{<?>} <?> 
    lint from{<?>} to{<?>} <?> 
    llint from{<?>} to{<?>} <?> 
    lllint from{<?>} to{<?>} <?> 


// ATTRIBUTES
    acute <?> 
    grave <?> 
    breve <?> 
    circle <?> 
    dot <?> 
    ddot <?> 
    dddot <?> 
    bar <?> 
    vec <?> 
    tilde <?> 
    hat <?> 
    check <?> 
    widevec {<?>} 
    widetilde {<?>} 
    widehat {<?>} 
    overline {<?>} 
    underline {<?>} 
    overstrike {<?>} 
    phantom {<?>} 
    bold <?> 
    ital <?> 
    size <?> {<?>} 
    font <?> {<?>} 
    color black {<?>} 
    color blue {<?>} 
    color green {<?>} 
    color red {<?>} 
    color cyan {<?>} 
    color magenta {<?>} 
    color yellow {<?>} 


// BRACKETS
    {<?>} 
    (<?>) 
    [<?>] 
    ldbracket <?> rdbracket 
    lbrace <?> rbrace 
    langle <?> rangle 
    langle <?> mline <?> rangle 
    lceil <?> rceil 
    lfloor <?> rfloor 
    lline <?> rline 
    ldline <?> rdline 
    left ( <?> right ) 
    left [ <?> right ] 
    left ldbracket <?> right rdbracket 
    left lbrace <?> right rbrace 
    left langle <?> right rangle 
    left langle <?> mline <?> right rangle 
    left lceil <?> right rceil 
    left lfloor <?> right rfloor 
    left lline <?> right rline 
    left ldline <?> right rdline 
    {<?>} overbrace {<?>} 
    {<?>} underbrace {<?>} 


// FORMATS
    <?>^{<?>}
    <?>_{<?>}
    <?> lsup{<?>} 
    <?> lsub{<?>} 
    <?> csup{<?>} 
    <?> csub{<?>} 
    newline 
    `
    ~
    nospace {<?>} 
    alignl <?> 
    alignc <?> 
    alignr <?> 
    binom{<?>}{<?>} 
    stack{<?> # <?> # <?>} 
    matrix{<?> # <?> ## <?> # <?>} 


// OTHERS
    infinity 
    partial 
    nabla 
    exists 
    notexists 
    forall 
    hbar 
    lambdabar 
    Re 
    Im 
    wp 
    leftarrow 
    rightarrow 
    uparrow 
    downarrow 
    dotslow 
    dotsaxis 
    dotsvert 
    dotsup 
    dotsdown 


// GREEK ALPHABET (case-sensitive)
    alpha/ALPHA
    beta/BETA
    gamma/GAMMA
    delta/DELTA
    epsilon/EPSILON
    zeta/ZETA
    eta/ETA
    theta/THETA
    iota/IOTA
    kappa/KAPPA
    lambda/LAMBDA
    mu/MU
    nu/NU
    xi/XI
    omicron/OMICRON
    pi/PI
    rho/RHO
    sigma/SIGMA
    tau/TAU
    upsilon/UPSILON
    phi/PHI
    chi/CHI
    psi/PSI
    omega/OMEGA

}
*/

var ErrMSG = 
[
'{',
'Number or String Type',
'}',
'^',
'Word | Number | etc.'
]
var EXIT_FAILURE = ErrMSG.length-1

var stack = {
parens:0,
brackets:0,
braces:0
}

var buffer = 
[
{ id:en.OpenCurly,val:'{' },
{ id:en.Idnum,val:'15' },
{ id:en.CloseCurly,val:'}' },
{ id:en.FOFXor,val:'^'  },
{ id:en.OpenCurly,val:'{' },
{ id:en.Idnum,val:'16' },
{ id:en.CloseCurly,val:'}' },
]

/*
var parser = {
0:function(){ var j = ++arguments[0]; stack.braces++; var state00 = { 1:parser[1],2:parser[2] }; if(state00[parser['7F2DB423A49B305459147332FB01CF87'][j].id]){ j = state00[parser['7F2DB423A49B305459147332FB01CF87'][j].id](j); } else { throw parser['44CDEB54C6F2AEBAD54611201C26D6F0'](j,ErrMSG[1]) } return j },
1:function(){ return ++arguments[0] },
2:function(){ var j = arguments[0]; if(!stack.braces){ throw parser['44CDEB54C6F2AEBAD54611201C26D6F0'](j,ErrMSG[0]+' or '+ErrMSG[1]) } else { stack.braces--; } return ++arguments[0] },
3:function(){ var j = ++arguments[0]; var state00 = { 0:parser[0],1:parser[1] }; if(state00[parser['7F2DB423A49B305459147332FB01CF87'][j].id]){ j = state00[parser['7F2DB423A49B305459147332FB01CF87'][j].id](j) } else { throw parser['44CDEB54C6F2AEBAD54611201C26D6F0'](j,ErrMSG[0]+' or '+ErrMSG[1]) } return j },
'7F2DB423A49B305459147332FB01CF87':{}, // extant memory buffer
'44CDEB54C6F2AEBAD54611201C26D6F0':function(){ var j = arguments[0]; var k = arguments[1]; throw 'Euclid parser: *** Error *** - Line 0000: Unexpected token ( '+parser['7F2DB423A49B305459147332FB01CF87'][j].val+' ) - Expected '+k } // OnError
}
*/

function loader() { // function loader ()
    srcTranslated.value = ''
    return
}

function clear_window() { // clear_window ()
    srcTranslated.value = ''
    return
}

function MD5() { // generate_MD5 ()
    srcTranslated.value = Math.md5(srcCode.value)
    return
}

function translatorTool() { // translatorTool ()
    srcTranslated.value = 'Processing..'
    var EXIT_SUCCESS = true
    var j = 0
    var J = buffer.length
    parser['7F2DB423A49B305459147332FB01CF87'] = buffer
    try{
        while(j<J){
            if(parser[buffer[j].id])
            {
                j = parser[buffer[j].id](j)
            }
            else
            {
                throw parser['44CDEB54C6F2AEBAD54611201C26D6F0'](j,EXIT_FAILURE)
            }
        }
        var status = {
            true:function(){ return 'Matching number of '+arguments[0]+' \n' },
            false:function(){ return '' }
        }
        EXIT_FAILURE = 
        status[(stack.parens!=0)]('parenthesis')+
        status[(stack.brackets!=0)]('square brackets')+
        status[(stack.braces!=0)]('curly braces')
        if(EXIT_FAILURE){
            throw parser['44CDEB54C6F2AEBAD54611201C26D6F0'](J-1,EXIT_FAILURE)
        }
        else
        {
            srcTranslated.value = 'String successfully parsed'
        }
    } catch (e) {
        console.log(e)
        srcTranslated.value = e
    }
}
