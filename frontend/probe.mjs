const base = 'http://localhost:4000/api';
const login = await (await fetch(base + '/auth/login', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({username:process.env.NIP,password:process.env.BIRTH}) })).json();
const H = { authorization:'Bearer ' + login.token };
const g = async (p) => { try { const r = await fetch(base+p,{headers:H}); const j = await r.json(); return [r.status, j]; } catch(e){ return ['ERR', e.message]; } };
for (const p of ['/statistics/employees','/leave/transactions?DateStart='+new Date().toISOString().slice(0,10)+'&DateEnd='+new Date().toISOString().slice(0,10),'/temporary','/statistics/retired?id=history','/attendance/logs','/statistics/retired']) {
  const [st, j] = await g(p);
  const rows = Array.isArray(j) ? j : (j && j.data) ? j.data : null;
  console.log('\n### ' + p + '  status=' + st + '  n=' + (rows ? rows.length : 'n/a'));
  if (rows && rows[0]) console.log('keys: ' + Object.keys(rows[0]).join(', '));
  else console.log('shape: ' + JSON.stringify(j).slice(0,200));
}
process.exit(0);
