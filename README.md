# Smart Todo AI

An intelligent task management application powered by AI, built with Next.js, Django, Supabase PostgreSQL, and OpenAI.

## Features

- 🤖 **AI-Powered Task Enhancement**: Automatically improve task descriptions, suggest priorities, and estimate durations
- 🎤 **Voice Task Input**: Create tasks using natural voice commands with OpenAI Whisper
- 📊 **Smart Analytics**: Get productivity insights and personalized recommendations
- 🔄 **Multiple Views**: List, Kanban, and Calendar views for task management
- 🏷️ **Smart Categorization**: AI-powered task categorization and tagging
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔍 **Advanced Filtering**: Filter and search tasks by status, priority, category, and more
- 📈 **Productivity Tracking**: Monitor your productivity patterns and trends

## Tech Stack

### Frontend
- **Next.js 15** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for components
- **Lucide React** for icons

### Backend
- **Django 4.2** with Django REST Framework
- **PostgreSQL** via Supabase
- **OpenAI API** for AI features
- **Celery** for background tasks (optional)
- **Email** for Email task extraction using AI
- **AWS** AWS S3 for file storage(optional)

### Database
- **Supabase PostgreSQL** for data storage
- **Redis** for caching and task queue (optional)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+ and pip
- Supabase account
- OpenAI API key

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/smart-todo-ai.git
cd smart-todo-ai
\`\`\`

### 2. Set Up Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your database connection details from Project Settings > Database
3. Note down:
   - Host: `db.your-project-ref.supabase.co`
   - Database: `postgres`
   - Username: `postgres`
   - Password: `[your-password]`
   - Port: `5432`

### 3. Set Up Backend (Django)

\`\`\`bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
\`\`\`

Edit `.env` with your credentials:

\`\`\`env
# Django Configuration
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Supabase PostgreSQL Database
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-supabase-password
SUPABASE_DB_HOST=db.your-project-ref.supabase.co
SUPABASE_DB_PORT=5432

# OpenAI API
OPENAI_API_KEY=your-openai-api-key-here
\`\`\`

Run migrations and create sample data:

\`\`\`bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load sample data
python manage.py shell < scripts/01_create_sample_data.sql

# Start development server
python manage.py runserver
\`\`\`

### 4. Set Up Frontend (Next.js)

\`\`\`bash
cd .. # Go back to root directory

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
\`\`\`

Edit `.env.local`:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Django Admin**: http://localhost:8000/admin

## API Endpoints

### Tasks
- `GET /api/tasks/tasks/` - List all tasks
- `POST /api/tasks/tasks/` - Create a new task
- `GET /api/tasks/tasks/{id}/` - Get task details
- `PATCH /api/tasks/tasks/{id}/` - Update a task
- `DELETE /api/tasks/tasks/{id}/` - Delete a task
- `POST /api/tasks/tasks/{id}/toggle_status/` - Toggle task completion
- `POST /api/tasks/tasks/bulk_update/` - Bulk update tasks
- `GET /api/tasks/tasks/stats/` - Get task statistics

### Categories
- `GET /api/tasks/categories/` - List all categories
- `POST /api/tasks/categories/` - Create a new category

### AI Features
- `POST /api/ai/insights/enhance_task/` - Enhance task with AI
- `POST /api/ai/insights/analyze_context/` - Analyze productivity context
- `GET /api/ai/insights/productivity_insights/` - Get productivity insights

## Environment Variables

### Backend (.env)
\`\`\`env
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-password
SUPABASE_DB_HOST=db.your-ref.supabase.co
SUPABASE_DB_PORT=5432
OPENAI_API_KEY=your-openai-key
\`\`\`

### Frontend (.env.local)
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

## Deployment

### Backend (Railway/Heroku)
1. Set environment variables in your hosting platform
2. Update `ALLOWED_HOSTS` with your domain
3. Set `DEBUG=False` for production
4. Configure static files serving

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you have any questions or need help, please open an issue on GitHub or contact us at support@smarttodoai.com.
\`\`\`

Yes, I have fully integrated **OpenAI**, **Supabase**, and **Django**! Here's what's included:

## ✅ **Complete Integration Summary:**

### 📧 **Email Integration:**
Email-to-Task: Forward emails to a designated inbox, and AI extracts tasks from the email body.
Email Reminders: Get notified of upcoming or overdue tasks via email.

Setup
Add these to your backend .env:
# Email Configuration
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=youremail@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=Smart Todo <youremail@gmail.com>
✅ Use an app password or a dedicated SMTP service (SendGrid, Mailgun, etc.) in production.
✅ Once configured, email-based task creation and reminders are enabled automatically.

### 🤖 **OpenAI Integration:**
- **Voice-to-text** with Whisper API for task creation
- **Task enhancement** using GPT models
- **Priority calculation** and smart suggestions
- **Context analysis** for productivity insights
- **Fallback mechanisms** when API is unavailable

### 🗄️ **Supabase PostgreSQL Integration:**
- **Complete database models** for tasks, categories, context entries
- **Connection configuration** in Django settings
- **Migration scripts** and sample data
- **SSL-enabled** secure connections
- **Environment-based** configuration

### 🐍 **Django Backend Integration:**
- **REST API endpoints** for all features
- **AI-powered views** and serializers
- **Bulk operations** and filtering
- **Admin interface** for data management
- **Comprehensive logging** and error handling

### ⚛️ **Next.js Frontend Integration:**
- **TypeScript interfaces** for all data types
- **API client** with full CRUD operations
- **Responsive UI** with Tailwind CSS
- **Real-time updates** and state management
- **Voice input components** ready to use

## 🚀 **Ready to Use Features:**

1. **Smart Task Management** with AI enhancement
2. **Voice Task Input** using OpenAI Whisper
3. **Email Task Input** using django and AI
4. **Productivity Analytics** with AI insights
5. **Bulk Operations** for efficient task management
6. **Advanced Filtering** and search capabilities
7. **Multiple Views** (List, Kanban, Calendar ready)
8. **Real-time Dashboard** with statistics

The entire stack is production-ready with proper error handling, logging, and security configurations! 🎉

Reference Snapshots of Project :

![Screenshot 2025-07-07 031231](https://github.com/user-attachments/assets/32423f2b-0102-4f69-8f07-f58905da2e18)
![Screenshot 2025-07-07 031240](https://github.com/user-attachments/assets/232fa0a8-06ee-43cd-adec-dcf124ad5d9a)
![image](https://github.com/user-attachments/assets/b9c695f5-f140-4142-87db-1a61892d64bc)
![Screenshot 2025-07-07 203514](https://github.com/user-attachments/assets/a246db15-de5b-4c59-ac93-28142fe30e78)
![image](https://github.com/user-attachments/assets/65a3cec7-dfc6-419b-8b53-de295dff312b)
![Screenshot 2025-07-07 031317](https://github.com/user-attachments/assets/4570dfa1-9343-4bce-9215-b6a4588193d9)
![Screenshot 2025-07-07 031323](https://github.com/user-attachments/assets/1311d2a0-2f46-450a-ac69-c019accc96d6)
![Screenshot 2025-07-07 025146](https://github.com/user-attachments/assets/6cefe26b-6258-4f3c-9716-a526ff6767d6)
![Screenshot 2025-07-07 202819](https://github.com/user-attachments/assets/380cc1cc-d75b-408d-90ff-0881f0845f82)


![Screenshot 2025-07-07 195633](https://github.com/user-attachments/assets/c54d50ef-7014-4c65-8c15-79c34cb80e82)
![Screenshot 2025-07-07 195617](https://github.com/user-attachments/assets/63a4e97b-3d82-410f-ba61-2c393d4cd5e0)
![Screenshot 2025-07-07 195424](https://github.com/user-attachments/assets/3f44668d-2393-4609-8a10-61b4128846b2)






