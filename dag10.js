map=[]
document.getElementsByTagName("pre")[0].innerText.split("\n").forEach((r,y)=>r.split("").forEach((c,x)=>{if(c=="#")map.push([x,y])}))
let blocks=(a,b)=>Math.abs(a[0])<=Math.abs(b[0])&&Math.abs(a[1])<=Math.abs(b[1])&&(a[0]!=b[0]||a[1]!=b[1])&&Math.sign(a[0])==Math.sign(b[0])&&Math.sign(a[1])==Math.sign(b[1])&&((a[0]==0&&b[0]==0)||(a[1]/a[0]==b[1]/b[0]))
let nrVisible=ast=>map.map(a=>[a[0]-ast[0],a[1]-ast[1]]).filter((a,i,arr)=>!arr.some(a2=>blocks(a2,a))).length
map.reduce((best,cur)=>nrVisible(cur)>best?nrVisible(cur):best,0)-1
