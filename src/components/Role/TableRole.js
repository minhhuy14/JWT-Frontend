import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { fetchAllRoles, deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";
const TableRole = forwardRef((props, ref) => {

    const [listRoles, setListRoles] = useState([]);

    const handleClickDeleteRole = async (role) => {
        let data = await deleteRole(role);
        if (data && data.EC === 0) {
            await getAllRoles();
            toast.success(data.EM);
        }

    }

    const getAllRoles = async () => {
        let data = await fetchAllRoles();
        if (data && +data.EC === 0) {
            setListRoles(data.DT);
        }
    }

    useImperativeHandle(ref, () => ({
        fetchListRolesAgain() {
            getAllRoles();
        }
    }))

    useEffect(() => {
        getAllRoles();
    }, [])


    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">URL</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        <>
                            {listRoles.map((item, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <button
                                                title="Delete"
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleClickDeleteRole(item)}
                                            >
                                                {" "}
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                Not found users
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
});

export default TableRole;
