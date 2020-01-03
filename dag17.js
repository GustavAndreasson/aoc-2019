//Part 1

let pp=0;
let rb=0;
let codes={
    1:{np:3, run:(a,b,c)=>{prog[c]=a+b;pp+=4}},
    2:{np:3, run:(a,b,c)=>{prog[c]=a*b;pp+=4}},
    3:{np:1, run:(a)=>{prog[a]=input.shift();pp+=2}},
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
let output=null,input=[];
let map=Array(100).fill(0).map(_=>Array(100).fill("."))
let x=1,y=1;
while(getCmd(pp)!=99&&pp<prog.length) {
    codes[getCmd(pp)].run(...getParams(pp));
	if (output!=null) {
		if (output==10) {
			y++;
			x=1;
		} else {
			map[y][x]=String.fromCharCode(output);
			x++;
		}
		output=null;
	}
}
map.reduce((sum,row,y)=>sum+row.reduce((sum,cell,x)=>sum+(cell=="#"&&map[y-1][x]=="#"&&map[y+1][x]=="#"&&map[y][x-1]=="#"&&map[y][x+1]=="#"?(y-1)*(x-1)),0),0)

//Part 2

map.map(row=>row.join("")).join("\n");

/*
A "R,6,L,10,R,8,R,8,
B "R,12,L,8,L,10,
A "R,6,L,10,R,8,R,8,
C "R,12,L,10,R,6,L,10,
B "R,12,L,8,L,10,
C "R,12,L,10,R,6,L,10,
A "R,6,L,10,R,8,R,8,
B "R,12,L,8,L,10,
A "R,6,L,10,R,8,R,8,
C "R,12,L,10,R,6,L,10
*/

let inputString="A,B,A,C,B,C,A,B,A,C\n";
inputString+="R,6,L,10,R,8,R,8\n";
inputString+="R,12,L,8,L,10\n";
inputString+="R,12,L,10,R,6,L,10\n";
inputString+="n\n";

input=inputString.split("").map(l=>l.charCodeAt(0));
pp=0;
rb=0;
prog=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
prog[0]=2;
let string="";
while(getCmd(pp)!=99&&pp<prog.length) {
    codes[getCmd(pp)].run(...getParams(pp));
	if (output!=null) {
		if (output==10) {
			console.log(string);
		} else if (output<256) {
			string+=String.fromCharCode(output);
		} else {
			console.log("RESULTAT:" + output);
		}
		output=null;
	}
}