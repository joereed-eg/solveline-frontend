import CenterModal from '@/modals/CenterModal';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTable, Row } from 'react-table';
import { OverlayPanel } from 'primereact/overlaypanel';
import { getAppointmentList, getViewAppointment, givFeedback, raiseDispute, rescheduleAppontment, rescheduleAppontmentSuccess, resetAppointmentList } from '@/redux/actions/appointmentActions';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'primereact/calendar';
import { ErrorMessage, Form, Formik } from 'formik';
import { IAppointmentList, IDispute } from '@/types/appointmentInterface';
import { AppState } from '@/redux/types';
import { PulseLoader } from 'react-spinners';
import * as Yup from 'yup';
import { IAppointmentData } from '@/types/appointmentInterface';
import { useInView } from 'react-intersection-observer'
import { Rating } from 'primereact/rating';
import moment from 'moment';
import { toast } from 'react-toastify';
import { MdInfo } from 'react-icons/md';


type Props = {
    columns: any;
    dataList: IAppointmentData;
    welcomePage?: boolean;
    searchQuery?: any;
    dates?: any;
}

const AppointmentTable = (props: Props) => {
    const dispatch = useDispatch()

    const initialAppointmentParams = useMemo(
        () => ({
            page: 1,
        }),
        []
    );
    const viewAppontmentLoader = useSelector((state: AppState) => state.appointmentData.viewAppontmentLoader)
    const rescheduleAppontmentLoader = useSelector((state: AppState) => state.appointmentData.rescheduleAppontmentLoader)
    const appointmentListLoader = useSelector((state: AppState) => state.appointmentData.appointmentListLoader)
    const viewAppontmentData = useSelector((state: AppState) => state.appointmentData.viewAppontmentData)
    const rescheduleAppontmentUpdate = useSelector((state: AppState) => state.appointmentData.rescheduleAppontmentSuccess)
    const feedbackLoader = useSelector((state: AppState) => state.appointmentData.feedbackLoader)
    const currentDate = new Date();
    const currentDateFormat = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");


    const { ref, inView } = useInView({
        threshold: 0,
        initialInView: false
    }
    );


    const { columns, dataList } = props;

 
    const [appointmentListLength, setAppointmentListLength] = useState(0);
    const [pageRequested, setPageRequested] = useState(0);
    const [appointmentParams, setAppointmentParams] = useState(initialAppointmentParams);
    const [scrollValue, setScrollValue] = useState<boolean>(false);

    const [ratingValue, setRatingValue] = useState<any>(0);


    const overlayPonel = useRef<OverlayPanel>(null);
    const [showTooltip, setShowTooltip] = useState(false);

    const [visible, setVisible] = useState(false);
    const [disputeRaisedInfo, setDisputeRaisedInfo] = useState(false);
    const [disputeRaisedInfoList, setDisputeRaisedInfoList] = useState<IDispute>();

    const [rescheduleBooking, setRescheduleBooking] = useState(false);
    const [raiseDisputeModal, setRaiseDisputeModal] = useState(false);
    const [ratingModal, setRatingModal] = useState(false);
    const [appointmentID, setAppointmentID] = useState('');
    const [rescheduleData, setRescheduleData] = useState<Date | null | any>();


    const handleButtonClick = (e: React.MouseEvent) => {
        if (overlayPonel.current) {
            overlayPonel.current.toggle(e);
        }
    };

    useEffect(() => {
        if (!ratingModal) {
            setRatingValue(0)
        }
    }, [ratingModal])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: dataList.data
    });


    const viewAppointmentHandler = (id: string) => {
        dispatch(getViewAppointment(Number(id)))
        setVisible(true)

    }
    const disputeRaisedInfoHandler = (id: string, data: any) => {
        setDisputeRaisedInfo(true)
        setDisputeRaisedInfoList(data)

    }
    const rescheduleBookingModal = (id: string, time: any) => {
        setRescheduleBooking(true)
        setAppointmentID(id)
        setRescheduleData(time)
    }
    const ratingModalShow = (id: string) => {
        setRatingModal(true)
        setAppointmentID(id)
    }
    const raiseDisputeModalHandler = (id: string) => {
        setRaiseDisputeModal(true)
        setAppointmentID(id)
    }

    const resetDataFunction = () => {
        const reqObj = {
            data: [],
            meta_params: {
                current_page: 0,
                hasMorePage: false,
                last_page: 0,
                nextPage: 0,
                path: '',
                per_page: 0,
                total_count: 0,
            }
        };

        dispatch(resetAppointmentList(reqObj));

    };

    // const rescheduleBookingHandler = () => {
    //     console.log(moment(rescheduleData).format("YYYY-MM-DD"), moment(currentDateFormat).format("YYYY-MM-DD"), rescheduleData, currentDateFormat)
    //     if (moment(rescheduleData).format("YYYY-MM-DD") === moment(currentDateFormat).format("YYYY-MM-DD")) {
    //         toast.warning("Appointment date and time should be greater than current date and time.")
    //     } else {
    //         const reschedulebooking = {
    //             appointment_datetime: rescheduleData,
    //             id: appointmentID
    //         }
    //         dispatch(rescheduleAppontment(reschedulebooking))
    //         resetDataFunction()
    //     }
    // }
    const rescheduleBookingHandler = () => {
        const rescheduleMoment = moment(rescheduleData);
      const currentMoment = moment(currentDateFormat);
         // Check if the reschedule date and time are in the future
        if (rescheduleMoment.isSame(currentMoment, 'day') && rescheduleMoment.isSameOrBefore(currentMoment, 'minute')) {
            toast.warning("Appointment date and time should be greater than current date and time.");
        } else if (rescheduleMoment.isBefore(currentMoment, 'minute')) {
            toast.warning("Appointment date and time should be greater than current date and time.");
        } else {
            const reschedulebooking = {
                appointment_datetime: rescheduleData,
                id: appointmentID
            }
            dispatch(rescheduleAppontment(reschedulebooking))
            resetDataFunction()
        }
    }
    

    useEffect(() => {
        if (rescheduleAppontmentUpdate) {
            dispatch(rescheduleAppontmentSuccess(false))
            setRescheduleBooking(false)
        }
    }, [dispatch, rescheduleAppontmentUpdate])

    const validationSchema = Yup.object().shape({
        dispute_note: Yup.string()
            .required('Please enter a note')
    });
    const validationSchemaRating = Yup.object().shape({
        description: Yup.string()
            .required('Please enter description'),
        value: Yup.number()
            .required('Please provide a rating')
            .min(1, 'Rating must be at least 1')
            .max(5, 'Rating must be at most 5')
    });

    useEffect(() => {
        setAppointmentListLength(dataList?.data?.length);
    }, [dataList?.data]);

    useEffect(() => {
        if (
            inView === true &&
            appointmentListLength < dataList?.meta_params.total_count &&
            dataList?.meta_params?.hasMorePage === true &&
            Number(pageRequested) !== Number(dataList?.meta_params?.nextPage)
        ) {
            setAppointmentParams((candidateParams) => {

                return { ...candidateParams, page: dataList?.meta_params.nextPage };
            });
            setScrollValue(true);
        }
    }, [inView, dataList?.meta_params.total_count, dataList?.meta_params?.hasMorePage]);

    useEffect(() => {
        if (
            scrollValue === true &&
            Number(pageRequested) !== Number(dataList?.meta_params.nextPage) &&
            dataList?.meta_params?.hasMorePage === true
        ) {
            setPageRequested(dataList?.meta_params.nextPage);
            let reqObj = {
                search: props?.searchQuery || '',
                date_range: props?.dates,
                page: appointmentParams.page,
            }
            dispatch(getAppointmentList(reqObj));
            setScrollValue(false);
        } else if (pageRequested === undefined) {
            setPageRequested(1);
        }
    }, [dataList?.meta_params?.hasMorePage, dataList?.meta_params.nextPage, appointmentParams.page, dispatch,
        pageRequested, scrollValue]);


    return (
        <>

            <div className='table-responsive border-b-[0.5px] rounded-3xl bg-black'>

                <table {...getTableProps()} className='upcoming_appoinments_table'>
                    <thead>
                        {headerGroups?.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                <th className='min-w-[400px] max-w-[400px]'>Session Type</th>
                                <th>Appointment time</th>
                                <th>Actions</th>
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        <>
                            {appointmentListLoader &&

                                <div className='absolute items-center py-20 h-[100%] top-0 w-full left-0 bottom-0 z-10 overlay_loader'>
                                    <PulseLoader color='#FF5402' />
                                </div>
                            }

                            {/* {rows?.slice(0, props?.welcomePage ? 4 : rows.length)?.map((row: Row<IAppointmentList>, index: number) => {
                                prepareRow(row); */}
                            {rows
                                ?.filter(row => !props?.welcomePage || row.original.is_reschedule_booking_allowed) // Apply filter only if welcomePage is true
                                ?.slice(0, props?.welcomePage ? 4 : rows.length) // Slice the first 4 rows if welcomePage is true, otherwise all rows
                                ?.map((row: Row<IAppointmentList>, index: number) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            <td className=''>
                                                <div className='flex'>
                                                    <div>
                                                        <div className='w-[42px] min-h-[42px] max-h-[42px]'>
                                                            {row.original?.service?.images?.length > 0 &&
                                                                <Image className='min-h-[42px] max-h-[42px] rounded-md object-cover object-center' src={`${row.original.service.images[0].file_link}`} alt='table_img' width={100} height={100} />
                                                            }
                                                        </div>
                                                    </div>
                                                    <span className='pl-3'>
                                                        <span className='text-truncate-2 FaExclamationCircle_inline '>
                                                            {row.original?.service?.title}
                                                            {row.original?.has_dispute_raised &&
                                                                <span onClick={() => { disputeRaisedInfoHandler(row.original.id, row.original?.dispute) }}>
                                                                    <MdInfo size={20} className='rotate-180' />
                                                                </span>
                                                            }
                                                        </span>

                                                        <span className='block userName'>
                                                            {row.original.provider.name}
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='text-nowrap min-w-[250px] max-w-[250px]'>
                                                <div className='flex items-center'>
                                                    <div>
                                                        <Image className='' src={'/images/icons/watch.svg'} alt='table_img' width={20} height={20} />
                                                    </div>
                                                    <span className='ps-2'>
                                                        {row.original.appointment_time_label}
                                                    </span>
                                                </div>
                                            </td>
                                            {/* Add the "View Details" button with a link based on the action property */}
                                            <td className='text-nowrap'>
                                                <div className='flex items-center'>
                                                    <button className='btn btn-light text-nowrap table_light_btn_size' onClick={() => { viewAppointmentHandler(row.original.id) }}>
                                                        View Details
                                                    </button>
                                                    <button className='edit_btn  ml-2 table_edit_btn_size relative'
                                                        onClick={(e) => {
                                                            handleButtonClick(e);
                                                        }}>
                                                        <div>
                                                            <Image className='' src={'/images/icons/edit_icon.svg'} alt='table_img' width={5} height={5} />
                                                        </div>
                                                        <div className='overlay_modal z-50'>
                                                            <div className='bg-white text-start'>
                                                                <div className=''>
                                                                    <span className='list w-full' style={{ padding: "0px" }}>
                                                                        <button className='py-2 cursor-pointer list w-full text-left'
                                                                            disabled={!row.original.is_reschedule_booking_allowed}
                                                                            onClick={() => { rescheduleBookingModal(row.original.id, row.original.appointment_time) }}
                                                                        >Reschedule Booking</button>
                                                                    </span>
                                                                    <div className="relative list">
                                                                        <button
                                                                            disabled={!row.original.is_raise_dispute_allowed}
                                                                            className={`cursor-pointer text-black`}
                                                                            onClick={() => {
                                                                                if (row.original?.is_raise_dispute_allowed) {
                                                                                    raiseDisputeModalHandler(row.original.id)
                                                                                }
                                                                            }

                                                                            }
                                                                            onMouseEnter={() => setShowTooltip(true)}
                                                                            onMouseLeave={() => setShowTooltip(false)}
                                                                        >
                                                                            Raise dispute
                                                                        </button>
                                                                        {row.original.dispute?.dispute_note && showTooltip && (
                                                                            <div className="absolute z-10 right-[0px] transform  bottom-full bg-gray-800 text-white text-xs px-2 py-1 rounded w-100 text-wrap">
                                                                                Dispute has been already raised
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <span className='list' style={{ padding: "0px" }}>
                                                                        <button className='cursor-pointer py-2 list w-full text-left' disabled={!row.original.is_rating_allowed} onClick={() => { ratingModalShow(row.original.id) }}>Rating</button>

                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}
                        </>
                    </tbody>

                </table>

                <>
                    {!props?.welcomePage && <div className="h-25" ref={ref}></div>}
                </>


            </div>



            <div className=''>
                <CenterModal
                    setVisible={setVisible}
                    visible={visible}
                    title='Appointments'
                >
                    {viewAppontmentLoader ?
                        <div className='flex justify-center items-center py-20'>
                            <PulseLoader color='#FF5402' />
                        </div>
                        :
                        <div className='pb-3 pt-2 px-5'>
                            <div className='py-2'>
                                <div className='md:flex block'>
                                    <span className='md:w-4/12 w-full font-medium text-black'> Service name </span>
                                    <span className=' md:ps-3 md:inline block text-truncate-2  md:w-8/12 w-full d-flex'><span className="md:inline-block hidden pe-1"> : </span>  {viewAppontmentData?.service?.title} </span>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='md:flex block'>
                                    <span className='md:w-4/12 w-full font-medium text-black'>Provider name</span>
                                    <span className=' md:ps-3 md:inline block text-truncate-2 md:w-8/12 w-full d-flex'><span className="md:inline-block hidden pe-1"> : </span>  {viewAppontmentData?.provider?.name} </span>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='md:flex block'>
                                    <span className='md:w-4/12 w-full font-medium text-black'> Amount  </span>
                                    <span className=' md:ps-3 md:inline block md:w-8/12 w-full d-flex'><span className="md:inline-block hidden pe-1"> : </span>  ${viewAppontmentData?.order?.total_amount}</span>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='md:flex block'>
                                    <span className='md:w-4/12 w-full font-medium text-black'> Date and Time </span>
                                    <span className=' md:ps-3 md:inline block md:w-8/12 w-full d-flex'><span className="md:inline-block hidden pe-1"> : </span>  {viewAppontmentData?.appointment_time_label}</span>
                                </div>
                            </div>
                        </div>
                    }


                </CenterModal>
                <CenterModal
                    setVisible={setRescheduleBooking}
                    visible={rescheduleBooking}
                    title='Reschedule Booking'
                >
                    <div className='w-100 rescheduleBooking form-input'>
                        {rescheduleData &&
                            <Calendar
                                minDate={new Date()}
                                value={moment(rescheduleData, 'YYYY-MM-DD HH:mm:ss', true).isValid() ? moment(rescheduleData, 'YYYY-MM-DD HH:mm:ss').toDate() : rescheduleData}
                                onChange={(e) => {
                                    const newValue = moment(e.value).format('YYYY-MM-DD HH:mm:ss');
                                    setRescheduleData(newValue);
                                }}
                                inline
                                showTime
                                hourFormat="12"

                                className='overflow-hidden'
                            />
                        }

                        <div className='border-t pt-3 flex'>
                            <button
                                type="submit"
                                className={`btn btn-danger text-center block  submit_button ${rescheduleData}`}
                                onClick={() => rescheduleBookingHandler()}
                                disabled={rescheduleAppontmentLoader}
                            >
                                {rescheduleAppontmentLoader ? <PulseLoader color="#ffffff" /> : "Update"}
                            </button>
                            <button
                                type="submit"
                                className='btn btn-light text-center block mx-2 submit_button'
                                onClick={() => setRescheduleBooking(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                </CenterModal>

                <CenterModal
                    setVisible={setRaiseDisputeModal}
                    visible={raiseDisputeModal}
                    title='Raise Dispute'
                >
                    <div className='pt-3'>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                dispute_note: "",

                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                const updatedValues = { ...values, appointment_id: (Number(appointmentID)) };
                                dispatch(raiseDispute(updatedValues));
                                setSubmitting(false);
                                let reqObj: IAppointmentData = {
                                    data: [],
                                    meta_params: {
                                        current_page: 0,
                                        hasMorePage: false,
                                        last_page: 0,
                                        nextPage: 0,
                                        path: '',
                                        per_page: 0,
                                        total_count: 0,
                                    }
                                }
                                dispatch(resetAppointmentList(reqObj))
                            }}
                        >
                            {(formikProps) => (
                                <Form className="form-input">
                                    <div className="pb-4">
                                        <label htmlFor="emailId" className='text-black'>Note</label>
                                        <div className="">
                                            <textarea
                                                className='border w-full p-2 mt-2'
                                                id="emailId"
                                                name="dispute_note"
                                                maxLength={1000}
                                                placeholder='Write note..'
                                                onChange={(e) => formikProps.setFieldValue('dispute_note', e.target.value)} // Toggle the value
                                            />
                                        </div>
                                        <ErrorMessage name="dispute_note" component="div" className="text-red-500 text-[13px]" />
                                    </div>
                                    <div className="flex pt-3 border-t">

                                        <button
                                            type="submit"
                                            className='btn btn-danger'
                                        >
                                            Raise Dispute
                                        </button>
                                        <button
                                            type="submit"
                                            className='btn btn-light text-center block mx-2 submit_button'
                                            onClick={() => setRaiseDisputeModal(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>

                </CenterModal>
                <CenterModal
                    setVisible={setRatingModal}
                    visible={ratingModal}
                    title='Give Feedback '
                >
                    <div className='pt-6'>
                        <Formik
                            // enableReinitialize
                            initialValues={{
                                description: "",
                                value: `${ratingValue}`
                            }}
                            validationSchema={validationSchemaRating}
                            onSubmit={(values, { setSubmitting }) => {
                                const feedBackValues = {
                                    ...values,
                                    appointment_id: (Number(appointmentID)),

                                };

                                dispatch(givFeedback(feedBackValues));
                                setRatingValue(0)
                                setRatingModal(false)
                            }}
                        >
                            {(formikProps) => (
                                <Form className="form-input">
                                  
                                    <div className="pb-4">
                                        <div>
                                            <h3 className='font-medium mb-2'>What do you think about the service?</h3>
                                            <Rating value={ratingValue} onChange={(e) => { setRatingValue(e.value); formikProps.setFieldValue('value', e.value) }} cancel={false} className="red-rating" />
                                            <ErrorMessage name="value" component="div" className="text-red-500 text-[13px]" />

                                        </div>
                                        <h3 className='font-medium mt-2'>Do you have any ideas you would like to share?</h3>
                                        <div className="">
                                            <textarea
                                                className='border w-full p-2 mt-2'
                                                id="emailId"
                                                name="description"
                                                maxLength={500}
                                                placeholder='Type here...'
                                                onChange={(e) => formikProps.setFieldValue('description', e.target.value)} // Toggle the value
                                            />
                                        </div>
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-[13px]" />
                                    </div>
                                    <div className="flex pt-3 border-t">

                                        <button
                                            type="submit"
                                            className='btn btn-danger'
                                            disabled={feedbackLoader}
                                        >


                                            {feedbackLoader ? <PulseLoader color="#ffffff" /> : "   Send"}
                                        </button>

                                        <button
                                            type="button"
                                            className='btn btn-light text-center block mx-2 submit_button'
                                            onClick={() => { setRatingModal(false); setRatingValue(0); formikProps.resetForm(); }}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </div>

                </CenterModal>

                <CenterModal
                    setVisible={setDisputeRaisedInfo}
                    visible={disputeRaisedInfo}
                    title='Dispute Raised'
                >
                    {viewAppontmentLoader ?
                        <div className='flex justify-center items-center py-20'>
                            <PulseLoader color='#FF5402' />
                        </div>
                        :
                        <div className='pb-3 pt-5 px-5'>
                            <div className='pb-2'>
                                <div className='md:flex block'>
                                    <span className='md:w-4/12 w-full text-black font-medium min-w-[150px]' >Dispute Note</span>
                                    <span className=' md:ps-3  md:inline  text-truncate-2 d-flex'><span className='md:pe-2  md:inline hidden'>: </span>{disputeRaisedInfoList?.dispute_note} </span>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='md:flex block'>
                                    <span className='md:w-4/12 w-full font-medium text-black min-w-[100px]'>Creation Date</span>
                                    <span className='md:ps-3 md:inline block text-truncate-2 d-flex'><span className='md:pe-2 md:inline hidden'>: </span> {disputeRaisedInfoList?.created_at}  </span>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='md:flex block'>
                                    <span className='md:w-4/12 w-full font-medium text-black'> Status </span>
                                    <span className=' md:ps-3 md:inline block d-flex'><span className='md:pe-2 md:inline hidden'> :</span>{disputeRaisedInfoList?.status} </span>
                                </div>
                            </div>

                        </div>
                    }


                </CenterModal>

            </div>
        </>
    );
};

export default AppointmentTable;
