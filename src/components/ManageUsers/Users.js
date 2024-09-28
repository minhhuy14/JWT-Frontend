import { useEffect, useState } from 'react'
import './Users.scss';
import './Pagination.scss';
import { toast } from "react-toastify";
import { fetchAllUsers, deleteUser } from '../../services/userService';

import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';
import ReactPaginate from 'react-paginate';
const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [dataModalDelete, setDataModal] = useState({});

    const [isShowModalUser, setShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE");

    const [dataModalUser, setDataModalUser] = useState({});
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (page) => {
        let response = await fetchAllUsers(page ? page : currentPage, currentLimit);
        if (response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT.users);
            setTotalPages(response.data.DT.totalPages);
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
        await fetchUsers(+event.selected + 1);
    };

    const handleClickDeleteUser = async (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);

    }

    const handleCloseModal = () => {
        setIsShowModalDelete(false);
    }

    const handleCloseUserModal = () => {
        setShowModalUser(false);
    }

    const handleConfirmDeleteUser = async () => {
        let response = await deleteUser(dataModalDelete);
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.data.EM);
        }
    }

    const handleClickEditUser = (user) => {
        setShowModalUser(true);
        setDataModalUser(user);
        setActionModalUser("UPDATE");
        console.log(">>>check update user: ", user);
    }

    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table Users</h3>
                        </div>
                        <div className="actions my-3">
                            <button className="btn btn-success me-3">Refresh</button>
                            <button className="btn btn-primary" onClick={() => setShowModalUser(true)}>Add new user</button>

                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        < button type="button" className="btn btn-primary mx-3" onClick={() => handleClickEditUser(item)}>   <i className="fas fa-edit"></i></button>
                                                        < button type="button" className="btn btn-danger" onClick={() => handleClickDeleteUser(item)}>   <i className="fa-solid fa-trash"></i></button>

                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }}>Not found users</td>
                                    </tr>

                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="user-footer">
                        <ReactPaginate
                            activeClassName={'item active '}
                            breakClassName={'item break-me '}
                            className={'pagination justify-content-center'}
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                            pageClassName={'item pagination-page '}
                        />
                    </div>
                </div>
            </div>
            <ModalDelete show={isShowModalDelete}
                handleClose={handleCloseModal}
                handleConfirmDelete={handleConfirmDeleteUser}
                dataModal={dataModalDelete} />
            <ModalUser
                onHide={handleCloseUserModal}
                show={isShowModalUser}
                action={actionModalUser}
                dataModalUser={dataModalUser}

            />
        </>
    )
}

export default Users