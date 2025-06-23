# BookWise

BookWise is a modern personal library management app that lets users organize, review, and explore their book collection with ease.  
The current version features a card-based dashboard and a robust backend structure with seeded demo data for users, books, and categories.  
Built with Node.js, Express, Handlebars, Sequelize, SQLite, and Tailwind CSS v3.  
Features like category management, in-app reading, book cover uploads, and user authentication are planned.

---

## Features

- Card-based dashboard displaying demo books and categories (seeded data)
- Modern project structure with scalable backend (Node.js, Express, Sequelize, Handlebars, Tailwind CSS)
- Database models and associations for users, books, and categories
- Seeders for demo users, books, and categories

---

## Project Board and Issue Tracker

### To Do (Most Important for Demo State)
- [ ] **User Authentication (Signup & Login)**
  - Implement signup and login pages/modals
  - Hash password and manage user sessions or use JWT tokens
- [ ] **Book CRUD (Add, Edit, Delete Books)**
  - Create forms/modals for adding and editing books
  - Implement delete functionality
- [ ] **Category Management**
  - Add, edit, and delete categories
  - Assign books to categories
- [ ] **Book List & Dashboard**
  - Display user’s books in a card-based dashboard view
  - Filter and search books by title, author, or category
- [ ] **Book Cover Upload**
  - Allow users to upload or link to book cover images
- [ ] **User Profile Page**
  - View and edit user details and preferences
- [ ] **Basic In-App Reading**
  - Integrate EPUB.js and PDF.js for reading EPUB and PDF files in-app
  - Render plain text/HTML books in a reading view

### Backlog (Less Critical for Initial Demo)
- [ ] **Sticky Notes & Highlights**
  - Add sticky notes or highlights to digital books while reading
- [ ] **Public Profiles (Optional)**
  - Allow users to view other users’ profiles and book lists
- [ ] **Add Book Modal**
  - Add new books via a modal form without leaving the dashboard
- [ ] **Responsive Design Enhancements**
  - Polish mobile and tablet layouts
- [ ] **Advanced Search & Filtering**
  - Add more granular search and filter options
- [ ] **Dashboard Stats**
  - Show stats (total books, categories, reading progress, etc.)
- [ ] **Admin Features (Optional)**
  - Admin dashboard for managing users and content

> **NOTE:** TO DO and Backlog will be updated as project progresses.

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your database**
   - Configure your database in `config/config.json` (default is SQLite).
   - Run migrations:
     ```bash
     npx sequelize-cli db:migrate
     ```

4. **(Optional) Seed the database with demo data**
   ```bash
   npx sequelize-cli db:seed:all
   ```

5. **Build Tailwind CSS v3**
   ```bash
   npx tailwindcss -i ./public/stylesheets/tailwind.css -o ./public/stylesheets/output.css --watch
   ```

6. **Run the app**
   ```bash
   npm start
   ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
bookwise/
|-- classes/               # Custom JS classes for OOP code
|-- config/                # Database configuration
|-- docs/                  # Project documentation
|-- migrations/            # Sequelize migration files
|-- models/                # Sequelize models (User, Book, Category, etc.)
|-- public/
|   |-- styles/            # Tailwind source and output CSS
|   |-- uploads/           # Book cover images
|   |-- javascripts/       # Client-side JavaScript files
|   |-- images/            # Static images for the app
|-- routes/                # Express route files
|-- seeders/               # Sequelize seed files
|-- views/
|   |-- layouts/           # Layout partials (e.g., header.hbs, footer.hbs)
|   |-- partials/
|   |   |-- modals/        # Modal partials (e.g., authModal.hbs, aboutModal.hbs)
|   |   |-- ...            # Other partials (navbar.hbs, etc.)
|   |-- dashboard.hbs      # Dashboard main view
|   |-- landing.hbs        # Landing page main view
|   |-- ...                # Other main views
|-- package.json
|-- README.md              # Main documentation  
|-- tailwind.config.js     # Tailwind CSS configuration
```

---

## Development Standards

- All layout partials are in `views/layouts/`.
- Modal partials are in `views/partials/modals/`.
- Data is currently seeded; user input forms are planned.
- Do **not** commit SQLite database files; use migrations and seeders for structure and sample data.

---

## Contribution

- Use feature branches for new features or bug fixes.
- Write clear commit messages and keep code well-commented.
- Track features and bugs using GitHub Issues and the Project Board.

---

## Documentation

See the full documentation: [documentation.html](https://joesalaz.github.io/BookWise/documentation.html)

---

## License

This project is open source under the MIT License.

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs/)
- [Sequelize Documentation](https://sequelize.org/master/)
- [Express Documentation](https://expressjs.com/)
```