import { createHash } from 'crypto';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Get the request path
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  
  // Serve different content based on path
  if (path === '/' || path === '/index.html') {
    return serveWebsite(req, res);
  } else if (path === '/script' || path === '/get' || path === '/api/script') {
    return serveScript(req, res);
  } else if (path === '/style.css') {
    return serveCSS(req, res);
  } else if (path === '/app.js') {
    return serveAppJS(req, res);
  } else {
    return serve404(req, res);
  }
}

// Function to serve the main website
async function serveWebsite(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isMobile = userAgent.includes('Mobile') || userAgent.includes('Android');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EON HUB | Advanced Roblox Script Hub</title>
    <meta name="description" content="Eon Hub - Advanced Roblox script with Auto-Steal, Bypassing Noclip, and modern Acrylic UI">
    <meta name="keywords" content="roblox, script, executor, hub, eon hub, auto steal, noclip">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        ${getCSS()}
    </style>
</head>
<body>
    <!-- Background Animation -->
    <div class="bg-animation">
        <div class="gradient-circle circle-1"></div>
        <div class="gradient-circle circle-2"></div>
        <div class="gradient-circle circle-3"></div>
        <div class="gradient-circle circle-4"></div>
    </div>
    
    <!-- Main Container -->
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="logo">
                <i class="fas fa-infinity logo-icon"></i>
                <h1>EON <span class="gradient-text">HUB</span></h1>
                <span class="version">v2.0</span>
            </div>
            <nav class="nav">
                <a href="#features"><i class="fas fa-star"></i> Features</a>
                <a href="#how-to"><i class="fas fa-code"></i> How to Use</a>
                <a href="#faq"><i class="fas fa-question-circle"></i> FAQ</a>
                <button id="copyBtn" class="btn-primary">
                    <i class="fas fa-copy"></i> Copy Loadstring
                </button>
            </nav>
            <div class="mobile-toggle">
                <i class="fas fa-bars"></i>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-content">
                <div class="badge">
                    <i class="fas fa-bolt"></i> <span>ADVANCED VERSION</span>
                </div>
                <h2 class="hero-title">Beyond <span class="gradient-text">Limits</span></h2>
                <p class="hero-subtitle">The most advanced Roblox script hub with cutting-edge features and modern Acrylic UI</p>
                
                <div class="stats">
                    <div class="stat">
                        <i class="fas fa-bolt"></i>
                        <div>
                            <h3>0ms</h3>
                            <p>Instant Steal</p>
                        </div>
                    </div>
                    <div class="stat">
                        <i class="fas fa-shield-alt"></i>
                        <div>
                            <h3>99%</h3>
                            <p>Undetected</p>
                        </div>
                    </div>
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <div>
                            <h3>10K+</h3>
                            <p>Users</p>
                        </div>
                    </div>
                </div>
                
                <div class="hero-buttons">
                    <button id="executeBtn" class="btn-execute">
                        <i class="fas fa-play"></i> Execute Script
                    </button>
                    <button id="copyLoadstring" class="btn-secondary">
                        <i class="fas fa-code"></i> Get Loadstring
                    </button>
                    <button id="discordBtn" class="btn-discord">
                        <i class="fab fa-discord"></i> Discord
                    </button>
                </div>
                
                <div class="loadstring-box">
                    <div class="loadstring-header">
                        <i class="fas fa-terminal"></i>
                        <span>Secure Loadstring</span>
                        <span class="security-badge">
                            <i class="fas fa-lock"></i> Executor Only
                        </span>
                    </div>
                    <div class="loadstring-content" id="loadstringUrl">
                        ${req.headers.host ? `loadstring(game:HttpGet("https://${req.headers.host}/script"))()` : 'Loading...'}
                    </div>
                    <div class="loadstring-footer">
                        <button class="btn-copy-small" onclick="copyToClipboard()">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                        <span class="copy-status" id="copyStatus"></span>
                        <span class="security-note">
                            <i class="fas fa-eye-slash"></i> Anti-View Protected
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="hero-preview">
                <div class="preview-container">
                    <div class="preview-window">
                        <div class="preview-header">
                            <div class="preview-dots">
                                <span class="dot red"></span>
                                <span class="dot yellow"></span>
                                <span class="dot green"></span>
                            </div>
                            <span class="preview-title">EON HUB Interface</span>
                            <span class="preview-badge">Acrylic UI</span>
                        </div>
                        <div class="preview-content">
                            <div class="ui-preview">
                                <div class="ui-sidebar">
                                    <div class="ui-section active">
                                        <i class="fas fa-gem"></i> Auto Steal
                                    </div>
                                    <div class="ui-section">
                                        <i class="fas fa-running"></i> Movement
                                    </div>
                                    <div class="ui-section">
                                        <i class="fas fa-eye"></i> Visuals
                                    </div>
                                    <div class="ui-section">
                                        <i class="fas fa-cog"></i> Settings
                                    </div>
                                </div>
                                <div class="ui-main">
                                    <div class="ui-feature">
                                        <div class="ui-feature-header">
                                            <i class="fas fa-bolt"></i>
                                            <span>Instant Auto-Steal</span>
                                        </div>
                                        <div class="ui-toggle active">
                                            <div class="toggle-switch"></div>
                                            <span class="toggle-status">ACTIVE</span>
                                        </div>
                                    </div>
                                    <div class="ui-feature">
                                        <div class="ui-feature-header">
                                            <i class="fas fa-ghost"></i>
                                            <span>Bypassing Noclip</span>
                                        </div>
                                        <div class="ui-toggle">
                                            <div class="toggle-switch"></div>
                                            <span class="toggle-status">INACTIVE</span>
                                        </div>
                                    </div>
                                    <div class="ui-slider-container">
                                        <div class="ui-slider-label">
                                            <i class="fas fa-tachometer-alt"></i>
                                            <span>Speed Multiplier</span>
                                            <span class="slider-value">2.5x</span>
                                        </div>
                                        <div class="ui-slider">
                                            <div class="slider-track">
                                                <div class="slider-thumb"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="features" id="features">
            <h2 class="section-title">Unlimited <span class="gradient-text">Features</span></h2>
            <p class="section-subtitle">Advanced tools designed for maximum performance</p>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3>Instant Auto-Steal</h3>
                    <p>Bypass all restrictions with 0ms hold duration and unlimited range.</p>
                    <div class="feature-tags">
                        <span class="tag">Smart Return</span>
                        <span class="tag">Base System</span>
                    </div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-ghost"></i>
                    </div>
                    <h3>Bypassing Noclip</h3>
                    <p>Advanced collision bypass system with safe character handling.</p>
                    <div class="feature-tags">
                        <span class="tag">Physics Bypass</span>
                        <span class="tag">Auto-Reconnect</span>
                    </div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-tachometer-alt"></i>
                    </div>
                    <h3>CFrame Speed</h3>
                    <p>Enhanced movement using CFrame manipulation with adjustable multiplier.</p>
                    <div class="feature-tags">
                        <span class="tag">1-10x Speed</span>
                        <span class="tag">Smooth Movement</span>
                    </div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-palette"></i>
                    </div>
                    <h3>Acrylic UI</h3>
                    <p>Modern interface with blur effects, smooth animations, and customization.</p>
                    <div class="feature-tags">
                        <span class="tag">Theme Support</span>
                        <span class="tag">Mobile Ready</span>
                    </div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-sync-alt"></i>
                    </div>
                    <h3>Smart Desync</h3>
                    <p>Advanced network manipulation with normal and spam modes.</p>
                    <div class="feature-tags">
                        <span class="tag">Anti-Lag</span>
                        <span class="tag">Flicker Mode</span>
                    </div>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-database"></i>
                    </div>
                    <h3>Config System</h3>
                    <p>Save, load, and manage configurations with auto-save feature.</p>
                    <div class="feature-tags">
                        <span class="tag">Profiles</span>
                        <span class="tag">Cloud Sync</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- How to Use Section -->
        <section class="how-to" id="how-to">
            <h2 class="section-title">Simple <span class="gradient-text">Execution</span></h2>
            <p class="section-subtitle">Get started in just a few steps</p>
            
            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3>Copy Loadstring</h3>
                        <p>Click the "Copy Loadstring" button above to get the secure URL.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3>Open Executor</h3>
                        <p>Launch Roblox and open your executor (Synapse, Krnl, Fluxus, etc.).</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3>Execute Script</h3>
                        <p>Paste the loadstring into your executor and press execute.</p>
                        <div class="code-block">
                            <code>loadstring(game:HttpGet("URL"))()</code>
                        </div>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h3>Enjoy Eon Hub</h3>
                        <p>Press <kbd>RightControl</kbd> to toggle the UI and access all features!</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Executor Support -->
        <section class="executors">
            <h2 class="section-title">Supported <span class="gradient-text">Executors</span></h2>
            <div class="executor-grid">
                <div class="executor-card">
                    <i class="fas fa-bolt"></i>
                    <span>Synapse X</span>
                </div>
                <div class="executor-card">
                    <i class="fas fa-cube"></i>
                    <span>Krnl</span>
                </div>
                <div class="executor-card">
                    <i class="fas fa-atom"></i>
                    <span>Fluxus</span>
                </div>
                <div class="executor-card">
                    <i class="fas fa-code"></i>
                    <span>Script-Ware</span>
                </div>
                <div class="executor-card">
                    <i class="fas fa-star"></i>
                    <span>Oxygen U</span>
                </div>
                <div class="executor-card">
                    <i class="fas fa-infinity"></i>
                    <span>Comet</span>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq" id="faq">
            <h2 class="section-title">Common <span class="gradient-text">Questions</span></h2>
            
            <div class="faq-list">
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>Is Eon Hub detected by anti-cheat?</h3>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Eon Hub uses advanced anti-detection methods and is regularly updated to stay undetected by most anti-cheat systems.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>Why can't I view the script in my browser?</h3>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>The script is protected with anti-view technology to prevent detection. It can only be accessed through supported executors.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>Is Eon Hub free to use?</h3>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes, Eon Hub is completely free with all features unlocked. No premium version or paywalls.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>Does it work on mobile?</h3>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes! The Acrylic UI is fully mobile-compatible and works with mobile executors.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>How often is Eon Hub updated?</h3>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Regular updates every 1-2 weeks with new features, bug fixes, and anti-detection improvements.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-logo">
                    <i class="fas fa-infinity"></i>
                    <span>EON HUB</span>
                </div>
                <p class="footer-text">Beyond Limits, Beyond Time</p>
                
                <div class="footer-links">
                    <a href="#" onclick="showModal('discord')"><i class="fab fa-discord"></i> Discord</a>
                    <a href="#" onclick="showModal('github')"><i class="fab fa-github"></i> GitHub</a>
                    <a href="#" onclick="showModal('telegram')"><i class="fab fa-telegram"></i> Telegram</a>
                    <a href="#" onclick="showModal('youtube')"><i class="fab fa-youtube"></i> YouTube</a>
                </div>
                
                <div class="footer-notes">
                    <p class="copyright">© 2024 Eon Hub. All rights reserved.</p>
                    <p class="disclaimer">This software is for educational purposes only. Use at your own risk.</p>
                </div>
            </div>
        </footer>
    </div>

    <!-- Modal -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div id="modal-body"></div>
        </div>
    </div>

    <!-- Script -->
    <script>
        ${getJavaScript(req.headers.host)}
    </script>
</body>
</html>`;
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(html);
}

// Function to serve the actual script (with anti-view protection)
async function serveScript(req, res) {
  // Anti-view protection
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers['referer'] || '';
  
  // Check if it's likely a browser trying to view the script
  const isBrowser = userAgent.includes('Mozilla') && 
                   !userAgent.includes('Executor') &&
                   !userAgent.includes('Roblox') &&
                   !userAgent.includes('Synapse') &&
                   !userAgent.includes('Krnl') &&
                   !userAgent.includes('Fluxus');
  
  // If it's a browser, show error
  if (isBrowser && !referer.includes('roblox')) {
    return res.status(403).send(getAntiViewHTML(req.headers.host));
  }
  
  // Generate the Eon Hub script
  const script = generateEonHubScript(req.headers.host);
  
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(script);
}

// Function to serve CSS
async function serveCSS(req, res) {
  res.setHeader('Content-Type', 'text/css; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(getCSS());
}

// Function to serve JavaScript
async function serveAppJS(req, res) {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(getJavaScript(req.headers.host));
}

// Function to serve 404
async function serve404(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>404 - Eon Hub</title>
        <style>
            body {
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
                color: white;
                font-family: 'Montserrat', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .error-container {
                text-align: center;
                padding: 40px;
                background: rgba(20, 20, 30, 0.9);
                border-radius: 20px;
                border: 1px solid rgba(255, 20, 147, 0.3);
                backdrop-filter: blur(10px);
            }
            h1 {
                color: #ff1493;
                font-size: 3em;
                margin-bottom: 20px;
            }
            a {
                color: #00ffaa;
                text-decoration: none;
                margin-top: 20px;
                display: inline-block;
                padding: 10px 20px;
                border: 2px solid #00ffaa;
                border-radius: 10px;
                transition: all 0.3s;
            }
            a:hover {
                background: rgba(0, 255, 170, 0.1);
            }
        </style>
    </head>
    <body>
        <div class="error-container">
            <h1>404</h1>
            <p>Page not found</p>
            <a href="/">Go Home</a>
        </div>
    </body>
    </html>
  `);
}

