document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.getElementById('trickyNo');
    let clickCount = 0;
    let isMoving = false;
    
    // List of funny messages when trying to click No
    const messages = [
        "Nice try! But Yes is looking really good!",
        "Are you sure? The Yes button is getting lonely!",
        "I think your mouse slipped toward Yes!",
        "Oops! Did you mean to click Yes instead?",
        "The Yes button is feeling extra charming today!",
        "Wait, look how shiny the Yes button is!",
        "Hmm... let's try that again on the Yes side!",
        "I think we both know which button you really want!"
    ];
    
    // Function to move the button randomly
    function moveButton() {
        if (isMoving) return;
        
        isMoving = true;
        clickCount++;
        
        // Get random position within viewport
        const maxX = window.innerWidth - noButton.offsetWidth - 50;
        const maxY = window.innerHeight - noButton.offsetHeight - 50;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // Get random size (between 50% and 90% of original)
        const randomScale = 0.5 + (Math.random() * 0.4);
        
        // Add shrinking effect
        const currentScale = 1 - (clickCount * 0.1);
        const finalScale = Math.max(0.3, Math.min(randomScale, currentScale));
        
        // Add funny text temporarily
        const originalText = noButton.innerHTML;
        noButton.innerHTML = `<i class="fas fa-running"></i> ${messages[clickCount % messages.length]}`;
        
        // Apply movement and scaling with transition
        noButton.style.transition = 'all 0.5s ease';
        noButton.style.position = 'fixed';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
        noButton.style.transform = `scale(${finalScale})`;
        noButton.style.zIndex = '1000';
        
        // Restore original text after 1.5 seconds
        setTimeout(() => {
            noButton.innerHTML = originalText;
            isMoving = false;
            
            // Make it even smaller for next time
            if (clickCount > 3) {
                noButton.style.fontSize = `${Math.max(12, 24 - (clickCount * 2))}px`;
            }
            
            // After many clicks, make it barely clickable
            if (clickCount > 8) {
                noButton.style.opacity = '0.3';
                noButton.style.pointerEvents = 'none';
                noButton.innerHTML = '<i class="fas fa-ghost"></i> Okay fine... Yes wins!';
            }
        }, 1500);
    }
    
    // Event listeners for the NO button
    noButton.addEventListener('click', moveButton);
    
    // Also move when mouse hovers near it (extra tricky!)
    noButton.addEventListener('mouseenter', function(e) {
        // 30% chance to move on hover
        if (Math.random() < 0.3 && !isMoving) {
            setTimeout(moveButton, 300);
        }
    });
    
    // Move button slightly when trying to touch it on mobile
    noButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveButton();
    });
    
    // Add some keyboard interaction fun
    document.addEventListener('keydown', function(e) {
        if (e.key === 'N' || e.key === 'n') {
            moveButton();
            
            // Show a temporary message
            const message = document.createElement('div');
            message.textContent = "Even the 'N' key knows Yes is better!";
            message.style.position = 'fixed';
            message.style.top = '20px';
            message.style.left = '50%';
            message.style.transform = 'translateX(-50%)';
            message.style.background = '#ff4081';
            message.style.color = 'white';
            message.style.padding = '10px 20px';
            message.style.borderRadius = '20px';
            message.style.zIndex = '1001';
            document.body.appendChild(message);
            
            setTimeout(() => {
                document.body.removeChild(message);
            }, 2000);
        }
    });
    
    // Initialize button position
    noButton.style.transition = 'all 0.3s ease';
});
