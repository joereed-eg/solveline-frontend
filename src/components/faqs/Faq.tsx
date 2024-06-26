import React from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { IFaq } from '@/types/providerServicesInterface';

type Props = {
  data: IFaq[]
}

const Faq = (props: Props) => {
  return (
    <>
      <div className="card">

        <Accordion multiple  >
          {props?.data?.map((value, index) => (
            <AccordionTab header={value?.question} key={index}>
              <p className="m-0">
                {value?.answer}
              </p>
            </AccordionTab>
          ))}
        </Accordion>


      </div>
    </>
  )
}

export default Faq