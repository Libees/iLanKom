import React from 'react'
import ListIcon from "./ListIcon"
import { theme } from '../../constansts/theme'
interface IconProps {
  height?: number;
  width?: number;
  strokeWidth?: number;
  color?: string;
}
const icons: { [key: string]: React.ComponentType<IconProps> } = {
  list: ListIcon
}

const Icon = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const IconComponent = icons[name]
  return (
    <IconComponent
      height={props.size || 24}
      width={props.size || 24}
      strokeWidth={props.strokeWidth || 1.5}
      color={theme.colors.textD}
    >

    </IconComponent>
  )
}

export default Icon