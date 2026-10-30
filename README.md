# Company Directory

A React-based Company Directory application that displays company information in a searchable, sortable, and paginated table. The project uses Redux Toolkit for state management and a Node.js/Express backend to serve company data through a REST API.

## Features

- **Company Listing:** Displays company name, contact person, and country.
- **Search:** Filter companies by company name or contact person.
- **Sorting:** Sort company records by company name, contact person, and country in ascending or descending order.
- **Pagination:** Navigate through company records using numbered pagination.
- **Country Flags:** Displays country flags alongside country names.
- **API Integration:** Fetches company data from a backend API.
- **State Management:** Uses Redux Toolkit to manage application data, loading states, and errors.

## Tech Stack

### Frontend
- React
- Vite
- Redux Toolkit
- React Redux
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js
- CORS
- JSON

## Project Structure

```text
company-directory/
│
├── backend/
│   ├── server.js
│   └── data.json
│
├── src/
│   ├── components/
│   │   └── Table.jsx
│   │
│   ├── features/
│   │   └── companies/
│   │       └── companySlice.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── store.js
│   └── index.css
│
├── package.json
└── README.md
```

*Note: Adjust the folder structure above to match your actual project.*

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project

```bash
cd company-directory
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Backend Server

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Install backend dependencies if the backend has its own `package.json`:

```bash
npm install
```

Start the server:

```bash
node server.js
```

The backend API will run at:

```text
http://localhost:8080
```

### 5. Start the Frontend

Open another terminal in the frontend project directory and run:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## API Documentation

### GET `/api`

Fetches company records from the backend.

**Base URL:**

```text
http://localhost:8080/api
```

### Query Parameters

| Parameter | Description | Example |
|---|---|---|
| `filter` | Search by company name or contact | `filter=google` |
| `sortCol` | Column to sort | `sortCol=company` |
| `sortKey` | Sorting direction | `sortKey=asc` |
| `page` | Page number | `page=1` |
| `limit` | Number of records per page | `limit=10` |

### Example Request

```text
http://localhost:8080/api?filter=&sortCol=company&sortKey=asc&page=1&limit=10
```

### Example Response

```json
{
  "rows": [
    {
      "company": "Example Company",
      "contact": "John Smith",
      "country": "USA"
    }
  ],
  "total": 100
}
```

The `rows` property contains the records for the requested page, while `total` represents the total number of matching records before pagination.

## Application Workflow

1. The React frontend loads the application.
2. Redux Toolkit dispatches an asynchronous request to the backend.
3. The backend reads company records from `data.json`.
4. The API applies search filtering and sorting.
5. The API returns only the records required for the requested page.
6. Redux stores the returned records in the application state.
7. React displays the records in the table.
8. When the user searches, sorts, or changes pages, a new API request is triggered.

## State Management

Redux Toolkit manages the company data and API request states.

The company slice handles:

- `pending`: Indicates that an API request is in progress.
- `fulfilled`: Stores the successfully fetched company records.
- `rejected`: Stores an error if the API request fails.

## Future Improvements

- Add responsive table layouts for mobile devices.
- Add column-specific filtering.
- Improve loading and error states.
- Add unit and integration tests.
- Add backend validation and improved error handling.

## License

This project is intended for learning and development purposes.
