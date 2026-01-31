import { createHash } from 'crypto';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Get the request path
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  
  // Serve different content based on path
  if (path === '/' || path === '/index.html') {
    return serveWebsite(req, res);
  } else if (path === '/script') {
    return serveScript(req, res);
  } else if (path === '/style.css') {
    return serveCSS(req, res);
  } else if (path === '/script.js') {
    return serveClientJS(req, res);
  } else {
    return serve404(req, res);
  }
}

// Serve the main website
async function serveWebsite(req, res) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EON HUB | Modern Roblox Script</title>
    <meta name="description" content="Advanced Roblox script with modern features and clean UI">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/style.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>">
</head>
<body>
    <!-- Animated Background -->
    <div class="bg-grid"></div>
    <div class="bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    </div>

    <!-- Main Container -->
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="logo">
                <div class="logo-icon">
                    <i class="fas fa-infinity"></i>
                </div>
                <div class="logo-text">
                    <h1>EON HUB</h1>
                    <span class="version">v2.0</span>
                </div>
            </div>
            <nav class="nav">
                <a href="#features">Features</a>
                <a href="#howto">How to Use</a>
                <a href="#executors">Executors</a>
                <button class="btn btn-outline" onclick="copyLoadstring()">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </nav>
            <button class="menu-toggle" onclick="toggleMenu()">
                <i class="fas fa-bars"></i>
            </button>
        </header>

        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-content fade-in">
                <div class="hero-badge">
                    <i class="fas fa-bolt"></i>
                    <span>ADVANCED VERSION</span>
                </div>
                <h1 class="hero-title">Modern <span class="gradient">Roblox Scripting</span></h1>
                <p class="hero-subtitle">Clean, powerful, and undetected. Everything you need in one package.</p>
                
                <div class="hero-stats">
                    <div class="stat">
                        <div class="stat-value">0ms</div>
                        <div class="stat-label">Auto-Steal</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">99%</div>
                        <div class="stat-label">Undetected</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">10K+</div>
                        <div class="stat-label">Users</div>
                    </div>
                </div>

                <div class="hero-actions">
                    <button class="btn btn-primary" onclick="executeScript()">
                        <i class="fas fa-play"></i> Execute Script
                    </button>
                    <button class="btn btn-secondary" onclick="copyLoadstring()">
                        <i class="fas fa-code"></i> Get Loadstring
                    </button>
                </div>

                <!-- Loadstring Display -->
                <div class="code-box">
                    <div class="code-header">
                        <i class="fas fa-terminal"></i>
                        <span>Secure Loadstring</span>
                        <span class="security-tag">
                            <i class="fas fa-shield-alt"></i> Protected
                        </span>
                    </div>
                    <div class="code-content" id="loadstring">
                        ${req.headers.host ? `loadstring(game:HttpGet("https://${req.headers.host}/script"))()` : 'loadstring(game:HttpGet("https://eon-hub.vercel.app/script"))()'}
                    </div>
                    <div class="code-footer">
                        <button class="btn-small" onclick="copyLoadstring()">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                        <span class="hint">
                            <i class="fas fa-info-circle"></i> Executor access only
                        </span>
                    </div>
                </div>
            </div>

            <!-- UI Preview -->
            <div class="preview fade-in">
                <div class="terminal">
                    <div class="terminal-header">
                        <div class="terminal-dots">
                            <span class="dot red"></span>
                            <span class="dot yellow"></span>
                            <span class="dot green"></span>
                        </div>
                        <span>EON HUB Interface</span>
                    </div>
                    <div class="terminal-body">
                        <div class="ui-item">
                            <span>Instant Auto-Steal</span>
                            <div class="toggle active"></div>
                        </div>
                        <div class="ui-item">
                            <span>Bypassing Noclip</span>
                            <div class="toggle"></div>
                        </div>
                        <div class="ui-item">
                            <span>CFrame Speed</span>
                            <div class="toggle active"></div>
                        </div>
                        <div class="ui-item">
                            <span>Smart Desync</span>
                            <div class="toggle"></div>
                        </div>
                        <div class="ui-slider">
                            <div class="slider-label">
                                <span>Speed Multiplier</span>
                                <span class="slider-value">2.5x</span>
                            </div>
                            <div class="slider-track">
                                <div class="slider-thumb"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features -->
        <section class="features" id="features">
            <h2 class="section-title">Powerful <span class="gradient">Features</span></h2>
            <p class="section-subtitle">Everything you need for enhanced gameplay</p>

            <div class="features-grid">
                <div class="feature fade-in">
                    <div class="feature-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3>Auto-Steal</h3>
                    <p>Instant item grabbing with 0ms delay and smart return system.</p>
                </div>

                <div class="feature fade-in">
                    <div class="feature-icon">
                        <i class="fas fa-ghost"></i>
                    </div>
                    <h3>Bypass Noclip</h3>
                    <p>Advanced collision bypass with safe character handling.</p>
                </div>

                <div class="feature fade-in">
                    <div class="feature-icon">
                        <i class="fas fa-tachometer-alt"></i>
                    </div>
                    <h3>CFrame Speed</h3>
                    <p>Enhanced movement with adjustable speed multiplier.</p>
                </div>

                <div class="feature fade-in">
                    <div class="feature-icon">
                        <i class="fas fa-palette"></i>
                    </div>
                    <h3>Acrylic UI</h3>
                    <p>Modern interface with blur effects and smooth animations.</p>
                </div>

                <div class="feature fade-in">
                    <div class="feature-icon">
                        <i class="fas fa-sync-alt"></i>
                    </div>
                    <h3>Smart Desync</h3>
                    <p>Network manipulation with normal and spam modes.</p>
                </div>

                <div class="feature fade-in">
                    <div class="feature-icon">
                        <i class="fas fa-database"></i>
                    </div>
                    <h3>Config System</h3>
                    <p>Save and load configurations with auto-save feature.</p>
                </div>
            </div>
        </section>

        <!-- How to Use -->
        <section class="howto" id="howto">
            <h2 class="section-title">Simple <span class="gradient">Execution</span></h2>
            <p class="section-subtitle">Get started in minutes</p>

            <div class="steps">
                <div class="step fade-in">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3>Copy Loadstring</h3>
                        <p>Click the copy button to get the script URL.</p>
                    </div>
                </div>

                <div class="step fade-in">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3>Open Executor</h3>
                        <p>Launch Roblox and open your executor.</p>
                    </div>
                </div>

                <div class="step fade-in">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3>Execute Script</h3>
                        <p>Paste the loadstring and run it.</p>
                        <div class="code">loadstring(game:HttpGet("URL"))()</div>
                    </div>
                </div>

                <div class="step fade-in">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h3>Enjoy Eon Hub</h3>
                        <p>Press <kbd>RightControl</kbd> to toggle the UI.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Executors -->
        <section class="executors" id="executors">
            <h2 class="section-title">Supported <span class="gradient">Executors</span></h2>
            <div class="executors-grid">
                <div class="executor fade-in">
                    <i class="fas fa-bolt"></i>
                    <span>Synapse X</span>
                </div>
                <div class="executor fade-in">
                    <i class="fas fa-cube"></i>
                    <span>Krnl</span>
                </div>
                <div class="executor fade-in">
                    <i class="fas fa-atom"></i>
                    <span>Fluxus</span>
                </div>
                <div class="executor fade-in">
                    <i class="fas fa-code"></i>
                    <span>Script-Ware</span>
                </div>
                <div class="executor fade-in">
                    <i class="fas fa-star"></i>
                    <span>Oxygen U</span>
                </div>
                <div class="executor fade-in">
                    <i class="fas fa-rocket"></i>
                    <span>Comet</span>
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
                <p class="footer-tagline">Modern scripting for modern players</p>
                <div class="footer-links">
                    <a href="#" onclick="showInfo('Discord server coming soon!')">
                        <i class="fab fa-discord"></i> Discord
                    </a>
                    <a href="#" onclick="showInfo('GitHub repository coming soon!')">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="#" onclick="executeScript()">
                        <i class="fas fa-terminal"></i> Execute
                    </a>
                </div>
                <div class="footer-info">
                    <p>© 2024 Eon Hub. For educational use only.</p>
                    <p class="disclaimer">Use at your own risk. No affiliation with Roblox.</p>
                </div>
            </div>
        </footer>
    </div>

    <!-- Toast Notification -->
    <div id="toast" class="toast"></div>

    <!-- Modal -->
    <div id="modal" class="modal">
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">×</button>
            <div id="modal-body"></div>
        </div>
    </div>

    <script>
        // Loadstring
        const loadstring = \`loadstring(game:HttpGet("\${req.headers.host ? 'https://' + req.headers.host : 'https://eon-hub.vercel.app'}/script"))()\`;
        document.getElementById('loadstring').textContent = loadstring;

        // Toggle mobile menu
        function toggleMenu() {
            const nav = document.querySelector('.nav');
            nav.classList.toggle('show');
        }

        // Copy loadstring to clipboard
        function copyLoadstring() {
            navigator.clipboard.writeText(loadstring).then(() => {
                showToast('Loadstring copied to clipboard!');
            }).catch(err => {
                showToast('Failed to copy: ' + err);
            });
        }

        // Show toast notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Show info modal
        function showInfo(message) {
            const modal = document.getElementById('modal');
            const modalBody = document.getElementById('modal-body');
            
            modalBody.innerHTML = \`
                <h3 style="color: var(--primary); margin-bottom: 20px;">
                    <i class="fas fa-info-circle"></i> Information
                </h3>
                <p style="color: var(--gray); margin-bottom: 30px;">\${message}</p>
                <button class="btn btn-primary" onclick="closeModal()" style="width: 100%;">
                    Close
                </button>
            \`;
            
            modal.style.display = 'flex';
        }

        // Execute script modal
        function executeScript() {
            const modal = document.getElementById('modal');
            const modalBody = document.getElementById('modal-body');
            
            modalBody.innerHTML = \`
                <h3 style="color: var(--primary); margin-bottom: 20px;">
                    <i class="fas fa-terminal"></i> Execute Script
                </h3>
                <p style="color: var(--gray); margin-bottom: 15px;">Copy this loadstring to your executor:</p>
                <div style="
                    background: rgba(0, 0, 0, 0.3);
                    padding: 20px;
                    border-radius: 10px;
                    font-family: 'Courier New', monospace;
                    color: var(--primary);
                    font-size: 14px;
                    margin-bottom: 30px;
                    word-break: break-all;
                    border: 1px solid rgba(0, 255, 234, 0.2);
                ">
                    \${loadstring}
                </div>
                <div style="display: flex; gap: 15px;">
                    <button class="btn btn-primary" onclick="copyLoadstring(); closeModal();" style="flex: 1;">
                        <i class="fas fa-copy"></i> Copy & Close
                    </button>
                    <button class="btn btn-secondary" onclick="closeModal()" style="flex: 1;">
                        Close
                    </button>
                </div>
            \`;
            
            modal.style.display = 'flex';
        }

        // Close modal
        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

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

        // Animate toggles
        setInterval(() => {
            const toggles = document.querySelectorAll('.toggle');
            toggles.forEach(toggle => {
                toggle.classList.toggle('active');
            });
        }, 3000);

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
                    const nav = document.querySelector('.nav');
                    if (nav.classList.contains('show')) {
                        nav.classList.remove('show');
                    }
                }
            });
        });

        // Add fade-in animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for animation
        document.querySelectorAll('.feature, .step, .executor').forEach(el => {
            observer.observe(el);
        });
    </script>
</body>
</html>`;
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(html);
}

