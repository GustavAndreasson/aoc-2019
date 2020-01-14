//Part 2

let map=[]
let statmap=document.getElementsByTagName("pre")[0].innerText.split("\n").map(row=>row.split("").map(c=>c=="."?[]:c.match(/[A-Z]/)?c:0))
let portals={};
let startY=0,startX=0,endY=0,endX=0;
let addPortal=(key,pos)=>{
	if (key=="AA") {
		startY=pos[0];
		startX=pos[1];
	} else if(key=="ZZ") {
		endY=pos[0];
		endX=pos[1];
	} else {
		if(!portals[key]) portals[key]={outer:null,inner:null};
		if(pos[0]==2||pos[0]==statmap.length-4||pos[1]==2||pos[1]==statmap[0].length-3) {
			portals[key].outer=pos;
		} else {
			portals[key].inner=pos;
		}
	}
}
statmap.forEach((row,y)=>row.forEach((c,x)=>{
	if(Array.isArray(c)) {
		if (typeof statmap[y-1][x] == "string") addPortal(statmap[y-2][x]+statmap[y-1][x],[y,x]);
		if (typeof statmap[y+1][x] == "string") addPortal(statmap[y+1][x]+statmap[y+2][x],[y,x]);
		if (typeof statmap[y][x-1] == "string") addPortal(statmap[y][x-2]+statmap[y][x-1],[y,x]);
		if (typeof statmap[y][x+1] == "string") addPortal(statmap[y][x+1]+statmap[y][x+2],[y,x]);
	}
}))
portals=Object.values(portals);
let buildLevel=level=>{
	console.log("Building level " + level);
	map[level]=[];
	for (let y=0;y<statmap.length;y++) {
		map[level][y]=[];
		for (let x=0;x<statmap[y].length;x++) {
			if(Array.isArray(statmap[y][x])) {
				let dirs=[];
				if (level!=0) {
					portals.filter(p=>p.outer[0]==y&&p.outer[1]==x).forEach(p=>{
						dirs.push([level-1,p.inner[0],p.inner[1]])
					});
				}
				portals.filter(p=>p.inner[0]==y&&p.inner[1]==x).forEach(p=>{
					dirs.push([level+1,p.outer[0],p.outer[1]])
				});
				if (Array.isArray(statmap[y-1][x])) dirs.push([level,y-1,x]);
				if (Array.isArray(statmap[y+1][x])) dirs.push([level,y+1,x]);
				if (Array.isArray(statmap[y][x-1])) dirs.push([level,y,x-1]);
				if (Array.isArray(statmap[y][x+1])) dirs.push([level,y,x+1]);
				map[level][y][x]=dirs;
			} 
		}
	}
}
buildLevel(0);

let queue=[[0,startY,startX]];
let queue2=[];
let done=false;
let steps=0;
while (!done&&queue.length>0&&steps<10000) {
    queue.forEach(p=>{
        if (Array.isArray(map[p[0]][p[1]][p[2]])) {
            map[p[0]][p[1]][p[2]].forEach(n=>{
				if (!map[n[0]]) buildLevel(n[0]);
                if (n[0]==0&&n[1]==endY&&n[2]==endX) {
                    done=true;
                } else if (Array.isArray(map[n[0]][n[1]][n[2]])) {
                    queue2.push(n);
                }
            })
            map[p[0]][p[1]][p[2]]=0;
        }
    })
    queue=JSON.parse(JSON.stringify(queue2));
    queue2=[];
    steps++;
    console.log("step:"+steps+" queue:"+queue.length);
}
