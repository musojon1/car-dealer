import { Suspense } from "react";
import Link from "next/link";
import VehicleModels from "@/app/components/VehicleModel";

export async function generateStaticParams() {
  const makes = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  )
    .then((res) => res.json())
    .then((data) => data.Results);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) =>
    (currentYear - i).toString()
  );

  const params = makes.flatMap((make) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year,
    }))
  );

  return params;
}

export default function ResultPage({ params }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vehicle Models</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <VehicleModels makeid={params.makeid} year={params.year} />
      </Suspense>
      <Link
        href="/"
        className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Back to Filter
      </Link>
    </div>
  );
}
