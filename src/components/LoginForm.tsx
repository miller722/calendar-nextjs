"use client";

import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation";
import AuthStore from "./store/AuthStore";
import { useState } from "react";


const LoginForm = observer(() => {
    const [username, setUsername] = useState('user1')
    const [password, setPassword] = useState('password1')
    const router = useRouter();
    const submit = async () => {
        await AuthStore.login(username, password);
        if (AuthStore.isAuth) {
            router.push("/event");
            console.log(username, password, "auth good")
        } else {
            console.log("auth ERROR")
        }
    };
    return (
        <>
            <Form onFinish={submit}>
                <Form.Item

                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        value={username} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="Password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input value={[password]} type="password" />
                </Form.Item>
                <Form.Item
                >
                    <Button htmlType="submit">
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
})

export default LoginForm;