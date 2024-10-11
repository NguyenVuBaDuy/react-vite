import { Button, Drawer, notification } from "antd"
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {

    const { isOpenViewDetail,
        setIsOpenViewDetail,
        dataDetail,
        setDataDetail, loadUser } = props;

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }

        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }

    }

    const handleUpdateAvatar = async (event) => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded

            //step 2: upload user
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
            if (resUpdateAvatar.data) {
                setIsOpenViewDetail(false)
                setSelectedFile(null)
                setPreview(null)
                await loadUser()

                notification.success({
                    message: "Update User Avatar",
                    description: "Update Avatar Successful!"
                })
            } else {
                notification.error({
                    message: "Error Upload Avatar",
                    description: JSON.stringify(resUpload.message)
                })
            }
        } else {
            notification.error({
                message: "Error Upload File",
                description: JSON.stringify(resUpload.message)
            })
        }
    }


    return (
        <Drawer title="Chi tiết người dùng"
            width={"35vw"}
            onClose={() => {
                setIsOpenViewDetail(false)
                setDataDetail(null)
            }}
            open={isOpenViewDetail}>
            {dataDetail ?
                <>
                    <p>Id: {dataDetail._id}</p>
                    <br />
                    <p>Full name: {dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone number: {dataDetail.phone}</p>
                    <br />
                    <p>Avatar:</p>
                    <br />
                    <div style={{
                        marginTop: "10px",
                        height: "100px", width: "150px",
                    }}>
                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                    </div>

                    <div>
                        <label htmlFor="btnUpload" style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>Upload Avatar</label>
                        <input type="file"
                            hidden id="btnUpload"
                            onChange={(event) => handleOnChangeFile(event)} />
                    </div>
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                height: "100px", width: "150px",
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>

                            <Button type="primary"
                                onClick={(event) => handleUpdateAvatar(event)}
                            >Save</Button>
                        </>
                    }
                </>

                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }
        </Drawer>
    )
}

export default ViewUserDetail;