// CSS Generator Function
function getCSS() {
  return `
    /* Reset & Base Styles */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --primary: #ff1493;
        --secondary: #00ffaa;
        --accent: #8a2be2;
        --dark: #0a0a0a;
        --darker: #050505;
        --light: #ffffff;
        --gray: #888;
        --gradient: linear-gradient(135deg, var(--primary), var(--accent), var(--secondary));
        --gradient-reverse: linear-gradient(135deg, var(--secondary), var(--accent), var(--primary));
    }

    body {
        font-family: 'Montserrat', sans-serif;
        background: var(--dark);
        color: var(--light);
        min-height: 100vh;
        overflow-x: hidden;
    }

    .bg-animation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        overflow: hidden;
    }

    .gradient-circle {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.3;
        animation: float 20s infinite linear;
    }

    .circle-1 {
        width: 500px;
        height: 500px;
        background: var(--primary);
        top: -250px;
        left: -250px;
        animation-delay: 0s;
    }

    .circle-2 {
        width: 400px;
        height: 400px;
        background: var(--accent);
        top: 50%;
        right: -200px;
        animation-delay: -5s;
        animation-direction: reverse;
    }

    .circle-3 {
        width: 300px;
        height: 300px;
        background: var(--secondary);
        bottom: -150px;
        left: 20%;
        animation-delay: -10s;
    }

    .circle-4 {
        width: 600px;
        height: 600px;
        background: var(--primary);
        top: 60%;
        left: 60%;
        opacity: 0.2;
        animation-delay: -15s;
        animation-direction: reverse;
    }

    @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(100px, 50px) rotate(90deg); }
        50% { transform: translate(50px, 100px) rotate(180deg); }
        75% { transform: translate(-50px, 50px) rotate(270deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
    }

    .gradient-text {
        background: var(--gradient);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        display: inline-block;
    }

    /* Container */
    .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 20px;
        position: relative;
        z-index: 1;
    }

    /* Header */
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 0;
        border-bottom: 1px solid rgba(255, 20, 147, 0.2);
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .logo-icon {
        font-size: 2.5em;
        background: var(--gradient);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    .logo h1 {
        font-family: 'Orbitron', sans-serif;
        font-size: 2em;
        font-weight: 900;
    }

    .version {
        background: rgba(255, 20, 147, 0.2);
        color: var(--primary);
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.8em;
        font-weight: 600;
    }

    .nav {
        display: flex;
        align-items: center;
        gap: 30px;
    }

    .nav a {
        color: var(--light);
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .nav a:hover {
        color: var(--primary);
        transform: translateY(-2px);
    }

    /* Buttons */
    .btn-primary, .btn-secondary, .btn-execute, .btn-discord {
        padding: 12px 24px;
        border: none;
        border-radius: 10px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 1em;
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 10px;
    }

    .btn-primary {
        background: var(--gradient);
        color: white;
    }

    .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(255, 20, 147, 0.3);
    }

    .btn-secondary {
        background: transparent;
        color: var(--light);
        border: 2px solid var(--primary);
    }

    .btn-secondary:hover {
        background: rgba(255, 20, 147, 0.1);
        transform: translateY(-3px);
    }

    .btn-execute {
        background: var(--gradient-reverse);
        color: white;
        font-size: 1.1em;
        padding: 15px 30px;
    }

    .btn-execute:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(0, 255, 170, 0.3);
    }

    .btn-discord {
        background: #5865F2;
        color: white;
    }

    .btn-discord:hover {
        background: #4752C4;
        transform: translateY(-3px);
    }

    /* Hero Section */
    .hero {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
        padding: 80px 0;
        align-items: center;
    }

    .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 20, 147, 0.1);
        color: var(--primary);
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.9em;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .hero-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 3.5em;
        font-weight: 900;
        line-height: 1.2;
        margin-bottom: 20px;
    }

    .hero-subtitle {
        font-size: 1.2em;
        color: var(--gray);
        margin-bottom: 40px;
        line-height: 1.6;
    }

    .stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 40px;
    }

    .stat {
        background: rgba(20, 20, 30, 0.8);
        border: 1px solid rgba(255, 20, 147, 0.1);
        border-radius: 15px;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 15px;
        backdrop-filter: blur(10px);
    }

    .stat i {
        font-size: 2em;
        background: var(--gradient);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .stat h3 {
        font-size: 1.5em;
        font-weight: 700;
        margin-bottom: 5px;
    }

    .stat p {
        color: var(--gray);
        font-size: 0.9em;
    }

    .hero-buttons {
        display: flex;
        gap: 20px;
        margin-bottom: 40px;
        flex-wrap: wrap;
    }

    /* Loadstring Box */
    .loadstring-box {
        background: rgba(10, 10, 10, 0.8);
        border: 1px solid rgba(255, 20, 147, 0.3);
        border-radius: 15px;
        overflow: hidden;
        backdrop-filter: blur(10px);
    }

    .loadstring-header {
        background: rgba(255, 20, 147, 0.1);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
    }

    .security-badge {
        background: rgba(0, 255, 170, 0.1);
        color: var(--secondary);
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.8em;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .loadstring-content {
        padding: 20px;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
        color: var(--secondary);
        word-break: break-all;
        background: rgba(0, 0, 0, 0.5);
        min-height: 60px;
        display: flex;
        align-items: center;
    }

    .loadstring-footer {
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.3);
    }

    .btn-copy-small {
        background: var(--gradient);
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9em;
    }

    .copy-status {
        color: var(--secondary);
        font-size: 0.9em;
    }

    .security-note {
        color: var(--gray);
        font-size: 0.8em;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    /* UI Preview */
    .preview-container {
        perspective: 1000px;
    }

    .preview-window {
        background: rgba(20, 20, 30, 0.8);
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid rgba(255, 20, 147, 0.3);
        transform: rotateY(-10deg) rotateX(5deg);
        box-shadow: -20px 20px 50px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        animation: floatPreview 6s ease-in-out infinite;
    }

    @keyframes floatPreview {
        0%, 100% { transform: rotateY(-10deg) rotateX(5deg) translateY(0); }
        50% { transform: rotateY(-10deg) rotateX(5deg) translateY(-10px); }
    }

    .preview-header {
        background: rgba(30, 30, 40, 0.9);
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 20, 147, 0.2);
    }

    .preview-dots {
        display: flex;
        gap: 8px;
    }

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    .dot.red { background: #ff5f57; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #28ca42; }

    .preview-title {
        color: var(--light);
        font-weight: 600;
    }

    .preview-badge {
        background: rgba(138, 43, 226, 0.2);
        color: var(--accent);
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.8em;
    }

    .preview-content {
        padding: 30px;
    }

    .ui-preview {
        display: flex;
        gap: 20px;
    }

    .ui-sidebar {
        width: 150px;
        background: rgba(40, 40, 50, 0.9);
        border-radius: 10px;
        padding: 15px;
    }

    .ui-section {
        padding: 12px 15px;
        margin-bottom: 10px;
        border-radius: 8px;
        color: var(--gray);
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: all 0.3s;
    }

    .ui-section.active {
        background: rgba(255, 20, 147, 0.2);
        color: var(--primary);
    }

    .ui-main {
        flex: 1;
    }

    .ui-feature {
        background: rgba(50, 50, 60, 0.9);
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .ui-feature-header {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .ui-feature-header i {
        color: var(--primary);
    }

    .ui-toggle {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .toggle-switch {
        width: 50px;
        height: 25px;
        background: rgba(100, 100, 100, 0.5);
        border-radius: 25px;
        position: relative;
        cursor: pointer;
    }

    .toggle-switch::after {
        content: '';
        position: absolute;
        width: 21px;
        height: 21px;
        background: var(--light);
        border-radius: 50%;
        top: 2px;
        left: 2px;
        transition: transform 0.3s;
    }

    .toggle-switch.active {
        background: var(--gradient);
    }

    .toggle-switch.active::after {
        transform: translateX(25px);
    }

    .toggle-status {
        font-size: 0.8em;
        font-weight: 600;
        color: var(--gray);
    }

    .ui-toggle.active .toggle-status {
        color: var(--secondary);
    }

    .ui-slider-container {
        background: rgba(50, 50, 60, 0.9);
        padding: 20px;
        border-radius: 10px;
    }

    .ui-slider-label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    .ui-slider-label i {
        color: var(--accent);
    }

    .slider-value {
        color: var(--secondary);
        font-weight: 600;
    }

    .ui-slider {
        width: 100%;
        height: 6px;
        background: rgba(100, 100, 100, 0.5);
        border-radius: 3px;
        position: relative;
    }

    .slider-track {
        width: 50%;
        height: 100%;
        background: var(--gradient);
        border-radius: 3px;
    }

    .slider-thumb {
        position: absolute;
        width: 20px;
        height: 20px;
        background: var(--light);
        border-radius: 50%;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
        cursor: pointer;
    }

    /* Features Section */
    .section-title {
        font-family: 'Orbitron', sans-serif;
        font-size: 2.5em;
        text-align: center;
        margin-bottom: 20px;
    }

    .section-subtitle {
        text-align: center;
        color: var(--gray);
        margin-bottom: 60px;
        font-size: 1.1em;
    }

    .features {
        padding: 80px 0;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 30px;
    }

    .feature-card {
        background: rgba(20, 20, 30, 0.8);
        border: 1px solid rgba(255, 20, 147, 0.1);
        border-radius: 15px;
        padding: 30px;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .feature-card:hover {
        transform: translateY(-10px);
        border-color: var(--primary);
        box-shadow: 0 20px 40px rgba(255, 20, 147, 0.2);
    }

    .feature-icon {
        font-size: 2.5em;
        margin-bottom: 20px;
        background: var(--gradient);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .feature-card h3 {
        font-size: 1.4em;
        margin-bottom: 15px;
        color: var(--light);
    }

    .feature-card p {
        color: var(--gray);
        line-height: 1.6;
        margin-bottom: 20px;
    }

    .feature-tags {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    .tag {
        background: rgba(255, 20, 147, 0.1);
        color: var(--primary);
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.8em;
        font-weight: 600;
    }

    /* How to Section */
    .how-to {
        padding: 80px 0;
        background: rgba(10, 10, 20, 0.5);
        border-radius: 30px;
        margin: 40px 0;
    }

    .steps {
        max-width: 800px;
        margin: 0 auto;
    }

    .step {
        display: flex;
        align-items: flex-start;
        gap: 25px;
        margin-bottom: 40px;
        position: relative;
    }

    .step:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 25px;
        top: 60px;
        bottom: -40px;
        width: 2px;
        background: var(--gradient);
        opacity: 0.3;
    }

    .step-number {
        background: var(--gradient);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2em;
        font-weight: 700;
        flex-shrink: 0;
        position: relative;
        z-index: 1;
    }

    .step-content h3 {
        font-size: 1.3em;
        margin-bottom: 10px;
        color: var(--light);
    }

    .step-content p {
        color: var(--gray);
        margin-bottom: 15px;
    }

    .code-block {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 20, 147, 0.3);
        border-radius: 8px;
        padding: 15px;
        font-family: 'Courier New', monospace;
        color: var(--secondary);
    }

    /* Executor Support */
    .executors {
        padding: 80px 0;
    }

    .executor-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        max-width: 800px;
        margin: 0 auto;
    }

    .executor-card {
        background: rgba(20, 20, 30, 0.8);
        border: 1px solid rgba(255, 20, 147, 0.1);
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        transition: all 0.3s;
        backdrop-filter: blur(10px);
    }

    .executor-card:hover {
        transform: translateY(-5px);
        border-color: var(--primary);
    }

    .executor-card i {
        font-size: 2em;
        background: var(--gradient);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    /* FAQ Section */
    .faq {
        padding: 80px 0;
    }

    .faq-list {
        max-width: 800px;
        margin: 0 auto;
    }

    .faq-item {
        background: rgba(20, 20, 30, 0.8);
        border: 1px solid rgba(255, 20, 147, 0.1);
        border-radius: 15px;
        margin-bottom: 20px;
        overflow: hidden;
        backdrop-filter: blur(10px);
    }

    .faq-question {
        padding: 20px 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;
    }

    .faq-question:hover {
        background: rgba(255, 20, 147, 0.05);
    }

    .faq-question h3 {
        font-size: 1.1em;
        font-weight: 600;
    }

    .faq-question i {
        transition: transform 0.3s;
    }

    .faq-answer {
        padding: 0 25px;
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s;
    }

    .faq-item.active .faq-answer {
        padding: 0 25px 25px;
        max-height: 200px;
    }

    .faq-item.active .faq-question i {
        transform: rotate(180deg);
    }

    /* Footer */
    .footer {
        margin-top: 80px;
        padding: 50px 0;
        border-top: 1px solid rgba(255, 20, 147, 0.2);
        text-align: center;
    }

    .footer-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        font-size: 1.5em;
        font-weight: 700;
        margin-bottom: 20px;
    }

    .footer-logo i {
        background: var(--gradient);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .footer-text {
        color: var(--gray);
        margin-bottom: 30px;
    }

    .footer-links {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin-bottom: 30px;
        flex-wrap: wrap;
    }

    .footer-links a {
        color: var(--light);
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s;
    }

    .footer-links a:hover {
        color: var(--primary);
        transform: translateY(-2px);
    }

    .footer-notes {
        color: var(--gray);
        font-size: 0.9em;
    }

    .copyright {
        margin-bottom: 10px;
    }

    .disclaimer {
        font-size: 0.8em;
        opacity: 0.7;
    }

    /* Modal */
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        align-items: center;
        justify-content: center;
    }

    .modal-content {
        background: rgba(20, 20, 30, 0.95);
        border: 1px solid rgba(255, 20, 147, 0.3);
        border-radius: 20px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        position: relative;
        backdrop-filter: blur(10px);
    }

    .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        color: var(--light);
        font-size: 1.5em;
        cursor: pointer;
        transition: color 0.3s;
    }

    .modal-close:hover {
        color: var(--primary);
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .hero {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .stats {
            grid-template-columns: repeat(3, 1fr);
        }
        
        .preview-container {
            max-width: 600px;
            margin: 0 auto;
        }
    }

    @media (max-width: 768px) {
        .nav {
            display: none;
        }
        
        .mobile-toggle {
            display: block;
            font-size: 1.5em;
            cursor: pointer;
        }
        
        .hero-title {
            font-size: 2.5em;
        }
        
        .stats {
            grid-template-columns: 1fr;
        }
        
        .hero-buttons {
            flex-direction: column;
        }
        
        .features-grid {
            grid-template-columns: 1fr;
        }
        
        .step {
            flex-direction: column;
            text-align: center;
        }
        
        .step:not(:last-child)::after {
            display: none;
        }
        
        .executor-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 480px) {
        .hero-title {
            font-size: 2em;
        }
        
        .section-title {
            font-size: 2em;
        }
        
        .executor-grid {
            grid-template-columns: 1fr;
        }
    }
  `;
}

