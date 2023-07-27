import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PRODUCT } from "../constants/page-paths.constants";



const BasicLayout: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/' + PRODUCT.LIST);
        }
    }, []);
    return (
        <Layout>
            <Content
                style={{
                    padding: '1rem'
                }}
            >
                <Outlet />
            </Content>
        </Layout>
    )
}

export default BasicLayout;