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

- Only authenticated users can submit news articles (via Profile page)
- Article details: title, body, category (submission date can be automatic)
- Articles automatically tagged with submitter (logged-in user) information

---

#### Motivation section:

_? why I chose this full-stack implementation option_

- I choose this implemention option because the first option of building my own API took me on too many sidequests. So many new things to learn took me through too many rabbitholes of new languages and technologies I want to learn and I realized I needed more time to get the API done. Supabase is a really good option for building a fullstack site faster with javascript methods that I'm familiar with.

_? How was developing it?_
_? What did I like / didn't like about the process?_
_? What did I find difficult_
Developing this got me thinking about other projects I want to build. I liked beeing able to be incharge of the whole process myself, setting up the database in supabase, making sure the policies were what I wanted and the columns were correct. I liked starting the option 1 and dabbling with typescript - looking forward to work more with typescript in the future. I found it difficult to finalize the option 1, so I liked how quickly it were possible to get something visual to work with by using supabase.

I liked giving React a go, never done that before. Figuring out how to put a website/app together with multiple pages and React took some time. With only one HTML page and then working with components and different dependencies to make it functional. I also found it hard getting one feature done before moving on to other parts of the project. Focusing on one thing at a time is a challenge I'm dealing with and that is a part of my building process that I do not like.

_? Benefits of developing custom API vs using SaaS like Supabase_
The benefits of using a custom API instead of a SaaS like supabase is the posibility of building more complex systems that fits your goal. Building from scratch and up makes it possible to integrate it to external services, to call multiple API's, setup multistep processes with conditions for complex workflows, performance requirements for caching, background jobs and queue management as needed.

One could build custom algorithms unique to your project with the rules and settings of your choosing. With custom API one could for example ensure that your project follows and comply with a certain set of rules that might be specific to your country or area like the GDPR, or other compliances that are needed/wanted for that project regarding data transformation, audit requirements, encryption or
complex workflows unique to that one project.

---
