// Disciplines page functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeDisciplines()
})

function initializeDisciplines() {
  const disciplineCards = document.querySelectorAll(".discipline-card")

  disciplineCards.forEach((card) => {
    card.addEventListener("click", function () {
      const sport = this.dataset.sport
      showDisciplineDetails(sport)
    })
  })
}

function showDisciplineDetails(sport) {
  const sportNames = {
    soccer: "Soccer",
    swimming: "Swimming",
    cycling: "Cycling",
    basketball: "Basketball",
    tennis: "Tennis",
    volleyball: "Volleyball",
  }

  showNotification(`Selected ${sportNames[sport]} discipline`)
}

function openRegisterModal() {
  document.getElementById("registerModal").style.display = "block"
}

function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none"
  document.getElementById("registerForm").reset()
}

function registerDiscipline() {
  const name = document.getElementById("disciplineName").value
  const icon = document.getElementById("disciplineIcon").value
  const description = document.getElementById("disciplineDescription").value

  if (!name.trim()) {
    showNotification("Please enter a discipline name", "error")
    return
  }

  // Add new discipline to the grid
  addDisciplineToGrid(name, icon)

  // Add to history
  addToHistory(name)

  // Close modal and show success message
  closeRegisterModal()
  showNotification(`${name} discipline registered successfully!`)
}

function addDisciplineToGrid(name, iconClass) {
  const disciplinesGrid = document.querySelector(".disciplines-grid")

  const newCard = document.createElement("div")
  newCard.className = "discipline-card"
  newCard.dataset.sport = name.toLowerCase().replace(/\s+/g, "-")

  newCard.innerHTML = `
        <div class="discipline-icon">
            <i class="${iconClass}"></i>
        </div>
        <h3>${name}</h3>
    `

  newCard.addEventListener("click", function () {
    showDisciplineDetails(this.dataset.sport)
  })

  disciplinesGrid.appendChild(newCard)
}

function addToHistory(name) {
  const historyList = document.querySelector(".history-list")
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const newHistoryItem = document.createElement("div")
  newHistoryItem.className = "history-item"

  newHistoryItem.innerHTML = `
        <div class="history-icon">
            <i class="fas fa-plus"></i>
        </div>
        <div class="history-info">
            <h4>Registered for ${name}</h4>
            <p class="history-date">${currentDate}</p>
        </div>
    `

  historyList.insertBefore(newHistoryItem, historyList.firstChild)
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

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("registerModal")
  if (event.target === modal) {
    closeRegisterModal()
  }
})
