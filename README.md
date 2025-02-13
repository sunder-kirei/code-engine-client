# Code Engine Client 🚀

> A modern web-based IDE built with **Next.js (App Directory)**, **Auth.js**, **Prisma**, **Redux**, **TailwindCSS**, **BlockNote**, and **React Monaco Editor**. Cloudinary is used for file uploads, with support for adding posters to notes.

## ✨ Features

- **Authentication**: Powered by **Auth.js** for secure user login and session management.
- **Database Integration**: **Prisma** provides a seamless connection to your database.
- **Rich Text Editor**: **BlockNote** for writing and editing notes with poster support.
- **Code Editing**: **React Monaco Editor** for a full-fledged coding experience inside the browser.
- **State Management**: **Redux** for handling global application state.
- **Responsive UI**: Styled using **TailwindCSS** for a clean and modern interface.
- **Cloudinary Integration**: Effortless file upload and poster management for notes.

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Directory), TailwindCSS
- **State Management**: Redux
- **Database**: Prisma
- **Authentication**: Auth.js
- **Code Editor**: React Monaco Editor
- **Note Editor**: BlockNote
- **File Upload**: Cloudinary

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14 or later
- **PostgreSQL** or any database supported by Prisma
- **Cloudinary Account** for managing media uploads

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sunder-kirei/code-engine-client.git
   cd code-engine-client
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file and add the required variables. The expected environment variables can be found in `environment.d.ts`:

   ```
   DATABASE_URL=your_database_url
   CLOUDINARY_URL=your_cloudinary_url
   NEXTAUTH_SECRET=your_auth_secret
   ```

4. **Run Database Migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

```plaintext
.
├── app         # Next.js (App Directory) pages and API routes
├── components  # Reusable React components
├── prisma      # Prisma schema and migrations
├── public      # Static files
├── redux       # Redux store and slices
└── utils       # Utility functions and helpers
```

## 📦 Deployment

This project can be deployed on any platform that supports Next.js (Vercel, AWS, etc.).

### Deploy on Vercel

1. Connect your repository to Vercel.
2. Set the environment variables in the Vercel dashboard.
3. Deploy!

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/sunder-kirei/code-engine-client/issues).

## 📧 Contact

Sunder Kumar – [LinkedIn](https://www.linkedin.com/in/sunder-kirei/) – sunder-kirei@outlook.com
