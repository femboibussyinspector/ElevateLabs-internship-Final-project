document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("#signupForm");
    const firstNameInput = document.querySelector("#firstName");
    const lastNameInput = document.querySelector("#lastName");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const signupButton = document.querySelector(".btn-signup");
    const messageDiv = document.querySelector("#message-area");
    const passwordToggle = document.querySelector(".password-toggle");
  
    passwordToggle.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      const icon = passwordToggle.querySelector("i");
      icon.classList.toggle("fa-eye-slash");
      icon.classList.toggle("fa-eye");
    });
  
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      if (passwordInput.value.length < 8) {
        showMessage("Password must be at least 8 characters.", "error");
        return;
      }
      
      showMessage("Signing up...", "loading");
      signupButton.disabled = true;
      signupButton.textContent = "Working...";
  
      const formData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
  
      try {
        console.log("Attempting fetch to backend...", formData);
  
        const response = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  

        console.log("Backend response status:", response.status, response.statusText);
  
        const data = await response.json();
        
        console.log("Backend response data:", data);
  
        if (!response.ok) {
          console.error("Response was not OK. Throwing error.");
          throw new Error(data.msg || "An unknown error occurred.");
        }
  
        console.log("Signup SUCCESS. Attempting redirect...");
  
        const urlParams = new URLSearchParams({
            name: formData.firstName,
            email: formData.email
        }).toString();
        
        window.location.href = `dashboard.html?${urlParams}`;
  
      } catch (error) {
        console.error("Signup Error:", error.message);
        showMessage(error.message, "error");
  
      } finally {
        signupButton.disabled = false;
        signupButton.textContent = "Sign Up";
      }
    });
  
    function showMessage(message, type) {
      messageDiv.textContent = message;
  
      if (type === "error") {
        messageDiv.style.color = "#f87171";
      } else if (type === "success") {
        messageDiv.style.color = "#34d399";
      } else {
        messageDiv.style.color = "var(--text-secondary)";
      }
    }
  });
  
  
