import { useLanyard } from 'react-use-lanyard'
import '../styles/app.scss'

function Status() {
	const { status } = useLanyard({
		userId: "303804858744700929",
		socket: true,
	})
    const isOnline = status?.discord_status !== 'offline'

    return(
        <>
            <div className={`inline-flex place-items-center my-1 gap-3 rounded-full bg-neutral-800 px-4 py-2 w-fit`} >
                <span className={`inline-block h-4 w-4 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"}`} />
                {isOnline ? "Online" : "Offline"}
            </div>
        </>
    )
}
export default Status