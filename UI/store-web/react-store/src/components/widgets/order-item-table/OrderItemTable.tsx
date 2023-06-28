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
import React, { useMemo, useState } from "react";
import { Modal } from "react-responsive-modal";
import { StyledButton, StyledTypography } from "@hcl-commerce-store-sdk/react-component";
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";

//Custom libraries
import { useOrderItemTable } from "../../../_foundation/hooks/use-order-item-table";
//HCL SDK
import { CustomTable, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { PAGINATION } from "../../../constants/common";
import whatsappService from "../../../_foundation/apis/search/whatapp.service";

const OrderItemTableComponent = (props: any) => {
  const [open, setOpen] = useState(false);
  const [infoWhatsapp, setInfoWhatsapp] = useState({
    sender: "",
    phoneNumber: ""
  })
  const { miniCartView: c, className: n, outerClassName: oc } = props;
  const { actionData, columns, data, t, labels, detailPanel, panelExpanderComps } = useOrderItemTable(props);
  const className = [n, c ? "mini-cart-table" : "order-item-table"].filter(Boolean).join(" ");
  const outerClassName = c ? "" : oc;
  const paginationData = c
    ? undefined
    : {
      clientSide: true,
      t,
      sizes: PAGINATION.sizes,
      labels: {
        ofTotalCount: "commonTable.ofTotalCount",
      },
    };
  const { i18n } = useTranslation();
  const language = i18n.languages[0];

  const setInfoHandler = (e: any) => {
    setInfoWhatsapp((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClose = () => {
    setOpen(false);
    setInfoWhatsapp({sender:"",phoneNumber:""});
  };

  const whatsAppObj = (arr:any[]) => {
    const finalWhatsAppObj: any[] = [];
    arr.forEach(element => {
      finalWhatsAppObj.push({
        "type": "text",
        "text": element
      })
    });
    return finalWhatsAppObj;
  }
  const whatsAppParamCartHandler = (senderName) => {
    const arrayParam = [senderName];
    return whatsAppObj(arrayParam)
  }
  const whatsAppParamHandler = (
    index:number,
    productTitle:string,
    productSku:string,
    productPrice:string,
    productQuantity:string,
    productColor:string,
    productLink:string
  ) => {
    const arrayParam = [index, productTitle, productSku, productPrice,productQuantity, productColor, productLink]
    return whatsAppObj(arrayParam)
  }
  const bodyObjCart = {
    template_name: "hclc_shopcart",
    preUrlCheck: false,
    productImage:"https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f5d90238d241de5544ddac288ff0d8ce/hcl-commerce.png",
    reciverNumber: infoWhatsapp.phoneNumber,
    bodyText: [{}]
  }

  const bodyObj = {
    template_name: "hclc_shopcart_items",
    preUrlCheck: true,
    productImage: "",
    reciverNumber: infoWhatsapp.phoneNumber,
    bodyText: [{}]
  }

  const attributesWhatsapp = (arr:any[]) => {
    let attributeList:any = "";
    arr.forEach((item:any, ind:any) => {
       const seprator = arr.length-1 === ind ? '' : ",";
       attributeList +=`${item.name} ${item.values[0].value}${seprator}`
    });
   return attributeList;
  }

  console.log('data', data);
  const whatsAppCartHandler = () => {
    bodyObjCart.bodyText = whatsAppParamCartHandler(infoWhatsapp.sender);
    whatsappService.whatsappHandler(bodyObjCart).then(res => console.log('res', res))
    .then((res)=>{
      for(let i=0; i < data.length; i++){
        const attribute = attributesWhatsapp(data[i]?.attributes)
        const{name,partNumber, currency, orderItemPrice} = data[i];
        const productPrice = new Intl.NumberFormat(language, {
          style: 'currency',
          currency: currency
        }).format(orderItemPrice);
        const index = i+1;
        const productLink = "https://www.hcltechsw.com/commerce"
        const quantity = data[i].quantity;
        bodyObj.productImage = data[i].thumbnail;
        bodyObj.bodyText = whatsAppParamHandler(index,name,partNumber,productPrice,quantity,
           attribute, productLink);
        whatsappService.whatsappHandler(bodyObj);
        handleClose()
       }
    }).catch((e)=> console.log('error message',e))
  }

  return (
    <>
      <CustomTable
        {...{
          t,
          labels,
          data,
          columns,
          className,
          detailPanel: c ? null : detailPanel,
          showPanelOnMobile: true,
          outerClassName,
          paginationData,
          panelExpanderComps,
          actionData,
          setOpen
        }}
      />
      <Modal
        classNames={{ root: "speechToText-dialog" }}
        open={open}
        onClose={handleClose}
        showCloseIcon={true}
        center
      >
        <StyledTypography variant="body1" component="div">
          <StyledTypography component="h2" className="whatsapp-heading">
            Share Whatsapp Number
          </StyledTypography>
          <p>
            <TextField
              id="outlined-basic"
              label="Sender's Name"
              variant="outlined"
              name="sender"
              style={{ width: "100%" }}
              defaultValue={infoWhatsapp.sender}
              type="text"
              onChange={(e) => setInfoHandler(e)}
            />
          </p>
          <p>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              defaultValue={infoWhatsapp.phoneNumber}
              type="number"
              style={{ width: "100%" }}
              onChange={(e) => setInfoHandler(e)}
            />
          </p>
          <StyledButton
            style={{ width: "100%" }}
            disabled={infoWhatsapp.sender && infoWhatsapp.phoneNumber.length === 10 ? false : true}
            onClick={whatsAppCartHandler}
          >
            Send
          </StyledButton>
        </StyledTypography>

      </Modal>
    </>
  );
};

export const OrderItemTable = (props) => {
  const WithCTCtx = useMemo(() => withCustomTableContext(OrderItemTableComponent), []);
  return <WithCTCtx {...props} />;
};
