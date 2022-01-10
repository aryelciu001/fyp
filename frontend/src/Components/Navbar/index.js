import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'Reducers/user'
import './index.scss'
import { UserType } from 'utils/constant'

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const userEmail = useSelector((state) => state.user.email)
  const userRole = useSelector((state) => state.user.role)
  const userEligible = useSelector((state) => state.user.eligible)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleSettingClick = (setting) => {
    switch (setting.toLowerCase()) {
      case 'logout':
        dispatch(logout())
        navigate('/login')
        break
      default:
        break
    }
  }

  /* eslint-disable */
  const LinkItemBox = ({ name, to, renderIf }) => (
    renderIf ? <Link key={name} className="navbar-link" to={to}>
      <Button
        key={name}
        onClick={handleCloseNavMenu}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        {name}
      </Button>
    </Link> : null
  )

  const LinkItemMenu = ({ name, to, renderIf }) => (
    renderIf ? <Link key={name} className="navbar-link" to={to}>
      <MenuItem key={name}>
        <Typography textAlign="center">
          {name}
        </Typography>
      </MenuItem>
    </Link> : null
  )
  /* eslint-enable */

  return (
    <div className="navbar">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <LinkItemMenu name="Home" to="/" renderIf={true}/>
                <LinkItemMenu name="Admin" to="/admin" renderIf={userRole === UserType.ADMIN}/>
                <LinkItemMenu name="Reservation" to="/reservation" renderIf={userRole === UserType.STUDENT && userEligible}/>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <LinkItemBox name="Home" to="/" renderIf={true}/>
              <LinkItemBox name="Admin" to="/admin" renderIf={userRole === UserType.ADMIN}/>
              <LinkItemBox name="Reservation" to="/reservation" renderIf={userRole === UserType.STUDENT && userEligible}/>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, fontSize: '0.8em' }}>
                  { userEmail }
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key='logout' onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    onClick={()=>handleSettingClick('logout')}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
export default ResponsiveAppBar
