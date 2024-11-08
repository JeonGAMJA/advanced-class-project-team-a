import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Profile from '../assets/profile.jpg';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from './ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginState } from '@/RTK/thunk';
import { AppDispatch, RootState } from '@/RTK/store';
import { useSidebar } from './ui/sidebar';
import { useWideScreen } from '@/hooks/use-wideScreen';
import { DROPDOWN_MENU_ITEMS } from '@/util/dropdownOptions';
import ThemeMenu from './ThemeMenu';

interface SetDropdownOpen {
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserMenuDropdown({ setDropdownOpen }: SetDropdownOpen) {
  const navigate = useNavigate();
  const { setOpen, setOpenMobile } = useSidebar();
  const isWideScreen = useWideScreen();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const handleClick = (title: string, url?: string) => {
    if (title === '로그아웃') {
      dispatch(updateLoginState());
    }
    if (url) {
      navigate(url);
    }
    setDropdownOpen(false);
    setOpen(isWideScreen);
    setOpenMobile(false);
  };

  return (
    <DropdownMenuContent
      className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-l relative bottom-2'
      side='bottom'
      align='end'
      sideOffset={4}
      aria-label='사용자 메뉴'
    >
      <DropdownMenuLabel className='p-0 font-normal'>
        <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm h-14'>
          <Avatar className='h-8 w-8 rounded-lg'>
            <AvatarImage src={Profile} alt='profile' />
            <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>username</span>
            <span className='truncate text-xs'>{user!.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {DROPDOWN_MENU_ITEMS.map((item) =>
          item.url ? (
            <DropdownMenuItem
              key={item.title}
              onClick={() => handleClick(item.title, item.url)}
              className='hover:bg-accent hover:text-accent-foreground h-10'
            >
              <item.icon className='mr-2 h-4 w-4' />
              <span>{item.title}</span>
            </DropdownMenuItem>
          ) : (
            <ThemeMenu key={item.title} />
          )
        )}
        {/* 테마 변경 메뉴 추가 */}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
