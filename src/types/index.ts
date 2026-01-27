export interface User {
  id: number
  email: string
  name: string
  role: 'admin' | 'manager'
  created_at: string
  updated_at: string
}

export interface Room {
  id: number
  room_number: string
  floor?: number
  room_type?: string
  base_rent: number
  status: 'vacant' | 'occupied' | 'maintenance'
  description?: string
  residents?: Resident[]
  created_at: string
  updated_at: string
}

export interface Resident {
  id: number
  room_id?: number
  room?: Room
  first_name: string
  last_name: string
  email: string
  phone?: string
  id_number?: string
  move_in_date?: string
  move_out_date?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  status: 'active' | 'inactive' | 'pending'
  created_at: string
  updated_at: string
}

export interface UtilityType {
  id: number
  name: string
  unit?: string
  rate_per_unit?: number
  is_metered: boolean
  created_at: string
}

export interface UtilityReading {
  id: number
  room_id: number
  utility_type_id: number
  previous_reading?: number
  current_reading: number
  reading_date: string
  created_at: string
  room?: Room
  utility_type?: UtilityType
}

export interface BillItem {
  id: number
  bill_id: number
  description: string
  quantity: number
  unit_price: number
  total: number
  item_type: 'rent' | 'electricity' | 'water' | 'internet' | 'other'
  created_at: string
}

export interface Bill {
  id: number
  resident_id: number
  room_id: number
  bill_date: string
  due_date: string
  rent_amount: number
  utility_amount: number
  other_charges: number
  total_amount: number
  status: 'pending' | 'paid' | 'partial' | 'overdue'
  notes?: string
  created_at: string
  updated_at: string
  resident: Resident
  room: Room
  items?: BillItem[]
  payments?: Payment[]
}

export interface Payment {
  id: number
  bill_id: number
  resident_id: number
  amount: number
  payment_date: string
  payment_method: 'cash' | 'bank_transfer' | 'card' | 'mobile'
  reference_number?: string
  notes?: string
  created_at: string
  bill?: Bill
  resident?: Resident
}

export interface MaintenanceRequest {
  id: number
  room_id?: number
  resident_id?: number
  title: string
  description: string
  category: 'plumbing' | 'electrical' | 'appliance' | 'structural' | 'other'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  assigned_to?: string
  estimated_cost?: number
  actual_cost?: number
  completed_at?: string
  created_at: string
  updated_at: string
  room?: Room
  resident?: Resident
}

export interface Announcement {
  id: number
  title: string
  content: string
  priority: 'low' | 'normal' | 'high'
  is_active: boolean
  publish_date?: string
  expiry_date?: string
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  totalRooms: number
  occupiedRooms: number
  vacantRooms: number
  activeResidents: number
  pendingResidents: number
  monthlyRevenue: number
  pendingPayments: number
  totalPendingAmount: number
  collectionRate: number
  revenueData: Array<{
    month: string
    revenue: number
    expenses: number
    profit: number
  }>
  occupancyData: Array<{
    month: string
    occupancyRate: number
    vacantRooms: number
  }>
  recentActivity: Array<{
    id: number
    type: 'payment' | 'maintenance' | 'resident' | 'bill'
    title: string
    description: string
    time: string
  }>
  maintenance: {
    open: number
    inProgress: number
    completed: number
    overdue: number
  }
}