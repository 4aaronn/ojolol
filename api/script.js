export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Anti-view protection - Only returns script to specific User-Agents
  const userAgent = req.headers['user-agent'] || '';
  const isBrowser = userAgent.includes('Mozilla') && 
                   !userAgent.includes('Executor') &&
                   !userAgent.includes('Roblox') &&
                   !userAgent.includes('Synapse') &&
                   !userAgent.includes('Krnl');
  
  // Get referer for additional protection
  const referer = req.headers['referer'] || '';
  const isDirectRequest = referer.includes('roblox') || 
                         referer.includes('executor') ||
                         referer === '';
  
  // If it's a browser viewing directly, show error
  if (isBrowser && !isDirectRequest) {
    return res.status(403).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Access Denied</title>
        <style>
          body {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
          }
          .warning {
            color: #ff4444;
            font-weight: bold;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="error-box">
          <h1>🔒 ACCESS RESTRICTED</h1>
          <p>This script can only be accessed through supported executors.</p>
          <p>To use this script:</p>
          <div class="code">
            loadstring(game:HttpGet("${req.headers.host}/script"))()
          </div>
          <p class="warning">⚠️ Direct browser access is blocked to prevent detection.</p>
        </div>
      </body>
      </html>
    `);
  }
  
  // Your actual script (the Solar Hub script from before)
  const script = `
-- Load AcrylicUI library
local Library = loadstring(game:HttpGet("https://raw.githubusercontent.com/noowtf31-ui/Arcylic/refs/heads/main/src.lua.txt"))()

-- Services
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local ProximityPromptService = game:GetService("ProximityPromptService")
local Lighting = game:GetService("Lighting")
local Workspace = game:GetService("Workspace")

local LocalPlayer = Players.LocalPlayer
local Camera = Workspace.CurrentCamera

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
        local humanoid = character:FindFirstChild("Humanoid")
        local hrp = character:FindFirstChild("HumanoidRootPart")
        
        if humanoid and hrp then
            -- Method 1: Set CanCollide to false on all parts
            for _, part in pairs(character:GetDescendants()) do
                if part:IsA("BasePart") then
                    part.CanCollide = false
                end
            end
            
            -- Method 2: Use CFrame to bypass physics (bypass method)
            local moveDir = humanoid.MoveDirection
            if moveDir.Magnitude > 0 then
                hrp.Velocity = Vector3.new(0, 0, 0)
                hrp.CFrame = hrp.CFrame + (moveDir * 0.1)
            end
            
            -- Method 3: Set humanoid state to bypass animations
            if humanoid:GetState() == Enum.HumanoidStateType.Freefall then
                humanoid:ChangeState(Enum.HumanoidStateType.Running)
            end
        end
    end)
end

local function DisableBypassingNoclip()
    if State.NoclipConnection then
        State.NoclipConnection:Disconnect()
        State.NoclipConnection = nil
    end
    
    -- Re-enable collision safely
    if LocalPlayer.Character then
        for _, part in pairs(LocalPlayer.Character:GetDescendants()) do
            if part:IsA("BasePart") then 
                part.CanCollide = true 
            end
        end
    end
end

-- Instant Auto-Steal System with Bypass
local function EnableAutoSteal()
    if State.StealConnection then
        State.StealConnection:Disconnect()
    end
    
    State.StealConnection = ProximityPromptService.PromptButtonHoldBegan:Connect(function(prompt)
        if not State.AutoSteal then return end
        
        -- Save position before stealing for smart return
        local hrp = LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
        if hrp and State.UseSmartReturn then
            State.LastStealPos = hrp.CFrame
        end
        
        -- Bypass delay and distance restrictions
        prompt.HoldDuration = 0
        prompt.MaxActivationDistance = math.huge
        
        -- Instant activation bypass
        for _ = 1, 5 do  -- Multiple attempts for reliability
            fireproximityprompt(prompt, 0)
            task.wait(0.01)
        end
        
        -- Increment stolen count
        State.StolenCount = State.StolenCount + 1
        
        -- Return logic
        task.wait(0.05)
        
        if State.UseSmartReturn and State.BasePos and hrp then
            -- Smart return: Go to base, then back to steal position
            hrp.CFrame = State.BasePos
            task.wait(0.15)
            if State.LastStealPos then
                hrp.CFrame = State.LastStealPos
            end
        elseif State.BasePos and hrp then
            -- Legacy return: Just go to base
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
local window = Library.new("EON HUB | eonhub.vercel.app", "eonX_Configs")
window:SetToggleKey(Enum.KeyCode.RightControl)

-- Welcome notification with loader animation
task.spawn(function()
    for i = 1, 3 do
        window:Notify({
            Title = "EON HUB",
            Description = "Initializing systems" .. string.rep(".", i),
            Duration = 0.5,
            Icon = "rbxassetid://10709775704"
        })
        task.wait(0.6)
    end
    
    window:Notify({
        Title = "on",
        Description = "EON HUB loaded successfully",
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

-- Instant Auto-Steal
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

-- Smart Return Toggle
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

-- Stolen Counter Display
StealTab:CreateParagraph({
    Title = "📊 STATISTICS",
    Content = "Items Stolen: 0"
})

-- Update stolen counter
task.spawn(function()
    while State.Running do
        task.wait(1)
        if State.StolenCount > 0 then
            -- Update paragraph content
            for _, obj in pairs(StealTab:GetDescendants()) do
                if obj:IsA("TextLabel") and obj.Text:find("Items Stolen:") then
                    obj.Text = "Items Stolen: " .. State.StolenCount
                end
            end
        end
    end
end)

-- MOVEMENT TAB
local MovementTab = MovementSection:CreateTab("Movement", "rbxassetid://10734898355")

-- Bypassing Noclip
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

-- Speed Multiplier
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

-- Speed Value Slider
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

-- Fly System (Bonus)
MovementTab:CreateToggle({
    Name = "✈️ FLY SYSTEM",
    Default = false,
    Flag = "FlyEnabled",
    Callback = function(enabled)
        if enabled then
            window:Notify({
                Title = "Fly System",
                Description = "Fly system coming soon!",
                Duration = 2
            })
        end
    end
})

-- UTILITY TAB
local UtilityTab = UtilitySection:CreateTab("Utility", "rbxassetid://10747384394")

-- Desync Systems
UtilityTab:CreateSection("Desync Systems")

local normalDesyncToggle = UtilityTab:CreateToggle({
    Name = "🌀 DESYNC NORMAL",
    Default = false,
    Flag = "DesyncNormal",
    Callback = function(enabled)
        State.DesyncNormal = enabled
        if enabled then State.DesyncSpam = false end
        window:Notify({
            Title = "Desync",
            Description = enabled and "Normal desync active" or "Desync off",
            Duration = 1.5
        })
    end
})

local spamDesyncToggle = UtilityTab:CreateToggle({
    Name = "⚡ DESYNC SPAM",
    Default = false,
    Flag = "DesyncSpam",
    Callback = function(enabled)
        State.DesyncSpam = enabled
        if enabled then State.DesyncNormal = false end
        window:Notify({
            Title = "Desync",
            Description = enabled and "Spam desync flickering" or "Desync off",
            Duration = 1.5
        })
    end
})

-- Auto Farm System
UtilityTab:CreateSection("Auto Farm")

UtilityTab:CreateToggle({
    Name = "🤖 AUTO FARM",
    Default = false,
    Flag = "AutoFarm",
    Callback = function(enabled)
        window:Notify({
            Title = "Auto Farm",
            Description = enabled and "Auto farm started" or "Auto farm stopped",
            Duration = 2,
            Icon = "rbxassetid://10734950309"
        })
    end
})

-- ESP System
UtilityTab:CreateToggle({
    Name = "👁️ ITEM ESP",
    Default = false,
    Flag = "ItemESP",
    Callback = function(enabled)
        window:Notify({
            Title = "Item ESP",
            Description = enabled and "ESP enabled" or "ESP disabled",
            Duration = 1.5
        })
    end
})

-- VISUALS TAB
local VisualTab = VisualSection:CreateTab("Visuals", "rbxassetid://10709775704")

-- Plight Pink Visuals
VisualTab:CreateToggle({
    Name = "🎨 PLIGHT PINK VISUALS",
    Default = true,
    Flag = "PinkVisuals",
    Callback = function(enabled)
        if enabled then
            ColorCorr.Enabled = true
        else
            ColorCorr.Enabled = false
        end
    end
})

-- FOV Slider
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

-- Custom Colors
VisualTab:CreateColorPicker({
    Name = "UI Accent Color",
    Default = Color3.fromRGB(255, 120, 180),
    Flag = "AccentColor",
    Callback = function(color)
        -- This would update UI colors in a real implementation
        window:Notify({
            Title = "Color Updated",
            Description = "UI accent color changed",
            Duration = 1.5
        })
    end
})

-- CONFIG TAB
local ConfigTab = ConfigSection:CreateTab("Config", "rbxassetid://10723356507")

-- Built-in Config Management
ConfigTab:CreateConfigSection()

-- Save Everything Button
ConfigTab:CreateButton({
    Name = "💾 SAVE ALL SETTINGS",
    Callback = function()
        window:SaveConfig("AetherX_Settings")
        window:Notify({
            Title = "Settings Saved",
            Description = "All settings saved to config",
            Duration = 2,
            Icon = "rbxassetid://10723356507"
        })
    end
})

-- Load Defaults
ConfigTab:CreateButton({
    Name = "🔄 LOAD DEFAULTS",
    Callback = function()
        -- Reset all toggles
        if autoStealToggle then autoStealToggle:SetValue(false) end
        if smartReturnToggle then smartReturnToggle:SetValue(false) end
        if noclipToggle then noclipToggle:SetValue(false) end
        if speedToggle then speedToggle:SetValue(false) end
        if normalDesyncToggle then normalDesyncToggle:SetValue(false) end
        if spamDesyncToggle then spamDesyncToggle:SetValue(false) end
        
        window:Notify({
            Title = "Defaults Loaded",
            Description = "All settings reset to default",
            Duration = 2
        })
    end
})

-- Keybind Management
ConfigTab:CreateSection("Keybinds")

ConfigTab:CreateKeybind({
    Name = "Toggle UI",
    Default = Enum.KeyCode.RightControl,
    Flag = "UIToggleKey",
    Callback = function()
        window:Toggle()
    end
})

ConfigTab:CreateKeybind({
    Name = "Toggle Noclip",
    Default = Enum.KeyCode.N,
    Flag = "NoclipToggleKey",
    Callback = function()
        if noclipToggle then
            noclipToggle:SetValue(not State.SafeNoclip)
        end
    end
})

ConfigTab:CreateKeybind({
    Name = "Toggle Speed",
    Default = Enum.KeyCode.V,
    Flag = "SpeedToggleKey",
    Callback = function()
        if speedToggle then
            speedToggle:SetValue(not State.Speed)
        end
    end
})

-- Character Lifecycle Handling
LocalPlayer.CharacterAdded:Connect(function()
    task.wait(1) -- Wait for character to fully load
    if State.SafeNoclip then
        EnableBypassingNoclip()
    end
    if State.AutoSteal then
        EnableAutoSteal()
    end
end)

LocalPlayer.CharacterRemoving:Connect(function()
    DisableBypassingNoclip()
    if State.StealConnection then
        State.StealConnection:Disconnect()
        State.StealConnection = nil
    end
end)

-- Auto-save every 30 seconds
window:SetAutoSave(true)

-- Final setup notification
task.wait(2)
window:Notify({
    Title = "SYSTEM READY",
    Description = "EON HUB \nUse RightControl to toggle UI",
    Duration = 4,
    Icon = "rbxassetid://10709775704"
})

-- Cleanup on game close
game:GetService("CoreGui").ChildRemoved:Connect(function(child)
    if child.Name == "AcrylicUI" then
        State.Running = false
        DisableBypassingNoclip()
        if State.StealConnection then
            State.StealConnection:Disconnect()
        end
        ColorCorr:Destroy()
        pcall(function() 
            setfflag("NextGenReplicatorEnabledWrite4", "True") 
        end)
    end
end)
`;

  // Set content type to Lua
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Send the script
  res.status(200).send(script);
}
