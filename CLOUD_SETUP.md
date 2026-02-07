# YIMS Cloud Database Setup

## MongoDB Atlas Setup (Free Tier)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create a Cluster**
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Database Access**
   - Go to "Database Access" → Add New Database User
   - Username: `yims_admin`
   - Password: Generate secure password
   - Database User Privileges: Read and write to any database

4. **Network Access**
   - Go to "Network Access" → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for deployment
   - Or add your specific IP for development

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Environment Configuration

Update `server/.env`:

```env
MONGODB_URI=mongodb+srv://yims_admin:<password>@cluster0.xxxxx.mongodb.net/yims?retryWrites=true&w=majority
PORT=4000
NODE_ENV=production
```

## Deploy Backend

### Option 1: Render (Recommended)

1. Go to https://render.com
2. Connect your GitHub repo
3. Create "New Web Service"
4. Set:
   - **Build Command**: `cd "New folder/yims-web" && npm install`
   - **Start Command**: `cd "New folder/yims-web" && npm run server`
   - **Environment Variables**: Add MONGODB_URI from above
5. Deploy

### Option 2: Railway

1. Go to https://railway.app
2. "New Project" → Deploy from GitHub
3. Add environment variables
4. Deploy automatically

## Update Frontend

After backend deployment, update frontend API URL:

Create `.env` in project root:
```
VITE_API_URL=https://your-backend.onrender.com
```

Update all fetch calls to use `import.meta.env.VITE_API_URL + '/api/...'`

## Excel Auto-Export

All database operations automatically export to Excel:
- `server/data/excel/students.xlsx`
- `server/data/excel/attendance.xlsx`
- `server/data/excel/results.xlsx`
- `server/data/excel/alumni.xlsx`
- `server/data/excel/admissions.xlsx`
- `server/data/excel/contacts.xlsx`

## Default Users

- **Admin**: admin001 / Admin@123
- **Staff**: staff001 / Staff@123
- **Student**: STU-101 / Student@123
