//document.querySelector('#logout').classList.add('d-none');
async function logout() {
    //calls the logout api route
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        //replaces with the homepage
        document.location.replace('/');
        //document.querySelector('#logout').classList.add('d-none');
    }else{
        alert(response.statusText);
    }
}
document.querySelector('#logout').addEventListener('click', logout);