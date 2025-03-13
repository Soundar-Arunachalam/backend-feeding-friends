document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const backButton = document.getElementById('backButton');
    const mapContainer = document.getElementById('map');
    const expandBtn = document.querySelector('.expand-btn');
    const orderDetails = document.querySelector('.order-details');
    const trackingTimeline = document.querySelector('.tracking-timeline');
    
    // Initialize map (placeholder)
    initMap();
    
    // Back button functionality
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }
    
    // Expand/collapse agent details
    if (expandBtn) {
        expandBtn.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');
            
            if (isExpanded) {
                this.classList.remove('expanded');
                this.innerHTML = '<i class="fas fa-chevron-down"></i>';
                orderDetails.style.display = 'none';
                trackingTimeline.style.display = 'none';
            } else {
                this.classList.add('expanded');
                this.innerHTML = '<i class="fas fa-chevron-up"></i>';
                orderDetails.style.display = 'block';
                trackingTimeline.style.display = 'flex';
            }
        });
    }
    
    // For demo, initially collapsed
    if (orderDetails) orderDetails.style.display = 'none';
    if (trackingTimeline) trackingTimeline.style.display = 'none';
    
    // Simulate tracking updates
    simulateTracking();
});

function initMap() {
    // This would normally integrate with a maps API like Google Maps
    // For now, just show a placeholder and fake the map movement
    
    // In a real implementation, you would initialize a map like:
    /*
    if (typeof google !== 'undefined') {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: YOUR_LAT, lng: YOUR_LNG },
            zoom: 14
        });
        
        // Add markers, routes, etc.
    }
    */
    
    // For demo purposes, use the placeholder image
    console.log('Map initialized (placeholder)');
}

function simulateTracking() {
    // Simulate the "Complete order" step after 10 seconds
    setTimeout(() => {
        const completeStep = document.querySelector('.timeline-item:last-child');
        if (completeStep) {
            completeStep.classList.add('completed');
            
            // Update status text
            const statusText = document.querySelector('.tracking-status p');
            if (statusText) {
                statusText.textContent = 'Delivery Completed Successfully';
            }
            
            // After some time, return to profile
            setTimeout(() => {
                // In a real app, you might show a success message and then navigate
                alert('Food donation delivery completed successfully!');
                window.location.href = 'profile.html';
                
                // Also update the local storage state to completed
                try {
                    const donationState = JSON.parse(localStorage.getItem('donationState'));
                    if (donationState) {
                        donationState.status = 'completed';
                        localStorage.setItem('donationState', JSON.stringify(donationState));
                    }
                } catch (e) {
                    console.error('Error updating donation state', e);
                }
            }, 3000);
        }
    }, 10000);
}