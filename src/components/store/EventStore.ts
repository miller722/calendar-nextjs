import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";


export interface IUser {
    username: string;
    password: string;
}

export interface IEvent {
    author: string;
    guest: string;
    date: string;
    description: string;
}
export interface EventState {
    guests: IUser[];
    events: IEvent[];
}

class EventStore {
    guests: IUser[] = [];
    events: IEvent[] = [];


    constructor() {
        makeAutoObservable(this);
    }

    setGuests(guests: IUser[]) {
        this.guests = guests;
    }

    setEvents(events: IEvent[]) {
        this.events = events;
    }

    async fetchGuests() {
        try {
            const response = await axios.get<IUser[]>("./users.json");
            this.setGuests(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    createEvent(event: IEvent) {
        try {
            const events = localStorage.getItem("events") || '[]';
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            console.log("event work OONEE")
            this.setEvents(json);
            localStorage.setItem('events', JSON.stringify(json));
            console.log("event work TWOO")
        } catch (e) {
            console.log(e);
        }
    }
    fetchEvents(username: string) {
        try {
          const events = localStorage.getItem("events") || "[]";
          const json = JSON.parse(events) as IEvent[];
          const currentUserEvents = json.filter(
            (ev) => ev.author === username || ev.guest === username
          );
          this.setEvents(currentUserEvents);
        } catch (e) {
          console.log(e);
        }
      }
    }
    

export default new EventStore()