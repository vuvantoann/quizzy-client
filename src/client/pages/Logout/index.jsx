import { useNavigate } from 'react-router-dom'
import { deleteCookie } from '../../../helpers/cookie'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkLogin } from '../../actions/login'

function Logout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(checkLogin(false))
    deleteCookie('token')
    navigate('/login')
  }, [])
  return <></>
}

export default Logout
