//Part 1
let obs={}
document.getElementsByTagName("pre")[0].innerText.split("\n").forEach(s=>{if(s)obs[s.match(/^(...)\)(...)$/)[2]]=s.match(/^(...)\)(...)$/)[1]})
let count=o=>obs[o]?1+count(obs[o]):0
Object.keys(obs).map(count).reduce((s,v)=>s+v)

//Part 2
path=o=>obs[o]?[o].concat(path(obs[o])):[]
path("YOU").filter(x=>!path("SAN").includes(x)).concat(path("SAN").filter(x=>!path("YOU").includes(x))).length-2