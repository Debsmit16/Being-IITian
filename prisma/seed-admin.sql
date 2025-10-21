-- Create admin user with credentials
-- Email: admin@beingiitian.com
-- Password: Admin@12345 (will be hashed)

INSERT INTO users (
  id,
  email,
  phone,
  password,
  "fullName",
  role,
  "dateOfBirth",
  gender,
  "emailVerified",
  "phoneVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'admin@beingiitian.com',
  '+919876543210',
  '$2a$10$YourHashedPasswordHere', -- This will be generated via script
  'Super Admin',
  'ADMIN',
  '1990-01-01',
  'MALE',
  true,
  true,
  NOW(),
  NOW()
) RETURNING id;

-- Create admin profile (use the returned ID above)
INSERT INTO admin_profiles (
  id,
  "userId",
  department,
  permissions,
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  '(user_id_from_above)',
  'System Administration',
  ARRAY['ALL'],
  NOW(),
  NOW()
);
