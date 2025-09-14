// Application data
const appData = {
  "student_analytics": [
    {
      "student_id": 1,
      "name": "Nitin Singh",
      "id_number": "2500032073",
      "section": "S33",
      "attendance_rate": 81.8,
      "recent_trend": 15.0,
      "consecutive_absences": 0,
      "total_classes": 88,
      "present_classes": 72,
      "risk_level": "Low",
      "risk_score": 0,
      "risk_factors": []
    },
    {
      "student_id": 2,
      "name": "Abhijeet Arjeet",
      "id_number": "2500031388",
      "section": "S33",
      "attendance_rate": 63.6,
      "recent_trend": -12.5,
      "consecutive_absences": 2,
      "total_classes": 88,
      "present_classes": 56,
      "risk_level": "Medium",
      "risk_score": 3,
      "risk_factors": ["Low overall attendance", "Declining attendance trend"]
    },
    {
      "student_id": 3,
      "name": "Aryan Sharma",
      "id_number": "2500031465",
      "section": "S33",
      "attendance_rate": 85.2,
      "recent_trend": 5.0,
      "consecutive_absences": 0,
      "total_classes": 88,
      "present_classes": 75,
      "risk_level": "Low",
      "risk_score": 0,
      "risk_factors": []
    },
    {
      "student_id": 4,
      "name": "Mahalakshmi",
      "id_number": "2500030810",
      "section": "S33",
      "attendance_rate": 55.7,
      "recent_trend": -18.0,
      "consecutive_absences": 4,
      "total_classes": 88,
      "present_classes": 49,
      "risk_level": "High",
      "risk_score": 7,
      "risk_factors": ["Low overall attendance", "Declining attendance trend", "4 consecutive absences", "Critical attendance level"]
    },
    {
      "student_id": 5,
      "name": "Anitha Reddie",
      "id_number": "2500032001",
      "section": "S33",
      "attendance_rate": 72.7,
      "recent_trend": -8.0,
      "consecutive_absences": 1,
      "total_classes": 88,
      "present_classes": 64,
      "risk_level": "Medium",
      "risk_score": 3,
      "risk_factors": ["Low overall attendance"]
    },
    {
      "student_id": 6,
      "name": "Kaniskha",
      "id_number": "2500032002",
      "section": "S33",
      "attendance_rate": 88.6,
      "recent_trend": 8.0,
      "consecutive_absences": 0,
      "total_classes": 88,
      "present_classes": 78,
      "risk_level": "Low",
      "risk_score": 0,
      "risk_factors": []
    },
    {
      "student_id": 7,
      "name": "Prateek Lohiya",
      "id_number": "2500032003",
      "section": "S34",
      "attendance_rate": 59.1,
      "recent_trend": -15.0,
      "consecutive_absences": 3,
      "total_classes": 88,
      "present_classes": 52,
      "risk_level": "High",
      "risk_score": 7,
      "risk_factors": ["Low overall attendance", "Declining attendance trend", "3 consecutive absences", "Critical attendance level"]
    },
    {
      "student_id": 8,
      "name": "Ayush kumar",
      "id_number": "2500032004",
      "section": "S34",
      "attendance_rate": 83.0,
      "recent_trend": 10.0,
      "consecutive_absences": 0,
      "total_classes": 88,
      "present_classes": 73,
      "risk_level": "Low",
      "risk_score": 0,
      "risk_factors": []
    },
    {
      "student_id": 9,
      "name": "Divyanshu",
      "id_number": "2500032005",
      "section": "S34",
      "attendance_rate": 71.6,
      "recent_trend": -5.0,
      "consecutive_absences": 1,
      "total_classes": 88,
      "present_classes": 63,
      "risk_level": "Medium",
      "risk_score": 3,
      "risk_factors": ["Low overall attendance"]
    },
    {
      "student_id": 10,
      "name": "Anita Sharma",
      "id_number": "2500032006",
      "section": "S35",
      "attendance_rate": 86.4,
      "recent_trend": 12.0,
      "consecutive_absences": 0,
      "total_classes": 88,
      "present_classes": 76,
      "risk_level": "Low",
      "risk_score": 0,
      "risk_factors": []
    }
  ],
  "section_analytics": [
    {
      "section": "S33",
      "avg_attendance_rate": 75.6,
      "total_students": 6
    },
    {
      "section": "S34",
      "avg_attendance_rate": 71.2,
      "total_students": 3
    },
    {
      "section": "S35",
      "avg_attendance_rate": 86.4,
      "total_students": 1
    }
  ],
  "daily_trend": [
    {"date": "2025-08-15", "attendance_rate": 78.5},
    {"date": "2025-08-16", "attendance_rate": 82.1},
    {"date": "2025-08-19", "attendance_rate": 76.3},
    {"date": "2025-08-20", "attendance_rate": 79.8},
    {"date": "2025-08-21", "attendance_rate": 75.2},
    {"date": "2025-08-22", "attendance_rate": 81.4},
    {"date": "2025-08-23", "attendance_rate": 77.9},
    {"date": "2025-08-26", "attendance_rate": 73.6},
    {"date": "2025-08-27", "attendance_rate": 78.8},
    {"date": "2025-08-28", "attendance_rate": 80.5},
    {"date": "2025-08-29", "attendance_rate": 74.7},
    {"date": "2025-08-30", "attendance_rate": 79.1},
    {"date": "2025-09-02", "attendance_rate": 76.8},
    {"date": "2025-09-03", "attendance_rate": 82.3},
    {"date": "2025-09-04", "attendance_rate": 78.4},
    {"date": "2025-09-05", "attendance_rate": 75.9},
    {"date": "2025-09-06", "attendance_rate": 81.7},
    {"date": "2025-09-09", "attendance_rate": 77.2},
    {"date": "2025-09-10", "attendance_rate": 79.6},
    {"date": "2025-09-11", "attendance_rate": 76.1},
    {"date": "2025-09-12", "attendance_rate": 80.8},
    {"date": "2025-09-13", "attendance_rate": 78.3}
  ],
  "summary_stats": {
    "total_students": 10,
    "overall_attendance_rate": 76.7,
    "high_risk_students": 2,
    "medium_risk_students": 3,
    "total_classes_today": 40,
    "sections": 3
  }
};

