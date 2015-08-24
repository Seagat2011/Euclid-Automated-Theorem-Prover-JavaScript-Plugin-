/*-----------------------------------------------------------------------

File  : can_clausestats.h

Author: Stephan Schulz

Contents

  Simple data type to store information about clauses. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

   COMPILE FLAGS
      gcc -w -p -Ofast -m32 -fpeephole -m3dnow -o eprover header.c

Changes

<1> Wed Mar 31 14:22:23 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CAN_CLAUSESTATS){

CAN_CLAUSESTATS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_clausestatscell()
{
    function obj()
    {
        this.proof_distance
        this.simplify_used
        this.simplify_unused
        this.generate_used
        this.generate_unused
        this.subsumed
    }
    return obj
}
var ClauseStatsCell = typedef_struct_clausestatscell()
var ClauseStats_p = typedef_struct_clausestatscell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function ClauseStatsCellAlloc()
{
   return SizeMalloc(ClauseStatsCell)
}

function ClauseStatsCellFree(junk)
{
   SizeFree(junk,ClauseStatsCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : can_clausestore.h

Author: Stephan Schulz

Contents
 
  Data type for compact storing of clauses, indexed by identifier, for
  analysis purposes.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:28:25 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CAN_CLAUSESTORE){

var CAN_CLAUSESTORE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Represent a clause as compact as possible for analysis
   purposes. You need some context to interprete this, in particular
   the term bank. */

function typedef_struct_compact_clause_cell()
{
    function obj()
    {
        this.properties = new ClauseProperties()
        this.ident
        this.ext_identIdentofthecurrentversionof
        this.clauseforPCLgeneration
        this.literal_no
        this.sign
        this.lit_terms = new Term_p()
        this.g_parents = new PTree_p()
        this.s_parents = new PTree_p()
        this.stats = new ClauseStatsCell()
    }
    return obj
}
var CompClauseCell = typedef_struct_compact_clause_cell()
var CompClause_p = typedef_struct_compact_clause_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function CompClauseCellAlloc()
{
   return SizeMalloc(CompClauseCell)
}

