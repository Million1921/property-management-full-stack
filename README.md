# House Management System - Product Requirements Document (PRD)

## Overview

A web-based house/property management system for managing residents, rooms, utility bills, maintenance requests, and payments. Built with React (Vite) frontend and NestJS backend using SQLite database.

## Tech Stack

| Layer      | Technology                |
|------------|---------------------------|
| Frontend   | React 19 + Vite + Tailwind CSS |
| Backend    | NestJS 11 + TypeScript    |
| Database   | SQLite (via TypeORM)      |
| Auth       | JWT (JSON Web Tokens)     |

## Database Schema

### Tables

--sql
-- Users (Admin/Landlord accounts)
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Rooms/Units
CREATE TABLE rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_number TEXT UNIQUE NOT NULL,
    floor INTEGER,
    room_type TEXT, -- 'single', 'double', 'studio', 'suite'
    base_rent REAL NOT NULL,
    status TEXT DEFAULT 'vacant', -- 'vacant', 'occupied', 'maintenance'
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Residents/Tenants
CREATE TABLE residents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id INTEGER,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    id_number TEXT, -- National ID or Passport
    move_in_date DATE,
    move_out_date DATE,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    status TEXT DEFAULT 'active', -- 'active', 'inactive', 'pending'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- Utility Types
CREATE TABLE utility_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL, -- 'electricity', 'water', 'internet', 'gas'
    unit TEXT, -- 'kWh', 'm3', 'flat', 'cubic_ft'
    rate_per_unit REAL,
    is_metered INTEGER DEFAULT 1, -- 1=metered, 0=flat rate
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Utility Readings (for metered utilities)
CREATE TABLE utility_readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id INTEGER NOT NULL,
    utility_type_id INTEGER NOT NULL,
    previous_reading REAL,
    current_reading REAL NOT NULL,
    reading_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (utility_type_id) REFERENCES utility_types(id)
);

-- Bills/Invoices
CREATE TABLE bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    resident_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    bill_date DATE NOT NULL,
    due_date DATE NOT NULL,
    rent_amount REAL NOT NULL,
    utility_amount REAL DEFAULT 0,
    other_charges REAL DEFAULT 0,
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'partial', 'overdue'
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resident_id) REFERENCES residents(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- Bill Line Items (breakdown of charges)
CREATE TABLE bill_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bill_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    quantity REAL DEFAULT 1,
    unit_price REAL NOT NULL,
    total REAL NOT NULL,
    item_type TEXT, -- 'rent', 'electricity', 'water', 'internet', 'other'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_id) REFERENCES bills(id)
);

-- Payments
CREATE TABLE payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bill_id INTEGER NOT NULL,
    resident_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    payment_date DATE NOT NULL,
    payment_method TEXT, -- 'cash', 'bank_transfer', 'card', 'mobile'
    reference_number TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bill_id) REFERENCES bills(id),
    FOREIGN KEY (resident_id) REFERENCES residents(id)
);

-- Maintenance Requests
CREATE TABLE maintenance_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id INTEGER,
    resident_id INTEGER,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT, -- 'plumbing', 'electrical', 'appliance', 'structural', 'other'
    priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    status TEXT DEFAULT 'open', -- 'open', 'in_progress', 'completed', 'cancelled'
    assigned_to TEXT,
    estimated_cost REAL,
    actual_cost REAL,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (resident_id) REFERENCES residents(id)
);

-- Announcements
CREATE TABLE announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high'
    is_active INTEGER DEFAULT 1,
    publish_date DATE,
    expiry_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/register` | Register new admin user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user profile |

### Rooms
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | List all rooms |
| GET | `/api/rooms/:id` | Get room details |
| POST | `/api/rooms` | Create new room |
| PATCH | `/api/rooms/:id` | Update room |
| DELETE | `/api/rooms/:id` | Delete room |
| GET | `/api/rooms/:id/history` | Get room occupancy history |

### Residents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/residents` | List all residents |
| GET | `/api/residents/:id` | Get resident details |
| POST | `/api/residents` | Add new resident |
| PATCH | `/api/residents/:id` | Update resident |
| DELETE | `/api/residents/:id` | Remove resident |
| POST | `/api/residents/:id/assign-room` | Assign resident to room |
| POST | `/api/residents/:id/move-out` | Process move-out |

### Utilities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/utilities/types` | List utility types |
| POST | `/api/utilities/types` | Create utility type |
| PATCH | `/api/utilities/types/:id` | Update utility type |
| DELETE | `/api/utilities/types/:id` | Delete utility type |
| GET | `/api/utilities/readings` | List utility readings |
| POST | `/api/utilities/readings` | Record utility reading |
| GET | `/api/utilities/readings/room/:roomId` | Get readings by room |

