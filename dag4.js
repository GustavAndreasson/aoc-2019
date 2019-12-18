//Part 1
let test=n=>n.toString().split("").every((c,i,a)=>i==0||c>=a[i-1])&&n.toString().split("").some((c,i,a)=>i!=0&&c==a[i-1])
Array(746325-264360+1).fill().map((_,i)=>i+264360).filter(test).length

//Part 2
test=n=>n.toString().split("").every((c,i,a)=>i==0||c>=a[i-1])&&n.toString().split("").some((c,i,a)=>i!=0&&c==a[i-1]&&(i<=1||c!=a[i-2])&&(i>=5||c!=a[i+1]))
Array(746325-264360+1).fill().map((_,i)=>i+264360).filter(test).length