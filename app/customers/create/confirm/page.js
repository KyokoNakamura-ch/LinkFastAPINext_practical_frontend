"use client"; // ✅ これを最上部に！

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";

function CustomerInfo() {
  const searchParams = useSearchParams();
  const customer_id = searchParams.get("customer_id");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (customer_id) {
      fetchCustomer(customer_id).then((data) => setCustomer(data));
    }
  }, [customer_id]);

  return customer ? (
    <OneCustomerInfoCard customer={customer} />
  ) : (
    <p>Loading...</p>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}> {/* ✅ Suspense を追加！ */}
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-success p-4 text-center">
          正常に作成しました
        </div>
        <CustomerInfo />
        <button className="btn btn-outline btn-accent">
          <a href="/customers">一覧に戻る</a>
        </button>
      </div>
    </Suspense>
  );
}

// export const dynamicParams = true; // 追加するだけ！

// "use client";

// export async function generateStaticParams() {
//   // 静的エクスポート時、このルートを無効化する
//   return [];
// }

// import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
// import fetchCustomer from "./fetchCustomer";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ConfirmPage() {
//   const router = useRouter();
//   const customer_id = useSearchParams().get("customer_id");
//   const [customer, setCustomer] = useState(null);

//   useEffect(() => {
//     const fetchAndSetCustomer = async () => {
//       const customerData = await fetchCustomer(customer_id);
//       setCustomer(customerData);
//     };
//     fetchAndSetCustomer();
//   }, []);

//   return (
//     <>
//       <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
//         <div className="alert alert-success p-4 text-center">
//           正常に作成しました
//         </div>
//         <OneCustomerInfoCard {...customer} />
//         <button onClick={() => router.push("./../../customers")}>
//           <div className="btn btn-primary m-4 text-2xl">戻る</div>
//         </button>
//       </div>
//     </>
//   );
// }
