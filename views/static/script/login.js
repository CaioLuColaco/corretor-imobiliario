
// Animation to change the login to register
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


// Cadastro
const loginButton = document.getElementById('login')
const registerButton = document.getElementById('register')
const emailValue = document.getElementById('emailLogin')
const passwordValue = document.getElementById('passwordLogin')
const body = document.getElementsByTagName('body')

loginButton.addEventListener('click', () => {
    console.log(passwordValue.value.length)

    if(emailValue.value == ""){
        Swal.fire({
            position: 'center',
            target: '#container',
            customClass: {
                container: "position-absolute"
            },
            icon: 'warning',
            title: 'Preencha o email',
            text: "É necessário preencher o campo de email para logar no site.",
            showConfirmButton: true,
        })
    }else if(passwordValue.value.length < 8){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Preencha uma senha com no mínimo 8 caracteres',
            text: "É necessário preencher o campo de senha para logar no site.",
            showConfirmButton: true,
            timer: 1500
        })
    }
})
