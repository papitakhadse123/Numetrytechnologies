import tkinter as tk
from tkinter import messagebox, ttk
import mysql.connector

def connect_db():
    try:
        db = mysql.connector.connect(
            host="localhost",
            user="root",  
            password="root", 
            database="user_db"
        )
        return db
    except mysql.connector.Error as err:
        messagebox.showerror("Database Error", f"Error: {err}")
        return None

def register():
    db = connect_db()
    if not db:
        return

    cursor = db.cursor()
    try:
        sql = "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)"
        values = (name_entry.get(), email_entry.get(), password_entry.get(), role_entry.get())
        cursor.execute(sql, values)
        db.commit()
        messagebox.showinfo("Success", "User registered successfully!")
    except mysql.connector.Error as err:
        messagebox.showerror("Error", f"Error: {err}")
    finally:
        cursor.close()
        db.close()


def fetch_users():
    db = connect_db()
    if not db:
        return

    cursor = db.cursor()
    cursor.execute("SELECT id, name, email, role FROM users")
    users = cursor.fetchall()
    users_text.delete("1.0", tk.END)

    for user in users:
        users_text.insert(tk.END, f"ID: {user[0]}, Name: {user[1]}, Email: {user[2]}, Role: {user[3]}\n")

    cursor.close()
    db.close()

# Function to update user details
def update_user():
    db = connect_db()
    if not db:
        return

    user_id = user_id_entry.get().strip()
    name = name_entry.get().strip()
    email = email_entry.get().strip()
    role = role_entry.get().strip()

    if not user_id:
        messagebox.showerror("Error", "User ID is required for updating!")
        return

    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        if cursor.fetchone() is None:
            messagebox.showerror("Error", "User ID not found!")
            return

        sql = "UPDATE users SET name=%s, email=%s, role=%s WHERE id=%s"
        values = (name, email, role, user_id)
        cursor.execute(sql, values)
        db.commit()

        if cursor.rowcount > 0:
            messagebox.showinfo("Success", "User updated successfully!")
        else:
            messagebox.showwarning("Warning", "No changes were made.")

    except mysql.connector.Error as err:
        messagebox.showerror("Error", f"Database Error: {err}")
    finally:
        cursor.close()
        db.close()



def delete_user():
    db = connect_db()
    if not db:
        return

    user_id = user_id_entry.get().strip()

    if not user_id:
        messagebox.showerror("Error", "User ID is required for deleting!")
        return

    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        if cursor.fetchone() is None:
            messagebox.showerror("Error", "User ID not found!")
            return

        sql = "DELETE FROM users WHERE id=%s"
        cursor.execute(sql, (user_id,))
        db.commit()

        if cursor.rowcount > 0:
            messagebox.showinfo("Success", "User deleted successfully!")
        else:
            messagebox.showwarning("Warning", "No user deleted.")

    except mysql.connector.Error as err:
        messagebox.showerror("Error", f"Database Error: {err}")
    finally:
        cursor.close()
        db.close()



root = tk.Tk()
root.title("User Management System")
root.geometry("450x600")
root.configure(bg="#f0f0f0")

title_label = tk.Label(root, text="User Management", font=("Arial", 16, "bold"), bg="#f0f0f0")
title_label.pack(pady=10)

frame = tk.Frame(root, bg="#ffffff", padx=10, pady=10, relief=tk.RIDGE, borderwidth=2)
frame.pack(pady=10)

fields = ["User ID (for update/delete)", "Name", "Email", "Password", "Role"]
entries = {}

for field in fields:
    label = tk.Label(frame, text=field, font=("Arial", 12), bg="#ffffff")
    label.pack(anchor="w", pady=2)
    entry = ttk.Entry(frame, width=40, show="*" if field == "Password" else "")
    entry.pack(pady=2)
    entries[field] = entry

user_id_entry, name_entry, email_entry, password_entry, role_entry = entries.values()

button_frame = tk.Frame(root, bg="#f0f0f0")
button_frame.pack(pady=10)

ttk.Button(button_frame, text="Register", command=register).grid(row=0, column=0, padx=5, pady=5)
ttk.Button(button_frame, text="Fetch Users", command=fetch_users).grid(row=0, column=1, padx=5, pady=5)
ttk.Button(button_frame, text="Update User", command=update_user).grid(row=1, column=0, padx=5, pady=5)
ttk.Button(button_frame, text="Delete User", command=delete_user).grid(row=1, column=1, padx=5, pady=5)

users_text = tk.Text(root, height=10, width=50, font=("Arial", 10))
users_text.pack(pady=10)

root.mainloop()
