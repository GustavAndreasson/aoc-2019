//Part 2

let pp=0;
let rb=0;
let codes={
    1:{np:3, run:(a,b,c)=>{prog[c]=a+b;pp+=4}},
    2:{np:3, run:(a,b,c)=>{prog[c]=a*b;pp+=4}},
    3:{np:1, run:(a)=>{prog[a]=input;pp+=2}},
    4:{np:1, run:(a)=>{output=a;pp+=2}},
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
    if (mode=="2") return (i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=4&&getCmd(ptr)!=5&&getCmd(ptr)!=6&&getCmd(ptr)!=9)?rb+v:prog[rb+v]||0;
    return (i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=4&&getCmd(ptr)!=5&&getCmd(ptr)!=6&&getCmd(ptr)!=9)?v:prog[v]||0;
})

let prog=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
prog[0]=2;
let output=null,input=0;
let screen=Array(100).fill(0).map(_=>Array(100).fill(0))
let os=0;
let x=0,y=0;
let px=20;
let points=0;
while(getCmd(pp)!=99&&pp<prog.length) {
    codes[getCmd(pp)].run(...getParams(pp));
	if (output!=null) {
		if (os==0) x=output;
		if (os==1) y=output;
		if (os==2) {
			if (x==-1&&y==0) {
				points=output;
			} else {
				screen[y][x]=output;
				if (output==4) input=Math.sign(x-px);
				if (output==3) px=x;
			}
			os=-1;
		}
		os++;
		output=null;
	}
}