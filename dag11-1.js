//Part 1
let pp=0;
let rb=0;
let codes={
    1:{np:3, run:(a,b,c)=>{prog[c]=a+b;pp+=4}},
    2:{np:3, run:(a,b,c)=>{prog[c]=a*b;pp+=4}},
    3:{np:1, run:(a)=>{prog[a]=input;pp+=2}},
    4:{np:1, run:(a)=>{output=prog[a];pp+=2}},
    5:{np:2, run:(a,b)=>{if(a){pp=b}else{pp+=3}}},
    6:{np:2, run:(a,b)=>{if(!a){pp=b}else{pp+=3}}},
    7:{np:3, run:(a,b,c)=>{prog[c]=a<b?1:0;pp+=4}},
    8:{np:3, run:(a,b,c)=>{prog[c]=a==b?1:0;pp+=4}},
    9:{np:1, run:(a)=>{rb+=a;pp+=2}},
    99:{np:0, run:()=>{console.log("----------------SLUT------------");throw(new Exception);}}
}
let getCmd=ptr=>parseInt(prog[ptr].toString().substr(-2))
let getParams=ptr=>prog.slice(ptr+1,ptr+1+codes[getCmd(ptr)].np).map((v,i)=>{
    let mode=prog[ptr].toString().charAt(prog[ptr].toString().length-3-i);
    if (mode=="1") return v;
    if (mode=="2") return (i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=5&&getCmd(ptr)!=6&&getCmd(ptr)!=9)?rb+v:prog[rb+v]||0;
    return (i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=5&&getCmd(ptr)!=6&&getCmd(ptr)!=9)?v:prog[v]||0;
})

let prog=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
let input=0;
let dir=0;
let painted=[];
let visited=[];
let x=0,y=0;
let output=null;
while(getCmd(pp)!=99&&pp<prog.length){
    input=painted.some(p=>p.toString()==[x,y].toString())?1:0;
    while(output==null)	codes[getCmd(pp)].run(...getParams(pp));
    if (output) {
	if (!painted.some(p=>p.toString()==[x,y].toString())) painted.push([x,y]);
    } else {
	painted = painted.filter(p=>p.toString()!=[x,y].toString()); 
    }
    if (!visited.some(p=>p.toString()==[x,y].toString())) visited.push([x,y]);
    output=null;
    while(output==null)	codes[getCmd(pp)].run(...getParams(pp));
    dir=output?(dir+1)%4:(dir+3)%4;
    output=null;
    if (dir==0) y--;
    if (dir==2) y++;
    if (dir==1) x++;
    if (dir==3) x--;
}
