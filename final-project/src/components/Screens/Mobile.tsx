import { themes } from '../../config/themes'
import { useAppSelector } from '../../hooks/reduxHooks'
import MobileAppBar from '../mobile/MobileAppbar'
import MobileListScreen from '../mobile/MobileListScreen'

const Mobile = () => {
    const themeMode = useAppSelector((state) => state.theme.themeMode)

    return (
        <div style={{ backgroundColor: themes[themeMode].mainBg, height: "100vh" }}>
            <MobileAppBar />
            <MobileListScreen />
        </div>
    )
}

export default Mobile