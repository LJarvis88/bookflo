import { notFound } from "next/navigation";
import { BookingFlow } from "@/components/booking/BookingFlow";

export function generateStaticParams() {
  return [{ slug: "contour-preston" }];
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== "contour-preston") notFound();
  return <BookingFlow />;
}
