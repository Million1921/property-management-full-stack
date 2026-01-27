const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/house.db');

async function verify() {
    const password = 'Ti@!$%';
    db.get("SELECT password FROM users WHERE email = 'mmillion728@gmail.com'", async (err, row) => {
        if (err) {
            console.error('Database error:', err);
        } else if (!row) {
            console.log('User not found');
        } else {
            const match = await bcrypt.compare(password, row.password);
            console.log('Password match:', match);
        }
        db.close();
    });
}
verify();
