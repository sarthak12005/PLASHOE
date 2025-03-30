async function submitData() {
    
    // console.log('Button is clicked');

    const email = document.getElementById('email_field').value.trim();
    const password = document.getElementById('password_field').value.trim();
    // console.log(email, password);

    if (!email || !password) {
        alert("Please fill in both email and password.");
        return;
    }

    try {
        const response = await fetch('https://plashoe-0ysc.onrender.com/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Login Response:", data);

        if (data.accessToken) {
            // Store tokens in localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            

            // console.log("Access Token Saved:", localStorage.getItem('accessToken'));
            // console.log("Refresh Token Saved:", localStorage.getItem('refreshToken'));

            // Redirect to index page
            window.location.href = 'index.html';
        } else {
            // alert('Login failed: No access token received');
            toastr.error("Login Failed! Please try again");
        }
    } catch (error) {
        // console.error('Login Error:', error);
        // alert('Login failed. Please try again.');
        toastr.error("Login Failed! Please try again");
    }
}

