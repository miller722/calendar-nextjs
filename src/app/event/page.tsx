"use client"

import EventCalendar, { IEvent } from "@/components/EventCalendar";
import EventForm from "@/components/EventForm";
import EventStore from "@/components/store/EventStore";
import { Button, Layout, Modal, Row } from "antd";
import { useState } from "react";


export default function Event() {
    const [modalVisible, setModalVisible] = useState(false);
    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        EventStore.createEvent(event);
    }
    return (
        <div>
            <Layout>
                {JSON.stringify(EventStore.events)}
                <EventCalendar events={EventStore.events} />
                <Row justify="center">
                    <Button
                        onClick={() => setModalVisible(true)}
                    >
                        Add event
                    </Button>
                </Row>
                <Modal
                    title="Add event"
                    visible={modalVisible}
                    footer={null}
                    onCancel={() => setModalVisible(false)}
                >
                    <EventForm
                        submit={addNewEvent}
                    />
                </Modal>
            </Layout>
        </div>
    )
}