// JavaScript Generator Function
function getJavaScript(host) {
  const loadstringUrl = host ? `https://${host}/script` : '/script';
  const loadstringCode = `loadstring(game:HttpGet("${loadstringUrl}"))()`;
  
  return `
    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Copy functionality
        window.copyToClipboard = function() {
            const text = \`${loadstringCode}\`;
            navigator.clipboard.writeText(text)
                .then(() => {
                    const status = document.getElementById('copyStatus');
                    status.textContent = '✓ Copied!';
                    status.style.color = '#00ffaa';
                    
                    setTimeout(() => {
                        status.textContent = '';
                    }, 3000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    const status = document.getElementById('copyStatus');
                    status.textContent = '✗ Failed to copy';
                    status.style.color = '#ff4444';
                });
        };
        
        // Button event listeners
        document.getElementById('copyBtn')?.addEventListener('click', copyToClipboard);
        document.getElementById('copyLoadstring')?.addEventListener('click', copyToClipboard);
        
        // Execute button
        document.getElementById('executeBtn')?.addEventListener('click', function() {
            showModal('execute');
        });
        
        // Discord button
        document.getElementById('discordBtn')?.addEventListener('click', function() {
            showModal('discord');
        });
        
        // FAQ accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
        
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('.nav');
        
        if (mobileToggle && nav) {
            mobileToggle.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                if (nav.style.display === 'flex') {
                    nav.style.cssText = 
                        'display: flex;' +
                        'flex-direction: column;' +
                        'position: absolute;' +
                        'top: 100%;' +
                        'right: 20px;' +
                        'background: rgba(10, 10, 20, 0.95);' +
                        'backdrop-filter: blur(10px);' +
                        'border: 1px solid rgba(255, 20, 147, 0.3);' +
                        'border-radius: 10px;' +
                        'padding: 20px;' +
                        'z-index: 1000;' +
                        'gap: 15px;';
                }
            });
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768 && nav) {
                        nav.style.display = 'none';
                    }
                }
            });
        });
        
        // Add typing animation to hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.innerHTML;
            heroTitle.innerHTML = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
        
        // Add scroll animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.feature-card, .step, .executor-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        // Initialize UI preview animations
        setInterval(() => {
            const toggles = document.querySelectorAll('.ui-toggle');
            toggles.forEach((toggle, index) => {
                setTimeout(() => {
                    toggle.classList.toggle('active');
                }, index * 1000);
            });
        }, 3000);
    });
    
    // Modal functions
    window.showModal = function(type) {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        
        let content = '';
        let title = '';
        
        switch(type) {
            case 'execute':
                title = 'Execute Script';
                content = \`
                    <h2 style="color: #ff1493; margin-bottom: 20px;">\${title}</h2>
                    <p style="color: #ccc; margin-bottom: 30px;">
                        Copy the following loadstring and paste it into your executor:
                    </p>
                    <div style="
                        background: rgba(0, 0, 0, 0.5);
                        padding: 20px;
                        border-radius: 10px;
                        border: 1px solid rgba(255, 20, 147, 0.3);
                        margin-bottom: 30px;
                        font-family: monospace;
                        color: #00ffaa;
                        word-break: break-all;
                    ">
                        \${loadstringCode}
                    </div>
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button onclick="copyToClipboard();" style="
                            background: linear-gradient(135deg, #ff1493, #ff8c00);
                            color: white;
                            border: none;
                            padding: 12px 25px;
                            border-radius: 10px;
                            cursor: pointer;
                            font-weight: 600;
                        ">
                            Copy Loadstring
                        </button>
                        <button onclick="closeModal();" style="
                            background: transparent;
                            color: #ccc;
                            border: 2px solid #ff1493;
                            padding: 12px 25px;
                            border-radius: 10px;
                            cursor: pointer;
                            font-weight: 600;
                        ">
                            Close
                        </button>
                    </div>
                \`;
                break;
                
            case 'discord':
                title = 'Join Our Discord';
                content = \`
                    <h2 style="color: #5865F2; margin-bottom: 20px;">\${title}</h2>
                    <p style="color: #ccc; margin-bottom: 30px;">
                        Join our Discord community for updates, support, and announcements!
                    </p>
                    <div style="
                        background: rgba(88, 101, 242, 0.1);
                        padding: 20px;
                        border-radius: 10px;
                        border: 1px solid rgba(88, 101, 242, 0.3);
                        margin-bottom: 30px;
                        text-align: center;
                    ">
                        <i class="fab fa-discord" style="font-size: 3em; color: #5865F2; margin-bottom: 15px;"></i>
                        <h3 style="color: white; margin-bottom: 10px;">Eon Hub Community</h3>
                        <p style="color: #ccc; margin-bottom: 20px;">Active community with 10K+ members</p>
                        <a href="https://discord.gg/example" target="_blank" style="
                            background: #5865F2;
                            color: white;
                            padding: 12px 25px;
                            border-radius: 10px;
                            text-decoration: none;
                            display: inline-block;
                            font-weight: 600;
                        ">
                            Join Discord Server
                        </a>
                    </div>
                \`;
                break;
                
            default:
                content = '<p>Modal content not found.</p>';
        }
        
        modalBody.innerHTML = content;
        modal.style.display = 'flex';
    };
    
    window.closeModal = function() {
        document.getElementById('modal').style.display = 'none';
    };
    
    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    // Initialize modal close button
    document.addEventListener('DOMContentLoaded', function() {
        const closeBtn = document.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
    });
  `;
}

