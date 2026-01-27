const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const db = new sqlite3.Database('data/house.db');

async function resetPassword() {
    const password = 'Ti@!$%';
    const hash = await bcrypt.hash(password, 10);

    db.run("UPDATE users SET email = ?, password = ? WHERE role = 'admin'", ['mmillion728@gmail.com', hash], (err) => {
        if (err) {
            console.error('Error resetting password:', err);
        } else {
            console.log('Admin credentials updated successfully');
        }
        db.close();
    });
}
resetPassword();
o
