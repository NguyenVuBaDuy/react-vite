import { Table } from 'antd';



const UserTable = ({ dataUsers }) => {

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

    console.log(">>> run render 000");

    return (
        <Table
            columns={columns}
            dataSource={dataUsers}
            rowKey={"_id"} />
    );
}

export default UserTable;