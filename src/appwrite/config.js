import {Client,ID,Databases,Storage,Query  } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client=new Client()
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteprojectid)

        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title, slug, content, featuredimg, status, userid}){
        try {
            return await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectid,
                slug,
                {
                    title,
                    content,
                    featuredimg,
                    status,
                    userid,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatepost(slug,{title,content,status,featuredimg,}){
    try {
        return await this.databases.createDocument(conf.appwritedatabaseid,conf.appwritecollectid,
            slug,
            {
                title,
                content,
                featuredimg,
                status,
                

            }
        )
        
    } catch (error) {
        console.log("appwrite service :: updatepost :: error",error)
    }    }
 
    async deletepost(slug){
        try {
        await this.databases.createDocument(conf.appwritedatabaseid,conf.appwritecollectid,
            slug
    
        )
        return true
        
        } catch (error) {
        console.log("appwrite service :: deletepost :: error",error)
        return false
        }    }

    async getpost(slug){
        try {
            return this.databases.getDocument(conf.appwritedatabaseid,conf.appwritecollectid,slug)
            
        } catch (error) {
            console.log("appwrite service :: deletepost :: error",error)
            return false
        }
    }
    
    //only actice post as we  used list documents[because it will also give unactive post ]
    async getposts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(conf.appwritedatabaseid,conf.appwritecollectid,
                queries
            )
            
        } catch (error) {
            console.log("appwrite service :: getposts :: error",error)
            return false
            
            
        }

    }

    //file upload service

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file
            )
            
            
        } catch (error) {
            
           
            console.log("appwrite service :: fileupload :: error",error)
            return false
        }
    }

    async deletefile(fileid){
        try {
            await this.bucket.deleteFile(
                conf.appwritebucketid,
                fileid
            )
            return true
        } catch (error) {
            console.log("appwrite service :: deletepost :: error",error)
            return false
            
        }
    }

    getfilepreview(fileid){
        return this.bucket.getFilePreview(
            conf.appwritebucketid,
            fileid,
        )
    }

        
     

}

const service=new Service()

export default service