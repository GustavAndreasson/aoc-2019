//Part 1 non working

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
let output=null,input=0;
let steps=0;
let visited=[[0,0]]
let queue=[
    [0,1,1,pp,rb,prog.slice(0)],
    [0,-1,2,pp,rb,prog.slice(0)],
    [-1,0,3,pp,rb,prog.slice(0)],
    [1,0,4,pp,rb,prog.slice(0)]
];
let test=p=>!queue2.some(v=>v[0]==p[0]&&v[1]==p[1])&&!visited.some(v=>v[0]==p[0]&&v[1]==p[1])
let queue2=[];
try {
    while (queue.length&&steps<100) {
	queue.forEach(p=>{
	    pp=p[3];
	    rb=p[4];
	    prog=p[5];
	    input=p[2];
	    while(getCmd(pp)!=99&&pp<prog.length&&output==null) codes[getCmd(pp)].run(...getParams(pp));
	    if (output==1) {
		if(test([p[0],p[1]+1])) queue2.push([p[0],p[1]+1,1,pp,rb,prog.slice(0)]);
		if(test([p[0],p[1]-1])) queue2.push([p[0],p[1]-1,2,pp,rb,prog.slice(0)]);
		if(test([p[0]-1,p[1]])) queue2.push([p[0]-1,p[1],3,pp,rb,prog.slice(0)]);
		if(test([p[0]+1,p[1]])) queue2.push([p[0]+1,p[1],4,pp,rb,prog.slice(0)]);
	    } else if (output==2) {
		throw(new Exception);
	    }
	    output=null;
	    visited.push([p[0],p[1]]);
	})
	queue=JSON.parse(JSON.stringify(queue2));
	steps++;
	console.log("step:"+steps+" queue:"+queue.length)
    }
} catch(e) {
    console.log(e);
}
