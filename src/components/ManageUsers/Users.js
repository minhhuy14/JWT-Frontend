import { useEffect, useState } from 'react'
import './Users.scss';
import { fetchAllUsers } from '../../services/userService';
import ReactPaginate from 'react-paginate';
const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
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
    return (
        <div className="container">
            <div className="manage-users-container">
                <div className="user-header">
                    <div className="title">
                        <h3>Table Users</h3>
                    </div>
                    <div className="actions">
                        <button className="btn btn-success">Refresh</button>
                        <button className="btn btn-primary">Add new user</button>

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
                            </tr>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 ?
                                <>
                                    {listUsers.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button >
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    <button>

                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    <tr>Not found users</tr>
                                </>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="user-footer">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    )
}

export default Users