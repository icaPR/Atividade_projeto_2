document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      document.cookie = `token=${data.token}; path=/; secure; SameSite=Strict`;
      console.log(data.token);
      window.location.href = "/purchases";
    } else {
      document.getElementById("message").textContent = data.message;
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
});
