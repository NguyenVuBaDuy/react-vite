import { Button } from "antd"

const BookForm = () => {
    return (
        <div className="book-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table Books</h3>
                    <Button type='primary'>Create Book</Button>
                </div>
            </div>
        </div>
    )
}

export default BookForm