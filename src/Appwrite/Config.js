import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  ID;
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, status, featuredImage, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          slug,
          content,
          status,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("createPost error", error);
      return null;
    }
  }

  async UpdatePost(postId, { title, content, status, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        postId,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("UpdatePost error", error);
      return null;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("deletePost error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return post;
    } catch (error) {
      console.log("getPost error", error);
      return null;
    }
  }
  async getPosts(Queries = [Query.equal("status", "active")]) {
    try {
      const posts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        Queries,
        100,
        0
      );
      return posts;
    } catch (error) {
      console.log("getPosts error", error);
      return [];
    }
  }
  //  file upload

  async uploadFile(file) {
    try {
      const fileUpload = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return fileUpload;
    } catch (error) {
      console.log("uploadFile error", error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("deleteFile error", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      const preview = await this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
      return preview;
    } catch (error) {
      console.log("getFilePreview error", error);
      return null;
    }
  }
}
const service = new Service();

export default service;
