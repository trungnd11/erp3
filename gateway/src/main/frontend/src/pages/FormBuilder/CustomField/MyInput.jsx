import React from "react";

// export default React.forwardRef((props, ref) => {
//     const { name, defaultValue, disabled } = props;
//     return <input ref={ref} name={name} defaultValue={defaultValue} disabled={disabled} />;
//   });

const MyInput = (props, ref) => {

    const { name, defaultValue, disabled } = props;
    return(
        <input type="text" className="form-control" ref={ref} name={name} defaultValue={defaultValue} disabled={disabled}/>
    )
}

export default React.forwardRef(MyInput);