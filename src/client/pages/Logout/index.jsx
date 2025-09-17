import { useNavigate } from 'react-router-dom'
import { deleteCookie } from '../../../helpers/cookie'
import { useEffect } from 'react'

function Logout() {
  const navigate = useNavigate()
  deleteCookie('token')
  useEffect(() => {
    navigate('/login')
  }, [])
  return <></>
}

export default Logout
