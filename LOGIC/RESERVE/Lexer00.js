/*

TITLE: 
    LEXER.js

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
    Lexical (analysis) engine:
    This tool annotates 
    keywords in the input stream

INPUT: 
    Prove: x plus y = z
    x = a
    y = b
    a plus b = z

OUTPUT: 
   [
    { type:Prove, link:[val:x,op:plus,val:y,op:equals,val:z] },
    { type:Clause, link:[val:x,op:equals,val:a] }, 
    { type:Clause, link:[val:y,op:equals,val:b] },
    { type:Clause, link:[val:a,op:plus,val:b,op:equals,val:z] },
   ]

SCRIPT TYPE: 
    Lexical analysis

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

Array.prototype.Repack = function()
{
   var obj = []
   this.map(function(v,i,me){
      if(v){
         obj.push(v)
      }
      return v
   })
   return obj
}

function AktToken(_in_)
{
    return _in_
}

function STAppend()
{
   var length = 0
   var v = arguments[0]
   var s = arguments[1]
   var incr = arguments[2] || 1
   v.literal += s
   if(s=='\n')
   {
      v.i++
      v.j = 0
   }
   else
   {
      v.j += incr
   }
   v.pos += incr
   return v
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

function scan_token(_in_)
{
   var en = new g_TPTtoken()
   var n = AktToken(_in_)
   var token_buffer = n.buffer.split('')
   var result = []
   var LENGTH = token_buffer.length
   var i = 0
   var j = 0
   var pos = 0
   var choose = {
      ' ':function() { var v = arguments[0]; v.tok = en.WhiteSpace; while( token_buffer[v.pos].match(/\s/) ){ v = STAppend(v,token_buffer[v.pos]) } v.literal = ' '; return v },
      '_':function() { var v = arguments[0]; v.tok = en.Ident; v.literal='_'; v.pos++; v.j++; return v },
      '#':function() { var v = arguments[0]; if((token_buffer[pos-1] && (token_buffer[pos-1]=='\n')) || (pos==0)){ v.tok = en.Comment; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\n]/) ){ v = STAppend(v,token_buffer[v.pos]) } v.comment += v.literal; v.literal=''; } else { v.tok = en.hashmark; v.literal = '#'; v.pos++; v.j++ } return v },
      '%':function() { var v = arguments[0]; v.tok = en.Comment; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\n]/) ){ v = STAppend(v,token_buffer[v.pos]) } v.comment += v.literal; v.literal=''; return v },
      '"':function() { var v = arguments[0]; v.tok = en.String; v.literal = '"'; v.pos++; v.j++; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\"]/) ){ v = STAppend(v,token_buffer[v.pos]) } return v },
      "'":function() { var v = arguments[0]; v.tok = en.SQString; v.literal = "'"; v.pos++; v.j++; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\']/) ){ v = STAppend(v,token_buffer[v.pos]) } return v },
      '(':function() { var v = arguments[0]; v.tok = en.OpenBracket; v.literal='('; v.pos++; v.j++; return v },
      ')':function() { var v = arguments[0]; v.tok = en.CloseBracket; v.literal=')'; v.pos++; v.j++; return v },
      '{':function() { var v = arguments[0]; v.tok = en.OpenCurly; v.literal='{'; v.pos++; v.j++; return v },
      '}':function() { var v = arguments[0]; v.tok = en.CloseCurly; v.literal='}'; v.pos++; v.j++; return v },
      '[':function() { var v = arguments[0]; v.tok = en.OpenSquare; v.literal='['; v.pos++; v.j++; return v },
      ']':function() { var v = arguments[0]; v.tok = en.CloseSquare; v.literal=']'; v.pos++; v.j++; return v },
      '^':function() { var v = arguments[0]; v.tok = en.FOFXor; v.literal='^'; v.pos++; v.j++; return v },
      '<':function() { var v = arguments[0]; v.tok = en.LesserSign; v.literal='<'; v.pos++; v.j++; return v },
      '>':function() { var v = arguments[0]; v.tok = en.GreaterSign; v.literal='>'; v.pos++; v.j++; return v },
      '=':function() { var v = arguments[0]; v.tok = en.EqualSign; v.literal='='; v.pos++; v.j++; return v },
      '~':function() { var v = arguments[0]; v.tok = en.TildeSign; v.literal='~'; v.pos++; v.j++; return v },
      '!':function() { var v = arguments[0]; v.tok = en.Exclamation; v.literal='!'; v.pos++; v.j++; return v },
      '?':function() { var v = arguments[0]; v.tok = en.QuestionMark; v.literal='?'; v.pos++; v.j++; return v },
      ',':function() { var v = arguments[0]; v.tok = en.Comma; v.literal=','; v.pos++; v.j++; return v },
      ';':function() { var v = arguments[0]; v.tok = en.Semicolon; v.literal=';'; v.pos++; v.j++; return v },
      ':':function() { var v = arguments[0]; v.tok = en.Colon; v.literal=':'; v.pos++; v.j++; return v },
      '-':function() { var v = arguments[0]; v.tok = en.Hyphen; v.literal='-'; v.pos++; v.j++; return v },
      '+':function() { var v = arguments[0]; v.tok = en.Plus; v.literal='+'; v.pos++; v.j++; return v },
      '*':function() { var v = arguments[0]; v.tok = en.Mult; v.literal='*'; v.pos++; v.j++; return v },
      '.':function() { var v = arguments[0]; v.tok = en.Fullstop; v.literal='.'; v.pos++; v.j++; return v },
      '\|':function() { var v = arguments[0]; v.tok = en.Pipe; v.literal='|'; v.pos++; v.j++;  return v},
      '/':function() { var v = arguments[0]; v.tok = en.Slash; v.literal='/'; v.pos++; v.j++; return v},
      '&':function() { var v = arguments[0]; v.tok = en.Ampersand; v.literal='&'; v.pos++; v.j++; return v },
      '$':function() { var v = arguments[0]; v.tok = en.Dollar; v.literal='$'; v.pos++; v.j++; return v },
      '\n':function() { var v = arguments[0]; v.tok = en.Newline; v.literal='\n'; v.pos++; v.i++; v.j=0; return v },
      '\|\|'::function() { var v = arguments[0]; v.tok = en.FOFROr; v.literal='||'; v.pos += 2; v.j += 2; return v },
      '<=':function() { var v = arguments[0]; v.tok = en.FOFRLImpl; v.literal='<='; v.pos += 2; v.j += 2; return v },
      '&&':function() { var v = arguments[0]; v.tok = en.FOFAnd; v.literal='&&'; v.pos += 2; v.j += 2; return v },
      '##':function() { var v = arguments[0]; v.tok = en.dblhashmark; v.literal='##'; v.pos += 2; v.j += 2; return v },
      '=>':function() { var v = arguments[0]; v.tok = en.FOFLRImpl; v.literal='=>'; v.pos += 2; v.j += 2; return v },
      '>=':function() { var v = arguments[0]; v.tok = en.GreaterEq; v.literal='>='; v.pos += 2; v.j += 2; return v }, 
      '>>':function() { var v = arguments[0]; v.tok = en.MuchGreater; v.literal='>>'; v.pos += 2; v.j += 2; return v },
      '<<':function() { var v = arguments[0]; v.tok = en.MuchLess; v.literal='<<'; v.pos += 2; v.j += 2; return v },
      '<>':function() { var v = arguments[0]; v.tok = en.NegEqual; v.literal='<>'; v.pos += 2; v.j += 2; return v },
      '-+':function() { var v = arguments[0]; v.tok = en.MinusPlus; v.literal='-+'; v.pos += 2; v.j += 2; return v },
      '+-':function() { var v = arguments[0]; v.tok = en.PlusMinus; v.literal='+-'; v.pos += 2; v.j += 2; return v },
      '~\|':function() { var v = arguments[0]; v.tok = en.FOFNor; v.literal='~|'; v.pos += 2; v.j += 2; return v },
      '&\|':function() { var v = arguments[0]; v.tok = en.FOFNand; v.literal='&|'; v.pos += 2; v.j += 2; return v },
      '!=':function() { var v = arguments[0]; v.tok = en.NegEqual; v.literal='!='; v.pos += 2; v.j += 2; return v },
      '/*':function() { var v = arguments[0]; v.tok = en.LMultilineComment; v.literal='/*'; v.pos += 2; v.j += 2; while( (token_buffer[v.pos] && token_buffer[v.pos+1]) && token_buffer[v.pos].match(/[^\*]/) && token_buffer[v.pos+1].match(/[^\/]/) ){ v = STAppend(v,token_buffer[v.pos]) } v.comment += v.literal; v.literal=''; return v },
      '*/':function() { var v = arguments[0]; v.tok = en.RMultilineComment; v.comment='*/'; v.pos += 2; v.j += 2; return v },
      '//':function() { var v = arguments[0]; v.tok = en.Comment; v.comment='//'; v.pos += 2; v.j += 2; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\n]/) ){ v = STAppend(v,token_buffer[v.pos]) } v.comment += v.literal; v.literal=''; return v },
      '<~>':function() { var v = arguments[0]; v.tok = en.FOFXor; v.literal='<~>'; v.pos += 3; v.j += 3; return v },
      '<=>':function() { var v = arguments[0]; v.tok = en.FOFEquiv; v.literal='<=>'; v.pos += 3; v.j += 3; return v },
      'match_idAlphaNum':function(){ var v = arguments[0]; v.tok = en.SemIdent; v.literal = token_buffer[v.pos] + token_buffer[v.pos+1]; v.pos += 2; v.j += 2; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[\w\d_]/) ){ v = STAppend(v,token_buffer[v.pos]) } return v },
      'match_digit':function(){ var v = arguments[0]; v.tok = en.Idnum; while( token_buffer[v.pos].match(/[\d\.]/) ){ v = STAppend(v,token_buffer[v.pos]) } return v },
      'match_id':function(){ var v = arguments[0]; v.tok = en.Identifier; while( token_buffer[v.pos].match(/[\w_]/i) ){ v = STAppend(v,token_buffer[v.pos]) } return v },
      'OnError':function(s) { throw 'scan_token: *** Error *** - Illegal token or character - '+s }
   } // choose {}
   while(pos<LENGTH)
   {
      var v = { tok:'',comment:'',literal:'',i:i,j:j,pos:pos }
      var ch00 = token_buffer[pos]
      var ch01 = token_buffer[pos+1]
      var ch02 = token_buffer[pos+2]
      if((ch00 && ch01 && ch02) &&
      choose[ch00+ch01+ch02])
      {
         v = choose[ch00+ch01+ch02](v)
      }
      else if((ch00 && ch01) && 
      ch00.match(/[\w_]/i) && 
      ch01.match(/[\w\d_]/i))
      {
         v = choose['match_idAlphaNum'](v)
      }
      else if((ch00 && ch01) &&
      choose[ch00+ch01])
      {
         v = choose[ch00+ch01](v)
      }
      else if(ch00 && ch00.match(/[\w_]/i))
      {
         v = choose['match_id'](v)
      }
      else if(ch00 && ch00.match(/\d/))
      {
         v = choose['match_digit'](v)
      }
      else if((ch00) &&
      choose[ch00])
      {
         v = choose[ch00](v)
      }
      else
      {
         choose['OnError'](token_buffer(pos))
      }
      token_buffer[pos] = ''
      if(v.tok)
      {
         var w            = {} 
         w.tok            = v.tok
         w.literal        = v.literal 
         w.source         = 0
         w.source         = 0
         w.stream_type    = 0
         w.line           = i
         w.column         = j
         w.comment        = v.comment 
         i = v.i
         j = v.j
         pos = v.pos
         result.push(w)
      }
      else
      {
        pos++
        j++
      }
   }
   _in_.tok_sequence[_in_.current].token_buffer = result
   return _in_
}

function translatorTool() { // translatorTool ()
    srcTranslated.value = 'Processing..'
    var _in_ = { buffer:srcCode.value,tok_sequence:[{token_buffer:{}}],current:0 }
   srcTranslated.value = JSON.stringify(scan_token(_in_),0,1)
}