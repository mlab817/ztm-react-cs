import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";

const PublicRoute = () => {
  const currentUser = useSelector(selectCurrentUser)
  const location = useLocation()

  if (currentUser) {
    return <Navigate to='/' state={{ from: location }} />
  }

  return <Outlet />
}

export default PublicRoute