//Part 1
map=[]
document.getElementsByTagName("pre")[0].innerText.split("\n").forEach((r,y)=>r.split("").forEach((c,x)=>{if(c=="#")map.push([x,y])}))
let blocks=(a,b)=>Math.abs(a[0])<=Math.abs(b[0])&&Math.abs(a[1])<=Math.abs(b[1])&&(a[0]!=b[0]||a[1]!=b[1])&&Math.sign(a[0])==Math.sign(b[0])&&Math.sign(a[1])==Math.sign(b[1])&&((a[0]==0&&b[0]==0)||(a[1]/a[0]==b[1]/b[0]))
let nrVisible=ast=>map.map(a=>[a[0]-ast[0],a[1]-ast[1]]).filter((a,i,arr)=>!arr.some(a2=>blocks(a2,a))).length
map.reduce((best,cur)=>nrVisible(cur)>best?nrVisible(cur):best,0)-1 //astroid can see itself

//Part 2
let pos=map.reduce((best,cur)=>nrVisible(cur)>nrVisible(best)?cur:best,[0,0])
let angle=p=>(Math.atan2(p[1],p[0])*180/Math.PI+450)%360
let sortValue=p=>angle(p)+map.map(a=>[a[0]-pos[0],a[1]-pos[1]]).filter(a=>blocks(a,p)).length*1000
let t200=map.map(a=>[a[0]-pos[0],a[1]-pos[1]]).sort((a,b)=>sortValue(a)-sortValue(b))[200] //account for [0,0]
[t200[0]+pos[0],t200[1]+pos[1]]
