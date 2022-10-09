//deposit button event handler
function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [ready, setReady]   = React.useState(false);
  const [add, setAdd]       = React.useState(0);
  const {balance, updateBalance} = React.useContext(UserContext); 
  
  function onChange(e){
    if (e.currentTarget.value.length===0){
      setReady(false)
    } else {
      setAdd(e.currentTarget.value);
      setReady(true)}
  }

  function validate(){
      if ((add <= 0)) {
        setStatus('Error: must enter positive numbers only');
        setTimeout(() => setStatus(''),3000);
        return false;
      }else if(isNaN(add)) {
        setStatus('Error: must enter a numeric value only');
        setTimeout(() => setStatus(''),3000);
        return false;
      } else{
      return true;
      }
  }

  function handleCreate(){
    if (!validate(add, 'Deposit Amount')) {
    return;
    }
    updateBalance(parseFloat(balance) + parseFloat(add));
    setShow(false);
  }    

//input type="number" would be better for deposit, but then, you will not get a NaN error
  return (
    <Card
      bgcolor="info"
      header="Deposit"
      status={status}
      title="Balance"
      text={"$" + parseFloat(balance).toFixed(2)}
      body={show ? (  
              <> 
              Deposit<br/>
              <input type="text" className="form-control" id="add" placeholder="Amount to Deposit"  onChange={onChange} /><br/>
              <button type="submit" disabled={!ready} className="btn btn-light" onClick={handleCreate}>Deposit</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              </>
            )}
    />
  )
}