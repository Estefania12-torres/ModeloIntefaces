import { Chart } from "@/components/ui/chart"
// Health Metrics page functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeCharts()
  updateVitalSigns()

  // Auto-refresh vital signs every 30 seconds
  setInterval(updateVitalSigns, 30000)
})

function initializeCharts() {
  // Heart Rate Chart
  const heartRateCtx = document.getElementById("heartRateChart").getContext("2d")
  new Chart(heartRateCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Heart Rate (BPM)",
          data: [68, 72, 70, 75, 73, 69, 72],
          borderColor: "#8B5CF6",
          backgroundColor: "rgba(139, 92, 246, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 60,
          max: 80,
        },
      },
    },
  })

  // Weight Chart
  const weightCtx = document.getElementById("weightChart").getContext("2d")
  new Chart(weightCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Weight (kg)",
          data: [77, 76.5, 76, 75.5, 75.2, 75],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 74,
          max: 78,
        },
      },
    },
  })
}

function updateVitalSigns() {
  // Simulate real-time vital signs updates
  const heartRate = Math.floor(Math.random() * 10) + 68 // 68-77 BPM
  const systolic = Math.floor(Math.random() * 10) + 115 // 115-124
  const diastolic = Math.floor(Math.random() * 10) + 75 // 75-84

  // Update heart rate
  document.querySelector(".vital-card .vital-info h3").textContent = `${heartRate} BPM`

  // Update blood pressure
  document.querySelectorAll(".vital-card .vital-info h3")[1].textContent = `${systolic}/${diastolic}`

  // Update status indicators based on values
  updateHealthStatus(heartRate, systolic, diastolic)
}

function updateHealthStatus(heartRate, systolic, diastolic) {
  const heartRateStatus = document.querySelector(".vital-card .status")
  const bpStatus = document.querySelectorAll(".vital-card .status")[1]

  // Heart rate status
  if (heartRate >= 60 && heartRate <= 100) {
    heartRateStatus.textContent = "Normal"
    heartRateStatus.className = "status normal"
  } else {
    heartRateStatus.textContent = "Monitor"
    heartRateStatus.className = "status warning"
  }

  // Blood pressure status
  if (systolic < 120 && diastolic < 80) {
    bpStatus.textContent = "Normal"
    bpStatus.className = "status normal"
  } else if (systolic < 130 && diastolic < 80) {
    bpStatus.textContent = "Elevated"
    bpStatus.className = "status warning"
  } else {
    bpStatus.textContent = "High"
    bpStatus.className = "status danger"
  }
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
