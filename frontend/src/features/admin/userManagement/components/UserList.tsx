import { ChangeEvent } from "react"
import { twMerge } from "tailwind-merge"

import { User } from "../types/user.types"
import { useUpdateUserRoleMutation } from "../hooks/useUpdateUserRoleMutation"

interface UserListProps {
  users: User[]
}

const ROLE_OPTIONS = ["customer", "admin"] as const

const VERIFIED_STYLE = {
  true: "bg-green-100 text-green-700",
  false: "bg-red-100 text-red-700",
}

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

const USER_GRID = "grid-cols-[1fr_2fr_3fr_1fr_2fr_6rem] min-w-[900px]"

const UserList = ({ users }: UserListProps) => {
  const { updateUserRole, isPending } = useUpdateUserRoleMutation()
  const handleRoleChange = (role: string, userId: string) => {
    updateUserRole({ userId, role: role as User["role"] })
  }

  return (
    <div className="my-6 border border-neutral-400 p-4">
      <h3 className="mb-4 text-xl font-medium">All Users</h3>

      <div className="w-full overflow-x-auto">
        <div className="w-full">
          {/* Header row */}
          <div
            className={`grid ${USER_GRID} items-center gap-4 border-t border-b border-neutral-400 bg-neutral-50 px-3 py-3 text-sm font-medium text-neutral-800`}
          >
            <div>User ID</div>
            <div>Username</div>
            <div>Email</div>
            <div>Verified</div>
            <div>Last Login</div>
            <div className="text-right">Role</div>
          </div>

          {/* Data rows */}
          <div className="divide-y divide-neutral-200">
            {users.map(
              ({ _id, username, email, isVerified, lastLogin, role }) => (
                <div
                  key={_id}
                  className={`grid ${USER_GRID} items-center gap-4 px-3 py-4 text-sm text-neutral-700`}
                  role="row"
                >
                  <div>#{_id.slice(0, 6).toUpperCase()}</div>
                  <div>{username}</div>
                  <div>{email}</div>
                  <div>
                    <span
                      className={twMerge(
                        "w-fit px-2 py-1 text-xs font-medium",
                        VERIFIED_STYLE[String(isVerified) as "true" | "false"],
                      )}
                    >
                      {isVerified ? "Verified" : "Unverified"}
                    </span>
                  </div>
                  <div>
                    {lastLogin ? new Date(lastLogin).toLocaleString() : "—"}
                  </div>
                  <div className="text-right">
                    <label htmlFor={`role-${_id}`} className="sr-only">
                      Change role for user {username}
                    </label>
                    <select
                      id={`role-${_id}`}
                      value={role}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        handleRoleChange(e.target.value, _id)
                      }
                      disabled={isPending}
                      className="py-0.5 text-sm outline outline-neutral-400 disabled:opacity-30"
                    >
                      {ROLE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {capitalize(option)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList
