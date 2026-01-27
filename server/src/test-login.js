const axios = require('axios');

async function testSession() {
    try {
        // 1. Login
        console.log('Attempting login...');
        const loginResponse = await axios.post('http://127.0.0.1:3000/api/auth/login', {
            email: 'mmillion728@gmail.com',
            password: 'Ti@!$%'
        });
        const token = loginResponse.data.access_token;
        console.log('Login successful! Token obtained.');

        // 2. Test /auth/me
        console.log('Testing /auth/me with token...');
        const meResponse = await axios.get('http://127.0.0.1:3000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Session verified successfully!');
        console.log('Fetched User Data:', meResponse.data);

        if (meResponse.data && meResponse.data.id && meResponse.data.email) {
            console.log('SUCCESS: Session is stable and user data is correct.');
        } else {
            console.warn('WARNING: /auth/me returned incomplete data:', meResponse.data);
        }

        process.exit(0);
    } catch (error) {
        console.error('Session verification FAILED!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

testSession();
