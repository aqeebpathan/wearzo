import { Link } from "react-router-dom"

interface DashboardCardProps {
  title: string
  value: string | number
}

export const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <div className="w-full border border-neutral-400 p-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-xl leading-tight">{title}</h3>
          <Link to={`/admin/dashboard/${title}`}>View </Link>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-2xl font-semibold text-gray-900">
        <p className="text-3xl font-medium">{value}</p>
      </div>
    </div>
  )
}
