import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { useDarkMode } from '@hooks/useDarkMode'
import { IconButton } from '@mui/material'

const ThemeToggle = () => {
  const { isDarkMode, enable, disable } = useDarkMode()

  return (
    <>
      {isDarkMode && (
        <IconButton aria-label='light mode' onClick={disable}>
          <WbSunnyIcon />
        </IconButton>
      )}
      {!isDarkMode && (
        <IconButton aria-label='dark mode' onClick={enable}>
          <DarkModeOutlinedIcon />
        </IconButton>
      )}
    </>
  )
}

export default ThemeToggle
