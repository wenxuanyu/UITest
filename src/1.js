var o={prop:37}
const f=()=>{
    return this.prop;
}
o.b={g:f,prop:42}
console.log(o.b.f());