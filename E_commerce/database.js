const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const db = new sqlite3.Database(':memory:'); // Use ':memory:' for an in-memory database or specify a file path

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT)");
});

const registerUser = (name, email, password) => {
    return new Promise((resolve, reject) => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        stmt.run(name, email, hashedPassword, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
        stmt.finalize();
    });
};

const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
            if (err) {
                reject(err);
            } else if (user && bcrypt.compareSync(password, user.password)) {
                resolve(user);
            } else {
                resolve(null);
            }
        });
    });
};

module.exports = { registerUser, loginUser };