import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookUncontrol = (props) => {

    const { isModalOpen, setIsModalOpen, loadBook } = props

    const [form] = Form.useForm()

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const handleSubmitButton = async (values) => {

        if (!selectedFile) {
            notification.error({
                message: "Error Upload Thumbnail",
                description: "Vui lòng thêm hình ảnh sách"
            })
            return
        }

        const resUpload = await handleUploadFile(selectedFile, "book")

        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded

            const resCreateBook = await createBookAPI(
                newThumbnail,
                values.mainText,
                values.author,
                values.price,
                values.quantity,
                values.category)

            if (resCreateBook.data) {

                resetAndCloseModal()

                notification.success({
                    message: "Create Book",
                    description: "Success Create Book!"
                })

                await loadBook();
            } else {
                notification.error({
                    message: "Create Book",
                    description: "Error Create Book!"
                })
            }
        } else {
            notification.error({
                message: "Error Upload Thumbnail",
                description: "Vui lòng thêm hình ảnh sách"
            })
        }
    }

    const handleUpLoadThumbnail = (event) => {
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

    const resetAndCloseModal = () => {
        form.resetFields()
        setSelectedFile(null)
        setIsModalOpen(false)
        setPreview(null)
    }
    return (
        <Modal
            title="Create Book"
            open={isModalOpen}
            onOk={() => form.submit()}
            onCancel={() => { resetAndCloseModal() }}
            centered>
            <Form form={form}
                layout="vertical"
                onFinish={handleSubmitButton}>
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

                <label htmlFor="btnUploadThumbnail" style={{
                    display: "block",
                    width: "fit-content",
                    marginTop: "15px",
                    padding: "5px 10px",
                    background: "orange",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>Upload</label>
                <input id="btnUploadThumbnail" hidden
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => { handleUpLoadThumbnail(event) }}
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

export default CreateBookUncontrol