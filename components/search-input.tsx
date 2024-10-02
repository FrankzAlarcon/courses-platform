"use client"

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

const SearchInput = () => {
  const [value, setValue] = useState('')
  const debuncedValue = useDebounce(value, 800)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentCategoryId = searchParams.get('categoryId')

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,

      query: {
        title: debuncedValue,
        categoryId: currentCategoryId
      }
    }, { skipEmptyString: true, skipNull: true })
    router.push(url)
  }, [debuncedValue, currentCategoryId, router, pathname])

  return (
    <div className='relative'>
      <Search className='h-4 w-4 absolute top-3 left-3 text-slate-600' />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200'
        placeholder='Search for a course...'
      />
    </div>
  )
}

export default SearchInput