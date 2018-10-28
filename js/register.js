const txtEmail = document.getElementById('txtEmail');
const txtPassWord = document.getElementById('txtPassWord');
const txtEdad = document.getElementById('txtAge');
const txtName= document.getElementById('txtName');


btnRegister.addEventListener('click', e => {
    const email = txtEmail.value;
    const clave = txtPassWord.value;
    const age = txtEdad.value;
    const name = txtName.value
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, clave);
    promise.catch(e => console.log(e.message));
})