### Bills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bills` | List all bills |
| GET | `/api/bills/:id` | Get bill details |
| POST | `/api/bills` | Create new bill |
| POST | `/api/bills/generate` | Auto-generate monthly bills |
| PATCH | `/api/bills/:id` | Update bill |
| DELETE | `/api/bills/:id` | Delete bill |
| GET | `/api/bills/resident/:residentId` | Get bills by resident |
| GET | `/api/bills/overdue` | List overdue bills |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payments` | List all payments |
| GET | `/api/payments/:id` | Get payment details |
| POST | `/api/payments` | Record payment |
| GET | `/api/payments/resident/:residentId` | Get payments by resident |
| GET | `/api/payments/report` | Payment summary report |

### Maintenance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/maintenance` | List all requests |
| GET | `/api/maintenance/:id` | Get request details |
| POST | `/api/maintenance` | Create new request |
| PATCH | `/api/maintenance/:id` | Update request |
| PATCH | `/api/maintenance/:id/status` | Update request status |
| DELETE | `/api/maintenance/:id` | Delete request |
| GET | `/api/maintenance/room/:roomId` | Get requests by room |

### Announcements
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/announcements` | List announcements |
| GET | `/api/announcements/:id` | Get announcement details |
| POST | `/api/announcements` | Create announcement |
| PATCH | `/api/announcements/:id` | Update announcement |
| DELETE | `/api/announcements/:id` | Delete announcement |

### Dashboard & Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get dashboard statistics |
| GET | `/api/reports/revenue` | Revenue report |
| GET | `/api/reports/occupancy` | Occupancy report |
| GET | `/api/reports/maintenance` | Maintenance summary |

---

## Frontend Pages & Components

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | User authentication |
| Dashboard | `/` | Overview with stats & charts |
| Rooms | `/rooms` | Room listing & management |
| Room Detail | `/rooms/:id` | Single room details |
| Residents | `/residents` | Resident listing |
| Resident Detail | `/residents/:id` | Single resident profile |
| Bills | `/bills` | Bill management |
| Bill Detail | `/bills/:id` | Invoice view/print |
| Payments | `/payments` | Payment records |
| Utilities | `/utilities` | Utility readings & rates |
| Maintenance | `/maintenance` | Maintenance requests |
| Announcements | `/announcements` | Announcement management |
| Reports | `/reports` | Financial & occupancy reports |
| Settings | `/settings` | App configuration |

### Core Components

```
src/components/
├── layout/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── Layout.jsx
├── common/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Select.jsx
│   ├── Modal.jsx
│   ├── Table.jsx
│   ├── Card.jsx
│   ├── Badge.jsx
│   ├── LoadingSpinner.jsx
│   ├── EmptyState.jsx
│   └── Pagination.jsx
├── dashboard/
│   ├── StatCard.jsx
│   ├── RevenueChart.jsx
│   ├── OccupancyChart.jsx
│   └── RecentActivity.jsx
├── rooms/
│   ├── RoomCard.jsx
│   ├── RoomList.jsx
│   ├── RoomForm.jsx
│   └── RoomStatusBadge.jsx
├── residents/
│   ├── ResidentCard.jsx
│   ├── ResidentList.jsx
│   ├── ResidentForm.jsx
│   └── AssignRoomModal.jsx
├── bills/
│   ├── BillList.jsx
│   ├── BillForm.jsx
│   ├── BillPreview.jsx
│   └── GenerateBillsModal.jsx
├── payments/
│   ├── PaymentList.jsx
│   ├── PaymentForm.jsx
│   └── PaymentReceipt.jsx
├── utilities/
│   ├── UtilityTypeList.jsx
│   ├── ReadingForm.jsx
│   └── ReadingHistory.jsx
├── maintenance/
│   ├── RequestList.jsx
│   ├── RequestForm.jsx
│   ├── RequestCard.jsx
│   └── StatusTimeline.jsx
└── announcements/
    ├── AnnouncementList.jsx
    ├── AnnouncementForm.jsx
    └── AnnouncementCard.jsx
