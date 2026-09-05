import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FaFilter, FaRegClock } from 'react-icons/fa'
import { HiSortAscending, HiSortDescending } from 'react-icons/hi'

type SearchBarProps = {
  value: string
  onValueChange: (value: string) => void
}

function SearchBar({ value, onValueChange }: SearchBarProps) {
  return (
    <Field orientation="horizontal" className="my-6 flex justify-center">
      <Input
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className="w-full max-w-2xl rounded-xl"
        type="search"
        placeholder="Search games from your library, or add a new game..."
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <FaFilter />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
            <DropdownMenuItem>
              <FaRegClock />
              Recently Added
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HiSortAscending />
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HiSortDescending />
              Descending
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Field>
  )
}

export default SearchBar
