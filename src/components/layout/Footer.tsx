import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="py-4 px-6 border-t border-gray-200 bg-white text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Ethio Property. All rights reserved.
        </footer>
    )
}

export default Footer
