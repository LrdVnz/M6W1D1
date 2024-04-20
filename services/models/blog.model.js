const { Schema, model } = require("mongoose"); 

const readTime = new Schema(
    {
        value: {
            type: Number, 
            required: true
        }, 
        
        unit: {
            type: String, 
            required: true
        }
    }
)

const author = new Schema(
    {
        name: {
            type: String, 
            required: true
        }, 

        avatar: {
            type: String, 
            required: true
        }
    }
)


const blogSchema = new Schema(
    {
        category : {
            type: String, 
            required: true
        },

        title : {
            type: String, 
            required: true
        },

        cover : {
            type: String, 
            required: true
        },

        readTime: {
            type: readTime, 
            required: true
        }, 
        
        author: {
            type: author, 
            required: true
        }, 

        content: {
            type: String, 
            required: true
        }, 

        avatar: {
            type: String, 
            required: false
        }
    }, 

    { 
        collection: "blogs"
    }
); 

module.exports = model("Blog", blogSchema);