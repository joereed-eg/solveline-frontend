import { IAppointmentInitialState } from "@/types/appointmentInterface";
import {
  AppointmentActionTypes,
  AppointmentActions,
} from "../action-types/appointmentActionTypes";

const initialState: IAppointmentInitialState = {
  appointmentList: {
    data: [],
    meta_params: {
      current_page: 0,
      last_page: 0,
      path: "",
      per_page: 0,
      total_count: 0,
      hasMorePage: false,
      nextPage: 0,
    },
  },
  appointmentListLoader: false,
  viewAppontmentData: {
    appointment_time: "",
    appointment_time_label: "",
    is_raise_dispute_allowed: false,
    consumer: {
      id: null,
      name: "",
      profile_image: "",
      ratings: null,
    },
    status: "",
    has_dispute_raised: false,
    is_rating_allowed: false,
    is_reschedule_booking_allowed: false,
    status_label: "",
    id: null,
    provider: {
      id: null,
      name: "",
      profile_image: "",
      ratings: "",
    },
    service: {
      sn_label: null,
      id: null,
      provider_id: null,
      title: "",
      description: "",
      youtube_link: "",
      basic_price: null,
      intermediate_price: null,
      advance_price: null,
      ratings: null,
      images: [],
    },
    order: {
      id: null,
      tax_amount: "",
      total_amount: "",
    },
  },
  ratingList: {
    data: [],
    meta_params: {
      current_page: 0,
      last_page: 0,
      path: "",
      per_page: 0,
      total_count: 0,
      hasMorePage: false,
      nextPage: 0,
    },
  },
  viewAppontmentLoader: false,
  rescheduleAppontmentSuccess: false,
  rescheduleAppontmentLoader: false,
  feedbackLoader: false,
  ratingListLoader: false,
};

export default function appointmentReducer(
  state = initialState,
  action: AppointmentActionTypes
): IAppointmentInitialState {
  switch (action.type) {
    case AppointmentActions.SET_APPOINTMENT_LIST: {
      const { data, meta_params } = action.payload;
      const concatenatedData = [...state.appointmentList.data, ...data];

      return {
        ...state,
        appointmentList: {
          data: concatenatedData,
          meta_params: {
            ...state.appointmentList.meta_params,
            ...meta_params,
          },
        },
      };
    }
    case AppointmentActions.RESET_APPOINTMENT_LIST: {
      return {
        ...state,
        appointmentList: action.payload,
      };
    }
    case AppointmentActions.APPOINTMENT_LIST_LOADER: {
      return {
        ...state,
        appointmentListLoader: action.payload,
      };
    }
    case AppointmentActions.SET_VIEW_APPONTMENT: {
      return {
        ...state,
        viewAppontmentData: action.payload,
      };
    }
    case AppointmentActions.VIEW_APPONTMENT_LOADER: {
      return {
        ...state,
        viewAppontmentLoader: action.payload,
      };
    }
    case AppointmentActions.RESCHEDULE_APPONTMENT_LOADER: {
      return {
        ...state,
        rescheduleAppontmentLoader: action.payload,
      };
    }
    case AppointmentActions.RESCHEDULE_APPONTMENT_SUCCESS: {
      return {
        ...state,
        rescheduleAppontmentSuccess: action.payload,
      };
    }
    case AppointmentActions.SET_FEEDBACK_LOADER: {
      return {
        ...state,
        feedbackLoader: action.payload,
      };
    }
    case AppointmentActions.SET_FEEDBACK_LIST: {
      const { data, meta_params } = action.payload;
      const concatenatedData = [...state.ratingList.data, ...data];
      return {
        ...state,
        ratingList: {
          data: concatenatedData,
          meta_params: {
            ...state.ratingList.meta_params,
            ...meta_params,
          },
        },
      };
    }
    case AppointmentActions.RESET_FEEDBACK_LIST: {
      return {
        ...state,
        ratingList: action.payload,
      };
    }
    case AppointmentActions.SET_FEEDBACK_LIST_LOADER: {
      return {
        ...state,
        ratingListLoader: action.payload,
      };
    }
    case AppointmentActions.UPDATE_FEEDBACK: {
      const { appointments_id, is_rating_allowed } = action.payload;
      const updatedData = state.appointmentList.data.map((appointment) => {
        if (appointment.id === appointments_id) {
          return {
            ...appointment,
            is_rating_allowed: is_rating_allowed,
          };
        }
        return appointment;
      });
      return {
        ...state,
        appointmentList: {
          ...state.appointmentList,
          data: updatedData,
        },
      };
    }

    default:
      return state;
  }
}
