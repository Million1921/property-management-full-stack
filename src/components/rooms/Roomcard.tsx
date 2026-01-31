import React from 'react'
import { Home, User, DollarSign, MapPin, MoreVertical } from 'lucide-react'
import { Room } from '../../types'
import RoomStatusBadge from './RoomStatusBadge'
import Button from '../common/Button'
import Dropdown from '../common/Dropdown'

interface RoomCardProps {
  room: Room
  onEdit: (room: Room) => void
  onDelete: (id: number) => void
  onViewDetails: (id: number) => void
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onEdit, onDelete, onViewDetails }) => {
  const dropdownItems = [
    { label: 'View Details', onClick: () => onViewDetails(room.id) },
    { label: 'Edit Room', onClick: () => onEdit(room) },
    { label: 'Assign Resident', onClick: () => { } },
    { label: 'View History', onClick: () => { } },
    { label: 'Delete Room', onClick: () => onDelete(room.id), destructive: true },
  ]

  return (
    <div className="card overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Room {room.room_number}</h3>
            <div className="flex items-center gap-2 mt-1">
              <RoomStatusBadge status={room.status} />
              {room.floor && (
                <span className="text-sm text-gray-600">Floor {room.floor}</span>
              )}
            </div>
          </div>
          <Dropdown items={dropdownItems}>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </Dropdown>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Home className="w-4 h-4 mr-2" />
            <span className="text-sm capitalize">{room.room_type || 'Standard'}</span>
          </div>

          {room.residents && room.residents.length > 0 ? (
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {room.residents.length} resident{room.residents.length > 1 ? 's' : ''}
              </span>
            </div>
          ) : (
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span className="text-sm">No residents</span>
            </div>
          )}

          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Br {room.base_rent}/month</span>
          </div>

          {room.description && (
            <div className="flex items-start text-gray-600">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm line-clamp-2">{room.description}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails(room.id)}
          >
            View Details
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => onEdit(room)}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard