# Library Management Server With Mongoose and Typescript
## Project Setup Instructions
1. Clone the project.
```
git clone https://github.com/Hafsa-Begum/library-management-server.git
cd library-management-server

```
2. Install dependencies. Recomended node version v22.11.0
```
npm install

```
3. Run locally (in dev mode)
```
npm run start:dev

```
## 📒 API Endpoints
1. Create Book
POST /api/books

2. Get All Books
GET /api/books

Supports filtering, and sorting.

Example Query:
/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

Query Parameters:
filter: Filter by genre
sort: asc or desc
limit: Number of results (default: 10)

3. Get Book by ID
GET /api/books/:bookId

4. Update Book
PUT /api/books/:bookId

5. Delete Book
DELETE /api/books/:bookId

6. Borrow a Book
POST /api/borrow

7. Borrowed Books Summary (Using Aggregation)
GET /api/borrow

Purpose:

Return a summary of borrowed books, including:

- Total borrowed quantity per book (totalQuantity)
- Book details: title and isbn