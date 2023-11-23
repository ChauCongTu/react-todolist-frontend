import React from 'react'

const baseStyle: React.CSSProperties = {
  width: '25%',
  height: 54,
};

const MainLayout = () => {
  const [value, setValue] = React.useState<string>('horizontal');
  return (
    <div>Trang Chủ</div>
  )
}

export default MainLayout