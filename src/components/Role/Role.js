import { useEffect, useState } from "react";
import "./Role.scss";
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {toast} from "react-toastify";
import {createRoles} from "../../services/roleService";
const Role=()=>{

    const dataChildDefault={
        url:'',
        description:'',
        isValidUrl:true}
    
    const [listChilds,setListChilds]=useState({
        child1:dataChildDefault
    });



    const handleOnChangeInput=(name,value,key)=>{
        let _listChilds=_.cloneDeep(listChilds);
        _listChilds[key][name]=value;
        if (value&&name==='url'){
            _listChilds[key]['isValidUrl']=true;
        }
        setListChilds(_listChilds);
    }

    const handleAddNewInput=()=>{
        let _listChilds=_.cloneDeep(listChilds);
        _listChilds[`{child-${uuidv4()}}`]={
            url:'',
            description:'',
            isValidUrl:true
        };
        setListChilds(_listChilds);
    }

    const handleDeleteInput=(key)=>{
        let _listChilds=_.cloneDeep(listChilds);
        delete _listChilds[key];
        setListChilds(_listChilds); 
        console.log(key);
    }

    const handleSave=async()=>{
        console.log(listChilds);
        let invalidObj=  Object.entries(listChilds).find(([key,child],index)=>{
           return child&&!child.url;
        });
       

        if (!invalidObj){
            //call api
            let data=buildDataToPersist();
            console.log(">>> check data to build: ",data);
            let res=await createRoles(data);
            if (res&&res.EC===0){
                toast.success(res.EM);
            }
        }
        else {
            //error
            toast.error("Url must not be empty!");
            let _listChilds=_.cloneDeep(listChilds);
            const key =invalidObj[0];
            _listChilds[key]['isValidUrl']=false;
            setListChilds(_listChilds);
        }
    }

    const buildDataToPersist=()=>{
        let _listChilds=_.cloneDeep(listChilds);
        const result=[];
        Object.entries(listChilds).map(([key,child],index)=>{
            result.push({
                url:child.url,
                description:child.description
            })
    });
    return result;
}
    return (
    <>
    <div className="role-container">
        <div className="container">
            <div className ="row">
                <div className ="title-role">
                    <h3 className="mt-3">Add a new Role</h3>
                </div>
                <div className="role-parent">{
                      Object.entries(listChilds).map(([key,child],index)=> {
                        return (
                            <div className="row role-child" key={`child-${key}`}>
                            <div className={`col-5 form-group ${key}`}>
                                <label>URL:</label>
                                <input type="text" 
                                className={child.isValidUrl?"form-control":"form-control is-invalid"} 
                                value={child.url} 
                                onChange={(event)=>handleOnChangeInput('url',event.target.value,key)}></input>
                            </div>
                            <div className="col-5 form-group">
                                <label>Description:</label>
                                <input type="text" 
                                className="form-control"
                                  value={child.description} 
                                  onChange={(event)=>handleOnChangeInput('description',event.target.value,key)}></input>
                            </div>
                            <div className="col-2 mt-4 actions">
                            <i className="fa fa-plus-circle add"
                            onClick={()=>handleAddNewInput()}></i>
                            {index>=1&&
                            <i className="fa fa-trash-o delete"
                            onClick={()=>{
                                handleDeleteInput(key)
                            }}></i>
                            }
                            </div>
                            </div>
                        )
                    })
                    }
                  
                    <div>
                        <button className="btn btn-warning mt-3"
                        onClick={()=>handleSave()}>Saves</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default Role;