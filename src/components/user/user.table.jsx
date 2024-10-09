import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useState } from 'react';



const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([
        { _id: "1", fullName: "admin", email: "admin@gmail.com" },
        { _id: "2", fullName: "user", email: "user@gmail.com" }
    ]);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',

        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        }
    ];

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        // setDataUsers(res.data);
    }

    loadUser();

    return (
        <Table columns={columns} dataSource={dataUsers} />
    );
}

export default UserTable;