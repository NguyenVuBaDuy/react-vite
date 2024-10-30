import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import ViewBookDetail from "./view.book.detail";
import { } from "react-router-dom";
import { useState } from "react";


const BookTable = (props) => {

    const { dataBooks, current, setCurrent, pageSize, setPageSize, total } = props


    const formatVND = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const [isOpenBookDetail, setIsOpenBookDetail] = useState(false)
    const [dataBookDetail, setDataBookDetail] = useState(null)

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>
                        {index + 1 + (current - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => (
                <a href="#" onClick={() => {
                    setIsOpenBookDetail(true)
                    setDataBookDetail(record)
                }}>
                    {record._id}
                </a>
            )
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (_, record) => (
                <div>{formatVND(record.price)}</div>
            )
        },
        {
            title: 'Số lượng ',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined style={{ color: "orange", cursor: "pointer" }} />
                        <Popconfirm
                            title="Delete the book"
                            description="Are you sure to delete this book?"
                            onConfirm={() => { }}
                            onCancel={() => { }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                        </Popconfirm>
                    </div>
                )
            }
        },
    ];

    const onChange = (pagination) => {
        if (pagination && pagination.current) {
            if (+current != +pagination.current) {
                setCurrent(+pagination.current)
            }
        }

        if (pagination && pagination.pageSize) {
            if (+pageSize != +pagination.pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    }


    return (
        <>
            <Table
                dataSource={dataBooks}
                columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total}</div>) }
                    }}
                onChange={onChange} />
            <ViewBookDetail
                dataBookDetail={dataBookDetail}
                isOpenBookDetail={isOpenBookDetail}
                setIsOpenBookDetail={setIsOpenBookDetail}
                formatVND={formatVND} />
        </>
    )

}

export default BookTable