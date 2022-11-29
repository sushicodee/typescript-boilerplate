import { cleanEnv,str,port } from "envalid";

function validateEnv():void{
    cleanEnv(process.env,{
        NODE_ENV:str({
            choices:['development','staging','production']
        })
    ,
    MONGO_PATH:str(),
    MONGO_USER:str(),
    MONGO_PASSWORD:str(),
    PORT:port({default:5000})
    })
}

export default validateEnv;