const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/house.db');

db.all("SELECT id, email, role, password FROM users", (err, rows) => {
    if (err) {
        console.error('Error querying database:', err);
    } else {
        console.log('Users in database:', rows.map(u => ({ id: u.id, email: u.email, role: u.role })));
        // Note: passwords are hashed, so we're just checking existence and email
    }
    db.close();
});