```

---

## Features by Module

### 1. Dashboard
- [ ] Total rooms count (vacant/occupied)
- [ ] Active residents count
- [ ] Monthly revenue summary
- [ ] Pending payments count
- [ ] Open maintenance requests
- [ ] Recent activity feed
- [ ] Quick action buttons

### 2. Room Management
- [ ] CRUD operations for rooms
- [ ] Room status tracking (vacant/occupied/maintenance)
- [ ] Room type categorization
- [ ] Base rent configuration
- [ ] View room occupancy history
- [ ] Filter/search rooms

### 3. Resident Management
- [ ] CRUD operations for residents
- [ ] Assign/unassign rooms
- [ ] Store contact information
- [ ] Emergency contact details
- [ ] Move-in/move-out processing
- [ ] View resident payment history
- [ ] Filter by status (active/inactive)

### 4. Utility Management
- [ ] Configure utility types and rates
- [ ] Record meter readings
- [ ] Calculate consumption
- [ ] View reading history
- [ ] Support both metered and flat-rate utilities

### 5. Billing
- [ ] Generate monthly bills
- [ ] Auto-calculate utilities from readings
- [ ] Add custom charges
- [ ] Bill status tracking
- [ ] Overdue bill alerts
- [ ] Print/export invoices
- [ ] Send bill notifications (future)

### 6. Payment Tracking
- [ ] Record payments
- [ ] Multiple payment methods
- [ ] Partial payment support
- [ ] Payment history by resident
- [ ] Generate receipts
- [ ] Payment reports

### 7. Maintenance Requests
- [ ] Create maintenance requests
- [ ] Categorize by type (plumbing, electrical, etc.)
- [ ] Priority levels
- [ ] Status workflow (open → in progress → completed)
- [ ] Track costs
- [ ] Assignment tracking

### 8. Announcements
- [ ] Create announcements
- [ ] Set priority levels
- [ ] Schedule publish/expiry dates
- [ ] Active/inactive toggle

### 9. Reports
- [ ] Revenue reports (monthly/yearly)
- [ ] Occupancy rates
- [ ] Payment collection rate
- [ ] Maintenance cost summary
- [ ] Export to CSV/PDF

---

## Server Module Structure

```
server/src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── dto/
│       ├── login.dto.ts
│       └── register.dto.ts
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   └── entities/
│       └── user.entity.ts
├── rooms/
│   ├── rooms.module.ts
│   ├── rooms.controller.ts
│   ├── rooms.service.ts
│   ├── dto/
│   │   ├── create-room.dto.ts
│   │   └── update-room.dto.ts
│   └── entities/
│       └── room.entity.ts
├── residents/
│   ├── residents.module.ts
│   ├── residents.controller.ts
│   ├── residents.service.ts
│   ├── dto/
│   │   ├── create-resident.dto.ts
│   │   └── update-resident.dto.ts
│   └── entities/
│       └── resident.entity.ts
├── utilities/
│   ├── utilities.module.ts
│   ├── utilities.controller.ts
│   ├── utilities.service.ts
│   ├── dto/
│   │   ├── create-utility-type.dto.ts
│   │   └── create-reading.dto.ts
│   └── entities/
│       ├── utility-type.entity.ts
│       └── utility-reading.entity.ts
├── bills/
│   ├── bills.module.ts
│   ├── bills.controller.ts
│   ├── bills.service.ts
│   ├── dto/
│   │   ├── create-bill.dto.ts
│   │   └── generate-bills.dto.ts
│   └── entities/
│       ├── bill.entity.ts
│       └── bill-item.entity.ts
├── payments/
│   ├── payments.module.ts
│   ├── payments.controller.ts
│   ├── payments.service.ts
│   ├── dto/
│   │   └── create-payment.dto.ts
│   └── entities/
│       └── payment.entity.ts
├── maintenance/
│   ├── maintenance.module.ts
│   ├── maintenance.controller.ts
│   ├── maintenance.service.ts
│   ├── dto/
│   │   ├── create-request.dto.ts
│   │   └── update-request.dto.ts
│   └── entities/
│       └── maintenance-request.entity.ts
├── announcements/
│   ├── announcements.module.ts
│   ├── announcements.controller.ts
│   ├── announcements.service.ts
│   ├── dto/
│   │   └── create-announcement.dto.ts
│   └── entities/
│       └── announcement.entity.ts
├── dashboard/
│   ├── dashboard.module.ts
│   ├── dashboard.controller.ts
│   └── dashboard.service.ts
├── reports/
│   ├── reports.module.ts
│   ├── reports.controller.ts
│   └── reports.service.ts
├── database/
│   └── database.module.ts
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
```

---

## Implementation Phases

### Phase 1: Foundation
1. Set up SQLite database with TypeORM
2. Implement authentication (JWT)
3. Create base layout components
4. Set up routing

### Phase 2: Core Entities
1. Room management (CRUD)
2. Resident management (CRUD)
3. Room assignment functionality

### Phase 3: Billing System
1. Utility types and readings
2. Bill generation
3. Payment recording

### Phase 4: Additional Features
1. Maintenance requests
2. Announcements
3. Dashboard statistics

### Phase 5: Reports & Polish
1. Financial reports
2. Export functionality
3. UI/UX improvements

---

## Dependencies to Install

### Server
```bash
npm install @nestjs/typeorm typeorm sqlite3
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install class-validator class-transformer
npm install bcrypt
npm install -D @types/passport-jwt @types/bcrypt
```

### Client
```bash
npm install react-router-dom
npm install axios
npm install @tanstack/react-query
npm install react-hook-form
npm install date-fns
npm install recharts
npm install lucide-react
```

---

## Environment Variables

### Server (.env)
```
PORT=3000
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
DATABASE_PATH=./data/house.db
```

### Client (.env)
```
VITE_API_URL=http://localhost:3000/api
```


## 🔐 Credentials

For testing and initial access, use the following administrator credentials:

- **Email**: `mmillion728@gmail.com`
- **Password**: `Ti@!$%`


## 📜 License

- Internal Use - Ethio Telecom.

## Notes

- All timestamps use UTC
- Monetary values stored as REAL (float) in SQLite
- Soft delete not implemented (can be added later)
- Single admin/landlord system (multi-tenant can be added later)
- No email notifications in initial version
