//Part 1
let pos=[];
document.getElementsByTagName("pre")[0].innerText.split("\n").forEach(s=>{let e=s.match(/<x=([-0-9]+), y=([-0-9]+), z=([-0-9]+)>/);e&&pos.push([parseInt(e[1]),parseInt(e[2]),parseInt(e[3])])});
let vel = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
let updateVel=()=>pos.forEach((p,i)=>pos.filter(p2=>p2!=p).forEach(p2=>p.forEach((v,j)=>{vel[i][j]+=Math.sign(p2[j]-v)})))
let updatePos=()=>pos.map((p,i)=>p.map((v,j)=>v+vel[i][j]))
for(let i=0;i<1000;i++){updateVel();pos=updatePos()}
let pe=pos.map(p=>p.reduce((s,v)=>Math.abs(s)+Math.abs(v)))
let ve=vel.map(p=>p.reduce((s,v)=>Math.abs(s)+Math.abs(v)))
pe[0]*ve[0]+pe[1]*ve[1]+pe[2]*ve[2]+pe[3]*ve[3]

//Part 2
pos=[];
document.getElementsByTagName("pre")[0].innerText.split("\n").forEach(s=>{let e=s.match(/<x=([-0-9]+), y=([-0-9]+), z=([-0-9]+)>/);e&&pos.push([parseInt(e[1]),parseInt(e[2]),parseInt(e[3])])});
vel = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
let spos=[];
document.getElementsByTagName("pre")[0].innerText.split("\n").forEach(s=>{let e=s.match(/<x=([-0-9]+), y=([-0-9]+), z=([-0-9]+)>/);e&&spos.push([parseInt(e[1]),parseInt(e[2]),parseInt(e[3])])});
let rots=[0,0,0];
let checkSame=dim=>pos.every((p,i)=>p[dim]==spos[i][dim]&&vel[i][dim]==0)
for(let i=0;i<1000000;i++){updateVel();pos=updatePos();rots=[0,1,2].map(d=>checkSame(d)?i+1:rots[d]);if(rots.every(r=>r!=0))break;}
//Found online calculator for finding least common multiple from the numbers i rots