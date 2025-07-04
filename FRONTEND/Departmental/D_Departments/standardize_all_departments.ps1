# PowerShell script to standardize all D_Departments HTML files
# Define the department mappings with their specific content

$departments = @{
    "biotechnology" = @{
        "title" = "Biotechnology Department"
        "logo" = "dep_biotechnology.png"
        "description" = "Welcome to the Biotechnology Department - Pioneering biological innovation and technology at GLA University."
        "about" = "The Biotechnology Department focuses on cutting-edge research in genetic engineering, bioinformatics, molecular biology, and bioprocess technology to address challenges in healthcare, agriculture, and environmental sustainability."
        "clubs" = @()
    }
    "ce" = @{
        "title" = "Civil Engineering Department"
        "logo" = "dep_ce.png"
        "description" = "Welcome to the Civil Engineering Department - Building the future infrastructure at GLA University."
        "about" = "The Civil Engineering Department specializes in structural engineering, transportation systems, environmental engineering, and construction management to develop sustainable infrastructure solutions."
        "clubs" = @()
    }
    "cea" = @{
        "title" = "Computer Engineering & Applications Department"
        "logo" = "dep_cea.png"
        "description" = "Welcome to the Computer Engineering & Applications Department - Innovating technology solutions at GLA University."
        "about" = "The Computer Engineering & Applications Department focuses on software development, computer systems, artificial intelligence, and emerging technologies to solve real-world problems."
        "clubs" = @()
    }
    "chemistry" = @{
        "title" = "Chemistry Department"
        "logo" = "dep_chemistry.png"
        "description" = "Welcome to the Chemistry Department - Exploring molecular science at GLA University."
        "about" = "The Chemistry Department conducts advanced research in organic, inorganic, physical, and analytical chemistry, contributing to pharmaceutical, materials science, and environmental applications."
        "clubs" = @(
            @{"name" = "ChemGLA"; "image" = "chemgla logo.jpg"; "description" = "Chemical research and innovation society."}
        )
    }
    "ec" = @{
        "title" = "Electronics & Communication Department"
        "logo" = "dep_ec.png"
        "description" = "Welcome to the Electronics & Communication Department - Advancing communication technology at GLA University."
        "about" = "The Electronics & Communication Department specializes in telecommunications, signal processing, embedded systems, and VLSI design to develop next-generation communication technologies."
        "clubs" = @()
    }
    "ee" = @{
        "title" = "Electrical Engineering Department"
        "logo" = "dep_ee.png"
        "description" = "Welcome to the Electrical Engineering Department - Powering innovation at GLA University."
        "about" = "The Electrical Engineering Department focuses on power systems, renewable energy, control systems, and electrical machinery to develop sustainable energy solutions."
        "clubs" = @()
    }
    "ibm" = @{
        "title" = "Institute of Business Management Department"
        "logo" = "dep_ibm.png"
        "description" = "Welcome to the Institute of Business Management - Shaping future business leaders at GLA University."
        "about" = "The Institute of Business Management provides comprehensive education in management, entrepreneurship, finance, and strategic planning to develop skilled business professionals."
        "clubs" = @(
            @{"name" = "Finance Club"; "image" = "finance logo.jpg"; "description" = "Financial literacy and investment awareness."},
            @{"name" = "Empresario"; "image" = "empresario logo.jpg"; "description" = "Entrepreneurship and business development."}
        )
    }
    "ibm-pg" = @{
        "title" = "Institute of Business Management (PG) Department"
        "logo" = "dep_ibmpg.png"
        "description" = "Welcome to the Institute of Business Management (PG) - Advanced business education at GLA University."
        "about" = "The Institute of Business Management (PG) offers postgraduate programs in advanced management, strategic leadership, and specialized business domains for experienced professionals."
        "clubs" = @()
    }
    "ipr" = @{
        "title" = "Intellectual Property Rights Department"
        "logo" = "dep_ipr.png"
        "description" = "Welcome to the Intellectual Property Rights Department - Protecting innovation at GLA University."
        "about" = "The Intellectual Property Rights Department focuses on patent law, trademark protection, copyright management, and innovation commercialization to safeguard intellectual assets."
        "clubs" = @()
    }
    "law" = @{
        "title" = "Law Department"
        "logo" = "dep_law.png"
        "description" = "Welcome to the Law Department - Upholding justice and legal excellence at GLA University."
        "about" = "The Law Department provides comprehensive legal education covering constitutional law, criminal law, corporate law, and international law to develop skilled legal professionals."
        "clubs" = @()
    }
    "mathematics" = @{
        "title" = "Mathematics Department"
        "logo" = "dep_mathematics.png"
        "description" = "Welcome to the Mathematics Department - Exploring mathematical sciences at GLA University."
        "about" = "The Mathematics Department conducts research in pure and applied mathematics, statistics, and computational mathematics to solve complex theoretical and practical problems."
        "clubs" = @()
    }
    "me" = @{
        "title" = "Mechanical Engineering Department"
        "logo" = "dep_me.png"
        "description" = "Welcome to the Mechanical Engineering Department - Engineering mechanical solutions at GLA University."
        "about" = "The Mechanical Engineering Department specializes in thermodynamics, manufacturing, robotics, and automotive engineering to develop innovative mechanical systems and solutions."
        "clubs" = @(
            @{"name" = "Mechanical & Informative"; "image" = "mechanical and informative logo.jpg"; "description" = "Mechanical engineering innovations and information sharing."}
        )
    }
    "polytechnic" = @{
        "title" = "Polytechnic Department"
        "logo" = "dep_polytechnic.png"
        "description" = "Welcome to the Polytechnic Department - Technical education excellence at GLA University."
        "about" = "The Polytechnic Department provides hands-on technical education in various engineering disciplines, focusing on practical skills and industry readiness."
        "clubs" = @()
    }
    "science" = @{
        "title" = "Science Department"
        "logo" = "dep_science.png"
        "description" = "Welcome to the Science Department - Advancing scientific knowledge at GLA University."
        "about" = "The Science Department encompasses physics, chemistry, biology, and interdisciplinary sciences, conducting research to understand natural phenomena and develop scientific applications."
        "clubs" = @()
    }
}

