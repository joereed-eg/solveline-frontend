import { IPagination } from "./appointmentInterface";

export interface IProvider {
  service: IProviderService;
}

export interface IImages {
  file_link: string;
}
export interface IProviderService {
  id: number | null;
  provider_id: number | null;
  title: string | null;
  youtube_link: string;
  description: string;
  images: IImages[];
  basic_price: number | null;
  intermediate_price: number | null;
  advance_price: number | null;
  rating: IRatings;
  provider: {
    name: string | null;
    profile_image: string | null;
    image: string;
    rate_unit: string;
  };
}

export interface IservicesMetaParams {
  meta_params: IPagination;
}

export interface ISetSearchHistory {
  name: string | null;
  category: null | string[];
  ratings: null | string[];
  availability: string[];
  start_price: string;
  end_price: string;
}
export interface IProviderServiceDetails {
  name: string;
  id: number;
  specialization: string;
  address: string;
  provider_id: number;
  profile_image: string | null;
  youtube_link: string;
  about_us: string;
  category: string;
  image: string;
  price_typea: string | null;
  rating: IRatings;
  faq: IFaq[];
  feature_resources: [];
  services: IProviderService[];
}
export interface IFaq {
  id: number;
  user_id: number;
  question: string;
  answer: string;
}
export interface IDocument {
  url: string;
}
export interface IRatings {
  count: number;
  average: string;
  list?: IRatingsList[];
}
export interface IRatingFromUser {
  name: string;
}
export interface IRatingsList {
  id: number;
  from_user_id: number;
  to_user_id: number;
  appointments_id: number;
  service_id: number;
  value: string;
  from_user: IRatingFromUser;
  description: string;
  created_at_label: string;
  status: string;
}
export interface IReviewsRatingList {
  data: IRatingsList[];
  meta_params: IPagination;
}
export interface IReviewsRatingUpdate{
  appointments_id: number;
  is_rating_allowed: boolean;
}

export interface IFeatureResources {
  image: string;
  id: number;
  user_id: number;
  youtube_link: string;
  description: string;
  title: string;
  document: IDocument;
}

export interface IAvailabilityDataList {
  id: number;
  user_id: number;
  slot_start_time: string;
  slot_start_time_label: string;
  slot_end_time: string;
  slot_end_time_label: string;
  status: string;
}
