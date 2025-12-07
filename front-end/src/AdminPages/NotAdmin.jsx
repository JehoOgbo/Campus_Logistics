export default function NotAdmin() {
  return (
    <>
      <div className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] md:min-h-screen sm:min-h-screen md:py-7 h-screen flex justify-center items-center  ">
        <div className=" rounded-2xl items-center  mx-auto md:container  bg-secondary md:w-200 sm:180 md:h-auto shadow-xl/30 w-100 ">
          <div className=" w-auto min-h-auto pl-2 ">
            <div className="flex flex-col min-h-full  justify-center px-6 py-10 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="h-15 w-auto  mx-auto"
                  src="/trace.svg"
                  alt="Campus Logistics"
                />
              </div>
              <h1 className="font-bold text-5xl slated-200 tracking-wide text-gray-200 text-center">
                You don't belong here!!!!
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
