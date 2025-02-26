import { userStateContext } from "../contexts/ContextProvider"

export default function Toast() {

    const {toast} = userStateContext();

    return (
        <div>
            {toast.show && (
                <div className="w-[300px] py-2 px-4 fixed right-4
                 top-4 bg-emerald-500 text-white z-50 animate-fade-in-down">
                    {toast.message}
                </div>
            )}
        </div>
    );
}
