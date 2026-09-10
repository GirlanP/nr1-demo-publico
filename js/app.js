const companies=[
{id:1,name:'Indústria Horizonte',legal:'Horizonte Industrial S.A.',segment:'Indústria',campaigns:3,responses:246,initials:'IH'},
{id:2,name:'Logística Atlântico',legal:'Atlântico Operações Ltda.',segment:'Logística',campaigns:2,responses:188,initials:'LA'},
{id:3,name:'Clínica Aurora',legal:'Aurora Saúde Integrada Ltda.',segment:'Saúde',campaigns:1,responses:94,initials:'CA'},
{id:4,name:'Grupo Veredas',legal:'Veredas Serviços Corporativos Ltda.',segment:'Serviços',campaigns:1,responses:132,initials:'GV'}];
const campaigns=[
{name:'Avaliação Psicossocial · Q3',company:'Indústria Horizonte',status:'open',label:'Em andamento',period:'01/09 — 20/09',responses:246,target:300,rate:82},
{name:'Diagnóstico Operacional · 2026',company:'Logística Atlântico',status:'open',label:'Em andamento',period:'04/09 — 25/09',responses:188,target:240,rate:78},
{name:'Ciclo Assistencial · Setembro',company:'Clínica Aurora',status:'open',label:'Em andamento',period:'08/09 — 30/09',responses:94,target:160,rate:59},
{name:'Avaliação Semestral · H1',company:'Grupo Veredas',status:'closed',label:'Encerrada',period:'10/03 — 31/03',responses:132,target:150,rate:88},
{name:'Piloto Lideranças',company:'Indústria Horizonte',status:'draft',label:'Rascunho',period:'Ainda não iniciado',responses:0,target:80,rate:0}];
const forms=[
{icon:'PS',name:'Avaliação Psicossocial',desc:'Instrumento demonstrativo com dimensões organizacionais e percepção do ambiente de trabalho.',questions:32,uses:4,status:'Publicado'},
{icon:'CL',name:'Clima e Organização',desc:'Modelo resumido para comunicação, liderança, reconhecimento e suporte.',questions:20,uses:2,status:'Publicado'},
{icon:'PL',name:'Pulso Organizacional',desc:'Questionário curto para ciclos frequentes de acompanhamento.',questions:12,uses:1,status:'Rascunho'}];
const risks=[
{label:'Sobrecarga de trabalho',sub:'Demanda e ritmo',value:'4,31',level:'critical',width:91},
{label:'Clareza de papel',sub:'Papéis e expectativas',value:'3,84',level:'high',width:80},
{label:'Reconhecimento',sub:'Valorização percebida',value:'3,67',level:'high',width:76},
{label:'Apoio da liderança',sub:'Suporte organizacional',value:'2,91',level:'moderate',width:58},
{label:'Autonomia',sub:'Controle sobre o trabalho',value:'2,28',level:'low',width:45}];
let activeCompanyId=1,toastTimer;
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
function renderCompanies(filter=''){
 const term=filter.trim().toLowerCase(),visible=companies.filter(c=>`${c.name} ${c.legal} ${c.segment}`.toLowerCase().includes(term));
 q('#companyCount').textContent=`${visible.length} empresa${visible.length===1?'':'s'}`;
 q('#companyGrid').innerHTML=visible.length?visible.map(c=>`<article class="company-card ${c.id===activeCompanyId?'active':''}"><div class="company-head"><div class="company-logo">${c.initials}</div><div><h4>${esc(c.name)}</h4><p>${esc(c.legal)}</p></div></div><div class="company-meta"><div><span>Segmento</span><strong>${esc(c.segment)}</strong></div><div><span>Campanhas</span><strong>${c.campaigns}</strong></div><div><span>Participações</span><strong>${c.responses}</strong></div><div><span>Ambiente</span><strong>Ativo</strong></div></div><div class="company-footer"><span class="status">Disponível</span><button class="enter" data-company="${c.id}">${c.id===activeCompanyId?'Empresa atual':'Acessar empresa'}</button></div></article>`).join(''):'<div class="empty">Nenhuma empresa demonstrativa encontrada.</div>';
 qa('[data-company]').forEach(b=>b.addEventListener('click',()=>setCompany(Number(b.dataset.company),true)));
}
function renderSelect(){q('#companySelect').innerHTML=companies.map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('');q('#companySelect').value=activeCompanyId}
function setCompany(id,go=false){activeCompanyId=id;const c=companies.find(x=>x.id===id)||companies[0];q('#activeCompanyTitle').textContent=c.name;q('#companySelect').value=id;renderCompanies(q('#companySearch').value);toast(`Contexto alterado para ${c.name}.`);if(go)switchView('dashboard')}
function renderRisks(){q('#riskBars').innerHTML=risks.map(r=>`<div class="bar-row"><div class="bar-label"><strong>${esc(r.label)}</strong><span>${esc(r.sub)}</span></div><div class="bar-track"><div class="bar-fill ${r.level}" style="width:${r.width}%"></div></div><div class="bar-value">${r.value}</div></div>`).join('')}
function renderCampaigns(filter='all'){const visible=filter==='all'?campaigns:campaigns.filter(c=>c.status===filter);q('#campaignList').innerHTML=visible.length?visible.map(c=>`<article class="campaign-card"><div><h4>${esc(c.name)}</h4><p>${esc(c.company)}</p></div><div class="metric"><span>Status</span><strong>${esc(c.label)}</strong></div><div class="metric hide-mid"><span>Período</span><strong>${esc(c.period)}</strong></div><div class="metric"><span>Participação</span><strong>${c.responses} / ${c.target}</strong><div class="progress"><i style="width:${c.rate}%"></i></div></div><button class="more demo-action">•••</button></article>`).join(''):'<div class="empty">Nenhuma campanha neste status.</div>';bindDemo()}
function renderForms(){q('#formsGrid').innerHTML=forms.map(f=>`<article class="form-card"><div class="form-icon">${f.icon}</div><h4>${esc(f.name)}</h4><p>${esc(f.desc)}</p><div class="form-meta"><span>${f.questions} perguntas</span><span>${f.uses} campanhas</span><span>${esc(f.status)}</span></div><div class="form-actions"><button class="ghost demo-action">Visualizar</button><button class="ghost demo-action">Duplicar</button></div></article>`).join('');bindDemo()}
function switchView(name){qa('.view').forEach(v=>v.classList.remove('active'));qa('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===name));const view=q(`#view-${name}`);view.classList.add('active');q('#pageTitle').textContent=view.dataset.title;q('#pageEyebrow').textContent=view.dataset.eyebrow;q('#topAction').textContent=name==='consultoria'?'Nova empresa':name==='campanhas'?'Nova campanha':name==='formularios'?'Novo formulário':'Exportar resumo';closeMenu();window.scrollTo({top:0,behavior:'smooth'})}
function toast(text='Esta ação foi simulada. Nenhum dado foi alterado.'){q('#toast p').textContent=text;q('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>q('#toast').classList.remove('show'),2500)}
function bindDemo(){qa('.demo-action').forEach(el=>{if(el.dataset.bound)return;el.dataset.bound='1';el.addEventListener('click',()=>toast())})}
function openMenu(){q('#sidebar').classList.add('open');q('#overlay').classList.add('show')}function closeMenu(){q('#sidebar').classList.remove('open');q('#overlay').classList.remove('show')}
function modal(open){q('#modal').classList.toggle('open',open);q('#modal').setAttribute('aria-hidden',open?'false':'true')}
qa('.nav-item').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));q('#companySearch').addEventListener('input',e=>renderCompanies(e.target.value));q('#companySelect').addEventListener('change',e=>setCompany(Number(e.target.value)));q('#menu').addEventListener('click',openMenu);q('#overlay').addEventListener('click',closeMenu);q('#tour').addEventListener('click',()=>modal(true));qa('[data-close]').forEach(e=>e.addEventListener('click',()=>modal(false)));qa('.filters button').forEach(b=>b.addEventListener('click',()=>{qa('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderCampaigns(b.dataset.filter)}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();modal(false)}});
renderCompanies();renderSelect();renderRisks();renderCampaigns();renderForms();bindDemo();
