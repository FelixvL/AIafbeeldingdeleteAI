const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static('public'));

app.get('/images', (req, res) => {
    const imagesDir = './public/images/';

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        } 

        const images = files.filter(file => path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.png');
        res.json(images);
    });
});
app.post('/move/:name', (req, res) => {
    const oldPath = path.join('./public/images/', req.params.name);
    const newPath = path.join('./public/images/moved/', req.params.name);  // Adjust as necessary

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error("Could not move file.", err);
            res.status(500).send({ error: 'Could not move file.' });
            return;
        }

        res.status(200).send({ message: 'File moved.' });
    });
});
app.delete('/images/:name', (req, res) => {
    const filePath = path.join('./public/images/', req.params.name);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Could not delete file.", err);
            res.status(500).send({ error: 'Could not delete file.' });
            return;
        }

        res.status(200).send({ message: 'File deleted.' });
    });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