let attendanceChart = null;
let filteredStudents = [...appData.student_analytics];

window.showStudentDetails = function(studentId) {
    const student = appData.student_analytics.find(s => s.student_id === studentId);
    if (!student) return;
    
    const modal = document.getElementById('studentModal');
    const modalName = document.getElementById('modalStudentName');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalName || !modalBody) return;
    
    modalName.textContent = `${student.name} - Detailed Analytics`;
    
    const interventions = generateInterventions(student);
    
    modalBody.innerHTML = `
        <div class="modal-student-profile">
            <div class="student-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="modal-student-info">
                <h3>${student.name}</h3>
                <p>ID: ${student.id_number}</p>
                <p>Section: ${student.section}</p>
                <span class="risk-badge ${student.risk_level.toLowerCase()}">${student.risk_level} Risk Level</span>
            </div>
        </div>
        
        <div class="modal-stats-grid">
            <div class="modal-stat-card">
                <div class="stat-value">${student.attendance_rate}%</div>
                <div class="stat-label">Attendance Rate</div>
            </div>
            <div class="modal-stat-card">
                <div class="stat-value">${student.present_classes}</div>
                <div class="stat-label">Classes Attended</div>
            </div>
            <div class="modal-stat-card">
                <div class="stat-value">${student.total_classes - student.present_classes}</div>
                <div class="stat-label">Classes Missed</div>
            </div>
            <div class="modal-stat-card">
                <div class="stat-value ${student.recent_trend >= 0 ? 'trend-up' : 'trend-down'}">
                    ${student.recent_trend >= 0 ? '+' : ''}${student.recent_trend}%
                </div>
                <div class="stat-label">Recent Trend</div>
            </div>
        </div>
        
        ${student.risk_factors.length > 0 ? `
            <div style="margin-bottom: 1.5rem;">
                <h4>Current Risk Factors:</h4>
                <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                    ${student.risk_factors.map(factor => `<li style="margin-bottom: 0.5rem;">${factor}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        
        <div class="interventions">
            <h4><i class="fas fa-lightbulb"></i> Recommended Interventions:</h4>
            <ul>
                ${interventions.map(intervention => `<li>${intervention}</li>`).join('')}
            </ul>
        </div>
    `;
    
    modal.classList.remove('hidden');
};

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeDashboard();
        setupEventListeners();
        updateCurrentTime();
        setInterval(updateCurrentTime, 1000);

        setInterval(simulateDataUpdate, 30000);
    }, 100);
});

