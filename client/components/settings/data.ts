export interface SettingOption {
  href: string
  linkName: string
  icon: string
}

export const SettingOptions: Readonly<SettingOption[]> = [
  {
    href: '/profile',
    linkName: 'profile',
    icon: 'ri:user-settings-line',
  },
  {
    href: '/interface',
    linkName: 'interface',
    icon: 'dashicons:admin-appearance',
  },
  {
    href: '/notifications',
    linkName: 'notifications',
    icon: 'mdi:notifications-none',
  },
  {
    href: '/language',
    linkName: 'language',
    icon: 'grommet-icons:language',
  },
  {
    href: '/preferences',
    linkName: 'preferences',
    icon: 'pajamas:preferences',
  },
  {
    href: '/users',
    linkName: 'account_settings',
    icon: 'ri:group-line',
  },
  {
    href: '/about',
    linkName: 'about',
    icon: 'mdi:about-circle-outline',
  },
]
