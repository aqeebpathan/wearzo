import { twMerge } from "tailwind-merge"

const USER_GRID = "grid-cols-[1fr_2fr_3fr_1fr_2fr_6rem] min-w-[900px]"

const UserListSkeleton = ({ count = 5 }: { count?: number }) => {
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

          {/* Skeleton rows */}
          <div className="divide-y divide-neutral-200">
            {Array.from({ length: count }).map((_, idx) => (
              <div
                key={idx}
                className={`grid ${USER_GRID} animate-pulse items-center gap-4 px-3 py-4`}
              >
                {Array(6)
                  .fill(0)
                  .map((_, col) => (
                    <div
                      key={col}
                      className={twMerge(
                        "h-6 w-[80%] bg-neutral-200",
                        col === 5 && "ml-auto w-[70%]",
                      )}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserListSkeleton
