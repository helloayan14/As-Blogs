import {Client,Account,ID  } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
     client = new Client();
     account;
    
     constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteprojectid)
        this.account=new Account(this.client)    

     }
     async createAccount({email,password,name}){
        try {
            const useraccount=await this.account.create(ID.unique(),email,password,name);
            if (useraccount) {
                this.login({email,password})
                
            } else {
               return useraccount   
            }
            
        } catch (error) {
            throw error
            
        }

     }

     async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
            
        } catch (error) {
            throw error
            
        }
     }

     async getcurrentuser(){
        try {
            return await this.account.get()
            
        } catch (error) {
            console.log("appwrite service :: getcurrentuser :: error",error)
            
        }
        return null
     }

     async logout(){
        try {
            return await this.account.deleteSessions();
            
        } catch (error) {
            console.log("appwrite service :: logout :: error",error)
            
        }

     }
}


const authService=new AuthService()

export default authService;
