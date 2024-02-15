import { Client, Databases } from "appwrite";
import {
  APPWRITE_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_URL,
} from "../envConfig";

class Config {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(APPWRITE_PROJECT_URL)
      .setProject(APPWRITE_PROJECT_ID);
    this.database = new Databases(this.client);
  }

  async createProduct(data, slug) {
    console.log(APPWRITE_PROJECT_URL);
    try {
      return await this.database.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        slug,
        data
      );
    } catch (error) {
      console.log("error while creating product : ", error);
    }
  }

  async updateProduct(data, slug) {
    try {
      return await this.database.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        slug,
        data
      );
    } catch (error) {
      console.log("error while updating product : ", error);
    }
  }

  async deleteProduct(slug) {
    try {
      return await this.database.deleteDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("error while deleting product : ", error);
    }
  }

  async getAllProducts() {
    try {
      return await this.database.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID
      );
    } catch (error) {
      console.log("error while getting products : ", error);
    }
  }

  async getProduct(slug) {
    try {
      return await this.database.getDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("error while getting product : ", error);
    }
  }
}

let appwriteService = new Config();
export default appwriteService;
