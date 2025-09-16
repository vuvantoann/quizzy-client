import { useRoutes } from 'react-router-dom'
import { routes } from './routesConfig'

function AllRoute() {
  const elements = useRoutes(routes)
  return <>{elements}</>
}

export default AllRoute
