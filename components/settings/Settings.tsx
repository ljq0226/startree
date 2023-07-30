import SettingsItem from './SettingsItem'
import { SettingOptions } from './data'

function Settings() {
  return (
    <div className='border-red-500 border-solid border-r-10'>
      {
        SettingOptions.map((option) => {
          return (
            <SettingsItem {...option} key={option.href} />
          )
        })
      }

    </div>
  )
}

export default Settings
