
function loader() { // function loader ()
    srcCode.value = 'Prove { a + b + c = d }\nx = a\nx + y + z = a\nx + y + z + b + c = d'
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
    this.map(function(v, i, me) {
        if (v) {
            obj.push(v)
        }
        return v
    })
    return obj
}

Array.prototype.Filter = function() 
{
    var filter = arguments[0] || '.*' // accept any string as a Regular Expression (RE)
    var byStride = arguments[1] || 1
    var i = 0
    var obj = []
    this.map(function(v, i, me) {
        if (v && v.match(filter) && i++ % byStride) {
            obj.push(v)
        }
        return v
    })
    return obj
}

Object.prototype.Clone = function() {
    var result
    var status = {
        'object': function(w) {
            var o
            if (w instanceof Array) {
                o = [];
                w.map(function(v) {
                    o.push(v);
                    return v
                })
            } else {
                o = {}
                for (var i in w) {
                    if (w.hasOwnProperty(i)) {
                        o[i] = w[i]
                    }
                }
            }
            return o
        },
        'string': function(w) {
            return w
        },
        'number': function(w) {
            return w
        },
        'default': function(w) {
            return {}
        },
    }
    if (status[typeof (this)]) {
        result = status[typeof (this)](this)
    } else {
        result = status['default'](this)
    }
    
    return result
}

Object.prototype.Print = function() {
    return JSON.stringify(this, 1, 1)
}

Object.prototype.PrintAsString = function(v) {
    var result = (this.Print()).toString()
    if (v) {
        result = escape(result)
        .replace(/^\%22/, '')
        .replace(/\%22$/, '')
    }
    return result
}

Object.prototype.dup = function(v, j) {
    var s = ''
    while (j--) {
        s += v
    }
    return v
}

