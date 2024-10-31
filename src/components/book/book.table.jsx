import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import ViewBookDetail from "./view.book.detail";
import { useEffect, useState } from "react";
import CreateBookControl from "./create.book.control";
import { fetchAllBookAPI } from "../../services/api.service"
import CreateBookUncontrol from "./create.book.uncontrol";
import UpdateBookControl from "./update.book.control";



const BookTable = (props) => {

    const [dataBooks, setDataBooks] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(10)

    const [isOpenBookDetail, setIsOpenBookDetail] = useState(false)
    const [dataBookDetail, setDataBookDetail] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)


    useEffect(() => {
        loadBook();
    }, [current, pageSize])

    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize)
        if (res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }



    const formatVND = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };


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
                        <EditOutlined
                            style={{ color: "orange", cursor: "pointer" }}
                            onClick={() => {
                                setIsModalUpdateOpen(true)
                                setDataUpdate(record)
                            }} />
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




    return (
        <>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button
                    type='primary'
                    onClick={() => { setIsModalOpen(true) }}>Create Book</Button>
            </div>

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

            {/* <CreateBookControl
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadBook={loadBook} /> */}

            <CreateBookUncontrol
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loadBook={loadBook} />

            <UpdateBookControl
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                loadBook={loadBook}
                setDataUpdate={setDataUpdate} />
        </>
    )

}

export default BookTable