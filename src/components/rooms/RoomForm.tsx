import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Room } from '../../types'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'
import Textarea from '../common/Textarea'

const roomSchema = z.object({
  room_number: z.string().min(1, 'Room number is required'),
  floor: z.number().optional(),
  room_type: z.string().optional(),
  base_rent: z.number().min(0, 'Rent must be positive'),
  status: z.enum(['vacant', 'occupied', 'maintenance']),
  description: z.string().optional(),
})

type RoomFormData = z.infer<typeof roomSchema>

interface RoomFormProps {
  room?: Room
  onSubmit: (data: RoomFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const RoomForm: React.FC<RoomFormProps> = ({ room, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: room || {
      status: 'vacant',
      base_rent: 0,
    },
  })

  const roomTypes = [
    { value: 'single', label: 'Single Room' },
    { value: 'double', label: 'Double Room' },
    { value: 'studio', label: 'Studio' },
    { value: 'suite', label: 'Suite' },
    { value: 'apartment', label: 'Apartment' },
  ]

  const statusOptions = [
    { value: 'vacant', label: 'Vacant' },
    { value: 'occupied', label: 'Occupied' },
    { value: 'maintenance', label: 'Maintenance' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Room Number"
          {...register('room_number')}
          error={errors.room_number?.message}
          placeholder="e.g., 101, A-12"
          required
        />

        <Input
          label="Floor"
          type="number"
          {...register('floor', { valueAsNumber: true })}
          error={errors.floor?.message}
          placeholder="Floor number"
        />

        <Select
          label="Room Type"
          {...register('room_type')}
          error={errors.room_type?.message}
          options={roomTypes}
          placeholder="Select room type"
        />

        <Input
          label="Base Rent (Br)"
          type="number"
          step="0.01"
          {...register('base_rent', { valueAsNumber: true })}
          error={errors.base_rent?.message}
          placeholder="0.00"
          required
        />

        <Select
          label="Status"
          {...register('status')}
          error={errors.status?.message}
          options={statusOptions}
          required
        />
      </div>

      <Textarea
        label="Description"
        {...register('description')}
        error={errors.description?.message}
        placeholder="Additional details about the room..."
        rows={3}
      />

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {room ? 'Update Room' : 'Add Room'}
        </Button>
      </div>
    </form>
  )
}

export default RoomForm