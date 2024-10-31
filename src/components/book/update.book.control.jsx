import { Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { handleUploadFile, updateBookAPI } from "../../services/api.service"

const UpdateBookControl = (props) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen,
        dataUpdate, loadBook, setDataUpdate } = props

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setId(dataUpdate._id)
            setMainText(dataUpdate.mainText)
            setAuthor(dataUpdate.author)
            setPrice(dataUpdate.price)
            setQuantity(dataUpdate.quantity)
            setCategory(dataUpdate.category)
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])

    const [id, setId] = useState("")
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState(null)
    const [preview, setPreview] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const [isLoadingModal, setIsLoadingModal] = useState(false)


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

    const CallApiUpdateBook = async (newThumbnail) => {

        const resUpdateBook = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category)
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

    const handleUpdateBook = async () => {
        //không có preview và không có file
        setIsLoadingModal(true)
        let newThumbnail = ""

        if (!selectedFile && !preview) {
            return
        }
        //có preview mà không có file -> không upload file
        else if (preview && !selectedFile) {
            newThumbnail = dataUpdate.thumbnail
        }
        //có preview và có file -> upload file
        else {
            //upload file
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
        await CallApiUpdateBook(newThumbnail)
        setIsLoadingModal(false)
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false)
        setId("")
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory(null)
        setPreview(null)
        setSelectedFile(null)
        setDataUpdate(null)

    }

    return (
        <Modal title="Update Book"
            open={isModalUpdateOpen}
            onOk={() => { handleUpdateBook() }}
            onCancel={() => { resetAndCloseModal() }}
            okText="SAVE"
            okButtonProps={{
                loading: isLoadingModal
            }}
            centered>
            <p>Id</p>
            <Input
                value={id}
                style={{ marginBottom: "10px" }}
                disabled />


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
                onChange={event => { setQuantity(event) }} />
            <br />

            <p>Thể loại:</p>
            <Select
                value={category}
                style={{ width: '100%', marginBottom: "10px" }}
                onChange={event => { setCategory(event) }}
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
                <label htmlFor="UploadThumbnail" style={{
                    display: "block",
                    width: "fit-content",
                    marginTop: "15px",
                    padding: "5px 10px",
                    background: "orange",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>Change</label>
                <input id="UploadThumbnail" hidden
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
            </div>
        </Modal>
    )

}

export default UpdateBookControl
