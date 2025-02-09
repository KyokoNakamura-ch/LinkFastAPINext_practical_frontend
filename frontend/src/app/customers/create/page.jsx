"use client";
import { useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import createCustomer from "./createCustomer";

export default function CreatePage() {
    const formRef = useRef();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        await createCustomer(formData);
        router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
    };

    return (
        <>
            <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
                <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="card-body">
                            <h2 className="card-title">
                                <p>
                                    <input
                                        type="text"
                                        name="customer_name"
                                        placeholder="桃太郎"
                                        className="input input-bordered"
                                    />
                                </p>
                            </h2>
                            <p>
                                Customer ID:
                                <input
                                    type="text"
                                    name="customer_id"
                                    placeholder="C030"
                                    className="input input-bordered"
                                />
                            </p>
                            <p>
                                Age:
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="30"
                                    className="input input-bordered"
                                />
                            </p>
                            <p>
                                Gender:
                                <input
                                    type="text"
                                    name="gender"
                                    placeholder="女"
                                    className="input input-bordered"
                                />
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="btn btn-primary m-4 text-2xl"
                                onClick={(e) => {
                                    if (!formRef.current.customer_id.value.trim()) {
                                        e.preventDefault();
                                        alert("Customer ID は必須です！");
                                    }
                                }}
                            >
                                作成
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

// 修正箇所: ConfirmPage コンポーネント部分
export function ConfirmPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}

function PageContent() {
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customer_id");

    return (
        <div>
            <h1>Confirm Page</h1>
            <p>Customer ID: {customerId}</p>
        </div>
    );
}

// "use client"
// import { useRef } from 'react';
// import { useRouter } from 'next/navigation';

// import createCustomer from './createCustomer';

// export default function CreatePage() {
//     const formRef = useRef();
//     const router = useRouter();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData(formRef.current);
//         await createCustomer(formData);
//         router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
//     };

//     return (
//         <>
//             <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
//                 <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
//                     <form ref={formRef} onSubmit={handleSubmit}>
//                         <div className="card-body">
//                             <h2 className="card-title">
//                                 <p><input type="text" name="customer_name" placeholder="桃太郎" className="input input-bordered" /></p>
//                             </h2>
//                             <p>Customer ID:<input type="text" name="customer_id" placeholder="C030" className="input input-bordered" /></p>
//                             <p>Age:<input type="number" name="age" placeholder="30" className="input input-bordered" /></p>
//                             <p>Gender:<input type="text" name="gender" placeholder="女" className="input input-bordered" /></p>
//                         </div>
//                         <div className="flex justify-center">
//                             {/* <button type="submit" className="btn btn-primary m-4 text-2xl">
//                                 作成
//                             </button> */}
//                             {/* customer_id が空ならボタンを無効化:エラー3対応 */}
//                             <button type="submit" className="btn btn-primary m-4 text-2xl"
//                                 onClick={(e) => {
//                                     if (!formRef.current.customer_id.value.trim()) {
//                                         e.preventDefault();
//                                         alert("Customer ID は必須です！");
//                                     }
//                                 }}>
//                                 作成
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }



