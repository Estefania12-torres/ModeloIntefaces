// Health Metrics Input functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeHealthForm()
})

function initializeHealthForm() {
  const form = document.getElementById("healthMetricsForm")
  const inputs = form.querySelectorAll("input")

  inputs.forEach((input) => {
    input.addEventListener("input", updateHealthSummary)
  })
}

function calculateBMI() {
  const height = Number.parseFloat(document.getElementById("height").value)
  const weight = Number.parseFloat(document.getElementById("weight").value)

  if (!height || !weight) {
    showNotification("Please enter both height and weight", "error")
    return
  }

  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)

  const bmiResult = document.getElementById("bmiResult")
  bmiResult.innerHTML = `
        <strong>BMI: ${bmi.toFixed(1)}</strong>
        <span class="bmi-category">${getBMICategory(bmi)}</span>
    `

  // Update summary
  document.getElementById("bmiSummary").textContent = bmi.toFixed(1)
  document.getElementById("bmiStatus").textContent = getBMICategory(bmi)
  document.getElementById("bmiStatus").className = `status-indicator ${getBMIStatusClass(bmi)}`
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight"
  if (bmi < 25) return "Normal weight"
  if (bmi < 30) return "Overweight"
  return "Obese"
}

function getBMIStatusClass(bmi) {
  if (bmi < 18.5 || bmi >= 30) return "warning"
  if (bmi >= 25) return "warning"
  return "normal"
}

function updateHealthSummary() {
  const systolic = document.getElementById("systolic").value
  const diastolic = document.getElementById("diastolic").value
  const heartRate = document.getElementById("heartRate").value

  // Update blood pressure summary
  if (systolic && diastolic) {
    document.getElementById("bpSummary").textContent = `${systolic}/${diastolic} mmHg`
    const bpStatus = getBloodPressureStatus(Number.parseInt(systolic), Number.parseInt(diastolic))
    document.getElementById("bpStatus").textContent = bpStatus.text
    document.getElementById("bpStatus").className = `status-indicator ${bpStatus.class}`
  }

  // Update heart rate summary
  if (heartRate) {
    document.getElementById("hrSummary").textContent = `${heartRate} bpm`
    const hrStatus = getHeartRateStatus(Number.parseInt(heartRate))
    document.getElementById("hrStatus").textContent = hrStatus.text
    document.getElementById("hrStatus").className = `status-indicator ${hrStatus.class}`
  }
}

function getBloodPressureStatus(systolic, diastolic) {
  if (systolic < 120 && diastolic < 80) {
    return { text: "Normal", class: "normal" }
  } else if (systolic < 130 && diastolic < 80) {
    return { text: "Elevated", class: "warning" }
  } else if (systolic < 140 || diastolic < 90) {
    return { text: "High Stage 1", class: "warning" }
  } else {
    return { text: "High Stage 2", class: "danger" }
  }
}

function getHeartRateStatus(heartRate) {
  if (heartRate >= 60 && heartRate <= 100) {
    return { text: "Normal", class: "normal" }
  } else if (heartRate < 60) {
    return { text: "Low", class: "warning" }
  } else {
    return { text: "High", class: "warning" }
  }
}

function generateReport() {
  const formData = collectFormData()

  if (Object.keys(formData).length === 0) {
    showNotification("Please enter at least one health metric", "error")
    return
  }

  // Simulate report generation
  showNotification("Health report generated successfully!")

  // Here you would typically send data to server or generate PDF
  console.log("Health Report Data:", formData)
}

function showGraphs() {
  const formData = collectFormData()

  if (Object.keys(formData).length === 0) {
    showNotification("Please enter health metrics to view graphs", "error")
    return
  }

  showNotification("Opening health metrics graphs...")

  // Here you would typically open a graphs modal or navigate to graphs page
  console.log("Showing graphs for:", formData)
}

function collectFormData() {
  const formData = {}
  const inputs = document.querySelectorAll("#healthMetricsForm input")

  inputs.forEach((input) => {
    if (input.value.trim()) {
      formData[input.id] = input.value
    }
  })

  return formData
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
