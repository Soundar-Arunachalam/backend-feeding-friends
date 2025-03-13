document.addEventListener('DOMContentLoaded', function() {
    // Donor type selection
    const donorTypes = document.querySelectorAll('.donor-type');
    const businessNameInput = document.getElementById('businessName');
    
    donorTypes.forEach(type => {
        type.addEventListener('click', function() {
            // Remove active class from all types
            donorTypes.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked type
            this.classList.add('active');
            
            // Change placeholder based on donor type
            if (this.id === 'individual') {
                businessNameInput.placeholder = 'Full Name';
            } else {
                businessNameInput.placeholder = 'Business Name';
            }
        });
    });
    
    // Country code dropdown (simplified version)
    const countryCode = document.querySelector('.country-code');
    countryCode.addEventListener('click', function() {
        alert('Country code selection functionality would go here.');
    });
    
    // Map modal functionality
    const mapModal = document.getElementById('mapModal');
    const pinLocationBtn = document.getElementById('pinLocationBtn');
    const closeBtn = document.querySelector('.close');
    const confirmLocationBtn = document.getElementById('confirmLocation');
    let map;
    let marker;
    
    pinLocationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mapModal.style.display = 'block';
        initMap();
    });
    
    closeBtn.addEventListener('click', function() {
        mapModal.style.display = 'none';
    });
    
    confirmLocationBtn.addEventListener('click', function() {
        // Get the location from the hidden field
        const locationValue = document.getElementById('location').value;
        
        if (locationValue) {
            // Here you would typically use a geocoding service to get the address
            // from coordinates, but for this example we'll use sample data
            const addressInput = document.getElementById('address');
            const pinCodeInput = document.getElementById('pinCode');
            const cityInput = document.getElementById('city');
            
            addressInput.value = '123 Example Street';
            pinCodeInput.value = '400001';
            cityInput.value = 'Mumbai';
        }
        
        mapModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === mapModal) {
            mapModal.style.display = 'none';
        }
    });
    
    // Map initialization with Leaflet
    function initMap() {
        // Remove existing map instance if it exists
        if (map) {
            map.remove();
        }
        
        // Initialize the map
        map = L.map('map').setView([20.5937, 78.9629], 5); // Default to India
        
        // Add the OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        
        // Add click event to place marker
        map.on('click', function(e) {
            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            document.getElementById('location').value = e.latlng.lat + ", " + e.latlng.lng;
        });
        
        // Map/Satellite toggle (note: for actual satellite view you would need a provider like Mapbox)
        const mapBtn = document.querySelector('.map-btn');
        const satelliteBtn = document.querySelector('.satellite-btn');
        
        mapBtn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                // Switch to map view
                map.removeLayer(map._layers[Object.keys(map._layers)[1]]);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map);
                
                satelliteBtn.classList.remove('active');
                this.classList.add('active');
            }
        });
        
        satelliteBtn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                // Switch to satellite view - using a sample satellite-like tile provider
                // In a real app, you'd use a proper satellite imagery provider
                map.removeLayer(map._layers[Object.keys(map._layers)[1]]);
                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                }).addTo(map);
                
                mapBtn.classList.remove('active');
                this.classList.add('active');
            }
        });
    }
    
    // Form submission
    const donorForm = document.getElementById('donorForm');
    
    donorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const mobileNumber = document.getElementById('mobileNumber').value;
        const emailId = document.getElementById('emailId').value;
        
        if (mobileNumber.length < 10) {
            alert('Please enter a valid mobile number');
            return;
        }
        
        if (!validateEmail(emailId)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // If all validation passes, submit form
        alert('Form submitted successfully!');
        // In a real implementation, this would send the data to a server
    });
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});