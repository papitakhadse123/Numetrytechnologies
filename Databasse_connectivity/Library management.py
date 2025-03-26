import tkinter as tk
from tkinter import messagebox, ttk
import mysql.connector

# Database Connection
def connect_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",  # Change if needed
        password="root",  # Add your MySQL password
        database="library"
    )

# Function to Add a New Book
def add_book():
    title = title_entry.get()
    author_id = author_id_entry.get()
    genre = genre_entry.get()
    published_year = year_entry.get()
    copies = copies_entry.get()
    
    if not (title and author_id and genre and published_year and copies):
        messagebox.showerror("Error", "All fields are required!")
        return
    
    try:
        conn = connect_db()
        cursor = conn.cursor()
        query = "INSERT INTO Books (title, author_id, genre, published_year, available_copies) VALUES (%s, %s, %s, %s, %s)"
        values = (title, author_id, genre, published_year, copies)
        cursor.execute(query, values)
        conn.commit()
        messagebox.showinfo("Success", "Book added successfully!")
        conn.close()
    except mysql.connector.Error as err:
        messagebox.showerror("Database Error", f"Error: {err}")

# Function to Issue a Book
def issue_book():
    book_id = book_id_entry.get()
    member_id = member_id_entry.get()
    
    if not (book_id and member_id):
        messagebox.showerror("Error", "Book ID and Member ID are required!")
        return
    
    try:
        conn = connect_db()
        cursor = conn.cursor()
        query = "INSERT INTO Borrowed_Books (book_id, member_id) VALUES (%s, %s)"
        values = (book_id, member_id)
        cursor.execute(query, values)
        conn.commit()
        messagebox.showinfo("Success", "Book issued successfully!")
        conn.close()
    except mysql.connector.Error as err:
        messagebox.showerror("Database Error", f"Error: {err}")

# Function to Return a Book
def return_book():
    book_id = return_book_id_entry.get()
    member_id = return_member_id_entry.get()
    
    if not (book_id and member_id):
        messagebox.showerror("Error", "Book ID and Member ID are required!")
        return
    
    try:
        conn = connect_db()
        cursor = conn.cursor()
        query = "UPDATE Borrowed_Books SET return_date = CURDATE() WHERE book_id = %s AND member_id = %s AND return_date IS NULL"
        values = (book_id, member_id)
        cursor.execute(query, values)
        conn.commit()
        messagebox.showinfo("Success", "Book returned successfully!")
        conn.close()
    except mysql.connector.Error as err:
        messagebox.showerror("Database Error", f"Error: {err}")

# GUI Setup
root = tk.Tk()
root.title("Library Management System")
root.geometry("500x700")
root.configure(bg="#e6f7ff")

style = ttk.Style()
style.configure("TButton", font=("Arial", 12), padding=5)
style.configure("TLabel", font=("Arial", 12), background="#e6f7ff")

frame = tk.Frame(root, padx=20, pady=20, bg="#e6f7ff")
frame.pack(pady=10)

# Create LabelFrame for Add Book Section
book_frame = ttk.LabelFrame(frame, text="Add Book", padding=10)
book_frame.pack(fill="x", padx=10, pady=10)

title_entry = ttk.Entry(book_frame, font=("Arial", 12))
author_id_entry = ttk.Entry(book_frame, font=("Arial", 12))
genre_entry = ttk.Entry(book_frame, font=("Arial", 12))
year_entry = ttk.Entry(book_frame, font=("Arial", 12))
copies_entry = ttk.Entry(book_frame, font=("Arial", 12))

for label, entry in [("Title", title_entry), ("Author ID", author_id_entry), ("Genre", genre_entry),
                      ("Published Year", year_entry), ("Available Copies", copies_entry)]:
    ttk.Label(book_frame, text=label).pack(anchor="w", pady=2)
    entry.pack(fill="x", pady=5)

ttk.Button(book_frame, text="Add Book", command=add_book).pack(pady=10)

# Create LabelFrame for Issue Book Section
issue_frame = ttk.LabelFrame(frame, text="Issue Book", padding=10)
issue_frame.pack(fill="x", padx=10, pady=10)

book_id_entry = ttk.Entry(issue_frame, font=("Arial", 12))
member_id_entry = ttk.Entry(issue_frame, font=("Arial", 12))

for label, entry in [("Book ID", book_id_entry), ("Member ID", member_id_entry)]:
    ttk.Label(issue_frame, text=label).pack(anchor="w", pady=2)
    entry.pack(fill="x", pady=5)

ttk.Button(issue_frame, text="Issue Book", command=issue_book).pack(pady=10)

# Create LabelFrame for Return Book Section
return_frame = ttk.LabelFrame(frame, text="Return Book", padding=10)
return_frame.pack(fill="x", padx=10, pady=10)

return_book_id_entry = ttk.Entry(return_frame, font=("Arial", 12))
return_member_id_entry = ttk.Entry(return_frame, font=("Arial", 12))

for label, entry in [("Book ID", return_book_id_entry), ("Member ID", return_member_id_entry)]:
    ttk.Label(return_frame, text=label).pack(anchor="w", pady=2)
    entry.pack(fill="x", pady=5)

ttk.Button(return_frame, text="Return Book", command=return_book).pack(pady=10)

root.mainloop()
