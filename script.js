window.addEventListener('DOMContentLoaded', (event) => {
    loadImages();
});

function loadImages() {
    fetch('http://localhost:3000/images/')
        .then(response => response.json())
        .then(images => {
            const imageContainer = document.getElementById('image-container');
            imageContainer.innerHTML = '';  // Clear out old images before adding new ones
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = './public/images/' + image;

                const label = document.createElement('p');
                label.textContent = image;

                const button = document.createElement('button');
                button.textContent = 'Delete';
                button.addEventListener('click', () => deleteImage(image));

                const div = document.createElement('div');
                div.appendChild(img);
                div.appendChild(label);
                div.appendChild(button);

                imageContainer.appendChild(div);
            });
        });
}

function deleteImage(name) {
    fetch('http://localhost:3000/images/' + name, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => loadImages())  // Refresh images after one is deleted
        .catch(error => console.error('Error:', error));
}
