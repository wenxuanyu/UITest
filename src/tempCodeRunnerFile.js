var o={prop:37}
function f(){
    console.log(this.prop+"1");
    return this.prop;
}
console.log("111")
o.b={g:f,prop:42}
console.log(o.b.g());