import React, {useEffect, useState} from 'react';
import {Button, Col, DatePicker, Input, message, Popconfirm, Row, Select, Space, Spin, Switch, Table, Upload} from "antd";
import {fetchUserAccount} from "../Action/user";
import {fetchAllData, LoadData} from "../Action/bitBucket";
message.config({top: 50});

const BitBucket = () => {

    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState({});
    const [userList, setUserList] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchUser()
    },[]);

    const fetchUser = async () => {
        setLoading(true);
        const res = await fetchUserAccount();
        if (res.data) {
            const result = res && res.data && res.data.map(item => ({
                    userName : item.userName
            }));
            setUserList(result);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDetail({...detail, [name]: value})
    };

    const handleFetchData = async () => {debugger
        const {userName} = detail;
        setLoading(true);
        const response = await fetchAllData({userName});
        if (response && response.success) {
            setLoading(false);
            message.success(response.message);
        } else {
            setLoading(false);
            message.error(response.message);
        }
    };

    const columns = [
        {
            width: 20,
            title: 'User Name',
            dataIndex: 'userName',
        },
        {
            width: 30,
            title: 'Display Name',
            dataIndex: 'displayName',
        },
        {
            width: 40,
            title: 'Account Id',
            dataIndex: 'accountId',
        },
        {
            width: 40,
            title: 'Repo Name',
            dataIndex: 'repoName',
            ellipsis: true
        },
        {
            width: 60,
            title: 'Full Name',
            dataIndex: 'fullName',
            ellipsis: true
        },
        {
            width: 80,
            title: 'Repo Link',
            dataIndex: 'link',
            ellipsis: true
        },
    ];

    const handleLoadData = async () => {
        const {userName} = detail;
        setLoading(true);
        const response = await LoadData({userName});
        if(response.success){
            setLoading(false);
            message.success(response.message);
            setData(response.data)
        }else {
            setLoading(false);
            message.error(response.message);
        }
    };

    return (
        <div className="App">
            <Spin spinning={loading}>
                <Select style={{marginLeft: "80px", marginTop: "35px",  width: "145px"}} defaultValue="Select Application" className="customersDropdown"
                        onChange={value => handleChange({target: {name: "userName", value}})}>
                    <Select.Option value='all'>All</Select.Option>
                    {userList.map(items => (
                        <Select.Option key={items.userName} value={items.userName}>{items.userName}</Select.Option>
                    ))}
                </Select>
                <button type="button" className="btn btn-primary Exports" style={{marginLeft : "30px"}} onClick={handleFetchData}
                        disabled={!detail.userName}>Fetch Data
                </button>
                <button type="button" className="btn btn-primary Exports" style={{marginLeft : "30px"}} onClick={handleLoadData}
                        disabled={!detail.userName}>Load Data
                </button>
                <Table columns={columns} dataSource={data || []} size="middle"/>
            </Spin>
        </div>
    )
};

export default BitBucket;
