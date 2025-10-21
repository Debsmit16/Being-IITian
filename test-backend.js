// Test Backend API Endpoints
// Run this with: node test-backend.js

const API_BASE = 'http://localhost:3000';

async function testRegister() {
  console.log('\n🧪 Testing Registration API...');
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testuser@iitian.com',
        password: 'Test@1234',
        fullName: 'Test User',
        phone: '+919876543210',
        role: 'STUDENT',
        currentClass: '12',
        school: 'Test School',
        board: 'CBSE',
        targetExam: 'JEE Advanced',
        targetYear: 2026,
        city: 'Mumbai',
        state: 'Maharashtra',
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful!');
      console.log('   User ID:', data.user.id);
      console.log('   Email:', data.user.email);
      console.log('   Role:', data.user.role);
      return { success: true, token: data.token, user: data.user };
    } else {
      console.log('❌ Registration failed:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return { success: false, error: error.message };
  }
}

async function testLogin() {
  console.log('\n🧪 Testing Login API...');
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testuser@iitian.com',
        password: 'Test@1234',
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('   User:', data.user.fullName);
      console.log('   Email:', data.user.email);
      console.log('   Token:', data.token ? 'Generated ✓' : 'Missing ✗');
      return { success: true, token: data.token };
    } else {
      console.log('❌ Login failed:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return { success: false, error: error.message };
  }
}

async function testGetUser(token) {
  console.log('\n🧪 Testing Get User API...');
  
  try {
    const response = await fetch(`${API_BASE}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Cookie': `token=${token}`,
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Get user successful!');
      console.log('   Name:', data.user.fullName);
      console.log('   Email:', data.user.email);
      console.log('   Role:', data.user.role);
      return { success: true };
    } else {
      console.log('❌ Get user failed:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🚀 Starting Backend API Tests');
  console.log('================================');
  
  // Test 1: Register
  const registerResult = await testRegister();
  
  if (registerResult.success) {
    // Test 2: Login
    const loginResult = await testLogin();
    
    if (loginResult.success && loginResult.token) {
      // Test 3: Get User
      await testGetUser(loginResult.token);
    }
  }
  
  console.log('\n================================');
  console.log('✨ Tests completed!\n');
}

// Run tests
runTests();
