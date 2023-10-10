import { UserAuthFormForgotPassword } from "./components/user-form-forgot-password";

export default function AuthenticationPage() {
    return (
        <>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Forgot Password
                        </h1>
                        {/* <p className="text-justify text-2xs">Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một email với các hướng dẫn để đặt lại mật khẩu của bạn.</p> */}
                    </div>
                    <UserAuthFormForgotPassword />
                </div>
            </div>
        </>
    );
}