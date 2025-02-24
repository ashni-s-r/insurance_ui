**# Ash Insurance Table**

**## Overview**
Ash Insurance Table is a React-based application that displays a list of insurance plans with features like search, sorting, pagination, and advanced filtering using Material UI. It fetches data from a backend API and provides a user-friendly interface to interact with insurance data.

**## Features**
- 🔍 **Search Functionality** - Search insurance plans by name, type, premium, or coverage.
- 📊 **Sorting & Pagination** - Sort data in ascending/descending order and navigate with pagination.
- 🎛 **Column-wise Filtering** - Apply multiple filters per column for refined data viewing.
- 🎨 **Modern UI** - Styled using Material UI for a sleek and responsive design.
- ⚡ **Axios API Calls** - Fetch insurance data from a backend server.

**## Installation**
```bash
# Clone the repository
git clone <repository_url>

# Navigate to the project directory
cd ash-insurance-table

# Install dependencies
npm install
```

**## Environment Variables**
Create a `.env` file in the root directory and add:
```env
REACT_APP_INSURANCE_API_URL=<http://your-backend-url>
```

**## Usage**
```bash
# Start the development server
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

**## API Endpoints**
| Method | Endpoint                 | Description            |
|--------|--------------------------|------------------------|
| GET    | `/getallinsurance/`      | Fetch all insurance plans |

**## Technologies Used**
- ReactJS ⚛️
- Material UI 🎨
- Axios 🔗

**## Contributing**
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

**## License**
This project is licensed under the MIT License.

