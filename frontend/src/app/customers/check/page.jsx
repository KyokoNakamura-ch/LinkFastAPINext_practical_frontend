"use client"; // ✅ 一番上に移動！（これが重要！）

export async function generateStaticParams() {
  return []; // ✅ これで Next.js に「このページは静的にエクスポートしない」と指示！
}

import { useState, useEffect } from "react";
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

export default function ReadPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // ✅ `query` ではなく `searchParams`
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCustomer(id).then((data) => setCustomerInfo(data[0]));
    }
  }, [id]);

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        {customerInfo ? (
          <OneCustomerInfoCard {...customerInfo} />
        ) : (
          <p>Loading...</p> // ✅ `customerInfo` が `null` の場合を考慮
        )}
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
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
