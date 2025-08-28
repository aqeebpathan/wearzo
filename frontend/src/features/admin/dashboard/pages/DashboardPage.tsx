import { DashboardCard } from "../components/DashboardCard"
import { useDashboardStatsQuery } from "../hooks/useDashboardStatsQuery"

const DashboardPage = () => {
  const { stats, isPending } = useDashboardStatsQuery()
  return (
    <section>
      <h2 className="text-2xl font-medium">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Revenue (This Month)"
          value={isPending ? "Loading" : `$${stats?.revenue.toLocaleString()}`}
        />

        <DashboardCard
          title="Total Users"
          value={
            isPending
              ? "Loading"
              : `${stats?.totalUsers} ${stats?.totalUsers === 1 ? "User" : "Users"}`
          }
        />

        <DashboardCard
          title="Total Orders"
          value={
            isPending
              ? "Loading"
              : `${stats?.totalOrders} ${stats?.totalOrders === 1 ? "Order" : "Orders"}`
          }
        />

        <DashboardCard
          title="Low Stock Products"
          value={
            isPending
              ? "Loading"
              : `${stats?.lowStockCount} ${stats?.lowStockCount === 1 ? "Item" : "Items"}`
          }
        />

        <DashboardCard
          title="New Users This Week"
          value={isPending ? "Loading" : stats?.newUsersThisWeek || 0}
        />
      </div>

      {/* Low Stock Products List */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-medium">Low Stock Products</h2>
        {stats?.lowStockCount === 0 ? (
          <p className="text-lg text-green-600">
            All products are well-stocked 🎉
          </p>
        ) : (
          <ul className="max-w-3xl space-y-4">
            {stats?.lowStockProducts.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-4 border border-neutral-400 px-4 py-2"
              >
                <span>{product.name}</span>
                <span className="text-sm font-medium text-nowrap text-red-500">
                  {product.countInStock} left
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default DashboardPage
