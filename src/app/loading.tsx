export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="max-w-xl">
            <div className="h-[400px] bg-gray-200 rounded"></div>
          </div>
        </div>

        <div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 