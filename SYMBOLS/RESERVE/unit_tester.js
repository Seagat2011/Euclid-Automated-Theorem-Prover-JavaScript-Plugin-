
function __import(e){
    srcTranslated.value = e.data.value.join('\n')
    var sentence = e.data.value
}

var file00 = "mysql-wn-data.99.sql.js.00"
//var mysql_wn_data_99 = new Worker(file00)
//mysql_wn_data_99.addEventListener('message',__import,'logic.js')

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

function AktToken(_in)
{
    return _in
}

function STAppend()
{
   var length = 0
   var v = arguments[0]
   var s = arguments[1]
   var incr = arguments[2] || 1
   v.literal += s
   v.j += incr
   v.pos += incr
   return v
}

function g_TPTtoken()
{
   this.NoToken       = 1
   this.WhiteSpace    = (2*this.NoToken)
   this.Comment       = (2*this.WhiteSpace)
   this.Ident         = (2*this.Comment)
   this.Idnum         = (2*this.Ident)
   this.SemIdent      = (2*this.Idnum)
   this.String        = (2*this.SemIdent)
   this.SQString      = (2*this.String)
   this.PosInt        = (2*this.SQString)
   this.OpenBracket   = (2*this.PosInt)
   this.CloseBracket  = (2*this.OpenBracket)
   this.OpenCurly     = (2*this.CloseBracket)
   this.CloseCurly    = (2*this.OpenCurly)
   this.OpenSquare    = (2*this.CloseCurly)
   this.CloseSquare   = (2*this.OpenSquare)
   this.LesserSign    = (2*this.CloseSquare)
   this.GreaterSign   = (2*this.LesserSign)
   this.EqualSign     = (2*this.GreaterSign)
   this.NegEqualSign  = (2*this.EqualSign)
   this.TildeSign     = (2*this.NegEqualSign)
   this.Exclamation   = (2*this.TildeSign)
   this.AllQuantor    = (this.Exclamation)
   this.QuestionMark  = (2*this.Exclamation)
   this.ExistQuantor  = (this.QuestionMark)
   this.Comma         = (2*this.QuestionMark)
   this.Semicolon     = (2*this.Comma)
   this.Colon         = (2*this.Semicolon)
   this.Hyphen        = (2*this.Colon)
   this.Plus          = (2*this.Hyphen)
   this.Mult          = (2*this.Plus)
   this.Fullstop      = (2*this.Mult)
   this.Dollar        = (2*this.Fullstop)
   this.Slash         = (2*this.Dollar)
   this.Pipe          = (2*this.Slash)
   this.FOFOr         = (this.Pipe)
   this.Ampersand     = (2*this.Pipe)
   this.FOFAnd        = (this.Ampersand)
   this.FOFLRImpl     = (2*this.Ampersand)
   this.FOFRLImpl     = (2*this.FOFLRImpl)
   this.FOFEquiv      = (2*this.FOFRLImpl)
   this.FOFXor        = (2*this.FOFEquiv)
   this.FOFNand       = (2*this.FOFXor)
   this.FOFNor        = (2*this.FOFNand)
   this.SkipToken     = (this.WhiteSpace|this.Comment)
   this.Identifier    = (this.Ident | this.Idnum)
   this.Name          = (this.Identifier |this.String)
   this.FOFBinOp      = (this.FOFAnd|this.FOFOr|this.FOFLRImpl|this.FOFRLImpl|this.FOFEquiv|this.FOFXor|this.FOFNand|this.FOFNor)
   this.FOFAssocOp    = (this.FOFAnd|this.FOFOr)
   this.LMultilineComment = (2*this.FOFNor)|this.Comment
   this.RMultilineComment = (2*this.LMultilineComment)
   this.Newline       = (2*this.RMultilineComment)
}

