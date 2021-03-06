//Part 1

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
let x=0,y=0;
let visited=[[x,y]]
let queue=[
    [x,y+1,1,pp,rb,prog.slice(0)],
    [x,y-1,2,pp,rb,prog.slice(0)],
    [x-1,y,3,pp,rb,prog.slice(0)],
    [x+1,y,4,pp,rb,prog.slice(0)]
];
let test=p=>!queue2.some(v=>v[0]==p[0]&&v[1]==p[1])&&!visited.some(v=>v[0]==p[0]&&v[1]==p[1])
let queue2=[];
try {
    while (queue.length) {
	queue.forEach(p=>{
	    pp=p[3];
	    rb=p[4];
	    prog=p[5];
	    input=p[2];
	    x=p[0];
	    y=p[1];
	    while(getCmd(pp)!=99&&pp<prog.length&&output==null) codes[getCmd(pp)].run(...getParams(pp));
	    if (output==1) {
		if(test([x,y+1])) queue2.push([x,y+1,1,pp,rb,prog.slice(0)]);
		if(test([x,y-1])) queue2.push([x,y-1,2,pp,rb,prog.slice(0)]);
		if(test([x-1,y])) queue2.push([x-1,y,3,pp,rb,prog.slice(0)]);
		if(test([x+1,y])) queue2.push([x+1,y,4,pp,rb,prog.slice(0)]);
	    } else if (output==2) {
		throw "RESULTAT 1: "+(steps+1);
	    }
	    output=null;
	    visited.push([p[0],p[1]]);
	})
	queue=JSON.parse(JSON.stringify(queue2));
	queue2=[];
	steps++;
	console.log("step:"+steps+" queue:"+queue.length)
    }
} catch(e) {
    console.log(e);
}

// Part 2
visited=[[x,y]];
queue=[
    [x,y+1,1,pp,rb,prog.slice(0)],
    [x,y-1,2,pp,rb,prog.slice(0)],
    [x-1,y,3,pp,rb,prog.slice(0)],
    [x+1,y,4,pp,rb,prog.slice(0)]
];
queue2=[];
steps=0;
while (queue.length) {
    queue.forEach(p=>{
	pp=p[3];
	rb=p[4];
	prog=p[5];
	input=p[2];
	x=p[0];
	y=p[1];
	while(getCmd(pp)!=99&&pp<prog.length&&output==null) codes[getCmd(pp)].run(...getParams(pp));
	if (output==1) {
	    if(test([x,y+1])) queue2.push([x,y+1,1,pp,rb,prog.slice(0)]);
	    if(test([x,y-1])) queue2.push([x,y-1,2,pp,rb,prog.slice(0)]);
	    if(test([x-1,y])) queue2.push([x-1,y,3,pp,rb,prog.slice(0)]);
	    if(test([x+1,y])) queue2.push([x+1,y,4,pp,rb,prog.slice(0)]);
	}
	output=null;
	visited.push([p[0],p[1]]);
    })
    queue=JSON.parse(JSON.stringify(queue2));
    queue2=[];
    steps++;
    console.log("step:"+steps+" queue:"+queue.length)
}
