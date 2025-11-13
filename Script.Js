// ============================================
// SISTEMA ONG RENASCER - JavaScript Simplificado
// ============================================

// ============================================
// 1. VALIDAÇÃO DE FORMULÁRIO
// ============================================

// Função para validar nome completo
function validarNome(nome) {
    nome = nome.trim();
    
    if (nome.length < 3) {
        return "Nome deve ter pelo menos 3 caracteres";
    }
    
    const palavras = nome.split(' ');
    if (palavras.length < 2) {
        return "Digite nome e sobrenome";
    }
    
    return ""; // Retorna vazio se estiver OK
}

// Função para validar email
function validarEmail(email) {
    email = email.trim();
    
    if (email.length === 0) {
        return "Email é obrigatório";
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        return "Email inválido";
    }
    
    return "";
}

// Função para validar telefone
function validarTelefone(telefone) {
    const numeros = telefone.replace(/\D/g, '');
    
    if (numeros.length < 10) {
        return "Telefone deve ter 10 ou 11 dígitos";
    }
    
    return "";
}

// Função para validar data de nascimento
function validarDataNascimento(data) {
    if (!data) {
        return "Data de nascimento é obrigatória";
    }
    
    const dataNasc = new Date(data);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNasc.getFullYear();
    
    if (idade < 16) {
        return "Você deve ter pelo menos 16 anos";
    }
    
    return "";
}

// Função para formatar telefone automaticamente
function formatarTelefone(telefone) {
    const numeros = telefone.replace(/\D/g, '');
    
    if (numeros.length === 11) {
        return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numeros.length === 10) {
        return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
}

// ============================================
// 2. ARMAZENAMENTO LOCAL (LocalStorage)
// ============================================

// Salvar voluntário no navegador
function salvarVoluntario(voluntario) {
    // Buscar voluntários já salvos
    let voluntarios = buscarVoluntarios();
    
    // Adicionar ID e data
    voluntario.id = Date.now();
    voluntario.dataCadastro = new Date().toLocaleDateString();
    
    // Adicionar novo voluntário
    voluntarios.push(voluntario);
    
    // Salvar no localStorage
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
}

// Buscar todos os voluntários
function buscarVoluntarios() {
    const dados = localStorage.getItem('voluntarios');
    return dados ? JSON.parse(dados) : [];
}

// Deletar voluntário
function deletarVoluntario(id) {
    let voluntarios = buscarVoluntarios();
    voluntarios = voluntarios.filter(v => v.id !== id);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
}

// Limpar todos os dados
function limparTodosDados() {
    localStorage.removeItem('voluntarios');
}

// ============================================
// 3. MANIPULAÇÃO DO FORMULÁRIO
// ============================================

// Mostrar mensagem de erro
function mostrarErro(campo, mensagem) {
    const elementoErro = document.getElementById('erro-' + campo);
    if (elementoErro) {
        elementoErro.textContent = mensagem;
        elementoErro.style.display = 'block';
        elementoErro.style.color = 'red';
        elementoErro.style.fontSize = '14px';
        elementoErro.style.marginTop = '5px';
    }
}

// Limpar mensagem de erro
function limparErro(campo) {
    const elementoErro = document.getElementById('erro-' + campo);
    if (elementoErro) {
        elementoErro.textContent = '';
        elementoErro.style.display = 'none';
    }
}

// Mostrar mensagem de sucesso
function mostrarSucesso(mensagem) {
    const div = document.createElement('div');
    div.textContent = mensagem;
    div.style.backgroundColor = '#4CAF50';
    div.style.color = 'white';
    div.style.padding = '15px';
    div.style.marginBottom = '20px';
    div.style.borderRadius = '5px';
    div.style.textAlign = 'center';
    
    const form = document.getElementById('formulario-cadastro');
    form.insertBefore(div, form.firstChild);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => div.remove(), 5000);
}

// ============================================
// 4. CONFIGURAR FORMULÁRIO
// ============================================