// Serve the actual script (with anti-view protection)
async function serveScript(req, res) {
  // Anti-view protection
  const userAgent = req.headers['user-agent'] || '';
  const referer = req.headers['referer'] || '';
  
  // Check if it's likely a browser
  const isBrowser = userAgent.includes('Mozilla') && 
                   !userAgent.includes('Executor') &&
                   !userAgent.includes('Roblox') &&
                   !userAgent.includes('Synapse') &&
                   !userAgent.includes('Krnl');
  
  // If it's a browser, show error
  if (isBrowser && !referer.includes('roblox')) {
    return res.status(403).send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Access Restricted - Eon Hub</title>
          <style>
              body {
                  background: #0a0a0f;
                  color: white;
                  font-family: 'Inter', sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                  padding: 20px;
              }
              .error-box {
                  background: rgba(0, 255, 234, 0.1);
                  border: 1px solid rgba(0, 255, 234, 0.3);
                  border-radius: 15px;
                  padding: 40px;
                  text-align: center;
                  max-width: 600px;
                  backdrop-filter: blur(10px);
              }
              h1 {
                  color: #00ffea;
                  font-size: 2em;
                  margin-bottom: 20px;
              }
              p {
                  color: #8a8aa3;
                  margin-bottom: 20px;
                  line-height: 1.6;
              }
              .code {
                  background: rgba(0, 0, 0, 0.3);
                  padding: 15px;
                  border-radius: 10px;
                  font-family: monospace;
                  color: #00ffea;
                  margin: 20px 0;
                  word-break: break-all;
                  border: 1px solid rgba(0, 255, 234, 0.2);
              }
          </style>
      </head>
      <body>
          <div class="error-box">
              <h1>🔒 Access Restricted</h1>
              <p>This script is protected and can only be accessed through supported executors.</p>
              <p>To use Eon Hub, copy this loadstring to your executor:</p>
              <div class="code">
                  loadstring(game:HttpGet("${req.headers.host ? 'https://' + req.headers.host : '/script'}"))()
              </div>
              <p>Supported executors: Synapse X, Krnl, Fluxus, Script-Ware, Oxygen U</p>
          </div>
      </body>
      </html>
    `);
  }
  
  // Generate the Eon Hub script
  const script = generateScript();
  
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(script);
}

// Serve CSS
async function serveCSS(req, res) {
  // We'll serve a minimal CSS for non-website requests
  res.setHeader('Content-Type', 'text/css; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(`
    /* Minimal CSS for script response */
    body { 
      background: #0a0a0f; 
      color: white; 
      font-family: monospace; 
      padding: 20px; 
    }
    .code { 
      background: #1a1a24; 
      padding: 20px; 
      border-radius: 10px; 
      margin: 20px 0; 
    }
  `);
}

// Serve client JavaScript
async function serveClientJS(req, res) {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  
  const js = `
    // Client-side JavaScript for Eon Hub
    console.log('Eon Hub client script loaded');
    
    // You can add additional client-side functionality here
    window.addEventListener('load', function() {
      console.log('Page loaded');
    });
  `;
  
  res.status(200).send(js);
}

// Serve 404
async function serve404(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>404 - Eon Hub</title>
        <style>
            body {
                background: #0a0a0f;
                color: white;
                font-family: 'Inter', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .error-container {
                text-align: center;
            }
            h1 {
                color: #00ffea;
                font-size: 3em;
                margin-bottom: 20px;
            }
            a {
                color: #00ffea;
                text-decoration: none;
                border: 1px solid #00ffea;
                padding: 10px 20px;
                border-radius: 8px;
                display: inline-block;
                margin-top: 20px;
            }
            a:hover {
                background: rgba(0, 255, 234, 0.1);
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

// Generate the actual Lua script
function generateScript() {
  return `--[[
    EON HUB v2.0
    Modern Roblox Script Hub
    Loaded from: ${new Date().toISOString().split('T')[0]}
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

-- Create AcrylicUI Window
local window = Library.new("EON HUB", "EonHub_Configs")
window:SetToggleKey(Enum.KeyCode.RightControl)

-- Welcome notification
task.spawn(function()
    for i = 1, 2 do
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
    end
end)

print("EON HUB v2.0 loaded successfully!")`;
}
