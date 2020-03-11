var socket = io.connect('http://localhost:3000',{'forceNew':true});

function getProfileTemplate(profile){
  var html = profile.map((elem, index)=>{
    return(`<div>
          <h1>Hola ${profile.firstname}!</h1>
          <p>Te has logueado.</p>
          <div class="form-group">
            <button id="logout" class="btn btn-danger">Logout</button>
          </div>
       </div>`);
  }).join(' ');
}

function profileController(){
  document.getElemtById('logout')
  .addEventListener('click', function(e){
    e.preventDefault();
    socket.emit('user.logout');
    delete localStorage.token;
    getRoute();
  });
}

function getCreateAccountTemplate(){
  var html = profile.map((elem, index)=>{
    return(`<form id="create-account-form">
              <h1>Crear cuenta</h1>
              <div class="form-group">
                <label>Nombre</label>
                <input id="firstname" class="form-control"/>
              </div>
              <div class="form-group">
                <label>Apellido</label>
                <input id="lastname" class="form-control"/>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input id="email" type="email" class="form-control"/>
              </div>
              <div class="form-group">
                <label>Contraseña</label>
                <input id="password" type="password" class="form-control"/>
              </div>
              <div class="form-group">
                <button id="logout" class="btn btn-success">Crear Cuenta</button>
                &nbsp; or &nbsp;
                <a href="#/" class="btn btn-default">Login</a>
              </div>
              <div id="messages"></div>
          </form>`);
  }).join(' ');
}

function createAccountController(){
  document.getElementById('create-account-form')
  .addEventListener('submit',function(e){
    e.preventDefault();
    var user={
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      firstname: document.getElementById('firstname').value,
      lastname:document.getElementById('lastname').value
    };
    socket.emit('user.create', user);
  });
}

function getLoginTemplate(){
  var html = profile.map((elem, index)=>{
    return(`<form id="login-form">
              <h1>Login</h1>
              <div class="form-group">
                <label>Email</label>
                <input id="email" type="email" class="form-control"/>
              </div>
              <div class="form-group">
                <label>Contraseña</label>
                <input id="password" type="password" class="form-control"/>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">Login</button>
                &nbsp; or &nbsp;
                <a href="#/create-account" class="btn btn-default">Crear Cuenta</a>
              </div>
              <div id="messages"></div>
          </form>`);
  }).join(' ');
}

function loginController(){
  document.getElementById('login-form')
    .addEventListener('submit', function(e){
      e.preventDefault();

      var user={
        email: document.getElementById('email').value,
        password:document.getElementById('password').value
      };
      socket.emit('user.login', user);
    });
}

function renderTemplate(tpl){
  document.getElemtById('main-container').innerHTML=tpl;
}

function userLoggedIn(date){
    localStorage.token=data.token;
    renderTemplate(getProfileTemplate(data.profile));
    profileController(data);
}

function getRoute(){
  if(document.location.hash ==='#/create-account'){
    renderTemplate(getCreateAccountTemplate());
    createAccountController();
    return;
  }
  renderTemplate(getLoginTemplate());
  loginController();
}

function showError(data){
  alert(data.message);
}

(function(){
  socket.on('user.create.error',showError());
  socket.on('user.get.success',userLoggedIn());
  socket.on('user.login.error',showError());
  window.addEventListener('hashchange', getRoute);
  getRoute();
  if(localStorage.token){
    socket.emit('user.get', localStorage.token);
  }
}());

function render(data){
    var html = data.map((elem,index)=>{
      return(`<div id="m">
      <strong>${elem.author}</strong>:
      <em>${elem.text}</em>
      </div>`);
      }).join(' ');

    document.getElementById('messages').innerHTML=html;
}

//Funcion de autenticación de usuario
function addMessage(e){
    console.log(document.getElementById('texto').value);
    document.getElementById('but').disabled = true;
    var data ={
        user: document.getElementById('texto').value,
        password : document.getElementById('pass').value
    };
    console.log('emitting new message');
  
    socket.emit('user.login', data);
    return false;
}

function changeType(e){

}