var intf = {
    'default': function() {
        srcTranslated.value = 'Functionality not implemented.'
    }, // intf 'default'
    0: function() { // Headers
        srcTranslated.value = 'Processing..'
        var comments = []
        var s
        if (arguments[1]) {
            var commentStack = 0
            s = arguments[0].map(function(v, i, me) {
                var q = 
                [
                    v.match(/\/\*.*\*\//gm), 
                    v.match(/\/\*.*/gm), 
                    v.match(/.*\*\//gm), 
                    v.match(/.*/gm)
                ]
                if (q[0]) {
                    comments.push(q[0])
                    v = v.replace(/\/\*.*\*\//gm, '')
                } else if (q[1]) {
                    comments.push(q[1])
                    commentStack++
                    v = v.replace(/\/\*.*/gm, '')
                } else if (q[2]) {
                    comments.push(q[2])
                    commentStack--
                    v = v.replace(/.*\*\//gm, '')
                } else if (commentStack) {
                    comments.push(q[3])
                    v = ''
                }
                return v
            })
        } else {
            var q = srcCode.value.match(/\/\*.*\*\//gm)
            if (q) {
                comments.push(q)
            }
            s = srcCode.value.replace(/(\/\/.*\n)+|(\/\*[^\*]*[^\/]*\*\/)+/gm, '').split(/\n+/gm)
        }
        var codebody = []
        s.map(function(v) {
            var tv = v.match(/\w+/gmi)
            if (tv) {
                codebody.push(tv)
            }
            return tv
        })
        if (s.length > 1) {
            codebody = codebody.map(function(v, i, me) {
                if (i == 0) {
                    if (v[v.length - 1].match(/enum$/gmi)) {
                        v = 'function ' + v.join('_') + '_' + me[me.length - 1] + '()'
                    } else {
                        v = 'function ' + v.join('_') + '()'
                    }
                } else if (i < me.length - 1) {
                    if (v[0].match(/^[A-Z]/gm)) {
                        if (v[1]) {
                            if (!v[1].match(/\d+/)) {
                                v[1] = '        this.' + v[1]
                                v[0] = ' = new ' + v[0] + '()'
                                v = v.reverse()
                            } else {
                                v[0] = '        this.' + v[0]
                                v[1] = ' = ' + v[1]
                            }
                        } else {
                            v[0] = '        this.' + v[0] + ' = 1<<' + (i - 1)
                        }
                    } else if (v[0].match(/\w+/) && v[1] && v[1].match(/\d+/)) {
                        v[0] = '        this.' + v[0]
                        v[1] = ' = ' + v[1]
                    } else if (v[0] && v[1]) {
                        v[0] = ''
                        v[1] = '        this.' + v[1]
                    } else if (v[0]) {
                        v[0] = '        this.' + v[0]
                    }
                    v = v.join('')
                    if (i == 1) {
                        v = '{\n    function obj()\n    {\n' + v
                    }
                } else if (i == me.length - 1) {
                    v = v.map(function(r) {
                        var w = me[0].join('_')
                        return 'var ' + r + ' = ' + w + (w.match(/enum/) ? '_' + r : '') + '()'
                    })
                    v = '    }\n    return obj\n}\n' + v.join('\n')
                }
                return v
            })
        } else if (s.length == 1) {
            codebody = codebody.map(function(v) {
                if (v[1].match(/^[A-Z]/gm)) {
                    v[1] = 'var ' + v[2] + ' = new ' + v[1] + '()'
                    v[0] = ''
                    v[2] = ''
                    v = v.join('')
                } else {
                    v = 
                    [
                        'function ' + v[2] + '()', 
                        '{', 
                        '   this.value = arguments[0] || 0', 
                        '}'
                    ].join('\n')
                }
                return v
            })
        }
        if (comments.length) {
            comments.push('')
            codebody.unshift(comments.join('\n'))
        }
        if (arguments[1]) {
            return codebody.join('\n')
        } else {
            srcTranslated.value = codebody.join('\n')
        }
    }, // intf 0
    1: function() { // Source
        srcTranslated.value = 'Processing..'
        var s = arguments[0]
        .replace(/(\/\/.*)+|(\/\*[^\*]*[^\/]*\*\/)+/gm, '')
        .replace(/;(\C*\n+)/gm, '$1')
        .replace(/\-\>/gm, '.')
        .replace(/&?([\(\)])&?/gm, '$1')
        .replace(/\(\(+(.*)\)+\)/gmi, '($1)')
        .split(/\n+/gm)
        s = s.map(function(v, i) {
            v = v.replace(/VERBOUT2/gm, 'console.log')
            .replace(/assert\((.*)\)/gm, 'console.log($1)')
            .replace(/TSTPOUT\(GlobalOut,\s*\"([^\)]*)\"\)/gm, 'srcTranslated.value += "$1\\n"')
            .replace(/fprintf\(GlobalOut,\s*([^\)]*)\)/gm, 'console.log($1)')
            .replace(/^(\s*)([A-Z]+\w+)\s*(\w+)\s*=\s*(\w+)(\(.*\))?/gm, '$1var $3 = new $2()\n$1$3 = $4($3)')
            .replace(/^(\s*)(static)?\s+(void|int|long|char|double|float|bool)\s*\*?\s*(\w+)\*?/gm, '$1 var $4')
            var st = v.split(/[()]/gm)
            console.log(st)
            if (st[0] && (i == 0)) {
                var h = st[0].match(/\w+/gm)
                while (h.length > 1) {
                    h.shift()
                }
                st[0] = 'function ' + h.join(' ')
            } else {
                v = v.replace(/^(\s*)([A-Z]+\w+)\s+(\w+)/gm, '$1var $3 = new $2()')
            }
            if (st[1] && (i == 0)) {
                var q = st[1].split(/,/gm)
                if (q) {
                    q = q.map(function(t) {
                        var h = t.match(/\w+/gm)
                        while (h.length > 1) {
                            h.shift()
                        }
                        return h.join('')
                    })
                    st[1] = '( ' + q.join(',') + ' )'
                }
                v = st.join('')
            }
            return v
        })
        if (arguments[1]) {
            return s.join('\n')
        } else {
            srcTranslated.value = s.join('\n')
        }
    }, // intf 1
    2: function() { // #define var
        srcTranslated.value = 'Processing..'
        var result = arguments[0]
        .replace(/\#define\s+(\w+)\s+(["']?\w+["']?)/g, 'var $1 = $2')
        .replace(/\#define\s+(\w+)\s*/g, 'var $1 = 1')
        if (arguments[1]) {
            return result
        } else {
            srcTranslated.value = result
        }
    }, // intf 2
    3: function() { // #define func
        srcTranslated.value = 'Processing..'
        var result = arguments[0]
        .replace(/\->/gm, '.')
        .replace(/\\/gm, '(')
        .replace(/\#define\s*/gm, 'function ')
        .replace(/\s*\)$/gm, '\n}')
        .replace(/\)\s*\(/gm, ')\n{\n   return ')
        .replace(/\((\w+)\)\./gmi, '$1.')
        if (arguments[1]) {
            return result
        } else {
            srcTranslated.value = result
        }
    }, // intf 3
    4: function() { // Source (Multiple function)
        var result = []
        var parenStack = 0
        var stack = []
        var s = srcCode.value.split('\n')
        var j = 0
        var J = s.length
        function matchBrace() {
            var j = arguments[0]
            var v = [s[j++]]
            do {
                if (s[j].match(/\}/)) {
                    parenStack--
                } 
                else if (s[j].match(/\{/)) {
                    parenStack++
                }
                v.push(s[j])
                j++
            } while (parenStack && (j < J))
            result.push(intf[1](v.join('\n'), true))
            return j
        }
        try {
            while (j < J) {
                if (s[j].match(/\w+\s+\w+\(.+\)/)) {
                    j = matchBrace(j)
                } 
                else 
                {
                    result.push(s[j])
                    j++
                }
            }
            srcTranslated.value = result.join('\n')
        } catch (e) {
            srcTranslated.value = 'Line:' + e.lineNumber + '.' + e.columnNumber + ': ' + e.message + '\nStack trace..\n' + e.stack
        }
    }, // intf 4
    5: function() { // Source (long returnType decalaration)
        srcTranslated.value = 'Processing..'
        var result = []
        var parenStack = 0
        var stack = []
        var s = srcCode.value.split('\n')
        var j = 0
        var k = 0
        var J = s.length
        try {
            function matchBrace() {
                var b = arguments[0]
                var t1 = new RegExp(arguments[1])
                var t2 = new RegExp(arguments[2])
                var joinFlat = arguments[3]
                var nl = '\n'
                var v = []
                do {
                    if (s[b].match(t1)) {
                        parenStack--
                    } 
                    else if (s[b].match(t2)) {
                        parenStack++
                    }
                    v.push(s[b++])
                } while (parenStack && (b < J))
                if (joinFlat) {
                    nl = ''
                }
                return {c: v.join(nl),h: b}
            }
            s.map(function(v, i, me) {
                if ((i >= j) && (i >= k)) {
                    var w
                    if (v.match(/^\w+\s+\w+.*\(/g) && !v.match(/\)/g)) {
                        w = matchBrace(i, '\\)', '\\(', true)
                        k = w.h // next
                        i = w.h - 1 // current
                        v = w.c
                    }
                    if (v.match(/^\w+.*\(.*\)/)) {
                        var q = v.replace(/\*+/, '').split('\(')
                        var h = q[0].match(/\w+/)
                        while (h.length > 2) {
                            h.shift()
                        }
                        q[0] = h.join(' ')
                        v = q.join('(')
                        w = matchBrace((i + 1), '}', '{')
                        j = w.h
                        v += '\n' + w.c
                        result.push(intf[1](v, true))
                    } 
                    else 
                    {
                        result.push(v)
                    }
                }
                return v
            })
            srcTranslated.value = result.join('\n').replace(/\n\n+/gm, '\n\n')
        } catch (e) {
            srcTranslated.value = 'Line:' + e.lineNumber + '.' + e.columnNumber + ': ' + e.message + '\nStack trace..\n' + e.stack
        }
    }, // intf 5
    6: function() { // Headers (defs & enum/typedef structs)
        srcTranslated.value = 'Processing..'
        function mapToFunction() {
            function rebuildParameterList() {
                var t = ''
                var v = arguments[0]
                var J = arguments[0].length
                var j = arguments[1]
                if (v[j].match(/\(/g)) {
                    while (v[j] && !v[j].match(/\)\)/) && (j < J) && v[j + 1] && !v[j + 1].match(/^\#|function/)) {
                        t += v[j++]
                    }
                    t += v[j++]
                }
                return {v: t,j: j}
            }
            var v = arguments[0]
            var j = arguments[1]
            var k = rebuildParameterList(v, j)
            k.v = intf[3](k.v, true)
            return k
        }
        function mapToVariable() {
            return intf[2](arguments[0], true)
        }
        var parenStack = 0
        var s = arguments[1] ? arguments[0].split('\n') : srcCode.value.split(/\n/)
        s = s.map(function(v, i, me) {
            v = v
            .replace(/#ifdef\s*(\w+)/g, 'if($1){')
            .replace(/#ifndef\s*(\w+)/g, 'if(!$1){')
            .replace(/#else\s*/g, '} else {')
            .replace(/#elif\s*defined\((\w+)\)/g, '} else if($1) {')
            .replace(/#endif/g, '}');
            var t = v.match(/defined(.+)/gm)
            if (t) {
                v = 'if(' + t[0].replace(/defined/gm, '') + '){'
            } 
            else if (v.match(/#define/g) && (v.match(/\w+\s*\w+\(/) || v.match(/\\/))) {
                v = mapToFunction(me, i)
                if (v.v) {
                    var k = v.v
                    var j = v.j
                    v = v.v
                    for (var n = i + 1; n < j; n++) {
                        me[n] = ''
                    }
                }
                return v
            } 
            else if (v.match(/#define/g)) {
                v = mapToVariable(v)
            } 
            else if (v.match(/struct|enum|union/) && me[i + 1] && me[i + 1].match('{')) {
                var c = 1
                var q = [v, me[i + c]]
                me[i + c++] = ''
                while (!me[i + c].match(/\}/) || me[i + c].match(/\/\*.*\}/g)) {
                    q.push(me[i + c])
                    me[i + c++] = ''
                }
                q.push(me[i + c])
                me[i + c] = ''
                v = intf[0](q, true)
            } else if (v.match(/typedef\s+\w+\*?\s*\w*/)) {
                v = intf[0]([v], true)
            }
            return v
        })
        //var d = s.Repack()
        if (arguments[1]) {
            return s.join('\n').replace(/\n\n+/gm, '\n\n')
        } else {
            srcTranslated.value = s.join('\n').replace(/\n\n+/gm, '\n\n')
        }
    }, // intf 6
    7: function() { // Scopes
        srcTranslated.value = 'Processing..'
        var s = srcCode.value.split(/\n/)
        var parenStack = 0
        var result = []
        s.map(function(v, i, me) {
            var w = v.match(/if\(\![A-Z_]+\)/)
            if (w) {
                result.push('Entering ' + w + '..')
            }
            if (v.match(/\{/gm)) {
                parenStack++
                result.push((i + 1) + ' found')
            }
            if (v.match(/\}/gm)) {
                parenStack--
                var f = ' ( ' + parenStack + ' ) remaining'
                result.push((i + 1) + ' matched' + f)
            }
        })
        srcTranslated.value = result.join('\n')
    }, //int 7
    8: function() { // Comments
        var b = srcCode.value.split('\n')
        srcTranslated.value = b.map(function(v) {
            return '\/\/   ' + v
        }).join('\n')
    }, // intf 8
    9: function() { // MD5 (Multiline)
        var s = srcCode.value.split('\n')
        var archive = {}
        srcTranslated.value = s.map(function(v) {
            try {
                var q = v.match(/\s+(\w+)/)[1]
                if (q && !archive[q]) {
                    archive[q] = 1
                    v = '   this.' + q + ' = "B3C5827F54218753BB2C3338236446C2.' + Math.md5(q) + '"'
                }
            } catch (e) {
            
            }
            return v
        }).join('\n')
    }, //intf 9
    10: function() { // NFA-tool - // Tool takes sample expressions and attempts to collapse them into a stable grammar (for the syntaxer)
        srcTranslated.value = 'Processing..'
        var NFA_cnt = 0
        var NFA_token = {}
        function getNFA() 
        {
            var n = arguments[0]
            if (n < 10) {
                n = '000' + n
            } else if (n < 100) {
                n = '00' + n
            } else if (n < 1000) {
                n = '0' + n
            }
            return n
        }
        var s = srcCode.value /*
            .replace(/\t+/gm,'\t')
            .replace(/\n+/gm,'\n')
            .replace(/\s+/gm,' ')*/
        .split(/\n/gm)
        var result = new Array(s.length)
        s.map(function(v, i) {
            var g = v.split(/\s+/gm)
            if (!result[i]) {
                result[i] = {}
            }
            g.map(function(r, j) {
                if (!NFA_token[r]) {
                    NFA_token[r] = '_a' + getNFA(NFA_cnt++)
                }
                var R = NFA_token[r]
                if (!result[i][R]) {
                    result[i][R] = 1
                }
                return r
            })
            return v
        })
        srcTranslated.value = '# Lexer: Note - \"\" == \'\\n\'\n' + NFA_token.Print() + '\n\n# Syntaxer\n' + result.Print()
    },
    11: function() { // xperimental: SuffixTree generator
        function Replace_Route(s, t, o) {
        }
        function Route_Check() {
            this['plus'] = function(l, r, o) {
                return this['+'](l, r, o)
            }
            this['minus'] = function(l, r, o) {
                return this['-'](l, r, o)
            }
            this['+'] = function(l, r, o) {
                var isValid = true
                var obj = o
                if (!obj[l]) {
                    isValid = false
                }
                if (!obj[r]) {
                    isValid = false
                }
                return isValid
            }
            this['-'] = function(l, r, o) {
                var isValid = true
                var obj = o
                if (!obj[l]) {
                    isValid = false
                }
                if (!obj[l][r]) {
                    isValid = false
                }
                return obj
            }
        }
        Route_Map.prototype = new Object()
        function Route_Map() {
            this['plus'] = function(l, r, o) {
                return this['+'](l, r, o)
            }
            this['minus'] = function(l, r, o) {
                return this['-'](l, r, o)
            }
            this['+'] = function(l, r, o) {
                var obj = o || {}
                if (!obj[l]) {
                    obj[l] = 1
                }
                if (!obj[r]) {
                    obj[r] = 1
                }
                return obj
            }
            this['-'] = function(l, r, o) {
                var obj = o || {}
                if (!obj[l]) {
                    obj[l] = {}
                }
                obj[l][r] = 1
                return obj
            }
        }
        Route_Map.prototype = new Object()
        
        function Parser_init(buffer) {
            this['7F2DB423A49B305459147332FB01CF87'] = buffer //{} // extant memory buffer for incoming tokens //
            //this['1D54B868FF66535258A77B28F7C81F9A'] = {} // MD5(mapsTo) //
            this['44CDEB54C6F2AEBAD54611201C26D6F0'] = function() {
                var i = arguments[0];
                var j = arguments[1];
                var k = arguments[2];
                throw 'Euclid Axiom Parser: *** Error *** - Line 0000 col ' + FMT(i) + ': Unexpected token ( ' + j + ' ) - Expected ( ' + k + ' )\n'
            } // MD5(OnError) //
        }
        Parser_init.prototype = new Array()
        
        function prover(includes) {
            includes[0].shift(), includes[0].shift(), includes[0].pop()
            this.buffer = includes[0], includes.shift()
            this.axioms = includes
            this.buildTensorReduction = function(s_k_object, k, k_2, j, j_2, i, tmpParser) {
                var result
                try {
                    var o = s_k_object.Clone()
                    var k_rep = (k_2 == 0) ? 1 : 0
                    var lhs = tmpParser[j][k_2][i]
                    var rhs = tmpParser[j][k_rep][i]
                    Object.keys(s_k_object).forEach(function(idx){/*
                        var c = typeof (lhs[idx]) == 'number'
                        if (c) {
                            var u = o[idx]
                            delete o[idx]
                            Object.keys(rhs).forEach(function(r){
                                o[r] = u
                                return r
                            })
                        }
                        var c = typeof (o[idx]) == 'object'
                        if (c) {
                            Object.keys(o[idx]).forEach(function(idx_2){
                                var u = o[idx][idx_2]
                                delete o[idx][idx_2]
                                Object.keys(rhs).forEach(function(r){
                                    o[idx][r] = u
                                    return r
                                })
                                return idx_2
                            })
                        }*/
                        return idx
                    })
                    result = o
                } 
                catch (e) 
                {
                    result = {}
                }
                return result
            }
            this.root_compare = function(obj, k, k_2, j, j_2, i, tmpParser, that) {
                var o = that.buildTensorReduction(obj, k, k_2, j, j_2, i, tmpParser)
                var bDoInsert = true
                tmpParser[j][k_2].map(function(p){
                    if(bDoInsert && (o==p)){
                        bDoInsert = false
                    }
                    return p
                })
                if(bDoInsert && o){
                    tmpParser[j][k_2].push(o)
                }
                return tmpParser
            }
            this.compare_LHS = function(obj, k, k_2, j, j_2, tmpParser, that) {
                return that.root_compare(obj[0], k, k_2, j, j_2, 0, tmpParser, that)
            }
            this.compare_RHS = function(obj, k, k_2, j, j_2, tmpParser, that) {
                return that.root_compare(obj[0], k, k_2, j, j_2, 0, tmpParser, that)
            }
            this.compareRows = function(s_j, s_j_2, j, j_2, tmpParser, that) {
                var m_compare_LHS = that.compare_LHS
                var m_compare_RHS = that.compare_RHS
                s_j.map(function(s_k, k) {
                    s_j_2.map(function(s_k_2, k_2) {
                        tmpParser = m_compare_LHS(s_k, k, k_2, j, j_2, tmpParser, that)
                        tmpParser = m_compare_RHS(s_k_2, k, k_2, j, j_2, tmpParser, that)
                        return s_k_2
                    })
                    return s_k
                })
                return tmpParser
            }
            this.buildDiGraphTensor = function(tmpParser) {
                var that = this
                var m_compareRows = this.compareRows
                tmpParser.map(function(s_j, j) {
                    tmpParser.map(function(s_j_2, j_2) {
                        if (j != j_2) { // skip self //
                            tmpParser = m_compareRows(s_j, s_j_2, j, j_2, tmpParser, that)
                        }
                        return s_j_2
                    })
                    return s_j
                })
                return tmpParser
            }
            this.buildDiGraph = function() {
                var route_map = new Route_Map()
                var parseDG = false
                var axioms_eol = this.axioms.length - 1
                Parser = new Parser_init(this.buffer)
                var tmpParser = []
                this.axioms.map(function(curNode, j, we) {
                    var curNode_eol = curNode.length - 1
                    var o = []
                    var obj = {}
                    var obj_2 = {}
                    var last_i = 0
                    curNode.map(function(curVertex, i, me) {
                        if (curVertex.literal == '=') {
                            var lhs = me.slice(last_i, i)
                            var rhs = me.slice(i + 1, me.length)
                            last_i = i + 1
                            if (Parser[j]) {
                                o.pop() // remove last incorrect entry //
                                Parser[j].pop() // remove last incorrect entry //
                                Parser[j].push(lhs)
                            } else {
                                Parser.push([lhs, rhs])
                            }
                            lhs.map(function(v, i, blob) {
                                var w = v.literal
                                if (i < blob.length - 1) {
                                    if (!obj[w]) {
                                        obj[w] = {}
                                    }
                                    var w_next = blob[i + 1].literal
                                    if (route_map[w]) {
                                        var w_last = blob[i - 1].literal
                                        obj[w] = route_map[w](w_last, w_next, obj[w])
                                    } else {
                                        obj[w][w_next] = 1
                                    }
                                } else {
                                    obj[w] = 1
                                }
                                return v
                            })
                            rhs.map(function(v, i, blob) {
                                var w = v.literal
                                if (i < blob.length - 1) {
                                    if (!obj_2[w]) {
                                        obj_2[w] = {}
                                    }
                                    var w_next = blob[i + 1].literal
                                    if (route_map[w]) {
                                        var w_last = blob[i - 1].literal
                                        obj_2[w] = route_map[w](w_last, w_next, obj_2[w])
                                    } else {
                                        obj_2[w][w_next] = 1
                                    }
                                } else {
                                    obj_2[w] = 1
                                }
                                return v
                            })
                            o.push([obj])
                            o.push([obj_2])
                        }
                        return curVertex
                    })
                    if (o) {
                        tmpParser.push(o)
                    }
                    return curNode
                })
                tmpParser = this.buildDiGraphTensor(tmpParser)
                parseDG = true
                return parseDG
            }
        }
        
        var buf = srcCode.value.split(/\n+/)
        var buffer = buf.map(function(v) {
            var tmp = v.split(/\s+/)
            var obj = tmp.map(function(s) {
                return {literal: s}
            })
            return obj
        })
        var prove = new prover(buffer)
        prove.buildDiGraph()
        srcTranslated.value = Parser.Print()
    },
    12: function() { // Syntaxer NFA generator
        function g_TPTtoken() 
        {
            // NoToken //
            this.NullToken = "7714ED6F3665F640687375C40C070F18"
            this.Expression = "63973CD3AD7CCF2C8D5DCE94B215F683"
            this.WhiteSpace = "1043FACB02056549CFA595CE3622FE77"
            // SkipToken|WhiteSpace //
            this.SkipToken = "E3F7B8DCF6EA8B99A324367EA80638BA.1043FACB02056549CFA595CE3622FE77"
            this.Comment = "0BE8406951CDFDA82F00F79328CF4EFC"
            this.Ident = "35CEF9B551D46ECFD244F4694DE9E228"
            // Identifier|Ident //
            this.Identifier = "29EE5D1EBCC033234938A5234F1F2075.35CEF9B551D46ECFD244F4694DE9E228"
            this.Idnum = "52104F74F9A3C743625031A4715B1887"
            this.SemIdent = "424A1D98D88C3C7662D8BBCE6A86C4FD"
            this.String = "27118326006D3829667A400AD23D5D98"
            // Name|String|Identifier //
            this.Name = "49EE3087348E8D44E1FEDA1917443987.29EE5D1EBCC033234938A5234F1F2075.27118326006D3829667A400AD23D5D98"
            this.SQString = "E7B8427783105A8F10F05B7F4EFDB3E7"
            this.PosInt = "C37FED9131644A9DF43A29F001C3F1ED"
            this.OpenBracket = "8EE1F3D3BBA931ACDCBDE13AD0AE8B9E"
            this.CloseBracket = "F252CB560619C12A579BD64F2D05EC4A"
            this.OpenCurly = "484A45AFD95E7F268A319CB385166923"
            this.CloseCurly = "9834F422C3D10569E33F315FA0B94657"
            this.OpenSquare = "466ACC7909EBAA7E1B5DD8608840B97F"
            this.CloseSquare = "219195745CB1DE1EC68C9ECCF9A94EC0"
            this.LesserSign = "B88371FC2D5E27205B091CB646E4659B"
            this.GreaterSign = "2659E5B184D914286389773B70C0C18B"
            this.EqualSign = "0AB43695400DD2E8B2FEFF17B52ED209"
            this.NegEqual = "18DE13E3428E07F99551A8D21DBBC151"
            this.TildeSign = "11D3141968410AD3606EACF63FFBC717"
            this.Exclamation = "2CACCE52CCA35CBC2D8E590FCE9AFBD4"
            // Exclamation // AllQuantor "F438AEA2FECE725E5DFA0638FB90CB61" //
            this.AllQuantor = "2CACCE52CCA35CBC2D8E590FCE9AFBD4"
            this.QuestionMark = "9D1C32CEFF0C1951EF12E4BCFC1DAB5C"
            this.ExistQuantor = "A3270F9E4509A98F2AE7B100384C2EAF"
            this.Comma = "58BE47DB9455679E6A44DF2EFF9C9FA6"
            this.Semicolon = "9806FA37A3ECD39BF637C203AA011ED0"
            this.semicolon = "77B7E24BB3642A4B9D3081D393785273"
            this.Colon = "3CCF74D463F8895CEF06727CB9709D83"
            this.Hyphen = "726ADD2B4D11304A74BC0360F8338984"
            this.Plus = "32BA78FE43257D3E7F88E3935A8EA0D4"
            this.Mult = "3F18BE7027FDE0C47414F020462B9B25"
            this.Fullstop = "3DD8A3067D2147D8342717B40A9833AE"
            this.Dollar = "4EF781B1CB5E5D83FEC0EBB0DD3C5761"
            this.Slash = "358CFE58715D680D9AB09F82E4010CBC"
            this.Pipe = "2AB1F3F893823298751FDF60B4E0365A"
            // FOFOr "13182237E227E85118C05487680EE58C" //
            this.FOFOr = "2AB1F3F893823298751FDF60B4E0365A"
            this.Ampersand = "42D346F22274DCFF52C108F28D8AC897"
            // Ampersand // FOFAnd "8A3EBA9CF55708CE7B50B664A7DC8EF7" //
            this.FOFAnd = "42D346F22274DCFF52C108F28D8AC897"
            // FOFAssocOp|FOFOr FOFAssocOp "36D01B912DB2BD5169B41246F3110BFC" //
            this.FOFAssocOp = "42D346F22274DCFF52C108F28D8AC897.2AB1F3F893823298751FDF60B4E0365A"
            this.FOFLRImpl = "063AB0C259E5CCA69893A1225963D839"
            this.FOFRLImpl = "C0D1CA4A70CB27E9FF6F35B5669DE3FB"
            this.FOFEquiv = "FBBFA4DC1882CCDF24C79B9974F3CE6D"
            this.FOFXor = "42C3A571787B243EC69B49164A44756A"
            this.FOFNand = "2189FD97ABD7A6D0E02F8475F29E7C58"
            this.FOFNor = "83CBDF1555CBEE9CD8FFCE0AB43EA7A5"
            // FOFAnd|FOFOr|FOFLRImpl|FOFRLImpl|FOFEquiv|FOFXor|FOFNand|FOFNor) // FOFBinOp "39D583B6481D53965D06A2DAAD449EF7" //
            this.FOFBinOp = "42D346F22274DCFF52C108F28D8AC897.2AB1F3F893823298751FDF60B4E0365A.063AB0C259E5CCA69893A1225963D839.C0D1CA4A70CB27E9FF6F35B5669DE3FB.FBBFA4DC1882CCDF24C79B9974F3CE6D.2189FD97ABD7A6D0E02F8475F29E7C58.83CBDF1555CBEE9CD8FFCE0AB43EA7A5"

            // LMultilineComment|Comment //
            this.LMultilineComment = "922CA52B48652D19BA98B37A7D17E8C4.0BE8406951CDFDA82F00F79328CF4EFC"
            // RMultilineComment|Comment //
            this.RMultilineComment = "359F4FD727E5D5788CDC88B66C6DE44A.0BE8406951CDFDA82F00F79328CF4EFC"
            this.Newline = "755FEE300780823FCF4DF98383331745"
            this.hashmark = "A5FE5D548A3DA1C957C1944CCE73B215"
            this.dblhashmark = "C2269A9B6BEA4200B7E6E6ECD05111D1"
            // UNARY / BINARY OPERATORS (22) //
            this.inv = "FDE7ED8E71279ADA2A65FA925C408876.545F7F577C93318B34476E9999931731"
            this.UnaryBinaryOPS = "FDE7ED8E71279ADA2A65FA925C408876"
            this.pos = "FDE7ED8E71279ADA2A65FA925C408876.5E0BDCBDDCCCA4D66D74BA8C1CEE1A68"
            this.neg = "FDE7ED8E71279ADA2A65FA925C408876.F24C2C15B9D03797C6874986A8D19516"
            this.plusminus = "FDE7ED8E71279ADA2A65FA925C408876.36C2F310FBF1721666C750FFC33DC9FA"
            this.minusplus = "FDE7ED8E71279ADA2A65FA925C408876.01A3568510E7FFBC2458AA4421E8ECD2"
            this.plus = "FDE7ED8E71279ADA2A65FA925C408876.D7D18CFB3A0D8293E2F5D94EA30E04D2"
            this.minus = "FDE7ED8E71279ADA2A65FA925C408876.DABE6E597B70E5760826AEA1DCC564F7"
            this.cdot = "FDE7ED8E71279ADA2A65FA925C408876.BBFD87BD78B94790F1D39C88DB250530"
            this.times = "FDE7ED8E71279ADA2A65FA925C408876.F2B798F672D4B42C0359CED11D4F10CD"
            this.division = "FDE7ED8E71279ADA2A65FA925C408876.50C9B5E7CF3A731EA31C43F9A14C781B"
            this.over = "FDE7ED8E71279ADA2A65FA925C408876.3B759A9CA80234563D87672350659B2B"
            this.circ = "FDE7ED8E71279ADA2A65FA925C408876.FCE458DA5814089639960610C48D19D2"
            this.wideslash = "FDE7ED8E71279ADA2A65FA925C408876.F6A9372ECC53A4B5F7F0432E78970514"
            this.widebslash = "FDE7ED8E71279ADA2A65FA925C408876.193FA3BA5937F26D534E22B9D235B923"
            this.and = "FDE7ED8E71279ADA2A65FA925C408876.BE5D5D37542D75F93A87094459F76678"
            this.or = "FDE7ED8E71279ADA2A65FA925C408876.E81C4E4F2B7B93B481E13A8553C2AE1B"
            this.nor = "FDE7ED8E71279ADA2A65FA925C408876.57C7D11CD49333E3F722204C63016DA9"
            this.nand = "FDE7ED8E71279ADA2A65FA925C408876.C657344463FF1B32BF1AD9BBDB3EF20B"
            this.xor = "FDE7ED8E71279ADA2A65FA925C408876.A392960421913165197845F34BF5D1A8"
            // RELATIONS (38) //
            this.Relations = "E109705703E0324D1A5DE1D84A3A8951"
            this.lessthan = "E109705703E0324D1A5DE1D84A3A8951.A5FA324707BE552E3FCDE68359BA1330"
            this.greaterthan = "E109705703E0324D1A5DE1D84A3A8951.197104EE83D8274271E75190519CF71E"
            this.lessequal = "E109705703E0324D1A5DE1D84A3A8951.BDE7DB2ADF4450856BC5DC56585BA156"
            this.le = "E109705703E0324D1A5DE1D84A3A8951.D9180594744F870AEEFB086982E980BB"
            this.leslant = "E109705703E0324D1A5DE1D84A3A8951.02711273D3902F144B13EE396E956E06"
            this.greaterequal = "E109705703E0324D1A5DE1D84A3A8951.077016EE4B54D77A18C6F226FEB24266"
            this.geslant = "E109705703E0324D1A5DE1D84A3A8951.7104469100104BC34DD99E5698ABE9E0"
            this.muchless = "E109705703E0324D1A5DE1D84A3A8951.1F24FEC8253A2299B9DBD62CB7C05A0D"
            this.muchgreater = "E109705703E0324D1A5DE1D84A3A8951.FDF62379DB60481CC18DCEC8AD42A5CF"
            this.equals = "E109705703E0324D1A5DE1D84A3A8951.51C3F59625962B899C03595D6CDFB284"
            this.minus = "E109705703E0324D1A5DE1D84A3A8951.DABE6E597B70E5760826AEA1DCC564F7"
            this.noteq = "E109705703E0324D1A5DE1D84A3A8951.D0CC7FA42A4F86B8C0B6ED1629018611"
            this.isequal = "E109705703E0324D1A5DE1D84A3A8951.B9DFC657B70A1A442A13065822AE5C3A"
            this.approx = "E109705703E0324D1A5DE1D84A3A8951.41ACF2DC58BD53BDD6258B5911077D6D"
            this.sim = "E109705703E0324D1A5DE1D84A3A8951.E9064B74D28ACC053231170BB8C858B3"
            this.simeq = "E109705703E0324D1A5DE1D84A3A8951.9D246E1A79432EE95D0B5AACA10E9FC6"
            this.equiv = "E109705703E0324D1A5DE1D84A3A8951.BBFD8F991129B1D05C8CE817449307C7"
            this.prop = "E109705703E0324D1A5DE1D84A3A8951.23A5B8AB834CB5140FA6665622EB6417"
            this.parallel = "E109705703E0324D1A5DE1D84A3A8951.48920C071F6A5C97AE3739BE64630697"
            this.ortho = "E109705703E0324D1A5DE1D84A3A8951.D06AEFBB6165AA7FD908B9E942B2E18B" // orthog //
            this.divides = "E109705703E0324D1A5DE1D84A3A8951.52BEBBB66BC9495A9EAED1852C8210F4"
            this.ndivides = "E109705703E0324D1A5DE1D84A3A8951.A2353A8D68700C42F5144D3ADB213A22"
            this.toward = "E109705703E0324D1A5DE1D84A3A8951.B5B6116573B76BAA722EDEB026BF5CF7"
            this.dlarrow = "E109705703E0324D1A5DE1D84A3A8951.BE64B010903E3C113064D36D7000348A"
            this.dlrarrow = "E109705703E0324D1A5DE1D84A3A8951.124502753081DA2F6BBF866DFA43597F"
            this.drarrow = "E109705703E0324D1A5DE1D84A3A8951.03298A2207FB8C775AE29CB26E34AEED"
            this.prec = "E109705703E0324D1A5DE1D84A3A8951.E81F51B496552D5548D2739E87DAF131"
            this.succ = "E109705703E0324D1A5DE1D84A3A8951.0A5E7329D4DABF07CD8FC5B0C8729DFF"
            this.preccurlyeq = "E109705703E0324D1A5DE1D84A3A8951.E51517194637637795BA673EC5CF48E1"
            this.succcurlyeq = "E109705703E0324D1A5DE1D84A3A8951.E9D0BAE1668262C73A72FD72EBD56B71"
            this.precsim = "E109705703E0324D1A5DE1D84A3A8951.93E7F701B4649C9B320B576B24CFDDF6"
            this.succsim = "E109705703E0324D1A5DE1D84A3A8951.B47FB4362686EC47BF1E74D63BC703A9"
            this.nprec = "E109705703E0324D1A5DE1D84A3A8951.8E9290FE9E15190070B81F812148709B"
            this.nsucc = "E109705703E0324D1A5DE1D84A3A8951.081FB04FFB07564C24C10FBC05A184A9"
            // SET OPERATIONS (21) //
            this.SetOperations = "F38F249F06E9190DBCB8C34370A1F046"
            this.in = "F38F249F06E9190DBCB8C34370A1F046.13B5BFE96F3E2FE411C9F66F4A582ADF"
            this.notin = "F38F249F06E9190DBCB8C34370A1F046.935F754ECC68CA688F61C154C404ED06"
            this.owns = "F38F249F06E9190DBCB8C34370A1F046.3AEED85361E8DEFF2EDB5FDB059FB173"
            this.intersection = "F38F249F06E9190DBCB8C34370A1F046.26FEF4087B2C10CB5AB7E4A5F5436FF4"
            this.union = "F38F249F06E9190DBCB8C34370A1F046.AA252F7BCBB4B8379004AA0C7CF76C10"
            this.setminus = "F38F249F06E9190DBCB8C34370A1F046.0D60EA53DC316AACD36C6DCAE2251C82"
            this.slash = "F38F249F06E9190DBCB8C34370A1F046.0C1E770F0B8E17138150A893ABD033B2"
            this.subset = "F38F249F06E9190DBCB8C34370A1F046.83E8B3D3E01DFA7592DA027760EF8629"
            this.subseteq = "F38F249F06E9190DBCB8C34370A1F046.9011FB9CD6EAAD852D2533925CCFA650"
            this.supset = "F38F249F06E9190DBCB8C34370A1F046.AA3E5AEA8097B55E76AD627D1C1D2E00"
            this.supseteq = "F38F249F06E9190DBCB8C34370A1F046.D85EE4E9A205E4B85D0B8C70661EF157"
            this.nsubset = "F38F249F06E9190DBCB8C34370A1F046.89F5E3F29E53A068CF2A02D448B3F0CB"
            this.nsubseteq = "F38F249F06E9190DBCB8C34370A1F046.3D5BA08B63D8B08F8459DBB4611BDECF"
            this.nsupset = "F38F249F06E9190DBCB8C34370A1F046.277809FA92B15E09BA3EB690C0AB36F4"
            this.nsupseteq = "F38F249F06E9190DBCB8C34370A1F046.38FB0CDE24F7D252DA6CE198A6D078F6"
            this.emptyset = "F38F249F06E9190DBCB8C34370A1F046.DD132B9389A335959B11BB7710547311"
            this.aleph = "F38F249F06E9190DBCB8C34370A1F046.E053CE2783FB820D02EE4A32F5B125BD"
            this.setn = "F38F249F06E9190DBCB8C34370A1F046.8780167AF841BB70CB045A83A605B956"
            this.setz = "F38F249F06E9190DBCB8C34370A1F046.8ACF36B8D465FA0CB4AE797F72820728"
            this.setq = "F38F249F06E9190DBCB8C34370A1F046.31E2A9D4296606FF80F8C45EA8D83446"
            this.setr = "F38F249F06E9190DBCB8C34370A1F046.7B64B0DB55F1B4D4BA99DABDF45DDDB9"
            this.setc = "F38F249F06E9190DBCB8C34370A1F046.49C4E09655B56CFBEEBF8707B692CE53"
            // FUNCTIONS (24) //
            this.Functions = "E93ACB146E114B5DFA6CE2D12DCB96E4"
            this.abs = "E93ACB146E114B5DFA6CE2D12DCB96E4.F9AC6B05BECCB0FC5837B6A7FEF4C1D3"
            this.fact = "E93ACB146E114B5DFA6CE2D12DCB96E4.B82C91E2103D0A495C099F0A12F66363"
            this.sqrt = "E93ACB146E114B5DFA6CE2D12DCB96E4.DD1DE98E8B0E34D5CF5396E83036F4D5"
            this.nroot = "E93ACB146E114B5DFA6CE2D12DCB96E4.EDA0B76DA6F92E54A7E54750FDB10213"
            this.func = "E93ACB146E114B5DFA6CE2D12DCB96E4.7DF4935F4A5A2865191EF74F64DF8754"
            this.ln = "E93ACB146E114B5DFA6CE2D12DCB96E4.F8E19F449F17C9D37DCC93DD244EC3BB"
            this.exp = "E93ACB146E114B5DFA6CE2D12DCB96E4.B0AB0254BD58EB87EAEE3172BA49FEFB"
            this.log = "E93ACB146E114B5DFA6CE2D12DCB96E4.DC1D71BBB5C4D2A5E936DB79EF10C19F"
            this.sin = "E93ACB146E114B5DFA6CE2D12DCB96E4.7D27E4A7CA7533A3BEF4FAD10A0C19C7"
            this.cos = "E93ACB146E114B5DFA6CE2D12DCB96E4.4D00D79B6733C9CC066584A02ED03410"
            this.tan = "E93ACB146E114B5DFA6CE2D12DCB96E4.5B2D4484498235E80D61A233A7C04991"
            this.cot = "E93ACB146E114B5DFA6CE2D12DCB96E4.97223FAB7B0D4C64C07E6E004C602302"
            this.sec = "E93ACB146E114B5DFA6CE2D12DCB96E4.74459CA3CF85A81DF90DA95FF6E7A207"
            this.csc = "E93ACB146E114B5DFA6CE2D12DCB96E4.EE7DDFA19482E219FB5021EC30BD975C"
            this.sinh = "E93ACB146E114B5DFA6CE2D12DCB96E4.A7CD83FE6A92873F5118A3DD9EDEFF2D"
            this.cosh = "E93ACB146E114B5DFA6CE2D12DCB96E4.1A9B5EE12F27E6F4BD9371EC529AA76F"
            this.tanh = "E93ACB146E114B5DFA6CE2D12DCB96E4.5C0DBBA3A6EE4AC0EB26CFEE75CCB8B4"
            this.coth = "E93ACB146E114B5DFA6CE2D12DCB96E4.CA1AC33452ADCD4BE4C8A955B499E688"
            this.arcsin = "E93ACB146E114B5DFA6CE2D12DCB96E4.7C707945D42377AA6248F623C0E787D3"
            this.arccos = "E93ACB146E114B5DFA6CE2D12DCB96E4.4F239AAA3EFC1D99BAD96608959AB26C"
            this.arctan = "E93ACB146E114B5DFA6CE2D12DCB96E4.8A649CC933DCBAE878580EBE157C0EA2"
            this.arccot = "E93ACB146E114B5DFA6CE2D12DCB96E4.3D71F723BC22844C100DC19AD1F6A3BD"
            this.arsinh = "E93ACB146E114B5DFA6CE2D12DCB96E4.260B25A99FEB2875AC04299040F2A1DC"
            this.arcosh = "E93ACB146E114B5DFA6CE2D12DCB96E4.A6E16E841D3FCAC593EC1A8D56A25601"
            this.arctanh = "E93ACB146E114B5DFA6CE2D12DCB96E4.9A2462111B480C04262D0A8B84D47885"
            this.arcoth = "E93ACB146E114B5DFA6CE2D12DCB96E4.736A5AE43F5290525D0E9344880D1213"
            // OPERATORS (39) //
            this.Operators = "B3C5827F54218753BB2C3338236446C2"
            this.lim = "B3C5827F54218753BB2C3338236446C2.499E0D7E3F2F15A72FB4D114388BCB0A"
            this.sum = "B3C5827F54218753BB2C3338236446C2.1D623B89683F9CE4E074DE1676D12416"
            this.prod = "B3C5827F54218753BB2C3338236446C2.D6E4A9B6646C62FC48BAA6DD6150D1F7"
            this.coprod = "B3C5827F54218753BB2C3338236446C2.D65B072A29FCA49B7F5A22FB58A61804"
            this.int = "B3C5827F54218753BB2C3338236446C2.FA7153F7ED1CB6C0FCF2FFB2FAC21748"
            this.iint = "B3C5827F54218753BB2C3338236446C2.BE5DE871634572B04E582D33A1E35F6B"
            this.iiint = "B3C5827F54218753BB2C3338236446C2.1B7649709EB86AADEF483CAA31FC8F94"
            this.lint = "B3C5827F54218753BB2C3338236446C2.9D6D664209ABE738390AF710ABED6017"
            this.llint = "B3C5827F54218753BB2C3338236446C2.C1B956E3BC9F03A524DBA190BE60875B"
            this.lllint = "B3C5827F54218753BB2C3338236446C2.BA1C1A7E595C589D203D0DA528ECDFAD"
            this.from = "B3C5827F54218753BB2C3338236446C2.D98A07F84921B24EE30F86FD8CD85C3C"
            this.to = "B3C5827F54218753BB2C3338236446C2.01B6E20344B68835C5ED1DDEDF20D531"
            this.of = "B3C5827F54218753BB2C3338236446C2.8BF8854BEBE108183CAEB845C7676AE4"
            this.with = "B3C5827F54218753BB2C3338236446C2.23A58BF9274BEDB19375E527A0744FA9"
            this.percent = "B3C5827F54218753BB2C3338236446C2.354F047BA64552895B016BBDD60AB174"
            this.da = "B3C5827F54218753BB2C3338236446C2.3E86F12FB085EA070EAD934865096103" // differentiator vars (dxdn) //
            this.db = "B3C5827F54218753BB2C3338236446C2.9AEA03A13B48928D8A51E0EAFEDE6680"
            this.dc = "B3C5827F54218753BB2C3338236446C2.BE38DD4BCA8B5B8B43839F4C0B8F892F"
            this.dd = "B3C5827F54218753BB2C3338236446C2.94DFC646DAFC0CA63E8E340CA2ABAB33"
            this.de = "B3C5827F54218753BB2C3338236446C2.432D5AD28010C21CCA5DC3F3AD56C5D8"
            this.df = "B3C5827F54218753BB2C3338236446C2.EF5E5376D2B17087BD6BC478C035E481"
            this.dg = "B3C5827F54218753BB2C3338236446C2.3BF10175B91A63CA547A90BBE46FB829"
            this.dh = "B3C5827F54218753BB2C3338236446C2.73BC6D065C1C034174CB91E8D300342B"
            this.di = "B3C5827F54218753BB2C3338236446C2.3FD54732076A0C693754C6632C811325"
            this.dj = "B3C5827F54218753BB2C3338236446C2.31106424ED61421623A392445660DF7E"
            this.dk = "B3C5827F54218753BB2C3338236446C2.E0468E71E3858B373F3E89B33B5A8FD3"
            this.dl = "B3C5827F54218753BB2C3338236446C2.10E28BCAFF0D0DF5C9C24F091E24E089"
            this.dm = "B3C5827F54218753BB2C3338236446C2.4821A5DCA3390668409D391BBEF0CA8D"
            this.dn = "B3C5827F54218753BB2C3338236446C2.B1932C2B89031F68B41EAD3BA4A5B9A5"
            this.do = "B3C5827F54218753BB2C3338236446C2.38A4B6ABEB2ACBBF9EC89C6DC4D0D4F7"
            this.dp = "B3C5827F54218753BB2C3338236446C2.CF1C29236ECB8AD54D8050D9EDF77D69"
            this.dq = "B3C5827F54218753BB2C3338236446C2.0CC0604F19EFC3E17E6741AC8D9358B1"
            this.dr = "B3C5827F54218753BB2C3338236446C2.3880A6CC2F3E0C30102C67845627F810"
            this.ds = "B3C5827F54218753BB2C3338236446C2.55344805A89838929CB5D5F3EB65CBE8"
            this.dt = "B3C5827F54218753BB2C3338236446C2.C2DAD43FC01133F21D2B5927593D7447"
            this.du = "B3C5827F54218753BB2C3338236446C2.0434DA59D1FDE0D78ED09C477DD05FA3"
            this.dv = "B3C5827F54218753BB2C3338236446C2.DA46ECA59CE56AD13F03D16D0D57583C"
            this.dw = "B3C5827F54218753BB2C3338236446C2.3D90C9C8B9E434CC1508D145C5598910"
            this.dx = "B3C5827F54218753BB2C3338236446C2.231E60582F487AD2C2FF5190717856CC"
            this.dy = "B3C5827F54218753BB2C3338236446C2.C9452B661E1DC4CFD77C4AB83C7CEBB8"
            this.dz = "B3C5827F54218753BB2C3338236446C2.696A7C8A5ACA3C080B0E3105B2C4BD88"
            this.dalpha = "B3C5827F54218753BB2C3338236446C2.B936AF6BCD25B420EE52AE32A21DE129"
            this.dbeta = "B3C5827F54218753BB2C3338236446C2.ED59CFE24F1C4611AA7A20621D1F8E23"
            this.dgamma = "B3C5827F54218753BB2C3338236446C2.4BD899CC820AF9D0499940A223CBE758"
            this.ddelta = "B3C5827F54218753BB2C3338236446C2.37AA451A6318DB27AAC1F1EDF9EEFE6D"
            this.depsilon = "B3C5827F54218753BB2C3338236446C2.85391321913204FA655C3F0A28C9DBFF"
            this.dzeta = "B3C5827F54218753BB2C3338236446C2.2D431004E8368179F97309DDAC2B4F9C"
            this.deta = "B3C5827F54218753BB2C3338236446C2.3C012304047EA726B99311650266FB31"
            this.dtheta = "B3C5827F54218753BB2C3338236446C2.F2F62CDD809DA0B593DF8D93DCEB2477"
            this.diota = "B3C5827F54218753BB2C3338236446C2.76FCE5EDB5CD54D6E7A98DC0DAFC192E"
            this.dkappa = "B3C5827F54218753BB2C3338236446C2.8433EAA7B72B5F221B146E622DA25705"
            this.dlambda = "B3C5827F54218753BB2C3338236446C2.3BF5EC6907A6FAA55813AA4A857E22DC"
            this.dmu = "B3C5827F54218753BB2C3338236446C2.F3F95EE1A0058B4FFFE1019B9C5DA015"
            this.dnu = "B3C5827F54218753BB2C3338236446C2.46FE8D13955387D26D58C8DF7077B436"
            this.dxi = "B3C5827F54218753BB2C3338236446C2.E5A482CC060D06B60CA16FD7D0D9E564"
            this.domicron = "B3C5827F54218753BB2C3338236446C2.01735F41154B04B30AA0ADC77512F996"
            this.dpi = "B3C5827F54218753BB2C3338236446C2.A70DA940CE76C1217F03376A3AC725FC"
            this.drho = "B3C5827F54218753BB2C3338236446C2.D4A1A1C6371A1D4DEB7A306D6A0792A3"
            this.dsigma = "B3C5827F54218753BB2C3338236446C2.608DC1601CC82A91EC5AC3CA6E4DC1A9"
            this.dtau = "B3C5827F54218753BB2C3338236446C2.A3F0E7D3B4BB5F793D29BE0A52481D80"
            this.dupsilon = "B3C5827F54218753BB2C3338236446C2.A667FE4CA9C5BE8E5894AB3AA73F8114"
            this.dphi = "B3C5827F54218753BB2C3338236446C2.0988454380B08A82CD269978E12F0032"
            this.dchi = "B3C5827F54218753BB2C3338236446C2.82E349EFDD48A4369E117293B8FAD669"
            this.dpsi = "B3C5827F54218753BB2C3338236446C2.F26042C7ADB1FDBBA1ED4422F06F8843"
            this.domega = "B3C5827F54218753BB2C3338236446C2.4E1B79BBE782D66E6058920C85B0A115"
            this.grad = "B3C5827F54218753BB2C3338236446C2.E37B6E74A3BD476DFDE7E0577B9E81D6.0615A38067B62382DC1667010669B238.A40B9DB0A4AB344566E5D1A4C04D8175" // (inverted delta) see nabla //
            this.div = "B3C5827F54218753BB2C3338236446C2.38696558DC98494C08D951C052900A2A"
            this.curl = "B3C5827F54218753BB2C3338236446C2.F6E57C9DE709E45FEB0D955351F53548"
            this.rad = "B3C5827F54218753BB2C3338236446C2.340F7C2DCAEDEAE68E4A62C281C7350B"
            this.degrees = "B3C5827F54218753BB2C3338236446C2.18DAEE01FC6E54AACD7F4C2EEF60FF4D"
            this.minutes = "B3C5827F54218753BB2C3338236446C2.640FD0CC0FFA0316AE087652871F4486"
            this.seconds = "B3C5827F54218753BB2C3338236446C2.783E8E29E6A8C3E22BAA58A19420EB4F"
            this.ellipses = "B3C5827F54218753BB2C3338236446C2.80016CA1EAD584DB2209B9BDD97C184F" // (...)
            this.vellipses = "B3C5827F54218753BB2C3338236446C2.BF14D7C0775BABB2A53051A0C8117FD4"
            this.perthousand = "B3C5827F54218753BB2C3338236446C2.58578BC584102DDC37D6754399D7AEBB"
            this.evaluate = "B3C5827F54218753BB2C3338236446C2.94D2F2AABFDA3169D54A9531CDB99890"
            this.evaluated = "B3C5827F54218753BB2C3338236446C2.4009274ECE2EFF888028CC06B63262EE"
            // JS CONDITIONAL //
            this.JSConditional = "24BD4C7C4859015A1B343B90943FBDB8"
            this.given = "24BD4C7C4859015A1B343B90943FBDB8.B9F4C1CC743AF7B09673BA380390D2F1"
            this.let = "24BD4C7C4859015A1B343B90943FBDB8.E1686078D1B60D351DA5A87543A2A663"
            this.if = "24BD4C7C4859015A1B343B90943FBDB8.39C8942E1038872A822C0DC75EEDBDE3"
            this.when = "24BD4C7C4859015A1B343B90943FBDB8.DF491A4DE50739FA9CFFDBD4E3F4B4BB"
            this.however = "24BD4C7C4859015A1B343B90943FBDB8.3E63AFD0565F7FA98D084139112A04D5"
            this.but = "24BD4C7C4859015A1B343B90943FBDB8.37598DAD8F8805CE708BA8C4F67CE367"
            this.else = "24BD4C7C4859015A1B343B90943FBDB8.2954E92A9B4D0E998FE4893F8141649A"
            this.then = "24BD4C7C4859015A1B343B90943FBDB8.0E5243D9965540F62AAC19A985F3F33E"
            this.though = "24BD4C7C4859015A1B343B90943FBDB8.23F9C1B08EF269EBF4B403ED833A5B03"
            this.may = "24BD4C7C4859015A1B343B90943FBDB8.9A4B6F884971DCB4A5172876B335BAAB"
            this.maynot = "24BD4C7C4859015A1B343B90943FBDB8.C62ADC79DC4DAC9A09A00F41184E79F9"
            this.must = "24BD4C7C4859015A1B343B90943FBDB8.D0E6EF34E76C41B0FAC84F608289D013"
            this.mustnot = "24BD4C7C4859015A1B343B90943FBDB8.B810C39E616D8234EFD7B1F532C5C4D3"
            this.isa = "24BD4C7C4859015A1B343B90943FBDB8.165A1761634DB1E9BD304EA6F3FFCF2B" // type membership (eg (float)a=1.0, (int)b=2: b isa a ((float)b == 2.0)) //
            this.hasa = "24BD4C7C4859015A1B343B90943FBDB8.B3E232550A910F3BCF9A2DFD8B6889DB" // class membership (eg b = 0, a hasa b (a.b==0)) //
            this.likewise = "24BD4C7C4859015A1B343B90943FBDB8.7DA2931FEBD860A8B7E5F3AE252649D0"
            this.that = "24BD4C7C4859015A1B343B90943FBDB8.21582C6C30BE1217322CDB9AEBAF4A59"
            this.which = "24BD4C7C4859015A1B343B90943FBDB8.8B7AF514F25F1F9456DCD10D2337F753"
            // ATTRIBUTES (29) //
            this.Attributes = "287234A1FF35A314B5B6BC4E5828E745"
            this.cross = "287234A1FF35A314B5B6BC4E5828E745.22AADB26447D87B550B155A4D764FAD0"
            this.acute = "287234A1FF35A314B5B6BC4E5828E745.56777C15206FB38E633E9CDC42E5F25E"
            this.grave = "287234A1FF35A314B5B6BC4E5828E745.386A023BD38FAB85CB531824BFE9A879"
            this.breve = "287234A1FF35A314B5B6BC4E5828E745.2D27A1B512EB5A2849B63C4C3C8E7285"
            this.circle = "287234A1FF35A314B5B6BC4E5828E745.9B6DDEBA5B33E577C07C35D8505C6072"
            this.dot = "287234A1FF35A314B5B6BC4E5828E745.69EB76C88557A8211CBFC9BEDA5FC062"
            this.ddot = "287234A1FF35A314B5B6BC4E5828E745.CDECE3125E27AE154680135F4283A946"
            this.dddot = "287234A1FF35A314B5B6BC4E5828E745.56C18CF734465837D5255AD7A872065E"
            this.vdddot = "287234A1FF35A314B5B6BC4E5828E745.385E50FC71FC4FB03FCCBBB5B2888AB2"
            this.bar = "287234A1FF35A314B5B6BC4E5828E745.37B51D194A7513E45B56F6524F2D51F2"
            this.vec = "287234A1FF35A314B5B6BC4E5828E745.EC99834B54FB5BC3D50F5FE0EFB9B93B"
            this.tilde = "287234A1FF35A314B5B6BC4E5828E745.8A30532E2E4FBAC1D59983C62D910902"
            this.hat = "287234A1FF35A314B5B6BC4E5828E745.46B5E59B2FD342BF8FEE10C561958725"
            this.check = "287234A1FF35A314B5B6BC4E5828E745.0BA4439EE9A46D9D9F14C60F88F45F87"
            this.widevec = "287234A1FF35A314B5B6BC4E5828E745.DAA18F424741D3508F5FE2970D62C6D9"
            this.widetilde = "287234A1FF35A314B5B6BC4E5828E745.B1E4B6929B306A11CEE06DA6A4AC089F"
            this.widehat = "287234A1FF35A314B5B6BC4E5828E745.F2859A57B22B9517095422F83A0767ED"
            this.overline = "287234A1FF35A314B5B6BC4E5828E745.1E1BA9E565C8EAAD8141C31EC521D762"
            this.underline = "287234A1FF35A314B5B6BC4E5828E745.6DC7B4483F8C2C701A48E42DB552806D"
            this.overstrike = "287234A1FF35A314B5B6BC4E5828E745.C85772FEA9AFE5562CBA7073960419E6"
            this.phantom = "287234A1FF35A314B5B6BC4E5828E745.0F06D368868F3B63B99C6BBBB6B52628"
            this.bold = "287234A1FF35A314B5B6BC4E5828E745.69DCAB4A73AEEC2113F69B61E6263DA8"
            this.ital = "287234A1FF35A314B5B6BC4E5828E745.7D1D6129EEC38BC345AC033E5EBD7350"
            this.size = "287234A1FF35A314B5B6BC4E5828E745.F7BD60B75B29D79B660A2859395C1A24"
            this.font = "287234A1FF35A314B5B6BC4E5828E745.47A282DFE68A42D302E22C4920ED9B5E"
            this.color = "287234A1FF35A314B5B6BC4E5828E745.70DDA5DFB8053DC6D1C492574BCE9BFD"
            this.black = "287234A1FF35A314B5B6BC4E5828E745.1FFD9E753C8054CC61456AC7FAC1AC89"
            this.blue = "287234A1FF35A314B5B6BC4E5828E745.48D6215903DFF56238E52E8891380C8F"
            this.green = "287234A1FF35A314B5B6BC4E5828E745.9F27410725AB8CC8854A2769C7A516B8"
            this.red = "287234A1FF35A314B5B6BC4E5828E745.BDA9643AC6601722A28F238714274DA4"
            this.cyan = "287234A1FF35A314B5B6BC4E5828E745.6411532BA4971F378391776A9DB629D3"
            this.magenta = "287234A1FF35A314B5B6BC4E5828E745.4C2A4A7078DA0AC6733464EACFD00F86"
            this.yellow = "287234A1FF35A314B5B6BC4E5828E745.D487DD0B55DFCACDD920CCBDAEAFA351"
            // BRACKETS (22) //
            this.Brackets = "16E127072878E35F572B8F19BDB4B686"
            this.ldbracket = "16E127072878E35F572B8F19BDB4B686.F26DC1E6C33FEE6CAB3EB6B9A61EF13C"
            this.rdbracket = "16E127072878E35F572B8F19BDB4B686.0039DEDA9F2873DA6E37F140CF3C5672"
            this.lbrace = "16E127072878E35F572B8F19BDB4B686.B352CF02A7C4178140FB2E341E09BE69"
            this.rbrace = "16E127072878E35F572B8F19BDB4B686.6EF4EC7AC8CD2F2A0D843DA498F78BFD"
            this.midbracket = "16E127072878E35F572B8F19BDB4B686.CAAE5938C6C83D12D2CAF634A0D2C0FF"
            this.langle = "16E127072878E35F572B8F19BDB4B686.133235EF214CD722341794894C930DC6"
            this.lparen = "16E127072878E35F572B8F19BDB4B686.152370721853AF95444F2F05AB29D4CC"
            this.rparen = "16E127072878E35F572B8F19BDB4B686.EC9962F64DBBC61B566D4D3478A4902A"
            this.lbracket = "16E127072878E35F572B8F19BDB4B686.60DD75115E02A517CFBA5580098AE1C8"
            this.rbracket = "16E127072878E35F572B8F19BDB4B686.53E2EDEE624B8B5A755C57C3DF9174F7"
            this.rangle = "16E127072878E35F572B8F19BDB4B686.12272094AC634E427FFF3D24DEDFA8ED"
            this.mline = "16E127072878E35F572B8F19BDB4B686.9C9CD2A991B4BFC47262F03DD32C30D0"
            this.lceil = "16E127072878E35F572B8F19BDB4B686.64538574DEA653366B5E0F3CC38042D8"
            this.rceil = "16E127072878E35F572B8F19BDB4B686.B25D6F7FD87F0075C1841CF64F4902F1"
            this.lfloor = "16E127072878E35F572B8F19BDB4B686.FD5848A957D6B2749418163CA977DDD5"
            this.rfloor = "16E127072878E35F572B8F19BDB4B686.FC071ABB127A6E4FFDB7D263CA8A959D"
            this.lline = "16E127072878E35F572B8F19BDB4B686.395A3518DFE90CF90436E7A5472FE239"
            this.rline = "16E127072878E35F572B8F19BDB4B686.5598E4F887EE6D56E378BA8F52183A46"
            this.ldline = "16E127072878E35F572B8F19BDB4B686.237F534D076368EB4F2B77ED611C2F2C"
            this.rdline = "16E127072878E35F572B8F19BDB4B686.58D143DBA2A81537F3105CF8633EFCCB"
            this.left = "16E127072878E35F572B8F19BDB4B686.811882FECD5C7618D7099EBBD39EA254"
            this.right = "16E127072878E35F572B8F19BDB4B686.7C4F29407893C334A6CB7A87BF045C0D"
            this.overbrace = "16E127072878E35F572B8F19BDB4B686.43B058DB2A84F6A24ED5F7733C7DDE90"
            this.underbrace = "16E127072878E35F572B8F19BDB4B686.F65AA98417693CCBF685175B97A03CDE"
            // FORMATS (16) //
            this.Formats = "0615A38067B62382DC1667010669B238"
            this.lsup = "0615A38067B62382DC1667010669B238.8E1590249E605DB0CF40F9CCE9A33FD4"
            this.lsub = "0615A38067B62382DC1667010669B238.DF3091049F00F5E4DA19C7A5E40D737F"
            this.csup = "0615A38067B62382DC1667010669B238.C13568F9F907EDA49DACB2C0516312A2"
            this.csub = "0615A38067B62382DC1667010669B238.7BC4EFEF75B26C671317940DC12D7E74"
            this.newline = "0615A38067B62382DC1667010669B238.85A422CA8625A1F6325C2E044756B4E3"
            this.nospace = "0615A38067B62382DC1667010669B238.C88902F0C148B2D15D173C4E36B8B962"
            this.alignl = "0615A38067B62382DC1667010669B238.5CA7D82CC58BF92CBCFCDCD9704DC5E5"
            this.alignc = "0615A38067B62382DC1667010669B238.4408C60B7D383AF6BA9A0F9B74591945"
            this.alignr = "0615A38067B62382DC1667010669B238.4A93460A4A3C76BD2597508CB35965B4"
            this.binom = "0615A38067B62382DC1667010669B238.B85F0BE5DF291EF6CCBEE99793AA6436"
            this.stack = "0615A38067B62382DC1667010669B238.FAC2A47ADACE059AFF113283A03F6760"
            this.matrix = "0615A38067B62382DC1667010669B238.21B72C0B7ADC5C7B4A50FFCB90D92DD6"
            this.raised = "0615A38067B62382DC1667010669B238.72E22A4ABCA7BA56C227D97D9D1664C8"
            this.carrot = "0615A38067B62382DC1667010669B238.005D05DE29487EC44CD07BD9D757D4E1"
            this.underscore = "0615A38067B62382DC1667010669B238.B81453378A0C6E5389111178CF249C11"
            this.carrot = "0615A38067B62382DC1667010669B238.005D05DE29487EC44CD07BD9D757D4E1"
            this.accent = "0615A38067B62382DC1667010669B238.727B79A9A430CCDDCF9260A381D5AB10"
            this.comma = "0615A38067B62382DC1667010669B238.B6D00DC1BA038E5901CD6C06B2DAA192"
            // OTHERS (19) //
            this.Others = "52EF9633D88A7480B3A938FF9EAA2A25"
            this.ampersand = "52EF9633D88A7480B3A938FF9EAA2A25.A096FD08AF89F16E286F268063C06AF6"
            this.infinity = "52EF9633D88A7480B3A938FF9EAA2A25.F2FDEE93271556E428DD9507B3DA7235"
            this.partial = "52EF9633D88A7480B3A938FF9EAA2A25.0E87C1212A698494DCDB198AF3E0EB2F"
            this.nabla = "52EF9633D88A7480B3A938FF9EAA2A25.A40B9DB0A4AB344566E5D1A4C04D8175.B3C5827F54218753BB2C3338236446C2.E37B6E74A3BD476DFDE7E0577B9E81D6" // (inverted delta) see grad //
            this.exists = "52EF9633D88A7480B3A938FF9EAA2A25.E087923EB5DD1310F5F25DDD5AE5B580"
            this.notexists = "52EF9633D88A7480B3A938FF9EAA2A25.967346152D46D220BC06DB883074C2BC"
            this.forall = "52EF9633D88A7480B3A938FF9EAA2A25.BC5ADB7B327F9E9C6CF0118AE402DA9C"
            this.hbar = "52EF9633D88A7480B3A938FF9EAA2A25.B15FE67D840F0F2E62ADECE4711AB740"
            this.lambdabar = "52EF9633D88A7480B3A938FF9EAA2A25.E49810E46C3D4E15528255CC705B4C06"
            this.re = "52EF9633D88A7480B3A938FF9EAA2A25.12ECCBDD9B32918131341F38907CBBB5"
            this.im = "52EF9633D88A7480B3A938FF9EAA2A25.73BEBCE395B6F1EFEDCF6842FBDB4D76"
            this.wp = "52EF9633D88A7480B3A938FF9EAA2A25.B6DDD84A9CC636257258701CA934E763"
            this.leftarrow = "52EF9633D88A7480B3A938FF9EAA2A25.F4C9E75CBFB03C31752E82D3CDB992D4"
            this.rightarrow = "52EF9633D88A7480B3A938FF9EAA2A25.71EAB150A00DA62F090F9AE58CD95893"
            this.uparrow = "52EF9633D88A7480B3A938FF9EAA2A25.F50488809B003987B9EA2CFE784C5949"
            this.downarrow = "52EF9633D88A7480B3A938FF9EAA2A25.CB2BB114DB4E1F6071D716165C6359A5"
            this.dotslow = "52EF9633D88A7480B3A938FF9EAA2A25.C418EF50A4FD499AC7FA3BE298CC979C"
            this.dotsaxis = "52EF9633D88A7480B3A938FF9EAA2A25.D93DF76E3CEFF82E813BCFEA6720B301"
            this.dotsvert = "52EF9633D88A7480B3A938FF9EAA2A25.D5AA7D3AFDFB87DB4D295EBD1D1D5EB1"
            this.dotsup = "52EF9633D88A7480B3A938FF9EAA2A25.EC78198ED283FA652430527AF5EFAD76"
            this.dotsdown = "52EF9633D88A7480B3A938FF9EAA2A25.31D44C8EC16D03925DD1CB6DC758ABC7"
            this.coord = "52EF9633D88A7480B3A938FF9EAA2A25.332DE775A36BBFCB140E1CAA06299A8A"
            this.plane = "52EF9633D88A7480B3A938FF9EAA2A25.BB302C9B5204D593BA3657055842A5FB"
            this.field = "52EF9633D88A7480B3A938FF9EAA2A25.06E3D36FA30CEA095545139854AD1FB9"
            this.surface = "52EF9633D88A7480B3A938FF9EAA2A25.D302E976C9DD527A9521A88C012437C5"
            this.dimension = "52EF9633D88A7480B3A938FF9EAA2A25.C4CF4802B30127A6AE42A1A1798C51B3"
            this.manifold = "52EF9633D88A7480B3A938FF9EAA2A25.0ABF4124CF945D4DAC960932DF21C5CF"
            this.brane = "52EF9633D88A7480B3A938FF9EAA2A25.130FD26E789BE8219D0A52BC937F082E"
            this.coords = "52EF9633D88A7480B3A938FF9EAA2A25.FB1B8C2E2FD04E6DE0A2608396C166A2"
            this.planes = "52EF9633D88A7480B3A938FF9EAA2A25.C1A023F6B6496FB16FBF036348A7ECF8"
            this.fields = "52EF9633D88A7480B3A938FF9EAA2A25.D05B6ED7D2345020440DF396D6DA7F73"
            this.surfaces = "52EF9633D88A7480B3A938FF9EAA2A25.6CBE7FCB7F606DA0DD4C40E888204569"
            this.dimensions = "52EF9633D88A7480B3A938FF9EAA2A25.F412B80E160B69732C123964AAE04302"
            this.manifolds = "52EF9633D88A7480B3A938FF9EAA2A25.C0EAD367328312039251EB25FA009914"
            this.branes = "52EF9633D88A7480B3A938FF9EAA2A25.DE8FD0BBFAF0974521D79D7417444D9A"
            // GREEK ALPHABET (23) //
            this.GreekAlpha = "AF30619F4CBE3AD9C135AEC6910A4805"
            this.alpha = "AF30619F4CBE3AD9C135AEC6910A4805.2C1743A391305FBF367DF8E4F069F9F9"
            this.ALPHA = "AF30619F4CBE3AD9C135AEC6910A4805.002101F8725E5C78D9F30D87F3FA4C87"
            this.beta = "AF30619F4CBE3AD9C135AEC6910A4805.987BCAB01B929EB2C07877B224215C92"
            this.BETA = "AF30619F4CBE3AD9C135AEC6910A4805.36B84F8E3FBA5BF993E3BA352D62D146"
            this.gamma = "AF30619F4CBE3AD9C135AEC6910A4805.05B048D7242CB7B8B57CFA3B1D65ECEA"
            this.GAMMA = "AF30619F4CBE3AD9C135AEC6910A4805.469BB22A9F1F560331B06CD6EF0DA944"
            this.delta = "AF30619F4CBE3AD9C135AEC6910A4805.63BCABF86A9A991864777C631C5B7617"
            this.DELTA = "AF30619F4CBE3AD9C135AEC6910A4805.A789408EC4DDAE81BD2F72AD5EC6BF3B"
            this.epsilon = "AF30619F4CBE3AD9C135AEC6910A4805.3CD38AB30E1E7002D239DD1A75A6DFA8"
            this.EPSILON = "AF30619F4CBE3AD9C135AEC6910A4805.48D3E3D06977AE5B32D170485108630A"
            this.zeta = "AF30619F4CBE3AD9C135AEC6910A4805.E26026B73CDC3B59012C318BA26B5518"
            this.ZETA = "AF30619F4CBE3AD9C135AEC6910A4805.50C26816BDD3BB2A02DEF8E11A5CD5A3"
            this.eta = "AF30619F4CBE3AD9C135AEC6910A4805.EBA021D91B44A97DEC2588BBEA58A447"
            this.ETA = "AF30619F4CBE3AD9C135AEC6910A4805.5E567BF650640C58E9455AD2EB4B05BC"
            this.theta = "AF30619F4CBE3AD9C135AEC6910A4805.61A74BE60D291CC4678AB46CC1CDAF91"
            this.THETA = "AF30619F4CBE3AD9C135AEC6910A4805.9B450EC4004F161C8681FBD7A7BB890A"
            this.iota = "AF30619F4CBE3AD9C135AEC6910A4805.57E5FBA4CE5B4CB9FFD595BEB63E7389"
            this.IOTA = "AF30619F4CBE3AD9C135AEC6910A4805.CF48DE754F3C78F9F785B889369E7794"
            this.kappa = "AF30619F4CBE3AD9C135AEC6910A4805.FE1480FF8B6ED22E7723CDA0145EF23D"
            this.KAPPA = "AF30619F4CBE3AD9C135AEC6910A4805.55B8000CC76D015E79C6FAF29593A5B6"
            this.lambda = "AF30619F4CBE3AD9C135AEC6910A4805.945F3FC449518A73B9F5F32868DB466C"
            this.LAMBDA = "AF30619F4CBE3AD9C135AEC6910A4805.64CD1DD4B2628444BAE372942CC36E91"
            this.mu = "AF30619F4CBE3AD9C135AEC6910A4805.89AA4B196B48C8A13A6549BB1EAEBD80"
            this.MU = "AF30619F4CBE3AD9C135AEC6910A4805.E5919BA9CF2E803BDBC98334A7F64DAA"
            this.nu = "AF30619F4CBE3AD9C135AEC6910A4805.0288BDE0C2D593F2B5766F61B826A650"
            this.NU = "AF30619F4CBE3AD9C135AEC6910A4805.9393CB701EFD9874F38BE79BCA77CFB9"
            this.xi = "AF30619F4CBE3AD9C135AEC6910A4805.D88468FB83A6D5675FCD2BDCB8FA57BF"
            this.XI = "AF30619F4CBE3AD9C135AEC6910A4805.1D5F160217CE219BEAB02B9A8EE9E52C"
            this.omicron = "AF30619F4CBE3AD9C135AEC6910A4805.9EBB8B7CC2672E7F024DF4EC210ED432"
            this.OMICRON = "AF30619F4CBE3AD9C135AEC6910A4805.A69A86ECD19ACD93FE2A7A0E83533DCB"
            this.pi = "AF30619F4CBE3AD9C135AEC6910A4805.72AB8AF56BDDAB33B269C5964B26620A"
            this.PI = "AF30619F4CBE3AD9C135AEC6910A4805.3A372B04B95323B72C2B2F9A5D24E67B"
            this.rho = "AF30619F4CBE3AD9C135AEC6910A4805.843A28DFDC5B2D5463BA2A7B83FDEC7C"
            this.RHO = "AF30619F4CBE3AD9C135AEC6910A4805.F9AA08BDD53C7D265D4F22EDC92EC26D"
            this.sigma = "AF30619F4CBE3AD9C135AEC6910A4805.E773536932C61C7EE11944CEFDE49E30"
            this.SIGMA = "AF30619F4CBE3AD9C135AEC6910A4805.0B1C668DFC6023057DDA34A2684E557A"
            this.tau = "AF30619F4CBE3AD9C135AEC6910A4805.4580C2740AB6D9222EF06D7C6865583E"
            this.TAU = "AF30619F4CBE3AD9C135AEC6910A4805.45ABFCF7BDA56C39BCA80F4CE426FBF6"
            this.upsilon = "AF30619F4CBE3AD9C135AEC6910A4805.36EA51C3032C76487ABC87F239BFFEAD"
            this.UPSILON = "AF30619F4CBE3AD9C135AEC6910A4805.E1AE7C8E685D767A14469F12CC6EF5E0"
            this.phi = "AF30619F4CBE3AD9C135AEC6910A4805.CB7A24BB7528F934B841B34C3A73E0C7"
            this.PHI = "AF30619F4CBE3AD9C135AEC6910A4805.7434B75669DA1D8610A2F9A91957DA81"
            this.chi = "AF30619F4CBE3AD9C135AEC6910A4805.1E6086B705C7161EEB93A8B249A5CA7C"
            this.CHI = "AF30619F4CBE3AD9C135AEC6910A4805.687F0D45F1666A6A46DBBC6CA57F3DAF"
            this.psi = "AF30619F4CBE3AD9C135AEC6910A4805.6115BAA419EBBDC15CB267C7BEC45D26"
            this.PSI = "AF30619F4CBE3AD9C135AEC6910A4805.E589FB6E29E4DF1B9F26B693CC39A295"
            this.omega = "AF30619F4CBE3AD9C135AEC6910A4805.C6D6BD7EBF806F43C76ACC3681703B81"
            this.OMEGA = "AF30619F4CBE3AD9C135AEC6910A4805.1D408DA87E4C838F8915BE22BC56387C"
        }
        var en = new g_TPTtoken()
        /*
var invEN = {}
for(var i in en){
   var w = en[i]
   if(!invEN[w]){
      invEN[w] = {}
   }
   for(var j in en){
        var x = en[j]
        if(!invEN[w][x]){
          invEN[w][x] = {}
        }
        invEN[w][x] = 1
   }
}*/
        
        var invEN = {}
        for (var i in en) {
            if (!invEN[i]) {
                invEN[i] = {}
            }
            for (var j in en) {
                if (!invEN[i][j]) {
                    invEN[i][j] = 1
                }
            }
        }
        srcTranslated.value = invEN.Print()
    },
    12: function() { // isa/hasa debugger //
        var Entity = new Object()
        function isa() {
            var y = arguments[1]
            var _x_ = arguments[0]
            var _y_ = arguments[1].toString()
            if (Entity[_x_]) {
                console.log('*** WARNING *** - Possible Object redefinition: name ( ' + _x_ + ' ) isa ( ' + _y_ + ' )')
            }
            Entity[_x_] = {}
            Entity[_x_].name = _x_
            Entity[_x_].isa = {}
            Entity[_x_].isa[_y_] = 1
            return Entity[_x_]
        }
        function hasa() {
            var y = arguments[1]
            var _x_ = arguments[0]
            var _y_ = arguments[1].toString()
            if (!Entity[_x_]) {
                Entity[_x_] = {}
                Entity[_x_].name = _x_
                Entity[_x_].hasa = {}
            }
            if (Entity[_x_].hasa[_y_]) {
                console.log('*** WARNING *** - Possible Object re-attribution: name ( ' + _x_ + ' ) hasa ( ' + _y_ + ' )')
            }
            Entity[_x_].hasa[_y_] = 1
            return Entity[_x_]
        }
        var EntityAnnotator = {
            'isa': isa,
            'hasa': hasa,
            'C21F969B5F03D33D43E04F8F136E7682': function(z) { // MD5('default') //
                console.log('Unexpected token ' + z)
            },
        }
        var s = srcCode.value.split(/\n+/)
        srcTranslated.value = s.map(function(v) {
            var b = v.split(/\s+/)
            if (EntityAnnotator[b[1]]) {
                v = EntityAnnotator[b[1]](b[0], b[2])
            } else {
                EntityAnnotator['C21F969B5F03D33D43E04F8F136E7682'](b[1])
            }
            return v
        }).Print()
    },
    13: function() { // buildSYMBOL[]() generator //
        srcTranslated.value = 'Processing..'
        var symbolsMAP = {
            // Unary / Binary Operators
            'Unary / Binary OPERATORS': '',
            'pos': '+',
            'neg': '-',
            'plusminus': '&PlusMinus;',
            'minusplus': '&MinusPlus;',
            'plus': '&plus;',
            'minus': '&minus;',
            'cdot': "\u22c5",
            'times': '&times;',
            'division': '&div;',
            'over': '----',
            'circ': "\u00b0",
            'wideslash': '\ue0a8',
            'widebslash': "\ue0a9",
            '&amp;&amp;': '&and;',
            '||': '&or;',
            'nor': '&oplus;',
            'nand': '&odot;',
            'xor': "\u2297",
            // RELATIONS (38)
            'Relations': '_______________',
            'lessthan': '&lt;',
            'greaterthan': '&gt;',
            'lessequal': '&le;',
            'le': '&le;',
            'leslant': '&les;',
            'greaterequal': '&ge;',
            'geslant': '&ges;',
            'muchless': '&ll;',
            'muchgreater': '&gg;',
            'equals': '&equals;',
            'minus': '&minus;',
            'noteq': '&ne;',
            'approx': '&approx;',
            'sim': '&sim;',
            'simeq': '&simeq;',
            'equiv': "\u2261",
            'prop': "\u221d",
            'parallel': '&parallel;',
            'ortho': "\u22a5",
            'divides': "\u2223",
            'ndivides': "\u2224",
            'toward': "\u2192",
            'dlarrow': "\u21d0",
            'dlrarrow': "\u21d4",
            'drarrow': "\u21d2",
            'prec': '&prec;',
            'succ': '&succ;',
            'preccurlyeq': '&preccurlyeq;',
            'succcurlyeq': '&succcurlyeq;',
            'precsim': '&precsim;',
            'succsim': '&succsim;',
            'nprec': '&nprec;',
            'nsucc': '&nsucc;',
            // SET OPERATIONS (21)
            'Set Operations': '__________',
            'in': '&in;',
            'notin': '&notin;',
            'owns': "\u220b",
            'intersection': '&Intersection;',
            'union': '&Union;',
            'setminus': '&setminus;',
            'slash': '/',
            'subset': '&subset;',
            'subseteq': '&subseteq;',
            'supset': '&supset;',
            'supseteq': '&supseteq;',
            'nsubset': '&nsubset;',
            'nsubseteq': '&nsubseteq;',
            'nsupset': '&nsupset;',
            'nsupseteq': '&nsupseteq;',
            'emptyset': '&emptyset;',
            'aleph': '&aleph;',
            'setn': "\u2115",
            'setz': "\u2124",
            'setq': "\u211a",
            'setr': "\u211d",
            'setc': "\u2102",
            // FUNCTIONS (24)
            'Functions': '_______________',
            'abs': '|',
            'fact': '!',
            'sqrt': '&Sqrt;',
            'nroot': '&Sqrt;',
            'func': 'f()',
            'ln': '',
            'exp': '',
            'log': '',
            'sin': '',
            'cos': '',
            'tan': '',
            'cot': '',
            'sec': '',
            'csc': '',
            'sinh': '',
            'cosh': '',
            'tanh': '',
            'coth': '',
            'arcsin': '',
            'arccos': '',
            'arctan': '',
            'arccot': '',
            'arsinh': '',
            'arcosh': '',
            'arctanh': '',
            'arcoth': '',
            // OPERATORS (39)
            'Operators': '_______________',
            'lim': '',
            'sum': '&sum;',
            'prod': '&prod;',
            'coprod': '&coprod;',
            'int': '&int;',
            'iint': '\u222c',
            'iiint': '&iiint;',
            'lint': '\u222e',
            'llint': '\u222f',
            'lllint': '\u2230',
            'from': '',
            'to': '',
            'of': '',
            'with': '',
            'da': '',
            'db': '',
            'dc': '',
            'dd': '',
            'de': '',
            'df': '',
            'dg': '',
            'dh': '',
            'di': '',
            'dj': '',
            'dk': '',
            'dl': '',
            'dm': '',
            'dn': '',
            'do': '',
            'dp': '',
            'dq': '',
            'dr': '',
            'ds': '',
            'dt': '',
            'du': '',
            'dv': '',
            'dw': '',
            'dx': '',
            'dy': '',
            'dz': '',
            'dtheta': 'd&theta;',
            'grad': '&nabla;',
            'div': '&nabla;\u22c5',
            'curl': '&nabla;&times;',
            'rad': '',
            'degrees': '&deg;',
            'minutes': "'",
            'seconds': '"',
            'ellipses': "\u22ef",
            'vellipses': "\u22ee",
            'perthousand': "\u2030",
            // JS CONDITIONALS
            'JS Conditionals': '_________',
            'given': '',
            'let': '',
            'likewise': '',
            'if': '',
            'when': '',
            'however': '',
            'but': '',
            'else': '',
            'then': '',
            'though': '',
            'may': '',
            'maynot': '',
            'must': '',
            'mustnot': '',
            'isa': '',
            'hasa': '',
            'and': '',
            'or': '',
            // ATTRIBUTES (29)
            'Attributes': '______________',
            'cross': '&cross;',
            'acute': '&acute;',
            'grave': '&grave;',
            'breve': '&breve;',
            'circle': '',
            'dot': ' \ue10c',
            'ddot': ' \ue30f',
            'dddot': ' \ue08bt',
            'vdddot': '\u22ee',
            'bar': '\ue30f',
            'vec': '&rightarrow;',
            'tilde': '&tilde;',
            'hat': '&circ;',
            'check': '&check;',
            'widevec': '&rightarrow;',
            'widetilde': '&tilde;',
            'widehat': '&circ;',
            'overline': '(text)',
            'underline': '(text)',
            'overstrike': '(text)',
            'phantom': '(text)',
            'bold': '(text)',
            'ital': '(text)',
            'size': '(text)',
            'font': '(text)',
            'color': '(text)',
            'black': '(text)',
            'blue': '(text)',
            'green': '(text)',
            'red': '(text)',
            'cyan': '(text)',
            'magenta': '(text)',
            'yellow': '(text)',
            // BRACKETS (22)
            'Brackets': '________________',
            'ldbracket': "\u27e6",
            'rdbracket': "\u27e7",
            'lbrace': '&lbrace;',
            'rbrace': '&rbrace;',
            'langle': '&langle;',
            'rangle': '&rangle;',
            'mline': '&mline;',
            'lceil': '&lceil;',
            'rceil': '&rceil;',
            'lfloor': '&lfloor;',
            'rfloor': '&rfloor;',
            'lline': '|',
            'rline': '|',
            'ldline': '&parallel;',
            'rdline': '&parallel;',
            'left': '',
            'right': '',
            'overbrace': '\u23de',
            'underbrace': '\u23df',
            '{': '(',
            '}': ')',
            // FORMATS (16)
            'Format': '__________________',
            'lsup': 'left-superscript',
            'lsub': 'left-subscript',
            'csup': '&csup;',
            'csub': '&csub;',
            'newline': '',
            'nospace': '',
            'alignl': '(text)',
            'alignc': '(text)',
            'alignr': '(text)',
            'binom': '',
            'stack': '',
            'matrix': '',
            '^': '',
            'raised': '^',
            '_': '',
            // OTHERS (19)
            'Other': '___________________',
            'infinity': '&infin;',
            'partial': '&part;',
            'nabla': '&nabla;',
            'exists': '&exist;',
            'notexists': '&nexist;',
            'forall': '&forall;',
            'hbar': '&hbar;',
            'lambdabar': '\u019b',
            're': '&Re;',
            'im': '&Im;',
            'wp': '&wp;',
            'leftarrow': '&leftarrow;',
            'rightarrow': '&rightarrow;',
            'uparrow': '&uparrow;',
            'downarrow': '&downarrow;',
            'dotslow': '\u2026',
            'dotsaxis': '\u22ef',
            'dotsvert': '\u22ee',
            'dotsup': "\u22f0",
            'dotsdown': "\u22f1",
            'coord': '',
            'plane': '',
            'field': '',
            'surface': '',
            'dimension': '',
            'manifold': '',
            'brane': '',
            'coords': '',
            'planes': '',
            'fields': '',
            'surfaces': '',
            'dimensions': '',
            'manifolds': '',
            'branes': '',
            // GREEK ALPHABET (23)
            'Greek Alphas': '____________',
            'alpha': '&alpha;',
            'ALPHA': '&Alpha;',
            'beta': '&beta;',
            'BETA': '&Beta;',
            'gamma': '&gamma;',
            'GAMMA': '&Gamma;',
            'delta': '&delta;',
            'DELTA': '&Delta;',
            'epsilon': '&epsilon;',
            'EPSILON': '&Epsilon;',
            'zeta': '&zeta;',
            'ZETA': '&Zeta;',
            'eta': '&eta;',
            'ETA': '&Eta;',
            'theta': '&theta;',
            'THETA': '&Theta;',
            'iota': '&iota;',
            'IOTA': '&Iota;',
            'kappa': '&kappa;',
            'KAPPA': '&Kappa;',
            'lambda': '&lambda;',
            'LAMBDA': '&Lambda;',
            'mu': '&mu;',
            'MU': '&Mu;',
            'nu': '&nu;',
            'NU': '&Nu;',
            'xi': '&xi;',
            'XI': '&Xi;',
            'omicron': '&omicron;',
            'OMICRON': '&Omicron;',
            'pi': '&pi;',
            'PI': '&Pi;',
            'rho': '&rho;',
            'RHO': '&Rho;',
            'sigma': '&sigma;',
            'SIGMA': '&Sigma;',
            'tau': '&tau;',
            'TAU': '&Tau;',
            'upsilon': '&upsilon;',
            'UPSILON': '&Upsilon;',
            'phi': '&phi;',
            'PHI': '&Phi;',
            'chi': '&chi;',
            'CHI': '&Chi;',
            'psi': '&psi;',
            'PSI': '&Phi;',
            'omega': '&omega;',
            'OMEGA': '&Omega;',
            // GREEK OPERATORS
            'Greek Operators': '_________',
            'dalpha': 'd&alpha;',
            'dbeta': 'd&beta;',
            'dgamma': 'd&gamma;',
            'ddelta': 'd&delta;',
            'depsilon': 'd&epsilon;',
            'dzeta': 'd&zeta;',
            'deta': 'd&eta;',
            'dtheta': 'd&theta;',
            'diota': 'd&iota;',
            'dkappa': 'd&kappa;',
            'dlambda': 'd&lambda;',
            'dmu': 'd&mu;',
            'dnu': 'd&nu;',
            'dxi': 'd&xi;',
            'domicron': 'd&omicron;',
            'dpi': 'd&pi;',
            'drho': 'd&rho;',
            'dsigma': 'd&sigma;',
            'dtau': 'd&tau;',
            'dupsilon': 'd&upsilon;',
            'dphi': 'd&phi;',
            'dchi': 'd&chi;',
            'dpsi': 'd&psi;',
            'domega': 'd&omega;',
        }
        
        var result = []
        for (var i in symbolsMAP) {
            result.push('"' + i + '"' + ':function(v){ return v.replace(/' + i + '/gm,"' + escape(symbolsMAP[i]) + '") },')
        }
        srcTranslated.value = result.join('\n')
    },
    14: function() { // number in quotes // escape // unescape //
        srcTranslated.value = 'Processing..'
        var s = srcCode.value.split('\n')
        srcTranslated.value = s.map(function(v) {
            return '"_' + v + '",'
        }).join('\n')
    },
    15: function() { // utf-8 code gen tool
        srcTranslated.value = 'Processing..'
        var status = {
            10: function() {
                return 'a'
            },
            11: function() {
                return 'b'
            },
            12: function() {
                return 'c'
            },
            13: function() {
                return 'd'
            },
            14: function() {
                return 'e'
            },
            15: function() {
                return 'f'
            },
        }
        function append(n) {
            var s
            if (n < 10) {
                s = n.toString()
            } else {
                s = status[n]()
            }
            return s
        }
        var result = []
        for (var i = 0; i < 16; i++) {
            for (var j = 0; j < 16; j++) {
                for (var k = 0; k < 16; k++) {
                    for (var n = 0; n < 16; n++) {
                        var r = [
                            append(i), 
                            append(j), 
                            append(k), 
                            append(n)
                        ]
                        result.push(r.join(''))
                    }
                }
            }
        }
        srcTranslated.value = result.join('\n')
    },
} // intf {}

function g_switch() {
    try {
        var result = arguments[0][arguments[1]]
    } catch (e) {
        var result = arguments[0]['default']
    }
    return result
}

function translatorTool() {
    g_switch(intf, selBox.selectedIndex)(srcCode.value)
}