function CompClauseCellFree(junk)
{
   SizeFree(junk,CompClauseCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : can_infstate.h

Author: Stephan Schulz

Contents
 
  Data structures for representing the state of an inference process. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Feb 26 23:25:00 MET 1999
    New

-----------------------------------------------------------------------*/

if(!CAN_INFSTATE){

var CAN_INFSTATE = 1

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

File  : can_treeanalyze.h

Author: Stephan Schulz

Contents
 
  Functions for analysing and marking dependency trees for clauses.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Mar 23 02:07:15 MET 1999
    New

-----------------------------------------------------------------------*/

if(!CAN_TREEANALYZE){

var CAN_TREEANALYZE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var LONG_MAX = Infinity
var PROOF_DIST_INFINITY = LONG_MAX /* It's magic */
var PROOF_DIST_DEFAULT = 10 /* Default for non-proofs */

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_axiomsorter.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Datatypes an code for implementing generic evaluation and sorting of
  axiomsets (clauses and formulas).

  Copyright 2009 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Jun 14 00:31:54 CEST 2009
    New

-----------------------------------------------------------------------*/

if(!CCL_AXIOMSORTER){

var CCL_AXIOMSORTER = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

if(!__AxiomType__){
    var __AxiomType__ = 1
    function typedef_enum_AxiomType()
    {
        function obj()
        {
            this.NoAxiom = 1<<0
            this.ClauseAxiom = 1<<1
            this.FormulaAxiom = 1<<2
            this.ATNoType = 1<<3
            this.ATClause = 1<<4
            this.ATFormula = 1<<5
        }
        return obj
    }
    var AxiomType = typedef_enum_AxiomType()
}

/* Structure for representing an axiom with weight. */

function typedef_struct_w_axiom_cell()
{
    function obj()
    {
        this.type = new AxiomType()
        this.weight
        ax = {
           form: new WFormula_p(),
           clause: new Clause_p()
        }
    }
    return obj
}
var WAxiomCell = typedef_struct_w_axiom_cell()
var WAxiom_p = typedef_struct_w_axiom_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function WAxiomCellAlloc()
{
   return SizeMalloc(WAxiomCell)
}
function WAxiomCellFree(junk)
{
    SizeFree(junk,WAxiomCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_clausecpos.h

Author: Stephan Schulz

Contents
 
  Positions of subterms in clauses (and in equations) using compact
  (i.e. single integer) positions.

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Feb 18 01:31:48 EET 2010
    New

-----------------------------------------------------------------------*/

if(!CCL_CLAUSECPOS){

var CCL_CLAUSECPOS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function CompactPos()
{
   this.value = arguments[0] || 0
}

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_clausefunc.h

Author: Stephan Schulz

Contents
 
  Clause and formula functions that need to know about sets (and
  similar stuff (ccl_clauses.c is to big anyways).

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Aug  7 00:02:44 CEST 2001
    New, partitioned ccl_clausesets.h

-----------------------------------------------------------------------*/

if(!CCL_CLAUSEFUNC){

var CCL_CLAUSEFUNC = 1

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

File  : ccl_clauseinfo.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Datatype and basic functions for storing and handling clause
  information that few clauses carry (probably just input
  clauses). This is not stored in the clause (or formula) data types,
  because it would eat  up to much memory (remember, there are
  millions of clauses)

  Copyright 2004 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Sep  3 10:28:20 CEST 2004
    New

-----------------------------------------------------------------------*/

if(!CCL_CLAUSEINFO){

var CCL_CLAUSEINFO = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_clause_info_cell()
{
    function obj()
    {
        this.name
        this.source
        this.line
        this.column
    }
    return obj
}
var ClauseInfoCell = typedef_struct_clause_info_cell()
var ClauseInfo_p = typedef_struct_clause_info_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function ClauseInfoCellAlloc()
{
   return SizeMalloc(ClauseInfoCell)
}
function ClauseInfoCellFree(junk)
{
   SizeFree(junk,ClauseInfoCell)
}

 

function ClauseSourceInfoPrintTSTP(out, info)
{
   return ClauseSourceInfoPrint((out), (info), "file", "'")
}

function ClauseSourceInfoPrintPCL(out, info)
{
   return ClauseSourceInfoPrint((out), (info), "initial", "(\"")
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_clausepos.h

Author: Stephan Schulz

Contents
 
  Positions of subterms in clauses (and in equations).

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed May 20 03:34:54 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CLAUSEPOS){

var CLAUSEPOS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_clauseposcell()
{
    function obj()
    {
        this.clause = new Clause_p()
        this.literal = new Eqn_p()
        this.side = new EqnSide()
        this.pos = new TermPos_p()
    }
    return obj
}
var ClausePosCell = typedef_struct_clauseposcell()
var ClausePos_p = typedef_struct_clauseposcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function ClausePosCellAlloc()
{
   return SizeMalloc(ClausePosCell)
}
function ClausePosCellFree(junk)
{
   SizeFree(junk,ClausePosCell)
}

if(CONSTANT_MEM_ESTIMATE){
    var CLAUSEPOSCELL_MEM = 20
} else {
    function CLAUSEPOSCELL_MEM(){ return 20 }
}

function ClausePosIsTop(position)
{
   return (PStackEmpty(position.pos))
}

/*---------------------------------------------------------------------*/
/*                Inline Functions                                     */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: ClausePosAlloc()
//
//   Allocate an empty, semi-initialized ClausePosCell.
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function ClausePosAlloc()
{
   var handle = new ClausePos_p()
   handle = ClausePosCellAlloc(handle)
   
   handle.literal = NULL
   handle.side    = LeftSide
   handle.pos     = TermPosAlloc()
   return handle
}

/*-----------------------------------------------------------------------
//
// Function:  ClausePosFree()
//
//   Free a clausepos.
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function __inline__ClausePosFree( junk )
{
   console.log(junk)
   TermPosFree(junk.pos)
   ClausePosCellFree(junk)
}

/*-----------------------------------------------------------------------
//
// Function: ClausePosGetSide()
//
//   Given a clause position, return the designated side of the
//   literal. 
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function ClausePosGetSide( pos )
{
   if(pos.side == LeftSide)
   {
      return pos.literal.lterm
   }
   return pos.literal.rterm
}

/*-----------------------------------------------------------------------
//
// Function: ClausePosGetOtherSide()
//
//   Given a clause position, return the _not_ designated side of the
//   literal - don't ask, this has it's use!
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function __inline__ClausePosGetOtherSide( pos )
{
   if(pos.side == LeftSide)
   {
      return pos.literal.rterm
   }
   return pos.literal.lterm
}

/*-----------------------------------------------------------------------
//
// Function: ClausePosGetSubterm()
//
//   Given a clause position, return the designated subterm of the
//   literal. 
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function ClausePosGetSubterm( pos )
{
   return TermPosGetSubterm(ClausePosGetSide(pos), pos.pos)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_clausepos_tree.h

Author: Stephan Schulz (schulz@eprover.org)

Contents

  Associate clauses with a number of compact positions in clauses.

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Jun  6 13:25:19 CEST 2010
    New

-----------------------------------------------------------------------*/

if(!CCL_CLAUSEPOS_TREE){

var CCL_CLAUSEPOS_TREE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Associate a clause with a number of positions (all with the
 * property that c|p = t for the query term t */

function typedef_struct_clause_tpos_cell()
{
    function obj()
    {
        this.clause = new Clause_p()
        this.pos = new NumTree_p()
    }
    return obj
}
var ClauseTPosCell = typedef_struct_clause_tpos_cell()
var ClauseTPos_p = typedef_struct_clause_tpos_cell()

var ClauseTPosTree_p = new PObjTree_p()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function ClauseTPosCellAlloc()
{
   return SizeMalloc(ClauseTPosCell)
}
function ClauseTPosCellFree(junk)
{
   SizeFree(junk,ClauseTPosCell)
}
 

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_clausesets.h

Author: Stephan Schulz

Contents
 
  Definitions dealing with collections of clauses

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:28:25 MET DST 1997
    New
<2> Tue Aug  7 01:22:42 CEST 2001
    Removed clause functions to ccl_clausefunc.h

-----------------------------------------------------------------------*/

if(!CCL_CLAUSESETS){

var CCL_CLAUSESETS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Clause sets are doubly linked lists of clauses with indices for the
   various potential evaluations. */
/* How many clauses are there? */
/* And how many literals? */
/* The clauses */
/* Age of the clause set, used for optimizing
   rewriting. The special date SysCreationDate()
   is used to indicate ignoring of dates when
   checking for irreducability. */
/* If used for demodulators */
/* Used for non-unit subsumption */

function typedef_struct_clausesetcell()
{
    function obj()
    {
      this.members
      this.literals
      this.anchor = new Clause_p()
      this.date = new SysDate()
      this.demod_index = new PDTree_p()
      this.fvindex = new FVIAnchor_p()
      this.eval_indices = new PDArray_p()
      this.eval_no
    }
    return obj
}
var ClauseSetCell = typedef_struct_clausesetcell()
var ClauseSet_p = typedef_struct_clausesetcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var CLAUSECELL_DYN_MEM = (CLAUSECELL_MEM+3*PTREE_CELL_MEM)

function ClauseSetCellAlloc()
{
   return SizeMalloc(ClauseSetCell)
}
function ClauseSetCellFree(junk)
{
   SizeFree(junk,ClauseSetCell)
}

function ClauseSetStorage(set)
{
   return ((CLAUSECELL_DYN_MEM+EVAL_MEM(set.eval_no))*
    set.members+(EQN_CELL_MEM*set.literals)+
    PDTreeStorage(set.demod_index)+
    FVIndexStorage(set.fvindex))
}

function ClauseSetCardinality(set)
{
   return set.members
}
function ClauseSetEmpty(set)
{
   return  (set.anchor.succ == set.anchor)
}

function ClauseSetMoveClause(set, clause)
{
   clause = ClauseSetExtractEntry(clause)
   return ClauseSetInsert((set), (clause))
}
function ClauseSetDocQuote(out, level, set, comment)
{
   return ClauseSetPropDocQuote((out), (level),CPIgnoreProps, (set), (comment))
}

if(!NDBUG){

}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_clauses.h

Author: Stephan Schulz

Contents
 
  Clauses - Infrastructure functions

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Apr 16 19:38:16 MET DST 1998
    New
<2> Mon Jan 11 00:05:24 MET 1999
    Added properties, proof_depth and proof_size

-----------------------------------------------------------------------*/

if(!CCL_CLAUSES){

var CCL_CLAUSES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_clauseproperties()
{
   function obj()
   {
      this.CPIgnoreProps       = 0                      /* For masking properties out */ 
      this.CPInitial           = 1                      /* Initial clause */
      this.CPInputClause       = 2*this.CPInitial       /* _Really_ initial clause in TSTP sense */ 
      this.CPIsProcessed       = 2*this.CPInputClause   /* Clause has been processed previously */ 
      this.CPIsOriented        = 2*this.CPIsProcessed   /* Term and literal
                                                           comparisons are up to
                                                           date */
      this.CPIsDIndexed        = 2*this.CPIsOriented    /* Clause is in the demod_index of its set */ 
      this.CPIsSIndexed        = 2*this.CPIsDIndexed    /* Clause is in the fvindex of its set */ 
      this.CPIsGlobalIndexed   = 2*this.CPIsSIndexed    /* Clause is in the Subterm FPIndex  */
      this.CPRWDetected        = 2*this.CPIsGlobalIndexed   /* Rewritability of the
                                                               clause has been
                                                               established. Temporary
                                                               property. */
      this.CPDeleteClause      = 2*this.CPRWDetected        /* Clause should be deleted for some reason */ 
      this.CPType1             = 2*this.CPDeleteClause      /* Three bits used to encode
                                                               the Clause type taken
                                                               from TPTP or  TSTP input
                                                               format or assumed */
      this.CPType2             = 2*this.CPType1        
      this.CPType3             = 2*this.CPType2       
      this.CPTypeMask          = this.CPType1|this.CPType2|this.CPType3
      this.CPTypeUnknown       = 0                      /* Also used as wildcard */
      this.CPTypeAxiom         = this.CPType1           /* Clause is Axiom */
      this.CPTypeHypothesis    = this.CPType2           /* Clause is Hypothesis */
      this.CPTypeConjecture    = this.CPType1|this.CPType2 /* Clause is Conjecture */
      this.CPTypeLemma         = this.CPType3               /* Clause is Lemma */
      this.CPTypeNegConjecture = this.CPType1|this.CPType3  /* Clause is an negated
                                                               conjecture (used for
                                                               refutation) */
      this.CPTypeQuestion      = this.CPType2|this.CPType3  /* Clause is a question -
                                                               only used for FOF really. */
      this.CPTypeWatchClause   = this.CPType1|this.CPType2|this.CPType3
                                                      /* Clause is intended as a
                                                         watch list clause */
      this.CPIsIRVictim        = 2*this.CPType3       /* Clause has just been
                                                         simplified in
                                                         interreduction */ 
      this.CPOpFlag            = 2*this.CPIsIRVictim  /* Temporary marker */
      this.CPIsSelected        = 2*this.CPOpFlag      /* For analysis of selected
                                                         clauses only */ 
      this.CPIsFinal           = 2*this.CPIsSelected  /* Clause is a final clause
                                                         i.e. a clause that
                                                         might be used by a
                                                         postprocessor. */ 
      this.CPIsProofClause  = 2*this.CPIsFinal        /* Clause is part of a successful proof. */
      this.CPIsSOS          = 2*this.CPIsProofClause  /* Clause is in the set of support.*/
      this.CPNoGeneration   = 2*this.CPIsSOS          /* No generating inferences
                                                         with this clause are
                                                         necessary */
      this.CP_CSSCPA_1      = 2*this.CPNoGeneration   /* CSSCPA clause sources */
      this.CP_CSSCPA_2      = 2*this.CP_CSSCPA_1 
      this.CP_CSSCPA_4      = 2*this.CP_CSSCPA_2 
      this.CP_CSSCPA_8      = 2*this.CP_CSSCPA_4
      this.CP_CSSCPA_Mask   = this.CP_CSSCPA_1|this.CP_CSSCPA_2|this.CP_CSSCPA_4|this.CP_CSSCPA_8
      this.CP_CSSCPA_Unkown = 0
      this.CPIsProtected    = 2*this.CP_CSSCPA_8      /* Unprocessed clause has
                                                         been used in
                                                         simplification and cannot
                                                         be deleted even if
                                                         parents die. */
      this.CPWatchOnly      = 2*this.CPIsProtected
      this.CPSubsumesWatch  = 2*this.CPWatchOnly
      this.CPLimitedRW      = 2*this.CPSubsumesWatch  /* Clause has been processed
                                                         and hence can only be
                                                         rewritten in limited
                                                         ways. */
      this.CPIsRelevant     = 2*this.CPLimitedRW      /* Clause is selected as
                                                         relevant for a proof
                                                         attempt. */
   } // obj 
   return obj
}
var ClauseProperties = typedef_enum_clauseproperties()


/* Hopefully unique ident for all clauses created duringproof run */
/* Running number, given on alloc, never modified */
/* ...at which this clause became a demodulator */
/* List of literals */
/* Negative literals */
/* Positive literals */
/* ClauseStandardWeight()
   precomputed at some points in
   the program */
/* List of evaluations */
/* Anything we want to note at
    the clause? */
/* Currently about source in input, NULL for derived clauses */
/* Derivation of the clause for proof reconstruction. */
/* At what iteration of the main loop has this clause been created? */
/* How long is the longest derivation chain from this clause to an axiom? */
/* How many (generating) inferences were necessary to create this clause? */
/* Which can be removed if this clause changes significantly */
/* Parents need to be notified */
/* if their children are removed! */
/* Is the clause in a set? */
/* For clause sets = doubly  */
/* linked lists */

function typedef_struct_clause_cell()
{
   function obj()
   {
      this.ident
      this.date = new SysDate()
      this.literals = new Eqn_p()
      this.neg_lit_no
      this.pos_lit_no
      this.weight
      this.evaluations = new Eval_p()
      this.properties = new ClauseProperties()
      this.info = new ClauseInfo_p()
      this.derivation = new PStack_p()
      this.reconstruction
      this.create_date
      this.proof_dep
      this.proof_size
      this.children = new PTree_p()
      this.prototype.parent1 = new obj()
      this.prototype.parent2 = new obj()
      this.set = new clausesetcell()
      this.prototype.pred = new obj()
      this.prototype.succ = new obj()
   }
   return obj
}
var ClauseCell = typedef_struct_clause_cell()
var Clause_p = typedef_struct_clause_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var ClausesHaveLocalVariables
var ClausesHaveDisjointVariables
var ClauseIdentCounter

function ClauseSetProp(clause, prop)
{
   return SetProp((clause), (prop))
}
function ClauseDelProp(clause, prop)
{
   return DelProp((clause), (prop))
}
function ClauseGiveProps(clause, prop)
{
   return GiveProps((clause), (prop))
}

/* Are _all_ properties in prop set in clause? */
function ClauseQueryProp(clause, prop)
{
   return QueryProp((clause), (prop))
}

/* Are any properties in prop set in clause? */
function ClauseIsAnyPropSet(clause, prop)
{
   return IsAnyPropSet((clause), (prop))
}

function ClauseQueryTPTPType(clause)
{
   return (clause.properties&CPTypeMask)
}

function TPTPTypesCombine(type1, type2)
{
   return ((type1==CPTypeAxiom)?(type2):((type2==CPTypeConjecture)?CPTypeConjecture:(type1)))
}

function ClauseSetCSSCPASource(clause,prop)
{
    clause = ClauseDelProp((clause),CP_CSSCPA_Mask)
    clause = ClauseSetProp((clause),(prop*CP_CSSCPA_1))
    return clause
}

function ClauseQueryCSSCPASource(clause)
{
   return ((clause.properties&CP_CSSCPA_Mask)/CP_CSSCPA_1)
}

function ClauseCellAllocRaw()
{
   return SizeMalloc(ClauseCell)
}
function ClauseCellFree(junk)
{
   SizeFree(junk,ClauseCell)
}

if(CONSTANT_MEM_ESTIMATE){
    var CLAUSECELL_MEM = 68
} else {
    function CLAUSECELL_MEM(){ return 68 }
}

function ClauseGCMarkTerms(clause)
{
    return EqnListGCMarkTerms(clause.literals)
}

function ClauseLiteralNumber(clause)
{
   return (clause.pos_lit_no+clause.neg_lit_no)
}

function ClausePropLitNumber(clause, prop)
{
   return EqnListQueryPropNumber(clause.literals,(prop))
}

function ClauseIsEmpty(clause)
{
   return (ClauseLiteralNumber(clause)==0)
}

function ClauseIsGoal(clause)
{
   return !(clause.pos_lit_no)
}
function ClauseIsHorn(clause)
{
   return (clause.pos_lit_no <= 1)
}
function ClauseIsUnit(clause)
{
   return (ClauseLiteralNumber(clause)==1)
}
function ClauseIsDemodulator(clause)
{
   return ((clause.pos_lit_no == 1) && (clause.neg_lit_no == 0))
}

function ClauseIsRWRule(clause)
{
   return (ClauseIsDemodulator(clause)&&EqnIsOriented(clause.literals))
}

function ClauseIsGround(clause)
{
    return EqnListIsGround(clause.literals)
}
function ClauseIsPositive(clause)
{
   return (clause.neg_lit_no == 0)
}
function ClauseIsNegative(clause)
{
   return (clause.pos_lit_no == 0)
}
function ClauseIsMixed(clause)
{
   return !(ClauseIsPositive(clause)||ClauseIsNegative(clause))
}

function ClauseIsHypothesis(clause)
{
   return (ClauseQueryTPTPType(clause)==CPTypeHypothesis)
}
function ClauseIsConjecture(clause)
{
   return ((ClauseQueryTPTPType(clause)==CPTypeNegConjecture) ||
    (ClauseQueryTPTPType(clause)==CPTypeConjecture))
}

function ClauseFindNegPureVarLit(clause)
{
   return EqnListFindNegPureVarLit(clause.literals)
}

function ClauseIsTrivial(clause)
{
   return EqnListIsTrivial(clause.literals)
}

function ClauseSubsumeOrderSortLits(clause)
{
   return ClauseSortLiterals((clause), EqnSubsumeInverseRefinedCompareRef)
}

function ClauseIsSubsumeOrdered(clause)
{
   return ClauseIsSorted((clause), EqnSubsumeInverseCompareRef)
}

function ClauseToStack(clause)
{
   return EqnListToStack(clause.literals)
}

function ClauseIsEquational(clause)
{
   return EqnListIsEquational(clause.literals) 
}

function ClauseIsPureEquational(clause)
{
   return EqnListIsPureEquational(clause.literals) 
}

function ClauseTermSetProp(clause, prop)
{
   return EqnListTermSetProp(clause.literals, (prop))
}

function ClauseTBTermDelPropCount(clause, prop)
{
   return EqnListTBTermDelPropCount(clause.literals, (prop))
}

function ClauseTermDelProp(clause, prop)
{
   return EqnListTermDelProp(clause.literals, (prop))
}

function ClauseIsSOS(clause)
{
   return ClauseQueryProp((clause), CPIsSOS)
}

function ClauseCondMarkMaximalTerms(ocb, clause)
{
    if(!ClauseQueryProp(clause, CPIsOriented))
    {
        return ClauseMarkMaximalTerms(ocb,clause)
    }
}

function ClauseOrientLiterals(ocb, clause)
{
   return EqnListOrient((ocb), clause.literals)
}

function ClauseMarkMaximalLiterals(ocb, clause)
{
   return EqnListMaximalLiterals((ocb), clause.literals)
}

function ClauseDeleteTermProperties(clause, props)
{
   return EqnListDeleteTermProperties(clause.literals, props)
}

function NormSubstClause(clause, subst, vars)
{
   return NormSubstEqnListExcept(clause.literals,NULL, (subst), (vars))
}

function ClauseAddSymbolDistribution(clause, dist_array)
{
   return EqnListAddSymbolDistribution(clause.literals, (dist_array))
}

function ClauseAddSymbolDistExist(clause, dist_array, exists)
{
   return EqnListAddSymbolDistExist(clause.literals, (dist_array), (exists))
}

function ClauseAddSymbolFeatures(clause, mod_stack, feature_array)
{
   return EqnListAddSymbolFeatures(clause.literals, (mod_stack), (feature_array))
}

function ClauseComputeFunctionRanks(clause, rank_array, count)
{
   return EqnListComputeFunctionRanks(clause.literals, (rank_array), (count))
}

function ClauseCollectVariables(clause,tree)
{
   return EqnListCollectVariables(clause.literals,(tree))
}

function ClauseAddFunOccs(clause, f_occur, res_stack)
{
   return EqnListAddFunOccs(clause.literals, (f_occur), (res_stack))
}

function CLAUSE_ENSURE_DERIVATION(clause)
{
    if(!clause.derivation){ 
        clause.derivation=PStackVarAlloc(3) 
    }
    return clause
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_clausesetfilters.h

Author: Stephan Schulz

Contents
 
  Functions for filtering clause sets for redundant and/or badly
  evaluated clauses.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:28:25 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CCL_CLAUSESETFILTERS){

var CCL_CLAUSESETFILTERS = 1

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

File  : ccl_condensation.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Implementation of the condensation rule:

  C
  == if C' is a factor of C, C' subsumes C
  C'

  Copyright 2012 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Wed Jul 11 01:44:53 CEST 2012
    New

-----------------------------------------------------------------------*/

if(!CCL_CONDENSATION){

var CCL_CONDENSATION = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var CondensationAttempts
var CondensationSuccesses

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_context_sr.h

Author: Stephan Schulz

Contents

  Declarations for functions implementing contextual simplify-reflect
  (or subsumption resolution in Vampire's terminology).

  C v L     C' v -L v R 
  ---------------------   if s(C v L) = C' v L for some subst. s
  C' v R

  Copyright 2003 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Jul 13 01:51:56 CEST 2003
    New

-----------------------------------------------------------------------*/

if(!CCL_CONTEXT_SR){

var CCL_CONTEXT_SR = 1

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

File  : ccl_def_handling.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Datatypes for handling clausal definitons as used (up to now
  implicitly) in splitting, i.e. data structures associating a clause
  with a fresh constant predicate symbol or literal.

  Copyright 2006 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Jun  4 16:02:41 EEST 2006
    New

-----------------------------------------------------------------------*/

if(!CCL_DEF_HANDLING){

var CCL_DEF_HANDLING = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_def_store_cell()
{
    function obj()
    {
        this.terms = new TB_p()
        this.def_clauses = new ClauseSet_p()
        this.def_assocs = new NumTree_p()
        this.def_archive = new FormulaSet_p()
    }
    return obj
}
var DefStoreCell = typedef_struct_def_store_cell()
var DefStore_p = typedef_struct_def_store_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function DefStoreCellAlloc()
{
   return SizeMalloc(DefStoreCell)
}

function DefStoreCellFree(junk)
{
   SizeFree(junk,DefStoreCell)
}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

}
/*-----------------------------------------------------------------------

File  : ccl_derivations.h

Author: Stephan Schulz (schulz@eprover.org)

Contents

  Datatypes and definitions for compact representation of derivations
  of a clause. 

  Copyright 2013 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Thu Feb 14 00:21:15 CET 2013
    New

-----------------------------------------------------------------------*/

if(!CCL_DERIVATION){

var CCL_DERIVATION = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_OpCodes()
{
    function obj()
    {
        this.DONop = 1<<0
        this.DOQuote = 1<<1
        this.DORewrite = 1<<2
        this.DOUnfold = 1<<3
        this.DOApplyDef = 1<<4
        this.DOContextSR = 1<<5
        this.DODesEqRes = 1<<6
        this.DOSR = 1<<7
        this.DOAcRes = 1<<8
        this.DOCondense = 1<<9
        this.DONormalize = 1<<10
        this.DOEvalAnswers = 1<<11
        this.DONegateConjecture = 1<<12
        this.DOFofSimplify = 1<<13
        this.DOFNNF = 1<<14
        this.DOShiftQuantors = 1<<15
        this.DOVarRename = 1<<16
        this.DOSkolemize = 1<<17
        this.DODistDisjunctions = 1<<18
        this.DOAnnoQuestion = 1<<19
        this.DOParamod = 1<<20
        this.DOSimParamod = 1<<21
        this.DOOrderedFactor = 1<<22
        this.DOEqFactor = 1<<23
        this.DOEqRes = 1<<24
        this.DOSplitEquiv = 1<<25
        this.DOIntroDef = 1<<26
        this.DOSplitConjunct = 1<<27
    }
    return obj
}
var OpCodes = typedef_enum_OpCodes()

function typedef_enum_ArgDesc()
{
    function obj()
    {
        this.Arg1Fof = 1<<8
        this.Arg1Cnf = 1<<9
        this.Arg1Num = 1<<10
        this.Arg2Fof = 1<<11
        this.Arg2Cnf = 1<<12
        this.Arg2Num = 1<<13
    }
    return obj
}
var ArgDesc = typedef_enum_ArgDesc()

function typedef_enum_DerivationCodes()
{   var en = new OpCodes()
    var vn = new ArgDesc()
    function obj()
    {
        this.DONop = en.DCNop
        this.DOQuote = en.DCCnfQuote|vn.Arg1Cnf
        this.DOQuote = en.DCFofQuote|vn.Arg1Fof
        this.DORewrite = en.DCRewrite|vn.Arg1Cnf
        this.DOUnfold = en.DCUnfold|vn.Arg1Cnf
        this.DOApplyDef = en.DCApplyDef|vn.Arg1Fof
        this.DOContextSR = en.DCContextSR|vn.Arg1Cnf
        this.DOSR = en.DCSR|vn.Arg1Cnf
        this.DODesEqRes = en.DCDesEqRes
        this.DOAcRes = en.DCACRes|vn.Arg1Num
        this.DOCondense = en.DCCondense
        this.DONormalize = en.DCNormalize
        this.DOEvalAnswers = en.DCEvalAnswers
        this.DONegateConjecture = en.DCNegateConjecture
        this.DOFofSimplify = en.DCFofSimplify
        this.DOFNNF = en.DCFNNF
        this.DOShiftQuantors = en.DCShiftQuantors
        this.DOVarRename = en.DCVarRename
        this.DOSkolemize = en.DCSkolemize
        this.DODistDisjunctions = en.DCDistDisjunctions
        this.DOAnnoQuestion = en.DCAnnoQuestion
        this.DOParamod = en.DCParamod|vn.Arg2Cnf|vn.Arg1Cnf
        this.DOSimParamod = en.DCSimParamod|vn.Arg2Cnf|vn.Arg1Cnf
        this.DOOrderedFactor = en.DCOrderedFactor|vn.Arg1Cnf
        this.DOEqFactor = en.DCEqFactor|vn.Arg1Cnf
        this.DOEqRes = en.DCEqRes|vn.Arg1Cnf
        this.DOSplitEquiv = en.DCSplitEquiv|vn.Arg1Fof
        this.DOIntroDef = en.DCIntroDef
        this.DOSplitConjunct = en.DCSplitConjunctvn.Arg1Fof
    }
    return obj
}
var DerivationCodes = typedef_enum_DerivationCodes()

function typedef_enum_ProofObjectType()
{
    function obj()
    {
        this.PONoObject = 0
        this.POSimpleDeriviation = 1
        this.PODetailedDerivation = 2
        this.POSingleStepDerivation = 3
    }
    return obj
}
var ProofObjectType = typedef_enum_ProofObjectType()

function typedef_struct_derived_cell()
{
    function obj()
    {
        this.ref_count
        this.is_root
        this.is_fresh
        this.clause = new Clause_p()
        this.formula = new WFormula_p()
    }
    return obj
}
var DerivedCell = typedef_struct_derived_cell()
var Derived_p = typedef_struct_derived_cell()

function typedef_struct_derivation_cell()
{
    function obj()
    {
        this.ordered
        this.sig = new Sig_p()
        this.deriv = new PObjTree_p()
        this.roots = new PStack_p()
        this.ordered_deriv = new PStack_p()
    }
    return obj
}
var DerivationCell = typedef_struct_derivation_cell()
var Derivation_p = typedef_struct_derivation_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function DCOpHasCnfArg1(op)
{
   return (op)&ArgDesc.Arg1Cnf
}
function DCOpHasFofArg1(op)
{
   return (op)&ArgDesc.Arg1Fof
}
function DCOpHasNumArg1(op)
{
   return (op)&ArgDesc.Arg1Num
}
function DCOpHasParentArg1(op)
{
   return (op)&(Arg1Cnf|Arg1Fof)
}
function DCOpHasArg1(op)
{
   return (op)&(ArgDesc.Arg1Cnf|ArgDesc.Arg1Fof|ArgDesc.Arg1Num)
}
function DCOpHasCnfArg2(op)
{
   return (op)&ArgDesc.Arg2Cnf
}
function DCOpHasFofArg2(op)
{
   return (op)&ArgDesc.Arg2Fof
}
function DCOpHasNumArg2(op)
{
   return (op)&ArgDesc.Arg2Num
}
function DCOpHasParentArg2(op)
{
   return (op)&(ArgDesc.Arg2Cnf|ArgDesc.Arg2Fof)
}
function DCOpHasArg2(op)
{
   return (op)&(ArgDesc.Arg2Cnf|ArgDesc.Arg2Fof|ArgDesc.Arg2Num)
}

function DPOpGetOpCode(op)
{
   return (op)&127
}

function DerivedCellAlloc()
{
   return SizeMalloc(DerivedCell)
}
function DerivedCellFree(junk)
{
   SizeFree(junk, DerivedCell)
}
function DerivedFree(junk)
{
   return  DerivedCellFree(junk)
}
function DerivationCellAlloc()
{
   return SizeMalloc(DerivationCell)
}
function DerivationCellFree(junk)
{
   SizeFree(junk, DerivationCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_eqn.h

Author: Stephan Schulz

Contents
 
  The termpair datatype: Rules, Equations, positive and negative
  literals. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Mar 13 17:09:13 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CCL_EQN){

var CCL_EQN = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_eqnproperties()
{
   function obj()
   {
      this.EPNoProps           =     0 /* No properties set or selected */
      this.EPIsPositive        =     1 /* s=t (as opposed to s!=t) */
      this.EPIsMaximal         =     2 /* Eqn is maximal in a clause */
      this.EPIsStrictlyMaximal =     4 /* Eqn is strictly maximal */
      this.EPIsEquLiteral      =     8 /* s=t not s=$true */
      this.EPIsOriented        =    16 /* s=>t  or s=t ? */
      this.EPMaxIsUpToDate     =    32 /* Orientation status is up to date */
      this.EPHasEquiv          =    64 /* Literal has been used in
                                          multiset-comparison (and found an
                                          equivalent partner) */ 
      this.EPIsDominated       =   128 /* Literal is dominated by another one */
      this.EPDominates         =   this.EPIsDominated /* Double use of this property
                                                         in potentially maximal or
                                                         minimal clauses */
      this.EPIsUsed            =   256 /* For non-injective subsumption and pattern-generation */
      this.EPGONatural         =   512 /* Set if left-side is bigger in the
                                          special (total) ground-ordering,
                                          treating variables as small
                                          constants */
      this.EPIsSelected        =  1024 /* For selective superpostion */
      this.EPIsPMIntoLit       =  2048 /* For inheriting selection */
      this.EPFromClauseLit     =  4096 /* This comes from the from clause in
                                      a paramod stthis.EP */
      this.EPPseudoLit         =  8192 /* This is a pseudo-literal that does
                                          not contribute to the semantic
                                          evaluation of the clause. */
      this.EPLPatMinimal       = 16384 /* Eqn l=r is Pattern-Minimal */
      this.EPRPatMinimal       = 32768 /* Eqn r=l is Pattern-Minimal */
      this.EPIsSplitLit        = 65636  /* This literal has been introduced by splitting */
   }
   return obj
}
var EqnProperties = typedef_enum_eqnproperties()

/* Basic data structure for rules, equations, literals. Terms are
   always assumed to be shared and need to be manipulated while taking
   care about references! */ 

function typedef_struct_eqncell()
{
    function obj()
    {
        this.properties = new EqnProperties()
        this.lterm = new Term_p()
        this.rterm = new Term_p()
        this.pos
        this.bank = new TB_p()
        this.eqncellnext
    }
    return obj
}
var EqnCell = typedef_struct_eqncell()
var Eqn_p = typedef_struct_eqncell()
var EqnRef = typedef_struct_eqncell()

function typedef_enum_EqnSide()
{
    function obj()
    {
        this.NoSide = 0
        this.LeftSide = 1
        this.MaxSide = 2
        this.RightSide = 3
        this.MinSide = 4
        this.BothSides = 5
    }
    return obj
}
var EqnSide = typedef_enum_EqnSide()

/* Which way to read an equation */

function typedef_enum_PatEqnDirection()
{
    function obj()
    {
        this.PENormal = 0
        this.PEReverse = 1
    }
    return obj
}
var PatEqnDirection = typedef_enum_PatEqnDirection()


/* What will be parsed as the equal-predicate: */

var EQUAL_PREDICATE = "equal"

if(CONSTANT_MEM_ESTIMATE){
EQN_CELL_MEM = 24
} else {
EQN_CELL_MEM = function (){ return 24 }/* Just a hack because PARCs seem to work like that... */
}

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var EqnUseInfix; /* s = t or EQ(s = t)  ? */
var EqnFullEquationalRep; /* P(x) = $true ? */
var OutputFormat = new IOFormat();

function EqnCellAlloc()
{
   return SizeMalloc(EqnCell)
}
function EqnCellFree(junk)
{
   SizeFree(junk, EqnCell)
}

function EqnGCMarkTerms(eqn)
{
   eqn.bank = TBGCMarkTerm(eqn.bank,eqn.lterm)
   eqn.bank = TBGCMarkTerm(eqn.bank,eqn.rterm)
   return eqn
}

function EqnSetProp(eqn, prop)
{
   return SetProp((eqn), (prop))
}
function EqnDelProp(eqn, prop)
{
   return DelProp((eqn), (prop))
}
function EqnFlipProp(eqn, prop)
{
   return FlipProp((eqn), (prop))
}

/* Are _all_ properties in prop set in eqn? */
function EqnQueryProp(eqn, prop)
{
   return QueryProp((eqn), (prop))
}

/* Are any properties in prop set in eqn? */
function EqnIsAnyPropSet(eqn, prop)
{
   return IsAnyPropSet((eqn), (prop))
}

function EqnIsOriented(eq)
{
   return EqnQueryProp((eq), EPIsOriented)
}
function EqnIsPositive(eq)
{
   return EqnQueryProp((eq), EPIsPositive)
}
function EqnIsNegative(eq)
{
   return !(EqnQueryProp((eq), EPIsPositive))
}
function EqnIsEquLit(eq)
{
   return EqnQueryProp((eq), EPIsEquLiteral)
}
function EqnIsMaximal(eq)
{
   return EqnQueryProp((eq), EPIsMaximal)
}
function EqnIsStrictlyMaximal(eq)
{
   return EqnQueryProp((eq), EPIsStrictlyMax)
}

function EqnGetPredCode(eq)
{
   return EqnIsEquLit(eq) ? 0:eq.lterm.f_code;
}
function EqnIsSplitLit(eq)
{
   return EqnIsEquLit(eq) ? false:SigQueryFuncProp(eq.bank.sig, EqnGetPredCode(eq), FPClSplitDef)
}

function EqnHasEquiv(eq)
{
   return  EqnQueryProp((eq), EPHasEquiv)
}
function EqnIsDominated(eq)
{
   return EqnQueryProp((eq), EPIsDominated)
}
function EqnDominates(eq)
{
   return EqnQueryProp((eq), EPDominates)
}
function EqnIsSelected(eq)
{
   return EqnQueryProp((eq), EPIsSelected)
}

function EqnIsPropTrue(eq)
{
   return ((eq.lterm == eq.rterm) && EqnIsPositive(eq))
}
function EqnIsPropFalse(eq)
{
   return ((eq.lterm == eq.rterm) && EqnIsNegative(eq))
}

function EqnIsGround(eq)
{
   return (TBTermIsGround(eq.lterm) && TBTermIsGround(eq.rterm))
}

function EqnIsPureVar(eq)
{
   return (TermIsVar(eq.lterm) && TermIsVar(eq.rterm))
}

function EqnIsPartVar(eq)
{
   return (TermIsVar(eq.lterm) || TermIsVar(eq.rterm))
}

function EqnIsPropositional(eq)
{
   return ((!EqnIsEquLit(eq)) && TermIsConst(eq.lterm))
}

function EqnIsTypePred(eq)
{
   return ((!EqnIsEquLit(eq))&&TBTermIsTypeTerm(eq.lterm))
}

function EqnIsXTypePred(eq)
{
   return ((!EqnIsEquLit(eq))&&TBTermIsXTypeTerm(eq.lterm))
}

function EqnIsRealXTypePred(eq)
{
   return ((!EqnIsEquLit(eq))&&TermIsDefTerm(eq.lterm,1))
}

function EqnIsSimpleAnswer(eq)
{
   return SigIsSimpleAnswerPred(eq.bank.sig, eq.lterm.f_code)
}

function EqnTermSetProp(eqn, prop)
{
   eqn.bank.rterm = TermSetProp(eq.bank.rterm, DEREF_NEVER, prop)
   eqn.bank.lterm = TermSetProp(eq.bank.lterm, DEREF_NEVER, prop)
   return eqn 
}

function EqnTBTermDelPropCount(eq,prop)
{
   eqn.lterm = TBTermDelPropCount(eq.lterm, prop)
   eqn.rterm = TBTermDelPropCount(eq.rterm, prop)
   return eqn
}

function EqnTermDelProp(eqn, prop)
{
   eqn.lterm = TermDelProp(eqn.lterm, DEREF_NEVER, (prop))
   eqn.rterm = TermDelProp(eqn.rterm, DEREF_NEVER, (prop))
   return eqn
}

function EqnTBTermEncode(eqn, dir)
{
   eqn.bank = EqnTermsTBTermEncode(eqn.bank, eqn.lterm,eqn.rterm, EqnIsPositive(eqn), (dir))
   return eqn.bank
}

function EqnPrintOriginal(out, eq)
{
   return EqnPrint(out, eq, normal, true)
}

function EqnSkolemSubst(handle, subst, sig)
{
   handle.lterm = SubstSkolemizeTerm(handle.lterm, subst, sig)
   handle.rterm = SubstSkolemizeTerm(handle.rterm, subst, sig)
   return handle
}

function EqnIsTrivial(eq, EqualTest)
{
   return EqualTest(eq.lterm, eq.rterm)
}

function EqnWeightCompare(l1, l2)
{
   return EqnStandardWeight(l1)-EqnStandardWeight(l2)
}

function LiteralEqual(eq1, eq2, EqualTest)
{
   return PropsAreEquiv(eq1,eq2,EPIsPositive) && EqnEqual(eq1,eq2,EqualTest)
}

function EqnEquiv(eq1, eq2, EqualTest)
{
   return EqnSubsumeP(eq1,eq2,EqualTest) && EqnSubsumeP(eq2,eq1,EqualTest)
}

function LiteralEquiv(eq1, eq2, EqualTest)
{
   return ((eq1.positive == eq2.positive) && EqnEquiv(eq1,eq2,EqualTest))
}

function EqnStandardWeight(eqn)
{
   return (TermStandardWeight(eqn.lterm) + TermStandardWeight(eqn.rterm))
}

function EqnSplitModStandardWeight(eqn)
{
   var en = new EqnProperties()
   return EqnQueryProp(eqn,en.EPIsSplitLit|en.EPIsPositive) ? SigGetSpecialWeight(eqn.bank.sig, eqn.lterm.f_code):EqnStandardWeight(eqn);
}

function EqnStandardDiff(eqn)
{
   return MAX(TermStandardWeight(eqn.lterm),TermStandardWeight(eqn.rterm)) - MIN(TermStandardWeight(eqn.lterm),TermStandardWeight(eqn.rterm))
}

function EqnCountMaximalLiterals(eqn)
{
   return EqnIsOriented(eqn) ? 1:2
}

function EqnAddSymbolDistribution(eqn, dist_array)
{
   eqn.lterm = TermAddSymbolDistribution(eqn.lterm, (dist_array))
   eqn.rterm = TermAddSymbolDistribution(eqn.rterm, (dist_array))
   return eqn
}
function EqnAddSymbolDistExist(eqn, dist_array, exist)
{
   eqn.lterm = TermAddSymbolDistExist(eqn.lterm, dist_array, exist)
   eqn.rterm - TermAddSymbolDistExist(eqn.rterm, dist_array, exist)
   return eqn
}

function EqnAddSymbolDistributionLimited(eqn, dist_array, limit)
{
   eqn.lterm = TermAddSymbolDistributionLimited(eqn.lterm, dist_array, limit)
   eqn.rterm = TermAddSymbolDistributionLimited(eqn.rterm, dist_array, limit)
   return eqn
}
function EqnAddSymbolFeaturesLimited(eqn, freq_array, depth_array, limit)
{
   eqn.lterm = TermAddSymbolFeaturesLimited(eqn.lterm, 0, freq_array, depth_array, limit)
   eqn.rterm = TermAddSymbolFeaturesLimited(eqn.rterm, 0, freq_array, depth_array, limit)
   return eqn
}

function EqnComputeFunctionRanks(eqn, rank_array, count)
{
   eqn.lterm = TermComputeFunctionRanks(eqn.lterm, rank_array, count)
   eqn.rterm = TermComputeFunctionRanks(eqn.rterm, rank_array, count)
   return eqn
}

function EqnCollectVariables(eqn, tree)
{
   return (TermCollectVariables(eqn.lterm,tree)+TermCollectVariables(eqn.rterm,tree))
}

function EqnCollectPropVariables(eqn, tree, prop)
{
   return (TermCollectPropVariables(eqn.lterm,tree, prop)+TermCollectPropVariables(eqn.term,tree, prop))
}

function EqnAddFunOccs(eqn, f_occur, res_stack)
{
   return (TermAddFunOcc(eqn.lterm,f_occur, res_stack)+TermAddFunOcc(eqn.rterm, f_occur, res_stack))
}

/*---------------------------------------------------------------------*/
/*                        Inline Functions                             */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: EqnDepth()
//
//   Return the depth of an equation
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function EqnDepth(eqn)
{
   return MAX(TermDepth(eqn.lterm), TermDepth(eqn.rterm))
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/
/*-----------------------------------------------------------------------

File  : ccl_eqnlist.h

Author: Stephan Schulz

Contents
 
   Functions for dealing with (singly linked) lists of equations as
   used in clauses.  

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Apr 10 16:46:17 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CCL_EQNLIST){

var CCL_EQNLIST = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function EqnListExtractFirst(list)
{
   return EqnListExtractElement(list)
}

function EqnListDeleteFirst(list)
{
   return EqnListDeleteElement(list)
}

function EqnListInsertFirst(list, element)
{
   return EqnListInsertElement((list), (element))
}

function NormSubstEqnList(list, subst, vars)
{
   return NormSubstEqnListExcept((list), NULL, (subst), (vars))
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_eqnresolution.h

Author: Stephan Schulz

Contents
 
  Routines for performing (ordered) equality resolution.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Jun  5 18:36:46 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CCL_EQNRESOLUTION){

var CCL_EQNRESOLUTION = 1

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

File  : ccl_factor.h

Author: Stephan Schulz

Contents
 
  Functions for ordered factorisation.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun May 31 19:12:41 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CCL_FACTOR){

var CCL_FACTOR = 1

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

File  : ccl_fcvindexing.h

Author: Stephan Schulz

Contents

  Functions for handling frequency count vector indexing for clause
  subsumption.

  Copyright 2003 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Jul  1 13:05:36 CEST 2003
    New
<2> Sun Feb  6 02:16:41 CET 2005 (actually 2 weeks or so earlier)
    Switched to IntMap

-----------------------------------------------------------------------*/

if(!CCL_FCVINDEXING){

var CCL_FCVINDEXING = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_fvindex_parms_cell()
{
    function obj()
    {
        this.cspec = new FVCollectCell()
        this.use_perm_vectors
        this.eliminate_uninformative
        this.max_symbols
        this.symbol_slack
    }
    return obj
}
var FVIndexParmsCell = typedef_struct_fvindex_parms_cell()
var FVIndexParms_p = typedef_struct_fvindex_parms_cell()

function typedef_struct_fv_index_cell()
{
    function obj()
    {
        this.final
        this.clause_count
        this.ul = {
           successors : new IntMap_p(),
           clauses : new PTree_p()
        }
    }
    return obj
}
var FVIndexCell = typedef_struct_fv_index_cell()
var FVIndex_p = typedef_struct_fv_index_cell()

function typedef_struct_fvi_anchor_cell()
{
    function obj()
    {
        this.cspec = new FVCollect_p()
        this.perm_vector = new PermVector_p()
        this.index = new FVIndex_p()
        this.storage
    }
    return obj
}
var FVIAnchorCell = typedef_struct_fvi_anchor_cell()
var FVIAnchor_p = typedef_struct_fvi_anchor_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* extern FVIndexParmsCell FVIDefaultParameters; */

function FVIndexParmsCellAlloc()
{
   return SizeMalloc(FVIndexParmsCell)
}
function FVIndexParmsCellFree(junk)
{
    SizeFree(junk, FVIndexParmsCell)
}

function FVIndexParmsFree(junk)
{
    FVIndexParmsCellFree(junk)
}

function FVIndexCellAlloc()
{
   return SizeMalloc(FVIndexCell)
}
function FVIndexCellFree(junk)
{
    SizeFree(junk, FVIndexCell)
}

function FVIAnchorCellAlloc()
{
   return SizeMalloc(FVIAnchorCell)
}
function FVIAnchorCellFree(junk)
{
    SizeFree(junk, FVIAnchorCell)
}

if(CONSTANT_MEM_ESTIMATE){
var FVINDEX_MEM = 16
} else {
FVINDEX_MEM = function (){ return 16 }
}

function FVIndexStorage(index)
{
   return (index)?index.storage:0
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_f_generality.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Code for computing the generality of function/predicate symbols
  using a generalize SinE approach, counting occurences in terms,
  literals, clauses, and formulas.

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jun 30 23:30:02 CEST 2010
    New

-----------------------------------------------------------------------*/

if(!CCL_F_GENERALITY){

var CCL_F_GENERALITY = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* How often does a give f_code occur in certain substructures? */

function typedef_struct_fun_gen_cell()
{
    function obj()
    {
        this.f_code = new FunCode()
        this.term_freq
        this.fc_freq
    }
    return obj
}
var FunGenCell = typedef_struct_fun_gen_cell()
var FunGen_p = typedef_struct_fun_gen_cell()

/* Distribution of the above... */

function typedef_struct_gen_distrib_cell()
{
    function obj()
    {
        this.sig = new Sig_p()
        this.size
        this.dist_array = new FunGen_p()
        this.f_distrib
    }
    return obj
}
var GenDistribCell = typedef_struct_gen_distrib_cell()
var GenDistrib_p = typedef_struct_gen_distrib_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function GenDistribCellAlloc()
{
   return SizeMalloc(GenDistribCell)
}
function GenDistribCellFree(junk)
{
   SizeFree(junk, GenDistribCell)
}

function GenDistribAddClauseSets(dist, stack)
{
   return GenDistribAddClauseSetStack((dist), (stack), 0, 1)
}

function GenDistribAddFormulaSets(dist, stack)
{
   return GenDistribAddFormulaSetStack((dist), (stack), 0, 1)
}

function GenDistribBacktrackClauseSets(dist, stack, sp)
{
   return GenDistribAddClauseSetStack((dist), (stack), (sp), -1)
}

function GenDistribBacktrackFormulaSets(dist, stack, sp)
{
   return GenDistribAddFormulaSetStack((dist), (stack), (sp), -1)
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_findex.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Implementation of function symbol indexing into clauses/formulas.

  Copyright 2009 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Sun May 31 11:20:27 CEST 2009
    New

-----------------------------------------------------------------------*/

if(!CCL_FINDEX){

var CCL_FINDEX = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* We cheat a bit by knowing that FunCodes are
* long ints and can be used as indices here. */
function typedef_struct_findex_cell()
{
    function obj()
    {
      this.index = new PDArray_p()
    }
    return obj
}
var FIndexCell = typedef_struct_findex_cell()
var FIndex_p = typedef_struct_findex_cell()

/*---------------------------------------------------------------------*/
/*                      Functions and Variables                        */
/*---------------------------------------------------------------------*/

function FIndexCellAlloc()
{
   return SizeMalloc(FIndexCell)
}
function FIndexCellFree(junk)
{
   SizeFree(junk, FIndexCell)
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_formulafunc.h

Author: Stephan Schulz

Contents
 
  Higher level Formula functions that need to know about sets (and
  CNFing).

  Copyright 2004 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Apr  4 14:10:19 CEST 2004
    New

-----------------------------------------------------------------------*/

if(!CCL_FORMULAFUNC){

var CCL_FORMULAFUNC = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var TFORMULA_GC_LIMIT = 1.5


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_formulaset.h

Author: Stephan Schulz

Contents
 
  Data type for (wrapped) formula sets. 

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Jun 11 16:24:27 CEST 2009
    New (factored out from ccl_wrapped_formulas.h)

-----------------------------------------------------------------------*/

if(!CCL_FORMULASETS){

var CCL_FORMULASETS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_formula_set_cell()
{
    function obj()
    {
        this.anchor = new WFormula_p()
        this.members
    }
    return obj
}
var FormulaSetCell = typedef_struct_formula_set_cell()
var FormulaSet_p = typedef_struct_formula_set_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function FormulaSetCellAlloc()
{
   return SizeMalloc(FormulaSetCell)
}
function FormulaSetCellFree(junk)
{
    SizeFree(junk, FormulaSetCell)
}

function FormulaSetCardinality(set)
{
   return set.members
}
function FormulaSetEmpty(set)
{
   return (set.anchor.succ == set.anchor)
}

function FormulaSetMoveFormula(set, form)
{
   set = FormulaSetExtractEntry(set,form)
   return FormulaSetInsert((set), (form))
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_formula_wrapper.h

Author: Stephan Schulz

Contents
 
  Data type wrapping formulas, with all the stuff that really only
  applies to input or top-level formulae, not to recursive
  subformulae. Also has formula sets (well, wrapped formula sets). 

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Nov 12 17:17:44 GMT 2003
    New

-----------------------------------------------------------------------*/

if(!CCL_FORMULA_WRAPPER){

var CCL_FORMULA_WRAPPER = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_WFormulaProperties()
{
   function obj()
   {
      this.WPIgnoreProps        = 0,        /* For masking properties out */
      this.WPInitial            = 1,        /* Input formula */
      this.WPInputFormula       = ClauseProperties.CPInputClause, /* _Really_ initial in TSTP sense */
      this.WPType1              = ClauseProperties.CPType1, /* 128 */
      this.WPType2              = ClauseProperties.CPType2, 
      this.WPType3              = ClauseProperties.CPType3,
      this.WPTypeMask           = ClauseProperties.CPTypeMask,
      this.WPTypeUnknown        = 0,        /* Also used as wildcard */
      this.WPTypeAxiom          = ClauseProperties.CPTypeAxiom,      /* Formula is Axiom */
      this.WPTypeHypothesis     = ClauseProperties.CPTypeHypothesis, /* Formula is Hypothesis */
      this.WPTypeConjecture     = ClauseProperties.CPTypeConjecture, /* Formula is Conjecture */
      this.WPTypeLemma          = ClauseProperties.CPTypeLemma,      /* Formula is Lemma */
      this.WPTypeNegConjecture  = ClauseProperties.CPTypeNegConjecture, /* Formula is NegConjecture */
      this.WPTypeQuestion       = ClauseProperties.CPTypeQuestion,
      this.WPIsRelevant         = ClauseProperties.CPIsRelevant
   }
   return obj
}
var WFormulaProperties = typedef_enum_WFormulaProperties()

function typedef_struct_wformula_cell()
{
    function obj()
    {
        this.properties = new WFormulaProperties()
        this.ident
        this.terms = new TB_p()
        this.info = new ClauseInfo_p()
        this.derivation = new PStack_p()
        this.tformula = new TFormula_p()
        this.formula_set_cellset
        this.wformula_cellpred
        this.wformula_cellsucc
    }
    return obj
}
var WFormulaCell = typedef_struct_wformula_cell()
var WFormula_p = typedef_struct_wformula_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var FormulaIdentCounter
var FormulaTermEncoding
var FormulaDefLimit

function FormulaSetProp(form, prop)
{
   return SetProp((form), (prop))
}
function FormulaDelProp(form, prop)
{
   return DelProp((form), (prop))
}
function FormulaGiveProps(form, prop)
{
   return GiveProps((form), (prop))
}

/* Are _all_ properties in prop set in form? */
function FormulaQueryProp(form, prop)
{
   return QueryProp((form), (prop))
}
/* Are any properties in prop set in form? */
function FormulaIsAnyPropSet(form, prop)
{
   return IsAnyPropSet((form), (prop))
}
function FormulaSetType(form, type)
{
   form = FormulaDelProp((form), WFormulaProperties.WPTypeMask)
   return FormulaSetProp((form), (type))
}

function FormulaQueryType(form)
{
   return form.properties&CPTypeMask
}

function FormulaIsHypothesis(form)
{
   return FormulaQueryType(form)==WWFormulaProperties.PTypeHypothesis
}
function FormulaIsConjecture(form)
{
   return ((FormulaQueryType(form)==WWFormulaProperties.WPTypeNegConjecture) || 
      (FormulaQueryType(form)==WWFormulaProperties.WPTypeConjecture) || 
      (FormulaQueryType(form)==WWFormulaProperties.WPTypeQuestion))
}

function WFormulaStandardWeight(wform)
{
    return TermStandardWeight(wform.tformula)
}

function WFormulaCellAlloc()
{
   return SizeMalloc(WFormulaCell)
}
function WFormulaCellFree(junk)
{
   SizeFree(junk, WFormulaCell)
}


}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_freqvectors.h

Author: Stephan Schulz

Contents

  Functions for handling frequency count vectors and permutation
  vectors. 

  2003 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Jul  8 21:48:35 CEST 2003  
    New (separated FreqVector from fcvindexing.*)

-----------------------------------------------------------------------*/

if(!CCL_FREQVECTORS){

var CCL_FREQVECTORS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var PermVector_p = new FixedDArray_p()

function typedef_struct_tuple3_cell()
{
    function obj()
    {
        this.pos
        this.diff
        this.value
    }
    return obj
}
var Tuple3Cell = typedef_struct_tuple3_cell()

var FVINDEX_MAX_FEATURES_DEFAULT = 17  /* Maximal lenght of feature vector */
var FVINDEX_SYMBOL_SLACK_DEFAULT = 0   /* Reserve symbols for splitting */

function typedef_struct_freq_vector_cell()
{
    function obj()
    {
        this.size
        this.array
        this.clause = new Clause_p()
    }
    return obj
}
var FreqVectorCell = typedef_struct_freq_vector_cell()
var FreqVector_p = typedef_struct_freq_vector_cell()
var FVPackedClause_p = typedef_struct_freq_vector_cell()

/* Where do the symbol-specific features in classival FV-Vectors
 * begin? */
var FV_CLAUSE_FEATURES = 2

function typedef_enum_FVIndexType()
{
    function obj()
    {
        this.FVINoFeatures = 1<<0
        this.FVIACFeatures = 1<<1
        this.FVISSFeatures = 1<<2
        this.FVIAllFeatures = 1<<3
        this.FVIBillFeatures = 1<<4
        this.FVIBillPlusFeatures = 1<<5
        this.FVIACFold = 1<<6
        this.FVIACStagger = 1<<7
        this.FVICollectFeatures = 1<<8
    }
    return obj
}
var FVIndexType = typedef_enum_FVIndexType()

/* Describe how to assembe a feature vector out of a full signature
 * feature vector. */

/* Use pos_lit_no/neg_lit_no */
/* Mapping from full positions to reduced
                                positions */
/* Size of the assembly vector */
/* How long is the result? */
/* The rest describe how to handle index values that are larger
      than  ass_vec_len. If _mod is zero, the value is discarded,,
      otherwise it is added to  _offset+(f_code%_mod) */
/* Legacy parameters for classical implementation. These are not
    * supported by the allocator and must be overwritten manually. */

function typedef_struct_fv_collect_cell()
{
    function obj()
    {
        this.features = new FVIndexType()
        this.use_litcount
        this.assembly_vector
        this.ass_vec_len
        this.res_vec_len
        this.pos_count_base
        this.pos_count_offset
        this.pos_count_mod
        this.neg_count_base
        this.neg_count_offset
        this.neg_count_mod
        this.pos_depth_base
        this.pos_depth_offset
        this.pos_depth_mod
        this.neg_depth_base
        this.neg_depth_offset
        this.neg_depth_mod
        this.max_symbols
    }
    return obj
}
var FVCollectCell = typedef_struct_fv_collect_cell()
var FVCollect_p = typedef_struct_fv_collect_cell()


/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PermVectorAlloc(size)
{
    return FixedDArrayAlloc(size)
}
function PermVectorFree(junk)
{
    return FixedDArrayFree(junk)
}
function PermVectorCopy(vec)
{
    return FixedDArrayCopy(vec)
}
function PermVectorPrint(out,vec)
{
    return FixedDArrayPrint((out),(vec))
}

function FreqVectorCellAlloc()
{
   return SizeMalloc(FreqVectorCell)
}
function FreqVectorCellFree(junk)
{
    SizeFree(junk, FreqVectorCell)
}

function FVACCompatSize(size)
{
   return (size+1)*2+FV_CLAUSE_FEATURES
}
function FVSSCompatSize(size)
{
   return (size+1)*2
}
function FVFullSize(size)
{
   return (size+1)*4+FV_CLAUSE_FEATURES
}
function FVSize(size, features)
{
   return ((features)==FVIACFeatures)?FVACCompatSize(size):((features==FVISSFeatures)?FVSSCompatSize(size):FVFullSize(size))
}

function FVCollectCellAlloc()
{
   return SizeMalloc(FVCollectCell)
}
function FVCollectCellFree(junk)
{
    SizeFree(junk, FVCollectCell)
}

if(!NDEBUG){
    junk=NULL
} else {
    function FreqVectorFree(junk){ FreqVectorFreeReal(junk) }
}

if(!NDEBUG){
    junk=NULL
} else {
    function FVPackedClauseFree(junk) { FVPackedClauseFreeReal(junk) }
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_garbage_coll.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  High-level support for the term cell garbage collection. This
  integrates a term bank and all clause- and formulasets which use
  terms from this bank.

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Mar 20 09:26:51 CET 2010
    New

-----------------------------------------------------------------------*/

if(!CCL_GARBAGE_COLL){

var CCL_GARBAGE_COLL = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_gc_admin_cell()
{
    function obj()
    {
        this.bank = new TB_p()
        this.clause_sets = new PTree_p()
        this.formula_sets = new PTree_p()
    }
    return obj
}
var GCAdminCell = typedef_struct_gc_admin_cell()
var GCAdmin_p = typedef_struct_gc_admin_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function GCAdminCellAlloc()
{
   return SizeMalloc(GCAdminCell)
}
function GCAdminCellFree(junk)
{
    SizeFree(junk, GCAdminCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_g_lithash.h

Author: Stephan Schulz

Contents
 
  Algorithms and data structures implementing a simple literal
  indexing structure for implementing local unification constraints
  for the grounding procedure.

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes 

<1> Wed Jun 20 15:26:11 CEST 2001
    New

-----------------------------------------------------------------------*/

if(!CCL_G_LITHASH){

var CCL_G_LITHASH = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* The actual literal (left hand side of E equation -
    we are only doing this for non-equational literals, */

/* If literal occurs in exactly one clause, note
   it here, otherwise this is 0. Note that only,
   literals actually occurring in the clause set,
   should be in the index */

function typedef_struct_lit_desc_cell()
{
    function obj()
    {
        this.lit = new Term_p()
        this.clause = new Clause_p()
    }
    return obj
}
var LitDescCell = typedef_struct_lit_desc_cell()
var LitDesc_p = typedef_struct_lit_desc_cell()

/* Note that while we store shared terms, we do not take any refrences
   to them. Hence the literal hash is only guaranteed to be valid, as
   long as all the clauses contributing to it are in existance! */

/* Largest symbol in sig */
/* Array of PObjTrees for each predicate */
/* symbol, literals are stored separated by
			   sign */

function typedef_struct_lit_hash_cell()
{
    function obj()
    {
        this.sig_size
        this.pos_lits = new PTree_p()
        this.neg_lits = new PTree_p()
    }
    return obj
}
var LitHashCell = typedef_struct_lit_hash_cell()
var LitHash_p = typedef_struct_lit_hash_cell()


/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function LitDescCellAlloc()
{
   return SizeMalloc(LitDescCell)
}
function LitDescCellFree(junk)
{
    SizeFree(junk, LitDescCell)
}

function LitHashCellAlloc()
{
   return SizeMalloc(LitHashCell)
}
function LitHashCellFree(junk)
{
    SizeFree(junk, LitHashCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_global_indices.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Code abstracting several (optional) indices into one structure. 

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri May  7 21:13:39 CEST 2010
    New

-----------------------------------------------------------------------*/

if(!CCL_GLOBAL_INDICES){

var CCL_GLOBAL_INDICES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_global_indices_cell()
{
    function obj()
    {
        this.rw_bw_index_typeMAX_PM_INDEX_NAME_LEN
        this.pm_from_index_typeMAX_PM_INDEX_NAME_LEN
        this.pm_into_index_typeMAX_PM_INDEX_NAME_LEN
        this.pm_negp_index_typeMAX_PM_INDEX_NAME_LEN
        this.sig = new Sig_p()
        this.bw_rw_index = new SubtermIndex_p()
        this.pm_from_index = new OverlapIndex_p()
        this.pm_into_index = new OverlapIndex_p()
        this.pm_negp_index = new OverlapIndex_p()
    }
    return obj
}
var GlobalIndices = typedef_struct_global_indices_cell()
var GlobalIndices_p = typedef_struct_global_indices_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_groundconstr.h

Author: Stephan Schulz

Contents

  Computing constraints on the possible instances of groundable
  clauses. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Jun  7 23:45:05 MEST 2001
    New

-----------------------------------------------------------------------*/

if(!CCL_GROUNDCONSTR){

var CCL_GROUNDCONSTR = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_lit_constr_cell()
{
    function obj()
    {
        this.constrained
        this.constraints = new PTree_p()
    }
    return obj
}
var LitConstrCell = typedef_struct_lit_constr_cell()

function typedef_struct_lit_occ_table()
{
    function obj()
    {
        this.sig_size
        this.maxarity
        this.matrix = new LitConstrCell()
    }
    return obj
}
var LitOccTableCell = typedef_struct_lit_occ_table()
var LitOccTable_p = typedef_struct_lit_occ_table()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function LitOccTableCellAlloc()
{
   return SizeMalloc(LitOccTableCell)
}
function LitOccTableCellFree(junk)
{
    SizeFree(junk, LitOccTableCell)
}

function LIT_OCC_TABLE_REF(table, pred, arity)
{
   return table.matrix[((table.sig_size)*(arity)+(pred))]
}

function LIT_OCC_TABLE_ENTRY(table, pred, arity)
{
   return LIT_OCC_TABLE_REF(table,pred,arity)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_grounding.h

Author: Stephan Schulz

Contents
 
  Definitions for functions (and possibly later data types)
  implementing grounding of near-propositional clause sets.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue May 29 02:20:15 CEST 2001
    New

-----------------------------------------------------------------------*/

if(!CCL_GROUNDING){

var CCL_GROUNDING = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* For a variable, keep track of possible and done instantiations */

function typedef_struct_var_inst()
{
    function obj()
    {
        this.variable = new Term_p()
        this.alternatives = new PStack_p()
        this.position = new PStackPointer()
    }
    return obj
}
var VarInstCell = typedef_struct_var_inst()
var VarInst_p = typedef_struct_var_inst()

/* For many variables, do the same */

function typedef_struct_varset_inst()
{
    function obj()
    {
        this.size
        this.cells = new VarInst_p()
    }
    return obj
}
var VarSetInstCell = typedef_struct_varset_inst()
var VarSetInst_p = typedef_struct_varset_inst()

/* We represent a set of ground clauses in a special way, with
   unit-clauses in a single array for efficient unit subsumption and
   unit resolution */

function typedef_enum_GCUEncoding()
{
    function obj()
    {
        this.GCUNone = 0
        this.GCUPos = 1
        this.GCUNeg = 2
        this.GCUPos = GCUBoth|GCUNeg
    }
    return obj
}
var GCUEncoding = typedef_enum_GCUEncoding()

DEFAULT_LIT_NO = 4096
DEFAULT_LIT_GROW = 8192

function typedef_enum_GroundSetState()
{
    function obj()
    {
        this.cpl_complete
        this.cpl_lowmem
        this.cpl_timeout
        this.cpl_unknown
    }
    return obj
}
var GroundSetState = typedef_enum_GroundSetState()


/* Only reference, not administered
			         from here! */
/* Maximal literal number */
/* Is the proofstate complete? */
/* Wich ones are present? */
/* And how do they look? */

function typedef_struct_ground_set_cell()
{
    function obj()
    {
        this.lit_bank = new TB_p()
        this.max_literal
        this.unit_no
        this.complete = new GroundSetState()
        this.units = new PDArray_p()
        this.unit_terms = new PDArray_p()
        this.non_units = new PropClauseSet_p()
    }
    return obj
}
var GroundSetCell = typedef_struct_ground_set_cell()
var GroundSet_p = typedef_struct_ground_set_cell()


/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function VarSetInstCellAlloc()
{
   return SizeMalloc(VarSetInstCell)
}
function VarSetInstCellFree(junk)
{
    SizeFree(junk, VarSetInstCell)
}

function EqnLitCode(eq)
{
   return eq.lterm.entry_no
}

function GroundSetCellAlloc()
{
   return SizeMalloc(GroundSetCell)
}
function GroundSetCellFree(junk)
{
    SizeFree(junk, GroundSetCell)
}

function GroundSetMembers(set)
{
   return set.unit_no+(set.non_units.members)
}

/* Dimacs format provers oven cannot cope with empty clauses, so we
   print them as a set of two trivially complementary clauses */
function GroundSetDimacsPrintMembers(set)
{
   return (GroundSetMembers(set)+set.non_units.empty_clauses)
}

function GroundSetLiterals(set)
{
   return set.unit_no+(set.non_units.literals)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_inferencedoc.h

Author: Stephan Schulz

Contents
 
  Functions and constants for reporting on the proof process.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Jan  5 15:27:37 MET 1999
    Partially new, partially lifted from ccl_clauses.[ch]

-----------------------------------------------------------------------*/

if(!CCL_INFERENCEDOC){

var CCL_INFERENCEDOC = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_InfType()
{
    function obj()
    {
        this.inf_noinf
        this.inf_initial
        this.inf_quote
        this.inf_paramod
        this.inf_sim_paramod
        this.inf_efactor
        this.inf_factor
        this.inf_eres
        this.inf_split
        this.inf_simplify_reflect
        this.inf_context_simplify_reflect
        this.inf_ac_resolution
        this.inf_condense
        this.inf_minimize
        this.inf_rewrite
        this.inf_fof_simpl
        this.inf_fof_split_equiv
        this.inf_fof_nnf
        this.inf_fof_intro_def
        this.inf_fof_apply_def
        this.inf_shift_quantors
        this.inf_fof_distrib
        this.inf_annotate_question
        this.inf_eval_answers
        this.inf_var_rename
        this.inf_skolemize_out
        this.inf_neg_conjecture
    }
    return obj
}
var InfType = typedef_enum_InfType()

   
function typedef_enum_OutputFormatType()
{
    function obj()
    {
        this.no_format
        this.lop_format
        this.pcl_format
        this.tstp_format
        this.tptp_format
        this.xml_format
    }
    return obj
}
var OutputFormatType = typedef_enum_OutputFormatType()
 

var PCL_QUOTE = NULL
var PCL_ER = "er"
var PCL_PM = "pm"
var PCL_SPM = "spm"
var PCL_EF = "ef"
var PCL_OF = "of"
var PCL_SPLIT = "split"
var TSTP_SPLIT_REFINED = "esplit"
var TSTP_SPLIT_BASE = "split"
var PCL_RW = "rw"
var PCL_SR = "sr"
var PCL_CSR = "csr"
var PCL_ACRES = "ar"
var PCL_CN = "cn"
var PCL_CONDENSE = "condense"

var PCL_SC = "split_conjunct"
var PCL_SE = "split_equiv"
var PCL_FS = "fof_simplification"
var PCL_NNF = "fof_nnf"
var PCL_ID = "introduced"
var PCL_ID_DEF = "introduced(definition)"
var PCL_AD = "apply_def"
var PCL_SQ = "shift_quantors"
var PCL_VR = "variable_rename"
var PCL_SK = "skolemize"
var PCL_DSTR = "distribute"
var PCL_ANNOQ = "add_answer_literal"
var PCL_EVANS = "eval_answer_literal"
var PCL_NC = "assume_negation"

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function DocClauseCreationDefault(clause, op, parent1, parent2)
{
   return DocClauseCreation(GlobalOut, OutputLevel, (clause),(op), (parent1), (parent2), NULL)
}
function DocClauseModificationDefault(clause, op, partner)
{
   return DocClauseModification(GlobalOut, OutputLevel, (clause), (op),(partner), NULL, NULL)
}

function DocClauseQuoteDefault(target_level, clause, comment)
{
   return DocClauseQuote(GlobalOut, OutputLevel, (target_level),(clause), (comment), NULL)
}

function DocClauseRewriteDefault(rewritten, old_term)
{
   return DocClauseRewrite(GlobalOut, OutputLevel, (rewritten),(old_term), NULL)
}

function DocFormulaCreationDefault(formula, op, parent1, parent2)
{
   return DocFormulaCreation(GlobalOut, OutputLevel, (formula),(op), (parent1), (parent2), NULL)
}

function DocFormulaModificationDefault(form, op)
{
   return DocFormulaModification(GlobalOut, OutputLevel, (form), (op), NULL)
}

function DocFormulaIntroDefsDefault(form, def_list)
{
   return DocFormulaIntroDefs(GlobalOut, OutputLevel, (form), (def_list), NULL)
}

function DocIntroSplitDefDefault(form)
{
   return DocIntroSplitDef(GlobalOut, OutputLevel, (form))
}

function DocIntroSplitDefRestDefault(clause, parent)
{
   return DocIntroSplitDefRest(GlobalOut, OutputLevel, (clause), (parent), NULL)
}

function DocClauseApplyDefsDefault(clause, parent_id, def_ids)
{
   return DocClauseApplyDefs(GlobalOut, OutputLevel, (clause), (parent_id), (def_ids), NULL)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_neweval.h

Author: Stephan Schulz

Contents
 
  Data type for representing evaluations of clauses.

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Apr  9 02:00:51 MET DST 1998
    New
<2> Thu Jan 28 00:58:19 MET 1999
    Replaced AVL trees with Splay-Trees
<3> Thu Apr 20 00:32:11 CEST 2006
    Imported code and history for new, more efficient evaluations for
    ccl_evaluations.h

-----------------------------------------------------------------------*/

if(!CCL_NEWEVAL){

var CCL_NEWEVAL = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function EvalPriority()
{
   this.value = arguments[0] || 0
}

var PrioBest = 0
var PrioPrefer = 30
var PrioNormal = 40
var PrioDefer = 50
var PrioLargestReasonable = MEGA

function typedef_struct_simple_eval_cell()
{
    function obj()
    {
        this.priority = new EvalPriority()
        this.heuristic
        this.eval_celllson
        this.eval_cellrson
    }
    return obj
}
var SimpleEvalCell = typedef_struct_simple_eval_cell()
var SimpleEval_p = typedef_struct_simple_eval_cell()

function typedef_struct_eval_cell()
{
    function obj()
    {
        this.eval_no
        this.eval_countEvaluationcellcountusedas
        this.tiebreaker = new FIFO()
        this.object
        this.evals = new SimpleEvalCell()
    }
    return obj
}
var EvalCell = typedef_struct_eval_cell()
var Eval_p = typedef_struct_eval_cell()

/*---------------------------------------------------------------------*/
/*        Macros for a common interface with old evaluations           */
/*---------------------------------------------------------------------*/

function EvalsFree(eval)
{
    return EvalsFree(eval) 
}
function EvalTreeFindSmallestWrap(root, pos)
{
    return EvalTreeFindSmallest((root), (pos))
}
function EvalTreePrintInOrderWrap(file, root, pos)
{
    return EvalTreePrintInOrder(file, root, pos)
}

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var EvaluationCounter;

function EVAL_SIZE(eval_no)
{
   return sizeof(EvalCell)+((eval_no)*sizeof(SimpleEvalCell))
}
function EvalCellAlloc(eval_no)
{
   return SizeMalloc(EVAL_SIZE(eval_no))
}
function EvalCellFree(junk, eval_no)
{
    SizeFree(junk, EVAL_SIZE(eval_no))
}

if(CONSTANT_MEM_ESTIMATE){
    function EVAL_MEM(eval_no)
    {
       return 32+(4*(eval_no))
    }
} else {
    function EVAL_MEM(eval_no)
    {
       return MEMSIZE(EvalCell)+(EVAL_SIZE((eval_no)))
    }
}

/* AVL_TRAVERSE_DECLARATION(EvalTree,Eval_p) */

function EvalTreeTraverseExit(stack)
{
    PStackFree(stack)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_overlap_index.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  A simple (hashed) index from terms to clause position sets
  (organized as trees of clauses with a tree of positions at which the
  term occurs. Positions are encoded in a two-level tree itself:
  Position sets are indexed by clauses.

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Jun  3 11:30:36 CEST 2010
    New

-----------------------------------------------------------------------*/

if(!CCL_OVERLAP_INDEX){

var CCL_OVERLAP_INDEX = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var OverlapIndex_p = new FPIndex_p()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_paramod.h

Author: Stephan Schulz

Contents
 
  Interface for paramodulating termpairs into termpairs and clauses
  into clauses.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed May 20 15:14:26 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CCL_PARAMOD){

var CCL_PARAMOD = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Use standard paramodulation */
/* Always use simultaneous paramod */
/* Use simultaneous if rw-literal is
                                   oriented */
/* The rest not yet implemented */
/* Use sim if rw-literal instance is
                                   orientable */
/* Use sim if instantiated RHS is
                                   smaller */

function typedef_enum_ParamodulationType()
{
    function obj()
    {
        this.ParamodPlain = 1<<0
        this.ParamodAlwaysSim = 1<<1
        this.ParamodOrientedSim = 1<<2
        this.ParamodDecreasingSim = 1<<3
        this.ParamodSizeDecreasingSim = 1<<4
    }
    return obj
}
var ParamodulationType = typedef_enum_ParamodulationType()
 

function typedef_struct()
{
    function obj()
    {
        this.bank = new TB_p()
        this.ocb = new OCB_p()
        this.freshvars = new VarBank_p()
        this.new_orig = new Clause_p()
        this.from = new Clause_p()
        this.from_cpos = new CompactPos()
        this.from_pos = new ClausePos_p()
        this.into = new Clause_p()
        this.into_cpos = new CompactPos()
        this.into_pos = new ClausePos_p()
    }
    return obj
}
var ParamodInfoCell = typedef_struct()
var ParamodInfo_p = typedef_struct()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_pdtrees.h

Author: Stephan Schulz

Contents
 
  Perfect discrimination trees for optimized rewriting and
  subsumption. PDTrees are machines and have a state - each new search
  must initialize a tree to a consistent state, and only one search
  may be conducted at any given time.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jun 22 17:04:32 MET DST 1998
    New
<2> Fri Mar  2 16:06:12 CET 2001
    Completely rewritten

-----------------------------------------------------------------------*/

if(!CCL_PDTREES){

var CCL_PDTREES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* A node in the perfect discrimination tree... */

/* Function symbols */
/* Variables */
/* Largest variable... */
/* Only terms that have at
   least this weight are,
   indexed at or beyond this,
   node */
/* Only clauses that are older
   than this date are indexed,
   at or beyond this node */
/* Back-pointer to next node
   towards the root */
/* How many entries share this
   node? */
/* Clauses that are indexed
   - this should be NULL at,
   all but leaf nodes. */
/* If this  node corresponds
   to a variable, point to it,
   (so that we can bind it,
   while searching for,
   matches) */
/* Did we bind a variable (in
   fact, the one above...) to,
   reach this node? I.e. do we,
   need to backtrack this,
   binding if we backtrack,
   over this node? */
/* For traversing during
   matching. Both 0 and,
   node->max_var+1 represent,
   the (maximal one) function,
   symbol alternative, i is,
   variable i. */

function typedef_struct_pdt_node_cell()
{
    function obj()
    {
        this.f_alternatives = new IntMap_p()
        this.v_alternatives = new PDArray_p()
        this.max_var = new FunCode()
        this.longsize_constr
        this.age_constr = new SysDate()
        this.structpdt_node_cellparent
        this.longref_count
        this.entries = new PTree_p()
        this.variable = new Term_p()
        this.boolbound
        this.trav_count = new FunCode()
    }
    return obj
}
var PDTNodeCell = typedef_struct_pdt_node_cell()
var PDTNode_p = typedef_struct_pdt_node_cell()


/* A PDTreeCell is an object encapsulating a PDTree and the necessary
   data structures to efficiently seach it */

/* For flattening the term */
/* Store traversed terms for backtracking */
/* For traversing the tree */
/* For traversing entries in leaves */
/* ...used as a key during search */
/* Temporarily bound during matching */
/* Ditto */
/* Ditto */
/* How many tree nodes? */
/* How many clauses? */
/* How much memory used by arrays? */
/* How often has the index been
				   searched? */
/* How many nodes in the index have
				   been visited? */

function typedef_struct_pd_tree_cell()
{
    function obj()
    {
        this.tree = new PDTNode_p()
        this.term_stack = new PStack_p()
        this.term_proc = new PStack_p()
        this.tree_pos = new PDTNode_p()
        this.store_stack = new PStack_p()
        this.term = new Term_p()
        this.term_date = new SysDate()
        this.longterm_weight
        this.intprefer_general
        this.longnode_count
        this.longclause_count
        this.longarr_storage_est
        this.unsignedlongmatch_count
        this.unsignedlongvisited_count
    }
    return obj
}
var PDTreeCell = typedef_struct_pd_tree_cell()
var PDTree_p = typedef_struct_pd_tree_cell()


/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var PDNODE_FUN_INIT_ALT = 8
var PDNODE_FUN_GROW_ALT = 6
var PDNODE_VAR_INIT_ALT = 4
var PDNODE_VAR_GROW_ALT = 4

var PDTREE_IGNORE_TERM_WEIGHT = LONG_MAX
function PDTREE_IGNORE_NF_DATE()
{
    return SysDateCreationTime()
}
function PDT_NODE_INIT_VAL(tree)
{
   return tree.prefer_general
}
function PDT_NODE_CLOSED(tree,node)
{
   return tree.prefer_general?((node.max_var)+2):((node.max_var)+1)
}

function PDTreeCellAlloc()
{
   return SizeMalloc(PDTreeCell)
}
function PDTreeCellFree(junk)
{
    SizeFree(junk, PDTreeCell)
}

if(CONSTANT_MEM_ESTIMATE){
    var PDTREE_CELL_MEM = 16
} else {
    function PDTREE_CELL_MEM()
    {
        return MEMSIZE(PDTreeCell)
    }
}

if(CONSTANT_MEM_ESTIMATE){
    var PDTNODE_MEM = 52
} else {
    function PDTNODE_MEM()
    {
        return 52
    }
}

function PDTreeStorage(tree)
{
   return (tree?(tree.node_count*PDTNODE_MEM+tree.arr_storage_est+tree.clause_count*(PDTREE_CELL_MEM+CLAUSEPOSCELL_MEM)):0)
}

function PDTNodeCellAlloc()
{
   return SizeMalloc(PDTNodeCell)
}
function PDTNodeCellFree(junk)
{
    SizeFree(junk, PDTNodeCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_proofstate.h

Author: Stephan Schulz

Contents
 
  Proof objects describing the state of a proof attempt (i.e. all
  information relevant to the calculus, but not information describing
  control).

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:28:25 MET DST 1997
    New
<2> Wed Oct 14 22:46:13 MET DST 1998
    Extracted from CONTROL/cco_proofstate.h

-----------------------------------------------------------------------*/

if(!CTO_PROOFSTATE){

var CTO_PROOFSTATE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Proof state */

/* Are the feature vector
    indices set up? */
/* Synonyms for
    processed_pos_rules and,
    processed_pos_eqns */
/* Intermediate
    filtering */

function typedef_struct_proofstatecell()
{
    function obj()
    {
        this.signature = new Sig_p()
        this.longoriginal_symbols
        this.original_terms = new TB_p()
        this.terms = new TB_p()
        this.tmp_terms = new TB_p()
        this.freshvars = new VarBank_p()
        this.gc_original_terms = new GCAdmin_p()
        this.gc_terms = new GCAdmin_p()
        this.f_ax_archive = new FormulaSet_p()
        this.f_axioms = new FormulaSet_p()
        this.axioms = new ClauseSet_p()
        this.ax_archive = new ClauseSet_p()
        this.processed_pos_rules = new ClauseSet_p()
        this.processed_pos_eqns = new ClauseSet_p()
        this.processed_neg_units = new ClauseSet_p()
        this.processed_non_units = new ClauseSet_p()
        this.unprocessed = new ClauseSet_p()
        this.tmp_store = new ClauseSet_p()
        this.archive = new ClauseSet_p()
        this.f_archive = new FormulaSet_p()
        this.extract_roots = new PStack_p()
        this.gindices = new GlobalIndices()
        this.boolfvi_initialized
        this.fvi_cspec = new FVCollect_p()
        this.demods = new ClauseSet_p(3)
        this.watchlist = new ClauseSet_p()
        this.wlindices = new GlobalIndices()
        this.boolstate_is_complete
        this.definition_store = new DefStore_p()
        this.def_store_cspec = new FVCollect_p()
        this.boolstatus_reported
        this.ulong_canswer_count
        this.ulong_cprocessed_count
        this.ulong_cproc_trivial_count
        this.ulong_cproc_forward_subsumed_count
        this.ulong_cproc_non_trivial_count
        this.ulong_cother_redundant_count
        this.ulong_cnon_redundant_deleted
        this.ulong_cbackward_subsumed_count
        this.ulong_cbackward_rewritten_count
        this.ulong_cbackward_rewritten_lit_count
        this.ulong_cgenerated_count
        this.ulong_cgenerated_lit_count
        this.ulong_cnon_trivial_generated_count
        this.ulong_ccontext_sr_count
        this.ulong_cparamod_count
        this.ulong_cfactor_count
        this.ulong_cresolv_count
    }
    return obj
}
var ProofStateCell = typedef_struct_proofstatecell()
var ProofState_p = typedef_struct_proofstatecell()


/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function ProofStateCellAlloc()
{
   return SizeMalloc(ProofStateCell)
}

function ProofStateCellFree(junk)
{
   SizeFree(junk, ProofStateCell)
}

function ProofStateStorage(state)
{
   return (ClauseSetStorage(state.unprocessed)+
    ClauseSetStorage(state.processed_pos_rules)+
    ClauseSetStorage(state.processed_pos_eqns)+
    ClauseSetStorage(state.processed_neg_units)+
    ClauseSetStorage(state.processed_non_units)+
    ClauseSetStorage(state.archive)+
    TBStorage(state.terms))
}

function ProofStateAxNo(state)
{
   return (ClauseSetCardinality(state.axioms)+FormulaSetCardinality(state.f_axioms))
}

var WATCHLIST_INLINE_STRING = "Use inline watchlist type"
var WATCHLIST_INLINE_QSTRING = "'"+WATCHLIST_INLINE_STRING+"'"

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_propclauses.h

Author: Stephan Schulz

Contents
 
  Definitions for propositional clauses (for eground) which can be
  stored much more compactly than ordinary clauses - at the price of
  less functionality and flexibility.

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Dec 16 16:29:02 CET 2001
    New

-----------------------------------------------------------------------*/

if(!CCL_PROPCLAUSES){

var CCL_PROPCLAUSES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_proplitcell()
{
    function obj()
    {
        this.properties = new EqnProperties()
        this.lit = new Term_p()
    }
    return obj
}
var PropLitCell = typedef_struct_proplitcell()
var PropLit_p = typedef_struct_proplitcell()

function typedef_struct_propclausecell()
{
    function obj()
    {
        this.lit_no
        this.literals = new PropLit_p()
        this.propclausecellnext
    }
    return obj
}
var PropClauseCell = typedef_struct_propclausecell()
var PropClause_p = typedef_struct_propclausecell()

/* List of clauses */
/* Points to next field of last clause, so we
    can keep inserted clauses in order - I,
    believe giving propositional provers small,
    clauses first may be beneficial */

function typedef_struct_propclausesetcell()
{
    function obj()
    {
        this.longmembers
        this.longliterals
        this.longempty_clauses
        this.list = new PropClause_p()
        this.inspos = new PropClause_p()
    }
    return obj
}
var PropClauseSetCell = typedef_struct_propclausesetcell()
var PropClauseSet_p = typedef_struct_propclausesetcell()


/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PropClauseCellAlloc()
{
   return SizeMalloc(PropClauseCell)
}
function PropClauseCellFree(junk)
{
    SizeFree(junk, PropClauseCell)
}

function PropClauseSetCellAlloc()
{
   return SizeMalloc(PropClauseSetCell)
}
function PropClauseSetCellFree(junk)
{
    SizeFree(junk, PropClauseSetCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_relevance.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Code implementing some limited relevance analysis for function
  symbols and clauses/formulas.

  Copyright 2009 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Sun May 31 11:20:27 CEST 2009
    New

-----------------------------------------------------------------------*/

if(!CCL_RELEVANCE){

var CCL_RELEVANCE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Data structure for computing the relevance of function symbols with
 * respect to a set of conjectures/goals */

function typedef_struct_relevance_cell()
{
    function obj()
    {
        this.sig = new Sig_p()
        this.clauses_core = new PList_p()
        this.formulas_core = new PList_p()
        this.clauses_rest = new PList_p()
        this.formulas_rest = new PList_p()
        this.clauses_index = new FIndex_p()
        this.formulas_index = new FIndex_p()
        this.max_level
        this.fcode_relevance = new PDArray_p()
        this.new_codes = new PStack_p()
        this.relevance_levels = new PStack_p()
    }
    return obj
}
var RelevanceCell = typedef_struct_relevance_cell()
var Relevance_p = typedef_struct_relevance_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function RelevanceCellAlloc()
{
   return SizeMalloc(RelevanceCell)
}
function RelevanceCellFree(junk)
{
    SizeFree(junk, RelevanceCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_rewrite.h

Author: Stephan Schulz

Contents
 
  Functions for rewriting terms and clauses with clause sets.

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue May 26 19:47:52 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CCL_REWRITE){

var CCL_REWRITE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Collect all necessary information for rewriting into one structure */ 

function typedef_struct_rw_desc_cell()
{
    function obj()
    {
        this.ocb = new OCB_p()
        this.bank = new TB_p()
        this.demods = new ClauseSet_p()
        this.demod_date = new SysDate()
        this.level = new RewriteLevel()
        this.prefer_general
        this.sos_rewritten
    }
    return obj
}
var RWDescCell = typedef_struct_rw_desc_cell()
var RWDesc_p = typedef_struct_rw_desc_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function RWDescCellAlloc()
{
   return SizeMalloc(RWDescCell)
}
function RWDescCellFree(junk)
{
    SizeFree(junk, RWDescCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_simparamod.h

Author: Stephan Schulz

Contents
 
  Code for implementing simulataneous paramodulation. Also contains
  some stuff to make standard paramodulation cleaner.

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Apr 29 01:20:55 CEST 2004
    New

-----------------------------------------------------------------------*/

if(!CCL_SIMPARAMOD){

var CCL_SIMPARAMOD = 1

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

File  : ccl_sine.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Code for a (generalized) version of the SinE formula selection
  algorithm. See http://www.cs.man.ac.uk/~hoderk/sine/.

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Jul  2 00:55:03 CEST 2010
    New

-----------------------------------------------------------------------*/

if(!CCL_SINE){

var CCL_SINE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Associate a single function symbol with its "defining" clauses and
 * formulas. */

function typedef_struct_d_rel_cell()
{
    function obj()
    {
        this.f_code = new FunCode()
        this.activated
        this.d_clauses = new PStack_p()
        this.d_formulas = new PStack_p()
    }
    return obj
}
var DRelCell = typedef_struct_d_rel_cell()
var DRel_p = typedef_struct_d_rel_cell()

/* Represent the complete D-Relation for all function symbols. */

function typedef_struct_d_relation_cell()
{
    function obj()
    {
        this.relation = new PDArray_p()
    }
    return obj
}
var DRelationCell = typedef_struct_d_relation_cell()
var DRelation_p = typedef_struct_d_relation_cell()

/* Types of axioms */

if(!__AxiomType__){
var __AxiomType__ = 1
function typedef_enum_AxiomType()
{
    function obj()
    {
        this.NoAxiom = 1<<0
        this.ClauseAxiom = 1<<1
        this.FormulaAxiom = 1<<2
        this.ATNoType = 1<<3
        this.ATClause = 1<<4
        this.ATFormula = 1<<5
    }
    return obj
}
var AxiomType = typedef_enum_AxiomType()


}

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function DRelCellAlloc()
{
   return SizeMalloc(DRelCell)
}
function DRelCellFree(junk)
{
    SizeFree(junk, DRelCell)
}

function DRelationCellAlloc()
{
   return SizeMalloc(DRelationCell)
}
function DRelationCellFree(junk)
{
    SizeFree(junk, DRelationCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_splitting.h

Author: Stephan Schulz

Contents
 
  Implements functions for destructive splitting of clauses with at
  least two non-propositional variable disjoint subsets of literals.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Apr 18 18:24:18 MET DST 2001
    New

-----------------------------------------------------------------------*/

if(!CCL_SPLITTING){

var CCL_SPLITTING = 1

/* Combine ground literals with first
   subclause */
/* Split off (at most) _one_ ground subclause
   containing all ground literals */
/* Split off individual ground literals */

function typedef_enum_SplitType()
{
    function obj()
    {
        this.SplitGroundNone = 0
        this.SplitGroundOne = 1
        this.SplitGroundFull = 2
    }
    return obj
}
var SplitType = typedef_enum_SplitType()

/* Describes which clauses should be split. Note that this currently
   is not orthogonal at all. The functions using this are in
   CONTROL/cco_clausesplitting.c, but we need the data type for the
   control block later on. */

function typedef_enum_SplitClassType()
{
    function obj()
    {
        this.SplitNone = 0
        this.SplitHorn = 1
        this.SplitNonHorn = 2
        this.SplitNegative = 4
        this.SplitPositive = 8
        this.SplitMixed = 16
        this.SplitAll = 7
    }
    return obj
}
var SplitClassType = typedef_enum_SplitClassType()

function QuerySplitClass(v, prop)
{
   return (v&prop)
}
function SetSplitClass(v, prop)
{
    return (v|prop)
}

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Initially: Varset of literal, later either
   empty (in subsequent literals) or varset of,
   partition (for first literal of partition) */

function typedef_struct_lit_split_desc()
{
    function obj()
    {
        this.literal = new Eqn_p()
        this.intpart
        this.varset = new PTree_p()
    }
    return obj
}
var LitSplitDescCell = typedef_struct_lit_split_desc()
var LitSplitDesc_p = typedef_struct_lit_split_desc()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_subsumption.h

Author: Stephan Schulz

Contents
 
  Functions for subsumption testing -> test a clause against a (unit)
  clauseset, test a clause set against a (unit) clause.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:28:25 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CCL_SUBSUPTION){

var CCL_SUBSUPTION = 1

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

File  : ccl_subterm_index.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  A simple (hashed) index from terms to clauses in which this term
  appears as priviledged (rewriting restricted) or unpriviledged term. 

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed May  5 10:19:14 CEST 2010
    New

-----------------------------------------------------------------------*/

if(!CCL_SUBTERM_INDEX){

var CCL_SUBTERM_INDEX = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var SubtermIndex_p = new FPIndex_p()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_subterm_tree.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  A simple  mapping from terms to clauses in which this term
  appears as priviledged (rewriting rstricted) or unpriviledged term. 

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Aug  5 17:25:30 EDT 2009
    New

-----------------------------------------------------------------------*/

if(!CCL_SUBTERM_TREE){

var CCL_SUBTERM_TREE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Payload for backwards-rewriting index */

/* Of clauses in which the subterm appears in a
                       privileged position with restricted rewriting,
                       */
/* Of clauses in which it appeats unrestricted */

function typedef_struct_bw_rw_payload()
{
    function obj()
    {
        this.rw_rest = new PTree_p()
        this.rw_full = new PTree_p()
    }
    return obj
}
var BWRWPayload = typedef_struct_bw_rw_payload()

/* Payload for overlaps (paramodulation) */

function typedef_struct_overlap_payload()
{
    function obj()
    {
        this.clauses = new PObjTree_p()
    }
    return obj
}
var OverlapPayload = typedef_struct_overlap_payload()

/* Cell for recording all occurances of a subterm.*/

function typedef_struct_subterm_occ_cell()
{
    function obj()
    {
        this.term = new Term_p()
        this.pl = {
            occs : new BWRWPayload(),
            pos : new OverlapPayload()
        }
    }
    return obj
}
var SubtermOccCell = typedef_struct_subterm_occ_cell()
var SubtermOcc_p = typedef_struct_subterm_occ_cell()

var SubtermTree_p = new PObjTree_p()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function SubtermOccCellAlloc()
{
   return SizeMalloc(SubtermOccCell)
}
function SubtermOccCellFree(junk)
{
    SizeFree(junk, SubtermOccCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_tautologies.h

Author: Stephan Schulz

Contents

  Functions for detecting tautologies using the algorithm suggested by
  Roberto Nieuwenhuis: Do ground completion on negative literals, see
  if they imply the positive ones

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue May  4 17:23:56 MEST 1999
    New

-----------------------------------------------------------------------*/

if(!CCL_TAUTOLOGIES){

var CCL_TAUTOLOGIES = 1

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

File  : ccl_tcnf.h

Author: Stephan Schulz

Contents

  Functions implementing (eventually) the CNF conversion of first
  order formulae encoded as terms. 

  Copyright 2003,2005 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri May 20 09:45:25 CEST 2005
    New (taken some from ccl_cnf.h).

-----------------------------------------------------------------------*/

if(!CCL_TCNF){

var CCL_TCNF = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var TFORM_MANY_CLAUSES = LONG_MAX
var TFORM_MANY_LIMIT = 1024

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_tformulae.h

Author: Stephan Schulz

Contents
 
  Declarations and definitions for full first-order formulae encoded
  as terms.

  Copyright 2003, 2005 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat May 14 08:50:45 CEST 2005
    New (translated from ccl_formulae.h)

-----------------------------------------------------------------------*/

if(!CCL_TFORMULAE){

var CCL_TFORMULAE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var TFormula_p = new Term_p()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var TFORM_RENAME_LIMIT = 24
var TFORM_RENAME_LIMIT_STR = "24"

function TFormulaHasSubForm1(sig, form)
{
   return (SigQueryFuncProp((sig),form.f_code, FPFOFOp) &&(form.arity>=1))
}

function TFormulaHasSubForm2(sig, form)
{
   return (SigQueryFuncProp((sig),form.f_code, FPFOFOp) &&(form.arity>=2))
}

function TFormulaIsBinary(form)
{
   return (form.arity==2)
}
function TFormulaIsUnary(form)
{
   return (form.arity==1)
}
function TFormulaIsQuantified(sig,form)
{
   return ((form.f_code == sig.qex_code) || 
    (form.f_code == sig.qall_code))
}

function TFormulaIsLiteral(sig,form)
{
   return SigIsPredicate((sig), form.f_code)
}

function TFormulaIsPropTrue(sig, form)
{
    return TFormulaIsPropConst(sig, form, true)
}
function TFormulaIsPropFalse(sig, form)
{
    return TFormulaIsPropConst(sig, form, false)
}

function TFormulaGCMarkCells(bank, form)
{
    return TBGCMarkTerm((bank),(form))
}

function TFormulaEqual(f1,f2)
{
   return (f1==f2)
}

function TFormulaCopy(bank, form)
{
    return TBInsertNoProps(bank, form, DEREF_ALWAYS)
}

function TFormulaFindMaxVarCode(form)
{
    return TermFindMaxVarCode(form)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_unfold_defs.h

Author: Stephan Schulz

Contents
 
  Functions used for unfolding equational definitions (sometimes also
  called "demodulating", but that term seems to be seriously
  overloaded). This is basically a special case of rewriting. However,
  the application is sufficiently different to warrant separate
  implementation. It also is not shared (shame on me), but then it
  also is quite cheap and will be applied very rarely.

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Aug 14 19:54:01 CEST 2002
    New

-----------------------------------------------------------------------*/

if(!CCL_UNFOLD_DEFS){

var CCL_UNFOLD_DEFS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* How much is a definition allowed to increase term size to be still
 * applicable? */
var DEFAULT_EQDEF_INCRLIMIT = 20

/* When to not even try unfilding during preprocessing? */
var DEFAULT_EQDEF_MAXCLAUSES = 20000

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* We'll not export term and clause versions, because we need the
   clause information for proof output anyways */

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : ccl_unit_simplify.h

Author: Stephan Schulz

Contents
 
  Functions and datatypes for performing unit-cuts and
  unit-simplifications with a mixed clause set where units are
  indexed. 

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Jun 23 01:34:49 CEST 2002
    New

-----------------------------------------------------------------------*/

if(!CCL_UNIT_SIMPLIFY){

var CCL_UNIT_SIMPLIFY = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* No unit simplification */
/* Only on top level */
/* Go down (with positive units only) */

function typedef_enum_UnitSimplifyType()
{
    function obj()
    {
        this.NoUnitSimplify = 1<<0
        this.TopLevelUnitSimplify = 1<<1
        this.FullUnitSimplify = 1<<2
    }
    return obj
}
var UnitSimplifyType = typedef_enum_UnitSimplifyType()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cco_batch_spec.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Data types and code for dealing with CASC-2010 LTB batch
  specifications. It's unclear if this will ever be useful...
  
  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jun 28 21:46:06 CEST 2010
    New

-----------------------------------------------------------------------*/

if(!CCO_BATCH_SPEC){

var CCO_BATCH_SPEC = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_BOOutputType()
{
    function obj()
    {
        this.BONone = 1<<0
        this.BODesired = 1<<1
        this.BORequired = 1<<2
    }
    return obj
}
var BOOutputType = typedef_enum_BOOutputType()

/* Describe a batch specification file as used in CASC-J5. Note that
 * that char* values are part of this data structure and are free'd
 * with it. */

function typedef_struct_batch_spec_cell()
{
    function obj()
    {
        this.executable
        this.format = new IOFormat()
        this.category
        this.train_dir
        this.ordered
        this.res_assurance = new BOOutputType()
        this.res_proof = new BOOutputType()
        this.res_model = new BOOutputType()
        this.res_answer = new BOOutputType()
        this.res_list_fof = new BOOutputType()
        this.per_prob_limit
        this.total_wtc_limit
        this.includes = new PStack_p()
        this.source_files = new PStack_p()
        this.dest_files = new PStack_p()
    }
    return obj
}
var BatchSpecCell = typedef_struct_batch_spec_cell()
var BatchSpec_p = typedef_struct_batch_spec_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function BatchSpecCellAlloc()
{
   return SizeMalloc(BatchSpecCell)
}
function BatchSpecCellFree(junk)
{
   SizeFree(junk,BatchSpecCell)
}

function BatchSpecProblemNo(spec)
{
    return PStackGetSP(spec.source_files)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  :  cco_clausesplitting.h

Author: Stephan Schulz

Contents
 
  The interface functions for controlled clause splitting.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Apr 27 20:13:53 MET DST 2001
    New

-----------------------------------------------------------------------*/

if(!CCO_CLAUSESPLITTING){

var CCO_CLAUSESPLITTING = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* See ccl_splitting.h */

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cco_eqnresolving.h

Author: Stephan Schulz

Contents
 
  Routines for the control of equality resolution.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jun  8 17:10:03 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CCO_EQNRESOLVING){

var CCO_EQNRESOLVING = 1

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

File  : cco_eserver.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Control code for realising the E server.

  Copyright 2011 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Thu Mar 17 01:08:00 CET 2011
    New

-----------------------------------------------------------------------*/

if(!CCO_ESERVER){

var CCO_ESERVER = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_eserver_cell()
{
    function obj()
    {
        this.listening
        this.sessions = new PQueue_p()
    }
    return obj
}
var EServerCell = typedef_struct_eserver_cell()
var EServer_p = typedef_struct_eserver_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/
/*
function XXXCellAlloc()
{
   return (XXXCell*)SizeMalloc(sizeof(XXXCell)
}
function XXXCellFree(junk)
{
    SizeFree(junk, sizeof(XXXCell)
}

*/

function EServerCellAlloc()
{
   return SizeMalloc(EServerCell)
}
function EServerCellFree(junk)
{
   SizeFree(junk,EServerCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cco_esession.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Code and data structures representing a single session
  (i.e. connection to the user and all processes run on behalf of this
  user).

  Copyright 2011 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Fri Apr 22 15:08:31 CEST 2011
    New

-----------------------------------------------------------------------*/

if(!CCO_ESESSION){

var CCO_ESESSION = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Default */
/* Connected, not processing */
/* Connected and processing */
/* Disconnected, will be removed */

function typedef_enum_ESessionState()
{
    function obj()
    {
        this.ESNoState = 1<<0
        this.ESWaiting = 1<<1
        this.ESActive = 1<<2
        this.ESStale = 1<<3
    }
    return obj
}
var ESessionState = typedef_enum_ESessionState()

function typedef_struct_esession_cell()
{
    function obj()
    {
        this.state = new ESessionState()
        this.channel = new TCPChannel_p()
        this.running = new EPCtrlSet_p()
    }
    return obj
}
var ESessionCell = typedef_struct_esession_cell()
var ESession_p = typedef_struct_esession_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/
/*
function XXXCellAlloc()
{
   return XXXCell*)SizeMalloc(sizeof(XXXCell)
}
function XXXCellFree(junk)
{
    SizeFree(junk, sizeof(XXXCell)
}

*/

function ESessionCellAlloc()
{
   return SizeMalloc(ESessionCell)
}
function ESessionCellFree(junk)
{
   SizeFree(junk,ESessionCell)
}

function ESessionSetState(session, state)
{
   return session.state = state
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cco_factoring.h

Author: Stephan Schulz

Contents
 
  Routines for the control of factoring

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jun  8 17:10:03 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CCO_FACTORING){

var CCO_FACTORING = 1

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

File  : cco_forward_contraction.h

Author: Stephan Schulz

Contents
 
  Functions that apply the processed clause sets to simplify or
  eliminate a potential new clause. Extracted from
  cco_proofproc.[ch]. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Nov  9 17:46:50 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CCO_FORWARD_CONTRACTION){

var CCO_FORWARD_CONTRACTION = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var DEFAULT_FILTER_DESCRIPTOR = "Fc"

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cco_interpreted.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Code for handling (some) interpreted symbols. Initially, this will
  only deal with answer predicates (some of which may be false in
  otherwise empty clauses). Once things have shaken out, I expect more
  general solutions here...

  Copyright 2011 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Sat Jun  4 22:53:09 CEST 2011
    New

-----------------------------------------------------------------------*/

if(!CCO_INTERPRETED){

var CCO_INTERPRETED = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/*
function XXXCellAlloc()
{
   return (XXXCell*)SizeMalloc(sizeof(XXXCell)
}
function XXXCellFree(junk)
{
    SizeFree(junk, sizeof(XXXCell)
}
*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cco_paramodulation.h

Author: Stephan Schulz

Contents
 
  Functions for controling paramodulation inferences.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:28:25 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CCO_PARAMODULATION){

var CCO_PARAMODULATION = 1

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

File  : cco_proc_ctrl.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Code for running E as a separate process within other programs. This
  is only a first draft - there probably will be a much better version
  eventually ;-).

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jul 14 11:45:55 BST 2010
    New

-----------------------------------------------------------------------*/

if(!CCO_PROC_CTRL){

var CCO_PROC_CTRL = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_ProverResult()
{
    function obj()
    {
        this.PRNoResult = 0
        this.PRTheorem = 1<<1
        this.PRUnsatisfiable = 1<<2
        this.PRSatisfiable = 1<<3
        this.PRCounterSatisfiable = 1<<4
        this.PRFailure = 1<<5
        this.PRGaveUp = 1<<6
    }
    return obj
}
var ProverResult = typedef_enum_ProverResult()

function typedef_struct_e_pctrl_cell()
{
    function obj()
    {
        this.pid
        this.pipe = new FILE()
        this.fileno
        this.input_file
        this.name
        this.longstart_time
        this.prob_time
        this.result = new ProverResult()
        this.output = new DStr_p()
    }
    return obj
}
var EPCtrlCell = typedef_struct_e_pctrl_cell()
var EPCtrl_p = typedef_struct_e_pctrl_cell()

var EPCTRL_BUFSIZE = 200

function typedef_struct_e_pctrl_set_cell()
{
    function obj()
    {
        this.procs = new NumTree_p()
        this.bufferEPCTRL_BUFSIZE
    }
    return obj
}
var EPCtrlSetCell = typedef_struct_e_pctrl_set_cell()
var EPCtrlSet_p = typedef_struct_e_pctrl_set_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var SZS_THEOREM_STR = "# SZS status Theorem"
var SZS_UNSAT_STR = "# SZS status Unsatisfiable"
var SZS_SATSTR_STR = "# SZS status Satisfiable"
var SZS_COUNTERSAT_STR = "# SZS status CounterSatisfiable"
var SZS_GAVEUP_STR = "# SZS status GaveUp"
var SZS_FAILURE_STR = "# Failure:"

var E_OPTIONS = "--print-pid -s -xAuto -tAuto -R --answers=1 --assume-incompleteness --memory-limit=1024 --tstp-format --proof-object --cpu-limit=" 

var PRResultTable = new Array()

function EPCtrlCellAlloc()
{
   return SizeMalloc(EPCtrlCell)
}
function EPCtrlCellFree(junk)
{
    SizeFree(junk,EPCtrlCell)
}

function EPCtrlSetCellAlloc()
{
   return SizeMalloc(EPCtrlSetCell)
}
function EPCtrlSetCellFree(junk)
{
   SizeFree(junk,EPCtrlSetCell)
}

function EPCtrlSetEmpty(set)
{
   return set.procs==NULL
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cco_proofproc.h

Author: Stephan Schulz

Contents
 
  Top level proof procedure

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jun  8 04:19:50 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CCO_PROOFPROC){

var CCO_PROOFPROC = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* Collect term cells from temporary clause copies if their number
   reaches this. 10000 is big enough that it nearly never happens, 500
   is big enough that it rarely happens, but that the bank remains
   small enough. */
var TMPBANK_GC_LIMIT = 256

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cco_scheduling.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Some simple data types and code to implement quick-and-dirty
  strategy scheduling for E.

  Copyright 2013 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Wed May 22 22:33:40 CEST 2013
    New

-----------------------------------------------------------------------*/

if(!CCO_SCHEDULING){

var CCO_SCHEDULING = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_schedule_cell()
{
    function obj()
    {
        this.heu_name
        this.ordering = new TermOrdering()
        this.sine
        this.time_fraction
        this.time_absolute
    }
    return obj
}
var ScheduleCell = typedef_struct_schedule_cell()
var Schedule_p = typedef_struct_schedule_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var DEFAULT_SCHED_TIME_LIMIT = 300

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cco_simplification.h

Author: Stephan Schulz

Contents
 
  Global control function used with simplification.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jun  8 14:49:49 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CCO_SIMPLIFICATION){

var CCI_SIMPIFICATION = 1

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

File  : cco_sine.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Data types and definitions for supporting SinE-like specification
  filtering. 

  Copyright 2012 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Thu May 10 08:35:26 CEST 2012
    New

-----------------------------------------------------------------------*/

if(!CCO_SINE){

var CCO_SINE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Complex, multi-file problem specification data structure - holding
 * information about all the includes parsed so they are parsed at
 * most once. */

function typedef_struct_strtuctured_FOF_spec_cell()
{
    function obj()
    {
        this.sig = new Sig_p()
        this.terms = new TB_p()
        this.clause_sets = new PStack_p()
        this.formula_sets = new PStack_p()
        this.parsed_includes = new StrTree_p()
        this.shared_ax_sp = new PStackPointer()
        this.f_distrib = new GenDistrib_p()
    }
    return obj
}
var StructFOFSpecCell = typedef_struct_strtuctured_FOF_spec_cell()
var StructFOFSpec_p = typedef_struct_strtuctured_FOF_spec_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function StructFOFSpecCellAlloc()
{
   return SizeMalloc(StructFOFSpecCell)
}
function StructFOFSpecCellFree(junk)
{
   SizeFree(junk,StructFOFSpecCell)
}
function StructFOFSpecResetShared(ctrl)
{
   ctrl.shared_ax_sp = 0
    return ctrl
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cex_csscpa.h

Author: Stephan Schulz, Geoff Sutcliffe

Contents
 
  Functions and datetype realizing the CSSCPA control component.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Apr 10 00:10:07 GMT 2000
    New

-----------------------------------------------------------------------*/

if(!CEX_CSSCPA){

var CEX_CSSCPA = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_csscpa_state_cell()
{
    function obj()
    {
        this.sig = new Sig_p()
        this.terms = new TB_p()
        this.tmp_terms = new TB_p()
        this.pos_units = new ClauseSet_p()
        this.neg_units = new ClauseSet_p()
        this.non_units = new ClauseSet_p()
        this.literals
        this.clauses
        this.weight
    }
    return obj
}
var CSSCPAStateCell = typedef_struct_csscpa_state_cell()
var CSSCPAState_p = typedef_struct_csscpa_state_cell()

/*---Added by Geoff */

function typedef_enum_ClauseStatusType()
{
    function obj()
    {
        this.contradicts
        this.improved
        this.rejected
        this.forced
        this.requested
        this.unknown
    }
    return obj
}
var ClauseStatusType = typedef_enum_ClauseStatusType()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function CSSCPAStateCellAlloc()
{
   return SizeMalloc(CSSCPAStateCell)
}
function CSSCPAStateCellFree(junk)
{
   SizeFree(junk,CSSCPAStateCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/
/*-----------------------------------------------------------------------

File  : che_axfilter.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Definitions dealing with the description of axiom set filters based
  on relevancy/SinE principles. This only deals with their parameters
  and specifications. The real code is (for now) in CONTROL and knows
  nothing about this ;-).

  Copyright 2011 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Wed Feb 23 00:17:20 CET 2011
    New

-----------------------------------------------------------------------*/

if(!CHE_AXFILTER){

var CHE_AXFILTER = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Generalized SinE */
/* Pass all formulas if less then N */

function typedef_enum_AxFilterType()
{
    function obj()
    {
        this.AFNoFilter = 0
        this.AFGSinE = 1<<1
        this.AFThreshold = 1<<2
    }
    return obj
}
var AxFilterType = typedef_enum_AxFilterType()


/* Type of generality measure: Number of occurences in terms or in
 * formulas (and possibly later in equations). */

function typedef_enum_GeneralityMeasure()
{
    function obj()
    {
        this.GMNoMeasure = 1<<0
        this.GMTerms = 1<<1
        this.GMLiterals = 1<<2
        this.GMFormulas = 1<<3
        this.GMPosFormula = 1<<4
        this.GMPosLiteral = 1<<5
        this.GMPosTerms = 1<<6
        this.GMNegFormula = 1<<7
        this.GMNegLiteral = 1<<8
        this.GMNegTerms = 1<<9
    }
    return obj
}
var GeneralityMeasure = typedef_enum_GeneralityMeasure()

/* Parameters for a single Axiom filter */

function typedef_struct()
{
    function obj()
    {
        this.name
        this.type = new AxFilterType()
        this.gen_measure = new GeneralityMeasure()
        this.use_hypotheses
        this.benevolence
        this.generosity
        this.max_recursion_depth
        this.longmax_set_size
        this.threshold
        this.max_set_fraction
        this.add_no_symbol_axioms
    }
    return obj
}
var AxFilterCell = typedef_struct()
var AxFilter_p = typedef_struct()

/* Sets of AxFilters */
function typedef_struct()
{
    function obj()
    {
        this.set = new PStack_p()
    }
    return obj
}
var AxFilterSetCell = typedef_struct()
var AxFilterSet_p = typedef_struct()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function AxFilterCellAlloc()
{
   return SizeMalloc(AxFilterCell)
}
function AxFilterCellFree(junk)
{
   SizeFree(junk,AxFilterCell)
}

function AxFilterSetCellAlloc()
{
   return SizeMalloc(AxFilterSetCell)
}
function AxFilterSetCellFree(junk)
{
   SizeFree(junk,AxFilterSetCell)
}

function AxFilterSetElements(s)
{
    return PStackGetSP(s.set)
}
function AxFilterSetGetFilter(s, i)
{
   return PStackElementP(s.set,i)
}
function AxFilterSetAddFilter(s, f)
{
    return PStackPushP(s.set, f)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_axiomscan.h

Author: Stephan Schulz

Contents
 
  Declarations for functions recognizing certain axioms (e.g. AC
  axioms).

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1>     New

-----------------------------------------------------------------------*/

if(!CHE_AXIOMSCAN_H){

var CHE_AXIOMSCAN_H = 1

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

File  : che_clausefeatures.h

Author: Stephan Schulz

Contents
 
  Functions for determining various features of clauses.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Sep 28 19:17:50 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_CLAUSEFEATURES){

var CHE_CLAUSEFEATURES = 1

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

File  : che_clausesetfeatures.h

Author: Stephan Schulz

Contents
 
  Functions for determining various features of clause sets.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Sep 28 19:17:50 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_CLAUSESETFEATURES){

var CHE_CLAUSESETFEATURES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_SpecFeatures()
{
    function obj()
    {
        this.SpecUnit = 1<<0
        this.SpecHorn = 1<<1
        this.SpecGeneral = 1<<2
        this.SpecNoEq = 1<<3
        this.SpecSomeEq = 1<<4
        this.SpecPureEq = 1<<5
        this.SpecFewPosNonGroundUnits = 1<<6
        this.SpecSomePosNonGroundUnits = 1<<7
        this.SpecManyPosNonGroundUnits = 1<<8
        this.SpecFewPosGround = 1<<9
        this.SpecSomePosGround = 1<<10
        this.SpecManyPosGround = 1<<11
        this.SpecFewAxioms = 1<<12
        this.SpecSomeAxioms = 1<<13
        this.SpecManyAxioms = 1<<14
        this.SpecFewLiterals = 1<<15
        this.SpecSomeLiterals = 1<<16
        this.SpecManyLiterals = 1<<17
        this.SpecSmallTerms = 1<<18
        this.SpecMediumTerms = 1<<19
        this.SpecLargeTerms = 1<<20
        this.SpecArity0 = 1<<21
        this.SpecArity1 = 1<<22
        this.SpecArity2 = 1<<23
        this.SpecArity3Plus = 1<<24
        this.SpecAritySumSmall = 1<<25
        this.SpecAritySumMedium = 1<<26
        this.SpecAritySumLarge = 1<<27
        this.SpecDepthShallow = 1<<28
        this.SpecDepthMedium = 1<<29
        this.SpecDepthDeep = 1<<30
    }
    return obj
}
var SpecFeatures = typedef_enum_SpecFeatures()

/* Limits for designating feature-based classes. They will be set in
   SpecFeatureCells based on these values. */

function typedef_struct_spec_limits_cell()
{
    function obj()
    {
        this.ngu_absolute
        this.ngu_few_limit
        this.ngu_many_limit
        this.gpc_absolute
        this.gpc_few_limit
        this.gpc_many_limit
        this.ax_some_limit
        this.ax_many_limit
        this.lit_some_limit
        this.lit_many_limit
        this.term_medium_limit
        this.term_large_limit
        this.far_sum_medium_limit
        this.far_sum_large_limit
        this.depth_medium_limit
        this.depth_deep_limit
        this.symbols_medium_limit
        this.symbols_large_limit
        this.predc_medium_limit
        this.predc_large_limit
        this.pred_medium_limit
        this.pred_large_limit
        this.func_medium_limit
        this.func_large_limit
        this.fun_medium_limit
        this.fun_large_limit
    }
    return obj
}
var SpecLimitsCell = typedef_struct_spec_limits_cell()
var SpecLimits_p = typedef_struct_spec_limits_cell()

/* Stores all the precomputed feature values (including, after a call
   to SpecFeaturesAddEval, the classifications */
function typedef_struct_spec_feature_cell()
{
    function obj()
    {
        this.axiomtypes = new SpecFeatures()
        this.goaltypes = new SpecFeatures()
        this.eq_content = new SpecFeatures()
        this.ng_unit_content = new SpecFeatures()
        this.ground_positive_content = new SpecFeatures()
        this.goals_are_ground
        this.set_clause_size = new SpecFeatures()
        this.set_literal_size = new SpecFeatures()
        this.set_termcell_size = new SpecFeatures()
        this.max_fun_ar_class = new SpecFeatures()
    
        this.avg_fun_ar_class = new SpecFeatures()
        this.sum_fun_ar_class = new SpecFeatures()
        this.max_depth_class = new SpecFeatures()
        this.clauses
        this.goals
        this.axioms
        this.literals
        this.term_cells
        this.clause_max_depth
        this.clause_avg_depth
        this.unit
        this.unitgoals
        this.unitaxioms
        this.horn
        this.horngoals
        this.hornaxioms
        this.eq_clauses
        this.peq_clauses
        this.groundunitaxioms
        this.positiveaxioms
        this.groundpositiveaxioms
        this.groundgoals
        this.ng_unit_axioms_part
        this.ground_positive_axioms_part
        this.max_fun_arity
        this.avg_fun_arity
        this.sum_fun_arity
        this.max_pred_arity
        this.avg_pred_arity
        this.sum_pred_arity
        this.fun_const_count
        this.fun_nonconst_count
        this.pred_nonconst_count
    }
    return obj
}
var SpecFeatureCell = typedef_struct_spec_feature_cell()
var SpecFeature_p = typedef_struct_spec_feature_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var NGU_ABSOLUTE = true
var NGU_FEW_DEFAULT = 0.25
var NGU_MANY_DEFAULT = 0.75
var NGU_FEW_ABSDEFAULT = 1
var NGU_MANY_ABSDEFAULT = 3
var GPC_ABSOLUTE = true
var GPC_FEW_DEFAULT = 0.25
var GPC_MANY_DEFAULT = 0.75
var GPC_FEW_ABSDEFAULT = 1
var GPC_MANY_ABSDEFAULT = 3
var AX_1_DEFAULT = 10
var AX_4_DEFAULT = 15
var AX_SOME_DEFAULT = 20
var AX_MANY_DEFAULT = 100
var LIT_SOME_DEFAULT = 15
var LIT_MANY_DEFAULT = 100
var TERM_MED_DEFAULT = 60
var TERM_LARGE_DEFAULT = 1000
var FAR_SUM_MED_DEFAULT = 5
var FAR_SUM_LARGE_DEFAULT = 24
var DEPTH_MEDIUM_DEFAULT = 0 /* Partitioning two ways turns out
                                      to be nearly as good as 3 way on
                                      the test set */  
var DEPTH_DEEP_DEFAULT = 6
var SYMBOLS_MEDIUM_DEFAULT = 100
var SYMBOLS_LARGE_DEFAULT = 1000

var PREDC_MEDIUM_DEFAULT = 0
var PREDC_LARGE_DEFAULT = 2
var PRED_MEDIUM_DEFAULT = 1225
var PRED_LARGE_DEFAULT = 4000
var FUNC_MEDIUM_DEFAULT = 8
var FUNC_LARGE_DEFAULT = 110
var FUN_MEDIUM_DEFAULT = 360
var FUN_LARGE_DEFAULT = 400

var DEFAULT_OUTPUT_DESCRIPTOR = "eigEIG"
var DEFAULT_CLASS_MASK = "aaaaaaaaaaaaa"

function SpecLimitsCellAlloc()
{
   return SizeMalloc(SpecLimitsCell)
}

function SpecLimitsCellFree(junk)
{
   SizeFree(junk,SpecLimitsCell)
}

function SpecFeatureCellAlloc()
{
   return SizeMalloc(SpecFeatureCell)
}

function SpecFeatureCellFree(junk)
{
   SizeFree(junk,SpecFeatureCell)
}

function Spec(spec)
{
   return true /* For auto-generated code */
}

function SpecAxiomsAreUnit(spec)
{
   return (spec.axioms == spec.unitaxioms)
}
function SpecAxiomsAreHorn(spec)
{
   return (spec.axioms == spec.hornaxioms)
}
function SpecAxiomsAreNonUnitHorn(spec)
{
   return (SpecAxiomsAreHorn(spec)&&!(SpecAxiomsAreUnit(spec)))
}

function SpecAxiomsAreGeneral(spec)
{
   return (spec.axioms >  spec.hornaxioms)
}

function SpecGoalsAreUnit(spec)
{
   return (spec.goals == spec.unitgoals)
}
function SpecGoalsAreHorn(spec)
{
   return !SpecGoalsAreUnit(spec)
}
function SpecGoalsAreGround(spec)
{
   return spec.goals_are_ground
}
function SpecGoalsHaveVars(spec)
{
   return !SpecGoalsAreGround(spec)
}

function SpecPureEq(spec)
{
   return (spec.clauses==spec.peq_clauses)
}
function SpecSomeEq(spec)
{
   return (spec.eq_clauses && !SpecPureEq(spec))
}
function SpecNoEq(spec)
{
   return !spec.eq_clauses
}

function SpecFewNGPosUnits(spec)
{
   return (spec.ng_unit_content == SpecFewPosNonGroundUnits)
}

function SpecSomeNGPosUnits(spec)
{
   return (spec.ng_unit_content == SpecSomePosNonGroundUnits)
}

function SpecManyNGPosUnits(spec)
{
   return (spec.ng_unit_content == SpecManyPosNonGroundUnits)
}

function SpecFewGroundPos(spec)
{
   return (spec.ground_positive_content == SpecFewPosGround)
}

function SpecSomeGroundPos(spec)
{
   return (spec.ground_positive_content == SpecSomePosGround)
}

function SpecManyGroundPos(spec)
{
   return (spec.ground_positive_content == SpecManyPosGround)
}

function SpecFewAxioms(spec)
{
   return (spec.set_clause_size == SpecFewAxioms)
}

function SpecSomeAxioms(spec)
{
   return (spec.set_clause_size == SpecSomeAxioms)
}

function SpecManyAxioms(spec)
{
   return (spec.set_clause_size == SpecManyAxioms)
}

function SpecFewLiterals(spec)
{
   return (spec.set_literal_size == SpecFewLiterals)
}

function SpecSomeLiterals(spec)
{
   return (spec.set_literal_size == SpecSomeLiterals)
}

function SpecManyLiterals(spec)
{
   return (spec.set_literal_size == SpecManyLiterals)
}

function SpecSmallTerms(spec)
{
   return (spec.set_termcell_size == SpecSmallTerms)
}

function SpecMediumTerms(spec)
{
   return (spec.set_termcell_size == SpecMediumTerms)
}

function SpecLargeTerms(spec)
{
   return (spec.set_termcell_size == SpecLargeTerms)
}

function SpecMaxFArity0(spec)
{
   return (spec.max_fun_ar_class == SpecArity0)
}

function SpecMaxFArity1(spec)
{
   return (spec.max_fun_ar_class == SpecArity1)
}

function SpecMaxFArity2(spec)
{
   return (spec.max_fun_ar_class == SpecArity2)
}

function SpecMaxFArity3Plus(spec)
{
   return (spec.max_fun_ar_class ==SpecArity3Plus)
}

function SpecAvgFArity0(spec)
{
   return (spec.avg_fun_ar_class == SpecArity0)
}

function SpecAvgFArity1(spec)
{
   return (spec.avg_fun_ar_class == SpecArity1)
}

function SpecAvgFArity2(spec)
{
   return (spec.avg_fun_ar_class == SpecArity2)
}

function SpecAvgFArity3Plus(spec)
{
   return (spec.avg_fun_ar_class ==SpecArity3Plus)
}

function SpecSmallFArSum(spec)
{
   return (spec.sum_fun_ar_class == SpecAritySumSmall)
}

function SpecMediumFArSum(spec)
{
   return (spec.sum_fun_ar_class == SpecAritySumMedium)
}

function SpecLargeFArSum(spec)
{
   return (spec.sum_fun_ar_class == SpecAritySumLarge)
}

function SpecShallowMaxDepth(spec)
{
   return (spec.max_depth_class == SpecDepthShallow)
}

function SpecMediumMaxDepth(spec)
{
   return (spec.max_depth_class == SpecDepthMedium)
}

function SpecDeepMaxDepth(spec)
{
   return (spec.max_depth_class == SpecDepthDeep)
}

function ClauseSetCountAxioms(set)
{
   return (set.members-ClauseSetCountGoals(set))
}

function ClauseSetCountUnitAxioms(set)
{
   return (ClauseSetCountUnit(set)-ClauseSetCountUnitGoals(set))
}

function ClauseSetIsUnitSet(set)
{
   return (set.members == ClauseSetCountUnit(set))
}

function ClauseSetAxiomsAreUnit(set)
{
   return (ClauseSetCountUnitAxioms(set) == ClauseSetCountAxioms(set))
}

function ClauseSetGoalsAreUnit(set)
{
   return (ClauseSetCountUnitGoals(set) == ClauseSetCountGoals(set))
}

function ClauseSetCountHornAxioms(set)
{
   return (ClauseSetCountHorn(set)-ClauseSetCountHornGoals(set))
}

function ClauseSetIsHornSet(set)
{
   return (set.members == ClauseSetCountHorn(set))
}

function ClauseSetAxiomsAreHorn(set)
{
   return (ClauseSetCountHornAxioms(set) == ClauseSetCountAxioms(set))
}

function ClauseSetGoalsAreHorn(set)
{
   return (ClauseSetCountHornGoals(set) == ClauseSetCountGoals(set))
}

/* Are all clauses equational? */
function ClauseSetIsEquationalSet(set)
{
   return (set.members == ClauseSetCountEquational(set))
}

/* Is there equality in the clause set? */
function ClauseSetIsEquational(set)
{
   return (ClauseSetCountEquational(set)>=1)
}

function ClauseSetIsPureEquationalSet(set)
{
   return (set.members == ClauseSetCountPureEquational(set))
}

function ClauseSetGoalsAreGround(set)
{
   return (ClauseSetCountGoals(set)==ClauseSetCountGroundGoals(set))
}

function ClauseSetIsGround(set)
{
   return (ClauseSetCountGround(set)==set.members)
}

function ClauseSetCountNonGroundUnitAxioms(set)
{
   return (ClauseSetCountUnitAxioms(set)-ClauseSetCountGroundUnitAxioms(set))
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_clauseweight.h

Author: Stephan Schulz

Contents
 
  Evaluation of a clause by clause weight, also an example for setting
  up an evaluation function. Contains some additional evaluation
  functions as well.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:28:25 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CHE_CLAUSEWEIGHT){

var CHE_CLAUSEWEIGHT = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var DEFAULT_POS_MULT = 1

function typedef_struct_weightparamcell()
{
    function obj()
    {
        this.pos_multiplier
        this.vweight
        this.fweight
    }
    return obj
}
var WeightParamCell = typedef_struct_weightparamcell()
var WeightParam_p = typedef_struct_weightparamcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function WeightParamCellAlloc()
{
   return SizeMalloc(WeightParamCell)
}

function WeightParamCellFree(junk)
{
   SizeFree(junk,WeightParamCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_fcode_featurearrays.h

Author: Stephan Schulz

Contents
 
  Sortable arrays associating a function symbol with a number of
  integer feature values (that define the order). Used by precedence
  generating functions, now also for weights.

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Feb 20 21:39:34 CET 2003
    New (partially taken from che_to_precgen.c)

-----------------------------------------------------------------------*/

if(!CHE_F_CODE_FEATUREARRAYS){

var CHE_F_CODE_FEATUREARRAYS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_fcode_feature_sort_cell()
{
    function obj()
    {
        this.key1
        this.key2
        this.key3
        this.freq
        this.conjfreq
        this.pos_rank
        this.symbol = new FunCode()
    }
    return obj
}
var FCodeFeatureSortCell = typedef_struct_fcode_feature_sort_cell()
var FCodeFeatureSort_p = typedef_struct_fcode_feature_sort_cell()

function typedef_struct_fcode_feature_array_cell()
{
    function obj()
    {
        this.size
        this.array = new FCodeFeatureSort_p()
    }
    return obj
}
var FCodeFeatureArrayCell = typedef_struct_fcode_feature_array_cell()
var FCodeFeatureArray_p = typedef_struct_fcode_feature_array_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function FCodeFeatureArrayCellAlloc()
{
   return SizeMalloc(FCodeFeatureArrayCell)
}

function FCodeFeatureArrayCellFree(junk)
{
   SizeFree(junk,FCodeFeatureArrayCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_fifo.h

Author: Stephan Schulz

Contents
 
  FIFO-Evaluation of a clause/

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:28:25 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CHE_FIFO){

var CHE_FIFO = 1

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

File  : che_funweights.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Heuristic weight functions dealing with individual weights for
  different symbols.

  Copyright 2005, 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat May  7 20:57:21 CEST 2005
    New

-----------------------------------------------------------------------*/

if(!CHE_FUNWEIGHTS){

var CHE_FUNWEIGHTS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Generic stuff, see Refinedweight() */
/* Weights for non-conjecture symbols (by type) */
/* Weights for conjecture-symbols (by type) */
/* Extra values for relevancy-based heuristics */
/* Effective level of irrelevant
 * symbols is max_level plus this.*/
/* Weight of a symbol is
 * base*lpc+lpl*l+lps*l*l, ,
 * where l is the effective level */
/* Weight/Name association (if present).  */
/* Actual encoding for the weights */
/* Temporary store for function symbol counts, put here to avoid
 * multiple  (expensive for large signatures) initializations. */

function typedef_struct_funweightparamcell()
{
    function obj()
    {
        this.ocb = new OCB_p()
        this.axioms = new ClauseSet_p()
        this.proofstate = new ProofState_p()
        this.doublemax_term_multiplier
        this.doublemax_literal_multiplier
        this.doublepos_multiplier
        this.longvweight
        this.longfweight
        this.longcweight
        this.longpweight
        this.longconj_fweight
        this.longconj_cweight
        this.longconj_pweight
        this.longdefault_level_penalty
        this.doublelevel_poly_const
        this.doublelevel_poly_lin
        this.doublelevel_poly_square
        this.voidinit_funstructfunweightparamcell
        this.weight_stack = new PStack_p()
        this.longflimit
        this.longfweights
        this.f_occur = new PDArray_p()
    }
    return obj
}
var FunWeightParamCell = typedef_struct_funweightparamcell()
var FunWeightParam_p = typedef_struct_funweightparamcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function FunWeightParamCellAlloc()
{
   return SizeMalloc(FunWeightParamCell)
}

function FunWeightParamCellFree(junk)
{
   SizeFree(junk,FunWeightParamCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_hcbadmin.h

Author: Stephan Schulz

Contents
 
  Functions for administrating and parsing sets of heuristics.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Dec  8 22:27:02 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_HCB_ADMIN){

var CHE_HCB_ADMIN = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_hcbadmincell()
{
    function obj()
    {
        this.names = new PStack_p()
        this.hcb_set = new PStack_p()
    }
    return obj
}
var HCBAdminCell = typedef_struct_hcbadmincell()
var HCBAdmin_p = typedef_struct_hcbadmincell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function HCBAdminCellAlloc()
{
   return SizeMalloc(HCBAdminCell)
}
function HCBAdminCellFree(junk)
{
   SizeFree(junk,HCBAdminCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_hcb.h

Author: Stephan Schulz

Contents
 
  Heuristic control blocks, describing heuristics for clause
  selection.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Jun  5 22:25:02 MET DST 1998
    New
<2> Wed Dec 16 23:17:21 MET 1998
    Integrate HeuristicParms stuff

-----------------------------------------------------------------------*/

if(!CHE_HCB){

var CHE_HCB = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Possible ways to handle AC */

function typedef_enum_ACHandlingType()
{
    function obj()
    {
        this.NoACHandling = 1<<0
        this.ACDiscardAll = 1<<1
        this.ACKeepUnits = 1<<2
        this.ACKeepOrientable = 1<<3
    }
    return obj
}
var ACHandlingType = typedef_enum_ACHandlingType()


/* External parameters for heuristics and proof control */

function typedef_struct_heuristic_parms_cell()
{
    function obj()
    {
        this.heuristic_name
        this.prefer_initial_clauses
        this.ordertype = new TermOrdering()
        this.to_weight_gen = new TOWeightGenMethod()
        this.to_prec_gen = new TOPrecGenMethod()
        this.to_pre_prec
        this.to_pre_weights
        this.to_const_weight
        this.no_lit_cmp
        this.selection_strategy = new LiteralSelectionFun()
        this.pos_lit_sel_min
        this.pos_lit_sel_max
        this.neg_lit_sel_min
        this.neg_lit_sel_max
        this.all_lit_sel_min
        this.all_lit_sel_max
        this.weight_sel_min
        this.select_on_proc_only
        this.inherit_paramod_lit
        this.inherit_goal_pm_lit
        this.inherit_conj_pm_lit
        this.enable_eq_factoring
        this.enable_neg_unit_paramod
        this.enable_given_forward_simpl
        this.pm_type = new ParamodulationType()
        this.ac_handling = new ACHandlingType()
        this.ac_res_aggressive
        this.forward_context_sr
        this.forward_context_sr_aggressive
        this.backward_context_sr
        this.forward_demod = new RewriteLevel()
        this.prefer_general
        this.condensing
        this.condensing_aggressive
        this.er_varlit_destructive
        this.er_strong_destructive
        this.er_aggressive
        this.split_clauses = new SplitClassType()
        this.split_method = new SplitType()
        this.split_aggressive
        this.split_fresh_defs
        this.rw_bw_index_typeMAX_PM_INDEX_NAME_LEN
        this.pm_from_index_typeMAX_PM_INDEX_NAME_LEN
        this.pm_into_index_typeMAX_PM_INDEX_NAME_LEN
        this.filter_limit
        this.filter_copies_limit
        this.reweight_limit
        this.longdelete_bad_limit
        this.mem_limit
        this.watchlist_simplify
        this.use_tptp_sos
        this.presat_interreduction
        this.detsort_bw_rw
        this.detsort_tmpset
    }
    return obj
}
var HeuristicParmsCell = typedef_struct_heuristic_parms_cell()
var HeuristicParms_p = typedef_struct_heuristic_parms_cell()

/* An HCBCell describes a heuristic for clause selection. There are
   two main elemenats: A list of clause evaluation functions
   (described by a WFCB-List and a clause selection function (whose
   data is kept in the HBCCell). */
/* List and number of weight function used by the heuristic. Take
   care: The list of WFCBs is ordered in the opposite direction
   from the evaluation in a clause, i.e. the _last_ WCFB will
   create the _first_ evaluation. */
/* Evaluation currently used for selection. This refers to the
   order of evaluations in the clause. See above!       */
/* Switching for HCBStandardClauseSelect and possibly other
   selection functions: Whenever select_count modulo
   select_switch[wfcb_no-1] reaches select_switch[current_eval],
   current_eval is increased modulo wfcb_no. */
/* Selection function, this function is called to select an
   unprocessed clause from the set */
/* Some HCB selection or evaluation functions may need data of
   their own. If yes, their creation function can allocate data,
   and needs to register a cleanup-function here. This function is
   only called if data != NULL. */

function typedef_struct_hcb_cell()
{
    function obj()
    {
        this.wfcb_list = new PDArray_p()
        this.wfcb_no
        this.current_eval
        this.select_switch = new PDArray_p()
        this.select_count
        this.set = new Clause_p()
        this.hcb = new Clause_p()
        this.hcb_select = new Clause_p()
        this.hcb_exit = new GenericExitFun()
        this.data
    }
    return obj
}
var HCBCell = typedef_struct_hcb_cell()
var HCB_p = typedef_struct_hcb_cell()

var HCB_DEFAULT_HEURISTIC = "Default"
var DEFAULT_FILTER_LIMIT = LONG_MAX
var DEFAULT_FILTER_COPIES_LIMIT = LONG_MAX
var DEFAULT_REWEIGHT_INTERVAL = LONG_MAX
var DEFAULT_DELETE_BAD_LIMIT = LONG_MAX

var DEFAULT_RW_BW_INDEX_NAME = "FP7"
var DEFAULT_PM_FROM_INDEX_NAME = "FP7"
var DEFAULT_PM_INTO_INDEX_NAME = "FP7"

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function HeuristicParmsCellAlloc()
{
   return SizeMalloc(HeuristicParmsCell)
}

function HeuristicParmsCellFree(junk)
{
   SizeFree(junk,HeuristicParmsCell)
}

function HCBCellAlloc()
{
   return SizeMalloc(HCBCell)
}
function HCBCellFree(junk)
{
   SizeFree(junk,HCBCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_heuristics.h

Author: Stephan Schulz

Contents
 
  High-Level interface functions to the heuristics module.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jun  8 02:14:51 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_HEURISTICS){

var CHE_HEURISTICS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* All standard heuristics are now parsed from DefaultHeuristics in
   che_proofcontrol.c. Only non-standard heuristics get an entry
   here. */

function typedef_enum_Heuristic()
{
    function obj()
    {
        this.HEU_NO_HEURISTIC = 0
        this.HEU_AUTO_MODE = 1<<1
        this.HEU_AUTO_MODE_CASC = 1<<2
        this.HEU_AUTO_MODE_DEV = 1<<3
        this.HEU_AUTO_SCHED0 = 1<<4
        this.HEU_AUTO_SCHED1 = 1<<5
        this.HEU_AUTO_SCHED2 = 1<<6
        this.HEU_AUTO_SCHED3 = 1<<7
        this.HEU_AUTO_SCHED4 = 1<<8
    }
    return obj
}
var Heuristic = typedef_enum_Heuristic()

function typedef_struct_heuristic_assoc_cell()
{
    function obj()
    {
        this.heuristic = new Heuristic()
        this.name
        this.heuristic_create = new HCBCreateFun()
    }
    return obj
}
var HeuristicAssocCell = typedef_struct_heuristic_assoc_cell()
var HeuristicAssoc_p = typedef_struct_heuristic_assoc_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_learning.h

Author: Stephan Schulz

Contents
 
  Evaluation of a clause by tsm-based learning algorithms

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Aug 30 19:17:53 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CHE_LEARNING){

var CHE_LEARNING = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var DEFAULT_POS_MULT = 1

/* As it is fairly expensive to create a suitable TSM (about 10-40
   seconds) we only want to create it when we really need to use
   it. Therefore we hack this as follows: All relevant data is stored
   in the parameter cell, and the TSM is created if the
   evaluation function is called for the first time. */

function typedef_struct_tsmparamcell()
{
    function obj()
    {
        this.fweight
        this.vweight
        this.max_term_multiplier
        this.max_literal_multiplier
        this.pos_multiplier
        this.flat_clauses
        this.learnweight
        this.kb
        this.state = new ProofState_p()
        this.sel_no
        this.set_part
        this.dist_part
        this.indextype = new IndexType()
        this.tsmtype = new TSMType()
        this.depth
        this.e_weightsANNOTATION_DEFAULT_SIZE1
        this.eval_base
        this.eval_scale
        this.pat_subst = new PatternSubst_p()
        this.tsmadmin = new TSMAdmin_p()
    }
    return obj
}
var TSMParamCell = typedef_struct_tsmparamcell()
var TSMParam_p = typedef_struct_tsmparamcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function TSMParamCellAlloc()
{
   return SizeMalloc(TSMParamCell)
}

function TSMParamCellFree(junk)
{
   SizeFree(junk,TSMParamCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_lifo.h

Author: Stephan Schulz

Contents
 
  LIFO-Evaluation of a clause (unfair!)

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jun 22 15:28:23 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_LIFO){

var CHE_LFIFO = 1

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

File  : che_litselection.h

Author: Stephan Schulz

Contents

  Functions for selection certain literals (and hence superposition
  strategies).

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri May 21 22:17:06 GMT 1999
    New

-----------------------------------------------------------------------*/

if(!CHE_LITSELECTION){

var CHE_LITSELECTION = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_litsel_name_fun_assoc_cell()
{
    function obj()
    {
        this.name
        this.fun = new LiteralSelectionFun()
    }
    return obj
}
var LitSelNameFunAssocCell = typedef_struct_litsel_name_fun_assoc_cell()

function typedef_struct_lit_eval_cell()
{
    function obj()
    {
        this.literal = new Eqn_p()
        this.forbidden
        this.exclusive
        this.w1
        this.w2
        this.w3
    }
    return obj
}
var LitEvalCell = typedef_struct_lit_eval_cell()
var LitEval_p = typedef_struct_lit_eval_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function LitEvalInit(cell)
{
    cell.forbidden = false
    cell.exclusive=true
    cell.w1=0
    cell.w2=0
    cell.w3=0
    return cell
}

}
/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_normsubst.h

Author: Stephan Schulz

Contents
 
  Substitutions mapping function symbols and variables to norm
  values.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Feb 16 01:04:12 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CLE_NORMSUBST){

var CLE_NORMSUBST = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_normsubstcell()
{
    function obj()
    {
        this.used_ids = new NumTree_p()
        this.norm_funs = new NumTree_p()
        this.norm_vars = new NumTree_p()
    }
    return obj
}
var NormSubstCell = typedef_struct_normsubstcell()
var NormSubst_p = typedef_struct_normsubstcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function NormSubstCellAlloc()
{
   return SizeMalloc(NormSubstCell)
}
function NormSubstCellFree(junk)
{
   SizeFree(junk,NormSubstCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_orientweight.h

Author: Stephan Schulz

Contents
 
  Evaluation of a clause by orientable clause weight, using penalties
  for unorientable and maximal literals.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jun 17 00:11:03 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_ORIENTWEIGHT){

var CHE_ORIENTWEIGHT = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var DEFAULT_MAX_MULT = 1.5

function typedef_struct_orientweightparamcell()
{
    function obj()
    {
        this.ocb = new OCB_p()
        this.unorientable_literal_multiplier
        this.max_literal_multiplier
        this.pos_multiplier
        this.vweight
        this.fweight
    }
    return obj
}
var OrientWeightParamCell = typedef_struct_orientweightparamcell()
var OrientWeightParam_p = typedef_struct_orientweightparamcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function OrientWeightParamCellAlloc()
{
   return SizeMalloc(OrientWeightParamCell)
}

function OrientWeightParamCellFree(junk)
{
   SizeFree(junk,OrientWeightParamCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_patterns.h

Author: Stephan Schulz

Contents
 
  Routines for dealing with term patterns.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Jul  5 02:28:25 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CLE_PATTERNS){

var CLE_PATTERNS = 1

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

File  : che_prio_funs.h

Author: Stephan Schulz

Contents
 
  Functions dealing with priorities for clauses.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Dec  5 16:45:41 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_PRIO_FUNS){

var CHE_PRIO_FUNS = 1

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

File  : che_proofcontrol.h

Author: Stephan Schulz

Contents
 
  Object storing all information about control of the search
  process: Ordering, heuristic, similar stuff.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Oct 16 14:52:53 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_PROOFCONTROL){

var CHE_PROOFCONTROL = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_proofcontrolcell()
{
    function obj()
    {
        this.ocb = new OCB_p()
        this.hcb = new HCB_p()
        this.wfcbs = new WFCBAdmin_p()
        this.hcbs = new HCBAdmin_p()
        this.ac_handling_active
        this.heuristic_parms = new HeuristicParmsCell()
        this.fvi_parms = new FVIndexParmsCell()
        this.problem_specs = new SpecFeatureCell()
    }
    return obj
}
var ProofControlCell = typedef_struct_proofcontrolcell()
var ProofControl_p = typedef_struct_proofcontrolcell()

function HCBARGUMENTS()
{
   return { state: new ProofState_p(), control: new ProofControl_p(), parms: new HeuristicParms_p()  }
}

function typedef_HCB_p()
{
   this.value = HCBARGUMENTS() || {}
}
var HCBCreateFun = new typedef_HCB_p()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var DefaultWeightFunctions;
var DefaultHeuristics;

function ProofControlCellAlloc()
{
   return SizeMalloc(ProofControlCell)
}

function ProofControlCellFree(junk)
{
   SizeFree(junk,ProofControlCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_rawspecfeatures.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Code and datatypes for handling rough classification of raw problem
  specs.

  Copyright 2012 by the author.
  This code is released under the GNU General Public Licence.
  See the file COPYING in the main CLIB directory for details.
  Run "eprover -h" for contact information.

Changes

<1> Tue May 22 01:10:30 CEST 2012
    New

-----------------------------------------------------------------------*/

if(!RAWSPECFEATURES){

var RAWSPECFEATURES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_raw_spec_feature_cell()
{
    function obj()
    {
        this.sentence_no
        this.longterm_size
        this.sig_size
        this.pred_size
        this.predc_size
        this.fun_size
        this.func_size
        this.class7
    }
    return obj
}
var RawSpecFeatureCell = typedef_struct_raw_spec_feature_cell()
var RawSpecFeature_p = typedef_struct_raw_spec_feature_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_refinedweight.h

Author: Stephan Schulz

Contents
 
  Evaluation of a clause by refined clause weight, using weight
  penalty factors for maximal terms and literals.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jun 17 00:11:03 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_REFINEDWEIGHT){

var CHE_REFINEDWEIGHT = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var DEFAULT_MAX_MULT = 1.5

function typedef_struct_refinedweightparamcell()
{
    function obj()
    {
        this.ocb = new OCB_p()
        this.max_term_multiplier
        this.max_literal_multiplier
        this.pos_multiplier
        this.vweight
        this.fweight
    }
    return obj
}
var RefinedWeightParamCell = typedef_struct_refinedweightparamcell()
var RefinedWeightParam_p = typedef_struct_refinedweightparamcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function RefinedWeightParamCellAlloc()
{
   return SizeMalloc(RefinedWeightParamCell)
}

function RefinedWeightParamCellFree(junk)
{
   SizeFree(junk,RefinedWeightParamCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_simweight.h

Author: Stephan Schulz

Contents
 
  Evaluation of a clause by similarity of terms (equations with
  similar terms have low weight).

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Jun 28 18:18:00 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_SIMWEIGHT){

var CHE_SIMWEIGHT = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_simparamcell()
{
    function obj()
    {
        this.equal_weight
        this.var_var_clash
        this.var_term_clash
        this.term_term_clash
    }
    return obj
}
var SimParamCell = typedef_struct_simparamcell()
var SimParam_p = typedef_struct_simparamcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function SimParamCellAlloc()
{
   return SizeMalloc(SimParamCell)
}

function SimParamCellFree(junk)
{
   SizeFree(junk,SimParamCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_to_autoselect.h

Author: Stephan Schulz

Contents
 
  Functions dealing with the automatic selection of a (suitable?) term
  ordering.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Dec 31 17:39:46 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_TO_AUTOSELECT){

var CHE_TO_AUTOSELECT = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* This is kind of ugly, as I have most of the information already in
   the HeuristicParmsCell. I just don't like to lug all the other
   stuff around and confuse issues. There are functions for converting
   the relevant parts of HeuristicParmsCell and OrderParmsCell. */

function typedef_struct_order_parms_cell()
{
    function obj()
    {
        this.ordertype = new TermOrdering()
        this.to_weight_gen = new TOWeightGenMethod()
        this.to_prec_gen = new TOPrecGenMethod()
        this.to_const_weight
        this.no_lit_cmp
    }
    return obj
}
var OrderParmsCell = typedef_struct_order_parms_cell()
var OrderParms_p = typedef_struct_order_parms_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function OrderParmsCellAlloc()
{
   return SizeMalloc(OrderParmsCell)
}

function OrderParmsCellFree(junk)
{
   SizeFree(junk,OrderParmsCell)
}

/* For now, we will fix the evaluation parameters by #defines's in the
   .c file....if somebody wants to tinker with it, he or she is
   welcome to do it. Not me, and not now!  */

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_to_precgen.h

Author: Stephan Schulz

Contents
 
  Routines for generating precedences for term orderings

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Oct 16 17:01:23 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_TO_PRECGEN){

var CHE_TO_PRECGEN = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Nothing */
/* My hack ;-) */
/* My new hack ;-) */
/* Sort by arity */
/* Sort by inverse arity */
/* Sort by arity, but constants first (Default
   for SPASS) */
/* Sort by inverse arity, but make constants
   minimal */
/* Make often occuring symbols big */
/* Make often occuring symbols small */
/* Make often occuring symbols small,
   conjecture symbols large */
/* Make conjecture symbols maximal, otherwise
   use invfreq */
/* Make conjecture symbols mminimal, otherwise
   use invfreq */
/* Make rarely occuring symbols small, except for
   constants */
/* Make constants minimal, frequent unary
   symbols maximal, otherwise as,
   PByInvFrequency */
/* Special hack for theory of array with
   conceptually typed symbols recognized by,
   name. */
/* My (planned) hack */

function typedef_enum_TOPrecGenMethod()
{
    function obj()
    {
        this.PNoMethod = 0
        this.PUnaryFirst = 1<<1
        this.PUnaryFirstFreq = 1<<2
        this.PArity = 1<<3
        this.PInvArity = 1<<4
        this.PConstMax = 1<<5
        this.PInvArConstMin = 1<<6
        this.PByFrequency = 1<<7
        this.PByInvFrequency = 1<<8
        this.PByInvConjFrequency = 1<<9
        this.PByInvFreqConjMax = 1<<10
        this.PByInvFreqConjMin = 1<<11
        this.PByInvFreqConstMin = 1<<12
        this.PByInvFreqHack = 1<<13
        this.PArrayOpt = 1<<14
        this.POrientAxioms = 1<<15
        this.PUnaryFirst = new PMinMethod()
        this.POrientAxioms = new PMaxMethod()
    }
    return obj
}
var TOPrecGenMethod = typedef_enum_TOPrecGenMethod()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var FREQ_SEMI_INFTY = 2000000 /* Bigger than any expected frequency,
				 * small enough to never cause over-
				 * or underflow */

function TOGetPrecGenName(method)
{
   return TOPrecGenNames[(method)]
}

function TOGenerateDefaultPrecedence(ocb)
{
   return TOGeneratePrecedence((ocb), NULL, PUnaryFirst)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_to_weightgen.h

Author: Stephan Schulz

Contents
 
  Routines for generating weights for term orderings

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Sep 25 02:49:11 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_TO_WEIGHTGEN){

var CHE_TO_WEIGHTGEN = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Nothing */
/* First maximal symbol in precedence gets
    weight 0 */
/* Weight(f) = Arity(f)+1 */
/* Weight(f) = Arity(f)+1, 0 for first max*/
/* Weight(f) = Arity(f)+W_TO_BASEWEIGHT */
/* Weight(f) = Arity(f)+W_TO_BASEWEIGHT, 0
     for first max*/
/* Weight(f) = Arity(f)^2+1) */
/* Weight(f) = Arity(f)^2+1), 0 for first
                             max */
/* Weight(f) = Maxarity+1-Arity(f) */
/* Weight(f) = Maxarity+1-Arity(f), 0 for
                             first max */
/* Weight(f) = Maxarity^2+1-Arity(f)^2 */
/* Weight(f) = Maxarity^2+1-Arity(f)^2, 0
                             for first max */
/* Weight(f) = |{g|g<f}| */
/* Weight(f) = |{g|g>f}| */
/* Weight(f) = |Axioms|_f */
/* Weight(f) = Maxfreq+1-|Axioms|_f */
/* Weight(f) = Rank in frequency-induced
     quasi-ordering */
/* Weight(f) = Inverse rank in
     frequency-induced * quasi-ordering */
/* Weight(f) = Inverse rank in
    conjecture-frequency-induced,
    quasi-ordering */
/* As above, but squared */
/* Ditto */
/* As WInvFrequencyRank, but difference
     between ranks is cardinality of set of,
     symbols in rank */
/* As above, but first maximal unary is 0 */
/* All weights 1 */
/* Update as required! */

function typedef_enum_TOWeightGenMethod()
{
    function obj()
    {
        this.WNoMethod = 0
        this.WSelectMaximal = 1<<1
        this.WArityWeight = 1<<2
        this.WArityMax0 = 1<<3
        this.WModArityWeight = 1<<4
        this.WModArityMax0 = 1<<5
        this.WAritySqWeight = 1<<6
        this.WAritySqMax0 = 1<<7
        this.WInvArityWeight = 1<<8
        this.WInvArityMax0 = 1<<9
        this.WInvAritySqWeight = 1<<10
        this.WInvAritySqMax0 = 1<<11
        this.WPrecedence = 1<<12
        this.WPrecedenceInv = 1<<13
        this.WPrecRank5 = 1<<14
        this.WPrecRank10 = 1<<15
        this.WPrecRank20 = 1<<16
        this.WFrequency = 1<<17
        this.WInvFrequency = 1<<18
        this.WFrequencyRank = 1<<19
        this.WInvFrequencyRank = 1<<20
        this.WInvConjFrequencyRank = 1<<21
        this.WFrequencyRankSq = 1<<22
        this.WInvFrequencyRankSq = 1<<23
        this.WInvModFreqRank = 1<<24
        this.WInvModFreqRankMax0 = 1<<25
        this.WConstantWeight = 1<<26
        this.WSelectMaximal = new WMinMethod()
        this.WConstantWeight = new WMaxMethod()
    }
    return obj
}
var TOWeightGenMethod = typedef_enum_TOWeightGenMethod()

/* Think about goal-directedness, prefer symbols occuring in the goal */ 

var WConstNoSpecialWeight = -1
var WConstNoWeight = 0

/* Used as base weight for ModArity */
var W_TO_BASEWEIGHT = 4

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function TOGetWeightGenName(method)
{
   return TOWeightGenNames[(method)]
}

function TOGenerateDefaultWeights(ocb)
{
   return TOGenerateWeights((ocb), NULL, WSelectMaximal,W_DEFAULT_WEIGHT)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_varweights.h

Author: Stephan Schulz, schulz@eprover.org

Contents
 
  Weight functions that play around a bit ;-)

  Copyright 1998, 1999, 2005 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jun 17 00:11:03 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_VARWEIGHTS){

var CHE_VARWEIGHTS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_varweightparamcell()
{
    function obj()
    {
        this.ocb = new OCB_p()
        this.max_term_multiplier
        this.max_literal_multiplier
        this.pos_multiplier
        this.conjecture_multiplier
        this.hypothesis_multiplier
        this.sig_size_multiplier
        this.proof_size_multiplier
        this.proof_depth_multiplier
        this.term_weight_multiplier
        this.term_depth_multiplier
        this.weight_multiplier
        this.vlweight
        this.vweight
        this.fweight
        this.nvweight
        this.nfweight
        this.cweight
        this.pweight
        this.stagger_limit
    }
    return obj
}
var VarWeightParamCell = typedef_struct_varweightparamcell()
var VarWeightParam_p = typedef_struct_varweightparamcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function VarWeightParamCellAlloc()
{
   return SizeMalloc(VarWeightParamCell)
}

function VarWeightParamCellFree(junk)
{
   SizeFree(junk,VarWeightParamCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_wfcbadmin.h

Author: Stephan Schulz

Contents
 
  Functions for administrating and parsing sets of weight functions. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Dec  8 22:27:02 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_WFCB_ADMIN){

var CHE_WFCB_ADMIN = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_wfcbadmincell()
{
    function obj()
    {
        this.names = new PStack_p()
        this.wfcb_set = new PStack_p()
        this.anon_counter
    }
    return obj
}
var WFCBAdminCell = typedef_struct_wfcbadmincell()
var WFCBAdmin_p = typedef_struct_wfcbadmincell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function WFCBAdminCellAlloc()
{
   return SizeMalloc(WFCBAdminCell)
}
function WFCBAdminCellFree(junk)
{
   SizeFree(junk,WFCBAdminCell)
}

var WeightFunParseFunNames = new Array()

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : che_wfcb.h

Author: Stephan Schulz

Contents
 
  Weigth-function-Control blocks, functions computing weights for
  clauses. 

  The interface to an evaluation function requires 3 or 4 functions:
  
  WFCB_p <eval>Init(PrioFun prio, &rest) 

     This function takes a prority function and optional arguments,
     and return a WFCB. In particular, it is responsible for creating
     the data block of the WFCB. Resonable additional arguments are
     the OCB, the signature, or the set of axioms.

  WFCB_p <eval>Parse(Scanner_p in, OCB_p ocb, ProofState_p state) 

     Extracts the arguments from an input stream and passes then on to
     the init-function. ocb contains an initialized OCB, state is a
     partially initialized proof state: Only state->axioms has to be
     initialized. However, state is guaranteed to be the state used in
     saturating (i.e. the weight functions can access the fully
     initialized state later on).

     double <eval>Compute(void *data, Clause_p clause)

     Given a clause and a data block, return an evaluation for the
     clause. 

  void <Eval>Exit(void* data)

     This function is responsible for freeing data, before the WFCB is
     deleted.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Jun  5 21:39:40 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CHE_WFCB){

var CHE_WFCB = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Weight functions and their data */

function typedef_struct_wfcb_cell()
{
    function obj()
    {
      this.wfcb_eval = new ClauseEvalFun()
      this.wfcb_exit = new GenericExitFun()
      this.wfcb_priority = new ClausePrioFun()
      this.data
    }
    return obj
}
var WFCBCell = typedef_struct_wfcb_cell()
var WFCB_p = typedef_struct_wfcb_cell()

function typedef_WFCB_p()
{
   this.value = WeightFunParseFun // (_in_, OCB_p ocb,ProofState_p state)
}

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function WFCBCellAlloc()
{
   return SizeMalloc(WFCBCell)
}
function WFCBCellFree(junk)
{
   SizeFree(junk, WFCBCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_basicparser.h

Author: Stephan Schulz

Contents
 
  Parsing routines for useful C build-in ans some general CLIB
  datatypes not covered by the scanner. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Sep  8 16:34:11 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CIO_BASICPARSER){

var CIO_BASICPARSER = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_StrNumType()
{
    function obj()
    {
        this.SNNoNumber = 1<<0
        this.SNInteger = 1<<1
        this.SNRational = 1<<2
        this.SNFloat = 1<<3
    }
    return obj
}
var StrNumType = typedef_enum_StrNumType()


/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cio_commandline.h

Author: Stephan Schulz

Contents
 
  Definitions for handling options and recognising non-option
  arguments. 

  "Why don't you use getopt()?"

  - Implementations of getopt() seem to differ significantly between 
    UNIX implementations. Finding out what the differences are and
    coding around them seems to be more work than writing this version
    from scratch.
  - This implementation comes with more support for the handling of
    numerical arguments for options.
  - Finally, this implementation allows (well, forces) the programmer
    to document an option _immediately_, and automates the process of
    presenting this information to the user.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Sep  7 00:38:12 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CIO_COMMANDLINE){

var CIO_COMMANDLINE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Supported option types: */

function typedef_enum_OptArgType()
{
    function obj()
    {
        this.NoArg = 1<<0
        this.OptArg = 1<<1
        this.ReqArg = 1<<2
    }
    return obj
}
var OptArgType = typedef_enum_OptArgType()

/* Single Character options */
/* Double dash, GNU-Style */
/* What about Arguments? */
/* Default for optional argument (long
   style only */
/* Put the documentation in immediately! */

function typedef_struct_optcell()
{
    function obj()
    {
        this.option_code
        this.shortopt
        this.longopt
        this.type = new OptArgType()
        this.arg_default
        this.desc
    }
    return obj
}
var OptCell = typedef_struct_optcell()
var Opt_p = typedef_struct_optcell()

/* Which character of the current element of
   argv has to be read next? */
/* Which element of argv[] ? */
/* How large is the argv array really? */
/* How many elements in argv[]? */
/* Vector of arguments. Processed options and
   option args will be removed */

function typedef_struct_clstatecell()
{
    function obj()
    {
        this.sc_opt_c
        this.argi
        this.argsize
        this.argc
        this.argv
    }
    return obj
}
var CLStateCell = typedef_struct_clstatecell()
var CLState_p = typedef_struct_clstatecell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function CLStateCellAlloc()
{
   return SizeMalloc(CLStateCell)
}
function CLStateCellFree(junk)
{
   SizeFree(junk, CLStateCell)
}

var FORMAT_WIDTH = 78

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

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

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

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
function SysDateCreationTime(){ return 0 }
function SysDateArmageddonTime(){ return ULONG_MAX }
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

/*-----------------------------------------------------------------------

File  : cle_indexfunctions.h

Author: Stephan Schulz

Contents

  Functions and data types realizing simple index functions.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Aug  4 15:36:51 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_INDEXFUNCTIONS){

var CLE_INDEXFUNCTIONS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_IndexType()
{
    function obj()
    {
        this.IndexNoIndex = 1<<0
        this.IndexArity = 1<<1
        this.IndexSymbol = 1<<2
        this.IndexTop = 1<<3
        this.IndexAltTop = 1<<4
        this.IndexCSTop = 1<<5
        this.IndexESTop = 1<<6
        this.IndexIdentity = 1<<7
        this.IndexEmpty = 1<<8
    }
    return obj
}
var IndexType = typedef_enum_IndexType()

function typedef_struct_indextermcell()
{
    function obj()
    {
        this.term = new Term_p()
        this.subst = new PatternSubst_p()
        this.key
    }
    return obj
}
var IndexTermCell = typedef_struct_indextermcell()
var IndexTerm_p = typedef_struct_indextermcell()

/* Operations on index:

   - insert(term, patternsubst) -> value >=0, 
   - find(term, patternsubst) -> value or -1

   All values should populate 0...max{values} somewhat densely

   */

function typedef_struct_tsmindexcell()
{
    function obj()
    {
        this.ident
        this.type = new IndexType()
        this.depth
        this.count
        this.bank = new TB_p()
        this.subst = new PatternSubst_p()
        this.tree = {
           t_index : new PTree_p(),
           n_index : new NumTree_p()
        }
    }
    return obj
}
var TSMIndexCell = typedef_struct_tsmindexcell()
var TSMIndex_p = typedef_struct_tsmindexcell()

var IndexDynamicDepth = 0

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function IndexTermCellAlloc()
{
   return SizeMalloc(IndexTermCell)
}
function IndexTermCellFree(junk)
{
    SizeFree(junk, IndexTermCell)
}

function TSMIndexCellAlloc()
{
   return SizeMalloc(TSMIndexCell)
}
function TSMIndexCellFree(junk)
{
    SizeFree(junk, TSMIndexCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_kbdesc.h

Author: Stephan Schulz

Contents
 
  Data types and functions for representing the knowledge base.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Jul 16 20:12:05 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_KB){

var CLE_KB = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var KB_VERSION = "0.20dev"

function typedef_struct_kbdesccell()
{
    function obj()
    {
        this.version
        this.neg_proportion
        this.fail_neg_examples
    }
    return obj
}
var KBDescCell = typedef_struct_kbdesccell()
var KBDesc_p = typedef_struct_kbdesccell()

var KB_ANNOTATION_NO = 7

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function KBDescCellAlloc()
{
   return SizeMalloc(KBDescCell)
}

function KBDescCellFree(junk)
{
    SizeFree(junk, KBDescCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_kbinsert.h

Author: Stephan Schulz

Contents
 
  Functions for implementing the kb-insert operation.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Jul 27 22:10:34 GMT 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_KBINSERT){

var CLE_KBINSERT = 1

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

File  : cle_numfeatures.h

Author: Stephan Schulz

Contents
 
  Functions and data types for dealing with numerical features of the
  clause set. This is, unfortunatly, not quite orthogonal to
  che_clausesetfeatures.h at the moment.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jul 26 18:47:37 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CHE_NUMFEATURES){

var CHE_NUMFEATURES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var FEATURE_NUMBER = 15

/* Preliminary list of features to use:
  
   - Number of unit clauses
   - Number of nonunit horn  clauses
   - Number of nonhorn general clauses
   - Average term depth of positive literals, standard deviation
   - Average term depth of negative literals, standard deviation
   - Average term size of positive literals, standard deviation
   - Average term size of negative literals, standard deviation
   - Average number of positive literals, standard deviation
   - Average number of negative literals, standard deviation

   */

function typedef_struct_featurescell()
{
    function obj()
    {
        this.pred_max_arity
        this.pred_distrib = new PDArray_p()
        this.func_max_arity
        this.func_distrib = new PDArray_p()
        this.featuresFEATURE_NUMBER
    }
    return obj
}
var FeaturesCell = typedef_struct_featurescell()
var Features_p = typedef_struct_featurescell()

var SEL_FEATURE_WEIGHTS =
[1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
var SEL_PRED_WEIGHT = 1.0
var SEL_FUNC_WEIGHT = 1.0

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function FeaturesCellAlloc()
{
   return SizeMalloc(FeaturesCell)
}
function FeaturesCellFree(junk)
{
    SizeFree(junk, FeaturesCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_patterns.h

Author: Stephan Schulz

Contents
 
  Data type (previous "norm subst") for describing terms, equations
  and clauses as patterns of same.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Apr  9 14:18:11 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_PATTERNS){

var CLE_PATTERNS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Norm idents are allocated as NORM_SYMBOL_LIMIT*(arity+1) +number of  
   ident. There can be no more than NORM_SYMBOL_LIMIT symbols of any
   arity, and no symbol with arity > ARITY. Moreover, we will run into
   trouble with learning if the total number of symbols is ever
   bigger than 32768
   NORM_ARITY_LIMIT*NORM_SYMBOL_LIMIT <= LONG_MAX */ 

var NORM_ARITY_LIMIT = 16384  /* Largest Arity allowed */
var NORM_SYMBOL_LIMIT = 65536  /* Maximum number of different
				    symbols of an arity allowed */
var NORM_VAR_INIT = -536870912

function typedef_struct_patternsubstcell()
{
    function obj()
    {
        this.used_idents = new PDArray_p()
        this.fun_subst = new PDArray_p()
        this.used_vars
        this.var_subst = new PDArray_p()
        this.backtrack = new PStack_p()
        this.sig = new Sig_p()
    }
    return obj
}
var PatternSubstCell = typedef_struct_patternsubstcell()
var PatternSubst_p = typedef_struct_patternsubstcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var DEFAULT_LITERAL_NO = 8
var PATTERN_SEARCH_BRANCHLIMIT = 3

function PatternNormCode(symbol, arity)
{
   return (NORM_SYMBOL_LIMIT*(arity+1))+symbol
}

function PatternSubstCellAlloc()
{
   return SizeMalloc(PatternSubstCell)
}

function PatternSubstCellFree(junk)
{
   SizeFree(junk, PatternSubstCell)
}

function PatternIdGetArity(ident)
{
   return ((ident)/NORM_SYMBOL_LIMIT)-1
}
function PatternIdGetIdent(ident)
{
   return (ident)%NORM_SYMBOL_LIMIT
}

function PatIdIsNormId(symbol)
{
   return (symbol >= NORM_SYMBOL_LIMIT)
}

function PatEqnLTerm(eqn, dir)
{
   return (dir==PENormal)?eqn.lterm:eqn.rterm
}
function PatEqnRTerm(eqn, dir)
{
   return (dir==PENormal)?eqn.rterm:eqn.lterm
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/
/*-----------------------------------------------------------------------

File  : cle_termtops.h

Author: Stephan Schulz

Contents
 
  Compute the various term tops for given (shared!) terms.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Aug  3 17:14:11 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_TERMOPS){

var CLE_TERMTOPS = 1

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

File  : cle_tsm.h

Author: Stephan Schulz

Contents
 
  Finally, the term space map!

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Aug  6 16:47:31 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_TSM){

var CLE_TSM = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_TSMType()
{
    function obj()
    {
        this.TSMTypeNoType = 1<<0
        this.TSMTypeFlat = 1<<1
        this.TSMTypeRecursive = 1<<2
        this.TSMTypeRecurrent = 1<<3
        this.TSMTypeRecurrentLocal = 1<<4
    }
    return obj
}
var TSMType = typedef_enum_TSMType()

function typedef_struct_tsmadmincell()
{
    function obj()
    {
        this.tsmtype = new TSMType()
        this.index_bank = new TB_p()
        this.index_type = new IndexType()
        this.index_depth
        this.limit
        this.local_limit
        this.eval_limit
        this.unmapped_eval
        this.unmapped_weight
        this.tsmcelltsm
        this.tsmcellemptytsm
        this.tsmstack = new PStack_p()
        this.cachestack = new PStack_p()
        this.subst = new PatternSubst_p()
    }
    return obj
}
var TSMAdminCell = typedef_struct_tsmadmincell()
var TSMAdmin_p = typedef_struct_tsmadmincell()

function typedef_struct_tsmcell()
{
    function obj()
    {
        this.admin = new TSMAdmin_p()
        this.index = new TSMIndex_p()
        this.maxindex
        this.tsas = new PDArray_p()
    }
    return obj
}
var TSMCell = typedef_struct_tsmcell()
var TSM_p = typedef_struct_tsmcell()

function typedef_struct_tsacell()
{
    function obj()
    {
        this.admin = new TSMAdmin_p()
        this.eval_weight
        this.eval
        this.arity
        this.arg_tsms = new TSM_p()
    }
    return obj
}
var TSACell = typedef_struct_tsacell()
var TSA_p = typedef_struct_tsacell()

var TSM_MAX_TERMTOP = 5

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function GetTSMType(name)
{
    return StringIndex(name, TSMTypeNames)
}

function TSMEvalNormalize(eval, limit)
{
   return ((eval) < (limit))?-1:1
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cle_tsmio.h

Author: Stephan Schulz

Contents
 
  Functions for building TSMs from a knowledge base.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Aug 31 13:23:14 MET DST 1999
    New

-----------------------------------------------------------------------*/

if(!CLE_TSMIO){

var CLE_TSMIO = 1

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

File  : cpr_dpllformula.h

Author: Stephan Schulz

Contents
 
  Base data structure for representing the state of a propositional
  formula (in CNF) for a DPLL procedure. I'm doing this for the first
  time, so it probably is sub-perfect....

  Copyright 2003 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri May  2 17:50:53 CEST 2003
    New

-----------------------------------------------------------------------*/

if(!CPR_DPLLFORMULA){

var CPR_DPLLFORMULA = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_atom_cell()
{
    function obj()
    {
        this.pos_occur
        this.neg_occur
        this.pos_active = new PTree_p()
        this.neg_active = new PTree_p()
    }
    return obj
}
var AtomCell = typedef_struct_atom_cell()
var Atom_p = typedef_struct_atom_cell()

function typedef_struct_dpllrep_cell()
{
    function obj()
    {
        this.sig = new PropSig_p()
        this.clauses = new PStack_p()
        this.atom_no
        this.atoms = new Atom_p()
    }
    return obj
}
var DPLLFormulaCell = typedef_struct_dpllrep_cell()
var DPLLFormula_p = typedef_struct_dpllrep_cell()

var DEFAULT_ATOM_NUMBER = 500;
var ATOM_GROWTH_FACTOR = 1.5

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function DPLLFormulaCellAlloc()
{
   return SizeMalloc(DPLLFormulaCell)
}
function DPLLFormulaCellFree(junk)
{
    SizeFree(junk, DPLLFormulaCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cpr_dpll.h

Author: Stephan Schulz

Contents
 
  Definitions for the main DPLL algorithm.

  Copyright 2003 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue May  6 02:04:46 CEST 2003
    New

-----------------------------------------------------------------------*/

if(!CPR_DPLL){

var CPR_DPLL = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_dpll_state_cell()
{
    function obj()
    {
        this.form = new DPLLFormula_p()
        this.assignment = new PStack_p()
        this.deactivated = new PStack_p()
        this.unproc_units = new PStack_p()
        this.open_atoms = new AtomSet_p()
    }
    return obj
}
var DPLLStateCell = typedef_struct_dpll_state_cell()
var DPLLState_p = typedef_struct_dpll_state_cell()


/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function DPLLStateCellAlloc()
{
   return SizeMalloc(DPLLStateCell)
}
function DPLLStateCellFree(junk)
{
    SizeFree(junk, DPLLStateCell)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cpr_propclauses.h

Author: Stephan Schulz

Contents
 
  Datatypes for the efficient representation of propositional clauses
  for a DPLL procedure.

  Copyright 2003 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Apr 23 12:10:35 CEST 2003
    New

-----------------------------------------------------------------------*/

if(!CPR_PROPCLAUSES){

var CPR_PROPCLAUSES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_DPLLOutputFormat()
{
    function obj()
    {
        this.DPLLOutNoFormat = 1<<0
        this.DPLLOutLOP = 1<<1
        this.DPLLOutDimacs = 1<<2
    }
    return obj
}
var DPLLOutputFormat = typedef_enum_DPLLOutputFormat()


function typedef_struct_dpll_clause_cell()
{
    function obj()
    {
        this.longmem_size
        this.longlit_no
        this.longactive_no
        this.literals = new PLiteralCode()
    }
    return obj
}
var DPLLClauseCell = typedef_struct_dpll_clause_cell()
var DPLLClause_p = typedef_struct_dpll_clause_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function DPLLClauseCellAlloc()
{
   return SizeMalloc(DPLLClauseCell)
}
function DPLLClauseCellFree(junk)
{
    SizeFree(junk, DPLLClauseCell)
}

function DPLLClauseIsUnit(clause)
{
   return (clause.active_no==1)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cpr_propsig.h

Author: Stephan Schulz

Contents
 
  Definitions for dealing with signatures for propositional variables
  - essentially juat associating a name with an internal number and
  vice versa.

  Copyright 2003 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Apr 24 16:19:17 CEST 2003
    New (partially from cte_signature.h>

-----------------------------------------------------------------------*/

if(!CPR_PROPSIG){

var CPR_PROPSIG = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_propsigcell()
{
    function obj()
    {
        this.enc_to_name = new PStack_p()
        this.name_to_enc = new StrTree_p()
    }
    return obj
}
var PropSigCell = typedef_struct_propsigcell()
var PropSig_p = typedef_struct_propsigcell()

function PLiteralCode()
{
   this.value = arguments[0] || 0
}

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PropSigCellAlloc()
{
   return SizeMalloc(PropSigCell)
}
function PropSigCellFree(junk)
{
    SizeFree(junk, PropSigCell)
}
var PLiteralNoLit = 0
function PAtomP(code)
{
   return (code>0)
}

function PropSigAtomNumber(psig)
{
   return PStackGetSP(psig.enc_to_name)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cpr_varset.h

Author: Stephan Schulz

Contents
 
  Data type for (multi-)sets of propositional variables, currently
  organized as doubly linked lists.

  Copyright 2003 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue May 13 21:37:34 CEST 2003
    New

-----------------------------------------------------------------------*/

if(!CPR_VARSET){

var CPR_VARSET = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_atomset_cell()
{
    function obj()
    {
        this.atom = new PLiteralCode()
        this.atomset_cellprev
        this.atomset_cellsucc
    }
    return obj
}
var AtomSetCell = typedef_struct_atomset_cell()
var AtomSet_p = typedef_struct_atomset_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function AtomSetCellAlloc()
{
   return SizeMalloc(AtomSetCell)
}
function AtomSetCellFree(junk)
{
    SizeFree(junk, AtomSetCell)
}

function AtomSetEmpty(set)
{
   return set.prev == (set)
}

}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_acterms.h

Author: Stephan Schulz

Contents
 
  Functions and data types for terms in AC normal form (flattened,
  subterms sorted alphabetically).

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Fri Nov 17 20:02:15 MET 2000
    New

-----------------------------------------------------------------------*/

if(!CTE_ACTERMS){

var CTE_ACTERMS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* AC-Terms are a lot simpler than normal terms, as we only need a
   small number of them, and then only temporary */

function typedef_struct_actermopcell()
{
    function obj()
    {
        this.f_code = new FunCode()
        this.args = new PDArray_p()
    }
    return obj
}
var ACTermCell = typedef_struct_actermopcell()
var ACTerm_p = typedef_struct_actermopcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function ACTermCellAlloc()
{
   return SizeMalloc(ACTermCell)
}
function ACTermCellFree(junk)
{
    SizeFree(junk, ACTermCell)
}

}//CTE_ACTERMS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_fp_index.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Fingerprint based indexing of terms. A fingerprint is a extor of
  samples of symbols at different positions. The index is a try build
  over these vectors.

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Feb 20 19:19:23 EET 2010
    New

-----------------------------------------------------------------------*/

if(!CTE_FP_INDEX){

var CTE_FP_INDEX = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* This datatype is used for building fingerprint indexes for terms. A
 * fingerprint index is a trie over fingerprints. Fingerprints contain
 * the actual f_codes of certain sampled positions in a term, or the
 * values BELOW_VAR, ANY_VAR and NOT_IN_TERM to describe positions not
 * in the term and not in any possible instance of the term,
 * respectively. Function symbol
 * alternatives are handled in the obvious way. The values BELOW_VAR,
 * ANY_VAR, NOT_IN_TERM are now encoded  in f_alternatives[0,-1,-2]
 * according to their value. */

function typedef_struct_fp_index_cell()
{
    function obj()
    {
        this.f_alternatives = new IntMap_p()
        this.fp_index_cellbelow_var
        this.fp_index_cellany_var
        this.count
        this.payload = new PObjTree_p()
    }
    return obj
}
var FPTreeCell = typedef_struct_fp_index_cell()
var FPTree_p = typedef_struct_fp_index_cell()

/* Wrapper for the index */

function typedef_struct_subterm_index_cell()
{
    function obj()
    {
        this.index = new FPTree_p()
        this.fp_fun = new FPIndexFunction()
        this.sig = new Sig_p()
        this.payload_free = new FPTreeFreeFun()
    }
    return obj
}
var FPIndexCell = typedef_struct_subterm_index_cell()
var FPIndex_p = typedef_struct_subterm_index_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function FPTreeCellAlloc()
{
   return SizeMalloc(FPTreeCell)
}
function FPTreeCellFree(junk)
{
    SizeFree(junk, FPTreeCell)
}

function FPIndexCellAlloc()
{
   return SizeMalloc(FPIndexCell)
}
function FPIndexCellFree(junk)
{
    SizeFree(junk, FPIndexCell)
}

}//CTE_FP_INDEX

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_functypes.h

Author: Stephan Schulz

Contents
 
  Simple, widely used functions for dealing with function symbols and
  operators. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Nov  9 23:09:33 MET 1997
    New

-----------------------------------------------------------------------*/

if(!CTE_FUNCTYPES){

var CTE_FUNCTYPES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Data type repesenting the various types of encodings for function
 * symols (including constants) and predicates. */

function typedef_enum_FuncSymbType()
{
    function obj()
    {
        this.FSNone = 1<<0
        this.FSIdentVar = 1<<1
        this.FSIdentFreeFun = 1<<2
        this.FSIdentInt = 1<<3
        this.FSIdentFloat = 1<<4
        this.FSIdentRational = 1<<5
        this.FSIdentInterpreted = 1<<6
        this.FSIdentObject = 1<<7
    }
    return obj
}
var FuncSymbType = typedef_enum_FuncSymbType()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* Function symbols in terms are represented by positive numbers,
   variables by negative numbers. This alias allows clearer
   specifications. */

function FunCode()
{
   this.value = arguments[0] || 0
}

}//CTE_FUNCTYPES

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_idx_fp.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Compute a fingerprint of a term suitable for fingerprint indexing. A
  fingerprint is a vector of individual samples for positions p, where
  the result is t|p->f_code if p is a position in t, BELOW_VAR
  (=LONG_MIN) if p<=q, t|q=Xn, 0 otherwise.

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Feb 20 19:19:23 EET 2010
    New

-----------------------------------------------------------------------*/

if(!CTE_IDX_FP){

var CTE_IDX_FP = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Fingerprints of n elements are FunCode (long) arrays, with the
 * first element containing the lenghts (inclusive), the others the
 * results of the sampling */

var IndexFP_p = new FunCode();

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var MAX_PM_INDEX_NAME_LEN = 20
var BELOW_VAR = -2
var ANY_VAR = -1
var NOT_IN_TERM = 0

}//CTE_IDX_FP

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_match_mgu_1-1.h

Author: Stephan Schulz

Contents
 
  Interface to simple, non-indexed 1-1 match and unification
  routines on shared terms (and unshared terms with shared
  variables).

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Mar 11 16:17:33 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CTE_MATCH_MGU_1_1){

var CTE_MATCH_MGU_1_1 = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

if(MEASURE_UNIFICATION){
UnifAttempts;
UnifSuccesses;
}

function VerifyMatch(matcher, to_match)
{
   return TermStructEqualDeref((matcher), (to_match), DEREF_ONCE, DEREF_NEVER)
}


}//CTE_MATCH_MGU_1_1

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_replace.h

Author: Stephan Schulz

Contents
 
  Functions for replacing and rewriting of terms.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Jan 12 17:50:21 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CTE_REPLACE){

var CTE_REPLACE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/** Can a term be rewritten, rewritten if not protected, or always
 ** rewritten? */

function typedef_enum_RWResultType()
{
    function obj()
    {
        this.RWNotRewritable = 0
        this.RWLimitedRewritable = 1
        this.RWAlwaysRewritable = 2
    }
    return obj
}
var RWResultType = typedef_enum_RWResultType()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/


}//CTE_REPLACE

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_signature.h

Author: Stephan Schulz

Contents
 
  Definitions for dealing with signatures, i.e. data structures
  storing information about function symbols and their properties. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Sep 18 16:54:31 MET DST 1997
    New

-----------------------------------------------------------------------*/

if(!CTE_SIGNATURE){

var CTE_SIGNATURE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_funcprop()
{
   function obj()
   {
      this.FPIgnoreProps  =    0 /* No properties, mask everything out */
      this.FPPredSymbol   =    1 /* Symbol is a transformed predicate symbol */
      this.FPFuncSymbol   =    2 /* Symbol is a real function symbol */
      /* If neither is set, we don't know it yet */
      this.FPFOFOp        =    4 /* Symbol is encoded first order operator */
      this.FPSpecial      =    8 /* Symbol is a special symbol introduced internally */
      this.FPAssociative  =   16 /* Function symbol is binary and associative */
      this.FPCommutative  =   32 /* Function symbol is binary and commutates */
      this.FPIsAC         =   this.FPAssociative|this.FPCommutative,
      this.FPInterpreted  =   64 /* Interpreted symbol $ident */
      this.FPIsInteger    =  128 /* Sequence of digits, may be semi-interpreted */
      this.FPIsRational   =  256 /* [-]a/b */
      this.FPIsFloat      =  512 /* Floating point number */
      this.FPIsObject     =  1024 /* ""-enclosed string, by definition denotes unique object." */
      this.FPDistinctProp =  this.FPIsObject | this.FPIsInteger | this.FPIsRational | this.FPIsFloat
      this.FPOpFlag       = 2048 /* Used for temporary oerations, by defintion off if not in use! */
      this.FPClSplitDef   = 4096 /* Predicate is a clause split defined symbol. */
      this.FPPseudoPred   = 8192  /* Pseudo-predicate used for side effects only, does not conceptually contribute to truth of clause */
   }
   return obj
}
var FunctionProperties = typedef_enum_funcprop()

/* Keep information about function symbols: Access external name and
   arity (and possibly additional information at a later time) by
   internal numerical code for function symbol. */

function typedef_struct_funccell()
{
    function obj()
    {
        this.name
        this.arity
        this.alpha_rankWesometimesneedanarbitrarybutstable
        this.onsymbolsandusealphabetic
        this.properties = new FunctionProperties()
    }
    return obj
}
var FuncCell = typedef_struct_funccell()
var Func_p = typedef_struct_funccell()

/* A signature contains information about function symbols with
   direct access by internal code (f_info is organized as a array,
   with f_info[f_code] being the information associated with f_code)
   and efficient access by external name (via the f_index array). 

   Function codes are integers starting at 1, while variables are
   encoded by negative integers. 0 is unused and can thus express
   error conditions when accessing some things f_code. f_info[0] is
   unused. */

var DEFAULT_SIGNATURE_SIZE = 20
var DEFAULT_SIGNATURE_GROW = 2

function typedef_struct_sigcell()
{
   function obj()
   {
      this.alpha_ranks_valid; /* The alpha-ranks are up to date */
      this.size;     /* Size of the array */
      this.f_info = new Func_p();   /* The array */
      this.orn_codes = new PDArray_p();
      this.f_index = new StrTree_p();  /* Back-assoc: Given a symbol, get the index */
      this.ac_axioms = new PStack_p(); /* All recognized AC axioms */
      /* The following are special symbols needed for pattern
         manipulation. We want very efficient access to them! Also
         resused in FOF parsing. */
      this.f_count = new FunCode();  /* Largest used f_code */
      this.internal_symbols = new FunCode(); /* Largest auto-inserted internal symbol */
      this.eqn_code = new FunCode();
      this.neqn_code = new FunCode();
      this.cnil_code = new FunCode();

      /* The following is for encoding first order formulae as terms. I
         do like to reuse the robust sharing infrastructure for
         CNFization and formula rewriting (inspired by Tommi Juntilla's
         reuse of the same in MathSAT). */      
      this.not_code = new FunCode();
      this.qex_code = new FunCode();
      this.qall_code = new FunCode();
      this.and_code = new FunCode();
      this.or_code = new FunCode();
      this.impl_code = new FunCode();
      this.equiv_code = new FunCode();
      this.nand_code = new FunCode();
      this.nor_code = new FunCode();
      this.bimpl_code = new FunCode();
      this.xor_code = new FunCode();
      /* And here are codes for interpreted symbols */
      this.answer_code = new FunCode();       /* For answer literals */
      
      /* Counters for generating new symbols */
      this.skolem_count;
      this.newpred_count;
      /* Which properties are used for recognizing implicit distinctness? */
      this.distinct_props = new FunctionProperties ();
   }
   return obj
}
var SigCell = typedef_struct_sigcell()
var Sig_p = typedef_struct_sigcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* Special constant for internal operations */

var SIG_TRUE_CODE = 1
var SIG_FALSE_CODE = 2
var SIG_NIL_CODE = 3
var SIG_CONS_CODE = 4

/* Handle properties */

function FuncSetProp(symb, prop)
{
   return SetProp((symb), (prop))
}
function FuncDelProp(symb, prop)
{
   return DelProp((symb), (prop))
}

/* Are _all_ properties in prop set for symb? */
function FuncQueryProp(symb, prop)
{
   return QueryProp((symb), (prop))
}

/* Are any properties in prop set in term? */
function FuncIsAnyPropSet(symb, prop)
{
   return IsAnyPropSet((symb), (prop))
}

/* With a more convenient external interface: */

function SigSetFuncProp(sig, symb, prop)
{
   return FuncSetProp(sig.f_info[(symb)], (prop))
}

function SigDelFuncProp(sig, symb, prop)
{
   return FuncDelProp(sig.f_info[(symb)], (prop))
}

function SigQueryFuncProp(sig, symb, prop)
{
   return FuncQueryProp(sig.f_info[(symb)], (prop))
}

function SigIsAnyFuncPropSet(sig, symb, prop)
{
   return FuncIsAnyPropSet(sig.f_info[(symb)], (prop))
}

var SigSupportLists /* Auto-Insert special symbols
                     $nil=3, $cons=4 for list
                     representations */
function SigCellAlloc()
{
   return SizeMalloc(SigCell)
}
function SigCellFree(junk)
{
   SizeFree(junk, SigCell)
}

function SigExternalSymbols(sig)
{
   return (sig.f_count-sig.internal_symbols)
}

function SigInterpreteNumbers(sig)
{
   return sig.null_code
}

function SigIsFunConst(sig, f_code)
{
   return ((SigFindArity((sig), (f_code))==0) && 
    (SigIsPredicate((sig),(f_code))))
}
function SigIsSimpleAnswerPred(sig, f_code)
{
   return (f_code==sig.answer_code)
}


/* Special functions for dealing with special symbols */

/*---------------------------------------------------------------------*/
/*                        Inline functions                             */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: SigFindArity()
//
//   Given  signature and a function symbol code, return the arity of
//   the symbol.
//
// Global Variables: -
//
// Side Effects    : Abort if illegal f_code
//
/----------------------------------------------------------------------*/

function SigFindArity( sig,f_code )
{
   console.log(f_code > 0)
   console.log(f_code <= sig.f_count)
   return (sig.f_info[f_code]).arity
}

/*-----------------------------------------------------------------------
//
// Function: SigFindName()
//
//   Given  signature and a function symbol code, return a pointer to
//   the name. This pointer is only valid as long as the signature
//   exists! 
//
// Global Variables: -
//
// Side Effects    : Abort if illegal f_code
//
/----------------------------------------------------------------------*/

function SigFindName( sig,f_code )
{
   console.log(f_code > 0)
   console.log(f_code <= sig.f_count)
   return sig.f_info[f_code].name
}

/*-----------------------------------------------------------------------
//
// Function: SigGetEqnCode()
//
//   Return the FunCode for $eq or $neq, create them if non-existant.
//
// Global Variables: -
//
// Side Effects    : May change sig
//
/----------------------------------------------------------------------*/

function SigGetEqnCode( sig,positive )
{
   console.log(sig)
   if(positive)
   {
      if(sig.eqn_code)
      {
         return sig.eqn_code
      }
      sig.eqn_code = SigInsertId(sig, "$eq", 2, true)
      console.log(sig.eqn_code)
      SigSetPredicate(sig, sig.eqn_code, true)
      return sig.eqn_code
   }
   else
   {
      if(sig.neqn_code)
      {
         return sig.neqn_code
      }
      sig.neqn_code = SigInsertId(sig, "$neq", 2, true)
      console.log(sig.neqn_code)
      SigSetPredicate(sig, sig.neqn_code, true)
      return sig.neqn_code
   }
}

/*-----------------------------------------------------------------------
//
// Function:  SigGetOrCode()
//
//   As above, for $or
//
// Global Variables: -
//
// Side Effects    : May change sig
//
/----------------------------------------------------------------------*/

function SigGetOrCode( sig )
{
   console.log(sig)
   if(sig.or_code)
   {
      return sig.or_code
   }
   sig.or_code = SigInsertId(sig, "$or", 2, true)
   console.log(sig.or_code)
   return sig.or_code
}

/*-----------------------------------------------------------------------
//
// Function:  SigGetCNilCode()
//
//   As above, for $cnil
//
// Global Variables: -
//
// Side Effects    : May change sig
//
/----------------------------------------------------------------------*/

function SigGetCNilCode( sig )
{
   console.log(sig)
   if(sig.cnil_code)
   {
      return sig.cnil_code
   }
   sig.cnil_code = SigInsertId(sig, "$cnil", 0, true)
   console.log(sig.cnil_code)
   return sig.cnil_code
}


}//CTE_SIGNATURE

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_simplesorts.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Data structure and function interfaces for managing simple, disjoint
  sorts.

  Copyright 2007 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Sep 15 01:33:52 EDT 2007
    New

-----------------------------------------------------------------------*/

if(!CTE_SIMPLESORTS){

var CTE_SIMPLESORTS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Build-in sorts for the many-sorted logic E is being moved to. Note
if( sorts are)
 * inserted in a specific order. */

function typedef_enum_SortType()
{
    function obj()
    {
        this.STNoSort = 0
        this.STBool = 1<<1
        this.STIndividuals = 1<<2
        this.STInteger = 1<<3
        this.STReal = 1<<4
    }
    return obj
}
var SortType = typedef_enum_SortType()

/* Datatype for representing the sort system. Currenlty associates
 * sort types with encodings and tracks the default sort. */

function typedef_struct_sort_table()
{
    function obj()
    {
        this.default_type = new SortType()
        this.sort_index = new StrTree_p()
        this.back_index = new PStack_p()
    }
    return obj
}
var SortTableCell = typedef_struct_sort_table()
var SortTable_p = typedef_struct_sort_table()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function SortTableCellAlloc()
{
   return SizeMalloc(SortTableCell)
}
function SortTableCellFree(junk) 
{
   SizeFree(junk, SortTableCell)
}


}//CTE_SIMPLESORTS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_subst.h

Author: Stephan Schulz

Contents
 
  Definitions for substitutions. Substitutions are really represented
  by term cells with bindings. The substitution type is only a
  disguised stack keeping track of the bound variables for
  backtracking.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Mar  5 00:22:28 MET 1998
    New

-----------------------------------------------------------------------*/

if(!CTE_SUBST){

var CTE_SUBST = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var SubstCell = new PStackCell()
var Subst_p = new PStack_p()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function SubstAlloc()
{
   return PStackAlloc()
}
function SubstFree(junk) 
{
   PStackFree(junk)
}

function SubstIsEmpty(subst)
{
   return PStackEmpty(subst)
}


}//CTE_SUBST

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_termbanks.h

Author: Stephan Schulz

Contents
 
Definitions for term banks - i.e. shared representations of terms as
  if( in cte_terms.h. Uses the same struct, but adds)
  administrative stuff and functionality for sharing.

There are two sets of funktions for the manangment of term trees:
  Funktions operating only on the top cell, and functions descending
  the term structure. Top level functions implement a conventional splay
  tree with key f_code.masked_properties.entry_nos_of_args and are
  implemented in cte_termtrees.[ch]

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Sep 22 00:15:39 MET DST 1997
    New
<2> Wed Feb 25 18:16:34 MET 1998
    Adapted for use of new term modules with shared variables
<3> Sat Apr  6 21:42:35 CEST 2002
    Changed for new rewriting

-----------------------------------------------------------------------*/

if(!CTE_TERMBANKS){

var CTE_TERMBANKS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function tbcell()
{
   function obj()
   {
      this.in_count       /* How many terms have been inserted? */
         /* Associate _external_ abbreviations (=
           entry_no's with term nodes, necessary
           for parsing of term bank terms. For
           critical cases (full protocolls) this
               is bound to be densly poulated -> we
           use an array. Please note that term
           replacing does not invalidate entries
           in ext_index
           (it would be pretty expensive in
           terms of time and memory), so higher
           layers have to take care of this if
           they want to both access terms via
           references and do replacing! */
      this.ext_index = new PDArray_p()
         /* For the mark-and sweep garbage
           collection. This is flipped at
           each sweep, and all new term cell
           get the new value, so that marking
           can be done by flipping in the
           term cell. */
      this.garbage_state = new TermProperties()
      this.sig = new Sig_p()              /* Store sig info */
      this.vars = new VarBank_p()          /* Information about (shared) variables */
      this.true_term = new Term_p ()       /* Pointer to the special term with the $true constant. */
      this.false_term = new Term_p ()      /* Pointer to the special term with the $false constant. */
      this.min_term = new Term_p ()        /* A small (ideally the minimal possible) term, to be used for RHS instantiation. */
      this.rewrite_steps;  /* How many calls to TBTermReplace? */
      this.term_store = new TermCellStoreCell () /* Here are the terms */
         /* Higher level code can register
          * garbage collection information
          * here. This is only a convenience
          * link, memory needs to be managed
          * elsewhere. */
      this.gc = new gc_admin_cell()
   }
   return obj
}
var TBCell = tbcell()
var TB_p = tbcell()

   

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function TBCellAlloc()
{
   return SizeMalloc(TBCell)
}
function TBCellFree(junk)
{
   SizeFree(junk, TBCell)
}

function TBNonVarTermNodes(bank) 
{
   return TermCellStoreNodes(bank.term_store)
}
function TBStorage(bank)
{
   return (TERMCELL_DYN_MEM*bank.term_store.entries+bank.term_store.arg_count*TERMP_MEM)
}

function TBCellIdent(term)
{
   return TermIsVar(term)?term.f_code:term.entry_no
}

function TermIsTrueTerm(term)
{
   return term.f_code==SIG_TRUE_CODE
}

function TBTermIsSubterm(sup, term)
{
   return TermIsSubterm((sup),(term),DEREF_NEVER,TBTermEqual)
}

function TBTermIsTypeTerm(term)
{
   return (term.weight==(DEFAULT_VWEIGHT+DEFAULT_FWEIGHT))
}

function TBTermIsXTypeTerm(term)
{
   return (term.arity && (term.weight==(DEFAULT_FWEIGHT+term.arity*DEFAULT_VWEIGHT)))
}

function TBTermIsGround(t)
{
   return TermCellQueryProp(t, TPIsGround)
}

function TBPrintTermFull(out, bank, term)
{
   return TermPrint((out), (term), bank.sig, DEREF_NEVER)
}

function TBTermParse(_in_, bank)
{
    return TBTermParseReal((_in_),(bank), true)
}
function TBRawTermParse(_in_, bank) 
{
   return TBTermParseReal((_in_),(bank), false)
}

function TBTermCellIsMarked(bank, term)
{
   return (GiveProps((term),TPGarbageFlag)!=bank.garbage_state)
}

/*---------------------------------------------------------------------*/
/*                Inline Functions                                     */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function:  TBTermEqual()
//
//   Test wether two shared terms in the same termbank are the
//   same. This is a simple pointer comparison, this function only
//   exists so that it can be passed as a function pointer.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function TBTermEqual(t1, t2)
{
   return (t1==t2);
}


}//CTE_TERMBANKS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_termcellstore.h

Author: Stephan Schulz

Contents
 
  Abstract interface for storing term cells, implemented by a
  combination of a hashed array and term cell trees. Use
  (term->f_code^term->args[1])&TERM_STORE_HASH_MASK  as
  hash if args != NULL, otherwise use
  term->f_code&TERM_STORE_HASH_MASK.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Oct  5 01:09:50 MEST 1998
    New
<2> Thu Apr 11 10:08:26 CEST 2002
    Support for mark-and-sweep garbage collection (the sweep pass) for
    term cells

-----------------------------------------------------------------------*/

if(!CTE_TERMCELLSTORE){

var CTE_TERMCELLSTORE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var TERM_STORE_HASH_SIZE = (8192*4)
var TERM_STORE_HASH_MASK = (TERM_STORE_HASH_SIZE-1)

function typedef_struct_termcellstore()
{
    function obj()
    {
        this.entries
        this.arg_count
        this.store = new Term_p(TERM_STORE_HASH_SIZE)
    }
    return obj
}
var TermCellStoreCell = typedef_struct_termcellstore()
var TermCellStore_p = typedef_struct_termcellstore()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function tcs_arity0hash(term)
{
   return term.f_code
}
function tcs_arity1hash(term)
{
   return tcs_arity0hash(term)^(ptr_int.term.args[0]>>3)
}
function tcs_aritynhash(term)
{
   return tcs_arity1hash(term)^(ptr_int.term.args[1]>>4)
}

function TermCellHash(term)
{
   return (((term.arity == 0)?tcs_arity0hash(term):((term.arity == 1)?tcs_arity1hash(term):tcs_aritynhash(term)))&TERM_STORE_HASH_MASK)
}

function TermCellStoreNodes(store)
{
   return store.entries
}

}//CTE_TERMCELLSTORE

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_termcpos.h

Author: Stephan Schulz (schulz@eprover.org)

Contents

  Functions dealing with compact term positions represented by simple
  integers. Subterms are numbered in standard left-right pre-order,
  with the root position at 0.

  Copyright 2006 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Nov 12 14:18:49 ICT 2006
    New

-----------------------------------------------------------------------*/

if(!CTE_TERMCPOS){

var CTE_TERMCPOS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function TermCPos()
{
   this.value = arguments[0] || 0
}

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function TermCPosIsTopPos(pos)
{
   return (pos==0)
}

}//CTE_TERMCPOS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_termfunc.h

Author: Stephan Schulz

Contents
 
  Most of the user-level functionality for unshared terms.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Feb 25 16:50:36 MET 1998
    Ripped from cte_terms.h (should be obsolete by now)

-----------------------------------------------------------------------*/

if(!CTE_TERMFUNC){

var CTE_TERMFUNC = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var TermPrintLists /* Using [...] notation */

function TermStartToken(SigSupportLists,FuncSymbStartToken)
{
   return SigSupportLists ? (FuncSymbStartToken.value|g_token.OpenSquare|g_token.Mult):(FuncSymbStartToken.value|g_token.Mult);
}

function TermIsStructSubterm(sup, term)
{
   return TermIsSubterm((sup),(term),DEREF_ALWAYS,TermStructEqual)
}

function TermStandardWeight(term)
{
   return TermIsShared(term)? term.weight:TermWeight((term),DEFAULT_VWEIGHT,DEFAULT_FWEIGHT)
}

function TermIsGround(term)
{
   return !TermHasVariables((term), false)
}
function TermHasUnboundVariables(term) 
{
   return TermHasVariables((term), true)
}

function TermAddSymbolDistribution(term, dist_array)
{
   return TermAddSymbolDistributionLimited((term),(dist_array), LONG_MAX)
}

function TermCollectVariables(term,tree)
{
   return TermCollectPropVariables((term), (tree), TPIgnoreProps)
}

}//CTE_TERMFUNC

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_termpos.h

Author: Stephan Schulz

Contents
 
  Positions in terms.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun May 10 17:37:08 MET DST 1998
    Lifted from cte_rewrite.h (now moved to cte_replace.h)

-----------------------------------------------------------------------*/

if(!CTE_TERMPOS){

var CTE_TERMPOS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Positions in terms are described by a stack containing term
   pointers and indices of principal subterms, to be read from the
   lowest stack address (address of the top term) to the highest
   address (index of the selected subterm in its direct
   superterm). The selected subterm is not contained directly in the
   stack. The empty stack corresponds to the empty position.
   
   Example: t = f(a,g(b))

   The position of b is represented by the following stack (where @s =
   address of s, stacks grow downwards):

   @f(a,g(b))
   2
   @g(b)
   1

   Term positions are really PStacks, they are only redefined for
   better readability. In particular, functions dealing with TermPos
   types are allowed and expected to use PStack-Operations on them. */
   

var TermPosCell = new PStackCell()
var TermPos_p = new PStack_p()

/* How many stack elements does a single position component  take */

var TERM_POS_ELEMENT_SIZE = 2

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function TermPosAlloc()
{
   return PStackAlloc()
}
function TermPosFree(junk)
{
   PStackFree(junk)
}

function TermPosIsTopPos(pos)
{
   return PStackEmpty(pos)
}

/*---------------------------------------------------------------------*/
/*                  Inline Functions                                   */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: TermPosGetSubterm()
//
//   Given a term and a position, return the denoted subterm.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function TermPosGetSubterm( term,pos )
{
   var sup = new Term_p()
   var idx
   console.log(term)
   if(PStackEmpty(pos))
   {
      return term
   }
   console.log(PStackGetSP(pos)>=2)
   
   idx = PStackTopInt(pos)
   sup = PStackBelowTopP(pos)
   
   console.log(sup.arity>idx)
   
   return sup.args[idx]
}

/*-----------------------------------------------------------------------
//
// Function: TermPosFirstLIPosition()
//
//   Return the first subterm of term in leftmost-innermost order
//   and make pos the corresponding position.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function TermPosFirstLIPosition( term,pos )
{
   pos = PStackReset(pos)
   while(term.arity)
   {
      pos = PStackPushP(pos, term)
      pos = PStackPushInt(pos, 0)
      term = term.args[0]
   }
   return { term:term, pos:pos }
}

}//CTE_TERMPOS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_termtrees.h

Author: Stephan Schulz

Contents

  Functionality of term-top indexed trees (I found that I can
  cleanly separate this from the termbank stuff).
  
  There are two sets of funktions for the manangment of term trees in
  CLIB: Funktions operating only on the top cell, and functions descending
  the term structure. Top level functions implement a conventional AVL
  tree with key f_code.masked_properties.entry_nos_of_args and are
  implemented here, recursive versions are in cte_termbanks.[hc]

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Nov 27 19:12:51 MET 1997
    New
<2> Thu Jan 28 00:59:59 MET 1999
    Replaced AVL trees with Splay-Trees

-----------------------------------------------------------------------*/

if(!CTE_TERMTREES){

CTE_TERMTREES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function TermTreeTraverseExit(stack)
{
   return PStackFree(stack)
}

}//CTE_TERMTREES

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_termtypes.h

Author: Stephan Schulz

Contents
 
  Declarations for the basic term type and primitive functions, mainly
  on single term cells. This module mostly provides only
  infrastructure for higher level modules.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Feb 24 01:23:24 MET 1998
    Ripped out of the now obsolete cte_terms.h
<2> Thu Mar 28 21:40:52 CEST 2002
    Started to implement new rewriting

-----------------------------------------------------------------------*/

if(!CTE_TERMTYPES){

CTE_TERMTYPES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var DEFAULT_VWEIGHT = 1  /* This has to be an integer > 0! */
var DEFAULT_FWEIGHT = 2  /* This has to be >= DEFAULT_VWEIGHT */

/* POWNRS = Probably obsolete with new rewriting scheme */

function typedef_enum_termproperties()
{
   function obj()
   {
      this.TPIgnoreProps      =      0 /* For masking properties out */
      this.TPRestricted       =      1 /* Rewriting is restricted on this term */
      this.TPTopPos           =      2 /* This cell is a entry point */
      this.TPIsGround         =      4 /* Shared term is ground */
      this.TPPredPos          =      8 /* This is an original predicate position morphed into a term */
      this.TPIsRewritable     =     16 /* Term is known to be rewritable with
                                           respect to a current rule or rule
                                           set. Used for removing
                                           backward-rewritable clauses. Absence of
                                           this flag does not mean that the term
                                           is in any kind of normal form! POWNRS */
      this.TPIsRRewritable    =     32 /* Term is rewritable even if
                                           rewriting is restricted to proper
                                           instances at the top level.*/
      this.TPIsSOSRewritten   =     64 /* Term has been rewritten with a SoS clause (at top level) */
      this.TPSpecialFlag      =    128 /* For internal use with normalizing variables*/
      this.TPOpFlag           =    256 /* For internal use */
      this.TPCheckFlag        =    512 /* For internal use */
      this.TPOuthis.TPutFlag  =   1024 /* Has this term already been printed (and thus defined)? */
      this.TPIsSpecialVar     =   2048 /* Is this a meta-variable generated by term top operations and the like? */
      this.TPIsRewritten      =   4096 /* Term has been rewritten (for the new rewriting scheme) */ 
      this.TPIsRRewritten     =   8192 /* Term has been rewritten at a subterm position or with a real instance (for the new rewriting scheme) */ 
      this.TPIsShared         =  16384 /* Term is in a term bank */
      this.TPGarbageFlag      =  32768 /* For the term bank garbage collection */
      this.TPIsFreeVar        =  65536 /* For Skolemization */
      this.TPPotentialParamod = 131072 /* This position needs to be tried for paramodulation */
      this.TPPosPolarity      = 1<<18  /* In the term encoding of a formula, this occurs with positive polarity. */
      this.TPNegPolarity      = 1<<19  /* In the term encoding of a formula, this occurs with negative polarity. */
  }
  return obj
}
var TermProperties = termproperties()

function typedef_enum_RewriteLevel()
{
    function obj()
    {
        this.NoRewrite = 0
        this.RuleRewrite = 1
        this.FullRewrite = 2
    }
    return obj
}
var RewriteLevel = typedef_enum_RewriteLevel()


function typedef_struct_rewritestate()
{
   function obj()
   {
         /* If term is not rewritten,
            it is in normal form with
            respect to the
            demodulators at this date */
      this.nf_date = new SysDate(RewriteLevel.FullRewrite); 
         /* ...otherwise, it has been rewritten to this term */
      this.rw_desc = {
         replace: new termcell(),
         //demod_id:0 /* 0 means subterm! */
         demod: clause_cell() /* NULL means subterm! */
      }
   }
   return obj
}
var RewriteState = typedef_struct_rewritestate()

function typedef_struct_termcell()
{
    function obj()
    {
        this.properties = new TermProperties()
        this.f_code = new FunCode()
        this.arityRedundantbutsaveshanding
        this.thesignatureallthe
        this.undefined
        this.termcellargs
        this.termcellbindingForvariablebindings
        this.fortemporary
        this.itmightbepossible
        this.combinetheprevioustwoina
        this.undefined
        this.longentry_noCounterfortermsinagiven
        this.neededfor
        this.andexternal
        this.undefined
        this.weightWeightofthetermiftermis
        this.termbank
        this.rw_data = new RewriteState()
        this.termcelllson
        this.termcellrsonasplaytreesee
        this.ch
    }
    return obj
}
var TermCell = typedef_struct_termcell()
var Term_p = typedef_struct_termcell()
var TermRef = typedef_struct_termcell()

function typedef_DerefType(){
   this.value = arguments[0] || 0
}
var DerefType = new typedef_DerefType() 
var DerefType_p = new typedef_DerefType()

var DEREF_ALWAYS = -1
var DEREF_NEVER = 0
var DEREF_ONCE = 1

/* The following is an estimate for the memory taken up by a term cell
   with arguments (the argument array is not counted separately). */

if(CONSTANT_MEM_ESTIMATE){
var TERMCELL_MEM = 48
var TERMARG_MEM = 4
var TERMP_MEM = 4
} else {
TERMCELL_MEM = function() { return MEMSIZE(TermCell) }
TERMARG_MEM = function() {  return 1024 }
TERMP_MEM = function(){ return 2048 }
}

var TERMCELL_DYN_MEM = (TERMCELL_MEM+4*TERMARG_MEM)

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* Functions which take two terms and return a boolean, i.e. test for
   equality */

var TERMS_INITIAL_ARGS = 10

function RewriteAdr(level)
{
   return (level && (level-1))
}
function TermIsVar(t)
{
   return (t.f_code < 0)
}
function TermIsConst(t)
{
   return (!TermIsVar(t) && (t.arity==0))
}

function TermCellSetProp(term, prop)
{
   return SetProp((term), (prop))
}
function TermCellDelProp(term, prop){
   return DelProp((term), (prop))
}
function TermCellAssignProp(term, sel, prop)
{
   return AssignProp((term),(sel),(prop))
}
/* Are _all_ properties in prop set in term? */
function TermCellQueryProp(term, prop)
{
   return QueryProp((term), (prop))
}

/* Are any properties in prop set in term? */
function TermCellIsAnyPropSet(term, prop)
{
   return IsAnyPropSet((term), (prop))
}

function TermCellGiveProps(term, props)
{
   return GiveProps((term),(props))
}
function TermCellFlipProp(term, props)
{
   return FlipProp((term),(props))
}

function TermCellAlloc()
{
   return SizeMalloc(TermCell)
}
function TermCellFree(junk)
{
   SizeFree(junk, TermCell)
}
function TermArgArrayAlloc(arity)
{
   return SizeMalloc(Term_p)
}
function TermArgArrayFree(junk, arity)
{
   SizeFree(junk,Term_p)
}

function TermIsRewritten(term)
{
   return TermCellQueryProp((term), TermProperties.TPIsRewritten)
}
function TermIsRRewritten(term)
{
   return TermCellQueryProp((term), TermProperties.TPIsRRewritten)
}
function TermIsTopRewritten(term)
{
   return TermIsRewritten(term)&&TermRWDemodField(term)
}
function TermIsShared(term)
{
   return TermCellQueryProp((term), TermProperties.TPIsShared)
}

function TermNFDate(term,i)
{
   return TermIsRewritten(term) ? SysDateCreationTime():term.rw_data.nf_date[i]
}

/* Absolutely get the value of the replace and demod fields */
function TermRWReplaceField(term)
{
   return term.rw_data.rw_desc.replace
}
function TermRWDemodField(term)
{
   return term.rw_data.rw_desc.demod
}
var REWRITE_AT_SUBTERM = 0

/* Get the logical value of the replaced term / demodulator */
function TermRWReplace(term)
{
   return TermIsRewritten(term)?TermRWTargetField(term):NULL
}
function TermRWDemod(term)
{
   return TermIsRewritten(term)?TermRWDemodField(term):NULL
}


if(!__cplusplus){

}

/*---------------------------------------------------------------------*/
/*                  Inline functions                                   */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: TermDeref()
//
//   Dereference a term. deref* tells us how many derefences to do
//   at most, it will be decremented for each dereferenciation.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function TermDeref( term,deref )
{
   console.log(TermIsVar(term)||!(term.binding))
   if(deref == DEREF_ALWAYS)
   {
      while(term.binding)
      {
         term = term.binding
      }
   }
   else
   {
      while(deref)
      {
         if(!term.binding)
         {
            break
         }
         term = term.binding
         deref--
      }
   }
   return term
}

/*-----------------------------------------------------------------------
//
// Function: TermArgListCopy()
//
//   Return a copy of the argument array of source.
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function TermArgListCopy(source)
{
   var handle = new Term_p()
   
   if(source.arity)
   {
      handle = TermArgArrayAlloc(source.arity);
      for(var i=0; i<source.arity; i++)
      {
         handle[i] = source.args[i];
      }
   }
   else
   {
      handle = NULL;
   }
   return handle;
}

if(!__cplusplus){

/* This function is only needed in the core E libraries (but in many
 * of those), and not in the C++ code of (some) programs that link to
 * E. It contains C++-unfriendly code, so it's just ignored in this
 * case. */

/*-----------------------------------------------------------------------
//
// Function: TermTopCopy()
//
//   Return a copy of the term node (and potential argument
//   pointers). Only the top node and the pointers are duplicated, the
//   arguments are shared between source and copy. As this function
//   operates on nodes, it does not follow bindings! Administrative
//   stuff (refs etc. will, of course, not be copied but initialized
//   to rational values for an unshared 
//   term).
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function TermTopCopy( source )
{
   var handle = new Term_p()
   
   handle = TermDefaultCellAlloc()
   handle.properties = source.properties&TermProperties.TPPredPos 
   handle = TermCellDelProp(handle, TPOutputFlag); 
   handle.f_code = source.f_code
   handle.arity  = source.arity
   handle.binding = NULL
   handle.args = TermArgListCopy(source)
   handle.lson = NULL
   handle.rson = NULL
   
   return handle
}

}

}//CTE_TERMTYPES

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_termvars.h

Author: Stephan Schulz

Contents
 
  Functions for the management of shared variables.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Feb 24 15:52:12 MET 1998
    Rehacked with parts from the now obsolete cte_vartrans.h

-----------------------------------------------------------------------*/

if(!CTE_TERMVARS){

CTE_TERMVARS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Variable banks store information about variables. They contain two
   indices, one associating an external variable name with an internal
   term cell (and f_code, just because a StrTree can store two data
   items...), and one associating an f_code with a term cell. The first
   index is used for parsing and may be incomplete (i.e. not all
   variable cells will be indexed by a string), the second index
   should be complete (i.e. all variable cells have an entry in the
   array). */

function typedef_struct_varbankcell()
{
    function obj()
    {
        this.v_count = new FunCode()
        this.max_var = new FunCode()
        this.ext_index = new StrTree_p()
        this.f_code_index = new PDArray_p()
    }
    return obj
}
var VarBankCell = typedef_struct_varbankcell()
var VarBank_p = typedef_struct_varbankcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var DEFAULT_VARBANK_SIZE = 30

/* Variables greater than this are reserved for fresh variables. At
   the moment this is only used for term pattern generation and term
   top computing in the learning modules */
var FRESH_VAR_LIMIT = 1024 

function VarBankCellAlloc()
{
   return SizeMalloc(VarBankCell)
}
function VarBankCellFree(junk)
{
   SizeFree(junk, VarBankCell)
}

function VarBankGetVCount(bank)
{
   return bank.v_count
}
function VarBankSetVCount(bank,count)
{
   return bank.v_count = (count)
}
function VarBankResetVCount(bank)
{
   return bank.v_count = 0
}
function VarIsFreshVar(v)
{
   return (v.f_code <= -FRESH_VAR_LIMIT)
}
function VarFCodeIsFresh(f_code)
{
   return (f_code <= -FRESH_VAR_LIMIT)
}

}//CTE_TERMVARS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cte_varhash.h

Author: Stephan Schulz

Contents
 
  Data structures for hashing and traversing variable occurences.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jul 22 04:53:43 MET DST 1998
    New
<2> Sun Jul 13 02:33:42 CEST 2003
    Added code for using PDArrays instead of slow and complicated
    VarHashes...I'm reasonably stupid on occasion.

-----------------------------------------------------------------------*/

if(!CTE_VARHASH){

CTE_VARHASH = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* We sometimes need to collect sets of variables and information
   about them, e.g. in checking the KBO variable condition. For small
   sets (e.g. variables in a term), this can be done rather
   efficiently in a hash. 
   
   BUGFIX:
      SYMP: *** error *** - VarHashEntryCell undefined
      SOLU: 
   
   */

var VAR_HASH_SIZE = 16 /* 2^n */
var VAR_HASH_MASK = (VAR_HASH_SIZE - 1)

function typedef_struct_var_hash_entry_cell()
{
    function obj()
    {
        this.key = new Term_p()
        this.val
        this.var_hash_entry_cellnext
    }
    return obj
}
var VarHashEntryCell = typedef_struct_var_hash_entry_cell()
var VarHashEntry_p = typedef_struct_var_hash_entry_cell()

function typedef_struct_var_hash_cell()
{
    function obj()
    {
        this.hash = new VarHashEntry_p(VAR_HASH_SIZE)
    }
    return obj
}
var VarHashCell = typedef_struct_var_hash_cell()
var VarHash_p = typedef_struct_var_hash_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function VarHashEntryCellAlloc()
{
   return SizeMalloc(VarHashEntryCell)
}

function VarHashEntryCellFree(junk)
{
   SizeFree(junk, VarHashEntryCell)
}

function VarHashCellAlloc()
{
   return SizeMalloc(VarHashCell)
}

function VarHashCellFree(junk)
{
   SizeFree(junk, VarHashCell)
}

/*---------------------------------------------------------------------*/
/*                 Inline Functions                                    */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: VarHashEntryAlloc()
//
//   Allocate an initialized hash entry cell.
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function VarHashEntryAlloc( key,value )
{
   var handle = new VarHashEntry_p()
   handle = VarHashEntryCellAlloc(handle)
   handle.key = key
   handle.val = value
   handle.next = NULL
   
   return handle
}

/*-----------------------------------------------------------------------
//
// Function: VarHashAlloc()
//
//   Allocate an initialized variable hash.
//
// Global Variables: -
//
// Side Effects    : Memory operations
//
/----------------------------------------------------------------------*/

function VarHashAlloc()
{
   var handle = new VarHash_p()
   
   handle = VarHashCellAlloc(handle)
   for(var i=0; i<VAR_HASH_SIZE; i++)
   {
      handle.hash[i] = NULL
   }
   return handle
}

/*-----------------------------------------------------------------------
//
// Function: VarHashFind()
//
//   Return the entry for var in hash (NULL if non-existant).
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function VarHashFind( hash,v)
{
   var i = VarHashFunction(v)
   return VarHashListFind(hash.hash[i], v)
}

}//CTE_VARHASH

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cto_cmpcache.h

Author: Stephan Schulz

Contents

  Cache structure for the local caching of ordering results for LPO
  (and potentially RPO and other mainly recursive orderings). 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Dec 25 00:50:42 MET 1999
    New

-----------------------------------------------------------------------*/

if(!CTO_CMPCACHE){

CTO_CMPCACHE = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Compare results are organized as a quadtree, indexed by terms and
   deref-counters. Keys are always ordered (smaller key first) to
   allow retrieval of symmetric comparisons. We do not use a hash
   table to keep the fixed overhead for easy comparisons small. */

function QuadTree_p()
{
   this.value = arguments[0] || 0
}
var CmpCache_p = new QuadTree();

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function CmpCacheInit(cache)
{
   console.log(!cache)
   return NULL // (cache)=NULL
}

}//CTO_CMPCACHE

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cto_kbodata.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Data structure for storing information about KBO for the linear time 
  KBO implementation described in [Loechner:JAR-2006]. This is a
  mixture of KBO4, KBO5 and KBO6 - because E's data structures are
  variable-normalized, the initialization/reset optimizations cannot,
  in most cases pay off and are omitted.

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Feb 13 19:15:01 EET 2010
    New

-----------------------------------------------------------------------*/

if(!CTO_KBODATA){

CTO_KBODATA = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_kbo_lin_cell()
{
    function obj()
    {
        this.wb
        this.vb = new PDArray_p()
        this.max_var = new FunCode()
        this.pos_bal
        this.neg_bal
        this.res = new CompareResult()
    }
    return obj
}
var KBOLinCell = typedef_struct_kbo_lin_cell()
var KBOLin_p = typedef_struct_kbo_lin_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function KBOLinCellAlloc()
{
   return SizeMalloc(KBOLinCell)
}
function KBOLinCellFree(junk)
{
   SizeFree(junk, KBOLinCell)
}

}//CTO_KBODATA

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cto_kbo.h

Author: Stephan Schulz

Contents
 
  Definitions for implementing a Knuth-Bendix ordering.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu May 28 12:14:31 MET DST 1998
    New
<2> Mon Jul 13 19:16:03 MET DST 1998
    Changed checking of the variable condition - StS
<3> Fri Aug 17 00:25:01 CEST 2001
    Removed obsolete old code for KBO1, renamed everything

-----------------------------------------------------------------------*/

if(!CTO_KBO){

CTO_KBO = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}//CTO_KBO

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cto_kbolin.h

Author: Stephan Schulz

Contents
 
  Definitions for implementing a linear time implementation of the
  Knuth-Bendix ordering. The implementation is based in the ideas
  presented in [Loechner:JAR-2006] (Bernd Loechner, "Things to Know
  when Implementing KBO", JAR 36(4):289-310, 2006.

  Copyright 2010 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Feb 15 14:41:04 EET 2010
    New (from cto_kbo.h)

-----------------------------------------------------------------------*/

if(!CTO_KBOLIN){

CTO_KBOLIN = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}//CTO_KBOLIN

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cto_lpo.h

Author: Joachim Steinbach

Contents
 
  Definitions for implementing a lexicographic path ordering.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu May 28 12:14:31 MET DST 1998
    New
<2> Tue Sep 15 08:50:54 MET DST 1998
    Changed

-----------------------------------------------------------------------*/

if(!CTO_LPO_DEBUG){

CTO_LPO_DEBUG = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}//CTO_LPO_DEBUG

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/
/*-----------------------------------------------------------------------

File  : cto_lpo.h

Author: Stephan Schulz and Joachim Steinbach

Contents
 
  Definitions for implementing a lexicographic path ordering.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu May 28 12:14:31 MET DST 1998
    New
<2> Tue Sep 15 08:50:54 MET DST 1998
    Changed

-----------------------------------------------------------------------*/

if(!CTO_LPO){

CTO_LPO = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var LPORecursionDepthLimit


}//CTO_LPO

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/
/*-----------------------------------------------------------------------

File  : cto_ocb.h

Author: Stephan Schulz

Contents
 
  Global definitions for orderings: Comparison results, precedences,
  order control blocks.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Apr 29 02:51:28 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CTO_OCB){

CTO_OCB = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_TermOrdering()
{
    function obj()
    {
        this.NoOrdering = 1<<0
        this.AUTO = 1<<1
        this.AUTOCASC = 1<<2
        this.AUTODEV = 1<<3
        this.AUTOSCHED0 = 1<<4
        this.AUTOSCHED1 = 1<<5
        this.AUTOSCHED2 = 1<<6
        this.AUTOSCHED3 = 1<<7
        this.AUTOSCHED4 = 1<<8
        this.OPTIMIZE_AX = 1<<9
        this.KBO = 1<<10
        this.KBO6 = 1<<11
        this.LPO = 1<<12
        this.LPOCopy = 1<<13
        this.LPO4 = 1<<14
        this.LPO4Copy = 1<<15
        this.RPO = 1<<16
        this.EMPTY = 1<<17
    }
    return obj
}
var TermOrdering = typedef_enum_TermOrdering()

function typedef_struct_ocb_cell()
{
   function obj()
   {
      this.type = new TermOrdering()
      this.sig = new Sig_p()
      this.min_constant = new FunCode()
      this.sig_size
      this.weights
      this.var_weight
      this.prec_weights
      this.precedence = new CompareResult()
      this.no_lit_cmp
      this.statestack = new PStack_p()
      this.kbobalance = new KBOLin_p()
   }
    return obj
}
var OCBCell = typedef_struct_ocb_cell()
var OCB_p = typedef_struct_ocb_cell()

var OCB_FUN_DEFAULT_WEIGHT = 1

/* Default weight for symbols not treated in a special way, also used
   as multiplier for other generated weights. */

var W_DEFAULT_WEIGHT = 1

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function OCBCellAlloc()
{
   return SizeMalloc(OCBCell)
}
function OCBCellFree(junk)
{
    SizeFree(junk, OCBCell)
}

/* Symbolic representation of ordering relations */

function OCBPrecedenceGetState(ocb)
{
   return PStackGetSP(ocb.statestack)
}

/* Getting the addresses of OCB entries for modification */

/*
function OCBFunWeightPos(ocb, f)
{
   return               (assert((f)>0), assert((f)<=ocb.sig_size), &(ocb.weights[(f)-1])
}

function OCBFunComparePos(ocb, f1, f2)
{
   return               (assert((f1)>0), assert((f2)>0), assert((f1)<=ocb.sig_size),(	       assert((f2)<=ocb.sig_size),(              (&(ocb.precedence[((f2)-1)*ocb.sig_size+((f1)-1)]))
}

*/

function OCBFunWeightPos(ocb, f) 
{
    return ocb.weights[(f)-1]
}
function OCBFunComparePos(ocb, f1, f2)
{
   return (ocb.precedence[((f2)-1)*ocb.sig_size+((f1)-1)])
}

function OCBDesignatedMinConst(ocb)
{
   return ocb.min_constant?ocb.min_constant:OCBFindMinConst(ocb)
}

function OCBDesignatedMinTerm(ocb, terms)
{
   return terms.min_term?terms.min_term:TBCreateMinTerm(terms,OCBDesignatedMinConst(ocb))
}

/* Functions for Querying the OCB */

/*---------------------------------------------------------------------*/
/*                        Inline Functions                             */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
//
// Function: OCBFunWeight()
//
//   Return the weight of f in ocb. For symbols entered in the OCB
//   after creation return OCB_FUN_DEFAULT_WEIGHT.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function OCBFunWeight( ocb,f )
{
    var result = OCB_FUN_DEFAULT_WEIGHT
    if(f<=ocb.sig_size)
    {
      result = OCBFunWeightPos(ocb, f)
    }
    return result
}

/*-----------------------------------------------------------------------
//
// Function: OCBFunCompare()
//
//   Return comparison result of two symbols in precedence. Symbols
//   not covered by the ocb are smaller than all others (except for
//   $true), and older symbols are smaller than new ones.
//
// Global Variables: -
//
// Side Effects    : -
//
/----------------------------------------------------------------------*/

function OCBFunCompare( ocb,f1,f2)
{   
    var tmp
    console.log(f1>0)(f2>0)
    if(f1==f2)
    {
      return to_equal
    }
    if(f1==SIG_TRUE_CODE)
    {
      return to_lesser
    }
    if(f2==SIG_TRUE_CODE)
    {
      return to_greater
    }
    tmp = SigIsAnyFuncPropSet(ocb.sig, f2, ocb.sig.distinct_props)-
      SigIsAnyFuncPropSet(ocb.sig, f1, ocb.sig.distinct_props);   
    if(tmp)
    {
      
      return Q_TO_PART(tmp)
    }
    if(ocb.prec_weights)
    {
        var w1,w2
      
        if(f1<=ocb.sig_size)
        {
        w1 = ocb.prec_weights[f1]
        }
        else 
        {
        w1 = -f1
        }
        if(f2<=ocb.sig_size)
        {
        w2 = ocb.prec_weights[f2]
        }
        else 
        {
        w2 = -f2
        }
        return Q_TO_PART(w1-w2)
    }
    return OCBFunCompareMatrix(ocb, f1, f2)
}

}//CTO_OCB

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : cto_orderings.h

Author: Stephan Schulz

Contents
 
  Generic Interface to the term comparison routines.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon May  4 23:24:41 MET DST 1998
    New

-----------------------------------------------------------------------*/

if(!CTO_ORDERINGS){

CTO_ORDERINGS = 1

/*  */

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}//CTO_ORDERINGS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/
/*-----------------------------------------------------------------------

File  : e_version.h

Author: Stephan Schulz (schulz@eprover.org)

Contents
 
  Define global macro for version number and meta-information. 

  Copyright 2009-2012 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Feb 24 00:26:41 CET 2009
    New

-----------------------------------------------------------------------*/

if(!E_VERSION){

E_VERSION = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

/* git tag E-1-8-001 */
var VERSION = "1.8-001"
var E_NICKNAME = "Gopaldhara"
var E_URL = "http://www.eprover.org"
var STS_MAIL = "schulz@eprover.org"
var STS_COPYRIGHT = "Copyright 1998-2013 by Stephan Schulz"
function STS_SNAIL()
{
   return "Stephan Schulz (I4) nTechnische Universitaet Muenchen(nInstitut fuer Informatik(nBoltzmannstrasse 3(n85748 Garching bei Muenchen(nGermany(n"
}

}//E_VERSION
/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/


/*-----------------------------------------------------------------------

File  : pcl_analysis.h

Author: Stephan Schulz

Contents
 
  Code for analysing PCL protocols, replacing (much of) what used to
  be in ANALYSIS for old E style proofs.

  Copyright 2004 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Tue Feb  3 23:26:44 CET 2004
    New

-----------------------------------------------------------------------*/

if(!PCL_ANALYSIS){

PCL_ANALYSIS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PCLStepUpdateGRefs(prot, step)
{
    return PCLExprUpdateGRefs(prot,step.just, 
    PCLStepQueryProp(step,PCLStepProperties.PCLIsProofStep))
}

}//PCL_ANALYSIS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_expressions.h

Author: Stephan Schulz

Contents
 
  PCL2 expressions and uexpressions.

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Mar 27 15:10:31 MET DST 2000
    New

-----------------------------------------------------------------------*/

if(!PCL_EXPRESSIONS){

PCL_EXPRESSIONS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* If you extend this, also extend InferenceWeightParamAlloc() in
 * pcl_lemmas.c */

function typedef_enum_PCLOpcodes()
{
    function obj()
    {
        this.PCLOpNoOp = 1<<0
        this.PCLOpInitial = 1<<1
        this.PCLOpIntroDef = 1<<2
        this.PCLOpQuote = 1<<3
        this.PCLOpParamod = 1<<4
        this.PCLOpSimParamod = 1<<5
        this.PCLOpEResolution = 1<<6
        this.PCLOpCondense = 1<<7
        this.PCLOpEFactoring = 1<<8
        this.PCLOpSimplifyReflect = 1<<9
        this.PCLOpContextSimplifyReflect = 1<<10
        this.PCLOpACResolution = 1<<11
        this.PCLOpRewrite = 1<<12
        this.PCLOpURewrite = 1<<13
        this.PCLOpClauseNormalize = 1<<14
        this.PCLOpSplitClause = 1<<15
        this.PCLOpSplitEquiv = 1<<16
        this.PCLOpApplyDef = 1<<17
        this.PCLOpFOFSplitConjunct = 1<<18
        this.PCLOpFOFSimplify = 1<<19
        this.PCLOpFOFDeMorgan = 1<<20
        this.PCLOpFOFDistributeQuantors = 1<<21
        this.PCLOpFOFDistributeDisjunction = 1<<22
        this.PCLOpAnnotateQuestion = 1<<23
        this.PCLOpEvalAnswers = 1<<24
        this.PCLOpFOFVarRename = 1<<25
        this.PCLOpFOFSkolemize = 1<<26
        this.PCLOpFOFAssumeNegation = 1<<27
        this.PCLOpMaxOp = 1<<28
    }
    return obj
}
var PCLOpcodes = typedef_enum_PCLOpcodes()


var PCL_OP_NOOP_WEIGHT = 0
var PCL_OP_INITIAL_WEIGHT = 1
var PCL_OP_QUOTE_WEIGHT = 0
var PCL_OP_PARAMOD_WEIGHT = 1
var PCL_OP_SIM_PARAMOD_WEIGHT = 1
var PCL_OP_ERESOLUTION_WEIGHT = 1
var PCL_OP_CONDENSE_WEIGHT = 1
var PCL_OP_EFACTORING_WEIGHT = 1
var PCL_OP_SIMPLIFYREFLECT_WEIGHT = 1
var PCL_OP_CONTEXTSIMPLIFYREFLECT_WEIGHT = 1
var PCL_OP_ACRESOLUTION_WEIGHT = 2
var PCL_OP_REWRITE_WEIGHT = 1
var PCL_OP_UREWRITE_WEIGHT = 1
var PCL_OP_CLAUSENORMALIZE_WEIGHT = 1
var PCL_OP_SPLITCLAUSE_WEIGHT = 1

function typedef_struct_pclexprcell()
{
    function obj()
    {
        this.op = new PCLOpcodes()
        this.arg_no
        this.args = new PDArray_p()
    }
    return obj
}
var PCLExprCell = typedef_struct_pclexprcell()
var PCLExpr_p = typedef_struct_pclexprcell()

var PCL_VAR_ARG = -1

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PCLExprCellAlloc()
{
   return SizeMalloc(PCLOpcodes.PCLExprCell)
}
function PCLExprCellFree(junk)
{
   SizeFree(junk, PCLOpcodes.PCLExprCell)
}

function PCLExprArg(expr,i)
{
   return PDArrayElementP(expr.args,2*(i))
}
function PCLExprArgInt(expr,i)
{
   return PDArrayElementInt(expr.args,2*(i))
}
function PCLExprArgPos(expr,i)
{
   return PDArrayElementP(expr.args,2*(i)+1)
}

/* MiniExprs are the same basic data type. However, MiniPCL-Ids are
   just plain longs, not full PCL identifiers */

function PCLFullExprParse(_in_)
{
   return PCLExprParse((_in_),false)
}
function PCLMiniExprParse(_in_)
{
   return PCLExprParse((_in_),true)
}

function PCLFullExprPrint(out, expr)
{
   return PCLExprPrint((out),(expr),false)
}
function PCLMiniExprPrint(out, expr)
{
   return PCLExprPrint((out),(expr),true)
}

function PCLFullExprPrintTSTP(out, expr)
{
   return PCLExprPrintTSTP((out),(expr),false)
}
function PCLMiniExprPrintTSTP(out, expr)
{
   return PCLExprPrintTSTP((out),(expr),true)
}


}//PCL_EXPRESSIONS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_idents.h

Author: Stephan Schulz

Contents

  Identifiers for PCL2 - lists of posititive numbers.
 
  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Mar 22 19:32:20 MET 2000
    New

-----------------------------------------------------------------------*/

if(!PCL_IDENTS){

PCL_IDENTS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* PCL-Idents are represented as -1-Terminated PDArrays */

var NO_PCL_ID_ELEMENT = -1

var PCLIdCell = new PDArrayCell()
var PCLId_p = new PDArray_p()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PCLIdCellAlloc()
{
   return SizeMalloc(PclIdCell)
}
function PCLIdCellFree(junk)
{
    SizeFree(junk, PclIdCell)
}

function PCLIdAlloc()
{
    PDIntArrayAlloc(2, 2)
}
function PCLIdFree(junk)
{
    PDArrayFree(junk)
}

}//PCL_IDENTS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_lemmas.h

Author: Stephan Schulz

Contents

  Definition for dealing with lemmas in PCL protocols. 

Copyright 1998-2011 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sun Jun 15 22:47:43 CEST 2003
    New

-----------------------------------------------------------------------*/

if(!PCL_LEMMAS){

PCL_LEMMAS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Lemma rating is as follows: 

   size   = StandardWeight(lemma)
   actpm  = references as active partner in paramod
   o_gen  = references from other generating inferences
   act_simpl = references from active simplification
   pas_simpl = references from being simplified
   subsum = references from subsumption (will probably not always be
              available) 
   proof_tree = size of proof tree (unfolded)
   proof_dag  = size of proof tree seen as a dag  

   (1+
   actpm*actpm_w + 
   o_gen*o_gen_w + 
   act_simpl*act_simpl_w + 
   pas_simpl*pas_simpl_w +
   subsum*subsum_w)
   *
   (1+
   proof_tree*proof_tree_w+
   proof_dag*proof_dag_w)
   /
   1+size*size_w

   Large is good! */

function typedef_struct_lemma_param_cell()
{
    function obj()
    {
        this.tree_base_weight
        this.act_pm_w
        this.o_gen_w
        this.act_simpl_w
        this.pas_simpl_w
        this.proof_tree_w
        this.proof_dag_w
        this.size_base_weight
        this.horn_bonus
    }
    return obj
}
var LemmaParamCell = typedef_struct_lemma_param_cell()
var LemmaParam_p = typedef_struct_lemma_param_cell()

var LEMMA_TREE_BASE_W = 1
var LEMMA_ACT_PM_W = 2.0
var LEMMA_O_GEN_W = 1.0
var LEMMA_ACT_SIMPL_W = 2.0
var LEMMA_PAS_SIMPL_W = 1.0
var LEMMA_PROOF_TREE_W = 1.0
/* Don't know how to efficiently compute
 * DAG size at the moment */
var LEMMA_PROOF_DAG_W = 0.0 
var LEMMA_SIZE_BASE_W = 1
var LEMMA_HORN_BONUS_W = 2.0

function _InferenceWeightType_()
{
   this.value = arguments[0] || 0
}
var InferenceWeightType = malloc(_InferenceWeightType_,PCLOpMaxOp)
var InferenceWeight_p = new _InferenceWeightType_()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function LemmaParamCellAlloc()
{
   return SizeMalloc(LemmaParamCell)
}
function LemmaParamCellFree(junk)
{
   SizeFree(junk, LemmaParamCell)
}

function LemmaParamFree(cell)
{
   LemmaParamCellFree(cell)
}

function InferenceWeightCellAlloc()
{
   return SizeMalloc(InferenceWeightType)
}

function InferenceWeightCellFree(junk)
{
   SizeFree(junk, InferenceWeightType)
}

function InferenceWeightsFree(junk)
{
   return InferenceWeightCellFree(junk)
}


}//PCL_LEMMAS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_miniclauses.h

Author: Stephan Schulz

Contents
 
  Maximal compact representation for clauses, to be used in compact
  pcl listings (and possibly wherever elese needed). Adaptded from
  can_clausestore.h.

  Copyright 1998, 1999, 2002 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jul 10 20:50:02 MEST 2002
    Borrowed and modifed (extensively) from clausestore.[ch]

-----------------------------------------------------------------------*/

if(!PCL_MINICLAUSES){

PCL_MINICLAUSES = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Represent a clause as compact as possible. You need some context to
   interprete this, in particular the term bank. */

function typedef_struct_mini_clause_cell()
{
    function obj()
    {
        this.literal_no
        this.sign
        this.lit_terms = new Term_p()
    }
    return obj
}
var MiniClauseCell = typedef_struct_mini_clause_cell()
var MiniClause_p = typedef_struct_mini_clause_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function MiniClauseCellAlloc()
{
   return SizeMalloc(MiniClauseCell)
}

function MiniClauseCellFree(junk)
{
   SizeFree(junk, MiniClauseCell)
}

}//PCL_MINICLAUSES

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_miniprotocol.h

Author: Stephan Schulz

Contents

  Lists of MiniPCL steps 

  Copyright 1998, 1999, 2002 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Jul 11 17:37:03 MEST 2002
    New (from pcl_rotocol.h

-----------------------------------------------------------------------*/

if(!PCL_MINIPROTOCOL){

PCL_MINIPROTOCOL = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_pclminiprotcell()
{
    function obj()
    {
        this.terms = new TB_p()
        this.max_ident
        this.steps = new PDArray_p()
    }
    return obj
}
var PCLMiniProtCell = typedef_struct_pclminiprotcell()
var PCLMiniProt_p = typedef_struct_pclminiprotcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PCLMiniProtCellAlloc()
{
   return SizeMalloc(PCLMiniProtCell)
}
function PCLMiniProtCellFree(junk)
{
   SizeFree(junk,PCLMiniProtCell)
}

}//PCL_MINIPROTOCOL

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_ministeps.h

Author: Stephan Schulz

Contents
 
  Maximally compact PCL steps, only for special purpose applications.

  Copyright 2002 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Jul 10 20:44:47 MEST 2002
    New

-----------------------------------------------------------------------*/

if(!PCL_MINISTEPS){

PCL_MINISTEPS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_pclministepcell()
{
    function obj()
    {
         this.bank = new TB_p()
         this.longid    
         this.logic = {
            clause : new MiniClause_p(),
            formula : new TFormula_p()
         }
         this.properties;
         this.just;
         this.extra;
    }
    return obj
}
var PCLMiniStepCell = typedef_struct_pclministepcell()
var PCLMiniStep_p = typedef_struct_pclministepcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PCLMiniStepCellAlloc()
{
   return SizeMalloc(PCLMiniStepCell)
}
function PCLMiniStepCellFree(junk)
{
   SizeFree(junk,PCLMiniStepCell)
}

}//PCL_MINISTEPS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_positions.h

Author: Stephan Schulz

Contents

  Positions in PCL2 clauses.
 
  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Wed Mar 22 19:32:20 MET 2000
    New

-----------------------------------------------------------------------*/

if(!PCL_POSITIONS){

PCL_POSITIONS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

/* Position is literal, side, position in term. Except for the
   position, everything is optional. Empty term position is expressed
   by both termposlen==0 and termpos==NULL, unless I decide otherwise
   ;-) */

function typedef_struct_pcl2poscell()
{
    function obj()
    {
        this.literal
        this.side = new EqnSide()
        this.termposlen
        this.termpos = new PDArray_p()
    }
    return obj
}
var PCL2PosCell = typedef_struct_pcl2poscell()
var PCL2Pos_p = typedef_struct_pcl2poscell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PCL2PosCellAlloc()
{
   return SizeMalloc(PCL2PosCell)
}
function PCL2PosCellFree(junk)
{
   SizeFree(junk,PCL2PosCell)
}

}//PCL_POSITIONS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_proofcheck.h

Author: Stephan Schulz

Contents
 
  Data types and algorithms to realize proof checking for PCL2
  protocols. 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Mon Apr  3 22:49:51 GMT 2000
    New

-----------------------------------------------------------------------*/

if(!PCL_PROOFCHECK){

PCL_PROOFCHECK = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_enum_PCLCheckType()
{
    function obj()
    {
        this.CheckFail = 1<<0
        this.CheckOk = 1<<1
        this.CheckByAssumption = 1<<2
        this.CheckNotImplemented = 1<<3
    }
    return obj
}
var PCLCheckType = typedef_enum_PCLCheckType()

function typedef_enum_ProverType()
{
    function obj()
    {
        this.NoProver = 1<<0
        this.EProver = 1<<1
        this.Spass = 1<<2
        this.Setheo = 1<<3
        this.Otter = 1<<4
    }
    return obj
}
var ProverType = typedef_enum_ProverType()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var E_EXEC_DEFAULT = "eprover"
var OTTER_EXEC_DEFAULT = "otter"
var SPASS_EXEC_DEFAULT = "SPASS-0.55"

}//PCL_PROOFCHECK

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_propanalysis.h

Author: Stephan Schulz

Contents
 
  Functions for computing various properties of the clauses in a PCL
  protocol. 

  Copyright 2002 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Feb 28 16:27:34 MET 2002
    New

-----------------------------------------------------------------------*/

if(!PCL_PROPANALYIS){

PCL_PROPANALYIS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_pcl_propdata_cell()
{
    function obj()
    {
        this.fof_formulae
        this.pos_clauses
        this.neg_clauses
        this.mix_clauses
        this.pos_clause_literals
        this.neg_clause_literals
        this.mix_clause_literals
        this.pos_literals
        this.neg_literals
        this.const_count
        this.func_count
        this.pred_count
        this.var_count
        this.longest_clause = new PCLStep_p()
        this.max_symbol_clause = new PCLStep_p()
        this.max_standard_weight_clause = new PCLStep_p()
        this.max_depth_clause = new PCLStep_p()
    }
    return obj
}
var PCLPropDataCell = typedef_struct_pcl_propdata_cell()
var PCLPropData_p = typedef_struct_pcl_propdata_cell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

}// PCL_PROPANALYIS

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_protocol.h

Author: Stephan Schulz

Contents

  Lists of PCL steps 

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Sat Apr  1 22:17:54 GMT 2000
    New

-----------------------------------------------------------------------*/

if(!PCL_PROTOCOL){

PCL_PROTOCOL = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

function typedef_struct_pclprotcell()
{
    function obj()
    {
        this.terms = new TB_p()
        this.number
        this.steps = new PTree_p()
        this.in_order = new PStack_p()
        this.is_ordered
    }
    return obj
}
var PCLProtCell = typedef_struct_pclprotcell()
var PCLProt_p = typedef_struct_pclprotcell()

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

function PCLProtCellAlloc()
{
   return SizeMalloc(PCLProtCell)
}
function PCLProtCellFree(junk)
{
   SizeFree(junk,PCLProtCell)
}

function PCLProtInsertStep(prot, step)
{
   prot.is_ordered = false
   prot.number++
   return  { prot:prot, result:PTreeObjStore(prot.steps, step,PCLStepIdCompare) }
}

function PCLProtStepNo(prot)
{
   return (prot.number)
}

function PCLProtPrint(out, prot, format)
{
   return PCLProtPrintExtra((out),((prot),(false, (format))))
}

function PCLStepCollectPreconds(prot, step, tree)
{
   return  _PCLExprCollectPreconds_((prot), step.just, (tree))
}

function PCLProtPrintProofClauses(out, prot, format)
{
   return _PCLProtPrintPropClauses_((out), (prot), PCLIsProofStep, format)
}

}//PCL_PROTOCOL
/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

/*-----------------------------------------------------------------------

File  : pcl_steps.h

Author: Stephan Schulz

Contents
 
  PCL steps.

  Copyright 1998, 1999 by the author.
  This code is released under the GNU General Public Licence and
  the GNU Lesser General Public License.
  See the file COPYING in the main E directory for details..
  Run "eprover -h" for contact information.

Changes

<1> Thu Mar 30 17:52:53 MET DST 2000
    New

-----------------------------------------------------------------------*/

if(!PCL_STEPS){

PCL_STEPS = 1

/*---------------------------------------------------------------------*/
/*                    Data type declarations                           */
/*---------------------------------------------------------------------*/

var PCL_PROOF_DIST_INFINITY = LONG_MAX /* It's magic */
var PCL_PROOF_DIST_DEFAULT = 10 /* Default for non-proofs */
var PCL_PROOF_DIST_UNKNOWN = -1 /* Not yet computed */

function typedef_enum_PCLStepProperties()
{
    function obj()
    {
        this.PCLNoProp = 0
        this.PCLIsLemma = 1
        this.PCLIsInitial = 2
        this.PCLIsFinal = 4
        this.PCLIsMarked = 8
        this.PCLIsProofStep = 16
        this.PCLIsExample = 32
        this.PCLIsFOFStep = 64
        this.PCLIsShellStep = 128
        this.CPType1 = new PCLType1()
        this.CPType2 = new PCLType2()
        this.CPType3 = new PCLType3()
        this.CPTypeMask = new PCLTypeMask()
        this.PCLTypeUnknown = 0
        this.CPTypeAxiom = new PCLTypeAxiom()
        this.CPTypeHypothesis = new PCLTypeHypothesis()
        this.CPTypeConjecture = new PCLTypeConjecture()
        this.CPTypeNegConjecture = new PCLTypeNegConjecture()
        this.CPTypeQuestion = new PCLTypeQuestion()
    }
    return obj
}
var PCLStepProperties = typedef_enum_PCLStepProperties()

function typedef_struct_pclstepcell()
{
    function obj()
    {
        this.bank = new TB_p()
        this.id = new PCLId_p()
        this.logic = {
            clause : new Clause_p(),
            formula : new TFormula_p()
        }
        this.just = new PCLExpr_p()
        this.extra
        this.properties = new PCLStepProperties()
        this.proof_dag_size
        this.proof_tree_size
        this.active_pm_refs
        this.other_generating_refs
        this.active_simpl_refs
        this.passive_simpl_refs
        this.pure_quote_refs
        this.lemma_quality
        this.contrib_simpl_refs
        this.contrib_gen_refs
        this.useless_simpl_refs
        this.useless_gen_refs
        this.proof_distance
    }
    return obj
}
var PCLStepCell = typedef_struct_pclstepcell()
var PCLStep_p = typedef_struct_pclstepcell()

var PCLNoWeight = -1

/*---------------------------------------------------------------------*/
/*                Exported Functions and Variables                     */
/*---------------------------------------------------------------------*/

var SupportShellPCL;

function PCLStepCellAlloc()
{
   return SizeMalloc(PCLStepCell)
}
function PCLStepCellFree(junk)
{
   SizeFree(junk,PCLStepCell)
}

function PCLStepSetProp(clause, prop)
{ 
   return SetProp((clause), (prop))
}
function PCLStepDelProp(clause, prop)
{ 
   return  DelProp((clause), (prop))
}
function PCLStepGiveProps(clause, prop)
{ 
   return  GiveProps((clause), (prop))
}
function PCLStepQueryProp(clause, prop)
{ 
   return  QueryProp((clause), (prop))
}
function PCLStepIsAnyPropSet(clause, prop)
{ 
   return  IsAnyPropSet((clause), (prop))
}

function PCLStepIsFOF(step) {
   return PCLStepQueryProp((step), PCLIsFOFStep)
}
function PCLStepIsShell(step) {
   return PCLStepQueryProp((step), PCLIsShellStep)
}
function PCLStepIsClausal(step)
{
   return !PCLStepIsFOF(step)
}

function PCLStepPrint(out, step)
{
   return  PCLStepPrintExtra((out),(step),false)
}

/*---------------------------------------------------------------------*/
/*                        End of File                                  */
/*---------------------------------------------------------------------*/

}//PCL_STEPS

