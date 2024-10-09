import { cn } from "@/lib/utils"
import { Progress } from "./ui/progress"

interface CourseProgressProps {
  value: number
  variant?: 'success' | 'default'
  size?: 'default' | 'sm'
}

const colorByVariant = {
  default: 'text-sky-700',
  success: 'text-emerald-700'
}

const sizeByVariant = {
  default: 'text-sm',
  sm: 'text-xs'
}

const CourseProgress = ({
  value,
  variant = 'default',
  size = 'default'
}: CourseProgressProps) => {
  console.log("Course Progress", value)
  return (
    <div>
      <Progress
        variant={variant}
        className="h-2"
        value={value}
      />
      <p className={cn(
        "font-md mt-2 text-sky-600",
        colorByVariant[variant || 'default'],
        sizeByVariant[size|| 'default']
      )}>
        {Math.round(value)}% Complete
      </p>
    </div>
  )
}

export default CourseProgress