/*function checkpassword() {
            // body...
            let password=document.getElementById("password").value;
            let confirmpassword=document.getElementById("confirmpassword").value;
            let message= document.getElementById("message").value;
            console.log(password,confirmpassword);
            if(password.length!=0)
            {
               if(password== confirmpassword)
                  message.textContent= "passwords match";
               else
                  message.textContent="Passwords dont match";
            }
            


         }*/
var check = function() {
  if (document.getElementById('password1').value ==
    document.getElementById('password2').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'matching';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'not matching';
  }
}