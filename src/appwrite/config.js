import { Client, Databases, ID, Query, Storage} from "appwrite";
import {
  APPWRITE_PRODUCTS_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_PROJECT_ID,
  APPWRITE_PROJECT_URL,
  APPWRITE_CART_COLLECTION_ID,
  APPWRITE_USER_DATA_COLLECTION_ID,
  APPWRITE_BUCKET_ID
} from "../envConfig";

class Config {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(APPWRITE_PROJECT_URL)
      .setProject(APPWRITE_PROJECT_ID);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client)
  }

  async createProduct(data, slug) {
    console.log(APPWRITE_PROJECT_URL);
    try {
      return await this.database.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_PRODUCTS_COLLECTION_ID,
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
        APPWRITE_PRODUCTS_COLLECTION_ID,
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
        APPWRITE_PRODUCTS_COLLECTION_ID,
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
        APPWRITE_PRODUCTS_COLLECTION_ID,
        [Query.limit(5000)]
      );
    } catch (error) {
      console.log("error while getting products : ", error);
    }
  }

  async getProduct(slug) {
    try {
      return await this.database.getDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_PRODUCTS_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("error while getting product : ", error);
    }
  }

  async createCart(slug) {
    try {
      return await this.database.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_CART_COLLECTION_ID,
        slug,
        {
          cartItems: [],
        }
      );
    } catch (error) {
      console.log("error while creating user cart : ", error);
    }
  }

  async addToCart(cartItems, cartItem, userID) {
    try {
      return await this.database.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_CART_COLLECTION_ID,
        userID,
        {
          cartItems:
            cartItems.length > 0
              ? [
                  ...cartItems.map((cartItem) => JSON.stringify(cartItem)),
                  JSON.stringify(cartItem),
                ]
              : [JSON.stringify(cartItem)],
        }
      );
    } catch (error) {
      console.log("error while adding product in cart : ", error);
    }
  }

  async removeFromCart(cartItems, cartItemId, userID) {
    
      let filteredArray = cartItems.filter((item) => 
        (item.$id !== cartItemId))
      
      cartItems = filteredArray.map(v=>JSON.stringify(v))
  

    try {
      return await this.database.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_CART_COLLECTION_ID,
        userID,
        {
          cartItems
        }
      )
    } catch (error) {
      console.log("error while removing product from cart : ", error);
    }
  }

  async getCart(userID) {
    try {
      return await this.database.getDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_CART_COLLECTION_ID,
        userID
      );
    } catch (error) {
      console.log("error while adding product in card : ", error);
    }
  }

  async getUserAddress(userId){
    try {
      return await this.database.getDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_USER_DATA_COLLECTION_ID,
        userId
      )
    } catch (error) {
      console.log('error while getting user address : ', error)
      throw error
    }
  }

  async createUserAddress(data, userId){
    try{
      return await this.database.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_USER_DATA_COLLECTION_ID,
        userId,
        data
      )
    }catch(error){
      console.log('error while creating address : ', error)
      throw Error("Error while creating address")
    }
  }

  async updateUserAddress(data, userId){
    try{
      return await this.database.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_USER_DATA_COLLECTION_ID,
        userId,
        data
      )
    }catch(error){
      console.log('error while updating address : ', error)
      throw Error("Error while updating user address")
    }
  }

  async uploadImage(imageFile){
    try{
      let url = await this.storage.createFile(
        APPWRITE_BUCKET_ID,
        ID.unique(),
        imageFile
      )
      await this.storage.getFilePreview(APPWRITE_BUCKET_ID, url)
    }catch(error){
      console.log('error while uploading image : ', error)
      throw Error("Error while updating image")
    }
  }

}

let appwriteService = new Config();
export default appwriteService;
