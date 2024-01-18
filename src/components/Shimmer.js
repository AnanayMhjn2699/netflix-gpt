const Shimmer = () => {
  return (
    <div className="mt-5 m-auto w-4/5">
      <div className="flex flex-wrap gap-8 justify-center ">
        {Array(9)
          .fill("")
          .map((item, index) => {
            return (
              <div className=" animate-pulse w-72 h-96" key={index}>
                <div className="w-72 h-44 bg-gray-400"></div>
                {/* <div className="w-72 h-8 bg-gray-400 mb-3"></div>
                <div className="w-3/4 h-8 bg-gray-400 mb-3"></div> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Shimmer;
