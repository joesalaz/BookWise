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

**Planned:**
- Category management (add, edit, delete)
- In-app reading (EPUB, PDF, plain text/HTML)
- Book cover uploads
- User authentication (signup, login, sessions)
- User profile page and preferences
- Sticky notes and highlights for digital books
- Public profiles and book lists
- Responsive design enhancements
- Advanced search and filtering

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


