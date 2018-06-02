/*-----------------------------------------------------------------------

File  : cio_fileops.h

Author: Stephan Schulz

Contents
 
  Simple operations on files.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jul 28 12:43:28 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CIO_FILEOPS){

var CIO_FILEOPS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function FileNameIsAbsolute(name)
{
   return (name[0]=='/')
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_filevars.h

Author: Stephan Schulz

Contents
 
  Functions for managing file-stored "variable = value;" pairs.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Apr  8 16:00:49 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CIO_FILEVARS){

var CIO_FILEVARS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_filevarscell()
{
    function obj()
    {
        this.names = new PStack_p()
        this.vars = new StrTree_p()
    }
    return obj
}
var FileVarsCell = typedef_struct_filevarscell()
var FileVars_p = typedef_struct_filevarscell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function FileVarsCellAlloc()
{
   return SizeMalloc(FileVarsCell)
}
function FileVarsCellFree(junk)
{
   SizeFree(junk, FileVarsCell)
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_initio.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Rather trivial code for initializing all I/O related stuff once and
  in one go.

  Copyright 2005 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Mar 17 11:20:32 UYT 2005
    New

-----------------------------------------------------------------------*/

if(!CIO_INITIO){

var CIO_INITIO = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var TPTP_dir;

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_multiplexer.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Code for handling several communication channels.

  Copyright 2011 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Fri Mar 11 21:00:09 CET 2011
    New

-----------------------------------------------------------------------*/

if(!CIO_MULTIPLEXER){

var CIO_MULTIPLEXER = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_tcp_channel_cell()
{
    function obj()
    {
        this.sock
        this.in = new PQueue_p()
        this.out = new PQueue_p()
    }
    return obj
}
var TCPChannelCell = typedef_struct_tcp_channel_cell()
var TCPChannel_p = typedef_struct_tcp_channel_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* TEMPL
function XXXCellAlloc()
{
   return (XXXCell*)SizeMalloc(sizeof(XXXCell)
}
function XXXCellFree(junk)
{
    SizeFree(junk, sizeof(XXXCell)
}

*/

function TCPChannelCellAlloc()
{
   return SizeMalloc(TCPChannelCell)
}
function TCPChannelCellFree(junk)
{
   SizeFree(junk, TCPChannelCell)
}

function TCPChannelHasOutMsg(channel)
{
   return !PQueueEmpty(channel.out)
}

function TCPChannelGetInMsg(channel)
{
   return PQueueGetNextP(channel.in)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_network.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Helper code for TCP connections and "message" based communication
  over TCP (each message corresponds to a transaction request and is
  packages as a message to allow parsing in whole).

  Copyright 2011 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Wed Mar  9 22:24:40 CET 2011
    New

-----------------------------------------------------------------------*/

if(!CIO_NETWORK){

var CIO_NETWORK = 1

/* send_msg(char* msg) -> len, bytes*/
/* char* recv_msg()...*/

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_MsgStatus()
{
    function obj()
    {
        this.NWIncomplete = 0
        this.NWError = 1
        this.NWConnClosed = 2
        this.NWSuccess = 3
    }
    return obj
}
var MsgStatus = typedef_enum_MsgStatus()


/* A single message */

function typedef_struct_tcp_msg_cell()
{
    function obj()
    {
      this.content = new DStr_p()
      this.len
      this.transmission_count
      this.len_buf = new Array
    }
    return obj
}
var TCPMsgCell = typedef_struct_tcp_msg_cell()
var TCPMsg_p = typedef_struct_tcp_msg_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function TCPMsgCellAlloc()
{
   return SizeMalloc(TCPMsgCell)
}
function TCPMsgCellFree(junk)
{
   SizeFree(junk, TCPMsgCell)
}

function TCP_MSG_COMPLETE(msg)
{
   return (msg.len == msg.transmission_count)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_output.h

Author: Stephan Schulz

Contents
 
  Simple functions for secure opening of output files with -
  convention and error checking. Much simpler than the input, because
  much less can go wrong with output...

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Nov 28 11:55:59 MET 1997
    New

-----------------------------------------------------------------------*/

if(!CIO_OUTPUT){

var CIO_OUTPUT = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function OUTPRINT(level, message)
{
   if(level<= OutputLevel){console.log(message)}
}

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

OutputLevel
GlobalOut
GlobalOutFD

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_scanner.h

Author: Stephan Schulz

Contents
 
  Datatypes for the scanner: TokenType, TokenCell, TokenRepCell

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Aug 28 01:48:03 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CIO_SCANNER){

var CIO_SCANNER = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Possible token type. This used to be a nice enum, but that
   restriced the set to no more than 32 distinct tokens. As a n
   unsigned long long, we can accomodate at least 64 tokens.

   Note that it is possible to define additional classes consisting of 
   more than one particular token (see e.g. SkipToken). If this list
   is extended, you also need to extend token_print_rep[] in
   cio_scanner.c. */

function typedef_TokenType()
{
   this.value = arguments[0] || 0
}
var TokenType = new typedef_TokenType()

function g_token()
{
   this.NoToken = 1
   this.WhiteSpace = (2*this.NoToken)
   this.Comment = (2*this.WhiteSpace)
   this.Ident = (2*this.Comment)
   this.Idnum = (2*this.Ident)
   this.SemIdent = (2*this.Idnum)
   this.String = (2*this.SemIdent)
   this.SQString = (2*this.String)
   this.PosInt = (2*this.SQString)
   this.OpenBracket = (2*this.PosInt)
   this.CloseBracket = (2*this.OpenBracket)
   this.OpenCurly = (2*this.CloseBracket)
   this.CloseCurly = (2*this.OpenCurly)
   this.OpenSquare = (2*this.CloseCurly)
   this.CloseSquare = (2*this.OpenSquare)
   this.LesserSign = (2*this.CloseSquare)
   this.GreaterSign = (2*this.LesserSign)
   this.EqualSign = (2*this.GreaterSign)
   this.NegEqualSign = (2*this.EqualSign)
   this.TildeSign = (2*this.NegEqualSign)
   this.Exclamation = (2*this.TildeSign)
   this.AllQuantor = (this.Exclamation)
   this.QuestionMark = (2*this.Exclamation)
   this.ExistQuantor = (this.QuestionMark)
   this.Comma = (2*this.QuestionMark)
   this.Semicolon = (2*this.Comma)
   this.Colon = (2*this.Semicolon)
   this.Hyphen = (2*this.Colon)
   this.Plus = (2*this.Hyphen)
   this.Mult = (2*this.Plus)
   this.Fullstop = (2*this.Mult)
   this.Dollar = (2*this.Fullstop)
   this.Slash = (2*this.Dollar)
   this.Pipe = (2*this.Slash)
   this.FOFOr = (this.Pipe)
   this.Ampersand = (2*this.Pipe)
   this.FOFAnd = (this.Ampersand)
   this.FOFLRImpl = (2*this.Ampersand)
   this.FOFRLImpl = (2*this.FOFLRImpl)
   this.FOFEquiv = (2*this.FOFRLImpl)
   this.FOFXor = (2*this.FOFEquiv)
   this.FOFNand = (2*this.FOFXor)
   this.FOFNor = (2*this.FOFNand)
   this.SkipToken = (this.WhiteSpace | this.Comment)
   this.Identifier = (this.Ident | this.Idnum)
   this.Name = (this.Identifier | this.String)
   this.FOFBinOp = (this.FOFAnd|this.FOFOr|this.FOFLRImpl|this.FOFRLImpl|this.FOFEquiv|this.FOFXor|this.FOFNand|this.FOFNor)
   this.FOFAssocOp = (this.FOFAnd|this.FOFOr)
}

/* If your application parses multiple format you can use this to
   distinguish them: */

function typedef_enum_IOFormat()
{
    function obj()
    {
        this.LOPFormat = 1<<0
        this.TPTPFormat = 1<<1
        this.TSTPFormat = 1<<2
    }
    return obj
}
var IOFormat = typedef_enum_IOFormat()


function typedef_struct_tokenrepcell()
{
    function obj()
    {
        this.key = new TokenType()
        this.rep
    }
    return obj
}
var TokenRepCell = typedef_struct_tokenrepcell()
var TokenRep_p = typedef_struct_tokenrepcell()

function typedef_struct_tokencell()
{
    function obj()
    {
        this.tok = new TokenType()
        this.literal = new DStr_p()
        this.longnumval
        this.comment = new DStr_p()
        this.skipped
        this.source = new DStr_p()
        this.stream_type = new StreamType()
        this.line
        this.column
    }
    return obj
}
var TokenCell = typedef_struct_tokencell()
var Token_p = typedef_struct_tokencell()

var MAXTOKENLOOKAHEAD = 4

function typedef_struct_scannercell()
{
    function obj()
    {
        this.source = new Stream_p()
        this.default_dir = new DStr_p()
        this.format = new IOFormat()
        this.accu = new DStr_p()
        this.ignore_comments = false
        this.include_key
        this.tok_sequence = new TokenCell(MAXTOKENLOOKAHEAD)
        this.current
        this.include_pos
    }
    return obj
}
var ScannerCell = typedef_struct_scannercell()
var Scanner_p = typedef_struct_scannercell()

    
/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function TokenCellAlloc()
{
   return SizeMalloc(TokenCell)
}
function TokenCellFree(junk)
{
   SizeFree(junk, TokenCell)
}
function ScannerCellAlloc()
{
   return SizeMalloc(ScannerCell)
}
function ScannerCellFree(junk)
{
   SizeFree(junk, ScannerCell)
}

function Source(scanner)
{
   return (scanner.source).source
}
function SourceType(scanner)
{
   return (scanner.source).stream_type
}
function LookChar(scanner, look)
{
   return StreamLookChar(scanner.source, look)
}
function CurrChar(scanner)
{
   return StreamCurrChar(scanner.source)
}
function CurrLine(scanner)
{
   return StreamCurrLine(scanner.source)
}
function CurrColumn(scanner)
{
   return StreamCurrColumn(scanner.source)
}
function NextChar(scanner)
{
   return StreamNextChar(scanner.source)
}

function ScannerSetFormat(scanner, fmt)
{
    scanner.format = (fmt)
    return scanner
}
function ScannerGetFormat(scanner)
{
   return scanner.format
}

function ScannerGetDefaultDir(scanner)
{
   return DStrView(scanner.default_dir)
}

function isstartidchar(ch)
{
   return (ch.match(/\w+/) || (ch == '_'))
}
function isidchar(ch)
{
   return (ch.match(/[\$a-z0-9]/i) || (ch == '_'))
}
function ischar(ch)
{
   return (ch)!=EOF
}
function isstartcomment(ch)
{
   return ((ch=='#') || (ch=='%'))
}

function TOKENREALPOS(pos)
{
   return (pos) % MAXTOKENLOOKAHEAD
}
function AktToken(_in_)
{
   return _in_.tok_sequence[_in_.current]
}
function AktTokenType(_in_)
{
   return AktTokenin.tok
}
function LookToken(_in_,look)
{
   return _in_.tok_sequence[TOKENREALPOS(_in_.current+(look))]
}

function TestInpTok(_in_, toks)
{
    return TestTok(AktToken(_in_), (toks))
}
function TestInpId(_in_, ids)
{
    return TestId(AktToken(_in_), (ids))
}
function TestInpIdnum(_in_, ids)
{
    return TestIdnum(AktToken(_in_), (ids))
}
function TestInpNoSkip(_in_)
{
    return !(AktTokenin.skipped)
}
function TestInpTokNoSkip(_in_, toks)
{
   return (TestInpNoSkip(_in_) && TestInpTok(_in_, toks))
}

function AcceptInpTok(_in_, toks)
{
    _in_ = CheckInpTok(_in_, (toks))
    _in_ = NextToken(_in_)
    return _in_
}

function AcceptInpTokNoSkip(_in_, toks)
{
    _in_ = CheckInpTokNoSkip((_in_), (toks))
    _in_ = NextToken(_in_)
    return _in_
}

function AcceptInpId(_in_, ids)
{
    _in_ = CheckInpId(_in_, (ids))
    _in_ = NextToken(_in_)
    return _in_
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cco_signals.h

Author: Stephan Schulz

Contents
 
  Signal handler for limit signals...not really necessary, but may
  work around some Solaris bugs. Also some support infrastructure... 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Nov  6 14:50:28 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CCO_SIGNALS){

var CCO_SIGNALS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_simplestuff.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Simple functions for simple operations that don't quite fit
  elsewhere.

  Copyright 2012 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Fri Jul 27 01:33:21 CEST 2012
    New

-----------------------------------------------------------------------*/

if(!CIO_SIMPLESTUFF){

var CIO_SIMPLESTUFF = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_streams.h

Author: Stephan Schulz

Contents
 
  Definitions for a stream type, i.e. an object associated with a file
  pointer (and possibly a file name), allowing read operations,
  arbitrary look-aheads, and maintaining line and column numbers for
  error messages.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Aug 20 00:02:32 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CIO_STREAMS){

var CIO_STREAMS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var MAXLOOKAHEAD = 64

/* Streams can read either from a file or from several predefined
   classes of strings. We use a StreamType 'virtual type' to denote
   this, because we can thus code the string type in a convenient
   way. */

function StreamType()
{
   this.value = arguments[0] || 0
}

/* The following data structure describes the state of a (named) input
   stream with lookahead-capability. Streams are stackable, with new
   data being read from the top of the stack. The empty stack is a
   NULL-valued pointer of type Inpstack_p! */
   
/* Only constant strings allowed here! */

function typedef_struct_streamcell()
{
    function obj()
    {
        this.structstreamcellnext
        this.source = new DStr_p()
        this.stream_type = new StreamType()
        this.longstring_pos
        this.file = new FILE()
        this.booleof_seen
        this.longline
        this.longcolumn
        this.intbufferMAXLOOKAHEAD
        this.intcurrent
    }
    return obj
}
var StreamCell = typedef_struct_streamcell()
var Stream_p = typedef_struct_streamcell()
var Inpstack_p = typedef_struct_streamcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var StreamTypeFile;
var StreamTypeInternalString;
var StreamTypeUserString;
var StreamTypeOptionString;

function StreamCellAlloc()
{
   return SizeMalloc(StreamCell)
}
function StreamCellFree(junk)
{
   SizeFree(junk, StreamCell)
}

function STREAMREALPOS(pos)
{
   return (pos) % MAXLOOKAHEAD
}

function StreamLookChar(stream, look)
{
    console.log('StreamLookChar() ',look<MAXLOOKAHEAD)
    return stream.buffer[STREAMREALPOS(stream.current+(look))]
}

function StreamCurrChar(stream)
{
   return stream.buffer[stream.current]
}
function StreamCurrLine(stream)
{
   return stream.line
}
function StreamCurrColumn(stream)
{
   return stream.column
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_tempfile.h

Author: Stephan Schulz

Contents

  Functions dealing with temporary files. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul 24 02:25:20 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CIO_TEMPFILE){

var CIO_TEMPFILE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_avlgeneric.h

Author: Stephan Schulz

Contents
 
  Macros for the creation of generic binary tree functions. Currently
  used for traversal functions only. Please note that the name is
  obsolete (used for convenience only). The functions currently
  implemented are generic for binary search trees, and binary search
  trees in E are splay trees by now.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat May 30 17:55:39 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CLB_AVLGENRIC){

var CLB_AVLGENERIC = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// MACRO: AVL_TRAVERSE_DECLARATION()
//
//   Produce a declaration for AVL traversal functions. Name is the name
//   prefix to use for the functions, type is the pointer type used in
//   tree construction.
//
/----------------------------------------------------------------------*/

function AVL_TRAVERSE_DECLARATION(name,type) // ## - concatenation
{
    //return PStack_p name##TraverseInit(type root);(type     name##TraverseNext(PStack_p state);
    var obj = {}
    obj[name+'TraverseInit'] = new Function('v','{}')
    obj[name+'TraverseNext'] = new Function('v','{}')
    return obj
}

/*-----------------------------------------------------------------------
//
// MACRO: AVL_TRAVERSE_DEFINITION()
//
//   Produce code for AVL traversal functions as follows:
//
//-----------------------------------------------------------------------
//
// Function: <name>TraverseInit()
//
//   Return a stack containing the path to the smallest element in the
//   avl tree.
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
//---------------------------------------------------------------------
//
// Function: <name>TraverseNext()
//
//   Given a stack describing a traversal state, return the next node
//   and update the stack.
//
// Global Variables: -
//
// Side Effects    : Updates stack
//
/----------------------------------------------------------------------*/

function AVL_TRAVERSE_DEFINITION(name,type)
{
    var obj = {}
    obj[name+'TraverseInit'] = new Function('root','{\
       var stack = new PStack_p()\
    \
       while(root)\
       {\
          stack = PStackPushP(stack, root);\
          root = root.lson;\
       }\
       return stack;\
    }')
    obj[name+'TraverseNext'] = new Function('v','{\
       var handle = new type()\
       var res = new type\
    \
       if(PStackEmpty(state))\
       {\
          return NULL;\
       }\
       res = PStackPopP(state);\
       handle = res.rson;\
       while(handle)\
       {\
          state = PStackPushP(state, handle);\
          handle = handle.lson;\
       }\
       return { res:res, handle:handle, state:state }\
    }')
    return obj

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

}

/*-----------------------------------------------------------------------

File  : clb_ddarrays.h

Author: Stephan Schulz

Contents
 
  Dynamic arrays of large data types - at the moment doubles only.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Aug  8 22:45:29 GMT 1999
    Copied from clb_pdarrays.h

-----------------------------------------------------------------------*/

if(!CLB_DDARRAYS){

var CLB_DDARRAYS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_ddarraycell()
{
    function obj()
    {
        this.size
        this.grow
        this.array = new Array()
    }
    return obj
}
var DDArrayCell = typedef_struct_ddarraycell()
var DDArray_p = typedef_struct_ddarraycell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function DDArrayCellAlloc()
{
   return SizeMalloc(DDArrayCell)
}
function DDArrayCellFree(junk) 
{
   SizeFree(junk, DDArrayCell)
}

function DDArrayAssign(array, idx, value)
{
   array[idx] = (value)
   return array
}

function DDArrayElement(array, idx)
{
   return DDArrayElementRef((array), (idx))
}

/*---------------------------------------------------------------------*/
/*                     Inline functions                                */
/*---------------------------------------------------------------------*/

	  
/*-----------------------------------------------------------------------
//
// Function: DDArrayElementRef()
//
//   Return a reference to an element in a dynamic array. This
//   reference is only good until the next call to this function! User
//   programs are expected to use this function only extremely rarely
//   and with special care. Use DDArrayElement()/DDArrayAssign()
//   instead. 
//
// Global Variables: -
//
// Side Effects    : May enlarge and move array.
//
/----------------------------------------------------------------------*/

function DDArrayElementRef( array,idx )
{
   console.log(array)
   console.log(idx >= 0)
   
   if(!(idx < array.size))
   {
      DDArrayEnlarge(array, idx)
   }
   return (array.array[idx])
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_defines.h

Author: Stephan Schulz

Contents
 
  Basic definition useful (very nearly) everywhere.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:28:25 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CLB_DEFINES){

var CLB_DEFINES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

if(!__cplusplus){
    /* Booleans (if we don't already have them */

    function typedef_enum_bool()
    {
        function obj()
        {
            this.false = 0
            this.true = 1
        }
        return obj
    }
    var bool = typedef_enum_bool()

    function CPPCAST(type) {} /* Nothing */
} else {
    /* C++ casts */
    function CPPCAST(type)
    {
       return type
    }
}

/* Trick the stupid type concept for polymorphic indices (hashes,
   trees) with int/pointer type. */

function typedef_union_int_or_p()
{
    function obj()
    {
        this.i_val
        this.p_val
    }
    return obj
}
var IntOrP = typedef_union_int_or_p()

if(CONSTANT_MEM_ESTIMATE){
    var INTORP_MEM = 4
    var LONG_MEM = 4
} else {
    function INTORP_MEM(){
        return 4
    }
    function LONG_MEM(){
        return 4
    }
}

/* The NULL pointer */

if(!NULL){
    if(!__cplusplus){
        var NULL = 0
    } else {
        var NULL = 0
    }
}

/* Allow for volatile functions if the compiler supports them - 
   gcc version egcs-2.90.23 980102 (egcs-1.0.1 release)
   apparently defines __GNUC__  but does not *sigh* */

if(NEVER_DEFINED){
    VOLATILE = volatile
} else {
    VOLATILE = 1
}

/* Generic cleanup function for pseudo-objects - the function has to
   know how to get rid of the passed data. */

/* Type of a comparison function for <stdlib>'s qsort */

var ulong_c;

/* E occasionally casts pointers to an integer type to induce an
   efficiently computable total ordering on pointers, or to compute a
   hash value for an arbitray pointer type. ptrdiff_t is a signed
   integer type and should be the right size on all reasonable
   platforms. Change this definition if your platform is not
   reasonable ;-).  */

function typedef_ptr_int()
{
   this.value = arguments[0] || 0
}
var ptrdiff_t = new typedef_ptr_int()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* Maximum and Minimum, Absolute values, Exclusive-or functions */

if(MAX){
MAX = undefined
}
function MAX(x,y)
{
   return (x)>(y)?(x):(y)
}

if(MIN){
MIN = undefined
}
function MIN(x,y)
{
   return (x)<(y)?(x):(y)
}

if(ABS){
    ABS = undefined
}
function ABS(x)
{
   return (x)>0? (x):-1*(x)
}

if(XOR){
    XOR = undefined
}
function XOR(x,y)
{
   return ((!(x))&&(y))||((x)&&(!(y)))
}

if(EQUIV){
    EQUIV = undefined
}
function EQUIV(x,y)
{
   return (((x))&&(y))||(!(x)&&(!(y)))
}


/* I cannot keep things in my mind ;-) */

var KILO = 1024
var MEGA = (KILO*KILO)

/* Convenience function */

if(PRINT_TSTP_STATUS){
    function TSTPOUT(file,msg){ console.log(file, "# SZS status %s(n", msg) }
    function TSTPOUTFD(fd,msg)
    {
        WRITE_STR(fd, "# SZS status ")
        WRITE_STR(fd, msg)
        WRITE_STR(fd, "(n")
    }
} else {
    function TSTPOUT(file, msg){ console.log(file,msg) }
    function TSTPOUTFD(fd,msg){ console.log(file,msg) }
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_dstacks.h

Author: Stephan Schulz

Contents
 
  Soemwhat efficient unlimited growth stacks for doubles.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Jun  7 12:21:16 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CLB_DSTACKS){

var CLB_DSTACKS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Double stack data type */

function DStackPointer()
{
   this.value = arguments[0] || 0
}

function typedef_struct_dstackcell()
{
    function obj()
    {
        this.size
        this.current = new DStackPointer()
        this.stack
    }
    return obj
}
var DStackCell = typedef_struct_dstackcell()
var DStack_p = typedef_struct_dstackcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var DSTACK_DEFAULT_SIZE = 32 /* Stacks grow exponentially (and never
				  shrink unless explicitly freed) -
				  take care */

function DStackCellAlloc()
{
   return SizeMalloc(DStackCell)
}
function DStackCellFree(junk)
{
   SizeFree(junk, DStackCell)
}

function DStackEmpty(stack)
{
   return (stack.current == 0)
}

function DStackGetSP(stack)
{
   return stack.current
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_dstrings.h

Author: Stephan Schulz

  Declarations for dynamic, arbitrary length strings
  (i.e. 0-terminated arays of characters). The conversion between
  DStrs and C-strings is as simple and efficient as possible. This
  implementation is optimized for strings with a certain behaviour,
  usually experienced when reading input: Most strings are fairly
  small, and for each set of strings the length distribution is fairly
  similar.

  Dstrings can also be used as a primitive form of reference-counted
  strings - functions for obtaining counted reference, releasing it,
  and delayed destruction of a still referenced object are
  provided. The use of these functions is optional and requires user
  discipline! 
 
  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Aug 15 17:01:33 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CLB_DSTRINGS){

CLB_DSTRINGS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_dstrcell()
{
    function obj()
    {
        this.string
        this.len
        this.mem
        this.refs
    }
    return obj
}
var DStrCell = typedef_struct_dstrcell()
var DStr_p = typedef_struct_dstrcell()

var DSTRGROW = 64

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/


function DStrCellAlloc()
{
   return SizeMalloc(DStrCell)
}
function DStrCellFree(junk)
{
   SizeFree(junk, DStrCell)
}

function DStrAppendDStr(strdes, str)
{
   return DStrAppendStr((strdes), DStrView(str))
}

function DStrLastChar(strdes)
{
   return DStrLen(strdes) ? DStrView(strdes)[DStrLen(strdes)-1]:'(0';
}

function DStrGetRef(strdes)
{
   return ((strdes)?(strdes.refs++):0),strdes
}

}


/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_error.h

Author: Stephan Schulz

Contents
 
  Functions and datatypes for handling and reporting errors, warnings,
  and dealing with simple system stuff.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:20:53 MET DST 1997
    New
<2> Wed Nov  3 13:30:39 CET 2004
    Added real memory code.

-----------------------------------------------------------------------*/

if(!CLB_ERROR){

CLB_ERROR = 1

if(HP_UX){
   function getrusage(a, b){ 
      return syscall(SYS_GETRUSAGE, a, b) 
   }
}


/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

EXIT_SUCCESS = 1<<0

function typedef_enum_ErrorCodes()
{
    function obj()
    {
        this.NO_ERROR = EXIT_SUCCESS
        this.PROOF_FOUND = EXIT_SUCCESS
        this.SATISFIABLE = 1<<2
        this.OUT_OF_MEMORY = 1<<3
        this.SYNTAX_ERROR = 1<<4
        this.USAGE_ERROR = 1<<5
        this.FILE_ERROR = 1<<6
        this.SYS_ERROR = 1<<7
        this.CPU_LIMIT_ERROR = 1<<8
        this.RESOURCE_OUT = 1<<9
        this.INCOMPLETE_PROOFSTATE = 1<<10
        this.OTHER_ERROR = 1<<11
        this.INPUT_SEMANTIC_ERROR = 1<<12
    }
    return obj
}
var ErrorCodes = typedef_enum_ErrorCodes()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var MAX_ERRMSG_ADD = 512
var MAX_ERRMSG_LEN = MAX_ERRMSG_ADD+MAXPATHLEN

var ErrStr
var TmpErrno;
var ProgName;

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_fixdarrays.h

Author: Stephan Schulz

Contents

  Rather trivial datatype for arrays of long integers with a known,
  fixed and and queryable size. 

  Copyright 2003 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jul  9 23:35:01 CEST 2003
    New

-----------------------------------------------------------------------*/

if(!CLB_FIXDARRAYS){

CLB_FIXDARRAYS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_fixd_array_cell()
{
    function obj()
    {
        this.array
        this.size
    }
    return obj
}
var FixedDArrayCell = typedef_struct_fixd_array_cell()
var FixedDArray_p = typedef_struct_fixd_array_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function FixedDArrayCellAlloc()
{
   return SizeMalloc(FixedDArrayCell)
}
function FixedDArrayCellFree(junk)
{
    SizeFree(junk, FixedDArrayCell)
}

function FixedDArraySize(array)
{
   return array.size
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_floattrees.h

Author: Stephan Schulz

Contents
 
  Definitions for SPLAY trees with long integer keys and up to two
  long or pointer values. Copied from clb_stringtrees.h

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Aug 21 11:55:40 GMT 1999
    Stilen from clb_numtrees.h

-----------------------------------------------------------------------*/

if(!CLB_FLOATTREES){

var CLB_FLOATTREES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* General purpose data structure for indexing objects by a (double)
   float  key. Integer values are supported directly, for all other objects
   pointers can be used (and need to be casted carefully by the
   wrapper functions). Objects pointed to by the value fields are not
   part of the data stucture and will not be touched by deallocating
   trees or tree nodes. */ 

function typedef_struct_floattreecell()
{
    function obj()
    {
        this.key
        this.val1 = new IntOrP()
        this.val2 = new IntOrP()
        this.floattreecelllson
        this.floattreecellrson
    }
    return obj
}
var FloatTreeCell = typedef_struct_floattreecell()
var FloatTree_p = typedef_struct_floattreecell()

function FloatTreeCellAlloc()
{
   return SizeMalloc(FloatTreeCell)
}
function FloatTreeCellFree(junk)
{
    SizeFree(junk, FloatTreeCell)
}

AVL_TRAVERSE_DECLARATION(FloatTree, FloatTree_p)
function FloatTreeTraverseExit(stack)
{
    PStackFree(stack)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_intmap.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Definitions and functions for a data type that maps natural numbers
  (including 0) to void* pointers, supporting assignments, retrieval,
  deletion, and iteration.

  Copyright 2004 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Dec 18 15:51:13 CET 2004
    New

-----------------------------------------------------------------------*/

if(!CLB_INTMAP){

var CLB_INTMAP = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_IntMapType()
{
    function obj()
    {
        this.IMEmpty = 1<<0
        this.IMSingle = 1<<1
        this.IMArray = 1<<2
        this.IMTree = 1<<3
    }
    return obj
}
var IntMapType = typedef_enum_IntMapType()

var MAX_TREE_DENSITY = 8
var MIN_TREE_DENSITY = 4
var IM_ARRAY_SIZE = MAX_TREE_DENSITY 

/* This is the main thing - a datatype that keeps key/value pairs and
 * allows inserting, updating, deleting, and ordered iteration. I
 * expect additons to be frequent and deletions to be rare. Element
 * access and iteration are the most frequent operations. We want this
 * time- and space efficient for many different key distributions. */

/* How many key/value pairs? May be slightly
    * larger than the real value, as keys,
    * associated to NULL are indistinguishable,
    * from unassociated keys. */
/* Smallest key (may be only key). Again, this
    * may be an overestimate, as we do not,
    * always correct this if a key is deleted,
    * from an array. */
/* Largest key (may be only key). Again, this
    * may be an overestimate, as we do not,
    * always correct this if a key is deleted,
    * from an array. */
/* For IMSingle */
/* For IMArray  */
/* For IMTree   */

function typedef_struct_intmap_cell()
{
    function obj()
    {
        this.type = new IntMapType()
        this.entry_no
        this.min_key
        this.max_key
        this.value
        this.array = new PDRangeArr_p()
        this.tree = new NumTree_p()
    }
    return obj
}
var IntMapCell = typedef_struct_intmap_cell()
var IntMap_p = typedef_struct_intmap_cell()

/* For IMSingle */
/* For IMArray  */
/* For IMTree */

function typedef_struct_intmap_iter_cell()
{
    function obj()
    {
        this.map = new IntMap_p()
        this.lower_key
        this.upper_key
        this.admin_data
        this.seen
        this.current
        this.tree_iter = new PStack_p()
    }
    return obj
}
var IntMapIterCell = typedef_struct_intmap_iter_cell()
var IntMapIter_p = typedef_struct_intmap_iter_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function IntMapCellAlloc()
{
   return SizeMalloc(IntMapCell)
}
function IntMapCellFree(junk)
{
    SizeFree(junk, IntMapCell)
}

function IntMapIterCellAlloc()
{
   return SizeMalloc(IntMapIterCell)
}
function IntMapIterCellFree(junk)
{
    SizeFree(junk, IntMapIterCell)
}

if(CONSTANT_MEM_ESTIMATE){
    var INTMAPCELL_MEM = 20
} else {
    function INTMAPCELL_MEM () {
        return 20
    }
}

function IntMapDStorage(map)
{
    var result
    switch(map.type){
        case IMArray:
        result = PDArrayStorage(map.values.array)
        break
    
        case IMTree:
        result = map.entry_no*NUMTREECELL_MEM
        break
    
        default:
        result = 0
    }
    return result
}

function IntMapStorage(map)
{
   return (INTMAPCELL_MEM+IntMapDStorage(map))
}

 

/*---------------------------------------------------------------------*/
/*                      Inline Functions                               */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: IntMapIterNext()
//
//   Return the next value/key pair in the map (or NULL/ndef) if the
//   iterator is exhausted.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function IntMapIterNext( iter,key )
{
    var res = NULL
    var handle = new NumTree_p()
    console.log(iter)
    console.log(key)
    if(!iter.map)
    {
      return NULL
    }

    switch(iter.map.type)
        {
        case IMEmpty:
            break
        case IMSingle:
            if(!iter.admin_data.seen)
            {
            iter.admin_data.seen = true
            key = iter.map.max_key
            res = iter.map.values.value
            }
            break
        case IMArray: 
            for(var i=iter.admin_data.current; i<= iter.upper_key; i++)
            {
            res = PDRangeArrElementP(iter.map.values.array, i)
                if(res)
                {
                   key = i
                   break
                }
            }
            iter.admin_data.current = i+1
            break
        case IMTree:
            while(handle = NumTreeTraverseNext(iter.admin_data.tree_iter))
            {
                if(handle)
                {
                   if(handle.key > iter.upper_key)
                   {
                      
                      break
                   }
                   if(handle.val1.p_val)
                   {
                      key = handle.key
                      res = handle.val1.p_val
                      break
                   }
                }
            }
            break
        default:
            console.log(false && "Unknown IntMap type.")
            break
    }
    return res
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_memory.h

Author: Stephan Schulz

  This module implements simple general purpose memory management
  routines that is efficient for problems with a very regular memory
  access pattern (like most theorem provers). In addition to the
  groundwork it also implements secure versions of standard functions
  making use of memory allocation.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Aug 13 21:56:20 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CLB_MEMORY){

var CLB_MEMORY = 1

if(USE_NEWMEM){

} else {

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Administrate deallocated memory blocks */

if(!__memcell__){
var __memcell__ = 1
function typedef_struct_memcell()
{
    function obj()
    {
        this.memcellnext
        this.NDEBUG
        this.longtest
        this.undefined
    }
    return obj
}
var MemCell = typedef_struct_memcell()
var Mem_p = typedef_struct_memcell()

}

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var MEM_ARR_SIZE = 8192
var MEM_FREE_PATTERN = 0xFAFBFAFA
var MEM_RSET_PATTERN = 0x00000000

/* Exported for use by inline
 * functions/Macros */
/* For estimating the real memory consumption of a data type - the
   default may be way of for some memory managers, but should be
   reasonably ok for many situations. If CONSTANT_MEM_ESTIMATE is on,
   a very rough but machine-independent estimate is used. */

if(CONSTANT_MEM_ESTIMATE){
    function MEMSIZE(type){ 
        return 20 // "There is a bug in the code! Everything has to work with constants."
    }
} else {
    function MEMSIZE(type)
    {
       return 20 
    }
}


if(USE_SYSTEM_MEM){
    if(NDEBUG){
        function SizeFree(junk, size){  free(junk); junk=NULL }
        function SizeMalloc(size){ return malloc(size) }
        ENSURE_NULL(junk)
        junk=NULL
    } else {
        function SizeFree(junk, size){ free(junk) }
        function SizeMalloc(size){ return malloc(size) }
        function ENSURE_NULL(junk){ /* Only defined in debug mode */ }
    }
} else {
    if(NDEBUG){
        function SizeFree(junk, size){ SizeFreeReal(junk, size); junk=NULL }
        function SizeMalloc(size){ return SizeMallocReal(size) }
        ENSURE_NULL(junk)
        junk=NULL
    } else {
        function SizeFree(junk, size){ SizeFreeReal(junk, size) }
        function SizeMalloc(size){ return SizeMallocReal(size) }
        ENSURE_NULL(junk) /* Only defined in debug mode */
    }
}

function IntArrayFree(array, size){
    SizeFree(array)
}

if(CLB_MEMORY_DEBUG){
    FREE = undefined
    junk=NULL
}

if(CLB_MEMORY_DEBUG2){
    FREE = undefined
    junk=NULL
}

/*-------------------------------------------------------------------------
  If you want to have a special Allocator and Deallocator for a
  datatype just copy the following templates to your .h-file and fill
  them in... The allocated structures will not be initialized - you
  need to write a function built on top of the macros if you want more
  functionality in you Allocator. 

function DataCellAlloc()
{
    return SizeMalloc(DataCell)
}

function DataCellFree(junk)
{
    SizeFree(junk, DataCell)
}

-------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: SizeMallocReal()
//
//   Returns a block of memory sized size using the internal
//   free-list. This block is freeable with free(), and in all
//   respects behaves like a normal malloc'ed block. 
//
// Global Variables: free_mem_list[] 
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function SizeMallocReal( size )
{
   var handle = new Mem_p()
   var mem_index
 
   console.log(size>=0)
  
   mem_index = size - sizeof(MemCell)
   
   if((mem_index>=0) && (mem_index<MEM_ARR_SIZE) && free_mem_list[mem_index])
   {
      console.log(free_mem_list[mem_index].test == MEM_FREE_PATTERN)
      console.log(free_mem_list[mem_index].test = MEM_RSET_PATTERN, true)
      handle = free_mem_list[mem_index]
      free_mem_list[mem_index] = free_mem_list[mem_index].next
   } 
   else
   {
      handle = SecureMalloc(Mem_p,size)
if(!NDEBUG){
        if((mem_index>=0) && (mem_index<MEM_ARR_SIZE))
        {
            console.log(handle.test = MEM_RSET_PATTERN, true)
        }
}
   }
if(CLB_MEMORY_DEBUG){ 
   size_malloc_mem+=size
   size_malloc_count++
}
if(CLB_MEMORY_DEBUG2){
   printf("\nBlock %p A: size %zd\n", handle, size)
}
   return handle
}

/*-----------------------------------------------------------------------
//
// Function: SizeFreeReal()
//
//  Returns a block sized size. Note: size has to be exact - you
//  should only give blocks to SizeFree() that have been allocated
//  with malloc(size) or SizeMalloc(size). Giving blocks that are to
//  big wastes memory, blocks that are to small will result in more
//  serious trouble (segmentation faults).
//
// Global Variables: free_mem_list[]
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function SizeFreeReal( junk,size )
{
   var mem_index
   
   console.log(junk!=NULL)
if(CLB_MEMORY_DEBUG2){
   console.log("\nBlock %p D: size %zd\n", junk, size)
}
   mem_index = size - sizeof(MemCell)
   if(mem_index>=0 && mem_index<MEM_ARR_SIZE)
   {
      junk.next = free_mem_list[mem_index]
      free_mem_list[mem_index] = junk
      console.log(free_mem_list[mem_index].test != MEM_FREE_PATTERN); 
      console.log(free_mem_list[mem_index].test = MEM_FREE_PATTERN)
   } 
   else
   {
      FREE(junk)
   }
if(CLB_MEMORY_DEBUG){ 
   size_free_mem+=size
   size_free_count++
}

} // SizeFreeReal()

} // #ifdef(USE_NEWMEM

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_newmem.h

Author: Stephan Schulz

  This module implements a simple general purpose memory management
  stystem that is efficient for problems with a very regular memory
  access pattern (like most theorem provers). In addition to the
  groundwork it also implements secure versions of standard functions
  making use of memory allocation. This is less elegant, but in most
  cases more efficient, than the old system.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Aug 13 21:56:20 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CLB_NEWMEM){

var CLB_NEWMEM = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Administrate deallocated memory blocks */

if(!__memcell__){
var __memcell__ = 1
function typedef_struct_memcell()
{
    function obj()
    {
        this.memcellnext
        this.NDEBUG
        this.longtest
        this.undefined
    }
    return obj
}
var MemCell = typedef_struct_memcell()
var Mem_p = typedef_struct_memcell()

}

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var MEM_ARR_SIZE = 1024
var MEM_ALIGN = 16
var MEM_CHUNKLIMIT = (1024/MEM_ALIGN) /* Objects smaller than this are
					    allocated in sets of MEM_MULTIPLIER */
var MEM_MULTIPLIER = 1024 
var MEM_FREE_PATTERN = 0xFAFBFAFA
var MEM_RSET_PATTERN = 0x00000000

if(!NDEBUG){
    junk=NULL

    function SizeFree(junk, size)
    {
        free(junk)
        junk=NULL
    }
    function SizeMalloc(size)
    {
        return SizeMallocReal(size)
    }
} else {
    function SizeMalloc(size)
    {
        return SizeMallocReal(size)
    }
}

function IntArrayFree(array, size)
{
    SizeFree(array, size)
}

if(CLB_MEMORY_DEBUG){
    FREE = undefined
    junk=NULL
}

/*-------------------------------------------------------------------------
  If you want to have a special Allocator and Deallocator for a
  datatype just copy the following templates to your .h-file and fill
  them in... The allocated structures will not be initialized - you
  need to write a function build on top of the macros if you want more
  functionality in you Allocator. 

function DataCellAlloc()
{
   return SizeMalloc(DataCell)
}

function DataCellFree(junk)
{
    SizeFree(junk, DataCell)
}

-------------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_numtrees.h

Author: Stephan Schulz

Contents
 
  Definitions for SPLAY trees with long integer keys and up to two
  long or pointer values. Copied from clb_stringtrees.h

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Sep 25 02:23:01 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CLB_NUMTREES){

var CLB_NUMTREES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* General purpose data structure for indexing objects by a numerical
   key. Integer values are supported directly, for all other objects
   pointers can be used (and need to be casted carefully by the
   wrapper functions). Objects pointed to by the value fields are not
   part of the data structure and will not be touched by deallocating
   trees or tree nodes. */ 

function typedef_struct_numtreecell()
{
    function obj()
    {
        this.key
        this.val1 = new IntOrP()
        this.val2 = new IntOrP()
        this.numtreecelllson
        this.numtreecellrson
    }
    return obj
}
var NumTreeCell = typedef_struct_numtreecell()
var NumTree_p = typedef_struct_numtreecell()

function NumTreeCellAlloc()
{
   return SizeMalloc(NumTreeCell)
}
function NumTreeCellFree(junk)
{
    SizeFree(junk, NumTreeCell)
}

if(CONSTANT_MEM_ESTIMATE){
    var NUMTREECELL_MEM = 24
} else {
    function NUMTREECELL_MEM()
    {
        return 24
    }
}


function NumTreeMaxKey(tree)
{
   return NumTreeMaxNodetree.key
}

AVL_TRAVERSE_DECLARATION(NumTree, NumTree_p)
function NumTreeTraverseExit(stack)
{
    PStackFree(stack)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_numxtrees.h

Author: Stephan Schulz

Contents
 
  Definitions for SPLAY trees with long integer keys and vectors of
  IntOrPs as values. Copied from clb_numtrees.h

  Copyright 1998, 1999, 2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Aug  1 11:04:53 CEST 2011
    New from clb_numtrees.h

-----------------------------------------------------------------------*/

if(!CLB_NUMXTREES){

var CLB_NUMXTREES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var NUMXTREEVALUES = 4

/* General purpose data structure for indexing objects by a numerical
   key. Integer values are supported directly, for all other objects
   pointers can be used (and need to be casted carefully by the
   wrapper functions). Objects pointed to by the value fields are not
   part of the data stucture and will not be touched by deallocating
   trees or tree nodes. */ 

function typedef_struct_numxtreecell()
{
    function obj()
    {
        this.key
        this.vals = new IntOrP(NUMXTREEVALUES)
        this.numxtreecelllson
        this.numxtreecellrson
    }
    return obj
}
var NumXTreeCell = typedef_struct_numxtreecell()
var NumXTree_p = typedef_struct_numxtreecell()

function NumXTreeCellAlloc()
{
   return SizeMalloc(NumXTreeCell)
}
function NumXTreeCellFree(junk)
{
    SizeFree(junk, NumXTreeCell)
}

function NumXTreeMaxKey(tree)
{
   return NumXTreeMaxNodetree.key
}

AVL_TRAVERSE_DECLARATION(NumXTree, NumXTree_p)
function NumXTreeTraverseExit(stack)
{
    PStackFree(stack)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_objtrees.h

Author: Stephan Schulz

Contents
 
  Data structures for the efficient management of objects represented
  by pointers. This inherits the ptree structure, but uses comparison
  on objects (by a user-provided comparison function) instead of pointer
  comparisons.

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Feb 15 14:10:06 MET 1999
    Borrowed from clb_ptrees.[ch]

-----------------------------------------------------------------------*/

if(!CLB_OBJTREES){

var CLB_OBJTREES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var PObjTree_p = new PTree_p

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_os_wrapper.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Functions wrapping some OS functions in a convenient manner. 

  Copyright 2007 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1>     New

-----------------------------------------------------------------------*/

if(!CLB_OS_WRAPPERS){

var CLB_OS_WRAPPERS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_RLimResult()
{
    function obj()
    {
        this.RLimFailed = 1<<0
        this.RLimReduced = 1<<1
        this.RLimSuccess = 1<<2
    }
    return obj
}
var RLimResult = typedef_enum_RLimResult()



/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function GetUSecTime()
{
    return new Date().getTime()
}

if(PROFILE_WALL_CLOCK){
var GETTIME = GetUSecTime
} else {
var GETTIME = GetUSecClock
}

if(INSTRUMENT_PERF_CTR){
    function PERF_CTR_DEFINE(name){ name = 0; name._store }
    function PERF_CTR_DECL(name){   name; name._store }
    function PERF_CTR_RESET(name){  name = 0 }
    function PERF_CTR_ENTRY(name){  name._store = GETTIME() }
    function PERF_CTR_EXIT(name){ name+=(GETTIME()-name._store) }
    function PERF_CTR_PRINT(out, name){  console.log(out, "# PC%-34s : %f(' #",name, ")", name/1000000) }
} else {
    function PERF_CTR_DEFINE(name){}
    function PERF_CTR_DECL(name){}
    function PERF_CTR_RESET(name){}
    function PERF_CTR_ENTRY(name){}
    function PERF_CTR_EXIT(name){}
    function PERF_CTR_PRINT(out, name){}
}

function GetMSecTime()
{
   return GetUSecTime()/1000
}
function GetSecTime()
{
   return GetUSecTime()/1000000
}
function GetSecTimeMod()
{
   return GetSecTime()%1000
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_partial_orderings.h

Author: Stephan Schulz

Contents
 
  Functions and datatypes useful in dealing with partial orderings.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jun 16 22:37:09 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLB_PARTIAL_ORDERINGS){

var CLB_PARTIAL_ORDERINGS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Possible results of partial ordering comparisons */

function typedef_enum_CompareResult()
{
    function obj()
    {
        this.to_unknown = 0
        this.to_uncomparable = 1
        this.to_equal = 2
        this.to_greater = 3
        this.to_lesser = 4
        this.to_notgteq = 5
        this.to_notleeq = 6
    }
    return obj
}
var CompareResult = typedef_enum_CompareResult()


/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* Translating standard UNIX total Quasi-Ordering comparions into
   CompareResult: */

function Q_TO_PART(res)
{
   return ((res<0) ? to_lesser:((res>0) ? to_greater:to_equal))
}

/*---------------------------------------------------------------------*/
/*                  Implementations as inline functions                */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: POInverseRelation()
//
//   Given a comparison relation, return the inverse relation.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/


function POInverseRelation( relation )
{
   var res = new CompareResult()
   res = relation(res)
   switch(relation)
   {
       case to_equal:
       case to_uncomparable:
         break
       case to_greater:
         res = to_lesser
         break
       case to_lesser:
         res = to_greater
         break
       case to_notgteq:
         res = to_notleeq
         break
       case to_notleeq:
         res = to_notgteq
         break
       default:
         console.log(false)
         break
   }
   return res
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_pdarrays.h

Author: Stephan Schulz

Contents
 
  Dynamic arrays of pointers and long integers. You can define the
  growth behaviour by specifying a value. If it is GROW_EXPONENTIAL,
  arrays will always grow by a factor that is the lowest power of two
  that will make the array big enough. Otherwise it will grow by the
  smallest multiple of the value specified that creates the requested
  position. 

  Copyright 1998, 1999, 2004 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jul 22 21:34:41 MET DST 1998
    New
<2> Tue Mar 23 00:30:16 CET 2004
    Added comments about growth behaviour.

-----------------------------------------------------------------------*/

if(!CLB_PDARRAYS){

var CLB_PDARRAYS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_pdarraycell()
{
    function obj()
    {
        this.integer
        this.size
        this.grow
        this.array = new IntOrP()
    }
    return obj
}
var PDArrayCell = typedef_struct_pdarraycell()
var PDArray_p = typedef_struct_pdarraycell()

var GROW_EXPONENTIAL = 0

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PDArrayCellAlloc()
{
   return SizeMalloc(PDArrayCell)
}
function PDArrayCellFree(junk)
{
    SizeFree(junk, PDArrayCell)
}

if(CONSTANT_MEM_ESTIMATE){
    var PDARRAYCELL_MEM = 20
} else {
    function PDARRAYCELL_MEM(){ return 20 }
}
function PDArrayStorage(arr)
{
   return PDARRAYCELL_MEM+INTORP_MEM+(arr.size*INTORP_MEM)
}

function PDArraySize(array)
{
   return array.size
}

function PDArrayAssign(array, idx, value)
{
    array[idx] = value
    return array
}

function PDArrayAssignP(array, idx, value)
{
    array[idx].p_val = value
    return array
}

function PDArrayAssignInt(array, idx, value)
{
    array[idx].i_val = value
    return array
}

function PDArrayElement(array, idx)
{
   return array[idx]
}

function PDArrayElementP(array, idx)
{
   return array[idx].p_val
}

function PDArrayElementInt(array, idx)
{
   return array[idx].i_val
}

/*---------------------------------------------------------------------*/
/*                     Inline functions                                */
/*---------------------------------------------------------------------*/

	  
/*-----------------------------------------------------------------------
//
// Function: PDArrayElementRef()
//
//   Return a reference to an element in a dynamic array. This
//   reference is only good until the next call to this function! User
//   programs are expected to use this function only extremely rarely
//   and with special care. Use PDArrayElement()/PDArrayAssign()
//   instead. 
//
// Global Variables: -
//
// Side Effects    : May enlarge and move array.
//
/----------------------------------------------------------------------*/

function PDArrayElementRef( array,idx )
{
   console.log(array)
   console.log(idx >= 0)
   
   if(!(idx < array.size))
   {
      array = PDArrayEnlarge(array, idx)
   }
   return (array.array[idx])
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_pdrangearrays.h

Author: Stephan Schulz

Contents
 
  Dynamic arrays of pointers and long integers with an index range
if( by upper and lower bound.)
  
  You can define the growth behaviour by specifying a value. If it is
  GROW_EXPONENTIAL, arrays will always grow by a factor that is the
  lowest power of two that will make the array big enough. Otherwise
  it will grow by the smallest multiple of the value specified that
  creates the requested position. 

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Thu May 27 18:09:45 CEST 2010
    New

-----------------------------------------------------------------------*/

if(!CLB_PDRANGEARRAYS){

var CLB_PDRANGEARRAYS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Indices go from offset (inclusive) to offset+size
                     (exclusive) */

function typedef_struct_pdrangearrcell()
{
    function obj()
    {
        this.integer
        this.offset
        this.size
        this.grow
        this.array = new IntOrP()
    }
    return obj
}
var PDRangeArrCell = typedef_struct_pdrangearrcell()
var PDRangeArr_p = typedef_struct_pdrangearrcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PDRangeArrCellAlloc()
{
   return SizeMalloc(PDRangeArrCell)
}
function PDRangeArrCellFree(junk)
{
    SizeFree(junk, PDRangeArrCell)
}

if(CONSTANT_MEM_ESTIMATE){
    var PDRANGEARRELL_MEM = 20
} else {
    function PDRANGEARR_MEM(){ return 20 }
}
function PDRangeArrStorage(arr)
{
   return PDRANGEARRL_MEM+INTORP_MEM+(arr.size*INTORP_MEM)
}

function PDRangeArrAssign(array, idx, value)
{
    array[idx] = value
    return array
}

function PDRangeArrAssignP(array, idx, value)
{
    array[idx].p_val = value
    return array
}

function PDRangeArrAssignInt(array, idx, value)
{
    array[idx].i_val = value
    return array
}

function PDRangeArrElement(array, idx)
{
   return array[idx]
}

function PDRangeArrElementP(array, idx)
{
    array[idx].p_val = value
    return array
}

function PDRangeArrElementInt(array, idx)
{
    array[idx].i_val = value
    return array
}

function PDRangeArrLowKey(array)
{
   return array.offset
}
function PDRangeArrLimitKey(array)
{
   return array.offset+array.size
}

function PDRangeArrIndexIsCovered(array, idx)
{
   return    ((idx>=PDRangeArrLowKey(array))&&(idx<PDRangeArrLimitKey(array)))
}

/*---------------------------------------------------------------------*/
/*                     Inline functions                                */
/*---------------------------------------------------------------------*/


/*-----------------------------------------------------------------------
//
// Function: PDRangeArrElementRef()
//
//   Return a reference to an element in a dynamic array. This
//   reference is only good until the next call to this function! User
//   programs are expected to use this function only extremely rarely
//   and with special care. Use PDRangeArrElement()/PDRangeArrAssign()
//   instead. 
//
// Global Variables: -
//
// Side Effects    : May enlarge and move array.
//
/----------------------------------------------------------------------*/

function PDRangeArrElementRef( array,idx )
{
   console.log(array)
   
   if(!PDRangeArrIndexIsCovered(array, idx))
   {
      PDRangeArrEnlarge(array, idx)
   }
   console.log(PDRangeArrIndexIsCovered(array, idx))
   console.log(idx>=array.offset)
   console.log((idx-array.offset)<array.size)
   return (array.array[idx-(array.offset)])
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_plist.h

Author: Stephan Schulz

Contents
 
  Doubly linked lists of pointers and integers.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jul 20 02:26:17 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CLB_PLIST){

var CLB_PLIST = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_plistcell()
{
    function obj()
    {
        this.key = new IntOrP()
        this.plistcellpred
        this.plistcellsucc
    }
    return obj
}
var PListCell = typedef_struct_plistcell()
var PList_p = typedef_struct_plistcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PListCellAlloc()
{
   return SizeMalloc(PListCell)
}
function PListCellFree(junk)
{
    SizeFree(junk, PListCell)
}

function PListEmpty(anchor)
{
   return (anchor.pred == anchor)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_pqueue.h

Author: Stephan Schulz

Contents
 
  Functions for LIFO-lists.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Jun 30 17:14:42 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CLB_PQUEUE){

var CLB_PQUEUE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var PQUEUE_DEFAULT_SIZE = 128 /* Queues grow exponentially (and never
                                   shrink unless explicitly freed) -
                                   take care */

function typedef_struct_pqueuecell()
{
    function obj()
    {
        this.size
        this.head
        this.tail
        this.queue = new IntOrP()
    }
    return obj
}
var PQueueCell = typedef_struct_pqueuecell()
var PQueue_p = typedef_struct_pqueuecell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PQueueCellAlloc()
{
   return SizeMalloc(PQueueCell)
}
function PQueueCellFree(junk)
{
    SizeFree(junk, PQueueCell)
}

function PQueueEmpty(queue)
{
   return (queue.head == queue.tail)
}

function PQueueGetNextInt(Queue)
{
   return PQueueGetNextQueue.i_val
}
function PQueueGetNextP(Queue)
{
   return PQueueGetNextQueue.p_val
}

function PQueueGetLastInt(Queue)
{
   return PQueueGetLastQueue.i_val
}
function PQueueGetLastP(Queue)
{
   return PQueueGetLastQueue.p_val
}

function PQueueLookInt(Queue)
{
   return PQueueLookQueue.i_val
}
function PQueueLookP(Queue)
{
   return PQueueLookQueue.p_val
}

function PQueueLookLastInt(Queue)
{
   return PQueueLookLastQueue.i_val
}
function PQueueLookLastP(Queue)
{
   return PQueueLookLastQueue.p_val
}

function PQueueElementInt(Queue, index)
{
   return PQueueElement(Queue,index).i_val
}
function PQueueElementP(Queue, index)
{
   return PQueueElement(Queue,index).p_val
}

/*---------------------------------------------------------------------*/
/*                       Inline-Functions                              */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: pqueue_store()
//
//   Put an element in the queue.
//
// Global Variables: -
//
// Side Effects    : memory operations, changes queue
//
/----------------------------------------------------------------------*/

function pqueue_store( queue,val )
{
    queue.queue[queue.head] = val
    queue.head = (queue.head+1)%queue.size
    if(queue.head == queue.tail)
    {   
      queue = PQueueGrow(queue)
    }
    return queue
}

/*-----------------------------------------------------------------------
//
// Function: pqueue_bury()
//
//   Put an element at the front of the queue (i.e. "bury" it under
//   all the other elements in a stack-view of the queue).
//
// Global Variables: -
//
// Side Effects    : memory operations, changes queue
//
/----------------------------------------------------------------------*/

function pqueue_bury( queue,val )
{
    queue.tail = queue.tail? (queue.tail-1):queue.size-1
    queue.queue[queue.tail] = val
    if(queue.head == queue.tail)
    {   
      queue = PQueueGrow(queue)
    }
    return queue
}

/*-----------------------------------------------------------------------
//
// Function: PQueueAlloc()
//
//   Allocate an empty, initialized Queue.
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function PQueueAlloc()
{
   var handle = new PQueue_p()
   handle = PQueueCellAlloc(handle)
   handle.size  = PQUEUE_DEFAULT_SIZE
   handle.head  = 0
   handle.tail  = 0
   handle.queue = SizeMalloc(IntOrP,PQUEUE_DEFAULT_SIZE)
   
   return handle
}

/*-----------------------------------------------------------------------
//
// Function: PQueueFree()
//
//   Free a Queue.
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function PQueueFree( junk )
{
   SizeFree(junk.queue, junk.size*sizeof(IntOrP))
   PQueueCellFree(junk);   
}

/*-----------------------------------------------------------------------
//
// Function: PQueueReset()
//
//   Reset a queue to empty state.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function PQueueReset( queue )
{
    queue.head = 0
    queue.tail = 0
    return queue
}

/*-----------------------------------------------------------------------
//
// Function: PQueueStoreInt()
//
//   Store an integer in the queue.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function PQueueStoreInt( queue,val )
{
    var handle = new IntOrP()

    handle.i_val = val
    queue = pqueue_store(queue, handle)
    return queue
}

/*-----------------------------------------------------------------------
//
// Function: PQueueStoreP()
//
//   Store a pointer in the queue.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function PQueueStoreP( queue,val )
{
   var handle = new IntOrP()
   
   handle.p_val = val
   queue = pqueue_store(queue, handle)
   return queue
}

/*-----------------------------------------------------------------------
//
// Function: PQueueBuryInt()
//
//   Store an integer at the front of the the queue.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function PQueueBuryInt( queue,val )
{
   var handle = new IntOrP()
   
   handle.i_val = val
   queue = pqueue_bury(queue, handle)
   return queue
}

/*-----------------------------------------------------------------------
//
// Function: PQueueBuryP()
//
//   Store a pointer at the front of the queue.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function PQueueBuryP( queue,val )
{
   var handle = new IntOrP()
   
   handle.p_val = val
   queue = pqueue_bury(queue, handle)
   return queue
}

/*-----------------------------------------------------------------------
//
// Function: PQueueGetNext()
//
//   Extract the next value from the queue and return it.
//
// Global Variables: -
//
// Side Effects    : Changes queue.
//
/----------------------------------------------------------------------*/

function PQueueGetNext( queue )
{
   var res = new IntOrP()
   
   console.log(!PQueueEmpty(queue))
   
   res = queue.queue[queue.tail]
   queue.tail = (queue.tail+1)%queue.size
   return res
}

/*-----------------------------------------------------------------------
//
// Function: PQueueGetLast()
//
//   Extract the last value from the queue (i.e. pop from the queue
//   viewed as a stack) and return it.
//
// Global Variables: -
//
// Side Effects    : Changes queue.
//
/----------------------------------------------------------------------*/

function PQueueGetLast( queue )
{
   var res = new IntOrP()
   
   console.log(!PQueueEmpty(queue))
   queue.head = queue.head? (queue.head-1):queue.size-1
   res = queue.queue[queue.head]
   return res
}

/*-----------------------------------------------------------------------
//
// Function:  PQueueLook()
//
//   Return the next element from the queue without changing the
//   queue. 
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function PQueueLook( queue )
{
   console.log(!PQueueEmpty(queue))
   
   return queue.queue[queue.tail]
}

/*-----------------------------------------------------------------------
//
// Function: PQueueLookLast()
//
//   Return the last (youngest) value from the queue without modifyin
//   the queue.
//
// Global Variables: -
//
// Side Effects    : Changes queue.
//
/----------------------------------------------------------------------*/

function PQueueLookLast( queue )
{
   var res = new IntOrP()
   var index
   console.log(!PQueueEmpty(queue))
   index = queue.head? (queue.head-1):queue.size-1
   res = queue.queue[index]
   return res
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_properties.h

Author: Stephan Schulz

Contents
 
  Macros for dealing with 1 bit properties of objects (well,
  structs). It requires the object to be dealt with to have a field
  named "properties" that is of some integer or enumeration type. This
  is pretty ugly, but I did not want to spend too much time on it.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Sep 18 14:27:52 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CLB_PROPERTIES){

var CLB_PROPERTIES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function SetProp(obj, prop)
{
   obj.properties |= (prop)
   return obj
}
function DelProp(obj, prop)
{
   obj.properties = obj.properties & ~(prop)
   return obj
}
function FlipProp(obj, prop)
{
   obj.properties ^= (prop)
   return obj
}
function AssignProp(obj,prop)
{
    return SetProp((obj),(sel)&(prop))
}

/* Are _all_ properties in prop set in obj? */
function QueryProp(obj, prop)
{
   return ((obj.properties & prop) == prop)
}

/* Are any properties in prop set in obj? */
function IsAnyPropSet(obj, prop)
{
   return (obj.properties & prop)
}

/* Return the properties of object...yes, this is the same code as
   above, but implements a different concept */
function GiveProps(obj,prop)
{
   return (obj.properties & prop)
}

/* Are two property sets equivalent? */

function PropsAreEquiv(obj1, obj2, props)
{
   return ((obj1.properties&props)==(obj2.properties&props))
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_pstacks.h

Author: Stephan Schulz

Contents
 
  Soemwhat efficient unlimited growth stacks for pointers/long ints.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Dec  3 16:22:48 MET 1997
    New

-----------------------------------------------------------------------*/

if(!CLB_PSTACKS){

var CLB_PSTACKS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Generic stack data type, can take (long) integers or pointers */

function PStackPointer()
{
   this.value = arguments[0] || 0
}

function typedef_struct_pstackcell()
{
    function obj()
    {
        this.size
        this.current = new PStackPointer()
        this.stack = new IntOrP()
    }
    return obj
}
var PStackCell = typedef_struct_pstackcell()
var PStack_p = typedef_struct_pstackcell()

var PSTACK_DEFAULT_SIZE = 128 /* Stacks grow exponentially (and never
                               shrink unless explicitly freed) -
                               take care */

function PStackCellAlloc()
{
   return SizeMalloc(PStackCell)
}
function PStackCellFree(junk)
{
    SizeFree(junk, PStackCell)
}

if(CONSTANT_MEM_ESTIMATE){
    var PSTACK_AVG_MEM = 68
} else {
    function PSTACK_AVG_MEM (){ return 68 }
}

function PStackBaseAddress(stackarg)
{
   return stackarg.stack
}

function PStackEmpty(stack)
{
   return (stack.current == 0)
}

function PStackGetSP(stack)
{
   return stack.current
}
function PStackGetTopSP(stack)
{
   return stack.current-1
}

function PStackPopInt(stack)
{
   return PStackPopstack.i_val
}
function PStackPopP(stack)
{
   return PStackPopstack.p_val
}

function PStackTopInt(stack)
{
   return PStackTopstack.i_val
}
function PStackTopP(stack)
{
   return PStackTopstack.p_val
}

function PStackBelowTopInt(stack)
{
   return PStackBelowTopstack.i_val
}
function PStackBelowTopP(stack)
{
   return PStackBelowTopstack.p_val
}

function PStackElementInt(stack,pos)
{
   return PStackElement(stack,pos).i_val
}
function PStackElementP(stack,pos)
{
   return PStackElement(stack,pos).p_val
}

/*---------------------------------------------------------------------*/
/*                  Implementations as inline functions                */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: push()
//
//   Implement push operation for pstacks. If the stack area needs to
//   grow, Realloc is emulated in terms of
//   SizeMalloc()/SizeFree(). This is because stacks are allocated and
//   deallocated a lot, and usually in the same sizes, so it pays off
//   to optimize this behaviour.
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function push( stack,val )
{
   if(stack.current == stack.size)
   {
        stack.size = stack.size*2
        stack.length = stack.size*2
   }
   stack.stack[stack.current] = val
   stack.current++
   return stack
}

/*-----------------------------------------------------------------------
//
// Function: PStackAlloc()
//
//   Allocate an empty stack.
//
// Global Variables: -
//
// Side Effects    : Memory oprations
//
/----------------------------------------------------------------------*/

function PStackAlloc()
{
   var handle = new PStack_p()
   
   handle = PStackCellAlloc()
   handle.size = PSTACK_DEFAULT_SIZE
   handle.current = 0
   handle.stack = SizeMalloc(IntOrP,handle.size)
   
   return handle
}

/*-----------------------------------------------------------------------
//
// Function: PStackVarAlloc()
//
//   Allocate an empty stack with selectable initial size.
//
// Global Variables: -
//
// Side Effects    : Memory oprations
//
/----------------------------------------------------------------------*/

function PStackVarAlloc( size )
{
   var handle = new PStack_p()
   
   handle = PStackCellAlloc()
   handle.size = size
   handle.current = 0
   handle.stack = SizeMalloc(IntOrP,handle.size)
   
   return handle
}

/*-----------------------------------------------------------------------
//
// Function: PStackFree()
//
//   Free a stack.
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function PStackFree( junk )
{
   console.log(junk)
   console.log(junk.stack)
   
   SizeFree(junk.stack, junk.size * sizeof(IntOrP))
   PStackCellFree(junk)
}

/*-----------------------------------------------------------------------
//
// Function: PStackCopy()
//
//   Copy a PStack with contents. Use with care, as some data
//   structures may not be copyable very well (e.g. pointers to the
//   same array, registered references, ...)
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function PStackCopy( stack )
{
   var handle = new PStack_p()
   handle = PStackAlloc(handle)
   for(var i=0; i<PStackGetSP(stack); i++)
   {
      push(handle, PStackElement(stack,i))
   }
   return handle
}

/*-----------------------------------------------------------------------
//
// Function: PStackReset()
//
//   Reset a PStack to empty state.
//
// Global Variables: -
//
// Side Effects    : Changes stackpointer.
//
/----------------------------------------------------------------------*/

function PStackReset( stack )
{
   stack.current = 0
   return stack
}

/*-----------------------------------------------------------------------
//
// Function: PStackPushInt()
//
//   Push a (long) int onto the stack
//
// Global Variables: -
//
// Side Effects    : By push()
//
/----------------------------------------------------------------------*/

function PStackPushInt( stack,val )
{
   var help = new IntOrP()
   help.i_val = val
   
   stack = push(stack, help)
   return stack
}

/*-----------------------------------------------------------------------
//
// Function: PStackPushP()
//
//   Push a pointer onto the stack
//
// Global Variables: -
//
// Side Effects    : by push()
//
/----------------------------------------------------------------------*/

function PStackPushP( stack,val )
{
   var help = new IntOrP()
   help.p_val = val
   
   stack = push(stack, help)
   return stack
}

/*-----------------------------------------------------------------------
//
// Function: PStackPop()
//
//   Implement pop operation for non-empty pstacks.
//
// Global Variables: 
//
// Side Effects    : 
//
/----------------------------------------------------------------------*/

function PStackPop( stack )
{
   console.log(stack.current)
   
   stack.current--
   return stack.stack[stack.current]
}

/*-----------------------------------------------------------------------
//
// Function: PStackDiscardTop()
//
//   Do a PStackPop without returning result, to avoid warnings.
//
// Global Variables: 
//
// Side Effects    : 
//
/----------------------------------------------------------------------*/

function PStackDiscardTop( stack )
{
   console.log(stack.current)
   
   stack.current--
   return stack
}

/*-----------------------------------------------------------------------
//
// Function: PStackTop()
//
//   Implement Top operation for non-empty pstacks.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function PStackTop( stack )
{
   console.log(stack.current)
   
   return stack.stack[stack.current-1]
}

/*-----------------------------------------------------------------------
//
// Function: PStackBelowTop()
//
//   Return second item on the stack (asserts that stack has >=2
//   elements). 
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function PStackBelowTop( stack )
{
   console.log(stack.current>=2)
   
   return stack.stack[stack.current-2]
}

/*-----------------------------------------------------------------------
//
// Function: PStackElement()
//
//   Return element at position pos.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function PStackElement( stack,pos )
{
   console.log(pos<stack.current)
   console.log(pos>=0)
   return stack.stack[pos]
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_ptrees.h

Author: Stephan Schulz

Contents
 
  Data structures for the efficient management of pointer
  sets. I substituted this SPLAY tree version as it consumes less
  memory and may even be faster in the average case. As pointers are
  managed, all additional information can go into the pointed-to
  structures.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Sep 25 02:36:58 MET DST 1997
    New
<2> Wed Jan 27 17:05:13 MET 1999
    Moved over to D. Sleators splay trees. You can find the old code
    in clb_ptrees_avl.[ch] at the moment.

-----------------------------------------------------------------------*/

if(!CLB_PTREES){

var CLB_PTREES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Data structure for indexing pointers (which need to be casted
   carefully by the wrapper functions). The key comes last in the
   struct to circumvent some bug in various gcc versions (apparently,
   gcc likes to safe a variable and will not always allocate a
   temporary variable when it thinks it can reuse the original
   position. In this case, it is wrong (exhibited in
   PTreeExtractKey()). Moving key to the back works around it (the
   memory management module will overwrite just the first word...) */ 

function typedef_struct_ptreecell()
{
    function obj()
    {
        this.ptreecelllson
        this.ptreecellrson
        this.key
    }
    return obj
}
var PTreeCell = typedef_struct_ptreecell()
var PTree_p = typedef_struct_ptreecell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PTreeCellAlloc()
{
   return SizeMalloc(PTreeCell)
}
function PTreeCellFree(junk)
{
    SizeFree(junk, PTreeCell)
}

if(CONSTANT_MEM_ESTIMATE){
    var PTREE_CELL_MEM = 16
} else {
    function PTREE_CELL_MEM(){ return 16 }
}


/* As I found out now, _if_ ptr_int is large enough
   for this conversion, this is guaranteed to work! - actually it's
   does not if the pointers are great enough to overflow. "Slow"
   inlined is fast enough and seems to work fine. */

var SLOW_PTR_CMP = 1

if(SLOW_PTR_CMP){
    function PCmp(p1, p2){ return PCmpFun(p1, p2) }
} else {
    function PCmp(p1, p2) { return (p1-p2) }
}

AVL_TRAVERSE_DECLARATION(PTree, PTree_p)
function PTreeTraverseExit(stack)
{
    PStackFree(stack)
}

/*-----------------------------------------------------------------------
//
// Function: PCmpFun()
//
//   Compare two pointers, return 1 if the first one is bigger, 0 if
//   both are equal, and -1 if the second one is bigger. Might be
//   machine dependend and of limited portability (comparing two
//   arbitrary pointers is not ANSI kosher, but the compiler has no
//   way to detect this, as pointers to the same array can be compared
//   under ANSI), but should be easy to hack on any
//   machine. Subtracting pointers and casting the result to int is
//   probably more efficient, but even more dangerous.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function PCmpFun( p,p )
{
   if(p1 > p2)
   {
      return 1
   }
   else if(p1 < p2)
   {
      return -1
   }
   console.log(p1 == p2)
   return 0
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_quadtrees.h

Author: Stephan Schulz

Contents
 
  Trees indexed by 4 words (two pointers and two integers). See
  clb_ptrees.h (and below) for details.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Jan  4 00:53:38 MET 2000
    Copied and modified clb_ptrees.h

-----------------------------------------------------------------------*/

if(!CLB_QUADTREES){

var CLB_QUADTREES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* The Quadkey type: 4 words (two pointers, two ints) */

function typedef_struct_quadkeycell()
{
    function obj()
    {
        this.p1
        this.i1
        this.p2
        this.i2
    }
    return obj
}
var QuadKeyCell = typedef_struct_quadkeycell()
var QuadKey = typedef_struct_quadkeycell()
var QuadKey_p = typedef_struct_quadkeycell()

/* Quadtree cell: We have the 4-part key and a single value. */

function typedef_struct_quadtreecell()
{
    function obj()
    {
        this.key = new QuadKey()
        this.val = new IntOrP()
        this.quadtreecelllson
        this.quadtreecellrson
    }
    return obj
}
var QuadTreeCell = typedef_struct_quadtreecell()
var QuadTree_p = typedef_struct_quadtreecell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function QuadTreeCellAlloc()
{
   return SizeMalloc(QuadTreeCell)
}
function QuadTreeCellFree(junk)
{
    SizeFree(junk, QuadTreeCell)
}

AVL_TRAVERSE_DECLARATION(QuadTree, QuadTree_p)
function QuadTreeTraverseExit(stack)
{
    PStackFree(stack)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/
/*-----------------------------------------------------------------------

File  : clb_regmem.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  A module supporting dynamic memory for local static variables that
  is still freed quasi-automatically (via a call to a cleanup
  function) when the program terminates. This is useful if there is a
  need for dynamically growing (or shrinking) persistent memory "owned"
  by a function. I still want this cleaned up at the end to keep the
  usefulness of the memory counters in detecting (and hence avoiding)
  memory leaks.

  Copyright 2011 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Mon Feb 13 01:47:54 CET 2012
    New

-----------------------------------------------------------------------*/

if(!CLB_REGMEM){

var CLB_REGMEM = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_simple_stuff.h

Author: Stephan Schulz

Contents
 
  Useful routines, usually pretty trivial.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Oct 16 17:30:21 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CLB_SIMPLE_STUFF){

var CLB_SIMPLE_STUFF = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* For sorting objects by a float key: */

function typedef_struct()
{
    function obj()
    {
        this.weight
        this.object = new IntOrP()
    }
    return obj
}
var WeightedObjectCell = typedef_struct()
var WeightedObject_p = typedef_struct()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var MAXINDENTSPACES = 72

function WeightedObjectArrayAlloc(number)
{
   return SecureMalloc(WeightedObjectCell,number)
}

function WeightedObjectArrayFree(array)
{
    FREE(array)
}

function WeightedObjectArraySort(array, size)
{
   return array.sort()
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_stringtrees.h

Author: Stephan Schulz

Contents
 
  Definitions for AVL trees with string keys and up to two int or
  pointer values. Part of the implementation is based on public domain
  code by D.D. Sleator.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Sep 25 02:23:01 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CLB_STRINGTREES){

var CLB_STRINGTREES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* General purpose data structure for indexing objects by a string
   key. Integer values are supported directly, for all other objects
   pointers can be used (and need to be casted carefully by the
   wrapper functions). Keys are considered to be part of the tree and
   will be FREE'd by memory deallocation. Objects pointed to by the
   value fields are not part of the data stucture and will not be
   touched by deallocating trees or tree nodes. */

function typedef_struct_strtreecell()
{
    function obj()
    {
        this.key
        this.val1 = new IntOrP()
        this.val2 = new IntOrP()
        this.strtreecelllson
        this.strtreecellrson
    }
    return obj
}
var StrTreeCell = typedef_struct_strtreecell()
var StrTree_p = typedef_struct_strtreecell()

function StrTreeCellAlloc()
{
   return SizeMalloc(StrTreeCell)
}
function StrTreeCellFree(junk)
{
    SizeFree(junk, StrTreeCell)
}

AVL_TRAVERSE_DECLARATION(StrTree, StrTree_p)
function StrTreeTraverseExit(stack)
{
    PStackFree(stack)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_sysdate.h

Author: Stephan Schulz

Contents
 
  Data types dealing with "dates" and "times". A "time" in this
if( starting point and a total)
  ordering that monotonically increases during the run of the program
  and can be used to define an order of events. A "date" is a specific
  element from a "time".

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Apr  8 16:49:44 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CLB_SYSDATE){

var CLB_SYSDATE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Data type used both for "time" keeping and recording of
   "dates". */

function SysDate()
{
   this.value = arguments[0] || 0
}
   

function typedef_enum_DateRelation()
{
    function obj()
    {
        this.DateEarlier = -1
        this.DateEqual = 0
        this.DateLater = 1
    }
    return obj
}
var DateRelation = typedef_enum_DateRelation()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var ULONG_MAX = Infinity
function SysDateCreationTime()
{ 
    return 0 
}
function SysDateArmageddonTime()
{ 
    return ULONG_MAX 
}
function SysDateInc(sd)
{
    sd++
   return sd
}

function SysDateMaximum(date1, date2)
{
   return (SysDateCompare(date1, date2)==DateEarlier) ? date2:date1
}
function SysDateIsCreationDate(date)
{
   return (SysDateCompare((date),SysDateCreationTime())==DateRelation.DateEqual)
}

/*-----------------------------------------------------------------------
//
// Function:  SysDateCompare()
//
//   Compare two times, return DateEqual, DateEarlier, DateLater,
//   if the first date is equal to, smaller or bigger than the second
//   one. 
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function SysDateCompare( date,date )
{
    var result = DateRelation.DateEqual
    if(date1 > date2)
    {
        result = DateRelation.DateLater
    }
    else if(date1 < date2)
    {
        result = DateRelation.DateEarlier
    }
    return result
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : clb_verbose.h

Author: Stephan Schulz

Contents
 
  Declarations for the Verbose variable and macros for verbose
  reporting on certain operations.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Sep 15 14:41:33 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CLB_VERBOSE){

var CLB_VERBOSE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function VERBOSE(arg) 
{
   if(Verbose)
   {
      console.log('verbose: ',arg)
   }
}

function VERBOSE2(arg) 
{
   if(Verbose>=2)
   {
      console.log('verbose2: ',arg)
   }
}

function VERBOSE10(arg) 
{
   if(Verbose>=10)
   {
      arg
   }
}

function VERBOUT(arg) 
{
   if(Verbose)
   {
      console.log('verbout: ',arg)
   }
}

function VERBOUT2(arg) 
{
   if(Verbose)
   {
      console.log('verbout2: ',arg)
   }
}

function VERBOUT10(arg)
{
   if(Verbose)
   {
      console.log('verbout10: ',arg)
   }
}

function VERBOUTARG(arg1,arg2)
{
   if(Verbose)
   {
      console.log('verboutarg: ',arg,arg2)
   }
}

function VERBOUTARG2(arg1,arg2)
{
   if(Verbose)
   {
      console.log('verboutarg2: ',arg,arg2)
   }
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_annotations.h

Author: Stephan Schulz

Contents

  Functions and datatype for dealing with and administrating
  annotations.  

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Jul 16 20:45:49 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_ANNOTATIONS){

var CLE_ANNOTATIONS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*

  An annotation is a NumTreeCell, where the key corresponds to the
  proof problem ("Sample number") and val1.p_val points to a DDArray
  which contains the meat. val2.i_val contains the number of
  annotations parsed or expected. val1.p_val[0] always is the number
  of original annotations merged into this annoation.

  Complete format of annotations for the prover:

  0: Number of example clauses combined in this annotation
  1: Proofs the fact occured in
  2: Average proof distance of the clause
  3: Number of used clauses simplified
  4: Number of unused clauses simplified
  5: Number of used clauses generated from this one
  6: Number of unused clauses generated
  7: Number of clauses subsumed by this one
 */

var ANNOTATION_DEFAULT_SIZE = 7
var ANNOTATIONS_MERGE_ALL = NULL

Annotation_p = new NumTree_p();

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function AnnotationValues(anno)
{
   return anno.val1.p_val
}
function AnnotationCount(anno)
{
   return DDArrayElement(anno.val1.p_val, 0)
}

function AnnotationLength(anno)
{
   return anno.val2.i_val
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_annoterms.h

Author: Stephan Schulz

Contents

  Terms and term sets with annotation lists.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Jul 20 17:22:38 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_ANNOTERMS){

var CLE_ANNOTERMS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_annotermcell()
{
    function obj()
    {
        this.term = new Term_p()
        this.annotation = new Annotation_p()
    }
    return obj
}
var AnnoTermCell = typedef_struct_annotermcell()
var AnnoTerm_p = typedef_struct_annotermcell()

function typedef_struct_annosetcell()
{
    function obj()
    {
        this.terms = new TB_p()
        this.set = new NumTree_p()
        this.subst = new PatternSubst_p()
        this.annotation_no
    }
    return obj
}
var AnnoSetCell = typedef_struct_annosetcell()
var AnnoSet_p = typedef_struct_annosetcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function AnnoTermCellAlloc()
{
   return SizeMalloc(AnnoTermCell)
}
function AnnoTermCellFree(junk)
{
    SizeFree(junk, AnnoTermCell)
}

function AnnoSetCellAlloc()
{
   return SizeMalloc(AnnoSetCell)
}
function AnnoSetCellFree(junk)
{
    SizeFree(junk, AnnoSetCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_classification.h

Author: Stephan Schulz

Contents

  Functions for using TSM's as classification tools on terms.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Aug 13 20:26:50 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_CLASSSIFICATION){

var CLE_CLASSIFICATION = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_clauseenc.h

Author: Stephan Schulz

Contents
 
  Functions for dealing with term representations of clauses.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Jul 13 12:36:03 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_CLAUSEENC){

var CLE_CLAUSEENC = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_examplerep.h

Author: Stephan Schulz

Contents
 
  Data structures and functions to associate names, numbers and
  features with a proof problem.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jul 26 18:30:59 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_EXAMPLEREP){

var CLE_EXAMPLEREP = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* An example is represented by a name (which also points to the
   original input file stored somewhere), a number (used in the
   annotations to identify the example) and the features which are
   used to identify similar exampes */

function typedef_struct_examplerepcell()
{
    function obj()
    {
        this.ident
        this.name
        this.features = new Features_p()
    }
    return obj
}
var ExampleRepCell = typedef_struct_examplerepcell()
var ExampleRep_p = typedef_struct_examplerepcell()

/* We want to deal with sets of example representations */

function typedef_struct_examplesetcell()
{
    function obj()
    {
        this.countForidentgeneration_not_numberofexamples
        this.ident_index = new NumTree_p()
        this.name_index = new StrTree_p()
    }
    return obj
}
var ExampleSetCell = typedef_struct_examplesetcell()
var ExampleSet_p = typedef_struct_examplesetcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function ExampleRepCellAlloc()
{
   return SizeMalloc(ExampleRepCell)
}
function ExampleRepCellFree(junk)
{
    SizeFree(junk, ExampleRepCell)
}

function ExampleSetCellAlloc()
{
   return SizeMalloc(ExampleSetCell)
}
function ExampleSetCellFree(junk)
{
    SizeFree(junk, ExampleSetCell)
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_flatannoterms.h

Author: Stephan Schulz

Contents

  Terms with only an evaluation and a counter left.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Aug  9 12:32:53 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_FLATANNOTERMS){

var CLE_FLATANNOTERMS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_flatannotermcell()
{
    function obj()
    {
        this.term = new Term_p()
        this.eval
        this.eval_weight
        this.sources
        this.next = new flatannotermcell()
    }
    return obj
}
var FlatAnnoTermCell = typedef_struct_flatannotermcell()
var FlatAnnoTerm_p = typedef_struct_flatannotermcell()

function typedef_struct_flatannosetcell()
{
    function obj()
    {
        this.set = new NumTree_p()
    }
    return obj
}
var FlatAnnoSetCell = typedef_struct_flatannosetcell()
var FlatAnnoSet_p = typedef_struct_flatannosetcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function FlatAnnoTermCellAlloc()
{
   return SizeMalloc(FlatAnnoTermCell)
}

function FlatAnnoTermCellFree(junk)
{
   SizeFree(junk, FlatAnnoTermCell)
}

function FlatAnnoTermFree(junk)
{
    return FlatAnnoTermCellFree(junk)
}

function FlatAnnoSetCellAlloc()
{
   return SizeMalloc(FlatAnnoSetCell)
}

function FlatAnnoSetCellFree(junk)
{
   SizeFree(junk, FlatAnnoSetCell)
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

