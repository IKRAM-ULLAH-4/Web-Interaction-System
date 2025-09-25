function Events() {
  const handleClick = () => {
    console.log("Registration Button Clicked");
  };

  return (
    <>
      <button onClick={handleClick}>Login Button</button>
      <button onClick={() => console.log("Register Button Clicked..")}>
        Reegister Button
      </button>
    </>
  );
}
export default Events;
