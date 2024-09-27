import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import "./ModalUser.scss";
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { fetchGroups } from "../../services/userService";
const ModalUser = ({ title, isShow, handleClose, handleSubmit }) => {

    const [userGroups, setUserGroups] = useState([]);

    const [email, setEmail] = useState({});
    const [phone, setPhone] = useState({});
    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});
    const [address, setAddress] = useState({});
    const [gender, setGender] = useState({});
    const [group, setGroup] = useState({});


    useEffect(() => {
        getGroups();
    }, []);
    const getGroups = async () => {
        let res = await fetchGroups();
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT);
        }
        else {
            toast.error(res.data.EM);
        }

    }
    const handleConfirmDelete = () => {

    }
    return (
        <>
            <Modal show={true} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email address (<span className="red">*</span>)</label>
                            <input className='form-control' type="email" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone number (<span className="red">*</span>)</label>
                            <input className='form-control' type="tel" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Username (<span className="red">*</span>)</label>
                            <input className='form-control' type="text" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Password (<span className="red">*</span>)</label>
                            <input className='form-control' type="password" />
                        </div>
                        <div className="col-12 col-sm-12 form-group">
                            <label>Address</label>
                            <input className='form-control' type="text" />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender</label>
                            <select className="form-select">
                                <option value="Male">Male</option>
                                <option selected value="Female">Female</option>
                                <option value="Other">Oher</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Group (<span className="red">*</span>)</label>
                            <select className="form-select">
                                {userGroups.length > 0 && userGroups.map((item, index) => {
                                    return (
                                        <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirmDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;