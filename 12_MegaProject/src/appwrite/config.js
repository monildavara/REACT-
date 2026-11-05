import config from "../Conf/Config";
import {client, Id, Databases, Storage, Query, Client, ID, Query } from "appwrite"

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId);
            this.account = new Account(this.client); 
            this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, context, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    Id,

                }
             )
        } catch (error) {
            console.log("AppWrite serive :: createPost :: error", error);
        }
    }

    async updatePost({title, slug, context, featuredImage, status, userId}){
        try {
            return await this.databases.updatePost(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, 
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("AppWrite serive :: updatePost :: error", error);
        }
    }

    async deletePost({slug}){
        try {
            this.databases.deleteDocumeent(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("AppWrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("AppWrite serive :: getPost :: error", error);
        }
    }

    async getPosts(Query = [Query.equal("status", "Active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                Query,

            )
            
        } catch (error) {
            console.log("AppWrite serive :: getPosts :: error", error);
            return false
        }
    }
    

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("AppWrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("AppWrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service()
export default Service

