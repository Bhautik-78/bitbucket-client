import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Form, Input, message, Button, Table, Popconfirm, Spin} from 'antd';
import {UserOutlined, MailOutlined, ContactsOutlined,} from '@ant-design/icons';
import {Collapse} from 'reactstrap';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {CreateAccount, deleteCustomer, fetchUserAccount, updateCustomer} from "../Action/user";
message.config({top: 50});

const Setting = () => {

    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState({});
    const [collapse, setCollapse] = useState(false);
    const [user, setUser] = useState([]);
    const DeleteText = 'Are you sure to delete this User?';
    const EditText = 'Are you sure to edit this User?';

    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = async () => {
        setLoading(true);
        const res = await fetchUserAccount();
        if (res.data) {
            setLoading(false);
            setUser(res.data)
        } else {
            setLoading(false);
        }
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setDetail({...detail, [name]: value})
    };

    const createAccounts = async () => {
        if(detail && detail._id){
            const {userName, clientKey, secretKey, accessToken, refreshToken, emailId, _id} = detail;
            setLoading(true);
            const response = await updateCustomer({userName, clientKey, secretKey, accessToken, refreshToken, emailId,  _id});
            if (response && response.data) {
                setLoading(false);
                setCollapse(false);
                message.success("customer edit Successfully");
                setDetail({})
                fetchUser()
            } else {
                setLoading(false);
                console.log("Please enter valid data..")
            }
        }else {
            const {userName, clientKey, secretKey, accessToken, refreshToken,  emailId} = detail;
            setLoading(true);
            const res = await CreateAccount({userName, clientKey, secretKey, accessToken, refreshToken,  emailId});
            if (res && res.success) {
                setLoading(false);
                message.success(res.message);
                setDetail({})
                fetchUser()
            } else {
                setLoading(false);
                message.error(res.message);
                setDetail({})
            }
        }
    };

    const confirmEditCustomers = (record) => {
        setDetail(record)
    };

    const confirmDeleteCustomers = async (id) => {
        setLoading(true);
        const deleteId = (id._id);
        const res = await deleteCustomer(deleteId);
        if (res && res.data) {
            setLoading(false);
            fetchUser();
            message.success("customer Delete Successfully")
        } else {
            setLoading(false);
            console.log("Please enter valid data..")
        }
    };

    const columns = [
        {
            width: 30,
            title: 'User Name',
            dataIndex: 'userName',
        },
        {
            width: 40,
            title: 'Client Key',
            dataIndex: 'clientKey',
        },
        {
            width: 40,
            title: 'Secret Key',
            dataIndex: 'secretKey',
        },
        {
            width: 40,
            title: 'Refresh Token',
            dataIndex: 'refreshToken',
        },
        {
            width: 80,
            title: 'access Token',
            dataIndex: 'accessToken',
            ellipsis: true
        },
        {
            width: 40,
            title: 'Email Id',
            dataIndex: 'emailId',
            ellipsis: true
        },
        {
            width: 20,
            title: 'Action',
            render: (record) => {
                return (
                    <span>
              <Popconfirm
                  placement="bottomLeft"
                  title={EditText}
                  onConfirm={() => {
                      confirmEditCustomers(record)
                  }}
                  okText="Yes"
                  cancelText="No"
              >
                <CreateIcon/>
             </Popconfirm>

             <Popconfirm
                 placement="bottomLeft"
                 title={DeleteText}
                 onConfirm={() => {
                     confirmDeleteCustomers(record)
                 }}
                 okText="Yes"
                 cancelText="No"
             >
                <DeleteIcon/>
             </Popconfirm>
          </span>
                )
            }
        },
    ];

    return (
        <div>
            <Spin spinning={loading}>
                <Collapse isOpen={collapse} id="collapseExample">
                    <Row>
                        <Col span={8}/>
                        <Col span={8}>
                            <Card className="cardtop">
                                <h1 className="h2login">User Detail</h1>
                                <Form>
                                    <Form.Item>
                                        <label><b>UserName Name</b></label>
                                        <Input name="userName" value={detail.userName} onChange={handleChange}
                                               placeholder="Enter User Name" addonBefore={<UserOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <label><b>Client Key</b></label>
                                        <Input name="clientKey" value={detail.clientKey} onChange={handleChange}
                                               placeholder="Enter Client Key" addonBefore={<MailOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <label><b>Secret Key</b></label>
                                        <Input name="secretKey" value={detail.secretKey} onChange={handleChange}
                                               placeholder="Enter Secret Key" addonBefore={<UserOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <label><b>Refresh Token</b></label>
                                        <Input name="refreshToken" value={detail.refreshToken} onChange={handleChange}
                                               placeholder="Enter Refresh Token" addonBefore={<UserOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <label><b>Access Token</b></label>
                                        <Input name="accessToken" value={detail.accessToken} onChange={handleChange}
                                               placeholder="Enter Access Token" addonBefore={<ContactsOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <label><b>Email Id</b></label>
                                        <Input name="emailId" value={detail.emailId} onChange={handleChange}
                                               placeholder="Enter Email Id" addonBefore={<MailOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button className="btn-md buttonsubmitlogin" htmlType="submit"
                                                onClick={createAccounts}
                                                type="primary"
                                                size={"large"}>
                                            Create Account
                                        </Button>
                                        <Button className="btn-md buttonsubmitlogin Cancel" htmlType="submit"
                                                onClick={() => setDetail({})}
                                                type="primary"
                                                size={"large"}>
                                            Cancel
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                        <Col span={8}/>
                    </Row>
                </Collapse>
                <Table columns={columns} dataSource={user || []} size="middle"/>
            </Spin>
        </div>
    )
};

export default Setting;
