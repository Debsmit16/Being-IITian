const http = require('http');

const data = JSON.stringify({
  // Personal Information
  fullName: 'Test Student User',
  email: 'teststudent@example.com',
  phone: '9876543210',
  password: 'Test@12345',
  dateOfBirth: '2005-05-15',
  gender: 'Male',
  
  // Academic Information
  currentClass: 'Class 12',
  school: 'Test High School',
  board: 'CBSE',
  targetExam: 'JEE Advanced',
  targetYear: '2026',
  
  // Address
  address: '123 Test Street',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  
  // Parent/Guardian Information
  parentName: 'Test Parent',
  parentPhone: '9876543211',
  parentEmail: 'parent@example.com',
  
  // Preferences
  learningMode: 'Online',
  subjects: ['Physics', 'Chemistry', 'Mathematics'],
  hearAboutUs: 'Google Search',
  
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

console.log('Testing user registration with full data...\n');
console.log('Sending data:', JSON.parse(data));
console.log('\n-----------------------------------\n');

const req = http.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('\nResponse:');
    try {
      const jsonResponse = JSON.parse(responseData);
      console.log(JSON.stringify(jsonResponse, null, 2));
      
      if (res.statusCode === 201) {
        console.log('\n✅ SUCCESS! User registered successfully!');
        console.log('\n📊 Check Prisma Studio at http://localhost:5555');
        console.log('   Click on "User" table to see the registered user');
      } else {
        console.log('\n❌ FAILED! Registration unsuccessful');
      }
    } catch (e) {
      console.log(responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
  console.log('\nMake sure the dev server is running on port 3000');
});

req.write(data);
req.end();
