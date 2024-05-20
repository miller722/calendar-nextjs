"use client";

import { useRouter } from "next/navigation";
import { Button, Layout, Menu, Row } from "antd";
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
                <Row justify="end" align="middle">
                    <div style={{ color: "white", fontSize: "18px", marginRight: "20px" }}>NextJS</div>
                    {AuthStore.isAuth ? (
                        <Button type="primary" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Link href="/login">
                            <Button type="primary">Login</Button>
                        </Link>
                    )}
                </Row>
            </Layout.Header>
        </Layout>
    );
})

export default Navigation;
