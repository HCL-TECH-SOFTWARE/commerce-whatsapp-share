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
//Standard libraries
import React from "react";
import { Navigate } from "react-router-dom";

//Foundation Libraries

//Custom libraries
import * as ROUTES from "../../../constants/routes";

//UI
import { OrderConfirmationWidget } from "@hcl-commerce-store-sdk/react-component";
import { useOrderConfirmation } from "../../../_foundation/hooks/use-order-confirmation";
import whatsappService from "../../../_foundation/apis/search/whatapp.service";

/**
 * Order Confirmation component
 * displays order confirmation info
 * @param props
 */
const OrderConfirmation: React.FC = (props: any) => {
  const {
    orderId,
    isOrderSubmitted,
    isOrderApproved,
    isOrderPending,
    ORDERCONFIRMATION_TITLE,
    ORDER_CONFIRMATION_HEADING,
    ORDER_CONFIRMATION_PENDING_MSG,
    ORDER_NUMBER_MSG,
    EMAIL_CONFIMRATION_MSG,
    PENDING_DETAILS_MSG,
    THANK_YOU_MSG,
  } = useOrderConfirmation();

  const handleWhatsAppCall = async(bodyObj:any[], closeFun:any) =>{
     whatsappService.whatsappHandler(bodyObj)
      .then(()=>{
         closeFun();
      }).catch((e)=>{
        console.log('error:', e)
      })
  }

  const orderDetails = {
    orderId,
    isOrderSubmitted,
    isOrderApproved,
    isOrderPending,
    ORDERCONFIRMATION_TITLE,
    ORDER_CONFIRMATION_HEADING,
    ORDER_CONFIRMATION_PENDING_MSG,
    ORDER_NUMBER_MSG,
    EMAIL_CONFIMRATION_MSG,
    PENDING_DETAILS_MSG,
    THANK_YOU_MSG,
    handleWhatsAppCall,
  };
  return orderId ? <OrderConfirmationWidget {...orderDetails} /> : <Navigate replace to={ROUTES.CART} />;
};

export default OrderConfirmation;
