import AddBoardModal from './AddBoardModal'
import DeleteBoardModal from './DeleteBoardModal'
import EditBoardModal from './EditBoardModal'
import PreviewTaskModal from './PreviewTaskModal'
import AddTaskModal from './AddTaskModal'
import EditTaskModal from './EditTaskModal'
import DeleteTaskModal from './DeleteTaskModal'

type ModalProps = {
    screenWidth: number
}

const AllModals = ({ screenWidth }: ModalProps) => {
    return (
        <>
            <AddBoardModal screenWidth={screenWidth} />
            <EditBoardModal screenWidth={screenWidth} />
            <DeleteBoardModal screenWidth={screenWidth} />
            <PreviewTaskModal screenWidth={screenWidth} />
            <AddTaskModal screenWidth={screenWidth} />
            <EditTaskModal screenWidth={screenWidth} />
            <DeleteTaskModal screenWidth={screenWidth} />
        </>
    )
}

export default AllModals