// Anti-view HTML generator
function getAntiViewHTML(host) {
  const loadstringUrl = host ? `https://${host}/script` : '/script';
  
  return `<!DOCTYPE html>
<html>
<head>
    <title>Access Restricted - Eon Hub</title>
    <style>
        body {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            color: white;
            font-family: 'Montserrat', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .error-box {
            background: rgba(255, 20, 147, 0.1);
            border: 2px solid rgba(255, 20, 147, 0.3);
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            max-width: 600px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(255, 20, 147, 0.2);
        }
        h1 {
            color: #ff1493;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 0 0 10px rgba(255, 20, 147, 0.5);
        }
        p {
            font-size: 1.2em;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .code {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid #ff1493;
            border-radius: 5px;
            padding: 15px;
            font-family: monospace;
            margin: 20px 0;
            color: #00ffaa;
            word-break: break-all;
        }
        .warning {
            color: #ff4444;
            font-weight: bold;
            margin-top: 20px;
        }
        .executor-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            margin: 20px 0;
        }
        .executor-tag {
            background: rgba(138, 43, 226, 0.2);
            color: #8a2be2;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="error-box">
        <h1>🔒 ACCESS RESTRICTED</h1>
        <p>Eon Hub script is protected with anti-view technology.</p>
        <p>This script can only be accessed through supported executors:</p>
        <div class="executor-list">
            <span class="executor-tag">Synapse X</span>
            <span class="executor-tag">Krnl</span>
            <span class="executor-tag">Fluxus</span>
            <span class="executor-tag">Script-Ware</span>
            <span class="executor-tag">Oxygen U</span>
            <span class="executor-tag">Comet</span>
        </div>
        <p>To use Eon Hub, copy this loadstring to your executor:</p>
        <div class="code">
            loadstring(game:HttpGet("${loadstringUrl}"))()
        </div>
        <p class="warning">⚠️ Direct browser access is blocked to prevent detection.</p>
    </div>
</body>
</html>`;
}

