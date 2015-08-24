
function __import(e){
    srcTranslated.value = e.data.value
}

var file00 = "euclid.js.00"
var euclid = new Worker(file00)
euclid.addEventListener('message',__import,'logic.js')

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
    euclid.postMessage(srcCode.value)
}

