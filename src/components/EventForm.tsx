"use client";

import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import EventStore from "./store/EventStore";
import AuthStore from "./store/AuthStore";
import dayjs, { Dayjs } from "dayjs";

export interface IEvent {
    author: string;
    guest: string;
    date: string;
    description: string;
}
interface EventFormProps {
    submit: (event: IEvent) => void;
}
const EventCalendar: FC<EventFormProps> = observer(({ submit }) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent);
    const formatDate = (date: Dayjs): string => {
        const formattedDate = date.format("YYYY.MM.DD");
        return formattedDate;
    }

    const selectDate = (date: Dayjs | null) => {
        if (date) {
            const dayjsDate = dayjs(date);
            setEvent({ ...event, date: formatDate(dayjsDate) })
        }
    }
    const submitForm = () => {
        setEvent({ ...event, author: AuthStore.user.username })
        submit(event);
        setEvent({
            author: '',
            date: '',
            description: '',
            guest: ''
        });
    }

    useEffect(() => {
        EventStore.fetchGuests();
        EventStore.fetchEvents(AuthStore.user.username);
    }, []);

    return (
        <>
            <Form onFinish={submitForm}>
                <Form.Item
                    label="Description event"
                    name="description"
                    rules={[{ required: true, message: "Required field!" }]}
                >
                    <Input
                        onChange={e => setEvent({ ...event, description: e.target.value })}
                        value={event.description}
                    />
                </Form.Item>
                <Form.Item label="Date event"
                    name="date"
                    rules={[{ required: true, message: "Required field!" }]}>
                    <DatePicker
                        onChange={(date) => selectDate(date)}
                    />

                </Form.Item>
                <Form.Item
                    label="Select guests"
                    name="guest"
                    rules={[{ required: true, message: "Required field!" }]}
                >
                    <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
                        {EventStore.guests.map(guest =>
                            <Select.Option key={guest.username} value={guest.username}>
                                {guest.username}
                            </Select.Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Row justify="end">
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Row>
                </Form.Item>
            </Form>
        </>
    );
});

export default EventCalendar;
