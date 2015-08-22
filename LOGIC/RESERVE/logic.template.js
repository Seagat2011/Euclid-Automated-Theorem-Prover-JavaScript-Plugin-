
function __import(e){
    srcTranslated.value = e.data.value.join('\n')
    var sentence = e.data.value
}

var file00 = "mysql-wn-data.99.sql.js.00"
var mysql_wn_data_99 = new Worker(file00)
mysql_wn_data_99.addEventListener('message',__import,'logic.js')

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
    mysql_wn_data_99.postMessage(srcCode.value)
}

