import React from 'react'
import { Printer, Download, Mail, Calendar, FileText } from 'lucide-react'
import { Bill } from '../../types'
import Button from '../common/Button'
import Badge from '../common/Badge'

interface BillPreviewProps {
  bill: Bill
  onPrint: () => void
  onDownload: () => void
  onSendEmail: () => void
}

const BillPreview: React.FC<BillPreviewProps> = ({
  bill,
  onPrint,
  onDownload,
  onSendEmail,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success'
      case 'pending': return 'warning'
      case 'overdue': return 'danger'
      case 'partial': return 'info'
      default: return 'secondary'
    }
  }

  return (
    <div className="card">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-900">Invoice #{bill.id}</h2>
              <Badge variant={getStatusColor(bill.status)}>
                {bill.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-gray-600 mt-1">
              Generated on {new Date(bill.bill_date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onPrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="primary" size="sm" onClick={onSendEmail}>
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bill From */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Bill From
            </h3>
            <div className="space-y-2">
              <p className="font-semibold">Property Management</p>
              <p className="text-gray-600">123 Property Street</p>
              <p className="text-gray-600">City, State 12345</p>
              <p className="text-gray-600">contact@propertymanagement.com</p>
            </div>
          </div>

          {/* Bill To */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Bill To
            </h3>
            <div className="space-y-2">
              <p className="font-semibold">
                {bill.resident.first_name} {bill.resident.last_name}
              </p>
              <p className="text-gray-600">Room {bill.room.room_number}</p>
              <p className="text-gray-600">{bill.resident.email}</p>
              <p className="text-gray-600">{bill.resident.phone}</p>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Invoice Date</p>
            <p className="font-semibold">
              {new Date(bill.bill_date).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="font-semibold">
              {new Date(bill.due_date).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Invoice #</p>
            <p className="font-semibold">INV-{bill.id.toString().padStart(6, '0')}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Balance Due</p>
            <p className="font-semibold text-lg">{formatCurrency(bill.total_amount)}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Invoice Items
          </h3>
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bill.items?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.description}</p>
                        <p className="text-sm text-gray-500">{item.item_type}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(item.unit_price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 flex justify-end">
          <div className="w-full max-w-md">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  {formatCurrency(bill.rent_amount + bill.utility_amount + bill.other_charges)}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatCurrency(bill.total_amount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {bill.notes && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">Notes</h4>
            <p className="text-sm text-yellow-700">{bill.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BillPreview