function scan_token(_in)
{
   var en = new g_TPTtoken()
   var n = AktToken(_in)
   var token_buffer = n.buffer.split('')
   var result = []
   var LENGTH = token_buffer.length
   var i = 0
   var j = 0
   var pos = 0
   var choose = {
      ' ':function() { var v = arguments[0]; v.tok = en.WhiteSpace; while( token_buffer[v.pos].match(/\s/) ){ v = STAppend(v,token_buffer[v.pos]) } v.literal = ' '; return v },
      '_':function() { var v = arguments[0]; v.tok = en.Ident; v.literal='_'; v.pos++; v.j++; return v },
      '#':function() { var v = arguments[0]; v.tok = en.Comment; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\n]/) ){ v = STAppend(v,token_buffer[v.pos]) } v.comment += v.literal; v.literal=''; return v },
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
      '|':function() { var v = arguments[0]; v.tok = en.Pipe; v.literal='|'; v.pos++; v.j++;  return v},
      '/':function() { var v = arguments[0]; v.tok = en.Slash; v.literal='/'; v.pos++; v.j++; return v},
      '&':function() { var v = arguments[0]; v.tok = en.Ampersand; v.literal='&'; v.pos++; v.j++; return v },
      '$':function() { var v = arguments[0]; v.tok = en.Dollar; v.literal='$'; v.pos++; v.j++; return v },
      '<~>':function() { var v = arguments[0]; v.tok = en.FOFXor; v.literal='<~>'; v.pos += 3; v.j += 3; return v },
      '<=>':function() { var v = arguments[0]; v.tok = en.FOFEquiv; v.literal='<=>'; v.pos += 3; v.j += 3; return v },
      '<=':function() { var v = arguments[0]; v.tok = en.FOFRLImpl; v.literal='<='; v.pos += 2; v.j += 2; return v },
      '=>':function() { var v = arguments[0]; v.tok = en.FOFLRImpl; v.literal='=>'; v.pos += 2; v.j += 2; return v },
      '~|':function() { var v = arguments[0]; v.tok = en.FOFNor; v.literal='~|'; v.pos += 2; v.j += 2; return v },
      '&|':function() { var v = arguments[0]; v.tok = en.FOFNand; v.literal='&|'; v.pos += 2; v.j += 2; return v },
      '!=':function() { var v = arguments[0]; v.tok = en.NegEqualSign; v.literal='!='; v.pos += 2; v.j += 2; return v },
      '/*':function() { var v = arguments[0]; v.tok = en.LMultilineComment; v.comment='/*'; while( (token_buffer[v.pos] && token_buffer[v.pos+1]) && token_buffer[v.pos].match(/[^\*]/) && token_buffer[v.pos+1].match(/[^\/]/) ){ v = STAppend(v,token_buffer[v.pos]+token_buffer[v.pos+1],2) } v.comment += v.literal; v.literal=''; return v },
      '*/':function() { var v = arguments[0]; v.tok = en.RMultilineComment; v.comment='*/'; v.pos += 2; v.j += 2; return v },
      '//':function() { var v = arguments[0]; v.tok = en.Comment; v.comment='//'; v.pos += 2; v.j += 2; while( token_buffer[v.pos] && token_buffer[v.pos].match(/[^\n]/) ){ v = STAppend(v,token_buffer[v.pos]) } v.comment += v.literal; v.literal=''; return v },
      '\n':function() { var v = arguments[0]; v.tok = en.Newline; v.literal='\n'; v.pos++; v.i++; v.j=0; return v },
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
         var w            = {} //new TokenCell(0)
         w.tok            = v.tok
         w.literal        = v.literal // DStrReset(v.literal)
         w.source         = 0// DStrReleaseRef(v.source)
         w.source         = 0// DStrGetRef(Source(_in))
         w.stream_type    = 0//SourceType(_in)
         w.line           = i // CurrLine(in)
         w.column         = j // CurrColumn(in)
         w.comment        = v.comment // DStrAlloc()
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
   _in.tok_sequence[_in.current].token_buffer = result
   return _in
}

function translatorTool() { // translatorTool ()
    srcTranslated.value = 'Processing..'
    var _in_ = { buffer:srcCode.value,tok_sequence:[{token_buffer:{}}],current:0 }
   srcTranslated.value = scan_token(_in_)
    //console.log(scan_token(_in))
    // mysql_wn_data_99.postMessage(srcCode.value)
}