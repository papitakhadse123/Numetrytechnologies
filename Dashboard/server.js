const express = require('express');
const bodyParser = require('body-parser');
const { registerUser, loginUser } = require('./database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await registerUser(name, email, password);
        res.send('Registration successful!');
    } catch (error) {
        res.status(500).send('Error registering user: ' + error.message);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        if (user) {
            res.json({ success: true, name: user.name });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});