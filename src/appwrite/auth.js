import { Client, Account, ID} from "appwrite";
import { APPWRITE_PROJECT_ID, APPWRITE_PROJECT_URL } from "../envConfig";
import appwriteService from "./config";

class Auth{
    client = new Client
    account;

    constructor (){
        this.client
            .setEndpoint(APPWRITE_PROJECT_URL)
            .setProject(APPWRITE_PROJECT_ID)
        this.account = new Account(this.client)
    }

    async getLogged (){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("error while getting logged user ", error)
        }
    }

    async createUser ({email, password, name}) {
       try {
        const user = await this.account.create(
            ID.unique(),
            email,
            password,
            name
        )
        if(user){
            await appwriteService.createCart(user.$id)
            return await this.login(email, password)
        }
       } catch (error) {
            console.log("error while creating user : ", error)
       }
    }

    async login ({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("error while user login: ", error)
        }
    }

    async logout (){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("error while user logout: ", error)
        }
    }

    async guestLogin () {
        try {
        return this.account.createAnonymousSession()
    
        } catch (error) {
             console.log("error while guest login : ", error)
        }
     }
}

const appwriteAuthService = new Auth()
export default appwriteAuthService

