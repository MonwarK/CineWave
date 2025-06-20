// components/movie/MovieStatsGrid.tsx
import { Calendar, Clock } from "lucide-react";
import { Movie } from "@/types/Movie";

export default function MovieStatsGrid({ movie }: { movie: Movie }) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      trailingZeroDisplay: "stripIfInteger",
    }).format(value);

  return (
    <div className="grid lg:grid-cols-3 gap-3">
      <InfoCard
        label="Release Date"
        value={new Date(movie.release_date).toDateString()}
        icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
      />
      <InfoCard
        label="Runtime"
        value={`${movie.runtime} Min`}
        icon={<Clock className="h-5 w-5 text-muted-foreground" />}
      />
      <InfoCard label="Status" value={movie.status} />
      <InfoCard
        label="Budget"
        value={movie.budget ? formatCurrency(movie.budget) : "Unknown"}
      />
      <InfoCard
        label="Revenue"
        value={movie.revenue ? formatCurrency(movie.revenue) : "Unknown"}
      />
      <InfoCard label="Language" value={movie.spoken_languages?.[0].name} />
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center bg-zinc-900 p-5 rounded-lg border border-zinc-700">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
      {icon && icon}
    </div>
  );
}
