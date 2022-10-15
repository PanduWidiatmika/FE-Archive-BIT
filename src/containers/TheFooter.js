import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="http://www.balitekno.com" target="_blank" rel="noopener noreferrer">BIT</a>
        <span className="ml-1">&copy; 2022 PT. Bali International Technology</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
