//Part 2

let codes={
    1:{np:3, run:(a,b,c)=>{prog[activeAmp][c]=a+b;pp[activeAmp]+=4}},
    2:{np:3, run:(a,b,c)=>{prog[activeAmp][c]=a*b;pp[activeAmp]+=4}},
    3:{np:1, run:(a)=>{prog[activeAmp][a]=input.pop();pp[activeAmp]+=2}},
    4:{np:1, run:(a)=>{output=prog[activeAmp][a];pp[activeAmp]+=2}},
    5:{np:2, run:(a,b)=>{if(a){pp[activeAmp]=b}else{pp[activeAmp]+=3}}},
    6:{np:2, run:(a,b)=>{if(!a){pp[activeAmp]=b}else{pp[activeAmp]+=3}}},
    7:{np:3, run:(a,b,c)=>{prog[activeAmp][c]=a<b?1:0;pp[activeAmp]+=4}},
    8:{np:3, run:(a,b,c)=>{prog[activeAmp][c]=a==b?1:0;pp[activeAmp]+=4}},
    99:{np:0, run:()=>done=true}
}
let getCmd=ptr=>parseInt(prog[activeAmp][ptr].toString().substr(-2))
let getParams=ptr=>prog[activeAmp].slice(ptr+1,ptr+1+codes[getCmd(ptr)].np).map((v,i)=>prog[activeAmp][ptr].toString().charAt(prog[activeAmp][ptr].toString().length-3-i)=="1"||(i==codes[getCmd(ptr)].np-1&&getCmd(ptr)!=5&&getCmd(ptr)!=6)?v:prog[activeAmp][v])

let runAmp=inp=>{
    input=inp;
    while(getCmd(pp[activeAmp])!=99&&getCmd(pp[activeAmp])!=4&&pp[activeAmp]<prog[activeAmp].length){
	try{
	    codes[getCmd(pp[activeAmp])].run(...getParams(pp[activeAmp]))
	}catch(e){
	    console.log(inp);
	    throw(e);
	}
    }
    codes[getCmd(pp[activeAmp])].run(...getParams(pp[activeAmp]));
}
let output=0;
let input=[];
let activeAmp=0;
let pp=[];
let done=false;
let prog=[];
let runSeq=seq=>{
    output=0;
    pp=[0,0,0,0,0]
    activeAmp=0;
    done=false;
    let loops=0;
    for(let i=0;i<5;i++)prog[i]=document.getElementsByTagName("pre")[0].innerText.split(",").map(v=>parseInt(v));
    while (!done&&loops<10000) {
	seq.forEach((phase,i)=>{
	    activeAmp=i;
	    runAmp(loops?[output]:[output,phase]);
	})
	loops++;
    }
}
let combs=[]
[5,6,7,8,9].forEach(a=>[5,6,7,8,9].filter(x=>x!=a).forEach(b=>[5,6,7,8,9].filter(x=>x!=a&&x!=b).forEach(c=>[5,6,7,8,9].filter(x=>x!=a&&x!=b&&x!=c).forEach(d=>[5,6,7,8,9].filter(x=>x!=a&&x!=b&&x!=c&&x!=d).forEach(e=>combs.push([a,b,c,d,e]))))))
combs.reduce((best,cmb)=>{runSeq(cmb);return Math.max(best,output)},0)
