const axios = require('axios');

async function testLogin() {
    const credentials = {
        email: 'mmillion728@gmail.com',
        password: 'Ti@!$%'
    };

    console.log('Testing login with:', credentials.email);
    console.log('API URL: http://127.0.0.1:3000/api/auth/login');

    try {
        const response = await axios.post('http://127.0.0.1:3000/api/auth/login', credentials);
        console.log('\n✅ LOGIN SUCCESS!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        process.exit(0);
    } catch (error) {
        console.log('\n❌ LOGIN FAILED!');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Error:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.log('Error:', error.message);
        }
        process.exit(1);
    }
}

testLogin();