function initializeDashboard() {
    updateSummaryCards();
    renderAtRiskStudents();
    renderSectionAnalytics();
    renderAllStudents();

    setTimeout(renderAttendanceChart, 200);
}

function updateCurrentTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    
    const timeElement = document.getElementById('currentDateTime');
    if (timeElement) {
        timeElement.textContent = now.toLocaleString('en-US', options);
    }
}

function updateSummaryCards() {
    const stats = appData.summary_stats;
    const highRiskCount = appData.student_analytics.filter(s => s.risk_level === 'High').length;
    
    const elements = {
        totalStudents: document.getElementById('totalStudents'),
        overallAttendance: document.getElementById('overallAttendance'),
        highRiskStudents: document.getElementById('highRiskStudents'),
        activeSections: document.getElementById('activeSections')
    };
    
    if (elements.totalStudents) elements.totalStudents.textContent = stats.total_students;
    if (elements.overallAttendance) elements.overallAttendance.textContent = `${stats.overall_attendance_rate}%`;
    if (elements.highRiskStudents) elements.highRiskStudents.textContent = highRiskCount;
    if (elements.activeSections) elements.activeSections.textContent = stats.sections;

    const attendanceCard = document.querySelector('[data-filter="attendance"]');
    if (attendanceCard) {
        const rate = stats.overall_attendance_rate;
        if (rate >= 80) {
            attendanceCard.style.borderLeftColor = 'var(--color-success)';
        } else if (rate >= 60) {
            attendanceCard.style.borderLeftColor = 'var(--color-warning)';
        } else {
            attendanceCard.style.borderLeftColor = 'var(--color-error)';
        }
    }
}

