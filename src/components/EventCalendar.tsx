import { Calendar } from "antd";
import { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";
import { FC } from "react";

export interface IEvent {
    author: string;
    guest: string;
    date: string;
    description: string;
}

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = observer((props) => {

    function dateCellRender(value: Dayjs) {
        const formatDate = (date: Dayjs): string => {
            const formattedDate = date.format("YYYY.MM.DD");
            return formattedDate;
        }
        const formatedDate = formatDate(value);
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate);
        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>{ev.description}</div>
                )}
            </div>
        );
    }


    return (
        <Calendar dateCellRender={dateCellRender} />
    );
});

export default EventCalendar;
