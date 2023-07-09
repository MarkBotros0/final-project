import { useAppSelector } from "../../hooks/reduxHooks"
import Layout from "../Layout"
import ListsScreen from "../ListsScreen"
import NoListScreen from "../NoListScreen"

const Desktop = () => {
    const lists = useAppSelector(state => state.lists.lists)
    return (
        <>
            <Layout>
                {lists.length > 0 ?
                    <ListsScreen />
                    : <NoListScreen />
                }
            </Layout>
        </>
    )
}

export default Desktop