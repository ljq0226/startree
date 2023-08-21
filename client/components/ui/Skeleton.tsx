import React from 'react'

interface SkeletonAvatarProps {
  size?: string
}

interface SkeletonBoxProps {
  avatar?: boolean | SkeletonAvatarProps
  loading?: boolean
  rows?: number
  round?: boolean
}

const RowWidths = [
  '20%',
  '90%',
  '75%',
  '40%',
]

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  avatar = true,
  rows = 4,
  round = false,
}) => {
  const avatarSize = typeof avatar === 'boolean' ? 'h-12 w-12' : avatar.size || 'h-12 w-12'
  const RowWidth = rows <= 4 ? RowWidths.slice(0, rows) : [...RowWidths, ...RowWidths].slice(0, rows)
  return (
    <div className="flex p-4 border-t rounded-md bg-base border-base">
      {avatar && (
        <div className={`${avatarSize} bg-gray-300 mr-4 rounded-full animate-skeleton ${round ? 'rounded-full' : ''}`}>
        </div>
      )}
      <div className='flex-1'>
        {(
          <>
            {RowWidth.map((width, i) => (
              <div key={`${width}-${i}`} className="h-3 mt-2 bg-gray-300 rounded animate-skeleton"
                style={{ width }}
              >
              </div>
            ))}
          </>
        )}
      </div>

    </div>
  )
}

export default SkeletonBox
