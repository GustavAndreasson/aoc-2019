//Part 1
let prog=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
let codes={1:{np:3, run:(a,b,c)=>prog[c]=a+b},2:{np:3, run:(a,b,c)=>prog[c]=a*b},3:{np:1, run:(a)=>prog[a]=1},4:{np:1, run:(a)=>console.log(prog[a])},99:{np:0, run:()=>console.log("----------------SLUT------------")}}
let getCmd=ptr=>parseInt(prog[ptr].toString().substr(-2))
let getParams=ptr=>prog.slice(ptr+1,ptr+1+codes[getCmd(ptr)].np).map((v,i)=>prog[ptr].toString().charAt(prog[ptr].toString().length-3-i)=="1"||i==codes[getCmd(ptr)].np-1?v:prog[v])
let pp=0;
while(getCmd(pp)!=99&&pp<prog.length){codes[getCmd(pp)].run(...getParams(pp));pp+=1+codes[getCmd(pp)].np}
