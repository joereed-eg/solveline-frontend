import { IReviewsRatingList } from "./providerServicesInterface";

export interface IAppointmentInitialState {
  appointmentList: IAppointmentData;
  appointmentListLoader:boolean;
  viewAppontmentData:IAppointmentList;
  viewAppontmentLoader:boolean;
  rescheduleAppontmentSuccess:boolean;
  rescheduleAppontmentLoader:boolean;
  feedbackLoader:boolean;
  ratingListLoader:boolean;
  ratingList:IReviewsRatingList;
}

export interface IRescheduleAppontment {
  appointment_datetime: any;
  id:string
}
export interface IAppointmentPaylod {
  search?: string;
  page?: number;
  startDate?:string,
  endDate?:string,
  date_range?:string[];
}

export interface IRaiseDispute {
  appointment_id: number;
  dispute_note: string;
}

export interface IService {
  sn_label: number | null;
  id: number | null;
  provider_id: number | null;
  title: string;
  description: string;
  youtube_link: string;
  basic_price: number | null;
  intermediate_price: number | null;
  advance_price: number | null;
  ratings: number | null;
  images: Image[];
}

export interface Image {
  file_link: string;
}

export interface IProvider {
  id: number | null;
  name: string;
  profile_image: string | null;
  ratings: string;
}

export interface IConsumer {
  id: number | null;
  name: string;
  profile_image: string | null;
  ratings: number | null;
}
export interface IOreder {
    id: number | null;
    tax_amount: string,
    total_amount: string
}

export interface IAppointmentList {
  id: any;
  service: IService;
  provider: IProvider;
  consumer: IConsumer;
  appointment_time: string;
  appointment_time_label: string;
  status: string;
  has_dispute_raised: boolean;
  is_rating_allowed: boolean;
  is_raise_dispute_allowed:boolean;
  is_reschedule_booking_allowed:boolean;
  status_label: string;
  order?:IOreder;
 
  dispute?:IDispute
}
export interface IDispute {
  dispute_note:string;
  status:string;
  created_at:string;
}
export interface IPagination {
  total_count: number;
  current_page:number;
  last_page:number;
  per_page:number;
  nextPage:number;
  hasMorePage:boolean;
  path:string;
}
export interface IAppointmentData {
   data:IAppointmentList[];
   meta_params:IPagination
}


export interface IGivFeedback{
  appointment_id: number;
  value: string;
  description: string;
}
export interface IFeedbackListPaylod{
  page: number;
   id:any;
}
