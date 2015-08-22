// Tool takes sample expressions and attempts to collapse them into a stable grammar (for the syntaxer)

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
}
