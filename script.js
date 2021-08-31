const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = 'hKZdKHP9cHwDXa80mqLJYw3hMtzRXfhc4W7Jflcwjkg';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateApiUrlWithNewCount(imageCount){
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
    console.log(apiUrl);
}

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;       
    }
}

// Helper Function To Set Attributes on DOM Elements

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links& Photos , Add To Dom
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
       // Create <a> to link to Unsplash
       const item = document.createElement('a');
       setAttributes(item, {
           href: photo.links.html,
           target: '_blank'
       });

       // Create <img> for photo 
       const img = document.createElement('img');
       setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

       // Event Listener , check when each is finished loading
       img.addEventListener('load', imageLoaded);
        
       // Put <img> inside <a> , then put both inside imageContainer Element
       item.appendChild(img);
       imageContainer.appendChild(item);
       
    });
}


// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;        
        getPhotos();
    }
});


// Get photos from unsplash api

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(initialLoad){
            updateApiUrlWithNewCount(30);
            initialLoad = false;
        }

    }catch(error){
        console.log(error);
    }
}

getPhotos();