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
    disabled: true,
  },
  {
    href: '/notifications',
    linkName: 'notifications',
    iconName: 'ri:notification-4-line',
    disabled: true,
  },
  {
    href: '/conversations',
    linkName: 'conversations',
    iconName: 'ri:at-line',
    disabled: true,
  },
  {
    href: '/favorites',
    linkName: 'favorites',
    iconName: 'icon-park-outline:like',
    disabled: true,
  },
  {
    href: '/stars',
    linkName: 'stars',
    iconName: 'tabler:star',
    disabled: true,
  },
  {
    href: '/compose',
    linkName: 'compose',
    iconName: 'ri:quill-pen-line',
    addPadding: true,
    disabled: true,
  },
  {
    href: '/explore',
    linkName: 'explore',
    iconName: 'line-md:hash-small',
    canBeHidden: true,
    disabled: true,
  },
  {
    href: '/intro',
    linkName: 'intro',
    iconName: 'material-symbols:article-outline',
    canBeHidden: true,
  },
  {
    href: '/settings',
    linkName: 'settings',
    iconName: 'ri:settings-3-line',
    addPadding: true,
  },
]
