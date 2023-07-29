export interface NavLink {
  href: string
  linkName: string
  iconName: string
  disabled?: boolean
  canBeHidden?: boolean
  addPadding?: boolean
}

export const NavLinks: Readonly<NavLink[]> = [
  {
    href: '/home',
    linkName: 'home',
    iconName: 'ri:home-5-line',
  },
  {
    href: '/notifications',
    linkName: 'notifications',
    iconName: 'ri:notification-4-line',
  },
  {
    href: '/conversations',
    linkName: 'conversations',
    iconName: 'ri:at-line',
  },
  {
    href: '/favorites',
    linkName: 'favourites',
    iconName: 'ri:star-line',
  },
  {
    href: '/bookmarks',
    linkName: 'bookmarks',
    iconName: 'ri:bookmark-line',
  },
  {
    href: '/compose',
    linkName: 'compose',
    iconName: 'ri:quill-pen-line',
    addPadding: true,
  },
  {
    href: '/explore',
    linkName: 'explore',
    iconName: 'line-md:hash-small',
    canBeHidden: true,
  },
  {
    href: '/lists',
    linkName: 'lists',
    iconName: 'ri:list-unordered',
    canBeHidden: true,
  },
  {
    href: '/settings',
    linkName: 'settings',
    iconName: 'ri:settings-3-line',
    addPadding: true,
  },
]
