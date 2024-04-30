import LoginForm from "@/components/LoginForm";
import { Card, Layout, Row } from "antd";



export default function Login() {
    return (
        <>
            <Layout>
                <Row justify="center" align="middle" className="h100">
                    <Card>
                        <LoginForm />
                    </Card>
                </Row>
            </Layout>

        </>
    );
}
