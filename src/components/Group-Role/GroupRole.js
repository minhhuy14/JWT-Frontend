import "./GroupRole.scss"
import { fetchGroups } from "../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchAllRoles, fetchRolesByGroup } from "../../services/roleService";
import _ from "lodash";
import { assignRolesToGroup } from "../../services/roleService";

const GroupRole = () => {

    const [userGroups, setUserGroups] = useState([]);
    const [selectGroup, setSelectGroup] = useState("");
    const [listRoles, setListRoles] = useState([]);

    const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

    useEffect(() => {
        getGroups();
        getAllRoles();
    }, []);

    const getGroups = async () => {
        let res = await fetchGroups();
        if (res && res.EC === 0) {
            setUserGroups(res.DT);
        }
        else {
            toast.error(res.EM);
        }
    }

    const getAllRoles = async () => {
        let data = await fetchAllRoles();
        if (data && +data.EC === 0) {
            setListRoles(data.DT);
        }
    }


    const handleOnChangeGroup = async (value) => {
        setSelectGroup(value);
        if (value) {
            let response = await fetchRolesByGroup(value);
            console.log("check roles by group: ", response.data);
            if (response && +response.EC === 0) {
                let result = buildDataRolesByGroup(response.data.Roles, listRoles);
                setAssignRolesByGroup(result);
            }
        }
    }

    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = [];
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let obj = {};
                obj.url = role.url;
                obj.id = role.id;
                obj.description = role.description;
                obj.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    obj.isAssigned = groupRoles.some(item => item.url === obj.url)
                }
                result.push(obj);
            })

        }
        return result;
    }

    const handleSelectRole = (value) => {
        const _assignRoleByGroup = _.cloneDeep(assignRolesByGroup);
        let foundIndex = _assignRoleByGroup.findIndex(item => +item.id === +value);
        if (foundIndex > -1) {
            _assignRoleByGroup[foundIndex].isAssigned = !_assignRoleByGroup[foundIndex].isAssigned;
        }
        setAssignRolesByGroup(_assignRoleByGroup);
    }

    const buildDataToSave = () => {
        let result = {};
        const _assignRoleByGroup = _.cloneDeep(assignRolesByGroup);
        result.selectGroup = selectGroup;
        let groupRoles = _assignRoleByGroup.filter(item => item.isAssigned === true);
        let finalGroupRoles = groupRoles.map(item => {
            let data = { groupId: +selectGroup, roleId: +item.id };
            return data;
        }
        );
        console.log("Final group roles: ", finalGroupRoles);
        result.groupRoles = finalGroupRoles;
        return result;
    }
    const handleSave = async () => {
        let data = buildDataToSave();
        console.log("check raw data: ", assignRolesByGroup);
        console.log("send data: ", data);
        let res = await assignRolesToGroup(data);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
    }
    return (
        <div className="group-role-container">
            <div className="container mt-3">
                <h4>Group Role:</h4>
                <div className="assign-group-role">
                    <div className="col-12 col-sm-6 form-group">
                        <label>Group (<span className="red">*</span>)</label>
                        <select className='form-select'
                            onChange={(event) => handleOnChangeGroup(event.target.value)}
                        >
                            <option value="">Please select your group</option>
                            {userGroups.length > 0 && userGroups.map((item, index) => {
                                return (
                                    <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <hr />
                    {
                        selectGroup &&

                        <div className="roles">
                            <h5>Assign Roles:</h5>
                            {
                                assignRolesByGroup && assignRolesByGroup.length > 0
                                && assignRolesByGroup.map((item, index) => {
                                    return (
                                        <div className="form-check" key={`list-role-${index}`}>
                                            <input className="form-check-input"
                                                type="checkbox"
                                                value={item.id}
                                                id={`list-role-${index}`}
                                                checked={item.isAssigned}
                                                onChange={(event) => handleSelectRole(event.target.value)} />
                                            <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                {item.url}
                                            </label>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    }
                    <div className="mt-3">
                        <button className="btn btn-warning" onClick={() => handleSave()}>Save</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GroupRole;