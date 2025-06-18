export default function ResumePage() {
  return (
    <div className="w-screen h-screen bg-gray-100 dark:bg-gray-900">
      <iframe
        src="/api/resume"
        className="w-full h-full"
        style={{ border: "none" }}
        title="Nathan Tran's Resume"
      />
    </div>
  );
} 