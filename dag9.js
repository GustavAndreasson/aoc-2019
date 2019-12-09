//Part 1
let pp=0;
let rb=0;
let codes={
    1:{np:3, run:(a,b,c)=>{prog[c]=a+b;pp+=4}},
    2:{np:3, run:(a,b,c)=>{prog[c]=a*b;pp+=4}},
    3:{np:1, run:(a)=>{prog[a]=input.pop();pp+=2}},
    4:{np:1, run:(a)=>{console.log(prog[a]);output=prog[a];pp+=2}},
    5:{np:2, run:(a,b)=>{if(a){pp=b}else{pp+=3}}},
    6:{np:2, run:(a,b)=>{if(!a){pp=b}else{pp+=3}}},
    7:{np:3, run:(a,b,c)=>{prog[c]=a<b?1:0;pp+=4}},
    8:{np:3, run:(a,b,c)=>{prog[c]=a==b?1:0;pp+=4}},
	9:{np:1, run:(a)=>{rb+=a;pp+=2}},
    99:{np:0, run:()=>console.log("----------------SLUT------------")}
}
let getCmd=ptr=>parseInt(prog[ptr].toString().substr(-2))
let getParams=ptr=>prog.slice(ptr+1,ptr+1+codes[getCmd(ptr)].np).map((v,i)=>{
	let mode=prog[ptr].toString().charAt(prog[ptr].toString().length-3-i);
	if (mode=="1") return v;
	if (mode=="2") return (i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=5&&getCmd(ptr)!=6&&getCmd(ptr)!=9)?rb+v:prog[rb+v]||0;
	return (i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=5&&getCmd(ptr)!=6&&getCmd(ptr)!=9)?v:prog[v]||0;
})

prog=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
input=[1];
while(getCmd(pp)!=99&&pp<prog.length){codes[getCmd(pp)].run(...getParams(pp))}

//Part 2
pp=0;rb=0;input=[2];
prog=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
while(getCmd(pp)!=99&&pp<prog.length){codes[getCmd(pp)].run(...getParams(pp))}