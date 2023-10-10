'use client'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('敏感词管理', 'sensitive', <MailOutlined />),
  getItem('违规处理', 'report', <SettingOutlined />, [
    getItem('待处理', 'report/pending'),
    getItem('已处理', 'report/resolved'),
  ]),
];
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('e', e)
    router.push(`/home/${e.key}`)
  };
  return (
    <div className='flex flex-col w-full h-screen overflow-y-scroll'>
      <header className='flex w-full h-10 border-b border-[240, 240, 240]'>
        <div className='flex ml-10 text-2xl font-bold flex-center'>后台管理</div>
        <div className="flex-1"></div>
        <div className='flex flex-center'>
          <Link href={'/login'}>退出登录</Link>
        </div>
      </header>
      <main className='flex flex-1'>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
        <div className='flex-1 content'>
          {children}
        </div>
      </main>

    </div>
  )
}
