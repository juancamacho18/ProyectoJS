function validainputs(){
    let email=document.getElementById("email");
    let password=document.getElementById("password");
    let ingreso=document.getElementById("login");
    let emailval=email.value.trim();
    let passwordval=password.value.trim();
    
    var errorf=0;
    if (emailval===""){
        ocErrorform(email,"por favor ingrese su email");
        errorf=1;
    }else if(!valEmail(emailval)){
        ocErrorform(email,"email no valido");
        errorf=1;
    }else{
        exitosform(email);
    }
    //Validar contraseña
    if (passwordval===""){
        ocErrorform(password,"por favor ingrese su contraseña");
        errorf=1;
    }else if(!valPassword(passwordval)){
        ocErrorform(password,"contraseña no valida");
        errorf=1;
    }else{
        exitosform(password);
    }
    //Validar si esta ok
    if (errorf==0){
        ingreso.addEventListener("click",function(){
            swal("ACCESO PERMITIDO !!","Click OK para continuar","success")
        }),setTimeout (function() { window.location.href = "../HTML/Inicio.html"; }, 1500 )
    }
    return false;
    //
    function ocErrorform (input, message){
        let formControl=input.parentElement;
        let small=formControl.querySelector("small");
        formControl.className="form-control error";
        small.innerText =message; 
    }
     // función para ingreso exitoso en formularios
    function exitosform (input){
        let formControl=input.parentElement;
        formControl.className="form-control success";
        }
    function valEmail(email){
    return /^[a-z0-9_\.-]+@[a-z\.-]+\.[a-z\.]{2,6}$/.test(email);
    }function valPassword(password){
    return /^[a-z0-9_-]{6,10}$/.test(password);
    }
}