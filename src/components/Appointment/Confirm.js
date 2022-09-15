import React from "react";
import Button from "components/Button";


const Confirm =(props)=>{

const confDelete=()=>{
props.onConfirm()
}

 return(
  <main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">Are you sure you would like to delete?</h1>
  <section className="appointment__actions">
    <Button danger onClick={props.onCancel}>Cancel</Button>
    <Button danger onClick={confDelete}>Confirm</Button>
  </section>
</main>
 )
};
export default Confirm;