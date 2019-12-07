//Part 1

let codes={
    1:{np:3, run:(a,b,c)=>{prog[c]=a+b;pp+=4}},
    2:{np:3, run:(a,b,c)=>{prog[c]=a*b;pp+=4}},
    3:{np:1, run:(a)=>{prog[a]=input.pop();pp+=2}},
    4:{np:1, run:(a)=>{console.log(prog[a]);output=prog[a];pp+=2}},
    5:{np:2, run:(a,b)=>{if(a){pp=b}else{pp+=3}}},
    6:{np:2, run:(a,b)=>{if(!a){pp=b}else{pp+=3}}},
    7:{np:3, run:(a,b,c)=>{prog[c]=a<b?1:0;pp+=4}},
    8:{np:3, run:(a,b,c)=>{prog[c]=a==b?1:0;pp+=4}},
    99:{np:0, run:()=>console.log("----------------SLUT------------")}
}
let getCmd=ptr=>parseInt(prog[ptr].toString().substr(-2))
let getParams=ptr=>prog.slice(ptr+1,ptr+1+codes[getCmd(ptr)].np).map((v,i)=>prog[ptr].toString().charAt(prog[ptr].toString().length-3-i)=="1"||(i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=5&&getCmd(ptr)!=6)?v:prog[v])

let runAmp=inp=>{
    prog=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
    pp=0;
    input=inp;
    while(getCmd(pp)!=99&&pp<prog.length){try{codes[getCmd(pp)].run(...getParams(pp))}catch(e){console.log(inp);throw(e)}}
}
let output=0
let input=[]
let runSeq=seq=>{output=0;seq.forEach(phase=>runAmp([output,phase]))}
let combs=[]
[0,1,2,3,4].forEach(a=>[0,1,2,3,4].filter(x=>x!=a).forEach(b=>[0,1,2,3,4].filter(x=>x!=a&&x!=b).forEach(c=>[0,1,2,3,4].filter(x=>x!=a&&x!=b&&x!=c).forEach(d=>[0,1,2,3,4].filter(x=>x!=a&&x!=b&&x!=c&&x!=d).forEach(e=>combs.push([a,b,c,d,e]))))))
combs.reduce((best,cmb)=>{runSeq(cmb);return Math.max(best,output)},0)
