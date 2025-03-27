window.onload = () => {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.replace('profile.html');
    }

    document.querySelector('#sign_up_btn').addEventListener('click', handleSubmit);
}

const userData = {
    name: "",
    username: "",
    email: "",
    password: "",
};

let load = false;
const signUpButton = document.querySelector('#sign_up_btn');

const loading = (val) => {
    signUpButton.innerText = val ? 'Submitting...' : 'Sign up';
}

async function handleSubmit(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page

    // Correcting ID names
    const name = document.getElementById('name_field')?.value;  // Fixed typo
    const email = document.getElementById('email_field')?.value;
    const username = document.getElementById('user_field')?.value;
    const password = document.getElementById('password_field')?.value;

    if (!name || !email || !username || !password) {
        alert("All fields are required!");
        return;
    }

    userData.name = name;
    userData.username = username;
    userData.email = email;
    userData.password = password;

    console.log(userData);

    try {
        loading(true);
        
        const response = await fetch('http://localhost:5000/api/user/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Registered successfully!");
            window.location.href = '/home/index.html';
        } else {
            alert(`Error: ${result.message || "Something went wrong"}`);
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("Failed to register. Please try again.");
    } finally {
        loading(false);
        document.getElementById('res_form')?.reset();
    }
}
