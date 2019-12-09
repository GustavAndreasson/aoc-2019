//Part 1
b = document.getElementsByTagName("pre")[0].innerText.split("")
c=[]
while(b.length>1)c.push(b.splice(0,150))
bl=c.reduce((best,l)=>l.filter(x=>x==0).length<best.filter(x=>x==0).length?l:best)
bl.filter(x=>x==1).length*bl.filter(x=>x==2).length