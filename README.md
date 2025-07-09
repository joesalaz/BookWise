# BookWise

BookWise is a modern personal library management app that lets users organize, review, and explore their book collection with ease.

**Tech Stack:** Node.js, Express, Handlebars, Sequelize, SQLite, Tailwind CSS v3

---

## Features

- Card- Added "Session Expiration & Modal Flow" to the Wiki documentation list.based dashboard for books and categories
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

## Dropdown System

BookWise includes a simple dropdown system for navigation menus:

### Basic Usage

```javascript
// Create a dropdown
const dropdown = new Dropdown('buttonId', 'menuId');

// For mobile menus with custom animations
const mobileDropdown = DropdownUtils.createCustomDropdown(
    'menuBtn', 
    'mobileNav',
    ['opacity-100', 'visible', 'max-h-96'],
    ['opacity-0', 'invisible', 'max-h-0']
);
```

### Files

- `public/classes/Dropdown.js` - Main dropdown class
- `public/classes/DropdownUtils.js` - Helper utilities
- `public/javascripts/dropdown-manager.js` - Manages all dropdowns

---

## Migration Safety Scripts

BookWise includes smart migration scripts to prevent data loss during deployment:

### Available Migration Commands

```bash
# Basic Sequelize commands
npm run migrate               # Run all pending migrations (default)
npm run migrate:status        # Check migration status

# Safe migration commands
npm run migrate:safe          # Check status then run migrations
npm run migrate:smart         # Smart migration with pending check
npm run migrate:advanced      # Advanced migration with backup support
```

### Migration Scripts

- **`smart-migrate.js`** - Checks for pending migrations before running
- **`advanced-migrate.js`** - Comprehensive safety with backup support  
- **`migrate-safely.sh`** - Shell script wrapper for safe migrations

### Production Safety

These scripts prevent accidental data loss by:

- Only running pending migrations (not all migrations)
- Providing detailed logging of what's being executed
- Offering backup support (advanced script)
- Avoiding re-running already applied migrations

**Recommended for production deployments:** Use `npm run migrate:smart` instead of `npm run migrate` to ensure safe database updates.

---

## Demo

[View the live demo](https://bookwise-whus.onrender.com/)

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

## Production Considerations

BookWise works great out of the box for development and small-scale deployments. If you're planning to use this in a production environment with multiple users or want to scale it up, here are some things you'll want to address:

### Session Storage

The app currently uses Express's default in-memory session store. While this works fine for development, it has some limitations in production:

- Sessions don't persist across server restarts
- Memory usage grows over time without cleanup
- Can't scale across multiple server instances

For production use, consider switching to:

- **Redis** - Fast and reliable, great for high-traffic apps
- **Database sessions** - Store sessions in your existing database
- **MongoDB sessions** - If you prefer document-based storage

You might notice a warning about this in your deployment logs - that's normal and expected.

### Database

The default SQLite setup is perfect for getting started, but for production you might want to consider PostgreSQL or MySQL for better performance with concurrent users.

### Other Considerations

- Set up proper environment variables for production
- Configure HTTPS and security headers
- Add rate limiting and request validation
- Set up logging and monitoring

These aren't urgent for getting started, but they become important as your the application grows.

---

## Project Structure

```text
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
```

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
- Added “Session Expiration & Modal Flow” to the Wiki documentation list. 
 