function configurarFormulario() {
    const form = document.getElementById('formulario-cadastro');
    if (!form) return;
    
    // Configurar formatação automática do telefone
    const campoTelefone = document.getElementById('telefone');
    if (campoTelefone) {
        campoTelefone.addEventListener('input', function() {
            this.value = formatarTelefone(this.value);
        });
    }
    
    // Validar campos ao sair deles (blur)
    const campoNome = document.getElementById('nome');
    if (campoNome) {
        campoNome.addEventListener('blur', function() {
            const erro = validarNome(this.value);
            if (erro) {
                mostrarErro('nome', erro);
            } else {
                limparErro('nome');
            }
        });
    }
    
    const campoEmail = document.getElementById('email');
    if (campoEmail) {
        campoEmail.addEventListener('blur', function() {
            const erro = validarEmail(this.value);
            if (erro) {
                mostrarErro('email', erro);
            } else {
                limparErro('email');
            }
        });
    }
    
    // Quando o formulário for enviado
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede envio padrão
        
        // Pegar valores dos campos
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const dataNascimento = document.getElementById('data-nascimento').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const areaInteresse = document.getElementById('area-interesse').value;
        const mensagem = document.getElementById('mensagem').value;
        const termos = document.getElementById('termos').checked;
        
        // Pegar disponibilidades marcadas
        const checkboxes = document.querySelectorAll('input[name="disponibilidade"]:checked');
        const disponibilidades = Array.from(checkboxes).map(cb => cb.value);
        
        // Validar todos os campos
        let temErro = false;
        
        const erroNome = validarNome(nome);
        if (erroNome) {
            mostrarErro('nome', erroNome);
            temErro = true;
        }
        
        const erroEmail = validarEmail(email);
        if (erroEmail) {
            mostrarErro('email', erroEmail);
            temErro = true;
        }
        
        const erroTelefone = validarTelefone(telefone);
        if (erroTelefone) {
            mostrarErro('telefone', erroTelefone);
            temErro = true;
        }
        
        const erroData = validarDataNascimento(dataNascimento);
        if (erroData) {
            mostrarErro('data-nascimento', erroData);
            temErro = true;
        }
        
        if (!cidade || cidade.trim().length < 3) {
            mostrarErro('cidade', 'Cidade é obrigatória');
            temErro = true;
        }
        
        if (!estado) {
            mostrarErro('estado', 'Selecione um estado');
            temErro = true;
        }
        
        if (!areaInteresse) {
            mostrarErro('area-interesse', 'Selecione uma área de interesse');
            temErro = true;
        }
        
        if (disponibilidades.length === 0) {
            mostrarErro('disponibilidade', 'Selecione pelo menos uma disponibilidade');
            temErro = true;
        }
        
        if (!termos) {
            mostrarErro('termos', 'Você deve aceitar os termos');
            temErro = true;
        }
        
        // Se tiver erro, não salva
        if (temErro) {
            alert('Por favor, corrija os erros do formulário');
            return;
        }
        
        // Criar objeto do voluntário
        const voluntario = {
            nome: nome,
            email: email,
            telefone: telefone,
            dataNascimento: dataNascimento,
            cidade: cidade,
            estado: estado,
            areaInteresse: areaInteresse,
            disponibilidade: disponibilidades,
            mensagem: mensagem
        };
        
        // Salvar no localStorage
        salvarVoluntario(voluntario);
        
        // Mostrar mensagem de sucesso
        mostrarSucesso('Cadastro realizado com sucesso!');
        
        // Limpar formulário
        form.reset();
        
        // Atualizar estatísticas se estiver na página inicial
        atualizarEstatisticas();
    });
}

// ============================================
// 5. EXIBIR VOLUNTÁRIOS CADASTRADOS
// ============================================

function exibirVoluntarios() {
    const container = document.getElementById('lista-voluntarios');
    if (!container) return;
    
    const voluntarios = buscarVoluntarios();
    
    if (voluntarios.length === 0) {
        container.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
        return;
    }
    
    let html = '<h3>Voluntários Cadastrados: ' + voluntarios.length + '</h3>';
    
    voluntarios.forEach(function(v) {
        html += `
            <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;">
                <h4>${v.nome}</h4>
                <p><strong>Email:</strong> ${v.email}</p>
                <p><strong>Telefone:</strong> ${v.telefone}</p>
                <p><strong>Cidade:</strong> ${v.cidade} - ${v.estado}</p>
                <p><strong>Área:</strong> ${v.areaInteresse}</p>
                <p><strong>Cadastrado em:</strong> ${v.dataCadastro}</p>
                <button onclick="removerVoluntario(${v.id})" style="background: red; color: white; padding: 8px 15px; border: none; border-radius: 3px; cursor: pointer;">
                    Remover
                </button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Função para remover voluntário
function removerVoluntario(id) {
    if (confirm('Deseja realmente remover este voluntário?')) {
        deletarVoluntario(id);
        exibirVoluntarios();
        atualizarEstatisticas();
    }
}

// ============================================
// 6. ESTATÍSTICAS
// ============================================

function atualizarEstatisticas() {
    const container = document.getElementById('estatisticas');
    if (!container) return;
    
    const voluntarios = buscarVoluntarios();
    const total = voluntarios.length;
    
    // Contar por área
    const porArea = {};
    voluntarios.forEach(function(v) {
        if (porArea[v.areaInteresse]) {
            porArea[v.areaInteresse]++;
        } else {
            porArea[v.areaInteresse] = 1;
        }
    });
    
    let html = '<h3>Estatísticas</h3>';
    html += '<p><strong>Total de Voluntários:</strong> ' + total + '</p>';
    
    if (total > 0) {
        html += '<h4>Por Área de Interesse:</h4><ul>';
        for (let area in porArea) {
            html += '<li>' + area + ': ' + porArea[area] + ' voluntário(s)</li>';
        }
        html += '</ul>';
    }
    
    container.innerHTML = html;
}

// ============================================
// 7. INICIALIZAR SISTEMA
// ============================================

// Quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // Atualizar ano no rodapé
    const anoSpan = document.getElementById('ano');
    if (anoSpan) {
        anoSpan.textContent = new Date().getFullYear();
    }
    
    // Configurar formulário de cadastro
    configurarFormulario();
    
    // Exibir voluntários se estiver na página de listagem
    exibirVoluntarios();
    
    // Atualizar estatísticas
    atualizarEstatisticas();
    
    // Botão para limpar todos os dados
    const btnLimpar = document.getElementById('btn-limpar-tudo');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            if (confirm('ATENÇÃO: Isso vai deletar TODOS os voluntários. Tem certeza?')) {
                limparTodosDados();
                exibirVoluntarios();
                atualizarEstatisticas();
                alert('Todos os dados foram removidos!');
            }
        });
    }
});
const botao = document.getElementById("modo-escuro");

// alterna o tema
botao.addEventListener("click", () => {
  const html = document.documentElement;
  const temaAtual = html.getAttribute("data-tema");

  if (temaAtual === "escuro") {
    html.removeAttribute("data-tema");
    localStorage.setItem("tema", "claro");
  } else {
    html.setAttribute("data-tema", "escuro");
    localStorage.setItem("tema", "escuro");
  }
});

// aplica o tema salvo quando recarregar
const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "escuro") {
  document.documentElement.setAttribute("data-tema", "escuro");
}

