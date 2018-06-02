
function loader() { // function loader ()
    srcCode.value = ''
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
    var result
    if(arguments[0]==false){
        result = JSON.stringify(this)
    } else {
        result = JSON.stringify(this, 1, 1)
    }
    return result
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

 
var statements = []
var entity = {}

var intf = {
    'default': function() {
        srcTranslated.value = 'Functionality not implemented.'
    }, // intf 'default'
    0: function(){ // Procedural-Designer //
        var obj = srcCode.value.split(/\n+/)
        obj.map(function(w){
            var b = w.split(/\./)
            var _obj = b[0]
            if(!entity[_obj]){
                entity[_obj] = {}
            }
            b.map(function(v,i,me){
                entity[_obj][v] = new Function('','')
                return v
            })
            return w
        })
        statements.push(entity)
        srcTranslated.value = statements.Print()
    }
} // intf {}

function generate_code(){

}

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
