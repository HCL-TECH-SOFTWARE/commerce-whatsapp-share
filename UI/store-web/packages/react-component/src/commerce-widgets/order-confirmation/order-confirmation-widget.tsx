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

//Foundation Libraries

//UI
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StyledContainer, StyledGrid, StyledIcon, StyledPaper, StyledTypography, StyledButton } from "../../elements";
import { Modal } from "react-responsive-modal";
import TextField from '@mui/material/TextField';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface OrderConfirmationProps {
  isOrderSubmitted: boolean;
  isOrderApproved: boolean;
  isOrderPending: boolean;
  ORDERCONFIRMATION_TITLE: string;
  ORDER_CONFIRMATION_HEADING: string;
  ORDER_CONFIRMATION_PENDING_MSG: string;
  ORDER_NUMBER_MSG: string;
  EMAIL_CONFIMRATION_MSG: string;
  PENDING_DETAILS_MSG: string;
  THANK_YOU_MSG: string;
  handleWhatsAppCall: any;
  errorWhatsApp: string;
  setErrorWhatsApp: () => void;
}

/**
 * Order confirmation widget.
 * For props definition, @see {@link OrderConfirmationProps}.
 * @param props The props for order confirmation widget.
 */
export const OrderConfirmationWidget: React.FC<any> = (props: OrderConfirmationProps) => {
  const {
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
  } = props;


  const [open, setOpen] = React.useState(false);
  const [infoWhatsapp, setInfoWhatsapp] = React.useState({
    sender: "",
    phoneNumber: ""
  })
  const setInfoHandler = (e: any) => {
    setInfoWhatsapp((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const whatsAppParam = [
    {
      "type": "text",
      "text": infoWhatsapp.sender
    },
    {
      "type": "text",
      "text": ORDER_NUMBER_MSG
    },
  ]

  const bodyObj = {
    template_name: "hclc_order_confirmation",
    preUrlCheck: false,
    productImage:"https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f5d90238d241de5544ddac288ff0d8ce/hcl-commerce.png",
    reciverNumber: infoWhatsapp.phoneNumber,
    bodyText: whatsAppParam
  }

  const handleClose = () => {
    setOpen(false);
    setInfoWhatsapp({sender:'', phoneNumber:''})
  };

  const watsappServiceHandler = () => {
    handleWhatsAppCall(bodyObj, handleClose)
  }

  const handleOpenModal = () => {
    setOpen(true);
  };
  
  return (
    <StyledContainer className="page">
      <StyledTypography tabIndex="0" variant="h4" className="vertical-margin-4">
        {ORDERCONFIRMATION_TITLE}
      </StyledTypography>
      <StyledPaper>
        <StyledGrid container direction="column" alignItems="center" className="vertical-margin-15">
          {(isOrderSubmitted || isOrderApproved) && (
            <StyledGrid item>
              <StyledIcon icon={<CheckCircleIcon style={{ fontSize: 75 }} />} iconSize={40} backgroundSize={40} />
            </StyledGrid>
          )}
          <StyledGrid item>
            <StyledTypography variant="h3" align="center" gutterBottom>
              {(isOrderSubmitted || isOrderApproved) && ORDER_CONFIRMATION_HEADING}
              {isOrderPending && ORDER_CONFIRMATION_PENDING_MSG}
            </StyledTypography>
            <StyledTypography variant="h6" align="center" gutterBottom>
              {ORDER_NUMBER_MSG}
            </StyledTypography>
            <StyledTypography variant="body1" align="center" gutterBottom>
              {(isOrderSubmitted || isOrderApproved) && EMAIL_CONFIMRATION_MSG}
              {isOrderPending && PENDING_DETAILS_MSG}
            </StyledTypography>
            <StyledTypography variant="body1" align="center">
              {THANK_YOU_MSG}
            </StyledTypography>
            <StyledTypography className="whatsapp-btn-wrapper" variant="body1" component="div">
              <StyledButton className="whatsapp-icon" onClick={() => handleOpenModal()}>
                <WhatsAppIcon style={{ color: "white" }} />
                Share
              </StyledButton>
            </StyledTypography>
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
                    style={{width:"100%"}}
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
                    style={{width:"100%"}}
                    defaultValue={infoWhatsapp.phoneNumber}
                    type="number"
                    onChange={(e) => setInfoHandler(e)}
                  />
                </p>
                <StyledButton
                style={{width:"100%"}}
                  disabled={infoWhatsapp.sender && infoWhatsapp.phoneNumber.length === 10 ? false : true}
                  onClick={watsappServiceHandler}>Send</StyledButton>
              </StyledTypography>

            </Modal>
          </StyledGrid>
        </StyledGrid>
      </StyledPaper>
    </StyledContainer>
  );
};
