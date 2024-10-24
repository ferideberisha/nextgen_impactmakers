import MySQLdb

# Database connection parameters
db_params = {
    'user': 'root', 
    'passwd': '1234',  
    'host': 'localhost',
    'port': 3306
}

def create_database():
    try:
        # Connect to MySQL
        db = MySQLdb.connect(**db_params)
        cursor = db.cursor()
        
        # Create the database
        cursor.execute("CREATE DATABASE IF NOT EXISTS pye_data;")
        cursor.execute("USE pye_data;")

        # Create all_courses table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS all_courses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            source VARCHAR(255),
            title VARCHAR(255),
            trainer VARCHAR(255),
            description TEXT,
            price VARCHAR(50),
            students INT,
            rating VARCHAR(50),
            image_url VARCHAR(500),
            duration VARCHAR(255),
            UNIQUE(title, source)
        );
        """)
        
        # Create all_events table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS all_events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            source VARCHAR(255),
            organizer VARCHAR(255),
            title VARCHAR(255),
            duration VARCHAR(255),
            location VARCHAR(255),
            image_url VARCHAR(255)
        );
        """)
        
        # Create all_internships table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS all_internships (
            id INT AUTO_INCREMENT PRIMARY KEY,
            source VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            posted_date DATE,
            salary VARCHAR(100),
            duration VARCHAR(100),
            location VARCHAR(255),
            image_url VARCHAR(500)
        );
        """)

        # Create all_volunteering table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS all_volunteering (
            id INT AUTO_INCREMENT PRIMARY KEY,
            source VARCHAR(255),
            title VARCHAR(255),
            duration VARCHAR(255),
            cause TEXT,
            age_group VARCHAR(255),
            image_url TEXT,
            UNIQUE(title, source)
        );
        """)

        # Create admins table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        """)

        # Modify participants table creation
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS participants (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            password VARCHAR(255) NOT NULL 
        );
        """)

        # Create organizations table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS organizations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name_of_org VARCHAR(255) NOT NULL,
            email_of_org VARCHAR(255) NOT NULL UNIQUE,
            phone_number_of_org VARCHAR(20) NOT NULL,
            password_of_org VARCHAR(255) NOT NULL,
            url_of_org VARCHAR(255),
            description_of_org TEXT,
            status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending'
        );
        """)

        #########################################################
        # UPDATES FROM INITIAL SETUP GO HERE...
        #########################################################

        # Function to check if a column exists
        def column_exists(table, column):
            cursor.execute(f"""
            SELECT COUNT(*) 
            FROM information_schema.COLUMNS 
            WHERE TABLE_NAME='{table}' AND COLUMN_NAME='{column}';
            """)
            return cursor.fetchone()[0] > 0

        # List of tables and new columns to add
        tables_and_columns = {
            'all_courses': ['email', 'phone_number', 'office_address', 'company_logo'],
            'all_events': ['email', 'phone_number', 'office_address', 'company_logo'],
            'all_internships': ['email', 'phone_number', 'office_address', 'company_logo'],
            'all_volunteering': ['email', 'phone_number', 'office_address', 'company_logo'],
            'participants': ['preferences'],  # Adding preferences for participants
        }

        for table, columns in tables_and_columns.items():
            for column in columns:
                if not column_exists(table, column):
                    # Change column type based on the table if necessary
                    column_type = "VARCHAR(255)" if column != "preferences" else "TEXT"
                    cursor.execute(f"ALTER TABLE {table} ADD COLUMN {column} {column_type};")
                    print(f"Added {column} to {table}.")
                else:
                    print(f"{column} already exists in {table}.")

        print("Columns added successfully where needed!")

        print("Database setup completed successfully!")
    
    except MySQLdb.Error as e:
        print(f"Error creating the database: {e}")
    
    finally:
        cursor.close()
        db.close()

if __name__ == "__main__":
    create_database()
