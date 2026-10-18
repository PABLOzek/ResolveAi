(() => {
 const api=window.RESOLVE_API_BASE||'http://localhost:3000';const $=s=>document.querySelector(s);
 const status=(m,t='')=>{const e=$('#registerStatus');e.hidden=false;e.textContent=m;e.className='api-status '+t};
 const request=async(path,body)=>{let r;try{r=await fetch(api+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})}catch{throw Error(`API indisponível em ${api}. Inicie o backend.`)}const text=await r.text();let d;try{d=text?JSON.parse(text):null}catch{d=text}if(!r.ok)throw Error(Array.isArray(d?.message)?d.message.join(' '):(d?.message||`Erro HTTP ${r.status}`));return d};
 async function image(file){if(!file)return null;if(file.size>3*1024*1024)throw Error('A foto deve ter no máximo 3 MB.');if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Use uma foto JPG, PNG ou WEBP.');return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(Error('Falha ao ler a foto.'));r.readAsDataURL(file)})}
 const w=$('#wantsProfessional'),f=$('#professionalFields');w.addEventListener('change',()=>f.hidden=!w.checked);
 $('#registerForm').addEventListener('submit',async e=>{e.preventDefault();const btn=$('#registerSubmit');btn.disabled=true;btn.textContent='Salvando…';try{
  const cpf=$('#cpf').value.replace(/\D/g,'');if(cpf.length!==11)throw Error('O CPF deve conter 11 números.');
  const city=$('#city').value.trim();
  if(w.checked&&!city)throw Error('Informe a cidade para criar o perfil profissional.');
  const fotoPerfil=w.checked?await image($('#photo').files[0]):null;
  const user=await request('/usuarios',{nome:$('#name').value.trim(),email:$('#email').value.trim(),cpf,telefone:$('#phone').value.trim()||null,data_nascimento:$('#birth').value||null});
  sessionStorage.setItem('resolveai_user_id',String(user.id));sessionStorage.setItem('resolveai_user_name',user.nome);
  if(w.checked){await request('/profissionais',{usuarioId:user.id,cidade,apresentacao:$('#bio').value.trim()||null,telefone:$('#phone').value.trim()||null,whatsapp:$('#phone').value.trim()||null,fotoPerfil});}
  status('Cadastro salvo no banco de dados. Você pode continuar explorando o Resolve Aí.','success');setTimeout(()=>location.href='home.html',900);
 }catch(err){status(err.message,'error')}finally{btn.disabled=false;btn.textContent='Criar conta'}});
})();
