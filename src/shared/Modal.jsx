const Modal = ({ setshowModal, setTaskTitle , setArray , children }) => {
  
  return (
    <>
      <div className="parent-of-modal">
        <form className={`modal`}>
          <div className="close">
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                setshowModal(false);
                setTaskTitle('');
                setArray([])
              }}
            ></i>
          </div>
          {children}
        </form>
      </div>
    </>
  );
};

export default Modal;
