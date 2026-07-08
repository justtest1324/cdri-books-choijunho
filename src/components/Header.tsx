import { NavLink } from 'react-router'
import Text from './Text'

const tabClass = ({ isActive }: { isActive: boolean }) =>
  `pb-0.5 ${isActive ? 'border-b border-primary' : 'border-b border-transparent'}`

function Header() {
  return (
    <header className="relative mx-auto flex h-20 w-full max-w-[1600px] items-center px-6 max-md:h-auto max-md:flex-col max-md:gap-3 max-md:py-4">
      <Text variant="title2" color="black" as="h1">
        CERTICOS BOOKS
      </Text>
      <nav className="absolute left-1/2 flex -translate-x-1/2 gap-14 max-md:static max-md:translate-x-0 max-md:gap-8">
        <NavLink to="/" className={tabClass}>
          <Text variant="body1">도서 검색</Text>
        </NavLink>
        <NavLink to="/favorites" className={tabClass}>
          <Text variant="body1">내가 찜한 책</Text>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
