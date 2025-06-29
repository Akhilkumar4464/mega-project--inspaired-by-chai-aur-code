import conf from "../conf.js";
import { client, ID, databases, Storage, Query } from "appwrite";

export class Service {
  client = new client(conf);
  ID;
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = this.client.databases(this.client);
    this.bucket = this.client.storage(this.client);
  }

  async createPost({ title, slug, content, status, featuredImage, user_id }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteProjectId,
        conf.appwriteCollectionId,
        slug,
        {
          title,

          content,

          status,
          featuredImage,
          user_id,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async UpdatePost(slug, { title, content, status, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      console.error("UpdatePosterror", error);
    }
  }

  async deletePost({ slug }) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("deletePosterror", error);
      return false;
    }
  }

  async getPostBySlug(slug) {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("getPostBySlugerror", error);
      return false;
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
      console.error("getPostserror", error);
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
      console.error("uploadFileerror", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId, fileId
    );
      return true;
    } catch (error) {
      console.error("deleteFileerror", error);
      return false;
    }
  }

   async previewFile (fileId) {
   await this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
        return fileId;
    }
}
const service = new Service();

export default Service;
