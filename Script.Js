<!-- FILE: js/scripts.js -->
// Scripts para máscara simples e validação
document.addEventListener('DOMContentLoaded', function(){
// atualiza anos nos rodapés
const year = new Date().getFullYear();
document.getElementById('year')?.textContent = year;
document.getElementById('year2')?.textContent = year;
document.getElementById('year3')?.textContent = year;


// Máscara CPF
const cpf = document.getElementById('cpf');
if(cpf){
cpf.addEventListener('input', function(e){
let v = e.target.value.replace(/\D/g, '');
v = v.replace(/(\d{3})(\d)/, '$1.$2');
v = v.replace(/(\d{3})(\d)/, '$1.$2');
v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
e.target.value = v.slice(0,14);
});
}


// Máscara telefone
const tel = document.getElementById('telefone');
if(tel){
tel.addEventListener('input', function(e){
let v = e.target.value.replace(/\D/g, '');
if(v.length > 10){
v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
} else {
v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
}
e.target.value = v.slice(0,15);
});
}


// Máscara CEP
const cep = document.getElementById('cep');
if(cep){
cep.addEventListener('input', function(e){
let v = e.target.value.replace(/\D/g, '');
v = v.replace(/(\d{5})(\d)/, '$1-$2');
e.target.value = v.slice(0,9);
});
}


// Validação do formulário com mensagens simples
const form = document.getElementById('cadastroForm');
const formMessage = document.getElementById('formMessage');
if(form){
form.addEventListener('submit', function(ev){
ev.preventDefault();
if(!form.checkValidity()){
form.reportValidity();
formMessage.textContent = 'Por favor, corrija os campos em destaque.';
return;
}
// Simular envio
formMessage.textContent = 'Cadastro enviado com sucesso! Obrigado.';
form.reset();
});
}
});
