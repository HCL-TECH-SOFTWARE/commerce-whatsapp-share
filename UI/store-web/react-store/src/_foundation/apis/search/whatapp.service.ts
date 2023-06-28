/**
*==================================================

Copyright [2023] [HCL America, Inc.]

 Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*==================================================
**/
//Foundation libraries
import Axios, { AxiosPromise, AxiosRequestConfig } from "axios";

const preUrl = "https://commerce-preview.sbx0274.play.hclsofy.com"
 const postBodyWhatsApp = (bodyObj:any) =>{
    const{template_name,preUrlCheck,productImage,reciverNumber,bodyText} = bodyObj
    const header_image = preUrlCheck ? `${preUrl}${productImage}` : productImage
    return {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": `91${reciverNumber}`,
    "type": "template",
    "template": {
        "name": template_name,
        "language": {
            "code": "en_US"
        },
        "components": [
            {
                "type": "header",
                "parameters": [
                    {
                        "type": "image",
                        "image": {
                            "link": header_image,
                        }
                    }
                ]
            },
            {
                "type": "body",
                "parameters": bodyText
            }
        ]
    }
}
}



const whatsappService = { 
  whatsappHandler(bodyObj):AxiosPromise<any> { 
    // const { searchTerm } = body;
    const bearerToken = "Bearer EAAI0DroUw0gBAIv4kmsUBa5S7pe0Nvt1OXrZBFwQIAwBJyeuMcSYnwTsI4q4Cr0gmeB6l1djZC1mrjkDVqA0FUdeRkJIUox8sGlu6fxNyKfNahakRTJ9rMLBWKqRFWwcZAWGWJMZCpFIOuEf1RZBowmsTOFnC3EMb7Ng2ClXakVhlNU4MlGLnQUx1T4iZAuR6bxpi4aEGjM8hfUNOH8UhJW1YA3ZAOe7CkZD"
    const requestOptions: AxiosRequestConfig = Object.assign({
      url: "https://graph.facebook.com/v16.0/111028415326178/messages",
      method: "post",
      data: postBodyWhatsApp(bodyObj),
      headers : {
        Authorization:bearerToken,
        Accept:"application/json"
      }
    });  
    return Axios(requestOptions);
  }
};

export default whatsappService;