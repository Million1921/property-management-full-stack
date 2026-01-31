import React from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import Button from '../common/Button'
import Input from '../common/Input'

interface ResidentFormData {
    first_name: string
    last_name: string
    email: string
    phone: string
    id_number: string
    room_number: string
    move_in_date: string
}

interface ResidentFormProps {
    onSubmit: (data: ResidentFormData) => void
    onCancel: () => void
    initialData?: ResidentFormData
}

const ResidentForm: React.FC<ResidentFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ResidentFormData>({
        defaultValues: initialData
    })

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {initialData ? 'Edit Resident' : 'Add New Resident'}
                    </h2>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            {...register('first_name', { required: 'First name is required' })}
                            error={errors.first_name?.message}
                        />
                        <Input
                            label="Last Name"
                            {...register('last_name', { required: 'Last name is required' })}
                            error={errors.last_name?.message}
                        />
                    </div>

                    <Input
                        label="Email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Phone Number"
                        {...register('phone', { required: 'Phone number is required' })}
                        error={errors.phone?.message}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="ID / Passport Number"
                            {...register('id_number', { required: 'ID number is required' })}
                            error={errors.id_number?.message}
                        />
                        <Input
                            label="Room Number"
                            {...register('room_number', { required: 'Room number is required' })}
                            error={errors.room_number?.message}
                        />
                    </div>

                    <Input
                        label="Move-in Date"
                        type="date"
                        {...register('move_in_date', { required: 'Move-in date is required' })}
                        error={errors.move_in_date?.message}
                    />

                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {initialData ? 'Save Changes' : 'Add Resident'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResidentForm
