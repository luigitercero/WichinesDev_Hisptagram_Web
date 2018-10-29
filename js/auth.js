const txtEmail = document.getElementById('txtEmail');
const txtPassWord = document.getElementById('txtPassWord');
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');
const btnLogout = document.getElementById('btnLogout');
btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const clave = txtPassWord.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, clave);
    promise.then(function()
    {
        console.log("Login exitoso!");
        document.location = "index.html";
    }).catch(e => console.log("Error al ingresar: "+e.message));
})
btnRegister.addEventListener('click', e => {
    const email = txtEmail.value;
    const clave = txtPassWord.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, clave);
    promise.catch(e => console.log(e.message));
})
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
})
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
    } else {
        console.log('no Logueado');
        btnLogout.classList.add('hide')
    }
});