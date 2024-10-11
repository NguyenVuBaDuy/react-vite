import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';


const UserTable = ({ dataUsers, loadUser }) => {

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    const [isOpenViewDetail, setIsOpenViewDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState(null)

    const handleDelete = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Delete User Successful!"
            })
        } else {
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message)
            })

        }
        await loadUser()
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => (
                <a href="#" onClick={() => {
                    setIsOpenViewDetail(true)
                    setDataDetail(record)
                }}>{record._id}</a>
            ),
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ gap: "20px", display: "flex" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true)
                        }}
                        style={{ cursor: "pointer", color: "orange" }}
                    />
                    <Popconfirm
                        title="Delete the user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];


    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"} />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isOpenViewDetail={isOpenViewDetail}
                setIsOpenViewDetail={setIsOpenViewDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                loadUser={loadUser}
            />
        </>
    );

}

export default UserTable;