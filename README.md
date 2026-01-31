# Property Management System

A comprehensive web-based property management system designed to streamline the management of residents, rooms, utility bills, maintenance requests, and payments. Built with a modern tech stack ensuring performance and scalability.

## 🚀 Features

- **Dashboard**: Real-time overview of occupancy, revenue, and recent activities.
- **Room Management**: Track room status (vacant/occupied), types, and history.
- **Resident Management**: Manage tenant profiles, leases, and room assignments.
- **Billing & Payments**: Automated billing, utility calculations, and payment tracking.
- **Utility Management**: Monitor utility usage (water, electricity) with metered or flat rates.
- **Maintenance**: Track and assign maintenance requests with priority levels.
- **Reports**: Generate financial and operational reports.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Tailwind CSS, TanStack Query |
| **Backend** | NestJS 11, TypeScript, TypeORM |
| **Database** | SQLite (dev) / Compatible with PostgreSQL/MySQL |
| **Auth** | JWT (JSON Web Tokens) |

## 📂 Project Structure

```bash
property-management-fullstack/
├── server/             # NestJS Backend code
├── src/                # React Frontend code
├── public/             # Static assets
└── ...config files
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd property-management-fullstack
    ```

2.  **Setup Backend**
    ```bash
    cd server
    npm install
    # Start the server (Development)
    npm run start:dev
    ```

3.  **Setup Frontend**
    ```bash
    # Open a new terminal setup the root dependencies if needed, or go root
    cd ..
    npm install
    # Start the frontend (Development)
    npm run dev
    ```

## 🔐 Environment Variables

Create a `.env` file in the respective directories:

**Server (`server/.env`)**
```env
PORT=3000
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
DATABASE_PATH=./data/house.db
```

**Client (`.env`)**
```env
VITE_API_URL=http://localhost:3000/api
```

## 🔑 Default Credentials

For testing and initial access:
- **Email**: `mmillion728@gmail.com`
- **Password**: `Ti@!$%`

---

## 📚 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/register` | Register new admin user |
| GET | `/api/auth/me` | Get current user profile |

### Rooms
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | List all rooms |
| POST | `/api/rooms` | Create new room |
| GET | `/api/rooms/:id` | Get room details |

*(Refer to source code for full API documentation)*

## 💾 Database Schema

The system uses a relational database structure:

- **Users**: Admin/Landlord accounts.
- **Rooms**: Units with attributes like type, rent, and status.
- **Residents**: Tenants linked to rooms.
- **Utilities**: Types (water, power) and Readings.
- **Bills**: Generated invoices linking Residents, Rooms, and Utilities.
- **Payments**: Records of transactions against bills.
- **Maintenance**: Requests tracked by room/resident.

*(See `server/src/*/entities` for full schema definitions)*

## 📜 License

Internal Use - prototype for Ethio Telecom.