function renderAtRiskStudents() {
    const container = document.getElementById('atRiskStudents');
    if (!container) return;
    
    const atRiskStudents = appData.student_analytics.filter(s => s.risk_level === 'High' || s.risk_level === 'Medium');
    
    if (atRiskStudents.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 2rem;">No students require immediate attention.</p>';
        return;
    }
    
    container.innerHTML = atRiskStudents.map(student => `
        <div class="at-risk-student ${student.risk_level.toLowerCase()}-risk fade-in">
            <div class="student-header">
                <div class="student-info">
                    <h3>${student.name}</h3>
                    <div class="student-id">${student.id_number} • Section ${student.section}</div>
                </div>
                <span class="risk-badge ${student.risk_level.toLowerCase()}">${student.risk_level} Risk</span>
            </div>
            
            <div class="student-stats">
                <div class="stat-item">
                    <span class="stat-value">${student.attendance_rate}%</span>
                    <span class="stat-label">Attendance</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value ${student.recent_trend >= 0 ? 'trend-up' : 'trend-down'}">
                        ${student.recent_trend >= 0 ? '+' : ''}${student.recent_trend}%
                    </span>
                    <span class="stat-label">Trend</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${student.consecutive_absences}</span>
                    <span class="stat-label">Consecutive Absences</span>
                </div>
            </div>
            
            ${student.risk_factors.length > 0 ? `
                <div class="risk-factors">
                    <h4>Risk Factors:</h4>
                    <ul>
                        ${student.risk_factors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <button class="btn btn--primary btn--sm" onclick="showStudentDetails(${student.student_id})">
                <i class="fas fa-eye"></i>
                View Details
            </button>
        </div>
    `).join('');
}

function renderAttendanceChart() {
    const canvas = document.getElementById('attendanceChart');
    if (!canvas) {
        console.error('Chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Cannot get canvas context');
        return;
    }
    
    if (attendanceChart) {
        attendanceChart.destroy();
    }
    
    const labels = appData.daily_trend.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    const data = appData.daily_trend.map(item => item.attendance_rate);
    
    try {
        attendanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Attendance Rate (%)',
                    data: data,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 90,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    } catch (error) {
        console.error('Error creating chart:', error);
        const container = canvas.parentElement;
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 2rem;">Chart loading error. Please refresh the page.</p>';
    }
}

function renderSectionAnalytics() {
    const tbody = document.getElementById('sectionTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = appData.section_analytics.map(section => {
        const rateClass = section.avg_attendance_rate >= 80 ? 'high' : 
                         section.avg_attendance_rate >= 60 ? 'medium' : 'low';
        
        return `
            <tr>
                <td><strong>${section.section}</strong></td>
                <td>${section.total_students}</td>
                <td>
                    <span class="attendance-rate ${rateClass}">
                        ${section.avg_attendance_rate.toFixed(1)}%
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

function renderAllStudents() {
    const container = document.getElementById('allStudentsList');
    if (!container) return;
    
    container.innerHTML = filteredStudents.map(student => {
        const rateClass = student.attendance_rate >= 80 ? 'high' : 
                         student.attendance_rate >= 60 ? 'medium' : 'low';
        
        return `
            <div class="student-card fade-in" data-student-id="${student.student_id}" onclick="showStudentDetails(${student.student_id})">
                <div class="student-card-header">
                    <div>
                        <h3>${student.name}</h3>
                        <div class="student-id">${student.id_number} • ${student.section}</div>
                    </div>
                    <span class="risk-badge ${student.risk_level.toLowerCase()}">${student.risk_level}</span>
                </div>
                
                <div class="attendance-progress">
                    <div class="progress-bar">
                        <div class="progress-fill ${rateClass}" style="width: ${student.attendance_rate}%"></div>
                    </div>
                    <div class="attendance-text">${student.attendance_rate}% attendance (${student.present_classes}/${student.total_classes})</div>
                </div>
                
                ${student.recent_trend !== 0 ? `
                    <div class="trend-indicator ${student.recent_trend >= 0 ? 'trend-up' : 'trend-down'}">
                        <i class="fas fa-${student.recent_trend >= 0 ? 'arrow-up' : 'arrow-down'}"></i>
                        ${Math.abs(student.recent_trend)}% recent trend
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function generateInterventions(student) {
    const interventions = [];
    
    if (student.attendance_rate < 75) {
        interventions.push('Schedule a one-on-one meeting to understand attendance barriers');
        interventions.push('Provide additional academic support and resources');
    }
    
    if (student.consecutive_absences >= 3) {
        interventions.push('Immediate intervention required - contact student and parents');
        interventions.push('Develop a personalized attendance improvement plan');
    }
    
    if (student.recent_trend < -10) {
        interventions.push('Monitor closely for signs of disengagement or personal issues');
        interventions.push('Consider peer mentoring or study group assignment');
    }
    
    if (student.risk_level === 'High') {
        interventions.push('Refer to academic counseling services');
        interventions.push('Coordinate with other faculty members for comprehensive support');
    }
    
    if (interventions.length === 0) {
        interventions.push('Continue monitoring attendance patterns');
        interventions.push('Recognize and encourage consistent attendance');
        interventions.push('Use as a positive example for other students');
    }
    
    return interventions;
}

function setupEventListeners() {
    console.log('Setting up event listeners...');

    const searchInput = document.getElementById('studentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            console.log('Search input changed:', e.target.value);
            handleSearch(e);
        });
        console.log('Search input listener attached');
    } else {
        console.error('Search input not found');
    }

    const sectionFilter = document.getElementById('sectionFilter');
    const riskFilter = document.getElementById('riskFilter');
    
    if (sectionFilter) {
        sectionFilter.addEventListener('change', function(e) {
            console.log('Section filter changed:', e.target.value);
            handleFilter();
        });
        console.log('Section filter listener attached');
    } else {
        console.error('Section filter not found');
    }
    
    if (riskFilter) {
        riskFilter.addEventListener('change', function(e) {
            console.log('Risk filter changed:', e.target.value);
            handleFilter();
        });
        console.log('Risk filter listener attached');
    } else {
        console.error('Risk filter not found');
    }

    const closeModal = document.getElementById('closeModal');
    const modal = document.getElementById('studentModal');
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
        console.log('Close modal listener attached');
    }
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeModalFunction();
        });
        console.log('Modal background close listener attached');
    }

    document.querySelectorAll('.summary-card[data-filter]').forEach(card => {
        card.addEventListener('click', handleSummaryCardFilter);
    });
    console.log('Summary card listeners attached');

    const exportBtn = document.getElementById('exportReport');
    if (exportBtn) {
        exportBtn.addEventListener('click', function(e) {
            console.log('Export button clicked');
            exportReport();
        });
        console.log('Export button listener attached');
    } else {
        console.error('Export button not found');
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModalFunction();
    });
    
    console.log('Event listeners setup completed');
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    console.log('Filtering by search term:', searchTerm);
    applyFilters(searchTerm);
}

