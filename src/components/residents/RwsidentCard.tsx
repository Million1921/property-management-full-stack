import React from 'react'
import { User, Mail, Phone, Home, Calendar, AlertCircle } from 'lucide-react'
import { Resident } from '../../types'
import Button from '../common/Button'
import Badge from '../common/Badge'

interface ResidentCardProps {
  resident: Resident
  onEdit: (resident: Resident) => void
  onViewDetails: (id: number) => void
  onAssignRoom: (resident: Resident) => void
  onMoveOut: (id: number) => void
}

const ResidentCard: React.FC<ResidentCardProps> = ({
  resident,
  onEdit,
  onViewDetails,
  onAssignRoom,
  onMoveOut,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="card overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {resident.first_name} {resident.last_name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={
                    resident.status === 'active'
                      ? 'success'
                      : resident.status === 'pending'
                      ? 'warning'
                      : 'secondary'
                  }
                >
                  {resident.status}
                </Badge>
                {resident.room && (
                  <span className="text-sm text-gray-600">
                    Room {resident.room.room_number}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{resident.email}</span>
          </div>

          {resident.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">{resident.phone}</span>
            </div>
          )}

          {resident.move_in_date && (
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">
                Moved in: {formatDate(resident.move_in_date)}
              </span>
            </div>
          )}

          {resident.emergency_contact_name && (
            <div className="flex items-center text-gray-600">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">
                Emergency: {resident.emergency_contact_name}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(resident.id)}
          >
            Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(resident)}
          >
            Edit
          </Button>
          {!resident.room ? (
            <Button
              variant="primary"
              size="sm"
              className="col-span-2"
              onClick={() => onAssignRoom(resident)}
            >
              <Home className="w-4 h-4 mr-2" />
              Assign Room
            </Button>
          ) : (
            <Button
              variant="danger"
              size="sm"
              className="col-span-2"
              onClick={() => onMoveOut(resident.id)}
            >
              Process Move Out
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResidentCard