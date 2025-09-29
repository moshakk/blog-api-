# Blog API

A robust and scalable RESTful API for a blogging platform built with Node.js, Express, and MongoDB. This API provides complete authentication, authorization, and CRUD operations for posts and comments with advanced querying capabilities.

## **Project URL:** [roadmap.sh/projects/blogging-platform-api](https://roadmap.sh/projects/blogging-platform-api)

## Features

### Core Functionality

- **Complete Authentication System**

  - User registration with password hashing (bcrypt)
  - JWT-based authentication
  - Secure password reset via email
  - Token expiration and refresh mechanisms

- **Post Management**

  - Create, read, update, and delete blog posts
  - Tag-based categorization
  - Like system for posts
  - Author attribution

- **Comment System**

  - Add comments to posts
  - Nested routing (posts/:postId/comments)
  - Comment management with full CRUD operations

- **Advanced Query Features**
  - Filtering by multiple parameters
  - Sorting (ascending/descending)
  - Field limiting (select specific fields)
  - Pagination support
  - Complex queries with comparison operators (gte, lte, gt, lt)

### Security Features

- JWT token-based authentication
- Password encryption with bcryptjs
- Protected routes middleware
- HTTP-only cookies for token storage
- Password change detection
- Secure password reset flow

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint                          | Description               | Protected |
| ------ | --------------------------------- | ------------------------- | --------- |
| POST   | `/api/users/signup`               | Register new user         | No        |
| POST   | `/api/users/login`                | Login user                | No        |
| POST   | `/api/users/forgetpassword`       | Request password reset    | No        |
| PATCH  | `/api/users/resetpassword/:token` | Reset password with token | No        |

### Posts

| Method | Endpoint             | Description                  | Protected |
| ------ | -------------------- | ---------------------------- | --------- |
| GET    | `/api/posts`         | Get all posts (with filters) | Yes       |
| POST   | `/api/posts`         | Create new post              | Yes       |
| GET    | `/api/posts/:postId` | Get single post              | Yes       |
| PATCH  | `/api/posts/:postId` | Update post                  | Yes       |
| DELETE | `/api/posts/:postId` | Delete post                  | Yes       |

### Comments

| Method | Endpoint                                 | Description                 | Protected |
| ------ | ---------------------------------------- | --------------------------- | --------- |
| GET    | `/api/posts/:postId/comments`            | Get all comments for a post | Yes       |
| POST   | `/api/posts/:postId/comments`            | Add comment to post         | Yes       |
| GET    | `/api/posts/:postId/comments/:commentId` | Get single comment          | Yes       |
| DELETE | `/api/posts/:postId/comments/:commentId` | Delete comment              | Yes       |

---

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Email Service:** Nodemailer
- **Validation:** Validator.js
- **Development:** Nodemon, Morgan (HTTP logger)

## 🔐 Security Measures

1. **Password Security**

   - Passwords hashed with bcrypt (salt rounds: 12)
   - Password confirmation validation
   - Minimum password length enforcement

2. **JWT Security**

   - HTTP-only cookies
   - Token expiration
   - Password change invalidation

3. **Route Protection**

   - Middleware-based authentication
   - Token verification on protected routes

4. **Input Validation**
   - Email validation
   - Required field validation
   - Custom validators for password matching

---

## 🚦 Error Handling

The API implements comprehensive error handling:

- **Development Mode:** Detailed error information with stack traces
- **Production Mode:** User-friendly error messages
- **Operational Errors:** Custom error responses for known issues
- **Programming Errors:** Logged to console, generic message to user

---

## 🎯 Query Features Explained

### Filtering

Use MongoDB operators in URL:

- `gte` - Greater than or equal
- `lte` - Less than or equal
- `gt` - Greater than
- `lt` - Less than

Example: `?likes[gte]=10` translates to `{ likes: { $gte: 10 } }`

### Sorting

- Single field: `?sort=likes`
- Multiple fields: `?sort=likes,createdAt`
- Descending: `?sort=-likes`

### Field Limiting

Select only needed fields to reduce payload:

```bash
?fields=title,author,likes
```

### Pagination

```bash
?page=2&limit=10
```

- Default page: 1
- Default limit: 100

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Ahmed Khamis**
