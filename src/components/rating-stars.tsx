import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
  count?: number;
}

export function RatingStars({ rating, size = 16, showNumber = false, count }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) {
            return (
              <Star
                key={i}
                size={size}
                className="fill-yellow-400 text-yellow-400"
              />
            );
          }
          if (i === fullStars && hasHalfStar) {
            return (
              <StarHalf
                key={i}
                size={size}
                className="fill-yellow-400 text-yellow-400"
              />
            );
          }
          return <Star key={i} size={size} className="text-gray-300" />;
        })}
      </div>
      {showNumber && (
        <span className="text-muted-foreground ml-1">
          {rating.toFixed(1)}
          {count !== undefined && ` (${count})`}
        </span>
      )}
    </div>
  );
}
