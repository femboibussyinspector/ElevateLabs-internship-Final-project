
document.addEventListener("DOMContentLoaded", () => {
    
    const params = new URLSearchParams(window.location.search);
    
    const firstName = params.get('name');
    const email = params.get('email');

    const userNameSpan = document.getElementById('user-name');
    const userEmailStrong = document.getElementById('user-email');

    if (firstName) {
        userNameSpan.textContent = firstName;
    } else {
        userNameSpan.textContent = 'User'; 
    }

    if (email) {
        userEmailStrong.textContent = email;
    } else {
        userEmailStrong.textContent = '[your email]';
    }
});
