# 🔍 How to Find Supabase Connection String

## Step-by-Step Guide:

### 1. Open Supabase Dashboard
Go to: https://supabase.com/dashboard/project/vmwtzdicuytrsipcxewg

### 2. Navigate to Database Settings
- Click on the **⚙️ Settings** icon (bottom left sidebar)
- Click on **"Database"** from the menu

### 3. Find Connection String Section
Scroll down until you see a section titled **"Connection string"**

### 4. Get the Connection Strings

You'll see several tabs. You need **TWO** connection strings:

#### A) DATABASE_URL (with Pooler)
1. Click on **"Session pooler"** or **"Transaction"** tab
2. Make sure mode is set to **"Transaction"**
3. Copy the URI - it should look like:
   ```
   postgresql://postgres.vmwtzdicuytrsipcxewg:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```
4. Add `?pgbouncer=true` at the end

**Final DATABASE_URL:**
```
postgresql://postgres.vmwtzdicuytrsipcxewg:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

#### B) DIRECT_URL (Direct Connection)
1. Click on **"URI"** tab (or find "Direct connection")
2. Copy the URI - it should look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.vmwtzdicuytrsipcxewg.supabase.co:5432/postgres
   ```

**Final DIRECT_URL:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.vmwtzdicuytrsipcxewg.supabase.co:5432/postgres
```

### 5. Replace [YOUR-PASSWORD]

In both URLs, replace `[YOUR-PASSWORD]` with your actual database password.

**Don't have the password?**
- In the same Database settings page
- Look for **"Database password"** or **"Reset database password"**
- You can reset it and get a new one

---

## 📝 What to Do Next:

1. **Find your database password** (or reset it)
2. **Copy the two connection strings** from Supabase
3. **Replace `[YOUR-PASSWORD]`** with your actual password in both URLs
4. **Update the `.env` file** with these URLs

---

## Example (with fake password):

If your password is: `MySuper$ecureP@ss123`

Then your URLs should be:
```env
DATABASE_URL=postgresql://postgres.vmwtzdicuytrsipcxewg:MySuper$ecureP@ss123@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true

DIRECT_URL=postgresql://postgres:MySuper$ecureP@ss123@db.vmwtzdicuytrsipcxewg.supabase.co:5432/postgres
```

---

## 🆘 Still Can't Find It?

Take a screenshot of your Supabase Database settings page and I can help you locate it!

Or you can:
1. Go to the SQL Editor in Supabase
2. We can use Supabase's built-in database directly without the connection string
3. Let me know and I'll adjust the setup!
