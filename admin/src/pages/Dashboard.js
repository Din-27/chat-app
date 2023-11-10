import React from 'react'
import QrCode from '../components/QrCode'

export default function Dashboard() {
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700 mt-14">
                <QrCode />
            </div>
        </div>
    )
}
