import { Link, NavLink } from 'react-router-dom';
import { UsergroupDeleteOutlined, HomeOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Menu } from 'antd';

const Header = () => {

    const [current, setCurrent] = useState('');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/users"> Users</Link>,
            key: 'users',
            icon: <UsergroupDeleteOutlined />,
        },
        {
            label: <Link to="/books">Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
        {
            label: 'Cài đặt',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={'/login'}>Đăng nhập</Link>,
                    key: 'login',
                },
                {
                    label: 'Đăng xuất',
                    key: 'logout',
                }
            ]
        }
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
}

export default Header;