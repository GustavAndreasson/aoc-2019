//Part 1

let pp=[];
let rb=[];
let prog=[];
let output=null;
let input=[];
let state=[];
let target=[];
let x=[];
let crnt=0;
let codes={
    1:{np:3, run:(a,b,c)=>{prog[crnt][c]=a+b;pp[crnt]+=4}},
    2:{np:3, run:(a,b,c)=>{prog[crnt][c]=a*b;pp[crnt]+=4}},
    3:{np:1, run:(a)=>{let v=input[crnt].shift();prog[crnt][a]=(v==undefined?-1:v);pp[crnt]+=2}},
    4:{np:1, run:(a)=>{output=a;pp[crnt]+=2}},
    5:{np:2, run:(a,b)=>{if(a){pp[crnt]=b}else{pp[crnt]+=3}}},
    6:{np:2, run:(a,b)=>{if(!a){pp[crnt]=b}else{pp[crnt]+=3}}},
    7:{np:3, run:(a,b,c)=>{prog[crnt][c]=a<b?1:0;pp[crnt]+=4}},
    8:{np:3, run:(a,b,c)=>{prog[crnt][c]=a==b?1:0;pp[crnt]+=4}},
    9:{np:1, run:(a)=>{rb[crnt]+=a;pp[crnt]+=2}},
    99:{np:0, run:()=>{console.log("----------------SLUT------------");throw(new Exception);}}
}
let getCmd=ptr=>parseInt(prog[crnt][ptr].toString().substr(-2))
let getParams=ptr=>prog[crnt].slice(ptr+1,ptr+1+codes[getCmd(ptr)].np).map((v,i)=>{
    let mode=prog[crnt][ptr].toString().charAt(prog[crnt][ptr].toString().length-3-i);
    if (mode=="1") return v;
    if (mode=="2") return (i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=4&&getCmd(ptr)!=5&&getCmd(ptr)!=6&&getCmd(ptr)!=9)?rb[crnt]+v:prog[crnt][rb[crnt]+v]||0;
    return (i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=4&&getCmd(ptr)!=5&&getCmd(ptr)!=6&&getCmd(ptr)!=9)?v:prog[crnt][v]||0;
})
for (let i=0;i<50;i++) {
	prog[i]=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
	pp[i]=0;
	rb[i]=0;
	input[i]=[i];
	state[i]=0;
	target[i]=null;
	x[i]=null;
}
let stop=false;
let loop=0;
while (!stop&&loop<10000) {
	for (crnt=0;crnt<50;crnt++) {
		codes[getCmd(pp[crnt])].run(...getParams(pp[crnt]));
		if (output!=null) {
			if (state[crnt]==0) {
				target[crnt]=output;
			} else if (state[crnt]==1) {
				x[crnt]=output;
			} else {
				if (target[crnt]==255) {
					stop=true;
					console.log("RESULTAT:"+output);
					break;
				}
				input[target[crnt]].push(x[crnt]);
				input[target[crnt]].push(output);
				console.log(loop+": sending "+x[crnt]+","+output+" to "+target[crnt]);
			}
			state[crnt]=(state[crnt]+1)%3;
			output=null;
		}
	}
	loop++;
}