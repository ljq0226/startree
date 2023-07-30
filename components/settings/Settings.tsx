import SettingsItem from './SettingsItem'
import { SettingOptions } from './data'

function Settings() {
  return (
    <div>
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
