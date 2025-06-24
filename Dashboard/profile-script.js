// Profile page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Tab functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("onclick").match(/'([^']+)'/)[1]
      showTab(tabName)
    })
  })

  // Form validation
  const saveButton = document.querySelector(".btn-primary")
  saveButton.addEventListener("click", () => {
    validateAndSave()
  })

  // Avatar upload simulation
  const editAvatarBtn = document.querySelector(".edit-avatar-btn")
  editAvatarBtn.addEventListener("click", () => {
    // Simulate file upload
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          document.querySelector(".profile-avatar img").src = e.target.result
          document.querySelector(".user-avatar img").src = e.target.result
          showNotification("Profile picture updated successfully!")
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  })
})

function showTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Remove active class from all buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab content
  document.getElementById(tabName).classList.add("active")

  // Add active class to clicked button
  event.target.classList.add("active")
}

function validateAndSave() {
  const requiredFields = document.querySelectorAll(".form-input[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "#ef4444"
      isValid = false
    } else {
      field.style.borderColor = "#e5e7eb"
    }
  })

  if (isValid) {
    // Simulate save
    showNotification("Profile updated successfully!")

    // Update welcome message if name changed
    const firstName = document.querySelector('input[value="Alex"]').value
    document.querySelector(".welcome-title").textContent = `Welcome, ${firstName}`
  } else {
    showNotification("Please fill in all required fields.", "error")
  }
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #ef4444, #dc2626)"};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

function logout() {
  if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    document.body.style.opacity = "0"
    document.body.style.transform = "scale(0.95)"

    setTimeout(() => {
      alert("Sesión cerrada exitosamente")
      window.location.href = "index.html"
    }, 500)
  }
}
