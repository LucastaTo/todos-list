// React Imports
import React from 'react'

interface CustomToastProps {
  message: string
  type: 'success' | 'error'
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => {
  const styles = {
    success: { backgroundColor: '#4CAF50', color: '#fff' },
    error: { backgroundColor: '#F44336', color: '#fff' }
  }

  return <div style={{ ...styles[type], padding: '10px', borderRadius: '5px' }}>{message}</div>
}

export default CustomToast
