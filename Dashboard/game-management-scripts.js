// Game Management functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeGameManagement()
})

function initializeGameManagement() {
  // Set default times
  const now = new Date()
  const startTime = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour from now
  const endTime = new Date(now.getTime() + 3 * 60 * 60 * 1000) // 3 hours from now

  document.getElementById("startTime").value = formatDateTimeLocal(startTime)
  document.getElementById("endTime").value = formatDateTimeLocal(endTime)

  // Add event listeners
  document.getElementById("startTime").addEventListener("change", validateTimes)
  document.getElementById("endTime").addEventListener("change", validateTimes)
}

function formatDateTimeLocal(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function validateTimes() {
  const startTime = new Date(document.getElementById("startTime").value)
  const endTime = new Date(document.getElementById("endTime").value)

  if (endTime <= startTime) {
    showNotification("End time must be after start time", "error")
    return false
  }

  return true
}

function selectGame(gameElement) {
  // Remove previous selection
  document.querySelectorAll(".game-item").forEach((item) => {
    item.classList.remove("selected")
  })

  // Add selection to clicked item
  gameElement.classList.add("selected")

  // Extract game info and populate form
  const gameInfo = gameElement.querySelector(".game-info h4").textContent
  const gameTime = gameElement.querySelector(".game-time").textContent

  document.getElementById("gameName").value = gameInfo

  // Parse time and set form fields (simplified)
  const [startTimeStr, endTimeStr] = gameTime.split(" - ")

  showNotification(`Selected: ${gameInfo}`)
}

function updateGameStatus() {
  const gameName = document.getElementById("gameName").value
  const startTime = document.getElementById("startTime").value
  const endTime = document.getElementById("endTime").value
  const status = document.getElementById("currentStatus").value

  if (!gameName.trim()) {
    showNotification("Please enter a game name", "error")
    return
  }

  if (!startTime || !endTime) {
    showNotification("Please set start and end times", "error")
    return
  }

  if (!validateTimes()) {
    return
  }

  if (!status) {
    showNotification("Please select a status", "error")
    return
  }

  // Simulate updating game status
  const gameData = {
    name: gameName,
    startTime: startTime,
    endTime: endTime,
    status: status,
    updatedAt: new Date().toISOString(),
  }

  console.log("Updating game:", gameData)

  showNotification(`Game "${gameName}" updated successfully!`)

  // Update the selected game in the list if any
  const selectedGame = document.querySelector(".game-item.selected")
  if (selectedGame) {
    updateGameInList(selectedGame, gameData)
  }
}

function updateGameInList(gameElement, gameData) {
  const gameInfo = gameElement.querySelector(".game-info h4")
  const gameTime = gameElement.querySelector(".game-time")

  gameInfo.textContent = gameData.name

  // Format times for display
  const startDate = new Date(gameData.startTime)
  const endDate = new Date(gameData.endTime)
  const timeString = `${formatTime(startDate)} - ${formatTime(endDate)}`

  gameTime.textContent = timeString

  // Add status indicator
  if (!gameElement.querySelector(".game-status")) {
    const statusElement = document.createElement("span")
    statusElement.className = "game-status"
    gameElement.querySelector(".game-info").appendChild(statusElement)
  }

  const statusElement = gameElement.querySelector(".game-status")
  statusElement.textContent = gameData.status
  statusElement.className = `game-status status-${gameData.status}`
}

function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

function accessScoreboard() {
  const selectedGame = document.querySelector(".game-item.selected")

  if (!selectedGame) {
    showNotification("Please select a game first", "error")
    return
  }

  const gameName = selectedGame.querySelector(".game-info h4").textContent
  showNotification(`Opening scoreboard for: ${gameName}`)

  // Here you would typically open scoreboard interface
  console.log("Accessing scoreboard for:", gameName)
}

// Add click event to scoreboard button
document.addEventListener("DOMContentLoaded", () => {
  const scoreboardBtn = document.querySelector(".scoreboard-btn")
  if (scoreboardBtn) {
    scoreboardBtn.addEventListener("click", accessScoreboard)
  }
})

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
