"use client";

import { useRouter } from "next/navigation";
import { Layout, Menu, Row } from "antd";
import { observer } from "mobx-react-lite";
import AuthStore from "./store/AuthStore";
import Link from "next/link";

const Navigation = observer(() => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await AuthStore.logout();
            if (!AuthStore.isAuth) {
                router.push("/login");
            }
        } catch (error) {
            console.error("Ошибка входа в систему:", error);
        }
    };
    return (
        <Layout>
            <Layout.Header>
                <Row justify="end">
                    <div style={{ color: "white", fontSize: "18px" }}>NextJS</div>
                    <Menu theme="dark" mode="horizontal">
                        {AuthStore.isAuth ? (
                            <Menu.Item key={1}><a onClick={handleLogout}>Logout</a></Menu.Item>
                        ) : (
                            <Menu.Item key={1}><Link href="/login">Login</Link></Menu.Item>
                        )}
                    </Menu>
                </Row>
            </Layout.Header>
        </Layout>
    );
})

export default Navigation;
