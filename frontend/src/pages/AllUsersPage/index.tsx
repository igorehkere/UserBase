import { trpc } from "../../utils/trpc"


export function AllUsersPage () {
    const {data, isError, isLoading, isFetching, error} = trpc.getUsers.useQuery()

    if (isLoading || isFetching) {
        return (
            <div>Loading...</div>
        )
    }
    if (isError) {
        return (
            <div>Error: {error.message}</div>
        )
    }
    return (
        <div>
            <h1>All Users:</h1>
            {data.users.map((user) => {
                return (
                    <div key={user.id}>
                        <p>{user.name}</p>
                        <p>{user.nick}</p>
                    </div>
                )
            })}
        </div>
    )
}