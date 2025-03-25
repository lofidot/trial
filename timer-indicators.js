// Timer indicators script
function setupTimerIndicators() {
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Create or find the toolbar time display element
        const checkToolbar = setInterval(() => {
            // Look for the toolbar area - it contains the menu button
            const menuButton = document.querySelector('._menuButton_t9slm_2');
            
            if (menuButton) {
                clearInterval(checkToolbar);
                const toolbar = menuButton.closest('header') || menuButton.parentElement.parentElement;
                
                // Create or find the time display in the center of the toolbar
                let timeDisplay = toolbar.querySelector('.toolbar-time-display');
                
                if (!timeDisplay) {
                    // Create the time display element if it doesn't exist
                    timeDisplay = document.createElement('div');
                    timeDisplay.className = 'toolbar-time-display';
                    timeDisplay.style.position = 'absolute';
                    timeDisplay.style.left = '50%';
                    timeDisplay.style.top = '50%';
                    timeDisplay.style.transform = 'translate(-50%, -50%)';
                    timeDisplay.style.fontSize = '18px';
                    timeDisplay.style.fontWeight = 'bold';
                    timeDisplay.style.color = 'var(--color-foreground, #fff)';
                    timeDisplay.style.display = 'flex';
                    timeDisplay.style.alignItems = 'center';
                    timeDisplay.style.justifyContent = 'center';
                    
                    // Create the pomodoro timer element
                    const pomodoroTimer = document.createElement('div');
                    pomodoroTimer.id = 'pomodoro-timer-display';
                    pomodoroTimer.style.display = 'none';
                    pomodoroTimer.innerHTML = `
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" style="margin-right: 4px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path>
                        </svg>
                        <span id="pomodoro-time">25:00</span>
                    `;
                    
                    // Create the sleep timer element
                    const sleepTimer = document.createElement('div');
                    sleepTimer.id = 'sleep-timer-display';
                    sleepTimer.style.display = 'none';
                    sleepTimer.innerHTML = `
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" style="margin-right: 4px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 128v32m112 96h-32m-80 112v-32m-112-80h32"/>
                        </svg>
                        <span id="sleep-time">30:00</span>
                    `;
                    
                    // Create the regular time display (default state)
                    const regularTime = document.createElement('div');
                    regularTime.id = 'regular-time-display';
                    regularTime.style.display = 'flex';
                    regularTime.textContent = getCurrentTime();
                    
                    // Add all timer displays to the container
                    timeDisplay.appendChild(regularTime);
                    timeDisplay.appendChild(pomodoroTimer);
                    timeDisplay.appendChild(sleepTimer);
                    
                    // Position the toolbar relatively if it's not already
                    if (toolbar.style.position !== 'relative') {
                        toolbar.style.position = 'relative';
                    }
                    
                    // Add the time display to the toolbar
                    toolbar.appendChild(timeDisplay);
                    
                    // Update the regular time display every second
                    setInterval(() => {
                        if (regularTime.style.display !== 'none') {
                            regularTime.textContent = getCurrentTime();
                        }
                    }, 1000);
                }
                
                // Set up timer state monitoring
                setupTimerMonitoring();
            }
        }, 500);
    });
}

// Function to monitor timer states
function setupTimerMonitoring() {
    setInterval(() => {
        // Monitor for Pomodoro timer
        updatePomodoroState();
        
        // Monitor for Sleep timer
        updateSleepTimerState();
    }, 1000);
}

// Update pomodoro timer state
function updatePomodoroState() {
    const pomodoroDisplay = document.getElementById('pomodoro-timer-display');
    const pomodoroTimeDisplay = document.getElementById('pomodoro-time');
    const regularTimeDisplay = document.getElementById('regular-time-display');
    
    if (!pomodoroDisplay || !pomodoroTimeDisplay || !regularTimeDisplay) return;
    
    // Look for elements with pomodoro in their class or ID
    const pomodoroElements = document.querySelectorAll('[class*="pomodoro"], [id*="pomodoro"]');
    let isActive = false;
    
    pomodoroElements.forEach(element => {
        // Look for a time display within this element
        const timeDisplays = element.querySelectorAll('[class*="time"], [class*="counter"]');
        timeDisplays.forEach(timeDisplay => {
            const text = timeDisplay.textContent?.trim();
            if (text && /\d+:\d+/.test(text)) {
                // Check if this timer is running (look for a pause button)
                const pauseButton = element.querySelector('[aria-label*="Pause"], [title*="Pause"]');
                if (pauseButton) {
                    pomodoroTimeDisplay.textContent = text;
                    isActive = true;
                }
            }
        });
    });
    
    if (isActive) {
        pomodoroDisplay.style.display = 'flex';
        regularTimeDisplay.style.display = 'none';
    } else if (document.getElementById('sleep-timer-display').style.display !== 'flex') {
        pomodoroDisplay.style.display = 'none';
        regularTimeDisplay.style.display = 'flex';
    }
}

// Update sleep timer state
function updateSleepTimerState() {
    const sleepDisplay = document.getElementById('sleep-timer-display');
    const sleepTimeDisplay = document.getElementById('sleep-time');
    const regularTimeDisplay = document.getElementById('regular-time-display');
    
    if (!sleepDisplay || !sleepTimeDisplay || !regularTimeDisplay) return;
    
    // Look for elements with sleep in their class or ID
    const sleepElements = document.querySelectorAll('[class*="sleep"], [id*="sleep"]');
    let isActive = false;
    
    sleepElements.forEach(element => {
        // Look for a time display within this element
        const timeDisplays = element.querySelectorAll('[class*="time"], [class*="counter"]');
        timeDisplays.forEach(timeDisplay => {
            const text = timeDisplay.textContent?.trim();
            if (text && /\d+:\d+/.test(text)) {
                // Check if this timer is running (look for a pause button)
                const pauseButton = element.querySelector('[aria-label*="Pause"], [title*="Pause"]');
                if (pauseButton) {
                    sleepTimeDisplay.textContent = text;
                    isActive = true;
                }
            }
        });
    });
    
    if (isActive) {
        sleepDisplay.style.display = 'flex';
        regularTimeDisplay.style.display = 'none';
        document.getElementById('pomodoro-timer-display').style.display = 'none';
    } else if (document.getElementById('pomodoro-timer-display').style.display !== 'flex') {
        sleepDisplay.style.display = 'none';
        regularTimeDisplay.style.display = 'flex';
    }
}

// Helper function to get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Run the setup function
setupTimerIndicators();
