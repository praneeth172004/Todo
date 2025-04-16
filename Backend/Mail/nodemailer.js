const nodemailer=require("nodemailer")

const transport=nodemailer.createTransport({
    host:"smtp.example.com",
    port:587,
    secure:false,
    auth:{
        user:"praneethmittapalli172004@gmail.com",
        pass:""
    }
})

async function main() {
    const info=await transport.sendMail({
        form:"praneethmittapalli172004@gmail.com",
        to:"sunnypraneeth311977@gmail.com",
        subject:"Hii",
        text:"Hello World",
    })
    console.log("Message Sent:%s",info.messageId);
}

main().catch(console.error);

