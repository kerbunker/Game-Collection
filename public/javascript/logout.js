//document.querySelector('#logout').classList.add('d-none');
async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
        //document.querySelector('#logout').classList.add('d-none');
    }else{
        alert(response.statusText);
    }
}
document.querySelector('#logout').addEventListener('click', logout);