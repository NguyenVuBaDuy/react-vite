import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPI } from '../services/api.service';


const UserPage = () => {
    //lift-up state
    const [dataUsers, setDataUsers] = useState([]);

    // empty array -> run once
    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
    }

    return (
        <div style={{ padding: "20px" }}>
            <UserForm dataUsers={dataUsers} loadUser={loadUser} />
            <UserTable dataUsers={dataUsers} />
        </div>
    )
}

export default UserPage;