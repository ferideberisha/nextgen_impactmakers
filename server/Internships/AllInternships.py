from playwright.sync_api import sync_playwright
import MySQLdb
import time
from datetime import datetime


db_params = {
    'user': 'root',
    'passwd': '1234',
    'host': 'localhost',
    'port': 3306,
    'db': 'pye_data'
}

# Function to save job data to the database
def save_job_to_db(job):
    try:
        db = MySQLdb.connect(**db_params)
        cursor = db.cursor()

        
        check_query = "SELECT COUNT(*) FROM all_internships WHERE title = %s AND source = %s"
        cursor.execute(check_query, (job['title'], job['source']))
        exists = cursor.fetchone()[0] > 0

        if not exists:
            insert_query = """
            INSERT INTO all_internships (source, title, description, posted_date, salary, duration, location, image_url, email, phone_number, office_address, company_logo)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (
                job['source'],
                job['title'],
                job['description'],
                job['posted_date'],
                job['salary'],
                job['duration'],
                job['location'],
                job['image_url'],
                job.get('email'),  # Set default value for email
                job.get('phone_number'),  # Set default value for phone number
                job.get('office_address'),  # Set default value for office address
                job.get('company_logo')  # Set default value for company logo
            ))
            db.commit()
            print(f"Inserted new job: {job['title']} at {job['company_name']}")
        else:
            print(f"Job already exists: {job['title']} at {job['company_name']}")

    except MySQLdb.Error as e:
        print(f"Error inserting data: {e}")
        db.rollback()
    finally:
        cursor.close()
        db.close()

# Function for scraper 1 (Kosova Job)
def scrape_kosova_job():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto('https://kosovajob.com/', timeout=60000)

        max_scrolls = 10
        scroll_count = 0
        previous_job_count = 0

        try:
            while scroll_count < max_scrolls:
                job_boxes_selector = '//div[@class="jobListCnts  jobListPrm  "]'
                page.wait_for_selector(job_boxes_selector, timeout=20000)
                job_boxes = page.locator(job_boxes_selector)
                job_box_count = job_boxes.count()

                if job_box_count == previous_job_count:
                    break

                previous_job_count = job_box_count

                for index in range(job_box_count):
                    try:
                        job_box = job_boxes.nth(index)
                        title_element = job_box.locator('.jobListTitle')
                        location_element = job_box.locator('.jobListCity')
                        posted_date_element = title_element.get_attribute('date')
                        image_element = job_box.locator('.jobListImage')

                        title = title_element.inner_text() if title_element.count() > 0 else 'N/A'
                        location = location_element.inner_text() if location_element.count() > 0 else 'N/A'
                        posted_date = posted_date_element if posted_date_element else 'N/A'
                        image_url = image_element.get_attribute('data-background-image') if image_element.count() > 0 else 'N/A'
                        company_name = 'Kosova Job'

                        posted_date_db = datetime.strptime(posted_date, '%Y-%m-%d %H:%M:%S').date() if posted_date != 'N/A' else None

                        
                        job_data = {
                            'source': "Kosova Job",
                            'title': title,
                            'company_name': company_name,
                            'description': 'N/A',  
                            'posted_date': posted_date_db,
                            'salary': 'N/A',
                            'duration': 'N/A',
                            'location': location,
                            'image_url': image_url,
                            'email': 'info@kosovajob.com',  
                            'phone_number': '+383 45 111 414',  
                            'office_address': 'Rr. Perandori Justinian Nr. 62 \n Prishtinë, Kosovë 10000', 
                            'company_logo': 'https://media.licdn.com/dms/image/v2/C510BAQEag0LO89qZXg/company-logo_200_200/company-logo_200_200/0/1631397947063?e=1737590400&v=beta&t=kgGYn5GtFXkacaKXrJRAmNk-dZFbHd3SSjP8IGi0pvo'
                        }
                        save_job_to_db(job_data)
                    except Exception as e:
                        print(f"Error handling job box element: {e}")

                page.evaluate('window.scrollBy(0, document.body.scrollHeight)')
                page.wait_for_timeout(3000)
                scroll_count += 1

        except Exception as e:
            print(f"Error during job extraction from Kosova Job: {e}")
        finally:
            browser.close()

# Function for scraper 2 (Kosovo Generation)
def scrape_kosovo_generation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto('https://kosovogenu.com/opportunitiesinterships', timeout=60000)

        try:
            while True:
                job_cards_selector = '//div[@class="ant-card ant-card-bordered jobCards null"]'
                page.wait_for_selector(job_cards_selector, timeout=20000)
                job_cards = page.locator(job_cards_selector)
                job_card_count = job_cards.count()

                if job_card_count == 0:
                    break

                for index in range(job_card_count):
                    try:
                        job_card = job_cards.nth(index)
                        title_element = job_card.locator('.titlePosting')
                        description_element = job_card.locator('#pTag')  
                        duration_element = job_card.locator('h6:has-text("Kohëzgjatja e Angazhimit") + h6.valuePosting')
                        location_element = job_card.locator('h6:has-text("Vendi") + h6.valuePosting')
                        image_element = job_card.locator('.companyLogo')

                        title = title_element.inner_text() if title_element.count() > 0 else 'N/A'
                        description = description_element.inner_text() if description_element.count() > 0 else 'N/A' 
                        duration = duration_element.inner_text() if duration_element.count() > 0 else 'N/A'
                        location = location_element.inner_text() if location_element.count() > 0 else 'N/A'
                        image_url = image_element.get_attribute('src') if image_element.count() > 0 else 'N/A'

                       
                        job_data = {
                            'source': "Kosovo Generation Unlimited",
                            'title': title,
                            'company_name': 'N/A', 
                            'description': description,  
                            'posted_date': None,
                            'salary': 'N/A',
                            'duration': duration,
                            'location': location,
                            'image_url': image_url,
                            'email': 'info@kosovogenu.com',  
                            'phone_number': '+383 49 236 543',  
                            'office_address': 'Tringe Ismajli Nr. 23 \n Prishtinë, Kosovë 10000', 
                            'company_logo': 'https://kosovogenu.com/images/Frame.png'
                        }
                        save_job_to_db(job_data)
                    except Exception as e:
                        print(f"Error handling internship element: {e}")

                next_button = page.locator('//button[@aria-label="Next"]')
                if next_button.count() > 0 and next_button.is_enabled():
                    next_button.click()
                    page.wait_for_load_state('networkidle')
                    page.wait_for_timeout(2000)
                else:
                    break
        except Exception as e:
            print(f"Error during internship extraction from Kosovo Generation: {e}")
        finally:
            browser.close()

# Function for scraper 3 (Superpuna RKS)
def scrape_superpuna_rks():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto('https://superpuna.rks-gov.net/job-seeker?criteria=', timeout=60000)

        try:
            previous_job_count = 0
            while True:
                job_boxes_selector = '//div[contains(@class, "px-7 py-6 border border-gray-200")]'
                page.wait_for_selector(job_boxes_selector, timeout=20000)
                job_boxes = page.locator(job_boxes_selector)
                job_box_count = job_boxes.count()

                if job_box_count == 0 or job_box_count == previous_job_count:
                    print("No more job boxes found, breaking loop.")
                    break

                print(f"Found {job_box_count} job boxes on the page.")

                for index in range(previous_job_count, job_box_count):
                    try:
                        job_box = job_boxes.nth(index)

                        title_element = job_box.locator('h3')
                        company_element = job_box.locator('h4')
                        location_element = job_box.locator('span:has-text("Lokacioni") + strong')
                        posted_date_element = job_box.locator('span:has-text("Shpallur më") + strong')
                        salary_element = job_box.locator('span:has-text("Paga") + strong')

                        title = title_element.inner_text() if title_element.count() > 0 else 'N/A'
                        company_name = company_element.inner_text() if company_element.count() > 0 else 'N/A'
                        location = location_element.inner_text() if location_element.count() > 0 else 'N/A'
                        posted_date = posted_date_element.inner_text() if posted_date_element.count() > 0 else 'N/A'
                        salary = salary_element.inner_text() if salary_element.count() > 0 else 'N/A'

                        posted_date_db = datetime.strptime(posted_date, '%b %d, %Y').date() if posted_date != 'N/A' else None

                    
                        job_data = {
                            'source': "Superpuna",
                            'title': title,
                            'company_name': company_name,
                            'description': 'N/A',  
                            'posted_date': posted_date_db,
                            'salary': salary,
                            'duration': 'N/A',
                            'location': location,
                            'image_url': 'https://superpuna.rks-gov.net/images/MFPT-logo.svg',
                            'email': 'kontakt.superpuna@rks-gov.net',  
                            'phone_number': 'N/A',  
                            'office_address': 'Ndërtesa e Qeverisë, Sheshi Nëna Terezë \n Prishtinë, Republika e Kosovës', 
                            'company_logo': 'https://media.licdn.com/dms/image/v2/C4D0BAQFtUr7p40eSIQ/company-logo_200_200/company-logo_200_200/0/1675417948635/superpuna_logo?e=1737590400&v=beta&t=KF2U6tR5UDgshxeWXZGEn95ZIIZ95QdvA8GV0cFL8Uo'
                        }

                        save_job_to_db(job_data)

                    except Exception as e:
                        print(f"Error handling job box element: {e}")

                previous_job_count = job_box_count

                next_button = page.locator('//button[contains(@class, "bg-blue-550")]')
                if next_button.count() > 0 and next_button.is_enabled():
                    print("Clicking 'Shiko më shumë' button to load more jobs.")
                    next_button.click()

                    print("Waiting for 10 seconds for new jobs to load...")
                    page.wait_for_timeout(20000)

                    page.wait_for_load_state('networkidle')

                else:
                    print("No more pages to load.")
                    break

        except Exception as e:
            print(f"Error during job extraction from Superpuna RKS: {e}")
        finally:
            browser.close()


def run_all_scrapers():
    print("Starting Kosova Job scraper...")
    scrape_kosova_job()
    print("Kosova Job scraper completed.")

    print("Starting Kosovo Generation scraper...")
    scrape_kosovo_generation()
    print("Kosovo Generation scraper completed.")

    print("Starting Superpuna RKS scraper...")
    scrape_superpuna_rks()
    print("Superpuna RKS scraper completed.")

# Main loop to refresh jobs every 30 minutes
while True:
    run_all_scrapers()
    print("All scrapers completed. Sleeping for 30 minutes...")
    time.sleep(30 * 60)
