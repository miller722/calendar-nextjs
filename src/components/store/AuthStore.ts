import axios from "axios";
import {  makeAutoObservable, runInAction } from "mobx";


export interface IUser {
    username: string;
    password: string;
}

class AuthStore {
    isAuth: boolean = false;
    error: string = "";
    isLoading: boolean = false;
    user: IUser = {} as IUser;
    constructor() {
        makeAutoObservable(this);
    }

     async login(username: string, password: string) {

        try {

         setTimeout(async()=> {
            const response = await axios.get<IUser[]>("./users.json");
            const mockUser = response.data.find(user => user.username === username && user.password === password);
            if(mockUser) {
                localStorage.setItem("auth", "true");
                localStorage.setItem("username", mockUser.username);              
                this.user = mockUser;
                runInAction(() => {
                    this.isAuth = true;
                  })
            } else {
                this.error = "Помилка отримання даних користувача"
            }
         }, 500)
        } catch (error) {
            console.error('Помилка отримання даних користувача:', error);
        } finally {
            this.isLoading = false;
        }
    }

    logout() {
        this.user = {} as IUser;
        this.isAuth = false;
    }
}

export default new AuthStore()