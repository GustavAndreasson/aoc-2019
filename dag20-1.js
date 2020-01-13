//Part 1

let map=document.getElementsByTagName("pre")[0].innerText.split("\n").map(row=>row.split("").map(c=>c=="."?[]:c.match(/[A-Z]/)?c:0))
let portals={};
let dirs=[];
let startY=0,startX=0,endY=0,endX=0;
let handlePortal=(key,pos)=>{
    if (key=="AA") {
        startY=pos[0];
        startX=pos[1];
    } else if(key=="ZZ") {
        endY=pos[0];
        endX=pos[1];
    } else {
        let port=portals[key];
        if (port) {
            dirs.push(port);
            map[port[0]][port[1]].push(pos);
        } else {
            portals[key]=pos;
        }
    }
}
for (let y=0;y<map.length;y++)
    for (let x=0;x<map[y].length;x++) {
        if(Array.isArray(map[y][x])) {
            dirs=[]
            if (typeof map[y-1][x] == "string") handlePortal(map[y-2][x]+map[y-1][x],[y,x]);
            if (typeof map[y+1][x] == "string") handlePortal(map[y+1][x]+map[y+2][x],[y,x]);
            if (typeof map[y][x-1] == "string") handlePortal(map[y][x-2]+map[y][x-1],[y,x]);
            if (typeof map[y][x+1] == "string") handlePortal(map[y][x+1]+map[y][x+2],[y,x]);
            if (Array.isArray(map[y-1][x])) dirs.push([y-1,x]);
            if (Array.isArray(map[y+1][x])) dirs.push([y+1,x]);
            if (Array.isArray(map[y][x-1])) dirs.push([y,x-1]);
            if (Array.isArray(map[y][x+1])) dirs.push([y,x+1]);
            map[y][x]=dirs;
        } 
    }

let queue=[[startY,startX]];
let queue2=[];
let done=false;
let steps=0;
while (!done&&queue.length>0&&steps<1000) {
    queue.forEach(p=>{
        if (Array.isArray(map[p[0]][p[1]])) {
            map[p[0]][p[1]].forEach(n=>{
                if (n[0]==endY&&n[1]==endX) {
                    done=true;
                } else if (Array.isArray(map[n[0]][n[1]])) {
                    queue2.push(n);
                }
            })
            map[p[0]][p[1]]=0;
        }
    })
    queue=JSON.parse(JSON.stringify(queue2));
    queue2=[];
    steps++;
    console.log("step:"+steps+" queue:"+queue.length);
}
