# Development Platforms

_-"NewsFlow" a news platform built with supabase, Vite, Tailwind 4 and React._

---

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- A supabase account

### Steps

1. **Clone the repository:**

```sh
git clone <repo-url>
cd <your-project-folder>
```

2. **Install dependencies:**

```sh
npm install
```

3. **Set up environment variables:**

- Create a `.env` file in the root directory
- Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start the development server:**

```sh
npm run dev
```

- the application will be available at `http://localhost:5173`

5. **(Optional) Buil for production:**

```sh
npm run build
```

### Development

The project uses the following tools:

- **Vite** - Fast build tool and dev server
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service (Authentuication & Database)
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for commit linting

To format code:

```sh
npm run format
```

To lint code:

```sh
npm run lint
```

---

##### Core Functionality

###### Public Access:

- Anyone can view the list of news articles
- Articles display title, body, category, and submission date

###### User Authentication:

- User registration with email and password
- User login

###### Article Management:

- Only authenticated users can submit news articles
- Article details: title, body, category (submission date can be automatic)
- Articles automatically tagged with submitter (logged-in user) information

---

// #### Motivation section:
// - why I chose this full-stack implementation option
// - how was developing it?
// - what did I like / didn't like about the process=
// - what did I find difficult?
// - Benefits of developing custom API vs using SaaS like Supabase
//

---
