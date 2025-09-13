class FaceAttendanceSystem {
  constructor() {
    this.currentStream = null;
    this.isSessionActive = false;
    this.sessionData = null;
    this.captureInterval = null;
    this.sessionTimer = null;
    this.faceDescriptors = new Map();
    this.attendanceData = new Map();
    this.currentVideoSource = null;
    this.captureCount = 0;
    this.startTime = null;
    this.modelsLoaded = false;
    this.processingDetection = false;

    this.config = {
      captureInterval: 2000, // 2 seconds between captures
      sessionDuration: 10000, // 10 seconds, time after which session auto-ends
      requiredDetections: 3,
      totalCaptures: 5,
      api_endpoint: "https://complete-attendance-system.onrender.com",  // Replace AFTER DEPLOY NOW (TODO)
      detection_confidence: 0.65,
      face_match_threshold: 0.55,
      max_students: 100,
      detection_timeout: 5000,
    };

    this.students = [];
    this.sections = [
      { id: 1, name: "S33" },
      { id: 2, name: "S34" },
      { id: 3, name: "S35" }
    ];

    this.initializeApp();
  }

  loadFaceModels = async () => {
    try {
      this.showStatus("Loading face recognition models from local folder...", "info");
      const MODEL_URL = './models';
      console.log("Loading TinyFaceDetector model...");
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      console.log("Loading FaceLandmark68Net model...");
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      console.log("Loading FaceRecognitionNet model...");
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      this.modelsLoaded = true;
      this.showStatus("Face recognition models loaded successfully from local folder", "success");
      this.detectionOptions = new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.3
      });
      console.log("Face-api.js models loaded successfully!");
    } catch (error) {
      console.error("Failed to load face models from local folder:", error);
      this.showStatus("Failed to load face recognition models. Check if /models folder exists.", "error");
      this.modelsLoaded = false;
      console.log("Attempting fallback to CDN models...");
      try {
        const CDN_MODEL_URL = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights";
        await faceapi.nets.tinyFaceDetector.loadFromUri(CDN_MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(CDN_MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(CDN_MODEL_URL);
        
        this.modelsLoaded = true;
        this.showStatus("Face recognition models loaded from CDN fallback", "success");
        
        this.detectionOptions = new faceapi.TinyFaceDetectorOptions({
          inputSize: 416,
          scoreThreshold: 0.3
        });
      } catch (fallbackError) {
        console.error("CDN fallback also failed:", fallbackError);
        this.showStatus("Complete failure to load face models. Please check network connection.", "error");
        this.modelsLoaded = false;
      }
    }
  };

  initializeApp = async () => {
    await this.loadFaceModels();
    this.bindEvents();
    await this.loadStudents();
    this.showLoginScreen();
  };

  //Works
  loadStudents = async () => {
    try {
      const response = await this.apiCall("/students");
      this.students = response && response.students ? response.students : this.generateSampleStudents(80);
      console.log(`Loaded ${this.students.length} students for attendance tracking`);
    } catch (error) {
      console.error("Failed to load students from API:", error);
      this.students = this.generateSampleStudents(80);
      console.log(`Using ${this.students.length} sample students as fallback`);
    }
  };

  generateSampleStudents(count) {
    let students = [];
    for (let i = 1; i <= count; i++) {
      students.push({
        id: i,
        name: `Student ${i.toString().padStart(2, "0")}`,
        face_id: `FACE${i.toString().padStart(3, "0")}`,
        section: `S${33 + Math.floor((i - 1) / 30)}`,
        id_number: `25000${(32000 + i).toString()}`,
      });
    }
    return students;
  }

  bindEvents = () => {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    document.getElementById("screenCaptureBtn").addEventListener("click", () => this.selectVideoSource("screen"));
    document.getElementById("webcamBtn").addEventListener("click", () => this.selectVideoSource("webcam"));
    document.getElementById("startSessionBtn").addEventListener("click", () => this.startSession());
    document.getElementById("endSessionBtn").addEventListener("click", () => this.endSession());
    document.getElementById("uploadAttendanceBtn").addEventListener("click", () => this.uploadAttendance());
    document.getElementById("logoutBtn").addEventListener("click", () => this.logout());
  };

  handleLogin = async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (!username || !password) {
      this.showStatus("Please enter both username and password", "error");
      return;
    }

    console.log(`Login attempt for username: ${username}`);

    try {
      const resp = await this.apiCall("/login", "POST", { username, password });
      if (resp && resp.success) {
        this.authToken = resp.token;
        this.currentUser = resp.user;
        this.showDashboard();
        this.showStatus(`Welcome ${username}!`, "success");
        return;
      }
    } catch (error) {
      console.log("API login failed, trying fallback login:", error.message);
    }

    if (
      (username === "teacher" && password === "teach123") ||
      (username === "2500032073" && password === "2500032073")
    ) {
      this.authToken = null;
      this.currentUser = { username, role: "teacher" };
      this.showDashboard();
      this.showStatus(`Welcome ${username}! (Fallback Login)`, "success");
      return;
    }
    
    this.showStatus("Invalid username or password", "error");
  };

  showLoginScreen = () => {
    document.getElementById("loginSection").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("logoutBtn").classList.add("hidden");
  };

  showDashboard = () => {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("logoutBtn").classList.remove("hidden");
    this.updateAttendanceDisplay();
  };

  selectVideoSource = async (source) => {
    try {
      if (this.currentStream) {
        this.currentStream.getTracks().forEach((track) => track.stop());
      }
      
      this.showStatus(`Requesting ${source} access...`, "info");
      
      if (source === "screen") {
        this.currentStream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            cursor: "always",
            frameRate: { ideal: 15, max: 30 },
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
          },
          audio: false,
        });
        this.currentVideoSource = "screen";
        document.getElementById("screenCaptureBtn").classList.add("active");
        document.getElementById("webcamBtn").classList.remove("active");
      } else {
        this.currentStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
            frameRate: { ideal: 15, max: 30 },
          },
          audio: false,
        });
        this.currentVideoSource = "webcam";
        document.getElementById("webcamBtn").classList.add("active");
        document.getElementById("screenCaptureBtn").classList.remove("active");
      }
      
      const videoEl = document.getElementById("videoFeed");
      videoEl.srcObject = this.currentStream;
      await videoEl.play();
      
      document.getElementById("videoSection").style.display = "block";
      document.getElementById("startSessionBtn").disabled = false;
      
      this.currentStream.getVideoTracks()[0].addEventListener("ended", () => this.handleStreamEnd());
      this.showStatus(`${source.charAt(0).toUpperCase() + source.slice(1)} activated successfully`, "success");
      
    } catch (error) {
      console.error(`Failed to access ${source}:`, error);
      this.showStatus(`Failed to access ${source}. Please grant permission and try again.`, "error");
    }
  };

  handleStreamEnd = () => {
    this.showStatus("Video stream ended. Please select a video source to continue.", "error");
    document.getElementById("startSessionBtn").disabled = true;
    document.getElementById("videoSection").style.display = "none";
    this.currentStream = null;
    this.currentVideoSource = null;
    document.getElementById("screenCaptureBtn").classList.remove("active");
    document.getElementById("webcamBtn").classList.remove("active");
  };

  startSession = () => {
    if (!this.currentStream) {
      this.showStatus("Please select a video source first", "error");
      return;
    }
    
    const subject = document.getElementById("subjectInput").value.trim();
    const section = document.getElementById("sectionSelect").value;
    
    if (!subject || !section) {
      this.showStatus("Please fill in all session details", "error");
      return;
    }
    
    this.sessionData = {
      id: `session_${Date.now()}`,
      subject,
      sectionId: section,
      videoSource: this.currentVideoSource,
      startTime: new Date(),
    };
    
    this.isSessionActive = true;
    this.captureCount = 0;
    this.startTime = Date.now();
    this.initializeAttendance(section);   //1
    this.startCaptureTimer();

    document.getElementById("startSessionBtn").disabled = true;
    document.getElementById("endSessionBtn").classList.remove("hidden");
    document.getElementById("progressSection").style.display = "block";
    document.getElementById("sessionStatus").classList.remove("hidden");
    
    this.showStatus(`Session started for ${subject} - ${this.currentVideoSource} mode`, "success");
    this.updateSessionProgress();
  };

  initializeAttendance = (sectionId) => {
    this.attendanceData.clear();
    //Check for students in section S33, S34, S35
    const studentsInSection = this.students.filter(
      (student) => student.section === this.sections.find((sec) => sec.id == sectionId)?.name
    );
    
    studentsInSection.forEach((student) => {
      console.log(student)
      this.attendanceData.set(student.id, {
        studentId: student.id,
        name: student.name,
        idNumber: student.id_number,
        detections: 0,
        status: "absent",
        confidenceScores: [],
        timestamps: [],
      });
    });
    
    console.log(`Initialized attendance for ${studentsInSection.length} students in section`);
  };

  startCaptureTimer = () => {
    this.performFaceDetection();
    this.captureInterval = setInterval(() => {
      if (this.isSessionActive && this.captureCount < this.config.totalCaptures) {
        this.performFaceDetection();
      }
    }, this.config.captureInterval);
    
    this.sessionTimer = setTimeout(() => {
      if (this.isSessionActive) {
        this.endSession();
      }
    }, this.config.sessionDuration);
  };

  performFaceDetection = async () => {
    if (!this.modelsLoaded || this.processingDetection) {
      console.log("Skipping face detection: models not loaded or already processing");
      return;
    }
    
    this.processingDetection = true;
    this.captureCount++;
    
    try {
      this.showStatus(`Performing face detection (${this.captureCount}/${this.config.totalCaptures})...`, "info");
      
      const video = document.getElementById("videoFeed");
      const detections = await faceapi
        .detectAllFaces(video, this.detectionOptions)
        .withFaceLandmarks()
        .withFaceDescriptors();
      
      console.log(`Detected ${detections.length} faces in capture ${this.captureCount}`);
      
      const detectedCountEl = document.getElementById("detectedCount");
      //Frontend call to change the detected count
      if (detectedCountEl) {
        detectedCountEl.textContent = detections.length;
      }
      
      if (detections.length > 0) {
        await this.processDetections(detections);
      }
      
      this.updateAttendanceDisplay();
      this.updateSessionProgress();
      
    } catch (error) {
      console.error("Face detection error:", error);
      this.showStatus("Face detection failed. Continuing with next capture.", "error");
    } finally {
      this.processingDetection = false;
    }
  };

  processDetections = async (detections) => {
    try{
      const now = new Date();
      let processedCount = 0;

      detections.forEach((detection) => {
        const descriptorArray = Object.values(detection.descriptor);

        let bestMatch = null;
        let bestDistance = Infinity;

        this.attendanceData.forEach((attendance, studentId) => {
          const student = this.students.find((s) => s.id === studentId);
          
          if (student && student.face_descriptor) {
            const distance = this.computeEuclideanDistance(
              descriptorArray,
              student.face_descriptor
            );

            if (distance < bestDistance) {
              bestDistance = distance;
              bestMatch = attendance;
            }
          }
        });

        if (bestMatch && bestDistance < 0.6) {
          bestMatch.detections++;
          bestMatch.timestamps.push(now);
          bestMatch.confidenceScores.push(detection.detection._score);
          bestMatch.status = bestMatch.detections >= this.config.requiredDetections ? "present" : "partial";
          processedCount++;

          const facePayload = {
            person_id: bestMatch.studentId,
            face_descriptor: descriptorArray,
            confidence_score: detection.detection._score,
            enrollment_method: 'auto',
            photo_url: null,
            created_at: now.toISOString(),
            updated_at: now.toISOString(),
            is_active: true
          };

          console.log(`✅ Matched student: ${bestMatch.name} (distance: ${bestDistance.toFixed(3)})`);
          console.log("🔎 Face Encoding Payload for DB:", JSON.stringify(facePayload, null, 2));
        } else {
          console.log(`❌ Unknown face detected (best distance: ${bestDistance.toFixed(3)})`);
        }
      });
      console.log(`Processed detections for ${processedCount} students`);
    } catch (error) {
      console.error("Error processing detections:", error);
    }
  };

  computeEuclideanDistance = (desc1, desc2) => {
    let sum = 0;
    for (let i = 0; i < desc1.length; i++) {
      const diff = desc1[i] - desc2[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  };


  updateAttendanceDisplay = () => {
    const tbody = document.querySelector("#attendanceTable tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    let presentCount = 0, partialCount = 0, absentCount = 0;
    
    Array.from(this.attendanceData.values())
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((attendance) => {
        const row = document.createElement("tr");
        row.className = `attendance-row status-${attendance.status}`;
        
        const avgConfidence = attendance.confidenceScores.length
          ? (attendance.confidenceScores.reduce((a, b) => a + b, 0) / attendance.confidenceScores.length).toFixed(2)
          : "0.00";
        
        row.innerHTML = `
          <td>${attendance.name}</td>
          <td>${attendance.idNumber}</td>
          <td>${attendance.detections}</td>
          <td>${avgConfidence}</td>
          <td><span class="status-badge status-badge--${attendance.status}">${attendance.status}</span></td>
        `;
        
        tbody.appendChild(row);
        
        if (attendance.status === "present") presentCount++;
        else if (attendance.status === "partial") partialCount++;
        else absentCount++;
      });
    
    document.getElementById("totalStudents").textContent = this.attendanceData.size;
    document.getElementById("presentCount").textContent = presentCount;
    document.getElementById("partialCount").textContent = partialCount;
    document.getElementById("absentCount").textContent = absentCount;
  };

  updateSessionProgress = () => {
    const progressPercent = (this.captureCount / this.config.totalCaptures) * 100;
    const progressBar = document.getElementById("sessionProgressBar");
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }
    
    const captureProgressEl = document.getElementById("captureProgress");
    if (captureProgressEl) {
      captureProgressEl.textContent = `${this.captureCount}/${this.config.totalCaptures}`;
    }
    
    if (this.startTime) {
      const timeElapsed = Date.now() - this.startTime;
      const timeRemaining = Math.max(0, this.config.sessionDuration - timeElapsed);
      const minutesRemaining = Math.floor(timeRemaining / 60000);
      
      const timeRemainingEl = document.getElementById("timeRemaining");
      if (timeRemainingEl) {
        timeRemainingEl.textContent = `${minutesRemaining}m`;
      }
    }
  };

  apiCall = async (endpoint, method = "GET", data = null) => {
    const url = this.config.api_endpoint + endpoint;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    if (this.authToken) {
      options.headers["Authorization"] = `Bearer ${this.authToken}`;
    }
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  };

  showStatus = (message, type = "info") => {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    const statusEl = document.getElementById("statusMessage");
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.className = `status-message status--${type}`;
      statusEl.style.display = "block";
      
      setTimeout(() => {
        statusEl.style.display = "none";
      }, 5000);
    }
  };

  logout = () => {
    this.currentUser = null;
    this.authToken = null;
    
    if (this.currentStream) {
      this.currentStream.getTracks().forEach((track) => track.stop());
    }
    
    if (this.isSessionActive) {
      this.endSession();
    }
    
    this.showLoginScreen();
    this.showStatus("Logged out successfully", "success");
  };

  endSession = () => {
    this.isSessionActive = false;
    
    if (this.captureInterval) {
      clearInterval(this.captureInterval);
    }
    
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }
    
    document.getElementById("endSessionBtn").classList.add("hidden");
    document.getElementById("uploadAttendanceBtn").classList.remove("hidden");
    
    this.showStatus("Session ended. Ready to upload attendance data.", "success");
  };

  uploadAttendance = async () => {
    try {
      const attendanceArray = Array.from(this.attendanceData.values());
      
      if (attendanceArray.length === 0) {
        this.showStatus("No attendance data to upload", "error");
        return;
      }
      
      const response = await this.apiCall("/attendance/batch-submit", "POST", {
        session_id: this.sessionData.id,
        attendance_data: attendanceArray,
      });
      
      if (response && response.success) {
        this.showStatus("Attendance uploaded successfully!", "success");
        document.getElementById("uploadAttendanceBtn").classList.add("hidden");
        document.getElementById("startSessionBtn").disabled = false;
        
        this.attendanceData.clear();
        this.updateAttendanceDisplay();
      }
    } catch (error) {
      console.error("Upload attendance error:", error);
      this.showStatus("Failed to upload attendance. Please try again.", "error");
    }
  };
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing Face Attendance System...");
  new FaceAttendanceSystem();
});
