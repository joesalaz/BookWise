# BookWise

BookWise is a web application for managing your personal book collection.  
Built with Node.js, Express, Handlebars, Sequelize, SQLite, and Tailwind CSS.

## Status

This project is in the initial setup phase.  
Core functionality will be added soon.  
Currently, the dashboard and book listing use **static sample data** on the front end.

## Features

- Responsive dashboard layout with collapsible sidebar (Tailwind CSS)
- Book listing page with **static sample data** (not yet connected to the database)
- Project structure ready for future features (user authentication, book management, etc.)

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

3. **Run database migrations (if any)**
   ```bash
   npx sequelize-cli db:migrate
   ```

4. **Build Tailwind CSS (in a separate terminal)**
   ```bash
   npx tailwindcss -i ./public/stylesheets/style.css -o ./public/stylesheets/output.css --watch
   ```

5. **Start the app**
   ```bash
   npm start
   ```
   or, for automatic restarts during development (recommended):
   ```bash
   npx nodemon
   ```

## Notes

- The book list currently displays static sample data on the front end. Dynamic book management and database integration will be added in future updates.
- Do **not** commit `books.sqlite` or other database files; use migrations to share structure.
- For more details on Tailwind CSS, see [Tailwind Documentation](https://tailwindcss.com/docs/).