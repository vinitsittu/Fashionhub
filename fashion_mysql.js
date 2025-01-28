<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Form</title>
  <link rel="stylesheet" href="fas.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
  
</head>

<body >
  
    <div id="left">
      <h2>Create Your Account</h2>
  <div class="form">
    <form id="registrationForm">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <label for="password">Password:</label>
      <div style="position: relative;">
        <input type="password" name="password" id="password" required>
        <i class="bi bi-eye-slash toggle-password" id="togglePassword"></i>
      </div>

      <button type="submit">Register</button>
    </form>

    <button class="alt-button" onclick="window.location.href='login.html'">Already have an account? Log in</button>
  </div>


    </div>
  
  

  <script>
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");

    togglePassword.addEventListener("click", function () {
      const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
      passwordField.setAttribute("type", type);
      this.classList.toggle("bi-eye");
    });

    document.getElementById("registrationForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      fetch('http://localhost:9000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert('Registration successful!');
          window.location.href = 'login.html';
        } else {
          alert(`Registration failed: ${result.error}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An unexpected error occurred. Please try again.');
      });
    });
  </script>
</body>
</html>
