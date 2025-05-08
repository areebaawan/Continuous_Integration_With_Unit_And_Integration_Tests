document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const nav = document.querySelector(".nav")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      nav.classList.toggle("active")

      // Animate hamburger to X
      const spans = this.querySelectorAll("span")
      if (nav.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Button hover effect
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
})

document.addEventListener("DOMContentLoaded", () => {
  // Sidebar toggle functionality
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebar = document.getElementById("sidebar")
  const appContainer = document.querySelector(".app-container")

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed")
      appContainer.classList.toggle("sidebar-collapsed")
    })
  }

  // Responsive sidebar behavior
  function handleResize() {
    if (window.innerWidth <= 1024) {
      sidebar.classList.add("collapsed")
      appContainer.classList.add("sidebar-collapsed")
    } else {
      sidebar.classList.remove("collapsed")
      appContainer.classList.remove("sidebar-collapsed")
    }
  }

  // Initial call and event listener for resize
  handleResize()
  window.addEventListener("resize", handleResize)

  // Notification button effect
  const notificationBtn = document.querySelector(".notification-btn")
  if (notificationBtn) {
    notificationBtn.addEventListener("click", function () {
      this.classList.toggle("active")
      // Here you would typically show a dropdown with notifications
    })
  }

  // Create a simple chart for the performance overview
  const performanceChart = document.getElementById("performance-chart")
  if (performanceChart) {
    createPerformanceChart(performanceChart)
  }

  // Add hover effects to cards
  const cards = document.querySelectorAll(".stat-card, .team-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "var(--shadow-lg)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "var(--shadow-sm)"
    })
  })

  // Add click effect to buttons
  const buttons = document.querySelectorAll(".btn, .action-btn")
  buttons.forEach((button) => {
    button.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.98)"
    })

    button.addEventListener("mouseup", function () {
      this.style.transform = "scale(1)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })

  // Toggle active class for chart period buttons
  const chartButtons = document.querySelectorAll(".chart-actions .btn")
  chartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      chartButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")
      // Here you would typically update the chart data based on the selected period
    })
  })

  // Navigation active state
  const navLinks = document.querySelectorAll(".sidebar-nav a")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links
      document.querySelectorAll(".sidebar-nav li").forEach((item) => {
        item.classList.remove("active")
      })

      // Add active class to clicked link's parent li
      this.parentElement.classList.add("active")

      // Get the href attribute and scroll to the section
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Test filter buttons
  const testFilterButtons = document.querySelectorAll(".test-filters .btn")
  testFilterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      testFilterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")
      // Here you would filter the test results based on the selected filter
    })
  })

  // Create test chart
  const testChartElement = document.getElementById("test-chart")
  if (testChartElement) {
    createTestChart(testChartElement)
  }
})

// Function to create a simple performance chart using canvas
function createPerformanceChart(container) {
  // Create canvas element
  const canvas = document.createElement("canvas")
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight
  container.innerHTML = ""
  container.appendChild(canvas)

  const ctx = canvas.getContext("2d")

  // Sample data for the chart
  const data = [42, 85, 65, 98, 75, 35, 60]
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Chart dimensions
  const chartWidth = canvas.width - 60
  const chartHeight = canvas.height - 60
  const startX = 40
  const startY = 20

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw chart background
  ctx.fillStyle = "#f9fafb"
  ctx.fillRect(startX, startY, chartWidth, chartHeight)

  // Draw grid lines
  ctx.strokeStyle = "#e5e7eb"
  ctx.lineWidth = 1

  // Horizontal grid lines
  const gridSteps = 5
  for (let i = 0; i <= gridSteps; i++) {
    const y = startY + (chartHeight / gridSteps) * i
    ctx.beginPath()
    ctx.moveTo(startX, y)
    ctx.lineTo(startX + chartWidth, y)
    ctx.stroke()

    // Add labels for y-axis
    const value = Math.round(100 - (100 / gridSteps) * i)
    ctx.fillStyle = "#9ca3af"
    ctx.font = "12px Poppins"
    ctx.textAlign = "right"
    ctx.fillText(value + "%", startX - 10, y + 4)
  }

  // Draw data points and lines
  const pointWidth = chartWidth / (data.length - 1)

  // Draw line
  ctx.beginPath()
  ctx.strokeStyle = "#6366f1"
  ctx.lineWidth = 3

  // Create gradient for area under the line
  const gradient = ctx.createLinearGradient(0, startY, 0, startY + chartHeight)
  gradient.addColorStop(0, "rgba(99, 102, 241, 0.2)")
  gradient.addColorStop(1, "rgba(99, 102, 241, 0)")

  // Draw area under the line
  ctx.beginPath()

  for (let i = 0; i < data.length; i++) {
    const x = startX + pointWidth * i
    const y = startY + chartHeight - (data[i] / 100) * chartHeight

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }

  // Complete the area path
  ctx.lineTo(startX + pointWidth * (data.length - 1), startY + chartHeight)
  ctx.lineTo(startX, startY + chartHeight)
  ctx.closePath()

  // Fill the area
  ctx.fillStyle = gradient
  ctx.fill()

  // Draw the line again
  ctx.beginPath()

  for (let i = 0; i < data.length; i++) {
    const x = startX + pointWidth * i
    const y = startY + chartHeight - (data[i] / 100) * chartHeight

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }

    // Draw x-axis labels
    ctx.fillStyle = "#9ca3af"
    ctx.font = "12px Poppins"
    ctx.textAlign = "center"
    ctx.fillText(labels[i], x, startY + chartHeight + 20)
  }

  ctx.strokeStyle = "#6366f1"
  ctx.lineWidth = 3
  ctx.stroke()

  // Draw data points
  for (let i = 0; i < data.length; i++) {
    const x = startX + pointWidth * i
    const y = startY + chartHeight - (data[i] / 100) * chartHeight

    // Draw outer circle
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.strokeStyle = "#6366f1"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw inner circle
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = "#6366f1"
    ctx.fill()
  }
}

