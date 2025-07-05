# BookWise

BookWise is a modern personal library management app that lets users organize, review, and explore their book collection with ease.

**Tech Stack:** Node.js, Express, Handlebars, Sequelize, SQLite, Tailwind CSS v3

---

## Features

- Card-based dashboard for books and categories
- Database models and associations for users, books, and categories
- Seeders for demo users, books, and categories
- Modern, scalable backend structure
- Secure user authentication (signup & login)
- **Email verification with token expiry and resend functionality**
- Responsive dashboard and profile pages
- Search and filter books by title, author, or category
- Sliding session expiration (users stay logged in while active)
- **Session expiration handling:** users are redirected to the landing page with a session expired message and the login modal opens automatically
- Logout route to securely end user sessions

---

## Contributing

> **Note:** All commits are now GPG signed and verified. Earlier commits were unsigned due to initial setup, but this has been rectified for transparency and authenticity.
---

**Planned:**

- Category management (add, edit, delete)
- In-app reading (EPUB, PDF, plain text/HTML)
- Book cover uploads
- User profile page and preferences
- Sticky notes and highlights for digital books
- Public profiles and book lists
- Responsive design enhancements
- Advanced search and filtering

---

### Email Verification

- Users must verify their email address after signup.
- Verification emails are sent using Resend SMTP.
- Tokens expire after 24 hours; users can request a new verification email if needed.
- Only verified users can log in.
- **After successful email verification, users are redirected to the landing page, the login modal opens automatically, and a success message is displayed.**

---

### Session Expiration & Logout

- Sessions use sliding expiration: users stay logged in as long as they are active.
- If a session expires due to inactivity, the user is redirected to the landing page, sees a "Your session has expired! Please, login again." message, and the login modal opens automatically.
- Users can log out at any time via the logout route, which destroys the session and redirects to the landing page.

---

**Progress:**

- [x] Generate and store verification tokens on signup
- [x] Send verification email using Resend SMTP
- [x] Create a “Check your email” page after signup
- [x] Add /auth/verify-email route and controller logic
- [x] Redirect to landing page with login modal open and success message after email verification
- [x] Update login logic to require verified email
- [x] Implement sliding session expiration and session expired modal flow

---

## Quick Start

```bash
git clone https://github.com/joesalaz/bookwise.git
cd bookwise
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all   # optional
npx tailwindcss -i ./public/stylesheets/tailwind.css -o ./public/stylesheets/output.css --watch
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

bookwise/
|-- public/
|   |-- classes/               # Reusable JS classes (ModalManager, Toggle)
|   |-- images/                # Static images for the app (planned)
|   |-- javascripts/           # Client-side JavaScript files
|   |-- stylesheets/           # Tailwind source and output CSS
|   |-- uploads/               # Book cover images (planned)
|-- server/
|   |-- app.js                 # Main Express app
|   |-- bin/
|   |   \-- www                # App entry point
|   |-- classes/               # Custom JS classes for OOP code
|   |-- config/
|   |   \-- config.json        # Database configuration
|   |-- controllers/
|   |   \-- authController.js  # Auth logic and email verification
|   |-- middleware/            # Custom Express middleware
|   |   |-- auth.js
|   |   \-- session.js
|   |-- migrations/            # Sequelize migration files
|   |-- models/                # Sequelize models (User, Book, Category, etc.)
|   |-- routes/                # Express route files
|   |   |-- auth.js
|   |   |-- book.js
|   |   |-- books.js
|   |   |-- dashboard.js
|   |   |-- index.js
|   |   \-- users.js
|   |-- seeders/               # Sequelize seed files
|   |-- test-smtp.js           # SMTP test script for email
|   \-- views/
|       |-- book.hbs
|       |-- books.hbs
|       |-- check-email.hbs
|       |-- dashboard.hbs
|       |-- error.hbs
|       |-- landing.hbs
|       |-- layouts/
|       |   \-- layout.hbs
|       \-- partials/
|           |-- modals/
|           |   |-- aboutModal.hbs
|           |   |-- authModal.hbs
|           |   \-- contactModal.hbs
|           \-- structure/
|               |-- footer-dashboard.hbs
|               |-- footer-landing.hbs
|               |-- header-dashboard.hbs
|               \-- header-landing.hbs
|-- .env.example               # Example environment variables file
|-- .gitignore                 # Node, DB, and other ignores
|-- generate-tree.js           # Script to generate this tree
|-- LICENSE                    # MIT opensource license
|-- package-lock.json
|-- package.json
|-- README.md                  # Main documentation  
|-- tailwind.config.js         # Tailwind CSS configuration
|-- .sequelizerc               # Sequelize config
\-- gpg-test.txt               # GPG test file

---
For details on layouts and modals, see [Project Structure Update](../../wiki/Project-Structure-Update).  
Return to the [Wiki Home](../../wiki).

---

## 📚 Full Documentation

See the [BookWise Wiki](https://github.com/joesalaz/bookwise/wiki) for:

- Setup & Installation
- Environment Variables
- Project Structure
- Usage Guide
- Email Verification Flow
- **Session Expiration & Modal Flow**
- Troubleshooting
- Contribution Guide
- Roadmap
- And more!

---

## Links

- [Issue Tracker](https://github.com/joesalaz/bookwise/issues)
- [Project Board](https://github.com/joesalaz/bookwise/projects)
- [MIT License](./LICENSE)

---

## License

This project is open source under the [MIT License](./LICENSE).

**Key changes:**

- Added “Session expiration handling” to the Features list.
- Updated the Email Verification section to reflect the new redirect/modal flow.
- Added a new “Session Expiration & Logout” section.
- Updated the Progress checklist.
- Added “Session Expiration & Modal Flow” to the Wiki documentation list.