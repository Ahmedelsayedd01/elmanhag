import React from 'react'
import { useParams } from 'react-router-dom'

const UnitsLayout = () => {
       const { UnitsId } = useParams()
       return (
              <div>UnitsLayout</div>
       )
}

export default UnitsLayout