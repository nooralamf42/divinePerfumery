import { Client, Account, ID} from "appwrite";
import { APPWRITE_COLLECTION_ID, APPWRITE_DATABASE_ID, APPWRITE_PROJECT_ID, APPWRITE_PROJECT_URL } from "../envConfig";

class Auth{
    client = new Client
    account;

    constructor (){
        this.client
            .setEndpoint(APPWRITE_PROJECT_URL)
            .setProject(APPWRITE_PROJECT_ID)
        this.account = new Account(this.client)
    }

    async createUser ({email, password, name}) {
       try {
        const user = this.account.create(
            ID.unique(),
            email,
            password,
            name
        )
        if(user){
            return await  this.login(email, password)
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
}