# Base template function
function Create-DepartmentHTML($deptKey, $deptInfo) {
    $clubsSection = ""
    if ($deptInfo.clubs.Count -gt 0) {
        $clubsSection = @"
        
        <div class="club-grid">
"@
        foreach ($club in $deptInfo.clubs) {
            $clubsSection += @"

          <div class="club-card">
            <img src="../../images/$($club.image)" alt="$($club.name)" class="club-image" />
            <h3>$($club.name)</h3>
            <p>$($club.description)</p>
          </div>
"@
        }
        $clubsSection += @"

        </div>
"@
    }

    return @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GLA University - $($deptInfo.title)</title>
  <link rel="stylesheet" href="../../Header_Footer.css" />
  <link rel="stylesheet" href="All_Department.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
</head>
<body>
  <!-- ===================== Top Bar ===================== -->
  <div class="modern-top-bar">
    <div class="top-bar-content">
      <div class="top-bar-left">
        <div class="contact-info">
          <span class="contact-item"><i class="icon">📞</i><span>+91-5662-250900</span></span>
          <span class="contact-item"><i class="icon">✉️</i><span>info@gla.ac.in</span></span>
        </div>
      </div>
      <div class="top-bar-right">
        <div class="top-social-links">
          <a href="https://www.facebook.com/glauniv" class="top-social-icon" title="Facebook"><img src="../../images/facebook.png" alt="Facebook"></a>
          <a href="#" class="top-social-icon" title="Twitter"><img src="../../images/twitter.png" alt="Twitter"></a>
          <a href="https://www.linkedin.com/school/gla-university/posts/?feedView=all" class="top-social-icon" title="LinkedIn"><img src="../../images/linkedin.png" alt="LinkedIn"></a>
          <a href="https://www.instagram.com/glauniv" class="top-social-icon" title="Instagram"><img src="../../images/instagram.png" alt="Instagram"></a>
          <a href="https://api.whatsapp.com/send?phone=916399020003&text=Hello%20GLA%20University!" class="top-social-icon" title="WhatsApp"><img src="../../images/whatsapp.png" alt="WhatsApp"></a>
        </div>
        <div class="accessibility-controls">
          <button type="button" class="control-btn" id="$($deptKey)-zoom-in" title="Increase Font Size"><span>A+</span></button>
          <button type="button" class="control-btn" id="$($deptKey)-zoom-out" title="Decrease Font Size"><span>A-</span></button>
          <button type="button" class="control-btn" id="$($deptKey)-reset" title="Reset Font Size"><span>↻</span></button>
        </div>
      </div>
    </div>
  </div>
  <!-- ===================== End Top Bar ===================== -->

  <!-- ===================== Navbar ===================== -->
  <header class="modern-navbar">
    <div class="navbar-container">
      <button type="button" class="mobile-menu-btn" id="menu-toggle" aria-label="Toggle Menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      <div class="brand-logo">
        <img src="../../images/logo.png" alt="GLA University Logo" class="logo-img">
        <div class="brand-text">
          <h1 class="university-name">GLA UNIVERSITY</h1>
          <span class="brand-subtitle">Excellence in Education</span>
        </div>
      </div>
      <nav class="navbar-nav">
        <ul class="nav-menu">
          <li class="nav-item"><a href="../../index.html" class="nav-link"><i class="nav-icon">🏠</i><span>Home</span></a></li>
          <li class="nav-item"><a href="https://www.gla.ac.in/" class="nav-link"><i class="nav-icon">🏛️</i><span>Institute</span></a></li>
          <li class="nav-item"><a href="../../others/campus_events.html" class="nav-link"><i class="nav-icon">📅</i><span>Campus Events</span></a></li>
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle"><i class="nav-icon">👥</i><span>Council Division</span><i class="dropdown-arrow">▼</i></a>
            <ul class="dropdown-menu">
              <li><a href="../../Council/student-affairs.html" class="dropdown-link">Student Affairs Council</a></li>
              <li><a href="../../Council/cultural-affairs.html" class="dropdown-link">Cultural Affairs Council</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle"><i class="nav-icon">📚</i><span>Student Clubs</span><i class="dropdown-arrow">▼</i></a>
            <ul class="dropdown-menu">
              <li><a href="../../Cultural/cultural_club.html" class="dropdown-link">Cultural Clubs</a></li>
              <li><a href="../Departmental.html" class="dropdown-link">Departmental Clubs</a></li>
              <li><a href="../../Sports/Sports.html" class="dropdown-link">Sports Clubs</a></li>
            </ul>
          </li>
          <li class="nav-item"><a href="#" class="nav-link"><i class="nav-icon">♿</i><span>Disability Support</span></a></li>
          <li class="nav-item"><a href="#" class="nav-link"><i class="nav-icon">🎓</i><span>Alumni</span></a></li>
          <li class="nav-item"><a href="#" class="nav-link"><i class="nav-icon">📋</i><span>Policies</span></a></li>
        </ul>
      </nav>
    </div>
  </header>
  <!-- ===================== End Navbar ===================== -->

  <!-- ===================== Sidebar Backdrop ===================== -->
  <div class="sidebar-backdrop" id="sidebarBackdrop"></div>

  <!-- ===================== Sidebar Popup ===================== -->
  <div class="popup-sidebar" id="popupSidebar">
    <ul>
      <li><a href="../../others/about.html">About</a></li>
      <li><a href="../../others/newsletters.html">Newsletters</a></li>
      <li><a href="../../others/student_activity.html">Student Activity Centre</a></li>
      <li>
        <a href="#" data-section="council" class="main-menu-item">Council</a>
        <div class="sub-menu" id="council-submenu">
          <button type="button" class="sub-menu-btn" data-section="student-affairs" data-url="../../Council/student-affairs.html">Student Affairs Council</button>
          <button type="button" class="sub-menu-btn" data-section="cultural-affairs" data-url="../../Council/cultural-affairs.html">Cultural Affairs Council</button>
        </div>
      </li>
      <li>
        <a href="#" data-section="clubs" class="main-menu-item">Students Clubs</a>
        <div class="sub-menu" id="clubs-submenu">
          <button type="button" class="sub-menu-btn" data-section="cultural" data-url="../../Cultural/cultural_club.html">Cultural</button>
          <button type="button" class="sub-menu-btn" data-section="departmental" data-url="../Departmental.html">Departmental</button>
          <button type="button" class="sub-menu-btn" data-section="sports" data-url="../../Sports/Sports.html">Sports</button>
        </div>
      </li>
      <li><a href="../../others/NCC.html">NCC</a></li>
      <li><a href="../../others/NSS.html">NSS</a></li>
    </ul>
  </div>
  <!-- ===================== End Sidebar Popup ===================== -->

  <!-- ===================== Main Content ===================== -->
  <main>
    <!-- $($deptInfo.title) Content -->
    <section class="club-content">
      <div class="club-header">
        <img src="../../images/$($deptInfo.logo)" alt="$($deptInfo.title) Logo" class="club-logo" />
        <h1 class="club-name">$($deptInfo.title)</h1>
        <p class="club-description">
          $($deptInfo.description)
        </p>
      </div>
      
      <div class="club-info">
        <h3>About $($deptInfo.title)</h3>
        <p>$($deptInfo.about)</p>$clubsSection
      </div>
    </section>
  </main>
  <!-- ===================== End Main Content ===================== -->

  <!-- ===================== Footer ===================== -->
  <footer class="modern-footer">
    <div class="footer-waves">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="footer-fill"></path>
      </svg>
    </div>
    <div class="footer-content">
      <div class="footer-section footer-brand">
        <div class="brand-logo">
          <img src="../../images/logo.png" alt="GLA University" class="footer-logo">
          <h3>GLA UNIVERSITY</h3>
        </div>
        <p class="brand-description">Empowering minds, shaping futures. A premier educational institution committed to excellence in teaching, research, and innovation.</p>
        <div class="footer-stats">
          <div class="stat-item"><span class="stat-number" data-target="25000">0</span><span class="stat-label">Students</span></div>
          <div class="stat-item"><span class="stat-number" data-target="1500">0</span><span class="stat-label">Faculty</span></div>
          <div class="stat-item"><span class="stat-number" data-target="50">0</span><span class="stat-label">Programs</span></div>
        </div>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>About Us</a></li>
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>Admissions</a></li>
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>Academic Programs</a></li>
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>Research</a></li>
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>Student Life</a></li>
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>Alumni</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Campus Resources</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>Library</a></li>
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>Sports Complex</a></li>
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>Hostel Facilities</a></li>
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>Medical Center</a></li>
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>Career Services</a></li>
          <li><a href="#" class="footer-link"><i class="link-icon">▶</i>International Office</a></li>
        </ul>
      </div>
      <div class="footer-section footer-contact">
        <h4>Get in Touch</h4>
        <div class="contact-item"><div class="contact-icon">📍</div><div class="contact-text"><strong>Address:</strong><br>17km Stone, NH-2, Mathura-Delhi Road<br>Mathura-281 406 (U.P.) INDIA</div></div>
        <div class="contact-item"><div class="contact-icon">📞</div><div class="contact-text"><strong>Phone:</strong><br><a href="tel:+915662250900">+91-5662-250900</a></div></div>
        <div class="contact-item"><div class="contact-icon">✉️</div><div class="contact-text"><strong>Email:</strong><br><a href="mailto:glaoftwaresupport@gla.ac.in">glaoftwaresupport@gla.ac.in</a></div></div>
      </div>
      <div class="footer-section footer-apps">
        <h4>Mobile Apps</h4>
        <p>Download our apps for easy access</p>
        <div class="app-buttons">
          <a href="https://play.google.com/store/search?q=gla+university+app&c=apps" class="app-button"><img src="../../images/google-play.png" alt="Google Play" class="app-icon"></a>
          <a href="#" class="app-button"><img src="../../images/app-store.png" alt="App Store" class="app-icon"></a>
        </div>
      </div>
    </div>
    <div class="footer-social">
      <h4>Follow Us</h4>
      <div class="social-links">
        <a href="https://www.facebook.com/glauniv" class="social-link facebook" title="Facebook"><img src="../../images/facebook.png" alt="Facebook"><span class="social-text">Facebook</span></a>
        <a href="#" class="social-link twitter" title="Twitter"><img src="../../images/twitter.png" alt="Twitter"><span class="social-text">Twitter</span></a>
        <a href="https://www.linkedin.com/school/gla-university/posts/?feedView=all" class="social-link linkedin" title="LinkedIn"><img src="../../images/linkedin.png" alt="LinkedIn"><span class="social-text">LinkedIn</span></a>
        <a href="https://www.instagram.com/glauniv" class="social-link instagram" title="Instagram"><img src="../../images/instagram.png" alt="Instagram"><span class="social-text">Instagram</span></a>
        <a href="https://api.whatsapp.com/send?phone=916399020003&text=Hello%20GLA%20University!" class="social-link whatsapp" title="WhatsApp"><img src="../../images/whatsapp.png" alt="WhatsApp"><span class="social-text">WhatsApp</span></a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p>&copy; 2025 GLA University. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
      <div class="back-to-top" id="backToTop"><span>↑</span></div>
    </div>
  </footer>
  <!-- ===================== End Footer ===================== -->
  
  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="../../Header_Footer.js"></script>
  <script src="All_Department.js"></script>
</body>
</html>
"@
}

# Process each department
foreach ($deptKey in $departments.Keys) {
    if ($deptKey -ne "agriculture") {  # Skip agriculture as it's already done
        $deptInfo = $departments[$deptKey]
        $htmlContent = Create-DepartmentHTML -deptKey $deptKey -deptInfo $deptInfo
        $filePath = "c:\Users\sagar\OneDrive\Desktop\GLA\FRONTEND\Departmental\D_Departments\$deptKey.html"
        
        Write-Host "Creating standardized file for: $($deptInfo.title)"
        $htmlContent | Out-File -FilePath $filePath -Encoding UTF8
    }
}

Write-Host "All D_Departments files have been standardized!"
