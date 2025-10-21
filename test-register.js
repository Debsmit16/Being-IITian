const http = require('http');

const data = JSON.stringify({
  email: 'test@student.com',
  password: 'Test@123',
  fullName: 'Test Student',
  role: 'STUDENT'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('Registering user...\n');

const req = http.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', responseData);
    console.log('\n✓ Check Prisma Studio at http://localhost:5555 to see the user');
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.write(data);
req.end();
