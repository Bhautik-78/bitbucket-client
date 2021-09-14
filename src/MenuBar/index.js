import React from 'react';
import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import image from "../Assets/image/a98490118604e78b4d9cd50331eb8ea9.jpg"
import "./menubar.css"

const {Header} = Layout;

const MenuBar = () => {
    return (
        <Layout className="layout">
            <Header>
                <div>
                    <img className="logo" src={image} height={64} width={120}/>
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
                    <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="setting"><Link to="/setting">Setting</Link></Menu.Item>
                </Menu>
            </Header>
        </Layout>
    )
};

export default MenuBar;