function handleFilter() {
    const searchInput = document.getElementById('studentSearch');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    console.log('Applying filters with search term:', searchTerm);
    applyFilters(searchTerm);
}

function applyFilters(searchTerm = '') {
    const sectionFilter = document.getElementById('sectionFilter');
    const riskFilter = document.getElementById('riskFilter');
    
    const sectionValue = sectionFilter ? sectionFilter.value : '';
    const riskValue = riskFilter ? riskFilter.value : '';
    
    console.log('Applying filters:', { searchTerm, sectionValue, riskValue });
    
    filteredStudents = appData.student_analytics.filter(student => {
        const matchesSearch = !searchTerm || 
            student.name.toLowerCase().includes(searchTerm) ||
            student.id_number.includes(searchTerm);
        
        const matchesSection = !sectionValue || student.section === sectionValue;
        const matchesRisk = !riskValue || student.risk_level === riskValue;
        
        return matchesSearch && matchesSection && matchesRisk;
    });
    
    console.log('Filtered students:', filteredStudents.length, 'out of', appData.student_analytics.length);
    renderAllStudents();
}

function handleSummaryCardFilter(e) {
    const filterType = e.currentTarget.dataset.filter;
    console.log('Summary card filter clicked:', filterType);

    const searchInput = document.getElementById('studentSearch');
    const sectionFilter = document.getElementById('sectionFilter');
    const riskFilter = document.getElementById('riskFilter');
    
    if (searchInput) searchInput.value = '';
    if (sectionFilter) sectionFilter.value = '';
    if (riskFilter) riskFilter.value = '';

    switch (filterType) {
        case 'high-risk':
            if (riskFilter) riskFilter.value = 'High';
            break;
        case 'sections':
            const sectionAnalytics = document.querySelector('.section-analytics');
            if (sectionAnalytics) {
                sectionAnalytics.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        case 'attendance':
            const chartSection = document.querySelector('.chart-section');
            if (chartSection) {
                chartSection.scrollIntoView({ behavior: 'smooth' });
            }
            return;
    }
    
    applyFilters();
}

function closeModalFunction() {
    const modal = document.getElementById('studentModal');
    if (modal) {
        modal.classList.add('hidden');
        console.log('Modal closed');
    }
}

function exportReport() {
    console.log('Exporting report...');
    
    const reportData = {
        generatedAt: new Date().toISOString(),
        summary: appData.summary_stats,
        students: filteredStudents,
        sections: appData.section_analytics,
        dailyTrend: appData.daily_trend
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Report export initiated');

    showNotification('Report exported successfully!', 'success');
}

function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--color-success);
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function simulateDataUpdate() {
    appData.student_analytics.forEach(student => {
        const variation = (Math.random() - 0.5) * 2; // ±1%
        student.attendance_rate = Math.max(0, Math.min(100, student.attendance_rate + variation));
        student.attendance_rate = Math.round(student.attendance_rate * 10) / 10; // Round to 1 decimal
    });
    
    const totalRate = appData.student_analytics.reduce((sum, s) => sum + s.attendance_rate, 0);
    appData.summary_stats.overall_attendance_rate = Math.round((totalRate / appData.student_analytics.length) * 10) / 10;

    ['S33', 'S34', 'S35'].forEach(section => {
        const sectionStudents = appData.student_analytics.filter(s => s.section === section);
        const avgRate = sectionStudents.reduce((sum, s) => sum + s.attendance_rate, 0) / sectionStudents.length;
        const sectionData = appData.section_analytics.find(s => s.section === section);
        if (sectionData) {
            sectionData.avg_attendance_rate = Math.round(avgRate * 10) / 10;
        }
    });

    updateSummaryCards();
    renderSectionAnalytics();
    applyFilters();

    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-primary);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out, fadeOut 0.3s ease-in 1.7s;
    `;
    indicator.textContent = 'Data updated';
    document.body.appendChild(indicator);
    
    setTimeout(() => indicator.remove(), 2000);
}
