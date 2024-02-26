

const NoRecordFound = () => {
    return (
        <div className="">
            <div className="flex justify-center mt-20">
                <img src="/nodata.png" alt="No_data_Image" />
            </div>

            <div className=" text-[#233255CC] font-bold text-2xl text-center pb-7">
                <h1 className=''>Oops!! <br /> No Record Found!</h1>
            </div>
        </div>
    );
};

export default NoRecordFound;