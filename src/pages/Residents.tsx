import React, { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Phone, Mail } from 'lucide-react'
import Button from '../components/common/Button'
import ResidentForm from '../components/residents/ResidentForm'

// Mock Data
const initialResidents = [
    { id: 1, first_name: 'Abebe', last_name: 'Kebede', email: 'abebe@example.com', phone: '0911223344', room_number: '101', status: 'active', move_in_date: '2023-01-01', id_number: 'ET12345' },
    { id: 2, first_name: 'Sara', last_name: 'Alemu', email: 'sara@example.com', phone: '0922334455', room_number: '102', status: 'active', move_in_date: '2023-02-15', id_number: 'ET67890' },
    { id: 3, first_name: 'Dawit', last_name: 'Yilma', email: 'dawit@example.com', phone: '0933445566', room_number: '105', status: 'pending', move_in_date: '2023-03-10', id_number: 'ET11223' },
]

const Residents: React.FC = () => {
    const [residents, setResidents] = useState(initialResidents)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingResident, setEditingResident] = useState<any>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const handleAddKey = () => {
        setEditingResident(null)
        setIsFormOpen(true)
    }

    const handleEdit = (resident: any) => {
        setEditingResident(resident)
        setIsFormOpen(true)
    }

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to remove this resident?')) {
            setResidents(residents.filter(r => r.id !== id))
        }
    }

    const handleSubmit = (data: any) => {
        if (editingResident) {
            setResidents(residents.map(r => r.id === editingResident.id ? { ...r, ...data } : r))
        } else {
            setResidents([...residents, { id: residents.length + 1, ...data, status: 'active' }])
        }
        setIsFormOpen(false)
    }

    const filteredResidents = residents.filter(r =>
        r.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.room_number.includes(searchTerm)
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Residents</h1>
                <Button onClick={handleAddKey}>
                    <Plus size={20} className="mr-2" />
                    Add Resident
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search residents..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Room</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Move-in Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredResidents.map((resident) => (
                                <tr key={resident.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                                {resident.first_name[0]}{resident.last_name[0]}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{resident.first_name} {resident.last_name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">ID: {resident.id_number}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 dark:text-gray-300 flex items-center gap-2">
                                            <Phone size={14} className="text-gray-400" /> {resident.phone}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                            <Mail size={14} className="text-gray-400" /> {resident.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                            Room {resident.room_number}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${resident.status === 'active'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                            {resident.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {resident.move_in_date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(resident)} className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(resident.id)} className="text-red-600 hover:text-red-900 dark:hover:text-red-400">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isFormOpen && (
                <ResidentForm
                    onSubmit={handleSubmit}
                    onCancel={() => setIsFormOpen(false)}
                    initialData={editingResident}
                />
            )}
        </div>
    )
}

export default Residents
