//Part 1
let map=document.getElementsByTagName("pre")[0].innerText.trim().split("\n").map(s=>s.split(""));
let nrKeys=document.getElementsByTagName("pre")[0].innerText.trim().match(/[a-z]/g).length;
let visited=map.map(row=>row.map(e=>{return {visits:[]}}));
let pos=[];
let pos2=[];
map.forEach((row,y)=>{if(row.some(e=>e=="@"))pos.push({x:row.indexOf("@"),y:y,keys:[]})});
let addPos=p=>{if(!visited[p.y][p.x].visits.some(v=>p.keys.every(k=>v.includes(k)))&&!pos2.some(v=>v.x==p.x&&v.y==p.y&&p.keys.every(k=>v.keys.some(vk=>vk==k))))pos2.push(p)}
let cntr=0;
try {
	while(cntr<10000) {
		pos2 = [];
		pos.forEach(p=>{
			let check = map[p.y][p.x]
			if(/[a-z]/.test(check) && !p.keys.some(k=>k==check))p.keys.push(check);
			if(p.keys.length==nrKeys) throw Exception;
			if(!(map[p.y][p.x+1] == "#" || (/[A-Z]/.test(map[p.y][p.x+1]) && !p.keys.some(k=>k==map[p.y][p.x+1].toLowerCase())))) addPos({x:p.x+1,y:p.y,keys:p.keys});
			if(!(map[p.y][p.x-1] == "#" || (/[A-Z]/.test(map[p.y][p.x-1]) && !p.keys.some(k=>k==map[p.y][p.x-1].toLowerCase())))) addPos({x:p.x-1,y:p.y,keys:p.keys});
			if(!(map[p.y+1][p.x] == "#" || (/[A-Z]/.test(map[p.y+1][p.x]) && !p.keys.some(k=>k==map[p.y+1][p.x].toLowerCase())))) addPos({x:p.x,y:p.y+1,keys:p.keys});
			if(!(map[p.y-1][p.x] == "#" || (/[A-Z]/.test(map[p.y-1][p.x]) && !p.keys.some(k=>k==map[p.y-1][p.x].toLowerCase())))) addPos({x:p.x,y:p.y-1,keys:p.keys});
			if(!visited[p.y][p.x].visits.some(v=>p.keys.every(k=>v.includes(k))))visited[p.y][p.x].visits.push(p.keys)
		})
		pos = JSON.parse(JSON.stringify(pos2));
		cntr++;
		if(cntr%100==0)console.log(cntr + " " + pos.length + " " + pos.reduce((best,p)=>Math.max(best, p.keys.length),0));
	}
} catch (e) {
	console.log("DONE: " + cntr);
}