"""
Django migration runner script for Smart Todo AI Backend
This script handles database migrations and initial setup
"""

import os
import sys
import django
from pathlib import Path
import logging

# Add the backend directory to Python path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.append(str(backend_dir))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_todo_backend.settings')
django.setup()

from django.core.management import execute_from_command_line
from django.db import connection

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def setup_django():
    """Setup Django environment"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_todo_backend.settings')
    django.setup()

def run_command(command_args):
    """Run Django management command with error handling"""
    try:
        execute_from_command_line(['manage.py'] + command_args)
        return True
    except Exception as e:
        print(f"Unexpected error: {e}")
        return False

def run_migrations():
    """Run Django migrations"""
    try:
        logger.info("Running Django migrations...")
        
        # Create migrations
        print("\n📝 Creating migrations...")
        execute_from_command_line(['manage.py', 'makemigrations'])
        
        # Apply migrations
        print("\n⚡ Applying migrations...")
        execute_from_command_line(['manage.py', 'migrate'])
        
        logger.info("Migrations completed successfully!")
        return True
        
    except Exception as e:
        logger.error(f"Error running migrations: {str(e)}")
        return False

def create_superuser():
    """Create a superuser if it doesn't exist"""
    try:
        from django.contrib.auth.models import User
        
        if not User.objects.filter(username='admin').exists():
            logger.info("Creating superuser...")
            User.objects.create_superuser(
                username='admin',
                email='admin@smarttodo.ai',
                password='admin123'  # Change this in production!
            )
            logger.info("Superuser created successfully!")
        else:
            logger.info("Superuser already exists.")
            
    except Exception as e:
        logger.error(f"Error creating superuser: {str(e)}")

def load_sample_data():
    """Load sample data from SQL file"""
    try:
        sql_file = backend_dir / 'scripts' / '01_create_sample_data.sql'
        
        if sql_file.exists():
            logger.info("Loading sample data...")
            
            with open(sql_file, 'r') as file:
                sql_content = file.read()
            
            with connection.cursor() as cursor:
                cursor.execute(sql_content)
            
            logger.info("Sample data loaded successfully!")
        else:
            logger.warning("Sample data SQL file not found.")
            
    except Exception as e:
        logger.error(f"Error loading sample data: {str(e)}")

def check_database_connection():
    """Check if database connection is working"""
    try:
        from django.db import connection
        
        print("🔍 Checking database connection...")
        
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            
        if result:
            print("✅ Database connection successful!")
            return True
        else:
            print("❌ Database connection failed!")
            return False
            
    except Exception as e:
        print(f"❌ Database connection error: {str(e)}")
        print("\n💡 Make sure your database is running and environment variables are set correctly:")
        print("   - SUPABASE_DB_HOST")
        print("   - SUPABASE_DB_NAME") 
        print("   - SUPABASE_DB_USER")
        print("   - SUPABASE_DB_PASSWORD")
        return False

def main():
    """Main setup function"""
    print("🚀 Setting up Smart Todo AI Backend...")
    print("=" * 50)
    
    # Setup Django
    setup_django()
    
    # Check database connection
    if not check_database_connection():
        print("\n❌ Setup failed due to database connection issues")
        sys.exit(1)
    
    # Run migrations
    run_migrations()
    
    # Create superuser
    create_superuser()
    
    # Load sample data
    load_sample_data()
    
    # Collect static files
    print("\n📁 Collecting static files...")
    if run_command(['collectstatic', '--noinput']):
        print("✅ Static files collected successfully")
    else:
        print("⚠️  Failed to collect static files (this is optional)")
    
    # Final summary
    print("\n" + "=" * 50)
    print("🎉 Smart Todo AI Backend setup completed!")
    print("\n📋 Next steps:")
    print("1. Start the development server:")
    print("   python manage.py runserver")
    print("\n2. Access the admin panel:")
    print("   http://localhost:8000/admin/")
    print("   Username: admin")
    print("   Password: admin123")
    print("\n3. Test the API:")
    print("   http://localhost:8000/health/")
    print("   http://localhost:8000/api/tasks/")
    print("\n4. Configure your .env file with:")
    print("   - OPENAI_API_KEY (for AI features)")
    print("   - Supabase database credentials")
    print("\n🔧 Environment Variables Needed:")
    print("   DJANGO_SECRET_KEY=your-secret-key")
    print("   OPENAI_API_KEY=your-openai-key")
    print("   SUPABASE_DB_HOST=your-supabase-host")
    print("   SUPABASE_DB_PASSWORD=your-supabase-password")
    
    return True

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
