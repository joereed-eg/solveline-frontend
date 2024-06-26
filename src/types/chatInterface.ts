export interface IChatInitialState {
   acceptQuotationLoader:boolean;
   rejectQuotationLoader:boolean;
   orderStatusUpdateLoader:boolean;
   createChannelLoading:boolean;
   orderStatus:IOrderStatus;
  }
  
  export interface IQuationUpdatePayload {
     status:string;
     id?:string;
     type?:string;
  }
  
  export interface IOrderStatus {
   status?: boolean;
   chat_id?:any;
  }
  
  export interface IFirstMsgSend {
    uuid:string;
  }
  
