import { Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { handleUploadFile, updateBookAPI } from "../../services/api.service"

const UpdateBookUncontrol = (props) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen,
        dataUpdate, loadBook, setDataUpdate } = props

    const [form] = Form.useForm()

    const [preview, setPreview] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const [isLoadingModal, setIsLoadingModal] = useState(false)


    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])


    const handleUploadThumbnail = event => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }

        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const CallApiUpdateBook = async (values, newThumbnail) => {
        const resUpdateBook = await updateBookAPI(
            values.id,
            newThumbnail,
            values.mainText,
            values.author,
            values.price,
            values.quantity,
            values.category)
        if (resUpdateBook.data) {
            notification.success({
                message: "Success Update Book",
                description: "Cập nhật sách thành công"
            })
            resetAndCloseModal()
            await loadBook()
        } else {
            notification.error({
                message: "Error Update Book",
                description: "Cập nhật sách thất bại 1"
            })
        }
    }

    const handleSubmitButton = async (values) => {
        setIsLoadingModal(true)
        let newThumbnail = ""
        if (!preview && !selectedFile) {
            return
        } else if (!selectedFile && preview) {
            newThumbnail = dataUpdate.thumbnail
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book")

            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded
            } else {
                notification.error({
                    message: "Error Update Book",
                    description: JSON.stringify(resUpload.message)
                })
                return
            }
        }
        await CallApiUpdateBook(values, newThumbnail)
        setIsLoadingModal(false)
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false)
        setDataUpdate(null)
        setPreview(null)
        setSelectedFile(null)
        form.resetFields()
    }

    return (
        <Modal
            title="Update Book"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => { resetAndCloseModal() }}
            okText="Save"
            okButtonProps={{
                loading: isLoadingModal
            }}
            centered>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitButton}>
                <Form.Item label="Id"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Tiêu đề"
                    name="mainText"
                    rules={[
                        {
                            required: true,
                            message: 'Tiêu đề không được bỏ trống!',
                        },

                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Tác giả"
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: 'Tác giả không được bỏ trống!',
                        },

                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Giá tiền"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Giá tiền không được bỏ trống!',
                        },

                    ]}>
                    <InputNumber style={{ width: "100%" }} addonAfter="₫" />
                </Form.Item>

                <Form.Item label="Số lượng"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Số lượng không được bỏ trống!',
                        },

                    ]}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Thể loại"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Thể loại không được bỏ trống!',
                        },

                    ]}>
                    <Select
                        style={{ width: '100%', marginBottom: "10px" }}
                        const options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },
                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' }
                        ]}
                    />
                </Form.Item>

                <label htmlFor="btnUploadThumbnailUC" style={{
                    display: "block",
                    width: "fit-content",
                    marginTop: "15px",
                    padding: "5px 10px",
                    background: "orange",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>Upload</label>
                <input id="btnUploadThumbnailUC" hidden
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => { handleUploadThumbnail(event) }}
                    onClick={(event) => { event.target.value = null }} />
                {preview &&
                    <div style={{
                        marginTop: "10px",
                        height: "150px",
                        width: "150px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <img style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "contain",
                            objectPosition: "center",
                        }}
                            src={preview} />
                    </div>}
            </Form>
        </Modal>
    )
}

export default UpdateBookUncontrol