import { Dialog } from 'primereact/dialog';
import React, { ReactNode } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons CSS

type Props = {
    visible: any;
    setVisible: any;
    errorMessageEmpty?: any;
    title:string;
    children?: ReactNode; // Define children prop
}

const CenterModal = (props: Props) => {

  const handleHide = () => {
    props.setVisible(false)
    if (props?.errorMessageEmpty) {
      props?.errorMessageEmpty();
    }
  };
  return (
    <div>
      <div className="card flex justify-content-center">
        <Dialog header={props.title} visible={props.visible} closeOnEscape={true}  className='centerModal_width' draggable={false}  onHide={handleHide}>
          <div className="m-0">
            {props.children}  
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default CenterModal;