// Generate the actual Eon Hub script
function generateEonHubScript(host) {
  return `--[[
    EON HUB v2.0
    Advanced Roblox Script Hub
    Features: Auto-Steal, Bypassing Noclip, CFrame Speed, Acrylic UI
    Loaded from: ${host ? 'https://' + host : 'Eon Hub Server'}
]]

-- Load AcrylicUI
local Library = loadstring(game:HttpGet("https://raw.githubusercontent.com/noowtf31-ui/Arcylic/refs/heads/main/src.lua.txt"))()

-- Services
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local ProximityPromptService = game:GetService("ProximityPromptService")
local Lighting = game:GetService("Lighting")

local LocalPlayer = Players.LocalPlayer
local Camera = workspace.CurrentCamera

-- State Management
local State = {
    Running = true,
    AutoSteal = false,
    UseSmartReturn = false,
    SafeNoclip = false,
    Speed = false,
    SpeedValue = 2.5,
    DesyncSpam = false,
    DesyncNormal = false,
    BasePos = nil,
    LastStealPos = nil,
    StolenCount = 0,
    NoclipConnection = nil,
    StealConnection = nil
}

-- Advanced Bypassing Noclip System
local function EnableBypassingNoclip()
    if State.NoclipConnection then
        State.NoclipConnection:Disconnect()
    end
    
    State.NoclipConnection = RunService.Stepped:Connect(function()
        if not State.SafeNoclip or not LocalPlayer.Character then return end
        
        local character = LocalPlayer.Character
        for _, part in pairs(character:GetDescendants()) do
            if part:IsA("BasePart") then
                part.CanCollide = false
            end
        end
    end)
end

local function DisableBypassingNoclip()
    if State.NoclipConnection then
        State.NoclipConnection:Disconnect()
        State.NoclipConnection = nil
    end
    
    if LocalPlayer.Character then
        for _, part in pairs(LocalPlayer.Character:GetDescendants()) do
            if part:IsA("BasePart") then 
                part.CanCollide = true 
            end
        end
    end
end

-- Instant Auto-Steal System
local function EnableAutoSteal()
    if State.StealConnection then
        State.StealConnection:Disconnect()
    end
    
    State.StealConnection = ProximityPromptService.PromptButtonHoldBegan:Connect(function(prompt)
        if not State.AutoSteal then return end
        
        local hrp = LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
        if hrp and State.UseSmartReturn then
            State.LastStealPos = hrp.CFrame
        end
        
        prompt.HoldDuration = 0
        prompt.MaxActivationDistance = math.huge
        
        for _ = 1, 3 do
            fireproximityprompt(prompt, 0)
            task.wait(0.01)
        end
        
        State.StolenCount = State.StolenCount + 1
        
        task.wait(0.05)
        
        if State.UseSmartReturn and State.BasePos and hrp then
            hrp.CFrame = State.BasePos
            task.wait(0.15)
            if State.LastStealPos then
                hrp.CFrame = State.LastStealPos
            end
        elseif State.BasePos and hrp then
            hrp.CFrame = State.BasePos
        end
    end)
end

-- Speed Engine
RunService.Heartbeat:Connect(function()
    if State.Speed and LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart") then
        local hrp = LocalPlayer.Character.HumanoidRootPart
        local hum = LocalPlayer.Character:FindFirstChild("Humanoid")
        if hum and hum.MoveDirection.Magnitude > 0 then
            hrp.CFrame = hrp.CFrame + (hum.MoveDirection * (State.SpeedValue / 8))
        end
    end
end)

-- Desync System
task.spawn(function()
    while State.Running do
        if State.DesyncSpam then
            pcall(function() 
                setfflag("NextGenReplicatorEnabledWrite4", "False") 
            end)
            task.wait(0.001)
            pcall(function() 
                setfflag("NextGenReplicatorEnabledWrite4", "True") 
            end)
            task.wait(0.001)
        elseif State.DesyncNormal then
            pcall(function() 
                setfflag("NextGenReplicatorEnabledWrite4", "False") 
            end)
            task.wait(0.1)
        else
            pcall(function() 
                setfflag("NextGenReplicatorEnabledWrite4", "True") 
            end)
            task.wait(0.5)
        end
    end
end)

-- Enhanced Visuals
local ColorCorr = Instance.new("ColorCorrectionEffect", Lighting)
ColorCorr.TintColor = Color3.fromRGB(255, 205, 230)
ColorCorr.Saturation = 0.25
ColorCorr.Brightness = 0.05
ColorCorr.Contrast = 0.1

-- Auto 100 FOV
task.spawn(function()
    while State.Running do
        Camera.FieldOfView = 100
        RunService.RenderStepped:Wait()
    end
end)

-- Create AcrylicUI Window
local window = Library.new("EON HUB", "EonHub_Configs")
window:SetToggleKey(Enum.KeyCode.RightControl)

-- Welcome notification
task.spawn(function()
    for i = 1, 3 do
        window:Notify({
            Title = "EON HUB",
            Description = "Loading systems" .. string.rep(".", i),
            Duration = 0.5,
            Icon = "rbxassetid://10709775704"
        })
        task.wait(0.6)
    end
    
    window:Notify({
        Title = "SYSTEMS ONLINE",
        Description = "Eon Hub loaded successfully",
        Duration = 3,
        Icon = "rbxassetid://10747384394"
    })
end)

-- Create sections
local StealSection = window:CreateSection("Steal Systems")
local MovementSection = window:CreateSection("Movement")
local UtilitySection = window:CreateSection("Utility")
local VisualSection = window:CreateSection("Visuals")
local ConfigSection = window:CreateSection("Config")

-- STEAL TAB
local StealTab = StealSection:CreateTab("Auto Steal", "rbxassetid://10723407389")

local autoStealToggle = StealTab:CreateToggle({
    Name = "🚀 INSTANT AUTO-STEAL",
    Default = false,
    Flag = "AutoStealEnabled",
    Callback = function(enabled)
        State.AutoSteal = enabled
        if enabled then
            EnableAutoSteal()
            window:Notify({
                Title = "Auto-Steal",
                Description = "Instant steal system activated",
                Duration = 2,
                Icon = "rbxassetid://10734950309"
            })
        else
            if State.StealConnection then
                State.StealConnection:Disconnect()
                State.StealConnection = nil
            end
        end
    end
})

local smartReturnToggle = StealTab:CreateToggle({
    Name = "🔁 SMART RETURN SYSTEM",
    Default = false,
    Flag = "SmartReturnEnabled",
    Callback = function(enabled)
        State.UseSmartReturn = enabled
        window:Notify({
            Title = "Smart Return",
            Description = enabled and "Base → Steal → Return" or "Legacy return only",
            Duration = 2
        })
    end
})

StealTab:CreateSection("Base Management")

-- Set Base Position
StealTab:CreateButton({
    Name = "📍 SET BASE POSITION",
    Callback = function()
        local hrp = LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
        if hrp then
            State.BasePos = hrp.CFrame
            window:Notify({
                Title = "Base Saved",
                Description = "Current position set as base",
                Duration = 2,
                Icon = "rbxassetid://10734950309"
            })
        end
    end
})

-- Go to Base
StealTab:CreateButton({
    Name = "⚡ GO TO BASE",
    Callback = function()
        local hrp = LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
        if hrp and State.BasePos then
            hrp.CFrame = State.BasePos
            window:Notify({
                Title = "Teleporting",
                Description = "Returning to base position",
                Duration = 1
            })
        end
    end
})

-- Go to Last Steal
StealTab:CreateButton({
    Name = "↩️ RETURN TO LAST STEAL",
    Callback = function()
        local hrp = LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
        if hrp and State.LastStealPos then
            hrp.CFrame = State.LastStealPos
            window:Notify({
                Title = "Teleporting",
                Description = "Returning to last steal location",
                Duration = 1
            })
        end
    end
})

-- MOVEMENT TAB
local MovementTab = MovementSection:CreateTab("Movement", "rbxassetid://10734898355")

local noclipToggle = MovementTab:CreateToggle({
    Name = "👻 BYPASSING NOCLIP",
    Default = false,
    Flag = "NoclipEnabled",
    Callback = function(enabled)
        State.SafeNoclip = enabled
        if enabled then
            EnableBypassingNoclip()
            window:Notify({
                Title = "Noclip",
                Description = "Bypassing noclip activated",
                Duration = 2,
                Icon = "rbxassetid://10723407389"
            })
        else
            DisableBypassingNoclip()
        end
    end
})

local speedToggle = MovementTab:CreateToggle({
    Name = "💨 CFrame SPEED",
    Default = false,
    Flag = "SpeedEnabled",
    Callback = function(enabled)
        State.Speed = enabled
        window:Notify({
            Title = "Speed",
            Description = enabled and "CFrame speed activated" or "Speed deactivated",
            Duration = 1.5
        })
    end
})

MovementTab:CreateSlider({
    Name = "Speed Multiplier",
    Min = 1,
    Max = 10,
    Default = 2.5,
    Flag = "SpeedMultiplier",
    Callback = function(value)
        State.SpeedValue = value
    end
})

-- VISUALS TAB
local VisualTab = VisualSection:CreateTab("Visuals", "rbxassetid://10709775704")

VisualTab:CreateToggle({
    Name = "🎨 EON VISUALS",
    Default = true,
    Flag = "EonVisuals",
    Callback = function(enabled)
        if enabled then
            ColorCorr.Enabled = true
        else
            ColorCorr.Enabled = false
        end
    end
})

VisualTab:CreateSlider({
    Name = "Field of View",
    Min = 70,
    Max = 120,
    Default = 100,
    Flag = "FOVValue",
    Callback = function(value)
        Camera.FieldOfView = value
    end
})

-- UTILITY TAB
local UtilityTab = UtilitySection:CreateTab("Utility", "rbxassetid://10747384394")

UtilityTab:CreateSection("Desync Systems")

local normalDesyncToggle = UtilityTab:CreateToggle({
    Name = "🌀 DESYNC NORMAL",
    Default = false,
    Flag = "DesyncNormal",
    Callback = function(enabled)
        State.DesyncNormal = enabled
        if enabled then State.DesyncSpam = false end
    end
})

local spamDesyncToggle = UtilityTab:CreateToggle({
    Name = "⚡ DESYNC SPAM",
    Default = false,
    Flag = "DesyncSpam",
    Callback = function(enabled)
        State.DesyncSpam = enabled
        if enabled then State.DesyncNormal = false end
    end
})

-- CONFIG TAB
local ConfigTab = ConfigSection:CreateTab("Config", "rbxassetid://10723356507")
ConfigTab:CreateConfigSection()

-- Character Lifecycle Handling
LocalPlayer.CharacterAdded:Connect(function()
    task.wait(1)
    if State.SafeNoclip then EnableBypassingNoclip() end
    if State.AutoSteal then EnableAutoSteal() end
end)

LocalPlayer.CharacterRemoving:Connect(function()
    DisableBypassingNoclip()
    if State.StealConnection then
        State.StealConnection:Disconnect()
        State.StealConnection = nil
    end
end)

-- Cleanup
game:GetService("CoreGui").ChildRemoved:Connect(function(child)
    if child.Name == "AcrylicUI" then
        State.Running = false
        DisableBypassingNoclip()
        if State.StealConnection then
            State.StealConnection:Disconnect()
        end
        ColorCorr:Destroy()
    end
end)

print("EON HUB v2.0 loaded successfully!")`;
}
