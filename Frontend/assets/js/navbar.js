document.addEventListener("DOMContentLoaded", function () {
    let navbar=document.getElementById('navbar');
    let uneteANosotros=document.getElementById('botonUnete');

    //Funcion que carga el navbar, cuando el usuario esta deslogueado
    function navbarLogOut() {
        navbar.innerHTML= `
        <a class="logo_navbar" href=""><img src="./assets/img/icon/logo.png" alt=""></a>
                        <div class="navbar_enlaces">
                            <div id="listadoMenu">
                                <ul>
                                    <li><a href="#reci-clando">Iniciativa</a></li>
                                    <li><a href="#comoFunciona">Beneficios</a></li>
                                    <li><a href="#comoEmpezar">¿Cómo reciclar?</a></li>
                                    <li><a href="./blog.html">Blog</a></li>
                                    <li><a href="#formIndex">Contacto</a></li>
                                </ul>
                            </div>
                            <div class="banner_button">
                                <a id="botonInicioDeSesionIndex" class="banner_button_login" href="./iniciodesesion.html">Ingresar</a><!--inicio de sesión-->
                                <a id="botonRegistro" class="banner_button_signUp" href="./registro.html">Registrarse</a><!--Registrarse>-->
                            </div>
                        </div>
    `;
    };

    function indexBoton(){
        uneteANosotros.style.display='none';
    };

    function navbarLogOutBlog() {
        navbar.innerHTML= `
        <a class="logo_navbar" href=""><img src="./assets/img/icon/logo.png" alt=""></a>
                        <div class="navbar_enlaces">
                            <div>
                                <a id="botonInicioDeSesionIndex"  href="./index.html"><p>Inicio</p></a>
                            </div>
                            <div class="banner_button">
                                <a id="botonInicioDeSesionIndex" class="banner_button_login" href="./iniciodesesion.html">Ingresar</a><!--inicio de sesión-->
                                <a id="botonRegistro" class="banner_button_signUp" href="./registro.html">Registrarse</a><!--Registrarse>-->
                            </div>
                        </div>
    `;
    };

   
    //Funcion que carga el navbar, cuando el usuario esta logueado
    function navbarLogin(){
        navbar.innerHTML=`
        <a class="logo_navbar" href="./index.html" ><img src="./assets/img/icon/logo.png" alt=""></a>
            <div class="navbar_enlaces_logIn">
                    <div id="botonRecompensasLogin" class="navbarLogIn_banner_button">
                        <a class="banner_button_login" href="./login.html">Juegos</a>
                    </div>
                    <div class="navbarLogIn_banner_button">
                        <a class="banner_button_login" href="./blog.html">Blog</a>
                    </div>
                    <div class="banner_button_monedero">
                        <p>Monedero $ </p><p id="contenidoMonedero"></p>
                    </div>
                    <a href="" class="logOut" id="logOut" ><img src="./assets/img/landingimg/logout.png" alt="" srcset="" ></a>
            </div>
        `;

        document.getElementById('logOut').addEventListener('click', function (event) {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            localStorage.clear(); // Limpiar el localStorage
            window.location.href = "./index.html"; // Redirigir a la página de inicio o a la página deseada después del logout
        });
    };

    function navbarJuegos(){
        navbar.innerHTML=`
        <a class="logo_navbar" href="./index.html" ><img src="./assets/img/icon/logo.png" alt=""></a>
            <div class="navbar_enlaces_logIn">
                    <div id="botonJuegosLogin" class="navbarLogIn_banner_button">
                        <a class="banner_button_login" href="./recompensas.html">Recompensas</a>
                    </div>
                    <div class="navbarLogIn_banner_button">
                        <a class="banner_button_login" href="./blog.html">Blog</a>
                    </div>
                    <div class="banner_button_monedero">
                        <p>Monedero $ </p><p id="contenidoMonedero"></p>
                    </div>
                    <a href="" class="logOut" id="logOut" ><img src="./assets/img/landingimg/logout.png" alt="" srcset="" ></a>
            </div>
        `;
    };

    function navbarLoginBlog(){
        navbar.innerHTML=`
        <a class="logo_navbar" href="./index.html" ><img src="./assets/img/icon/logo.png" alt=""></a>
            <div class="navbar_enlaces_logIn">
                    <div>
                        <a id="botonInicioDeSesionIndex"  href="./index.html"><p>Inicio</p></a>
                    </div>
                    <div class="navbarLogIn_banner_button">
                        <a class="banner_button_login" href="./recompensas.html">Recompensas</a>
                    </div>
                    <div class="navbarLogIn_banner_button">
                        <a class="banner_button_login" href="./login.html">Juegos</a>
                    </div>
                    <div class="anchoMonedero banner_button_monedero">
                        <p>Monedero $ </p><p id="contenidoMonedero"></p>
                    </div>
                    <a href="" class="logOut" id="logOut" ><img src="./assets/img/landingimg/logout.png" alt="" srcset="" ></a>
            </div>
        `;

        document.getElementById('logOut').addEventListener('click', function (event) {
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            localStorage.clear(); // Limpiar el localStorage
            window.location.href = "./index.html"; // Redirigir a la página de inicio o a la página deseada después del logout
        });
    } 

    // se guarda en distintas variables lo contenido en el localstorage
    let userId= localStorage.getItem('userId');
    let coins=localStorage.getItem('coins');
    let first_name= localStorage.getItem('nombre');
    
    // se convierte el userId en interger, ya que en la api esta de tipo de variable interger
    userId = parseInt(userId, 10); 
        
    //solicito datos a la API
    if(userId){
        
        fetch(`https://nocountry-api.onrender.com/users/${userId}`)     
        .then(respuestaApi => { 
                if (!respuestaApi.ok) {
                throw new Error('No se pudo obtener los datos del usuario');
                }
                //retorno la respuesta como un json.
                return respuestaApi.json(); 
        })//ejecuta la función flecha definida dentro del método .then(), con el argumento respuestaApi, si la solicitud se resuelve con éxito
        .then(valorObtenido => {
                // Muestra el contenido en el div
                contenidoMonedero.innerText = valorObtenido.coins;
                localStorage.setItem('coins',valorObtenido.coins);
        }) //si la solicitud no tiene éxito, el método .catch advetirá del error.
        .catch(error => {
                console.error('Error al obtener datos de la API: ', error);
                alert('Error al obtener datos de la API.');
        });
    };
    
    // if (userId && coins && first_name) {
    //     navbarLogin(); // Si hay información en el localStorage, el usuario está logueado
    // } else if (userId && coins && first_name){
    //     navbarLogOutBlog();
    // }else if (userId==null && coins==null && first_name==null && document.title=='blog'){
    //     navbarLogOutBlog();
    // }else {
    //     navbarLogOut(); // Si no hay información, el usuario está deslogueado
       
    // }

    // if (userId && coins && first_name) {
    //     navbarLogin(); // Si hay información en el localStorage, el usuario está logueado
    // } else if (userId === null && coins === null && first_name === null && document.title==='blog') {
    //     navbarLogOutBlog(); // El usuario está deslogueado y está en la página del Blog
    // } else {
    //     navbarLogOut(); // Si no hay información, el usuario está deslogueado en cualquier otra página
    // }

    if (userId && coins && first_name) {
        if (document.title === 'blog') {
            navbarLoginBlog(); // El usuario está logueado y está en la página del Blog
        } else if (document.title === 'Bienvenido') {
            navbarJuegos(); // El usuario está logueado y está en la página del Blog
        } else if (document.title === 'Recicla-ando Bienvenidos') {
            navbarLogin();
            indexBoton();
        } 
        else {
            navbarLogin(); // El usuario está logueado en cualquier otra página
        }
    } else {
        if (document.title === 'blog') {
            navbarLogOutBlog(); // El usuario está logueado y está en la página del Blog
        } else if (document.title === 'Bienvenido') {
            navbarJuegos(); 
        } else {
            navbarLogOut(); // Si no hay información o no está logueado
        }
    }
});


