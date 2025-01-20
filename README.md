## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.prasoonsengar.site/)

[![Live Demo](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.smartdocsai.site/)

# Smartdocsai

- **React** for building the user interface.
- **React Router DOM** for routing between different views.
- **Tailwind CSS** for styling and responsive layouts.
- **React Joyride** for guided tours of the application.
- **React PDF Viewer** for displaying and interacting with PDF files.
- **Auth0 for authentication** to provide secure login and registration.
- **Cloudinary** for storing and managing uploaded PDFs.
- **Node.js backend** for saving user information and managing general data.
- **FastAPI and LangChain** for querying solutions and processing the data on the backend.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: For navigating between different components/views without reloading the page.
- **Tailwind CSS**: A utility-first CSS framework to quickly build custom designs.
- **React Joyride**: A library to provide interactive guided tours of your application.
- **React PDF Viewer**: For rendering PDF files directly within the app.
- **Auth0**: For handling authentication and user management.

### Backend

- **Node.js**: Handles saving user information and other data.
- **FastAPI**: A modern web framework for building APIs with Python, used for querying solutions.
- **LangChain**: Used to process queries and provide the requested solutions from the backend.

### Backend

- **Node.js**: Handles saving user information and other data.
- **FastAPI**: A modern web framework for building APIs with Python, used for querying solutions.
- **LangChain**: Used to process queries and provide the requested solutions from the backend.

## How It Works

### User Authentication

- Users are authenticated using **Auth0**. Upon successful login or signup, the user's session is managed and their credentials are stored securely.

### PDF Upload and Storage

- Users can upload their PDFs through the frontend interface.
- The PDF files are stored in **Cloudinary**, a cloud service for managing media files, including images and PDFs.

### Data Flow

1. **Frontend**: Users interact with the React-based frontend, where they can upload PDFs, view them, and perform actions like queries.
2. **Backend (Node.js)**: User information is sent to the Node.js backend, where it is saved in a database.
3. **Cloudinary**: The uploaded PDFs are saved to Cloudinary for secure cloud storage.
4. **Backend (FastAPI & LangChain)**: FastAPI and LangChain process the user's queries by querying the stored PDFs and providing the results back to the frontend.

## Setup Instructions

### Prerequisites

- Node.js installed
- FastAPI and LangChain installed for backend processing

### Frontend Setup

1. Clone the repository:

```bash
git clone https://github.com/Prasoon321/smartdocsai.git



## Installation

Clone the repository:
git clone https://github.com/Prasoon321/smartdocsai.git
npm i




```