// Function to create a test results chart
function createTestChart(container) {
  // Create canvas element
  const canvas = document.createElement("canvas")
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight
  container.innerHTML = ""
  container.appendChild(canvas)

  const ctx = canvas.getContext("2d")

  // Test data
  const data = {
    labels: ["Unit Tests", "Integration Tests", "Selenium Tests"],
    values: [25, 12, 5],
    colors: ["#10b981", "#6366f1", "#f59e0b"],
  }

  // Chart dimensions
  const chartWidth = canvas.width
  const chartHeight = canvas.height
  const centerX = chartWidth / 2
  const centerY = chartHeight / 2
  const radius = Math.min(centerX, centerY) - 40

  // Calculate total
  const total = data.values.reduce((sum, value) => sum + value, 0)

  // Draw pie chart
  let startAngle = -0.5 * Math.PI // Start at top

  for (let i = 0; i < data.values.length; i++) {
    const sliceAngle = (2 * Math.PI * data.values[i]) / total

    // Draw slice
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
    ctx.closePath()

    ctx.fillStyle = data.colors[i]
    ctx.fill()

    // Draw label
    const labelAngle = startAngle + sliceAngle / 2
    const labelX = centerX + radius * 0.7 * Math.cos(labelAngle)
    const labelY = centerY + radius * 0.7 * Math.sin(labelAngle)

    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 14px Inter"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(data.values[i], labelX, labelY)

    startAngle += sliceAngle
  }

  // Draw center circle (donut hole)
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI)
  ctx.fillStyle = "#ffffff"
  ctx.fill()

  // Draw total in center
  ctx.fillStyle = "#1f2937"
  ctx.font = "bold 24px Inter"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(total, centerX, centerY - 10)

  ctx.font = "14px Inter"
  ctx.fillStyle = "#4b5563"
  ctx.fillText("Total Tests", centerX, centerY + 15)

  // Draw legend
  const legendX = 20
  let legendY = chartHeight - 20 - data.labels.length * 25

  for (let i = 0; i < data.labels.length; i++) {
    // Draw color box
    ctx.fillStyle = data.colors[i]
    ctx.fillRect(legendX, legendY, 15, 15)

    // Draw label
    ctx.fillStyle = "#4b5563"
    ctx.font = "14px Inter"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText(data.labels[i], legendX + 25, legendY + 7.5)

    legendY += 25
  }
}

// Add window resize event to redraw the chart
window.addEventListener("resize", () => {
  const performanceChart = document.getElementById("performance-chart")
  if (performanceChart) {
    createPerformanceChart(performanceChart)
  }
})

// Add window resize event to redraw the chart
window.addEventListener("resize", () => {
  const testChartElement = document.getElementById("test-chart")
  if (testChartElement) {
    createTestChart(testChartElement)
  }
})
