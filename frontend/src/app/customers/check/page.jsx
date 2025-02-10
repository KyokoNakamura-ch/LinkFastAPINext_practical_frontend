"use client"; // ✅ これを最上部に！

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }
  return res.json();
}

function CustomerInfo() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCustomer(id).then((data) => setCustomerInfo(data[0]));
    }
  }, [id]);

  return customerInfo ? (
    <OneCustomerInfoCard {...customerInfo} />
  ) : (
    <p>Loading...</p>
  );
}

export default function ReadPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}> {/* ✅ Suspense を追加！ */}
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <CustomerInfo />
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </Suspense>
  );
}

// export const dynamicParams = true; // 追加するだけ！

// import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

// async function fetchCustomer(id) {
//   const res = await fetch(
//     process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch customer");
//   }
//   return res.json();
// }

// // 静的エクスポートのために追加
// export async function generateStaticParams() {
//   return []; // 静的エクスポート時、このページはスキップ
// }

// export default async function ReadPage({ query }) {
//   const { id } = query;
//   const customerInfo = await fetchCustomer(id);

//   return (
//     <>
//       <div className="alert alert-success">更新しました</div>
//       <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
//         <OneCustomerInfoCard {...customerInfo[0]} />
//       </div>
//       <button className="btn btn-outline btn-accent">
//         <a href="/customers">一覧に戻る</a>
//       </button>
//     </>
//   );
// }
