//Part 1
let a = document.getElementsByTagName("pre")[0].innerText.split("\n")
a.pop()
a.map(v=>(Math.floor(v/3)-2)).reduce((tot, val)=>tot+val)

//Part 2
let fnc=v=>{let s=0;let b=Math.floor(v/3)-2;while(b>0){ s+=b; b=Math.floor(b/3)-2;} return s}
a.map(fnc).reduce((tot, val)=>tot+val)