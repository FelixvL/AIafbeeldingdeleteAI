window.addEventListener('DOMContentLoaded', (event) => {
    loadImages();
});

// ... other code ...

function loadImages() {
    fetch('http://localhost:3000/images')
        .then(response => response.json())
        .then(images => {
            const imageContainer = document.getElementById('image-container');
            imageContainer.innerHTML = '';
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = 'public/images/' + image;

                const label = document.createElement('p');
                label.textContent = image;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteImage(image, div));

                const moveButton = document.createElement('button');  // New button
                moveButton.textContent = 'Move';
                moveButton.addEventListener('click', () => moveImage(image, div));

                const div = document.createElement('div');
                div.appendChild(img);
                div.appendChild(label);
                div.appendChild(deleteButton);
                div.appendChild(moveButton);  // Add to div

                imageContainer.appendChild(div);
            });
        });
}

// ... other code ...

function moveImage(name, imageDiv) {
    fetch('http://localhost:3000/move/' + name, { method: 'POST' })  // Send POST request to /move
        .then(response => response.json())
        .then(() => {
            imageDiv.remove();  // Remove image div from DOM
        })
        .catch(error => console.error('Error:', error));
}

function deleteImage(name) {
    fetch('http://localhost:3000/images/' + name, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => loadImages())  // Refresh images after one is deleted
        .catch(error => console.error('Error:', error));
}
