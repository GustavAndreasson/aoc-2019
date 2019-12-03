//Part 1
let i = document.getElementsByTagName("pre")[0].innerText.split("\n")
let x=0;
let y=0;
move=(d,s)=>{let dx=0;let dy=0;if(d=="R"){dx=s}if(d=="L"){dx=-s}if(d=="U"){dy=s}if(d=="D"){dy=-s}y+=dy;x+=dx;return[x-dx,y-dy,x,y]}
wire1=i[0].split(",").map(i=>i.match(/^([RLUD])([0-9]+)$/)).map(i=>move(i[1],parseInt(i[2])))
x=0;y=0;
wire2=i[1].split(",").map(i=>i.match(/^([RLUD])([0-9]+)$/)).map(i=>move(i[1],parseInt(i[2])))
let cross=(a1,a2)=>{if(Math.min(a1[0],a1[2])<Math.max(a2[0],a2[2])&&Math.min(a2[0],a2[2])<Math.max(a1[0],a1[2])&&Math.min(a1[1],a1[3])<Math.max(a2[1],a2[3])&&Math.min(a2[1],a2[3])<Math.max(a1[1],a1[3])){ return a1[0]==a1[2]?Math.abs(a1[0])+Math.abs(a2[1]):Math.abs(a2[0])+Math.abs(a1[1]);}return 999999999999;}
wire2.reduce((res,arc)=>Math.min(wire1.reduce((lres,larc)=>Math.min(cross(arc,larc),lres), 999999999),res), 999999999)
