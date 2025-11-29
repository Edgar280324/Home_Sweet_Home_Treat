const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector("form .signup-link a");
      signupBtn.onclick = (()=>{
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
      });
      loginBtn.onclick = (()=>{
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      });
      signupLink.onclick = (()=>{
        signupBtn.click();
        return false;
      });
      setTimeout(() => {
  const mensajes = document.querySelectorAll('.error-msg, .success-msg');

  mensajes.forEach(msg => {
    msg.style.opacity = '0';
    msg.style.transition = 'opacity 0.6s ease';

    setTimeout(() => msg.remove(), 600); // eliminar tras animación
  });
}, 2000);
