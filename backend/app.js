const express = require('express');
const path = require('path');
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.get('/api/flag/:countryCode', (req, res) => {
    const code = req.params.countryCode.toLowerCase();
    res.json({ url: `/assets/${code}.JPG` });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Backend running at http://localhost:${PORT}`);
});
