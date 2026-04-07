import sqlite3
import os

# backend/migrate_to_mysql.py

def export_to_sql():
    db_path = 'db.sqlite3'
    if not os.path.exists(db_path):
        print(f"Error: {db_path} not found.")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    sql_file = 'hostinger_import.sql'
    with open(sql_file, 'w', encoding='utf-8') as f:
        f.write("-- Giggs Labs Data Migration Script\n")
        f.write("SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';\n")
        f.write("SET time_zone = '+00:00';\n\n")

        # Map Django tables to our new MySQL names
        table_map = {
            'api_post': 'posts',
            'api_service': 'services',
            'api_jobopening': 'job_openings',
            'api_contactmessage': 'contact_messages',
            'api_jobapplication': 'job_applications'
        }

        for django_table, mysql_table in table_map.items():
            f.write(f"-- Data for {mysql_table}\n")
            try:
                cursor.execute(f"SELECT * FROM {django_table}")
                rows = cursor.fetchall()
                if not rows:
                    continue

                # Get column names
                cursor.execute(f"PRAGMA table_info({django_table})")
                cols = [col[1] for col in cursor.fetchall()]
                
                # Filter for columns that exist in our new schema
                # (Simple approach: we'll just write the INSERT statement)
                col_names = ", ".join([f"`{c}`" for c in cols])
                
                for row in rows:
                    vals = []
                    for val in row:
                        if val is None:
                            vals.append('NULL')
                        elif isinstance(val, str):
                            processed_val = val.replace("'", "''")
                            vals.append(f"'{processed_val}'")
                        elif isinstance(val, bool):
                            vals.append('1' if val else '0')
                        else:
                            vals.append(str(val))
                    
                    f.write(f"INSERT INTO {mysql_table} ({col_names}) VALUES ({', '.join(vals)});\n")
                f.write("\n")
            except Exception as e:
                print(f"Skipping {django_table}: {e}")

    print(f"Successfully generated {sql_file}")
    conn.close()

if __name__ == '__main__':
    export_to_sql()
