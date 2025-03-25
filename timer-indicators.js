// Timer indicators script
function setupTimerIndicators() {
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Check for the menu wrapper element
        const checkMenuWrapper = setInterval(() => {
            const menuWrapper = document.querySelector('._wrapper_t9slm_1');
            if (menuWrapper) {
                clearInterval(checkMenuWrapper);
                
                // Add a container for the timer indicators
                const indicatorsContainer = document.createElement('div');
                indicatorsContainer.id = 'timer-indicators';
                indicatorsContainer.style.display = 'flex';
                indicatorsContainer.style.alignItems = 'center';
                indicatorsContainer.style.marginRight = '10px';
                
                // Create the pomodoro indicator
                const pomodoroIndicator = document.createElement('div');
                pomodoroIndicator.id = 'pomodoro-indicator';
                pomodoroIndicator.style.display = 'none';
                pomodoroIndicator.style.alignItems = 'center';
                pomodoroIndicator.style.padding = '2px 8px';
                pomodoroIndicator.style.borderRadius = '12px';
                pomodoroIndicator.style.backgroundColor = 'var(--color-neutral-100)';
                pomodoroIndicator.style.border = '1px solid var(--color-neutral-300)';
                pomodoroIndicator.style.fontSize = '12px';
                pomodoroIndicator.style.marginRight = '5px';
                pomodoroIndicator.style.gap = '4px';
                pomodoroIndicator.innerHTML = `
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path>
                    </svg>
                    <span id="pomodoro-time">25:00</span>
                `;
                
                // Create the sleep timer indicator
                const sleepIndicator = document.createElement('div');
                sleepIndicator.id = 'sleep-indicator';
                sleepIndicator.style.display = 'none';
                sleepIndicator.style.alignItems = 'center';
                sleepIndicator.style.padding = '2px 8px';
                sleepIndicator.style.borderRadius = '12px';
                sleepIndicator.style.backgroundColor = 'var(--color-neutral-100)';
                sleepIndicator.style.border = '1px solid var(--color-neutral-300)';
                sleepIndicator.style.fontSize = '12px';
                sleepIndicator.style.marginRight = '5px';
                sleepIndicator.style.gap = '4px';
                sleepIndicator.innerHTML = `
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 128v32m112 96h-32m-80 112v-32m-112-80h32"/>
                    </svg>
                    <span id="sleep-time">30:00</span>
                `;
                
                // Add the indicators to the container
                indicatorsContainer.appendChild(pomodoroIndicator);
                indicatorsContainer.appendChild(sleepIndicator);
                
                // Insert the container before the menu button
                menuWrapper.insertBefore(indicatorsContainer, menuWrapper.firstChild);
                
                // Adjust the menu wrapper style
                menuWrapper.style.display = 'flex';
                menuWrapper.style.flexDirection = 'row';
                menuWrapper.style.alignItems = 'center';
                
                // Set up timer state monitoring
                monitorTimerStates();
            }
        }, 500);
    });
}

// Function to monitor timer states
function monitorTimerStates() {
    setInterval(() => {
        // For Pomodoro timer
        updatePomodoroState();
        
        // For Sleep timer
        updateSleepTimerState();
    }, 1000);
}

// Update pomodoro timer state
function updatePomodoroState() {
    const pomodoroIndicator = document.getElementById('pomodoro-indicator');
    const pomodoroTimeDisplay = document.getElementById('pomodoro-time');
    
    if (!pomodoroIndicator || !pomodoroTimeDisplay) return;
    
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
    
    pomodoroIndicator.style.display = isActive ? 'flex' : 'none';
}

// Update sleep timer state
function updateSleepTimerState() {
    const sleepIndicator = document.getElementById('sleep-indicator');
    const sleepTimeDisplay = document.getElementById('sleep-time');
    
    if (!sleepIndicator || !sleepTimeDisplay) return;
    
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
    
    sleepIndicator.style.display = isActive ? 'flex' : 'none';
}

// Run the setup function
setupTimerIndicators();
