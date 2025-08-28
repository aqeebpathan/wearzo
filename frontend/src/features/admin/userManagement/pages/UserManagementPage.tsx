import UserList from "../components/UserList"
import { useUsersQuery } from "../hooks/useUsersQuery"
import RenderError from "@/shared/components/RenderError"
import UserListSkeleton from "../components/UserListSkeleton"

const UserManagementPage = () => {
  const { users, isPending, isError, error } = useUsersQuery()
  return (
    <section>
      <h2 className="text-2xl font-medium">Manage Users</h2>

      {isError && <RenderError error={error} />}
      {isPending && <UserListSkeleton />}
      {!isError && !isPending && <UserList users={users} />}
    </section>
  )
}

export default UserManagementPage
