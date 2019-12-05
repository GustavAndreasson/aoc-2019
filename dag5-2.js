//Part 2
let prog=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
let codes={
    1:{np:3, run:(a,b,c)=>{prog[c]=a+b;pp+=4}},
    2:{np:3, run:(a,b,c)=>{prog[c]=a*b;pp+=4}},
    3:{np:1, run:(a)=>{prog[a]=parseInt(prompt("INPUT"));pp+=2}},
    4:{np:1, run:(a)=>{console.log(prog[a]);pp+=2}},
    5:{np:2, run:(a,b)=>{if(a){pp=b}else{pp+=3}}},
    6:{np:2, run:(a,b)=>{if(!a){pp=b}else{pp+=3}}},
    7:{np:3, run:(a,b,c)=>{prog[c]=a<b?1:0;pp+=4}},
    8:{np:3, run:(a,b,c)=>{prog[c]=a==b?1:0;pp+=4}},
    99:{np:0, run:()=>console.log("----------------SLUT------------")}
}
let getCmd=ptr=>parseInt(prog[ptr].toString().substr(-2))
let getParams=ptr=>prog.slice(ptr+1,ptr+1+codes[getCmd(ptr)].np).map((v,i)=>prog[ptr].toString().charAt(prog[ptr].toString().length-3-i)=="1"||(i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=5&&getCmd(ptr)!=6)?v:prog[v])
let pp=0;
while(getCmd(pp)!=99&&pp<prog.length){codes[getCmd(pp)].run(...getParams(pp))}
