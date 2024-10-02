"use client"

import { Category } from '@prisma/client'
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcOldTimeCamera,
  FcSportsMode,
  FcMultipleSmartphones, 
  FcCommandLine
} from 'react-icons/fc'
import { IconType } from 'react-icons'
import CategoryItem from './category-item'

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category['name'], IconType> = {
  "Engineering": FcEngineering,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Web Development": FcCommandLine,
  "Computer Science": FcMultipleDevices,
  "Filming": FcFilmReel,
  "Mobile Development": FcMultipleSmartphones
}

const Categories = ({
  items
}: CategoriesProps) => {
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
      {
        items.map((category) => (
          <CategoryItem
            key={category.id}
            label={category.name}
            icon={iconMap[category.name]}
            value={category.id}
          />
        ))
      }
    </div>
  )
}

export default Categories