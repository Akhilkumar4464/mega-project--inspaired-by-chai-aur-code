import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";
export class authService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount(name, email, password) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (useraccount) {
        // console.log(useraccount);
        return this.login({ email, password });
      } else {
        return null;
      }
    } catch (error) {
      console.error( "create account error" , error);
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error( " login error", error);
    }
  }

   async getCurrentUser (){
    try {
        return await this.account.get()
   } catch (error) {
    console.error(" get account error ",error );
    }

    return null;
   
}

  async logout() {
    try {
        return await this.account.deleteSessions();
        } catch (error) {
            console.error( " logout error", error);
            }
            }
}

const AuthService = new authService();
export default AuthService;
