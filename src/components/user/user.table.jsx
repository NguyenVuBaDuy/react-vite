import { Table } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';



const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([
        { _id: "1", fullName: "admin", email: "admin@gmail.com" },
        { _id: "2", fullName: "user", email: "user@gmail.com" }
    ]);

    // empty array -> run once
    useEffect(() => {
        console.log(">>> run render 111")
        loadUser();
    }, [])

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
        setDataUsers(res.data);
    }


    console.log(">>> run render 000");

    return (
        <Table
            columns={columns}
            dataSource={dataUsers}
            rowKey={"_id"} />
    );
}

export default UserTable;