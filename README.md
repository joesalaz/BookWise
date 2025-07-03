```markdown

```markdown
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

---

**Progress:**
- [x] Generate and store verification tokens on signup
- [x] Send verification email using Resend SMTP
- [x] Create a “Check your email” page after signup
- [x] Add /auth/verify-email route and controller logic
- [ ] Create login page with success message after verification
- [ ] Redirect to login page with "Email has been verified! You can now login" message
- [x] Update login logic to require verified email
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

## 📚 Full Documentation

See the [BookWise Wiki](https://github.com/joesalaz/bookwise/wiki) for:

- Setup & Installation
- Environment Variables
- Project Structure
- Usage Guide
- Email Verification Flow
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

```
**Key changes:**
- Added “Secure user authentication (signup & login)” and “Email verification with token expiry and resend functionality” to the Features list.
- Added a new “Email Verification” section with a summary of the flow.
- Added “Email Verification Flow” to the Wiki documentation list.
- Kept the rest of your README structure and content intact for coherence.



