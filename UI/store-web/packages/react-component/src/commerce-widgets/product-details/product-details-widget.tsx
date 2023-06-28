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

 import React, { useMemo } from "react";
 import { Link } from "react-router-dom";
 import HTMLReactParser from "html-react-parser";
 //UI
 import { StyledGrid, StyledPDPContainer, StyledTypography, StyledButton, StyledTabs } from "../../elements";
 import { ProductAttributes } from "../../components/product-attributes";
 import { ChipAd } from "../../components/ribbon-ad";
 import { ProductQuantity } from "../../components/product-quantity";
 import { ProductThumbnails } from "../../components/product-thumbnails";
 import Hidden from "@mui/material/Hidden";
 import { get } from "lodash-es";
 import { ProductImage } from "../../components";
 import { Modal } from "react-responsive-modal";
 import TextField from '@mui/material/TextField';
 import WhatsAppIcon from '@mui/icons-material/WhatsApp';
 
 interface ProductDetailsWidgetProps {
   seller: any;
   productPartNumber: any;
   product: any;
   showCarousel: boolean;
   carouselImages: any;
   formatCurrency:string;
   errorWhatsApp:string;
   setErrorWhatsApp:()=> void;
   handleWhatsAppCall:() => void;
   changeMainImage: (index: number) => void;
   index: number;
   displayFullImage: string;
   displayName: string;
   displayPartNumber: string;
   displayShortDesc: string;
   promotion: any;
   displayOfferPrice: number;
   displayListPrice: number;
   definingAttrList: any;
   skuColor: string;
   onAttributeChange: (id: string, value: string) => void;
   currentSelection: any;
   updateProductQuantity: (n: number) => void;
   availability: any;
   addToCart: () => void;
   inventoryAvailableFlag: boolean;
   buyableFlag: boolean;
   productDetailTabsChildren: any;
   translation: any;
   formattedPriceDisplayOffer: any;
   formattedPriceDisplayList: any;
   formattedPriceDisplayNull: any;
   loginStatus: boolean;
   isB2B: boolean;
   isSharedOrder: boolean;
   SIGNIN: string;
   addToRLButton: any;
   addToWLButton: any;
 }
 
 export const ProductDetailsWidget: React.FC<ProductDetailsWidgetProps> = (props: any) => {
   const {
     seller,
     productPartNumber,
     product,
     showCarousel,
     carouselImages,
     changeMainImage,
     index,
     displayFullImage: fullImage,
     displayName,
     displayPartNumber,
     displayShortDesc,
     promotion,
     displayOfferPrice,
     displayListPrice,
     definingAttrList,
     skuColor,
     onAttributeChange,
     currentSelection,
     updateProductQuantity,
     availability,
     addToCart,
     inventoryAvailableFlag,
     buyableFlag,
     productDetailTabsChildren,
     translation,
     formattedPriceDisplayOffer,
     formattedPriceDisplayList,
     formattedPriceDisplayNull,
     loginStatus,
     isB2B,
     isSharedOrder,
     SIGNIN,
     addToRLButton,
     addToWLButton,
     ribbonFinder,
     handleWhatsAppCall,
     formatCurrency,
   } = props;
 
   const ribbonAds = ribbonFinder(currentSelection.sku[currentSelection.index] ?? product);
   // for each sku, an object that represents its attributes, e.g.,
   // [
   //   sku1 --> { Color: "blue", Size: "48x48x48" },
   //   sku2 --> { Color: "red",  Size: "52x52x52" }
   // ]
   const skusAsAttrs = useMemo(() => {
     return (product?.items ?? []).map((p) => {
       const rc = {};
       p.attributes
         ?.filter(({ usage: u }) => u === "Defining")
         .forEach((a) => (rc[a.identifier] = get(a, "values[0].identifier")));
       return rc;
     });
   }, [product]);
 
   const [open, setOpen] = React.useState(false);
   const [infoWhatsapp, setInfoWhatsapp] = React.useState({
        sender : "",
        phoneNumber: ""
   })
   const selectedProduct = currentSelection?.sku[currentSelection?.index]?.attributes
   console.log('selected', selectedProduct)
   const attributeString = (arr:any[]) =>{
     let attributeList:string =""
     if(selectedProduct){
      let attributeList:any = "";
       arr.forEach((item, ind) => {
        const seprator = arr.length-1 === ind ? '' : ",";
        attributeList +=`${item.name} ${item.values[0].value}${seprator}`
     });
     return attributeList
   }
    return "N/A";
   }
   const whatsAppParam = [
     {
       "type" : "text",
       "text" : infoWhatsapp.sender
     },
     {
         "type": "text",
         "text": displayName
     },
     {
       "type": "text",
       "text": displayPartNumber
   },
   {
     "type": "text",
     "text": formatCurrency
   },
   {
     "type": "text",
     "text":  attributeString(selectedProduct)
   }
   ]
 
  const bodyObj = {
     template_name:"hclc_pdp_details",
     preUrlCheck: true,
     productImage: fullImage,
     reciverNumber: infoWhatsapp.phoneNumber,
     bodyText: whatsAppParam,
  }
 
   const handleClose = () => {
     setOpen(false);
     setInfoWhatsapp({sender:'', phoneNumber:''})
   };
 
   const handleOpenModal = () => {
     setOpen(true);
   };
 
   const setInfoHandler =(e:any)=>{
     setInfoWhatsapp(prev => ({...prev, [e.target.name]: e.target.value}))
   }
 
   const watsappServiceHandler = () =>{
          handleWhatsAppCall(bodyObj, handleClose)
   }
 
   return (
     <>
       {productPartNumber && product && (
         <StyledPDPContainer
           itemScope
           itemType="http://schema.org/Product"
           id={`product-image-details_${productPartNumber}`}>
           <StyledGrid container>
             <StyledGrid container spacing={2} item xs={12}>
               {showCarousel ? (
                 <>
                   <StyledGrid item xs={12} md={1}>
                     <ProductThumbnails {...{ imageList: carouselImages, changeMainImage, index }} />
                   </StyledGrid>
                   <Hidden mdDown>
                     <StyledGrid item xs={5} className="product-image">
                       <ProductImage {...{ fullImage, alt: displayName }} />
                     </StyledGrid>
                   </Hidden>
                 </>
               ) : (
                 <StyledGrid item xs={12} md={6} className="product-image">
                   <ProductImage {...{ fullImage, alt: displayName }} />
                 </StyledGrid>
               )}
               <StyledGrid item xs={12} md={6}>
                 {displayName && (
                   <StyledTypography variant="h4" itemProp="name" className="product-name">
                     {displayName}
                   </StyledTypography>
                 )}
                 {displayPartNumber && (
                   <StyledTypography variant="body2" className="product-sku">
                     {translation.productDetailSKU}: {displayPartNumber}
                   </StyledTypography>
                 )}
                 {displayShortDesc && (
                   <StyledTypography variant="body1" itemProp="description" className="product-shortDescription">
                     {displayShortDesc}
                   </StyledTypography>
                 )}
                 {promotion && (
                   <StyledTypography
                     variant="body2"
                     id={`product_advertisement_${productPartNumber}`}
                     className="product-promo"
                     gutterBottom>
                     {promotion}
                   </StyledTypography>
                 )}
                 {ribbonAds.length ? (
                   <div className="bottom-margin-2">
                     {ribbonAds.map((ribbon, i) => (
                       <ChipAd key={i} {...ribbon} />
                     ))}
                   </div>
                 ) : null}
                 <div>
                   {product.type !== "bundle" && (
                     <>
                       <StyledTypography variant="h5" className="product-price-container">
                         {displayOfferPrice > 0 && <span className="product-price">{formattedPriceDisplayOffer}</span>}
                         {displayOfferPrice > 0 && displayOfferPrice < displayListPrice && (
                           <span id={`product_price_${productPartNumber}`} className="strikethrough">
                             {formattedPriceDisplayList}
                           </span>
                         )}
                         {displayOfferPrice === 0 && (
                           <span id={`product_offer_price_${productPartNumber}`}>{formattedPriceDisplayNull}</span>
                         )}
                       </StyledTypography>
                       {definingAttrList?.length > 0 && (
                         <ProductAttributes
                           skusAsAttrs={skusAsAttrs}
                           skuColor={skuColor}
                           attributeList={definingAttrList}
                           currentSelection={currentSelection}
                           onChangeHandler={onAttributeChange}
                         />
                       )}
                       <>
                         <StyledTypography variant="body2" className="product-quantity">
                           {translation.productDetailQuantity}
                         </StyledTypography>
                         <ProductQuantity
                           updateProductQuantity={updateProductQuantity}
                           value={currentSelection.quantity}
                         />
                         {availability?.length > 0 && (
                           <>
                             <StyledTypography variant="body2" className="product-availability">
                               {translation.productDetailAvailability}
                             </StyledTypography>
                             <StyledTypography variant="body1" component="div">
                               {availability.map((e: any) => (
                                 <div
                                   key={`inventoryDetails_div_${e.onlineStoreId || e.physicalStoreId}_${e.partNumber}`}>
                                   {e.inventoryStatus ? (
                                     <StyledTypography
                                       key={`inStock_div_${e.partNumber}`}
                                       className="vertical-margin-1"
                                       id={`product_availability_status_inStock_${productPartNumber}`}>
                                       {e.physicalStoreId
                                         ? HTMLReactParser(translation.CommerceEnvironmentinventoryStoreStatusAvailable)
                                         : HTMLReactParser(translation.CommerceEnvironmentinventoryStatusAvailable)}
                                     </StyledTypography>
                                   ) : (
                                     <StyledTypography
                                       key={`outOfStock_div_${e.partNumber}`}
                                       className="vertical-margin-1"
                                       id={`product_availability_status_outOfStock_${productPartNumber}`}>
                                       {e.physicalStoreId
                                         ? HTMLReactParser(translation.CommerceEnvironmentinventoryStoreStatusOOS)
                                         : HTMLReactParser(translation.CommerceEnvironmentinventoryStatusOOS)}
                                     </StyledTypography>
                                   )}
                                 </div>
                               ))}
                             </StyledTypography>
                           </>
                         )}
                         {seller ? <div>{seller}</div> : null}
                         <StyledGrid
                           container
                           spacing={1}
                           alignItems="center"
                           className="button-combo product-add-to-cart">
                           <StyledGrid item xs={12} sm="auto">
                             <StyledButton
                               testId={`product_add_to_cart_${productPartNumber}`}
                               color="primary"
                               size="small"
                               id={`product_add_to_cart_${productPartNumber}`}
                               {...(!isB2B || loginStatus
                                 ? {
                                   onClick: addToCart,
                                   disabled: !inventoryAvailableFlag || !buyableFlag || !displayOfferPrice,
                                 }
                                 : { component: Link, to: SIGNIN })}>
                               {!isB2B
                                 ? translation.productDetailAddToCart
                                 : !loginStatus
                                   ? translation.productDetailSignIn
                                   : isSharedOrder
                                     ? translation.productDetailaddToSharedOrder
                                     : translation.productDetailaddToCurrentOrder}
                             </StyledButton>
                           </StyledGrid>
                           {loginStatus ? (
                             <StyledGrid item xs={12} sm="auto" className="bottom-margin-1">
                               {isB2B ? addToRLButton : addToWLButton}
                             </StyledGrid>
                           ) : null}
                         </StyledGrid>
                         <StyledTypography variant="body1" component="div">
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
                             <StyledTypography component="h2" className = "whatsapp-heading">
                               Share Whatsapp Number 
                             </StyledTypography>
                             <p>
                             <TextField 
                             id="outlined-basic" 
                             label="Sender's Name" 
                             variant="outlined"
                             name="sender"
                             defaultValue={infoWhatsapp.sender}
                             type="text"
                             style={{width:"100%"}}
                             onChange={(e)=>setInfoHandler(e)}
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
                             style={{width:"100%"}}
                             onChange={(e)=>setInfoHandler(e)}
                              />
                             </p> 
                             <StyledButton
                              style={{width:"100%"}}
                              disabled ={infoWhatsapp.sender && infoWhatsapp.phoneNumber.length === 10 ? false : true}
                              onClick={watsappServiceHandler}>Send</StyledButton>
                            </StyledTypography>  
                              
                         </Modal>
                       </>
                     </>
                   )}
                 </div>
               </StyledGrid>
             </StyledGrid>
             <StyledGrid item xs={12}>
               {productDetailTabsChildren?.length > 0 && (
                 <StyledTabs
                   key={currentSelection.sku.partNumber}
                   // adding key here to make sure tab is full re-rendered
                   //with new local state value according to different sku
                   childrenList={productDetailTabsChildren}
                   name="productDetails"
                 />
               )}
             </StyledGrid>
           </StyledGrid>
         </StyledPDPContainer>
       )}
     </>
   );
 };
 