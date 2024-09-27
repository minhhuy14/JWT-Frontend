import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import "./ModalUser.scss";
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { fetchGroups, createNewUser } from "../../services/userService";
import _ from 'lodash'

const ModalUser = ({ title, show, onHide }) => {

    const [userGroups, setUserGroups] = useState([]);

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        gender: 'Male',
        group: ''
    };

    const validInputsDefault = {
        email: true,
        username: true,
        password: true,
        phone: true,
        address: true,
        gender: true,
        group: true,
    }
    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    useEffect(() => {
        getGroups();
    }, []);
    const getGroups = async () => {
        let res = await fetchGroups();
        if (res && res.data && res.data.EC === 0) {
            setUserGroups(res.data.DT);
            if (res.data.DT && res.data.DT.length > 0) {
                let groups = res.data.DT;
                setUserData({ ...userData, group: groups[0].id });
            }
        }
        else {
            toast.error(res.data.EM);
        }

    }
    const handleConfirm = async () => {
        let check = checkValidateInputs();
        if (check === true) {
            let res = await createNewUser({ ...userData, groupId: userData['group'] });
            if (res.data && res.data.EC === 0) {
                onHide();
                setUserData({ ...defaultUserData, group: userGroups[0].id });
            }
            else {
                toast.error(`Error create user`);
            }
        }
    }

    const handleOnChangeInput = (name, value) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const checkValidateInputs = () => {
        //create user
        setValidInputs(validInputsDefault);
        let arr = ['email', 'phone', 'username', 'password', 'address', 'gender', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                toast.error(`Empty input ${arr[i]}`);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                check = false;
                break;
            }
        }
        return check;
    }

    return (
        <>
            <Modal show={show} size="lg" onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email address (<span className="red">*</span>)</label>
                            <input className={validInputs.email ? 'form-control' : 'form-control is-invalid'} type="email" value={userData.email}
                                onChange={(event) => handleOnChangeInput("email", event.target.value)} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone number (<span className="red">*</span>)</label>
                            <input className={validInputs.phone ? 'form-control' : 'form-control is-invalid'} type="tel" value={userData.phone}
                                onChange={(event) => handleOnChangeInput("phone", event.target.value)} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Username (<span className="red">*</span>)</label>
                            <input className={validInputs.username ? 'form-control' : 'form-control is-invalid'} type="text" value={userData.username}
                                onChange={(event) => handleOnChangeInput("username", event.target.value)} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Password (<span className="red">*</span>)</label>
                            <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'} type="password" value={userData.password}
                                onChange={(event) => handleOnChangeInput("password", event.target.value)} />
                        </div>
                        <div className="col-12 col-sm-12 form-group">
                            <label>Address</label>
                            <input className={validInputs.address ? 'form-control' : 'form-control is-invalid'} type="text"
                                onChange={(event) => handleOnChangeInput("address", event.target.value)} />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender</label>
                            <select className={validInputs.gender ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput("gender", event.target.value)}>
                                <option defaultValue selected="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Oher</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Group (<span className="red">*</span>)</label>
                            <select className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput("group", event.target.value)}>
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
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;