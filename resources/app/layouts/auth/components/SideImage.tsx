import images from "@/assets/images";

export default function SideImage() {
    return (
        <div className="relative hidden  flex-col bg-[#E2DCFF] text-white dark:border-r md:w-3/4 lg:max-w-xl lg:pt-10 xl:max-w-xl lg:ps-10 lg:flex md:rounded-3xl">
            <div className="d-block text-black text-4xl max-w-[500px]">
                Find a job through your community
            </div>
            <div className="relative z-20 md:h-full md:flex md:items-center">
                <img
                    src={images.sideAuth}
                    className="object-contain md:rounded-3xl"
                    alt="image register"
                />
            </div>
        </div>
    );
}
