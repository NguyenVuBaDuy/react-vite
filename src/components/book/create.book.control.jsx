import { Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react"
import { createBookAPI, handleUploadFile } from "../../services/api.service"

const CreateBookControl = (props) => {

    const { isModalOpen, setIsModalOpen, loadBook } = props

    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState(null)

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const handleSubmitCreateBook = async () => {

        if (!selectedFile) {
            notification.error({
                message: "Error Upload Image",
                description: "Vui lòng thêm hình ảnh"
            })
            return
        }

        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded

            const resCreateBook = await createBookAPI(newThumbnail, mainText, author, price, quantity, category)

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
                message: "Upload Image",
                description: "Vui lòng thêm hình ảnh"
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false)
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setSelectedFile(null)
        setPreview(null)
    }

    const handleUploadThumbnail = (event) => {
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

    return (
        <Modal title="Create Book"
            open={isModalOpen}
            onOk={() => { handleSubmitCreateBook() }}
            onCancel={() => { resetAndCloseModal() }}>
            <p>Tiêu đề:</p>
            <Input
                value={mainText}
                style={{ marginBottom: "10px" }}
                onChange={event => { setMainText(event.target.value) }} />


            <p>Tác giả:</p>
            <Input
                value={author}
                style={{ marginBottom: "10px" }}
                onChange={event => { setAuthor(event.target.value) }} />


            <p>Giá tiền:</p>
            <InputNumber
                value={price}
                style={{ marginBottom: "10px" }}
                onChange={event => { setPrice(event) }}
                addonAfter="₫" />
            <br />

            <p>Số lượng:</p>
            <InputNumber
                value={quantity}
                style={{ marginBottom: "10px", width: '100%' }}
                onChange={event => setQuantity(event)} />
            <br />

            <p>Thể loại:</p>
            <Select
                value={category}
                style={{ width: '100%', marginBottom: "10px" }}
                onChange={event => setCategory(event)}
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

            <p>Thumbnail: </p>
            <div>
                <label htmlFor="buttonUploadThumbnail" style={{
                    display: "block",
                    width: "fit-content",
                    marginTop: "15px",
                    padding: "5px 10px",
                    background: "orange",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>Upload</label>
                <input id="buttonUploadThumbnail" hidden
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
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                            src={preview} />
                    </div>}
            </div>
        </Modal>
    )

}

export default CreateBookControl