// Mock de banco de dados (em memória)
let users = [];
let loggedInUser = null;

// Função para mostrar a aba de login
function showLoginForm() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
}

// Função para mostrar a aba de cadastro
function showRegisterForm() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

// Verifica se o usuário já está logado
function checkLoginStatus() {
  if (loggedInUser) {
    window.location.href = 'home.html' 
  }
}

// Função de login
function login(email, password) {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    loggedInUser = user;
    alert('Login bem-sucedido!');
    window.location.href = 'home.html';
  } else {
    alert('você não possui login, registre-se!', register);
  }
}

// Função de cadastro
function register(name, email, password, address) {
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    alert('Este email já está cadastrado!');
  } else {
    const newUser = { name, email, password, address };
    users.push(newUser);
    alert('Cadastro realizado com sucesso!');
    showLoginForm(login);
  }
}

// Evento de submit do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  login(email, password);
});

// Evento de submit do formulário de cadastro
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const address = document.getElementById('address').value;
  register(name, email, password, address);
});

// Links para trocar entre login e cadastro
document.getElementById('showRegister').addEventListener('click', showRegisterForm);
document.getElementById('showLogin').addEventListener('click', showLoginForm);

// Chama a função para verificar o login quando a página de login é carregada
checkLoginStatus();