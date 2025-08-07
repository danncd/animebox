import Image from 'next/image'

const NotFound = () => {
    return (
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center font-bold text-4x text-red-500">
            <Image src="/404.png" alt="Page not found" width={200} height={200}/>
        </div>
    );
};

export default NotFound;