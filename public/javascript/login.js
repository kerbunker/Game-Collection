async function signupFormHandler(event){
    event.preventDefault();
    // gets the user input 
    const username= document.querySelector('#username-signup').value.trim();
    const email= document.querySelector('#email-signup').value.trim();
    const password= document.querySelector('#password-signup').value.trim();
  
    // calls the api to create a new user
    if(username && email && password){
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type' : 'application/json'}
        });
        // check the response status
        if(response.ok){
            username.value='';
            email.value='';
            password.value='';
            document.location.replace('/login')
            console.log('success');
        }else{
            alert(response.statusText);
        }
    }
    
  }
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  
  
  async function loginFormHandler(event){
    event.preventDefault();
  
    // gets the user input
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    // calls the login api route
    if(email && password){
        const response = await fetch('/api/users/login',{
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.ok){
          console.log('user created');
          document.location.replace('/dashboard')
        }else {
            alert(response.statusText);
        }
    }
  }
  
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler)