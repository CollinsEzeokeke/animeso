export default function SecondScrollOverlay() {
  return (
    // <section className="relative w-full h-[220vh] bg-violet-800 pointer-events-none z-[60] flex items-center justify-center">
    //   {/* <div className=""/> */}
    //   <div className="h-[50%] w-[80%] sticky top-0 bg-blue-500 flex items-center justify-center">
    //     adhfjaidfhasdbfasdjv
    //     jidnvpwdigjwvsudfh9wupbesuhwjsdahsdfjvasidfvjwasdyvb9ub
    //   </div>
    // </section>

    //   <section className="relative w-full h-[220vh] bg-violet-800 overflow-y-auto z-[60]">
    //     <div className="h-[50%] w-[80%] sticky top-0 bg-blue-500 flex items-center justify-center">
    //       This part remains sticky.
    //     </div>
    //     {/* To force scrolling and ensure the sticky element works correctly,
    // add some invisible content here */}
    //     <div style={{ height: "10000px" }} />
    //   </section>
// claoset i've gotten so far
    <section className="relative w-full h-[220vh] bg-violet-800 z-[60]">
      <div className="h-[50%] w-[80%] absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-500 flex items-center justify-center">
        This part remains stationary.
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-y-auto">
        <div style={{ height: "10000px" }} />
      </div>
    </section>
  );
}
